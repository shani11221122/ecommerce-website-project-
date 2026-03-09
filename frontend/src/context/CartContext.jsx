import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartAPI } from '../services/api';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0, itemCount: 0 });
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      const res = await cartAPI.get();
      if (res.data.success) setCart(res.data.cart);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  }, []);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true);
    try {
      const res = await cartAPI.add(productId, quantity);
      if (res.data.success) {
        setCart(res.data.cart);
        showToast('Added to cart!');
      }
    } catch (err) {
      showToast('Failed to add item.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await cartAPI.update(productId, quantity);
      if (res.data.success) setCart(res.data.cart);
    } catch (err) {
      showToast('Update failed.', 'error');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await cartAPI.remove(productId);
      if (res.data.success) {
        setCart(res.data.cart);
        showToast('Item removed.');
      }
    } catch (err) {
      showToast('Remove failed.', 'error');
    }
  };

  const clearCart = async () => {
    try {
      const res = await cartAPI.clear();
      if (res.data.success) setCart(res.data.cart);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider value={{
      cart, loading, toasts,
      addToCart, updateQuantity, removeFromCart, clearCart, showToast
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
