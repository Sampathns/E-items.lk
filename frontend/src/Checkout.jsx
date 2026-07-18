import React, { useState, useContext } from 'react';
import { CartContext } from './context/TempCart'; // 👈 ඔයාගේ context පාත් එකට ගැලපෙන්න බලන්න

export default function Checkout({ grandTotal, onCancel }) {
  const { cartItems, clearCart } = useContext(CartContext); // clearCart එකක් context එකේ නැත්නම් හදාගන්න වෙයි
  
  // Form එකේ ඩේටා ස්ටේට් එක
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);

  // Input වෙනස් වෙද්දී ඩේටා අප්ඩේට් කරන ලොජික් එක
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🚀 ඕඩර් එක සබ්මිට් කරන ප්‍රධාන ලොජික් එක
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Backend එකට යවන Object එක
    const orderData = {
      customerDetails: formData,
      items: cartItems.map(item => ({
        productId: item._id,
        name: item.name,
        qty: item.qty,
        price: item.price
      })),
      totalAmount: grandTotal,
      paymentMethod: 'COD', // Cash on Delivery
      status: 'Pending',
      createdAt: new Date()
    };

    try {
      // 🌐 මෙතනට ඔයාගේ Backend API URL එක දාන්න (உදා: http://localhost:5000/api/orders)
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // බීකන් එකක් හෝ ටෝකන් එකක් තියෙනවා නම් මෙතනට දාන්න Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert('නියමයි මචන්! ඕඩර් එක සුපිරියටම ප්ලේස් වුණා. 🚀');
        if (clearCart) clearCart(); // ඕඩර් එක සාර්ථක නම් Cart එක හිස් කරනවා
        window.location.href = '/home'; // හෝ වෙනත් Success පේජ් එකකට යවන්න
      } else {
        alert('අයියෝ මචන්, ඕඩර් එක දාන්න බැරි වුණා. පොඩ්ඩක් නැවත උත්සාහ කරන්න.');
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert('Backend එකට කනෙක්ට් වෙන්න බැහැ මචන්!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-form-container">
      <h3 className="summary-title">Delivery Details 🚚</h3>
      <p className="checkout-sub">බඩු ගෙදරටම ආවාම සල්ලි ගෙවන්න (Cash on Delivery)</p>
      
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="input-group">
          <label>සම්පූර්ණ නම (Full Name)</label>
          <input 
            type="text" 
            name="fullName" 
            required 
            placeholder="E.g., Kamalsiri Perera" 
            value={formData.fullName} 
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>දුරකථන අංකය (Phone Number)</label>
          <input 
            type="tel" 
            name="phone" 
            required 
            placeholder="E.g., 0771234567" 
            value={formData.phone} 
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>ලිපිනය (Delivery Address)</label>
          <textarea 
            name="address" 
            required 
            placeholder="E.g., No 45, Galle Road" 
            value={formData.address} 
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="input-group">
          <label>නගරය (City)</label>
          <input 
            type="text" 
            name="city" 
            required 
            placeholder="E.g., Colombo" 
            value={formData.city} 
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>වෙනත් සටහන් (Optional Notes)</label>
          <input 
            type="text" 
            name="notes" 
            placeholder="E.g., Call before delivery" 
            value={formData.notes} 
            onChange={handleChange}
          />
        </div>

        <div className="checkout-actions-row">
          <button type="button" onClick={onCancel} className="cancel-checkout-btn">
            Back to Summary
          </button>
          <button type="submit" disabled={loading} className="place-order-btn">
            {loading ? 'Placing Order...' : 'Confirm Order (COD) 🎉'}
          </button>
        </div>
      </form>
    </div>
  );
}