import React, { useEffect, createContext } from 'react';
import useLocalStorage from '../hooks/localStorage';

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('cart', 0);
  const [items, setItems] = useLocalStorage('items', []);

  useEffect(() => {
    const cartItemsData = localStorage.getItem('cart');
    const itemsData = localStorage.getItem('items');
    if (cartItemsData) setCartItems(JSON.parse(cartItemsData));
    if (itemsData) setItems(JSON.parse(itemsData));
  }, []);

  const addToCart = (numberItem, newItem) => {
    setCartItems(numberItem);
    getItems(newItem);
  };

  const removeFromCart = (id) => {
    setItems(items.filter((item) => item.id !== id));
    setCartItems(cartItems - 1);
  };

  const getItems = (item) => {
    setItems([...items, item]);
  };

  return (
    <Context.Provider value={{ cartItems, items, addToCart, removeFromCart }}>
      {children}
    </Context.Provider>
  );
};
export { ContextProvider, Context };
