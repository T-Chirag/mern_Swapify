import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import { ProductArray } from "../assets/data.js";


function ProductListing() {
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filterPrice, setFilterPrice] = useState(""); 

  const [searchParams] = useSearchParams();

  // get products from the backend
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


  useEffect(() => {
    console.log("products:", products);
    let updatedProducts = products;
    const category = searchParams.get("category");
    if (category) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === category.toLowerCase()
      );
    }
    

    if (searchQuery) {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterPrice === "<50") {
      updatedProducts = updatedProducts.filter((product) => product.price < 50);
    } else if (filterPrice === ">=50") {
      updatedProducts = updatedProducts.filter((product) => product.price >= 50);
    }

    setFilteredProducts(updatedProducts);
  }, [searchParams, searchQuery, filterPrice, products]);

  return (
    <div className="min-h-screen bg-gray-900 py-10">
      <h1 className="text-[70px] font-bold text-center mb-6">
        {searchParams.get("category")
          ? `Explore ${searchParams.get("category")}`
          : "Explore Our Products"}
      </h1>

      <div className="top-0 bg-white/0 z-10 p-4 mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="flex-1">
          <SearchBar onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="mt-4 mx-3 sm:mt-0">
          <select
            className="bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-300"
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
          >
            <option value="">Filter by Price</option>
            <option value="<50">Less than $50</option>
            <option value=">=50">Greater than or equal to $50</option>
          </select>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
          {filteredProducts.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center col-span-full">
          <p className="text-lg text-gray-500">No products found.</p>
        </div>
      )}
    </div>
  );
}

export default ProductListing;
