import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // To decode the token and get the user ID
// import User from "../../../backend/models/User";

const Dashboard = () => {
  const [products, setProducts] = useState([]); // State for products
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    original_price: 0,
    category: "",
    images: [],
  }); // State for new product
  const [editingProduct, setEditingProduct] = useState(null); // State for editing product
  const [categories, setCategories] = useState([]); // State for categories
  const [userId, setUserId] = useState(null); // State for logged-in user ID

  useEffect(() => {
      const UserId = localStorage.getItem("UserId");
      console.log("Logged User ID:", UserId);
  
    if (UserId) {
      try {
        setUserId(UserId);
  
        fetchProducts(UserId); // Fetch products for the logged-in user
        // fetchCategories(); // Assuming this is needed
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.log("No token found. User might not be logged in.");
    }
  }, []);
  

  const fetchProducts = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/product/lister/${userId}`);
      setProducts(response.data); // Update products state
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch categories for dropdown
  // const fetchCategories = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/categories");
  //     setCategories(response.data); // Update categories state
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };

  // Add a new product
  const addProduct = async () => {
    if (
      newProduct.title &&
      newProduct.description &&
      newProduct.original_price &&
      newProduct.category &&
      newProduct.images.length > 0
    ) {
      try {
        const response = await axios.post("http://localhost:8080/products", {
          ...newProduct,
           // Add logged-in user ID as lister
        });
        setProducts([...products, response.data]); // Add the new product to the state
        setNewProduct({
          title: "",
          description: "",
          original_price: 0,
          category: "",
          images: [],
        });
      } catch (error) {
        console.error("Error adding product:", error);
      }
    } else {
      alert("Please fill in all fields!");
    }
  };

  // Update an existing product
  const updateProduct = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:8080/product/${id}`, updatedData);
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product._id === id ? response.data : product))
      );
      setEditingProduct(null); // Close the editing modal
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/product/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-6 flex flex-col">
      {/* Profile Section */}
      <div className="mb-6 w-96 flex flex-col items-center">
        <h1 className="text-2xl m-7 font-bold">Your Profile</h1>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-black"
        />
      </div>

      {/* Add Product Form */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-lg font-bold mb-2">Add New Product</h2>
        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full mb-2"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="border p-2 w-full mb-2"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 w-full mb-2"
          value={newProduct.original_price}
          onChange={(e) => setNewProduct({ ...newProduct, original_price: e.target.value })}
        />
        <select
          className="border p-2 w-full mb-2"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Image URLs (comma-separated)"
          className="border p-2 w-full mb-2"
          value={newProduct.images.join(",")}
          onChange={(e) =>
            setNewProduct({ ...newProduct, images: e.target.value.split(",") })
          }
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={addProduct}>
          Add Product
        </button>
      </div>

      {/* Product Listings */}
      <h1 className="text-2xl font-bold mb-4">Your Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="p-4 border rounded-lg">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-500">${product.original_price}</p>
            <div className="mt-2">
              <button
                onClick={() => setEditingProduct(product)}
                className="text-blue-500 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Editing Modal */}
      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Edit Product</h3>
            <input
              type="text"
              className="border p-2 w-full mb-4"
              value={editingProduct.title}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, title: e.target.value })
              }
            />
            <textarea
              className="border p-2 w-full mb-4"
              value={editingProduct.description}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, description: e.target.value })
              }
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() =>
                updateProduct(editingProduct._id, {
                  title: editingProduct.title,
                  description: editingProduct.description,
                })
              }
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
              onClick={() => setEditingProduct(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
