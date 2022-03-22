import React, { useEffect, createContext } from 'react';
import useSessionStorage from '../hooks/sessionStorage';

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useSessionStorage('cart', 0);

  useEffect(() => {
    const cartItemsData = sessionStorage.getItem('cart');
    if (cartItemsData) setCartItems(JSON.parse(cartItemsData));
  }, []);

  const addToCart = (newItem) => {
    setCartItems(newItem);
  }

  return (
    <Context.Provider value={{ cartItems, addToCart }}>
      {children}
    </Context.Provider>
  );
}
export { ContextProvider, Context };
