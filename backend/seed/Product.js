const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb+srv://chiragtcd23:12022005@fwddatabase.8ratq.mongodb.net/New_Fwdb_github?retryWrites=true&w=majority&appName=FwdDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  title: String,
  name: String,
  category: String,
  image_link: String,
  description: String,
  original_price: Number,
});

const Product = mongoose.model("Product", productSchema);

const products = [ // Mock product data for dynamic filtering
 {
   title: "Wireless Headphones",
   name: "Wireless Headphones",
   category: "Gadgets",
   image_link: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=600",
   description: "High-quality wireless headphones with noise cancellation.",
   original_price: 150,
 },
 {
   title: "Smartphone",
   name: "Smartphone",
   category: "Gadgets",
   image_link: "https://images.pexels.com/photos/248528/pexels-photo-248528.jpeg?auto=compress&cs=tinysrgb&w=600",
   description: "Latest generation smartphone with a powerful processor.",
   original_price: 999,
 },
 {
   title: "Gaming Console",
   name: "Gaming Console",
   category: "Gadgets",
   image_link: "https://images.pexels.com/photos/3945688/pexels-photo-3945688.jpeg?auto=compress&cs=tinysrgb&w=600",
   description: "Next-gen gaming console with stunning graphics.",
   original_price: 500,
 },
 {
   title: "Smartwatch",
   name: "Smartwatch",
   category: "Gadgets",
   image_link: "https://images.pexels.com/photos/51011/pexels-photo-51011.jpeg?auto=compress&cs=tinysrgb&w=600",
   description: "Stylish smartwatch with fitness tracking features.",
   original_price: 200,
 },
 {
   title: "Bluetooth Speaker",
   name: "Bluetooth Speaker",
   category: "Gadgets",
   image_link: "https://images.pexels.com/photos/14309806/pexels-photo-14309806.jpeg?auto=compress&cs=tinysrgb&w=600",
   description: "Portable Bluetooth speaker with excellent sound quality.",
   original_price: 80,
 },
 {
   title: "Digital Camera",
   name: "Digital Camera",
   category: "Gadgets",
   image_link: "https://images.pexels.com/photos/1528851/pexels-photo-1528851.jpeg?auto=compress&cs=tinysrgb&w=600",
   description: "Compact digital camera with high resolution and zoom.",
   original_price: 450,
 },
 {
   title: "Tablet",
   name: "Tablet",
   category: "Gadgets",
   image_link: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=600",
   description: "Versatile tablet for work and entertainment.",
   original_price: 600,
 },
 {
   title: "Book 1",
   name: "The Great Gatsby",
   category: "Books",
   image_link: "https://cdn.kobo.com/book-images/5addc4c9-fbc1-42d7-a79f-cec7619d4b23/353/569/90/False/the-great-gatsby-a-novel-1.jpg",
   description: "A classic novel by F. Scott Fitzgerald.",
   original_price: 10,
 },
 {
   title: "To Kill a Mockingbird",
   name: "To Kill a Mockingbird",
   category: "Books",
   image_link: "https://m.media-amazon.com/images/I/51Z9p5AecCL.SY445_SX342.jpg",
   description: "A novel by Harper Lee about racial injustice.",
   original_price: 15,
 },
 {
   title: "1984 OG-Novel",
   name: "1984",
   category: "Books",
   image_link: "https://thewonk.in/wp-content/uploads/2024/02/ninteen-eighty-four-book-review.jpg",
   description: "A dystopian novel by George Orwell.",
   original_price: 12,
 },
 {
   title: "Pride and Prejudice",
   name: "Pride and Prejudice",
   category: "Books",
   image_link: "https://m.media-amazon.com/images/I/712P0p5cXIL.SY425.jpg",
   description: "A romantic novel by Jane Austen.",
   original_price: 10,
 },
 {
   title: "Book 5",
   name: "The Catcher in the Rye",
   category: "Books",
   image_link: "https://m.media-amazon.com/images/I/418bOQWiRBL.SY445_SX342.jpg",
   description: "A novel by J.D. Salinger.",
   original_price: 14,
 },
 {
   title: "Book 6",
   name: "Moby Dick",
   category: "Books",
   image_link: "https://m.media-amazon.com/images/I/51ZEFeNmYRL.SY445_SX342.jpg",
   description: "A classic novel by Herman Melville.",
   original_price: 18,
 },
 {
   title: "Book 7",
   name: "War and Peace",
   category: "Books",
   image_link: "https://m.media-amazon.com/images/I/71eK3ri8ROL.SY425.jpg",
   description: "A historical novel by Leo Tolstoy.",
   original_price: 25,
 },
 {
   title: "Running Shoes",
   name: "Running Shoes",
   category: "Shoes",
   image_link: "https://images.pexels.com/photos/1124466/pexels-photo-1124466.jpeg?auto=compress&cs=tinysrgb&w=600",
   description: "Comfortable running shoes for everyday use.",
   original_price: 60,
 },
 {
   title: "Sneakers",
   name: "Sneakers",
   category: "Shoes",
   image_link: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600",
   description: "Stylish sneakers for casual wear.",
   original_price: 80,
 },
 {
   title: "Formal Shoes",
   name: "Formal Shoes",
   category: "Shoes",
   image_link: "https://images.pexels.com/photos/296158/pexels-photo-296158.jpeg?auto=compress&cs=tinysrgb&w=600",
   description: "Elegant formal shoes for special occasions.",
   original_price: 120,
 },
 {
   title: "Hiking Boots",
   name: "Hiking Boots",
   category: "Shoes",
   image_link: "https://images.pexels.com/photos/1467574/pexels-photo-1467574.jpeg?auto=compress&cs=tinysrgb&w=600",
   description: "Durable boots for outdoor adventures.",
   original_price: 150,
 },
 {
   title: "Sandals",
   name: "Sandals",
   category: "Shoes",
   image_link: "https://images.pexels.com/photos/2961991/pexels-photo-2961991.jpeg?auto=compress&cs=tinysrgb&w=600",
   description: "Comfortable sandals for summer.",
   original_price: 40,
 },
 {
   title: "Loafers",
   name: "Loafers",
   category: "Shoes",
   image_link: "https://images.pexels.com/photos/19335787/pexels-photo-19335787/free-photo-of-brown-shoes-on-a-carpet.jpeg?auto=compress&cs=tinysrgb&w=600",
   description: "Classic loafers for everyday wear.",
   original_price: 100,
 },
 {
   title: "Flip Flops",
   name: "Flip Flops",
   category: "Shoes",
   image_link: "https://images.pexels.com/photos/1756086/pexels-photo-1756086.jpeg?auto=compress&cs=tinysrgb&w=600",
   description: "Lightweight flip flops for casual outings.",
   original_price: 20,
 },
 {
   title: "Desk Lamp",
   name: "Desk Lamp",
   category: "Others",
   image_link: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=600",
   description: "Adjustable desk lamp with modern design.",
   original_price: 40,
 },
 {
   title: "Backpack",
   name: "Backpack",
   category: "Others",
   image_link: "https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg?auto=compress&cs=tinysrgb&w=600",
   description: "Durable backpack with multiple compartments.",
   original_price: 60,
 },
 {
   title: "Fitness Tracker",
   name: "Fitness Tracker",
   category: "Others",
   image_link: "https://images.pexels.com/photos/18259150/pexels-photo-18259150/free-photo-of-smartwatch-on-ground.jpeg?auto=compress&cs=tinysrgb&w=600",
   description: "Track your daily activity and fitness goals.",
   original_price: 120,
 },
 {
   title: "Electric Kettle",
   name: "Electric Kettle",
   category: "Others",
   image_link: "https://images.pexels.com/photos/4108671/pexels-photo-4108671.jpeg?auto=compress&cs=tinysrgb&w=600",
   description: "Fast boiling electric kettle with auto shut-off.",
   original_price: 30,
 },
 {
   title: "Coffee Maker",
   name: "Coffee Maker",
   category: "Others",
   image_link: "https://images.pexels.com/photos/714563/pexels-photo-714563.jpeg?auto=compress&cs=tinysrgb&w=600",
   description: "Automatic coffee maker with customizable settings.",
   original_price: 100,
 }
];


async function insertProducts() {
  try {
    await Product.insertMany(products);
    console.log("Products inserted successfully!");
  } catch (error) {
    console.error("Error inserting products:", error);
  } finally {
    mongoose.connection.close();
  }
}

insertProducts();
