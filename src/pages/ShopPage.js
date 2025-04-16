import React from 'react';
import PopularProducts from '../components/PopularProducts';

const ShopPage = ({ toggleWishlist, wishlist, addToCart }) => {
    return (
        <div className="shop-page-container">
            <h1 className="shop-page-title">Shop Our Collection</h1>
            <div className="shop-content">
                {/* Pass down the necessary props to PopularProducts */}
                <PopularProducts 
                    toggleWishlist={toggleWishlist} 
                    wishlist={wishlist} 
                    addToCart={addToCart}
                />
            </div>
        </div>
    );
};

export default ShopPage;