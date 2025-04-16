import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
// import "../styles/PopularProduct.css"

const PopularProductCard = ({ product, addToWishlist }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = () => {
    addToWishlist(product);
    setIsWishlisted(prev => !prev); // Toggle the state
  };

  return (
    <div className="product-card">
      {/* Hot deal badge if discount is high */}
      {product.discount >= 25 && <div className="hot-deal">HOT DEAL</div>}
      
      {/* Product image wrapped in Link for navigation */}
      <Link to={`/product/${product.id}`} className="product-link"> {/* Link to ProductDetails */}
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>
      
      {/* Wishlist button */}
      <button 
        className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`} 
        onClick={handleWishlist}
      >
        <span className="heart-icon"></span>
      </button>
      
      {/* Product brand */}
      <div className="product-brand">{product.brand}</div>
      
      {/* Product name */}
      <h3 className="product-name">{product.name}</h3>
      
      {/* Sizes available */}
      <div className="sizes-available">
        Size: <span>{product.size}</span>
      </div>
      
      {/* Price container */}
      <div className="price-container">
        <span className="original-price">₹{product.originalPrice}</span>
        <span className="offer-price">₹{product.price}</span>
        <span className="discount">{product.discount}% OFF</span>
      </div>
      
      {/* Offer text */}
      <div className="offer-text">{product.offer}</div>
      
      {/* Free delivery badge */}
      {product.offer.includes("Free Shipping") && (
        <div className="free-delivery">✓ Free Delivery</div>
      )}
    </div>
  );
};

export default PopularProductCard;