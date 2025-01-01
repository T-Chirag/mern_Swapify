import React, { useState, useMemo, useEffect } from "react";
import ProductCard from "./ProductCard";
// import { ProductArray } from "../assets/data.js";
import axios from "axios";

function Recommendations() {

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/products/");
        // console.log("response:", response);
        setProducts(response.data);
        // console.log("products:", products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);


  const [products, setProducts] = useState([]);

  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to randomly select 8 products
  const selectRandomProducts = (products, count) => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    // Simulate loading and then set random products
    setTimeout(() => {
      const randomProducts = selectRandomProducts(products, 8);
      setDisplayedProducts(randomProducts);
      setLoading(false);
    }, 1000); // Simulate loading delay
  }, [products]);

  const productGrid = useMemo(() => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
        {displayedProducts.map((product, index) => (
          <ProductCard key={product._id || product.id || index} product={product} />
        ))}
      </div>
    );
  }, [displayedProducts]);

  return (
    <div className="bg-black py-10 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        Recommended for You
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <p className="text-lg font-semibold text-gray-300">Loading...</p>
        </div>
      ) : (
        productGrid
      )}
    </div>
  );
}

export default Recommendations;
