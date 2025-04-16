import React from "react";
import "../styles/AboutUs.css"; // Using our improved CSS file
import shoeImage from "../assets/images/big-shoe4.jpeg";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="about-container">
        <div className="about-text">
          <h1>
            We Provide You <span className="highlight">Super Quality</span> Shoes
          </h1>
          <p>
            Ensuring premium comfort and style, our meticulously crafted footwear
            is designed to elevate your experience, providing you with
            unmatched quality, innovation, and a touch of elegance.
          </p>
          <p>
            Our dedication to details and excellence ensures your satisfaction.
          </p>
          <Link to='/product/9'>
          <button className="btn">View Details</button>
          </Link>
        </div>
        <div className="about-image">
          
          <img src={shoeImage} alt="Super Quality Shoes" />
          
        </div>
      </div>
    </section>
  );
};

export default AboutUs;