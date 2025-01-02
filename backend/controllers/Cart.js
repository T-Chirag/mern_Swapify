const Cart = require('../models/Cart.js');



const jwt = require('jsonwebtoken'); // If you're using jwt-decode or the jwt library for server-side

const Product = require('../models/Product'); // Product model (assuming it's required to check product existence)

exports.create = async (req, res) => {
  try {
    // Step 1: Retrieve userId from the request body
    // const userId = req.body.user;
    // console.log(userId);

    // Step 2: Ensure the userId is available
    // if (!userId) {
    //   return res.status(400).json({ message: "User ID is required." });
    // }

    // Step 3: Check if the product exists
    const product = await Product.findById(req.body.product);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Step 4: Check if the product is already in the user's cart
    const existingCartItem = await Cart.findOne({ product: req.body.product });
    if (existingCartItem) {
      // If the item is already in the cart, increase the quantity
      existingCartItem.quantity += req.body.quantity || 1; // Default to 1 if no quantity provided
      await existingCartItem.save();
      return res.status(200).json({ message: "Product quantity updated in cart.", cartItem: existingCartItem });
    }

    // Step 5: Create a new cart item and associate it with the userId
    const cartItem = new Cart({
      // user: userId, // Associate the cart with the userId
      product: req.body.product, // Product ID from request body
      quantity: req.body.quantity || 1, // Quantity from request body (defaults to 1)
    });

    // Step 6: Save the cart item to the database
    const createdCartItem = await cartItem.save();

    // Step 7: Populate the product information and return the cart item
    const populatedCartItem = await createdCartItem.populate('product');

    // Step 8: Send the response back
    res.status(201).json(populatedCartItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error adding product to cart, please try again later' });
  }
};

exports.getAllCarts = async (req, res) => {
  try {
      // Fetch all cart items from the database
      const carts = await Cart.find();
      
      // Send the response with the cart data
      return res.status(200).json(carts);
  } catch (error) {
      console.error('Error fetching cart items:', error);

      // Send a server error response
      return res.status(500).json({
          message: 'Error fetching cart items, please try again later',
      });
  }
};


// exports.getByUserId = async (req, res) => {
//     try {
        
//         const result = await Cart.findById();
//         res.status(200).json(result);
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: 'Error fetching cart items, please try again later' });
//     }
// };

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
