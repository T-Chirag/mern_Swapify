const Cart = require('../models/Cart.js');

const jwt = require('jsonwebtoken'); // If you're using jwt-decode or the jwt library for server-side
const Cart = require('../models/Cart'); // Assuming Cart model is defined

const jwt = require('jsonwebtoken'); // JWT library
const Cart = require('../models/Cart'); // Cart model
const Product = require('../models/Product'); // Product model (assuming it's required to check product existence)

exports.addToCart = async (req, res) => {
  try {
    // Step 1: Retrieve the token from cookies
    const token = req.cookies.token; // Assuming token is stored as 'token' in cookies

    // Step 2: Check if token exists
    if (!token) {
    console.log("Token not found in cookies.");
    return res.status(401).json({ message: "Unauthorized, please log in." });
    }

    // Step 3: Decode the token to get the userId
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Replace JWT_SECRET with your secret key

    // Step 4: Extract the userId from the decoded token
    const userId = decodedToken._id;

    // Step 5: Ensure the userId is available
    if (!userId) {
      return res.status(400).json({ message: "User ID not found in token." });
    }

    // Step 6: Check if the product exists (validate before adding to cart)
    const product = await Product.findById(req.body.product);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Step 7: Check if the product is already in the user's cart
    const existingCartItem = await Cart.findOne({ user: userId, product: req.body.product });
    if (existingCartItem) {
      // If the item is already in the cart, we can increase the quantity
      existingCartItem.quantity += req.body.quantity || 1; // Default to 1 if no quantity provided
      await existingCartItem.save();
      return res.status(200).json({ message: "Product quantity updated in cart.", cartItem: existingCartItem });
    }

    // Step 8: Create a new cart item and associate it with the userId
    const cartItem = new Cart({
      user: userId, // Associate the cart with the userId
      product: req.body.product, // Product ID from request body
      quantity: req.body.quantity || 1, // Quantity from request body (defaults to 1)
    });

    // Step 9: Save the cart item to the database
    const createdCartItem = await cartItem.save();

    // Step 10: Populate the product information and return the cart item
    const populatedCartItem = await createdCartItem.populate('product');

    // Step 11: Send the response back
    res.status(201).json(populatedCartItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error adding product to cart, please try again later' });
  }
};



exports.getByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Cart.find({ user: id }).populate('product');
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error fetching cart items, please try again later' });
    }
};

exports.updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Cart.findByIdAndUpdate(id, req.body, { new: true }).populate('product');
        res.status(200).json(updated);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error updating cart items, please try again later' });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Cart.findByIdAndDelete(id);
        res.status(200).json(deleted);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error deleting cart item, please try again later' });
    }
};

exports.deleteByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        await Cart.deleteMany({ user: id });
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Some error occurred while resetting your cart' });
    }
};
