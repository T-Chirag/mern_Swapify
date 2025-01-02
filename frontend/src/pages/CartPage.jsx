import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * CartPage component that displays the user's cart items, allows updating item quantities,
 * removing items, and proceeding to checkout. Fetches cart items from the backend and updates
 * the backend when items are modified.
 */
const CartPage = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [productIds, setProductIds] = useState([]);
  const navigate = useNavigate();
  
  // Fetch cart items from the backend
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/cart/get`);
        setProductIds(response.data);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, [setCartItems]); // Runs once on mount

  // Fetch product details when productIds change
  useEffect(() => {
    const fetchProductDetails = async () => {
      let productDetails = [];
      try {
        for (const ele of productIds) {
          const response = await axios.get(`http://localhost:8080/products/${ele.product}`);
          productDetails.push({
            productDetails: response.data,
            productQuantity: ele.quantity,
          });
        }
        setCartItems(productDetails); // Set product details to cartItems state
        setLoading(false); // Set loading to false after the data is fetched
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    if (productIds.length > 0) {
      fetchProductDetails(); // Only run if productIds is not empty
    }
  }, [productIds]); // Runs when productIds changes

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
      // Perform the API call to remove the item from the backend cart
      await axios.delete(`/cart/${itemId}`);
      
      // After successful deletion, filter the item out of the state
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.productDetails.id !== itemId)
      );
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  // Calculate the total price
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.productDetails.original_price * item.productQuantity,
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
            <div key={item.productDetails.id} className="p-4 border rounded-lg flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">{item.productDetails.name}</h2>
                <p className="text-white">Price: ₹{item.productDetails.original_price}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    updateQuantity(item.productDetails.id, Math.max(item.productQuantity - 1, 1)) // Prevent going below 1
                  }
                  className="bg-gray-300 px-2 py-1 rounded text-black"
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.productQuantity}
                  onChange={(e) =>
                    updateQuantity(item.productDetails.id, parseInt(e.target.value) || 1) // Default to 1 if invalid
                  }
                  className="w-12 text-center border text-black"
                />
                <button
                  onClick={() => updateQuantity(item.productDetails.id, item.productQuantity + 1)}
                  className="bg-gray-300 px-2 py-1 rounded text-black"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.productDetails.id)}
                  className="text-red-500 ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end mt-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => window.location.href = "/web-chat-app/ChatApp.html"}>
          Proceed And Chat with listers
        </button>
      </div>
    </div>
  );
};

export default CartPage;
