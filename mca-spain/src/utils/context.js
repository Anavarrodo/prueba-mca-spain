import React, { useEffect, createContext } from 'react';
import useSessionStorage from '../hooks/sessionStorage';

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useSessionStorage('cart', 0);
  const [items, setItems] = useSessionStorage('items', []);

  useEffect(() => {
    const cartItemsData = sessionStorage.getItem('cart');
    const itemsData = sessionStorage.getItem('items');
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
    let prueba = items.filter((item) => item.id !== item.id)
    console.log(prueba)
    setItems([...items, item]);
  };

  return (
    <Context.Provider value={{ cartItems, items, addToCart, removeFromCart }}>
      {children}
    </Context.Provider>
  );
};
export { ContextProvider, Context };
