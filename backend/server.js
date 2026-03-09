const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'ElectroHub API is running', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.url} not found` });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 ElectroHub API Server running on http://localhost:${PORT}`);
  console.log(`📦 Available endpoints:`);
  console.log(`   GET  /api/products`);
  console.log(`   GET  /api/products/featured`);
  console.log(`   GET  /api/products/categories`);
  console.log(`   GET  /api/products/:id`);
  console.log(`   GET  /api/cart`);
  console.log(`   POST /api/cart`);
  console.log(`   PUT  /api/cart/:productId`);
  console.log(`   DELETE /api/cart/:productId\n`);
});
