import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/ProductDetails.css";
// import "../styles/PopularProduct.css";

const ProductDetails = ({ addToCart, addToWishlist, wishlist }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fetch product data based on ID
  useEffect(() => {
    // In a real app, you would fetch from your API
    // This is a mock fetch from your productsData
    import("./products").then((module) => {
      const productsData = module.default;
      const foundProduct = productsData.find((p) => p.id === parseInt(id));
      setProduct(foundProduct);
      setLoading(false);
      
      // Check if product is in wishlist
      const isInWishlist = wishlist.some(item => item.id === parseInt(id));
      setIsWishlisted(isInWishlist);
    });
  }, [id, wishlist]);

  // Handle adding to cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart({ ...product, selectedSize, quantity });
  };

  // Handle adding to wishlist
  const handleAddToWishlist = () => {
    addToWishlist(product);
    setIsWishlisted(true);
  };

  // Handle buy now
  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart({ ...product, selectedSize, quantity });
    // Navigate to checkout
    window.location.href = "/checkout";
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return <div className="error-message">Product not found</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details-left">
        {/* Product Images */}
        <div className="product-images">
          <div className="product-main-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-thumbnail-images">
            {/* In a real app, you would have multiple images */}
            <img src={product.image} alt={product.name} className="selected" />
            <img src={product.image} alt={product.name} />
            <img src={product.image} alt={product.name} />
            <img src={product.image} alt={product.name} />
          </div>
        </div>
      </div>

      <div className="product-details-right">
        {/* Product Info */}
        <div className="product-info">
          <div className="product-brand">{product.brand}</div>
          <h1 className="product-name">{product.name}</h1>
          
          {/* Ratings */}
          <div className="product-ratings">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? "star filled" : "star"}>★</span>
              ))}
            </div>
            <span className="rating-count">({product.reviews} reviews)</span>
          </div>

          {/* Price info */}
          <div className="product-price-info">
            <div className="price-container">
              <span className="offer-price">₹{product.price}</span>
              <span className="original-price">₹{product.originalPrice}</span>
              <span className="discount">{product.discount}% OFF</span>
            </div>
            <div className="tax-info">inclusive of all taxes</div>
          </div>

          {/* Size Selection */}
          <div className="size-selection">
            <h3>Select Size</h3>
            <div className="size-options">
              {[6, 7, 8, 9, 10].map((size) => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <Link to="#" className="size-chart-link">Size Chart</Link>
          </div>

          {/* Quantity Selection */}
          <div className="quantity-selection">
            <h3>Quantity</h3>
            <div className="quantity-controls">
              <button 
                className="quantity-btn" 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button 
                className="quantity-btn" 
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="product-actions">
            <button onClick={handleAddToCart} className="add-to-cart-btn">
              Add to Cart
            </button>
            <button onClick={handleBuyNow} className="buy-now-btn">
              Buy Now
            </button>
            <button 
              onClick={handleAddToWishlist} 
              className={`wishlist-btn ${isWishlisted ? "wishlisted" : ""}`}
            >
              <span className="heart-icon"></span>
              <span>{isWishlisted ? "Wishlisted" : "Wishlist"}</span>
            </button>
          </div>

          {/* Product Details */}
          <div className="product-details-section">
            <h3>Product Details</h3>
            <div className="product-details-content">
              <p><strong>Style:</strong> {product.style || "Casual"}</p>
              <p><strong>Gender:</strong> {product.gender}</p>
              <p><strong>Occasion:</strong> {product.occasion}</p>
              <p><strong>Colors:</strong> {product.colors.join(", ")}</p>
              <p><strong>Material:</strong> {product.material || "Synthetic"}</p>
              <p><strong>Care Instructions:</strong> Wipe with a clean, dry cloth to remove dust</p>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="delivery-options">
            <h3>Delivery Options</h3>
            <div className="delivery-input">
              <input type="text" placeholder="Enter Pincode" />
              <button>Check</button>
            </div>
            <ul className="delivery-info">
              <li>Free standard delivery on orders above ₹999</li>
              <li>Easy 30 days return & exchange</li>
              <li>Try & Buy might be available</li>
            </ul>
          </div>

          {/* Offers */}
          <div className="offers-section">
            <h3>Available Offers</h3>
            <ul className="offers-list">
              <li>{product.offer}</li>
              <li>Get additional 10% off on prepaid orders</li>
              <li>Use code WELCOME20 for 20% off on your first order</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;