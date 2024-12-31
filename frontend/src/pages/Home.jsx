import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import websiteLogo from "/src/assets/Swapify-logo.png";
import Carousel from "../components/Carousel";
import Recommendations from "../components/Recomendations";
import Footer from "../components/Footer";
import { ProductArray } from "../assets/data";

function Home() {
  const images = [
    "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1756086/pexels-photo-1756086.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/18259150/pexels-photo-18259150/free-photo-of-smartwatch-on-ground.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg?auto=compress&cs=tinysrgb&w=600"
  ];

  return (
    <div className="relative h-full w-screen bg-black text-white">
      

      <main className="">
        <Carousel images={images} height="500px" />
        <Recommendations />
      </main>

    </div>
  );
}

export default Home;
