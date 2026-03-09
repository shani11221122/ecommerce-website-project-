import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="navbar-logo" style={{ display: 'inline-flex', marginBottom: 0 }}>
              <div className="logo-icon">
                <Zap size={18} color="#0a0e1a" strokeWidth={2.5} />
              </div>
              <span className="logo-text">Electro<span>Hub</span></span>
            </Link>
            <p>
              Pakistan's premier electronics destination. Discover the latest in laptops,
              smartphones, cameras, and more — delivered to your doorstep.
            </p>
            <div className="footer-social">
              <a href="#" className="social-btn" title="Facebook">f</a>
              <a href="#" className="social-btn" title="Twitter">𝕏</a>
              <a href="#" className="social-btn" title="Instagram">◎</a>
              <a href="#" className="social-btn" title="YouTube">▶</a>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Shop</h4>
            <ul className="footer-links">
              <li><Link to="/products?category=laptops">Laptops</Link></li>
              <li><Link to="/products?category=phones">Smartphones</Link></li>
              <li><Link to="/products?category=cameras">Cameras</Link></li>
              <li><Link to="/products?category=headphones">Headphones</Link></li>
              <li><Link to="/products?category=monitors">Monitors</Link></li>
              <li><Link to="/products?category=tvs">Smart TVs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Partners</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Warranty</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>

            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                <Phone size={14} color="var(--accent-primary)" />
                <span>0800-ELECTROHUB</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                <Mail size={14} color="var(--accent-primary)" />
                <span>support@electrohub.pk</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                <MapPin size={14} color="var(--accent-primary)" />
                <span>Lahore, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 ElectroHub. All rights reserved. Built in Pakistan 🇵🇰</p>
          <div className="footer-payment-logos">
            <span style={{ fontSize: 12, color: 'var(--text-muted)', marginRight: 4 }}>We accept:</span>
            <span className="payment-chip">VISA</span>
            <span className="payment-chip">MC</span>
            <span className="payment-chip">PayPal</span>
            <span className="payment-chip">JazzCash</span>
            <span className="payment-chip">EasyPaisa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
