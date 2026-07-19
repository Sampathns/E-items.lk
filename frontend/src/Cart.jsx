import React, { useContext, useState } from 'react'; // 👈 useState එකතු කරා
import { CartContext } from './context/Cartcontext'; 
import { useNavigate } from 'react-router-dom';
import Checkout from './Checkout'; // 👈 අලුත් Checkout එක Import කරා
import './Cart.css'; 

export default function Cart() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useContext(CartContext);
  const navigate = useNavigate();
  
  // 👈 Checkout Form එක පෙන්වන්න ස්ටේට් එකක් දැම්මා
  const [isCheckout, setIsCheckout] = useState(false);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const shippingFee = totalPrice > 0 ? 350 : 0; 
  const grandTotal = totalPrice + shippingFee;

  return (
    <div className="cart-page-wrapper">
      <div className="cart-container">
        
        <div className="cart-header-actions">
          <button onClick={() => navigate('/home')} className="back-btn">
            <span>◀</span> Back to Shop
          </button>
        </div>

        <h2 className="cart-page-title">Your Shopping Cart 🛒</h2>

        {cartItems.length === 0 ? (
          <div className="empty-cart-container">
            <div className="empty-cart-icon">🛍️</div>
            <h3>Your cart is empty !</h3>
            <p>Select a item nowww</p>
            <button onClick={() => navigate('/home')} className="shop-now-btn">
              Shop Now 
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            
            {/* Left Side: Cart Items List */}
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item-card">
                  
                  <div className="cart-item-img-wrapper">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-item-details">
                    <span className="cart-item-cat">{item.category || 'Premium Tech'}</span>
                    <h4 className="cart-item-name">{item.name}</h4>
                    <span className="cart-item-price">Rs. {item.price.toLocaleString()}</span>
                  </div>

                  <div className="cart-item-qty-section">
                    <span className="qty-label">Quantity</span>
                    <div className="qty-picker">
                      <button 
                        onClick={() => decreaseQty(item._id)} 
                        className="qty-btn minus"
                        disabled={item.qty <= 1}
                      >
                        -
                      </button>
                      <span className="qty-number">{item.qty}</span>
                      <button 
                        onClick={() => increaseQty(item._id)} 
                        className="qty-btn plus"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-actions">
                    <div className="item-subtotal">
                      <span className="subtotal-label">Subtotal</span>
                      <span className="subtotal-value">Rs. {(item.qty * item.price).toLocaleString()}</span>
                    </div>
                    <button onClick={() => removeFromCart(item._id)} className="remove-item-btn">
                      Delete 🗑️
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Right Side: Dynamic Card (Summary OR Checkout Form) 👈 */}
            <div className="cart-summary-card">
              {!isCheckout ? (
                /* 📊 SUMMARY VIEW */
                <>
                  <h3 className="summary-title">Order Summary</h3>
                  
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>Rs. {totalPrice.toLocaleString()}</span>
                  </div>
                  
                  <div className="summary-row">
                    <span>Estimated Shipping</span>
                    <span>{shippingFee === 0 ? 'Free' : `Rs. ${shippingFee.toLocaleString()}`}</span>
                  </div>
                  
                  <div className="summary-divider"></div>
                  
                  <div className="summary-row total">
                    <span>Grand Total</span>
                    <span className="grand-total-price">Rs. {grandTotal.toLocaleString()}</span>
                  </div>

                  <button onClick={() => setIsCheckout(true)} className="checkout-btn">
                    Proceed to Checkout 🚀
                  </button>

                  <div className="secure-badge">
                    <span>🔒</span> Safe & Secure Checkout
                  </div>
                </>
              ) : (
                /* 🚚 CHECKOUT FORM VIEW */
                <Checkout 
                  grandTotal={grandTotal} 
                  onCancel={() => setIsCheckout(false)} 
                />
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}