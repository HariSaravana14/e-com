import React from "react";
import { Link } from "react-router-dom";
import "../styles/Wishlist.css";

const Wishlist = ({ wishlist, removeFromWishlist, addToCart }) => {
  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="empty-wishlist">
        <div className="empty-wishlist-icon">❤</div>
        <h2>Your Wishlist is Empty</h2>
        <p>Add items you love to your wishlist. Review them anytime and easily move them to the cart.</p>
        <Link to="/product" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page-container">
      <h1 className="wishlist-title">My Wishlist ({wishlist.length} items)</h1>

      <div className="wishlist-items">
        {wishlist.map((product) => (
          <div className="wishlist-item" key={product.id}>
            <button className="remove-wishlist-btn" onClick={() => removeFromWishlist(product.id)}>
              ×
            </button>

            <Link to={`/product/${product.id}`} className="wishlist-product-image">
              <img src={product.image} alt={product.name} />
            </Link>

            <div className="wishlist-product-info">
              <Link to={`/product/${product.id}`} className="wishlist-product-name">
                {product.name}
              </Link>
              <div className="wishlist-product-brand">{product.brand}</div>

              <div className="wishlist-size-available">
                Size: <span>{product.size}</span>
              </div>

              <div className="wishlist-price-container">
                <span className="wishlist-offer-price">₹{product.price}</span>
                <span className="wishlist-original-price">₹{product.originalPrice}</span>
                <span className="wishlist-discount">{product.discount}% OFF</span>
              </div>
            </div>

            <div className="wishlist-actions">
              <button
                className="wishlist-add-to-cart"
                onClick={() => {
                  addToCart(product);
                  removeFromWishlist(product.id);
                }}
              >
                MOVE TO BAG
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="wishlist-footer">
        <Link to="/product" className="continue-shopping-link">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;
