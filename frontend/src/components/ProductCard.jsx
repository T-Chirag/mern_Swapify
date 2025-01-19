// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);


import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// const { getUserID } = require("../../../backend/controllers/Auth.js");  // Import the getUserID function from the auth controller


// let User_ID = getUserID();
const ProductCard = ({ product }) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const User_id = localStorage.getItem("User_id");

  // Add product to cart
  const addToCart = async (productId) => {
    try {
      console.log(User_id);
      console.log(productId);
      
      const response = await axios.post(
        "http://localhost:8080/cart/add",
        { product:productId,
          user:User_id },
        {
          withCredentials: false,
        }
      );
      console.log("Response:", response.data);
      alert("Product added to cart!");
    } catch (error) {
      console.log("Error adding to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  const handleCardClick = (id) => {
    navigate(`/products/${id}`); // Navigate to the ProductDetails page
  };

  return (
    <div className="relative bg-white border rounded-lg shadow-md overflow-hidden">
      <div className="h-96 bg-gray-100 flex justify-center items-center overflow-hidden">
        <img
          src={product.image_link || "default-image.jpg"}
          alt={product.name || "Unnamed Product"}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110 shadow-white shadow-2xl"
          onClick={() => handleCardClick(product._id)}
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name || "Unnamed Product"}
        </h3>
        <p className="text-gray-500 text-sm mt-1 truncate">
          {product.description || "No description available"}
        </p>

        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-green-600 font-bold text-lg">
              ₹{product.original_price}
            </span>
          </div>
          <button
            onClick={() => addToCart(product._id)} // Only send productId
            className="bg-blue-600 text-white px-4 py-1 text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>

          {/* <button
            onClick={()=>window.location.href = "/web-chat-app/ChatApp.html"}
            className="bg-blue-600 text-white px-2 py-1 text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
          >
            Chat with lister
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
