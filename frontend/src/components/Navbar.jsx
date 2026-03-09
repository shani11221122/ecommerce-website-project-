import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              <Zap size={20} color="#0a0e1a" strokeWidth={2.5} />
            </div>
            <span className="logo-text">Electro<span>Hub</span></span>
          </Link>

          <ul className="navbar-nav">
            <li><NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink></li>
            <li><NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Products</NavLink></li>
            <li><NavLink to="/products?category=laptops" className="nav-link">Laptops</NavLink></li>
            <li><NavLink to="/products?category=phones" className="nav-link">Phones</NavLink></li>
            <li><NavLink to="/products?category=cameras" className="nav-link">Cameras</NavLink></li>
          </ul>

          <div className="navbar-actions">
            {searchOpen ? (
              <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className="search-wrapper">
                  <Search className="search-icon" size={16} />
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    autoFocus
                    style={{ width: 240 }}
                  />
                </div>
                <button type="button" className="nav-icon-btn" onClick={() => setSearchOpen(false)}>
                  <X size={18} />
                </button>
              </form>
            ) : (
              <button className="nav-icon-btn" onClick={() => setSearchOpen(true)} title="Search">
                <Search size={18} />
              </button>
            )}

            <Link to="/cart" className="nav-icon-btn" title="Cart">
              <ShoppingCart size={18} />
              {cart.itemCount > 0 && (
                <span className="cart-badge">{cart.itemCount}</span>
              )}
            </Link>

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={{
            borderTop: '1px solid var(--border-subtle)',
            padding: '16px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: 4
          }}>
            {[
              { to: '/', label: 'Home', exact: true },
              { to: '/products', label: 'All Products' },
              { to: '/products?category=laptops', label: 'Laptops' },
              { to: '/products?category=phones', label: 'Phones' },
              { to: '/products?category=cameras', label: 'Cameras' },
              { to: '/products?category=headphones', label: 'Headphones' },
              { to: '/cart', label: `Cart (${cart.itemCount})` },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="nav-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
