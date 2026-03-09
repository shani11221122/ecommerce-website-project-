import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Laptop, Smartphone, Camera, Headphones, Monitor, Tv } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import PromoBanner from '../components/PromoBanner';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../services/api';

const CATEGORIES = [
  { name: 'laptops', icon: '💻', label: 'Laptops' },
  { name: 'phones', icon: '📱', label: 'Phones' },
  { name: 'cameras', icon: '📷', label: 'Cameras' },
  { name: 'headphones', icon: '🎧', label: 'Headphones' },
  { name: 'monitors', icon: '🖥️', label: 'Monitors' },
  { name: 'tvs', icon: '📺', label: 'Smart TVs' },
];

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const [featRes, allRes] = await Promise.all([
          productAPI.getFeatured(),
          productAPI.getAll()
        ]);
        if (featRes.data.success) setFeatured(featRes.data.products);
        if (allRes.data.success) setAllProducts(allRes.data.products);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <main className="page-fade-in">
      <HeroSection />

      {/* Trust Bar */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '16px 0'
      }}>
        <div className="container">
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 48, flexWrap: 'wrap'
          }}>
            {[
              { icon: '🚚', text: 'Free Delivery Over Rs. 5,000' },
              { icon: '✅', text: '100% Genuine Products' },
              { icon: '🔄', text: '7-Day Easy Returns' },
              { icon: '🔒', text: 'Secure Checkout' },
              { icon: '📞', text: '24/7 Support' },
            ].map(item => (
              <div key={item.text} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500
              }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Handpicked for You</p>
              <h2 className="section-title">Featured Products</h2>
            </div>
            <Link to="/products" className="btn btn-outline" style={{ flexShrink: 0 }}>
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="loader-wrapper"><div className="loader" /></div>
          ) : (
            <div className="products-grid">
              {featured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Browse by Type</p>
              <h2 className="section-title">Shop Categories</h2>
            </div>
          </div>

          <div className="categories-grid">
            {CATEGORIES.map(cat => (
              <div
                key={cat.name}
                className="category-card"
                onClick={() => navigate(`/products?category=${cat.name}`)}
              >
                <div className="category-icon">{cat.icon}</div>
                <span className="category-name">{cat.label}</span>
                <span className="category-count">
                  {allProducts.filter(p => p.category === cat.name).length} items
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="section">
        <div className="container">
          <PromoBanner />
        </div>
      </section>

      {/* All Products */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Complete Catalog</p>
              <h2 className="section-title">All Products</h2>
            </div>
            <Link to="/products" className="btn btn-outline" style={{ flexShrink: 0 }}>
              Browse All
              <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="loader-wrapper"><div className="loader" /></div>
          ) : (
            <div className="products-grid">
              {allProducts.slice(0, 8).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        background: 'linear-gradient(135deg, var(--accent-secondary) 0%, var(--accent-primary) 100%)',
        padding: '60px 0'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900, color: '#000', marginBottom: 12 }}>
            New to ElectroHub?
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(0,0,0,0.7)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
            Sign up today and get 10% off your first order, plus free delivery on your first purchase.
          </p>
          <Link to="/products" className="btn" style={{
            background: 'var(--bg-primary)', color: 'var(--accent-primary)',
            fontSize: 16, padding: '14px 36px', fontWeight: 700, borderRadius: 12
          }}>
            Start Shopping
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
