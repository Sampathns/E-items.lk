import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login'; 
import Home from './Home'; 
import Cart from './Cart';  
import { CartProvider } from './context/TempCart';
import Admin from './Admin';

// 🔒 1. සාමාන්‍ය යූසර්ලා ලොගින් නොවී /home හෝ /cart යන එක නවත්වන Route එක
const ProtectedRoute = ({ children }) => {
  const rawUserInfo = localStorage.getItem('userInfo');
  if (!rawUserInfo) {
    return <Navigate to="/" />; // ලොගින් වෙලා නැත්නම් Login පිටුවට ඇදලා දානවා
  }
  return children;
};

// 🛡️ 2. ඇඩ්මින්ට විතරක් යන්න දෙන Route එක (ඔයා ලියපු එකමයි, පොඩ්ඩක් පිරිසිදු කරා)
const AdminRoute = ({ children }) => {
  try {
    const rawUserInfo = localStorage.getItem('userInfo');
    if (rawUserInfo) {
      const userInfo = JSON.parse(rawUserInfo);
      if (userInfo.role && userInfo.role.toLowerCase() === 'admin') {
        return children; // ඇඩ්මින් නම් විතරක් ඇතුළට යවනවා
      }
    }
  } catch (error) {
    console.error("Auth check error:", error);
  }
  
  // ඇඩ්මින් නොවී /admin ආවොත් /home එකට හරවනවා
  return <Navigate to="/home" />;
};

export default function App() {
  return (
    <CartProvider>
      <Routes>
        {/* සාමාන්‍ය පොදු පිටුව (Public Route) */}
        <Route path="/" element={<Login />} />
        
        {/* ආරක්ෂිත පිටු (Protected Routes - ලොගින් විය යුතුමයි) 👈 */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/cart" 
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } 
        />
        
        {/* ඇඩ්මින්ට විතරක්ම වෙන් වූ පිටුව 👈 */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          } 
        />
      </Routes>
    </CartProvider>
  );
}