import React from "react";
import { useParams, Link } from "react-router-dom";
import { ProductArray } from "../assets/data";


const ProductDetails = () => {
  const { id } = useParams(); // Extract the product ID from the URL
  const product = ProductArray.find((item) => item._id === id);

  if (!product) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  const [message, setMessage] = React.useState(null);

  const handleAddToCart = async () => {
    try {
      const response = await fetch("http://localhost:8080/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId, // Replace with dynamic user ID
          productId: product._id,
          quantity: 1,
      }),
    });

    if (response.ok) {
      setMessage({ type: "success", text: `${product.title} has been added to your cart!` });
      console.log(`${product.title} has been added to your cart!`);
    } else {
      setMessage({ type: "error", text: "Failed to add to cart. Please try again." });
      console.error("Failed to add to cart. Please try again.");
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    setMessage({ type: "error", text: "Something went wrong. Please try again." });
  }
};

  

  const handleBuyNow = () => {
      (window.location.href = "/web-chat-app/ChatApp.html")
    
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Back Button */}
      <Link to="/" className="text-blue-500 hover:underline">
        &larr; Back to Home
      </Link>

      {/* Product Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Product Image */}
        <div>
          <img
            src={product.image_link}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg shadow-md"
            onError={(e) => (e.target.src = "https://via.placeholder.com/500")}
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-lg font-semibold mt-4">Price: ${product.original_price}</p>
          <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
            <button
              onClick={() =>
              (window.location.href = "/web-chat-app/ChatApp.html")
            }
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Chat With User
            </button>
          </div>
        </div>
      </div>

      {/* Product Features Section */}
      {product.features && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <ul className="list-disc ml-6 space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="text-gray-600">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Related Products Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ProductArray.filter((item) => item.category === product.category && item._id !== product._id).map(
            (relatedProduct) => (
              <div key={relatedProduct._id} className="border p-4 rounded-lg shadow">
                <img
                  src={relatedProduct.image_link}
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover rounded"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/500")}
                />
                <h3 className="text-lg font-semibold mt-2">{relatedProduct.name}</h3>
                <p className="text-gray-500">${relatedProduct.original_price}</p>
                <Link
                  to={`/product/${relatedProduct._id}`}
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  View Details
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
