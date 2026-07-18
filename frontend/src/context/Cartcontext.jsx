
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('cartItems');
    return localData ? JSON.parse(localData) : [];
  });

  
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

 
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      
      const isExist = prevItems.find((item) => item._id === product._id);

      if (isExist) {
       
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
    
      return [...prevItems, { ...product, qty: 1 }];
    });
  };
  const increaseQty = (productId) => {
    setCartItems((prevItems)=>
      prevItems.map((item)=>
        item._id === productId ? { ...item,qty: item.qty + 1}: item
     )
    );
  };

  const decreaseQty = (productId) => {
    setCartItems((prevItems)=>
      prevItems.map((item) => {
        if (item._id === productId) {
          return {...item, qty: item.qty > 1? item.qty - 1: 1};
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart,increaseQty, 
      decreaseQty}}>
      {children}
    </CartContext.Provider>
  );
};
