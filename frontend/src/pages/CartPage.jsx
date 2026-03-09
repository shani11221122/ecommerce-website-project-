import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../components/ProductCard';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, loading } = useCart();
  const navigate = useNavigate();

  const shipping = cart.total > 5000 ? 0 : 299;
  const tax = Math.round(cart.total * 0.05);
  const grandTotal = cart.total + shipping + tax;

  if (cart.items.length === 0) {
    return (
      <div className="page-fade-in">
        <div className="page-header">
          <div className="container">
            <h1 className="page-title">Your Cart</h1>
          </div>
        </div>
        <div className="container">
          <div className="cart-empty" style={{ padding: '100px 20px' }}>
            <div className="cart-empty-icon">🛒</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Your cart is empty</h2>
            <p style={{ marginBottom: 28, maxWidth: 360, margin: '0 auto 28px' }}>
              Looks like you haven't added anything to your cart yet. Start exploring our products!
            </p>
            <Link to="/products" className="btn btn-primary btn-lg">
              <ShoppingBag size={18} />
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-fade-in">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Your Cart</h1>
          <p className="page-subtitle">{cart.itemCount} item{cart.itemCount !== 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <div className="container">
        <div className="cart-layout">
          {/* Cart Items */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <Link to="/products" className="btn btn-ghost btn-sm">
                <ArrowLeft size={15} /> Continue Shopping
              </Link>
            </div>

            <div className="cart-items">
              {cart.items.map(item => (
                <div key={item.productId} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                    onClick={() => navigate(`/products/${item.productId}`)}
                    style={{ cursor: 'pointer' }}
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=80'; }}
                  />

                  <div className="cart-item-details">
                    <p className="cart-item-category">{item.category}</p>
                    <h3
                      className="cart-item-name"
                      onClick={() => navigate(`/products/${item.productId}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      {item.name}
                    </h3>
                    <p className="cart-item-price">{formatPKR(item.price)}</p>
                  </div>

                  <div className="cart-item-actions">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.productId)}
                      title="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="qty-selector" style={{ height: 38 }}>
                      <button
                        className="qty-btn"
                        style={{ width: 36, height: 36, fontSize: 18 }}
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span className="qty-num" style={{ width: 40, lineHeight: '36px' }}>
                        {item.quantity}
                      </span>
                      <button
                        className="qty-btn"
                        style={{ width: 36, height: 36, fontSize: 18 }}
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent-primary)' }}>
                      {formatPKR(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code UI */}
            <div style={{
              marginTop: 24,
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-lg)',
              padding: 20,
              display: 'flex',
              gap: 12,
              alignItems: 'center'
            }}>
              <Tag size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />
              <input
                className="form-input"
                type="text"
                placeholder="Enter promo code"
                style={{ flex: 1 }}
              />
              <button className="btn btn-outline" style={{ flexShrink: 0 }}>Apply</button>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="order-summary">
              <h2 className="summary-title">Order Summary</h2>

              <div>
                {cart.items.map(item => (
                  <div key={item.productId} className="summary-row">
                    <span className="summary-label" style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.name} × {item.quantity}
                    </span>
                    <span className="summary-value">{formatPKR(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="divider" style={{ margin: '16px 0' }} />

              <div className="summary-row">
                <span className="summary-label">Subtotal</span>
                <span className="summary-value">{formatPKR(cart.total)}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Shipping</span>
                {shipping === 0
                  ? <span className="summary-free">FREE</span>
                  : <span className="summary-value">{formatPKR(shipping)}</span>
                }
              </div>
              <div className="summary-row">
                <span className="summary-label">Tax (5%)</span>
                <span className="summary-value">{formatPKR(tax)}</span>
              </div>

              <div className="summary-row total">
                <span>Total</span>
                <span style={{ color: 'var(--accent-primary)' }}>{formatPKR(grandTotal)}</span>
              </div>

              {shipping === 0 && (
                <div style={{
                  background: 'rgba(0, 212, 138, 0.08)',
                  border: '1px solid rgba(0, 212, 138, 0.2)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 14px',
                  fontSize: 13,
                  color: 'var(--accent-green)',
                  fontWeight: 600,
                  marginTop: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}>
                  🎉 You qualify for free shipping!
                </div>
              )}

              <Link to="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 20 }}>
                Proceed to Checkout
                <ArrowRight size={18} />
              </Link>

              <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 14 }}>
                🔒 Secured by SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
