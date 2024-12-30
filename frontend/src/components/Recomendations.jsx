import React, { useState, useMemo, useEffect } from "react";
import ProductCard from "./ProductCard";

function Recommendations() {
  const [products, setProducts] = useState([ // Mock product data for dynamic filtering
    {
      _id: "1",
      title: "Wireless Headphones",
      name: "Wireless Headphones",
      category: "Gadgets",
      image_link: "https://images.unsplash.com/photo-1648447272271-1c2292144c50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdpcmVsZXNzJTIwZWFycGhvbmVzfGVufDB8fDB8fHww  ",
      description: "High-quality wireless headphones with noise cancellation.",
      original_price: 150,
    },
    {
      _id: "2",
      title: "Smartphone",
      name: "Smartphone",
      category: "Gadgets",
      image_link: "https://via.placeholder.com/150",
      description: "Latest generation smartphone with a powerful processor.",
      original_price: 999,
    },
    {
      _id: "3",
      title: "Gaming Console",
      name: "Gaming Console",
      category: "Gadgets",
      image_link: "https://via.placeholder.com/150",
      description: "Next-gen gaming console with stunning graphics.",
      original_price: 500,
    },
    {
      _id: "4",
      title: "Smartwatch",
      name: "Smartwatch",
      category: "Gadgets",
      image_link: "https://via.placeholder.com/150",
      description: "Stylish smartwatch with fitness tracking features.",
      original_price: 200,
    },
    {
      _id: "5",
      title: "Bluetooth Speaker",
      name: "Bluetooth Speaker",
      category: "Gadgets",
      image_link: "https://via.placeholder.com/150",
      description: "Portable Bluetooth speaker with excellent sound quality.",
      original_price: 80,
    },
    {
      _id: "6",
      title: "Digital Camera",
      name: "Digital Camera",
      category: "Gadgets",
      image_link: "https://via.placeholder.com/150",
      description: "Compact digital camera with high resolution and zoom.",
      original_price: 450,
    },
    {
      _id: "7",
      title: "Tablet",
      name: "Tablet",
      category: "Gadgets",
      image_link: "https://via.placeholder.com/150",
      description: "Versatile tablet for work and entertainment.",
      original_price: 600,
    },
    {
      _id: "8",
      title: "Book 1",
      name: "The Great Gatsby",
      category: "Books",
      image_link: "https://via.placeholder.com/150",
      description: "A classic novel by F. Scott Fitzgerald.",
      original_price: 10,
    },
    {
      _id: "9",
      title: "Book 2",
      name: "To Kill a Mockingbird",
      category: "Books",
      image_link: "https://via.placeholder.com/150",
      description: "A novel by Harper Lee about racial injustice.",
      original_price: 15,
    },
    {
      _id: "10",
      title: "Book 3",
      name: "1984",
      category: "Books",
      image_link: "https://via.placeholder.com/150",
      description: "A dystopian novel by George Orwell.",
      original_price: 12,
    },
    {
      _id: "11",
      title: "Book 4",
      name: "Pride and Prejudice",
      category: "Books",
      image_link: "https://via.placeholder.com/150",
      description: "A romantic novel by Jane Austen.",
      original_price: 10,
    },
    {
      _id: "12",
      title: "Book 5",
      name: "The Catcher in the Rye",
      category: "Books",
      image_link: "https://via.placeholder.com/150",
      description: "A novel by J.D. Salinger.",
      original_price: 14,
    },
    {
      _id: "13",
      title: "Book 6",
      name: "Moby Dick",
      category: "Books",
      image_link: "https://via.placeholder.com/150",
      description: "A classic novel by Herman Melville.",
      original_price: 18,
    },
    {
      _id: "14",
      title: "Book 7",
      name: "War and Peace",
      category: "Books",
      image_link: "https://via.placeholder.com/150",
      description: "A historical novel by Leo Tolstoy.",
      original_price: 25,
    },
    {
      _id: "15",
      title: "Running Shoes",
      name: "Running Shoes",
      category: "Shoes",
      image_link: "https://via.placeholder.com/150",
      description: "Comfortable running shoes for everyday use.",
      original_price: 60,
    },
    {
      _id: "16",
      title: "Sneakers",
      name: "Sneakers",
      category: "Shoes",
      image_link: "https://via.placeholder.com/150",
      description: "Stylish sneakers for casual wear.",
      original_price: 80,
    },
    {
      _id: "17",
      title: "Formal Shoes",
      name: "Formal Shoes",
      category: "Shoes",
      image_link: "https://via.placeholder.com/150",
      description: "Elegant formal shoes for special occasions.",
      original_price: 120,
    },
    {
      _id: "18",
      title: "Hiking Boots",
      name: "Hiking Boots",
      category: "Shoes",
      image_link: "https://via.placeholder.com/150",
      description: "Durable boots for outdoor adventures.",
      original_price: 150,
    },
    {
      _id: "19",
      title: "Sandals",
      name: "Sandals",
      category: "Shoes",
      image_link: "https://via.placeholder.com/150",
      description: "Comfortable sandals for summer.",
      original_price: 40,
    },
    {
      _id: "20",
      title: "Loafers",
      name: "Loafers",
      category: "Shoes",
      image_link: "https://via.placeholder.com/150",
      description: "Classic loafers for everyday wear.",
      original_price: 100,
    },
    {
      _id: "21",
      title: "Flip Flops",
      name: "Flip Flops",
      category: "Shoes",
      image_link: "https://via.placeholder.com/150",
      description: "Lightweight flip flops for casual outings.",
      original_price: 20,
    },
    {
      _id: "22",
      title: "Desk Lamp",
      name: "Desk Lamp",
      category: "Others",
      image_link: "https://via.placeholder.com/150",
      description: "Adjustable desk lamp with modern design.",
      original_price: 40,
    },
    {
      _id: "23",
      title: "Backpack",
      name: "Backpack",
      category: "Others",
      image_link: "https://via.placeholder.com/150",
      description: "Durable backpack with multiple compartments.",
      original_price: 60,
    },
    {
      _id: "24",
      title: "Fitness Tracker",
      name: "Fitness Tracker",
      category: "Others",
      image_link: "https://via.placeholder.com/150",
      description: "Track your daily activity and fitness goals.",
      original_price: 120,
    },
    {
      _id: "25",
      title: "Electric Kettle",
      name: "Electric Kettle",
      category: "Others",
      image_link: "https://via.placeholder.com/150",
      description: "Fast boiling electric kettle with auto shut-off.",
      original_price: 30,
    },
    {
      _id: "26",
      title: "Coffee Maker",
      name: "Coffee Maker",
      category: "Others",
      image_link: "https://via.placeholder.com/150",
      description: "Automatic coffee maker with customizable settings.",
      original_price: 100,
    }
  ]);

  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to randomly select 8 products
  const selectRandomProducts = (productList, count) => {
    const shuffled = productList.sort(() => 0.5 - Math.random());
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
