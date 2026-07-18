import React, { useState, useEffect, useContext } from 'react';
import './Home.css'; 
import axios from 'axios';
import { CartContext } from './context/Cartcontext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const { cartItems, addToCart } = useContext(CartContext);

 
  const categories = ['All', 'Headphones', 'Laptops', 'Phones', 'Accessories'];

  
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://e-items-lk.onrender.com/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Product fetch error", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

 
  useEffect(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, products]);

  const totalCartQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="home-wrapper">
      
      
      <nav className="navbar">
        <div className="nav-logo" onClick={() => navigate('/home')}>
          E-items<span>.lk</span>
        </div>

       
        <div className="nav-search-container">
          <input 
            type="text" 
            placeholder="Search premium gadgets..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="nav-search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <div className="nav-actions">
          <div className="nav-cart-icon" onClick={() => navigate('/cart')}>
            <span className="cart-emoji">🛒</span>
            <span className="cart-text">Cart</span>
            {totalCartQty > 0 && <span className="cart-badge">{totalCartQty}</span>}
          </div>

          {userInfo && (
            <div className="welcome-msg">
              Welcome, <span>{userInfo.name}</span>
            </div>
          )}
          <button onClick={handleLogout} className="logout-btn">Log Out 🚪</button>
        </div>
      </nav>

      {/* ⚡ 2. Glowing Hero Banner */}
      <div className="hero-banner">
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>
        <div className="hero-content">
          <span className="hero-tag">⚡ PREMIUM TECH STORE</span>
          <h1 className="hero-title">Elevate Your Sound <br />& Tech Experience</h1>
          <p className="hero-subtitle">
            ලංකාවේ අංක 1 ඉලෙක්ට්‍රොනික උපකරණ අලෙවිසැල. වගකීමක් සහිත උසස්ම තත්ත්වයේ නිෂ්පාදන නිවසටම ගෙන්වා ගන්න.
          </p>
          <a href="#shop-section" className="hero-btn">Shop Collection</a>
        </div>
      </div>

      {/* 🛍️ 3. Main Shop Content */}
      <main className="main-content" id="shop-section">
        
        {/* Category Controls & Title */}
        <div className="shop-header">
          <div>
            <h2 className="section-title">Latest Gadgets ✨</h2>
            <p className="section-subtitle">Explore our handpicked collection of high-quality products</p>
          </div>

          {/* Filter Tabs */}
          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-tab-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="loader-container">
            <div className="modern-loader"></div>
          </div>
        ) : (
          /* 📦 Grid of Cards */
          <div className="products-grid">
            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <span>📦</span>
                <p>භාණ්ඩ කිසිවක් සොයාගත නොහැක!</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div className="product-card" key={product._id}>
                  
                  {/* Image Container with aspect ratio */}
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} className="product-image" />
                    {product.countInStock === 0 && (
                      <span className="out-of-stock-tag">Sold Out</span>
                    )}
                  </div>

                  {/* Card Details */}
                  <div className="product-info">
                    <div>
                      <span className="product-cat-tag">{product.category || 'Premium Gadget'}</span>
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-desc">{product.description}</p>
                    </div>
                    
                    <div className="product-footer-section">
                      <div className="price-container">
                        <span className="price-label">Best Price</span>
                        <span className="product-price">Rs. {product.price.toLocaleString()}</span>
                      </div>
                      
                      <button 
                        className="add-to-cart-btn"
                        disabled={product.countInStock === 0}
                        onClick={() => addToCart(product)}
                      >
                        <span>🛒</span>
                        {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}  
                      </button>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* 🛡️ 4. Modern Trust Badges */}
      <footer className="trust-footer">
        <div className="trust-grid">
          <div className="trust-card">
            <span className="trust-icon">🚚</span>
            <h4>දිවයින පුරා බෙදාහැරීම</h4>
            <p>ආරක්ෂිතව සහ වේගවත්ව ඔබගේ නිවසටම</p>
          </div>
          <div className="trust-card border-x">
            <span className="trust-icon">🔒</span>
            <h4>ආරක්ෂිත ගෙවීම්</h4>
            <p>100% විශ්වාසනීය ගනුදෙනු විධික්‍රම</p>
          </div>
          <div className="trust-card">
            <span className="trust-icon">🛡️</span>
            <h4>Genuine Warranty</h4>
            <p>ලංකාවේ හොඳම අලෙවියෙන් පසු සේවාව</p>
          </div>
        </div>
      </footer>

    </div>
  );
}