import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import productsData from '../components/products';
import '../styles/AddToCart.css';

const AddToCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const enrichedCart = storedCart.map(item => {
            const productDetails = productsData.find(p => p.id === item.id);
            return { ...productDetails, quantity: item.quantity };
        });
        setCartItems(enrichedCart);
    }, []);

    const removeItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const updateQuantity = (id, quantity) => {
        const updatedCart = cartItems.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handlePlaceOrder = () => {
        alert('Order Placed Successfully!');
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            <div className="cart-content">
                <div className="cart-items-section">
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <div className="cart-items">
                            {cartItems.map(item => (
                                <div key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.name} className="cart-item-img" />
                                    <div className="cart-item-details">
                                        <h3>{item.name}</h3>
                                        <p><strong>Brand:</strong> {item.brand}</p>
                                        <p><strong>Category:</strong> {item.occasion}</p>
                                        <p><strong>Gender:</strong> {item.gender}</p>
                                        <p><strong>Available Colors:</strong> {item.colors.join(", ")}</p>
                                        <p><strong>Size:</strong> {item.selectedSize || item.size}</p>
                                        <p className="price">Price: ₹{item.price} <span className="original-price">₹{item.originalPrice}</span></p>
                                        <p><strong>Discount:</strong> {item.discount}% OFF</p>
                                        <p><strong>Offer:</strong> {item.offer}</p>
                                        <div className="quantity-control">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                        <button onClick={() => removeItem(item.id)} className="remove-btn">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {cartItems.length > 0 && (
                    <div className="cart-summary">
                        <h3>Price Details</h3>
                        <div className="summary-details">
                            <div className="price-breakdown">
                                <p>Total Items: {cartItems.length}</p>
                                <p>Total Price: ₹{calculateTotalPrice()}</p>
                                <p>Discount: -₹{(calculateTotalPrice() * 0.1).toFixed(2)}</p>
                            </div>
                            <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddToCart;