import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/aboutus";
import Contact from "./pages/Contact";
import Login from "./pages/LoginPage";
import ShopPage from "./pages/ShopPage";
import ProductDetails from "./components/ProductDetails";
import Wishlist from "./pages/Wishlist";  // Ensure correct import
import AddToCart from "./pages/AddToCart";
import ForgotPassword from "./pages/ForgotPassword";  // Ensure correct import
import RegisterPage from "./pages/RegisterPage";


function App() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Load wishlist & cart from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    const savedCart = localStorage.getItem("cart");
    const loginStatus = localStorage.getItem("isLoggedIn");

    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedCart) setCart(JSON.parse(savedCart));
    if (loginStatus) setIsLoggedIn(JSON.parse(loginStatus));
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Function to add/remove products from wishlist
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.find((item) => item.id === product.id);
      return exists
        ? prevWishlist.filter((item) => item.id !== product.id)
        : [...prevWishlist, product];
    });
  };

  // Function to remove from wishlist
  const removeFromWishlist = (id) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
  };

  // Function to add products to cart
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      return exists
        ? prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
          )
        : [...prevCart, { ...product, quantity }];
    });

    // Remove from wishlist when adding to cart
    removeFromWishlist(product.id);
  };

  // Function to handle login status
  const handleLogin = (status) => {
    setIsLoggedIn(status);
    localStorage.setItem("isLoggedIn", JSON.stringify(status));
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} cartItems={cart.length} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route
          path="/product"
          element={<ShopPage toggleWishlist={toggleWishlist} wishlist={wishlist} addToCart={addToCart} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetails toggleWishlist={toggleWishlist} wishlist={wishlist} addToCart={addToCart} />}
        />
        <Route
          path="/wishlist"
          element={<Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} addToCart={addToCart} />}
        />
        <Route path="/cart" element={<AddToCart cart={cart} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
