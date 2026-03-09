import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-grid-overlay" />
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-eyebrow">
              <span>⚡</span>
              <span>Pakistan's #1 Electronics Store</span>
            </div>

            <h1 className="hero-title">
              Next-Gen Tech<br />
              <span className="highlight">Delivered to</span><br />
              Your Door
            </h1>

            <p className="hero-subtitle">
              Discover the latest laptops, smartphones, cameras, and audio gear
              from world-leading brands — at prices that make sense in PKR.
            </p>

            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-lg">
                Shop Now
                <ArrowRight size={18} />
              </Link>
              <Link to="/products?category=phones" className="btn btn-outline btn-lg">
                View Deals
              </Link>
            </div>

            <div className="hero-stats">
              <div>
                <div className="hero-stat-value">50K+</div>
                <div className="hero-stat-label">Happy Customers</div>
              </div>
              <div style={{ width: 1, background: 'var(--border-subtle)', margin: '0 4px' }} />
              <div>
                <div className="hero-stat-value">500+</div>
                <div className="hero-stat-label">Products</div>
              </div>
              <div style={{ width: 1, background: 'var(--border-subtle)', margin: '0 4px' }} />
              <div>
                <div className="hero-stat-value">4.9★</div>
                <div className="hero-stat-label">Avg. Rating</div>
              </div>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="hero-product-card">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"
                alt="MacBook Pro"
                className="hero-product-img"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontSize: 11, color: 'var(--accent-primary)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>FEATURED</p>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>MacBook Pro M3 Pro</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />)}
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)', marginLeft: 4 }}>4.9</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-display)' }}>Rs. 5.5L</p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', textDecoration: 'line-through' }}>Rs. 6.0L</p>
                </div>
              </div>
            </div>

            <div className="hero-floating-badge badge-1">
              <Shield size={18} color="var(--accent-green)" />
              <div>
                <p style={{ fontSize: 12, fontWeight: 700 }}>Genuine Products</p>
                <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>100% Authentic</p>
              </div>
            </div>

            <div className="hero-floating-badge badge-2">
              <Truck size={18} color="var(--accent-primary)" />
              <div>
                <p style={{ fontSize: 12, fontWeight: 700 }}>Free Delivery</p>
                <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>On orders above Rs. 5,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
