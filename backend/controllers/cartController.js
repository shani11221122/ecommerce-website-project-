const products = require('../data/products');

// In-memory cart (keyed by session - simplified for demo)
let cart = { items: [], sessionId: 'default' };

const getCart = (req, res) => {
  try {
    const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    res.json({ success: true, cart: { ...cart, total, itemCount } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const addToCart = (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID required' });
    }

    const product = products.find(p => p.id === productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        category: product.category
      });
    }

    const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    res.json({ success: true, message: 'Item added to cart', cart: { ...cart, total, itemCount } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateCartItem = (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      cart.items = cart.items.filter(item => item.productId !== productId);
    } else {
      const item = cart.items.find(item => item.productId === productId);
      if (!item) return res.status(404).json({ success: false, message: 'Item not in cart' });
      item.quantity = quantity;
    }

    const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    res.json({ success: true, cart: { ...cart, total, itemCount } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const removeFromCart = (req, res) => {
  try {
    const { productId } = req.params;
    cart.items = cart.items.filter(item => item.productId !== productId);
    const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    res.json({ success: true, message: 'Item removed', cart: { ...cart, total, itemCount } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const clearCart = (req, res) => {
  try {
    cart = { items: [], sessionId: 'default' };
    res.json({ success: true, message: 'Cart cleared', cart: { ...cart, total: 0, itemCount: 0 } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
