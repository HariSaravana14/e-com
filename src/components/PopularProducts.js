import React, { useState, useEffect, useRef, useCallback } from "react";
import PopularProductCard from "./PopularProductCard";
import productsData from "./products";
import "../styles/PopularProduct.css";
// import "../styles/ProductDetails.css";

const PopularProducts = ({ toggleWishlist, wishlist, addToCart }) => {
    const [products, setProducts] = useState(productsData);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const productsPerPage = 8;
    const observer = useRef();
    const lastProductRef = useRef();
    const [showWishlist, setShowWishlist] = useState(false);
    // Now we'll use the wishlist prop passed down instead of maintaining local state
    // const [wishlist, setWishlist] = useState([]);

    const [selectedFilters, setSelectedFilters] = useState({
        size: [],
        brand: [],
        gender: "",
        priceRange: { min: 0, max: 2500 },
        discountRange: { min: 0, max: 100 },
        offers: false,
        occasion: [],
        colors: []
    });

    // Extract all unique colors from products for the color filter
    const allColors = productsData.reduce((colors, product) => {
        return [...colors, ...product.colors];
    }, []);
    const uniqueColors = [...new Set(allColors)];

    // Apply filters
    const applyFilters = useCallback(() => {
        let filtered = [...productsData];
        
        // Apply gender filter
        if (selectedFilters.gender) {
            filtered = filtered.filter(product => product.gender === selectedFilters.gender);
        }

        // Apply size filter
        if (selectedFilters.size.length > 0) {
            filtered = filtered.filter(product => 
                selectedFilters.size.includes(product.size)
            );
        }

        // Apply brand filter
        if (selectedFilters.brand.length > 0) {
            filtered = filtered.filter(product => 
                selectedFilters.brand.includes(product.brand)
            );
        }

        // Apply price range filter
        filtered = filtered.filter(product =>
            product.price >= selectedFilters.priceRange.min &&
            product.price <= selectedFilters.priceRange.max
        );

        // Apply discount filter
        filtered = filtered.filter(product =>
            product.discount >= selectedFilters.discountRange.min
        );

        // Apply offers filter
        if (selectedFilters.offers) {
            filtered = filtered.filter(product =>
                product.offer.includes("Free Shipping") || product.discount >= 25
            );
        }

        // Apply occasion filter
        if (selectedFilters.occasion.length > 0) {
            filtered = filtered.filter(product =>
                selectedFilters.occasion.includes(product.occasion)
            );
        }

        // Apply color filter
        if (selectedFilters.colors.length > 0) {
            filtered = filtered.filter(product =>
                product.colors.some(color => selectedFilters.colors.includes(color))
            );
        }

        setProducts(filtered);
        setVisibleProducts(filtered.slice(0, productsPerPage));
        setPage(1);
    }, [selectedFilters, productsPerPage]);

    // Load more products for infinite scrolling
    const loadMoreProducts = useCallback(() => {
        setLoading(true);
        setTimeout(() => {
            const nextPage = page + 1;
            const nextProducts = products.slice(0, nextPage * productsPerPage);
            setVisibleProducts(nextProducts);
            setPage(nextPage);
            setLoading(false);
        }, 500);
    }, [page, products, productsPerPage]);

    // Apply filters when component mounts or filters change
    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    // Set up intersection observer for infinite scrolling
    useEffect(() => {
        if (loading) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && visibleProducts.length < products.length) {
                loadMoreProducts();
            }
        });

        if (lastProductRef.current) {
            observer.current.observe(lastProductRef.current);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [loading, loadMoreProducts, products.length, visibleProducts.length]);

    // Handle filter changes
    const handleFilterChange = (type, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [type]: Array.isArray(prev[type]) 
                ? prev[type].includes(value)
                    ? prev[type].filter(item => item !== value)
                    : [...prev[type], value]
                : value
        }));
    };

    // Handle price range change
    const handlePriceRangeChange = (e, boundary) => {
        const value = parseInt(e.target.value, 10);
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            priceRange: {
                ...prevFilters.priceRange,
                [boundary]: value
            }
        }));
    };

    // Handle discount range change
    const handleDiscountRangeChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            discountRange: {
                ...prevFilters.discountRange,
                min: value
            }
        }));
    };

    // Add to wishlist - now using the toggleWishlist prop
    const addToWishlist = (product) => {
        toggleWishlist(product);
    };

    // Toggle wishlist view
    const toggleWishlistView = () => {
        setShowWishlist(!showWishlist);
    };

    // Extract all unique occasions
    const occasions = [...new Set(productsData.map(product => product.occasion))];

    return (
        <div>
            <div className="shop-container">
                {/* Filter sidebar */}
                <div className="filter-sidebar">
                    <div className="filter-header">
                        <h3>Filters</h3>
                        <div className="filter-actions">
                            <button className="apply-btn" onClick={applyFilters}>Apply</button>
                            <button className="reset-btn" onClick={() => {
                                setSelectedFilters({
                                    size: [],
                                    brand: [],
                                    gender: "",
                                    priceRange: { min: 0, max: 2500 },
                                    discountRange: { min: 0, max: 100 },
                                    offers: false,
                                    occasion: [],
                                    colors: []
                                });
                            }}>Reset</button>
                        </div>
                    </div>

                    {/* Gender Filter */}
                    <div className="filter-section">
                        <h4>Gender</h4>
                        <div className="filter-options">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="gender"
                                    checked={selectedFilters.gender === "Men"}
                                    onChange={() => handleFilterChange("gender", "Men")}
                                />
                                Men
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="gender"
                                    checked={selectedFilters.gender === "Women"}
                                    onChange={() => handleFilterChange("gender", "Women")}
                                />
                                Women
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="gender"
                                    checked={selectedFilters.gender === "Unisex"}
                                    onChange={() => handleFilterChange("gender", "Unisex")}
                                />
                                Unisex
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="gender"
                                    checked={selectedFilters.gender === ""}
                                    onChange={() => handleFilterChange("gender", "")}
                                />
                                All
                            </label>
                        </div>
                    </div>

                    {/* Other filters remain the same ... */}
                    
                    {/* Size Filter */}
                    <div className="filter-section">
                        <h4>Size</h4>
                        <div className="filter-options">
                            {[6, 7, 8, 9, 10].map((size) => (
                                <label key={size} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={selectedFilters.size.includes(size)}
                                        onChange={() => handleFilterChange("size", size)}
                                    />
                                    {size}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Brand Filter */}
                    <div className="filter-section">
                        <h4>Brand</h4>
                        <div className="filter-options">
                            {["Nike", "Adidas", "Puma", "Reebok"].map((brand) => (
                                <label key={brand} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={selectedFilters.brand.includes(brand)}
                                        onChange={() => handleFilterChange("brand", brand)}
                                    />
                                    {brand}
                                </label>
                            ))}
                        </div>
                        {/* Discount Range Filter */}
    <div className="filter-section">
        <h4>Discount Range</h4>
        <input
            type="range"
            min="0"
            max="100"
            value={selectedFilters.discountRange.min}
            onChange={handleDiscountRangeChange}
        />
    </div>

    {/* Offers Filter */}
    <div className="filter-section">
        <h4>Offers</h4>
        <label>
            <input
                type="checkbox"
                checked={selectedFilters.offers}
                onChange={() => handleFilterChange("offers", !selectedFilters.offers)}
            />
            Free Shipping or 25% off
        </label>
    </div>

    {/* Occasion Filter */}
    <div className="filter-section">
        <h4>Occasion</h4>
        <div className="filter-options">
            {["Casual", "Formal", "Sports"].map((occasion) => (
                <label key={occasion}>
                    <input
                        type="checkbox"
                        checked={selectedFilters.occasion.includes(occasion)}
                        onChange={() => handleFilterChange("occasion", occasion)}
                    />
                    {occasion}
                </label>
            ))}
        </div>
    </div>

    {/* Color Filter */}
    <div className="filter-section">
        <h4>Colors</h4>
        <div className="filter-options">
            {uniqueColors.map((color) => (
                <label key={color}>
                    <input
                        type="checkbox"
                        checked={selectedFilters.colors.includes(color)}
                        onChange={() => handleFilterChange("colors", color)}
                    />
                    {color}
                </label>
            ))}
        </div>
    </div>
                    </div>

                    {/* Wishlist toggle button */}
                    <div className="filter-section">
                        <button 
                            className="wishlist-toggle-btn"
                            onClick={toggleWishlistView}
                        >
                            {showWishlist ? "Hide Wishlist" : "View Wishlist"} ({wishlist.length})
                        </button>
                    </div>
                </div>

                {/* Product Grid Section */}
                <div className="product-container">
                    {showWishlist ? (
                        /* Wishlist View */
                        <div className="wishlist-section">
                            <h2 className="section-title">Your Wishlist ({wishlist.length})</h2>
                            {wishlist.length === 0 ? (
                                <p>No items in your wishlist yet.</p>
                            ) : (
                                <div className="wishlist-products">
                                    {wishlist.map((product) => (
                                        <PopularProductCard
                                            key={product.id}
                                            product={product}
                                            addToWishlist={addToWishlist}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Product Grid View */
                        <>
                            <h2 className="section-title">Popular Products </h2>
                            {visibleProducts.length === 0 ? (
                                <p>No products match your selected filters.</p>
                            ) : (
                                <div className="product-grid">
                                    {visibleProducts.map((product, index) => {
                                        if (index === visibleProducts.length - 1) {
                                            return (
                                                <div ref={lastProductRef} key={product.id}>
                                                    <PopularProductCard 
                                                        product={product} 
                                                        addToWishlist={addToWishlist} 
                                                    />
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <PopularProductCard 
                                                    key={product.id} 
                                                    product={product} 
                                                    addToWishlist={addToWishlist} 
                                                />
                                            );
                                        }
                                    })}
                                </div>
                            )}
                            {loading && (
                                <div className="loading-container">
                                    <div className="loading-spinner"></div>
                                    <p>Loading more products...</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PopularProducts;