import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Admin.css'; // 👈 අපි අලුතින් හදන CSS එක

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'add' or 'edit'

  // Products State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form States (Add / Edit සඳහා)
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('Headphones');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');

  // 1. Fetch All Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:5000/api/products');
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Add / Edit Product Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, price: Number(price), image, category, countInStock: Number(countInStock), description };

    try {
      if (editingId) {
        // Edit Product
        await axios.put(`http://localhost:5000/api/products/${editingId}`, productData);
        alert('Product updated successfully! 🎉');
      } else {
        // Add Product
        await axios.post('http://localhost:5000/api/products', productData);
        alert('New product added successfully! 🚀');
      }
      resetForm();
      fetchProducts();
      setActiveTab('list');
    } catch (error) {
      console.error("Submit error", error);
      alert("වැඩේ අවුල් ගියා මචන්! ටිකක් බලන්න.");
    }
  };

  // Edit Button එක ක්ලික් කරාම Form එක පුරවන හැටි
  const handleEditClick = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setCategory(product.category || 'Headphones');
    setCountInStock(product.countInStock);
    setDescription(product.description || '');
    setActiveTab('add'); // Form එක තියෙන ටැබ් එකට යනවා
  };

  // Delete Product
  const handleDelete = async (id) => {
    if (window.confirm('මචන්, මේක ඇත්තටම Delete කරන්නද ඕනේ? ⚠️')) {
      try {
        await axios.delete(`https://e-items-lk.onrender.com/api/products/${id}`);
        alert('Product deleted! 🗑️');
        fetchProducts();
      } catch (error) {
        console.error("Delete error", error);
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setPrice('');
    setImage('');
    setCategory('Headphones');
    setCountInStock('');
    setDescription('');
  };

  return (
    <div className="admin-page-wrapper">
      <div className="admin-container">
        
        {/* 🧭 Header Section */}
        <header className="admin-header">
          <div>
            <span className="admin-badge">🔐 SECURE PANEL</span>
            <h1 className="admin-title">E-items Admin Dashboard</h1>
          </div>
          <button onClick={() => navigate('/home')} className="home-btn">
            ◀ Back to Shop
          </button>
        </header>

        {/* 📑 Control Tabs */}
        <div className="admin-tabs">
          <button 
            className={`admin-tab-btn ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => { setActiveTab('list'); resetForm(); }}
          >
            📋 Product List ({products.length})
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'add' && !editingId ? 'active' : ''}`}
            onClick={() => { resetForm(); setActiveTab('add'); }}
          >
            ➕ Add New Product
          </button>
          {editingId && (
            <button className="admin-tab-btn active">
              📝 Editing: {name.substring(0, 15)}...
            </button>
          )}
        </div>

        {/* ⚡ CONTENT AREA */}
        <div className="admin-content-box">
          
          {/* 1. LIST VIEW */}
          {activeTab === 'list' && (
            loading ? (
              <div className="loader-container"><div className="modern-loader"></div></div>
            ) : (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>
                          <img src={product.image} alt={product.name} className="table-product-img" />
                        </td>
                        <td>
                          <div className="table-product-name">{product.name}</div>
                        </td>
                        <td>
                          <span className="table-cat-badge">{product.category || 'Gadget'}</span>
                        </td>
                        <td className="table-price">Rs. {product.price.toLocaleString()}</td>
                        <td>
                          <span className={`table-stock-badge ${product.countInStock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                            {product.countInStock > 0 ? `${product.countInStock} Left` : 'Out of Stock'}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button onClick={() => handleEditClick(product)} className="action-btn edit-btn">Edit 📝</button>
                            <button onClick={() => handleDelete(product._id)} className="action-btn delete-btn">Delete 🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {/* 2. ADD / EDIT FORM VIEW */}
          {activeTab === 'add' && (
            <div className="form-container">
              <h2 className="form-title">{editingId ? '📝 Edit Product Details' : '✨ Add Premium Product'}</h2>
              
              <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-grid">
                  
                  <div className="form-group">
                    <label>Product Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Sony WH-1000XM5 Headphones" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option value="Headphones">Headphones</option>
                      <option value="Laptops">Laptops</option>
                      <option value="Phones">Phones</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Price (Rs.)</label>
                    <input 
                      type="number" 
                      placeholder="89000" 
                      value={price} 
                      onChange={(e) => setPrice(e.target.value)} 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label>Count In Stock</label>
                    <input 
                      type="number" 
                      placeholder="10" 
                      value={countInStock} 
                      onChange={(e) => setCountInStock(e.target.value)} 
                      required 
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Image URL</label>
                    <input 
                      type="text" 
                      placeholder="https://images.unsplash.com/..." 
                      value={image} 
                      onChange={(e) => setImage(e.target.value)} 
                      required 
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea 
                      rows="4" 
                      placeholder="Write key specs and features..." 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                    />
                  </div>

                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    {editingId ? 'Save Changes ✅' : 'Publish Product 🚀'}
                  </button>
                  <button type="button" className="cancel-btn" onClick={() => { resetForm(); setActiveTab('list'); }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}