import { Link } from "react-router-dom";
import "../styles/navbar.css";

import cartIcon from "../assets/cart.png"; // Ensure you have the cart icon in assets

const Navbar = ({ wishlistCount = 0 }) => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        ShoeStore
      </Link>

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/aboutus">About Us</Link>
        <Link to="/Product">Product</Link>
        <Link to="/contact">Contact Us</Link>
      </div>

      {/* Search Bar, Wishlist, Cart, and Login */}
      <div className="navbar-right">
        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search for shoes..." />
        </div>

        {/* Wishlist Icon */}
        <Link to="/wishlist" className="wishlist-icon">
          <span className="heart-icon">❤</span>
          {wishlistCount > 0 && <span className="wishlist-count">{wishlistCount}</span>}
        </Link>

        {/* Cart Icon */}
        <Link to="/cart" className="cart-icon">
        <div className="cart-icon">
          <img src={cartIcon} alt="Cart" className="animated-cart" />
        </div>
        </Link>

        {/* Login Button */}
        <Link to="/login" className="login-btn">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;