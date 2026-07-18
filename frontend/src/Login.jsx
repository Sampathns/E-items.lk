import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; 
import { useNavigate } from 'react-router-dom';

export default function Login() {
  
  const [isLogin, setIsLogin] = useState(true);

  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    if (isLogin) {
        const response = await axios.post('https://e-items-lk.onrender.com/api/users/login',{
        email,password
      });
      localStorage.setItem('userInfo',JSON.stringify(response.data));
      navigate('/home');

      console.log("Login success details:",response.data);
    } else {
      const response = await axios.post('https://e-items-lk.onrender.com/api/users/register',{
        name,
        email,
        password
      });

      alert(`Great ${response.data.message}`);
      setIsLogin(true);
      }
    }catch(error){
    if(error.response){
      alert(error.response.data.message);
    }else{
      alert("server not connectes");
     
    }
  }
};

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        
        {/* 🏢 1. වම් පැත්ත: About Section */}
        <div className="auth-about-side">
          <h1 className="brand-name">E-items<span>.lk</span></h1>
          <p className="brand-tagline">The Future of Electronics is Here.</p>
          <p className="about-text">
            Please Welcome to Our E-Store. 
            Brand New AudioDevices, Wearables and Smart Gadgets you can get easily.Be a Member Now.
          </p>
        </div>

        {/* 🔓 2. දකුණු පැත්ත: Form Section */}
        <div className="auth-form-side">
          
          {/* 🔄 Login / Sign Up මාරු වන Tabs */}
          <div className="auth-tabs">
            <button 
              className={`tab-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={`tab-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            
           
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  placeholder=" " 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="submit-btn">
              {isLogin ? 'Sign In 🚀' : 'Create Account ✨'}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}