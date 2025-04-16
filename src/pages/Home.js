import React, { useEffect, useRef } from "react";
import "../styles/Home.css";
import shoeImage from "../assets/images/Home-shoe1.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  const shoeImgRef = useRef(null);
  const textRef = useRef(null);
  const backgroundWordRef = useRef(null);

  useEffect(() => {
    // First animate the shoe
    shoeImgRef.current.classList.add("bounceIn");
    
    // Animate text and background word after shoe animation
    const textTimeout = setTimeout(() => {
      if (textRef.current) {
        textRef.current.style.opacity = "1";
        textRef.current.style.transform = "translateY(0)";
      }
      
      if (backgroundWordRef.current) {
        backgroundWordRef.current.classList.add("landingWord");
      }
    }, 1500);

    return () => clearTimeout(textTimeout);
  }, []);

  return (
    <div className="home-container">
      {/* Large background word */}
      <div className="background-word" ref={backgroundWordRef}>
        SNEAKERS
      </div>
      
      {/* Shoe Image & Content */}
      <div className="shoe-container">
        <div className="shoe-card">
          <img 
            src={shoeImage} 
            alt="Stylish Sneakers" 
            className="shoe-img"
            ref={shoeImgRef}
          />
        </div>
        <div className="text-container" ref={textRef}>
          <Link to="/product">
            <button className="shop-button">Shop Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;