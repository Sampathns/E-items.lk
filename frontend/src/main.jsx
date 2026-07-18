import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; // 👈 මේක තියෙන්න ඕනේ
import App from './App.jsx' 
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* 👈 App එක වටේට BrowserRouter තියෙන්න ඕනේ */}
      <App /> 
    </BrowserRouter>
  </React.StrictMode>,
)