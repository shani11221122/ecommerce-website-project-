import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={
                <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                  <h1 style={{ fontSize: 48, fontWeight: 900, color: 'var(--accent-primary)' }}>404</h1>
                  <p style={{ fontSize: 20, marginBottom: 24 }}>Page not found</p>
                  <a href="/" className="btn btn-primary">Go Home</a>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer />
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
