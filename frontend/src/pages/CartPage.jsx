import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";

import { jwtDecode } from "jwt-decode";

/**
 * CartPage component that displays the user's cart items, allows updating item quantities,
 * removing items, and proceeding to checkout. Fetches cart items from the backend and updates
 * the backend when items are modified.
 *
 * @component
 * @example
 * return (
 *   <CartPage />
 * )
 *
 * @returns {JSX.Element} The rendered CartPage component.
 *
 * @function
 * @name CartPage
 *
 * @description
 * - Fetches cart items from the backend on mount.
 * - Allows updating item quantities and removing items, with changes reflected in the backend.
 * - Calculates and displays the total price of items in the cart.
 * - Displays a loading state while fetching data.
 *
 * @hook
 * @name useCart
 * @description Custom hook to manage cart state.
 *
 * @hook
 * @name useState
 * @description React hook to manage loading state.
 *
 * @hook
 * @name useEffect
 * @description React hook to fetch cart items on component mount.
 *
 * @async
 * @function
 * @name fetchCartItems
 * @description Fetches cart items from the backend and updates the cart state.
 *
 * @async
 * @function
 * @name updateQuantity
 * @param {string} itemId - The ID of the cart item to update.
 * @param {number} quantity - The new quantity of the cart item.
 * @description Updates the quantity of a cart item in the backend and updates the cart state.
 *
 * @async
 * @function
 * @name removeItem
 * @param {string} itemId - The ID of the cart item to remove.
 * @description Removes a cart item from the backend and updates the cart state.
 *
 * @function
 * @name calculateTotal
 * @returns {number} The total price of all items in the cart.
 * @description Calculates the total price of items in the cart.
 */
const CartPage = () => {
  const { cartItems, setCartItems } = useCart();
  const [loading, setLoading] = useState(true);
  console.log("useCart return:", useCart());
  console.log("setCartItems type:", typeof setCartItems);

  useEffect(() => {
    // Fetch cart items from the backend
    const fetchCartItems = async () => {
      try {
        try {
          // Retrieve the token from localStorage
          const token = localStorage.getItem("token");
          console.log("token:", token);

          if (!token) {
            throw new Error("No token found. User might not be logged in.");
          }
          // Decode the token
          const decodedToken = jwtDecode(token);
          // Access the user ID
          const UserId = decodedToken._id; // Adjust the key based on your token structure
          console.log("Logged-in User ID:", UserId);
          // Do something with the UserId, like making an API request
        } catch (error) {
          if (
            error.message === "No token found. User might not be logged in."
          ) {
            console.error(error.message);
            // Redirect to login or show a message to the user
          } else {
            console.error("Error decoding token:", error);
            // Handle token decoding issues (e.g., malformed token)
          }
        }
        const response = await axios.get(
          `//localhost:8080/cart/user/${UserId}`
        );
        setCartItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [setCartItems]);

  const updateQuantity = async (itemId, quantity) => {
    try {
      const response = await axios.put(`/cart/${itemId}`, { quantity });
      setCartItems(response.data);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const response = await axios.delete(`/cart/${itemId}`);
      setCartItems(response.data);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  // Calculate the total price
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="p-4 border rounded-lg flex justify-between items-center "
            >
              <div>
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-white">Price: ₹{item.price}</p>
                <p className="text-white">Contact Seller: {item.sellerId}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={
                    () =>
                      updateQuantity(item.id, Math.max(item.quantity - 1, 1)) // Prevent going below 1
                  }
                  className="bg-gray-300 px-2 py-1 rounded text-black"
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={
                    (e) =>
                      updateQuantity(item.id, parseInt(e.target.value) || 1) // Default to 1 if invalid
                  }
                  className="w-12 text-center border text-black"
                />
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-300 px-2 py-1 rounded text-black"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total Price */}
          
        </div>
      )}

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <div className="flex justify-end mt-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
