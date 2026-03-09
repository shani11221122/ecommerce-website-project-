import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, CreditCard, Building2, Smartphone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../components/ProductCard';

const PAYMENT_METHODS = [
  { id: 'visa', label: 'Visa', icon: '💳', color: '#1a1f71' },
  { id: 'mastercard', label: 'Mastercard', icon: '💳', color: '#eb001b' },
  { id: 'paypal', label: 'PayPal', icon: '🅿️', color: '#003087' },
  { id: 'jazzcash', label: 'JazzCash', icon: '📱', color: '#e91f27' },
  { id: 'easypaisa', label: 'EasyPaisa', icon: '📱', color: '#44b244' },
  { id: 'bank', label: 'Bank Transfer', icon: '🏦', color: '#0a3d62' },
];

const STEPS = ['Shipping', 'Payment', 'Review'];

const CheckoutPage = () => {
  const { cart, clearCart, showToast } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState('visa');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  const shipping = cart.total > 5000 ? 0 : 299;
  const tax = Math.round(cart.total * 0.05);
  const grandTotal = cart.total + shipping + tax;

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', province: '', postalCode: '',
    cardNumber: '', cardName: '', expiry: '', cvv: '',
  });

  const handleInput = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handlePlaceOrder = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    setOrderPlaced(true);
    await clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="page-fade-in container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{
          width: 90, height: 90,
          background: 'rgba(0, 212, 138, 0.1)',
          border: '2px solid var(--accent-green)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px'
        }}>
          <CheckCircle size={44} color="var(--accent-green)" />
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 900, marginBottom: 12 }}>Order Placed!</h1>
        <p style={{ fontSize: 17, color: 'var(--text-secondary)', maxWidth: 440, margin: '0 auto 8px' }}>
          Thank you for your order. We've received it and will start processing it right away.
        </p>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 36 }}>
          Order confirmation sent to <strong style={{ color: 'var(--text-primary)' }}>{form.email || 'your email'}</strong>
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary btn-lg">Back to Home</Link>
          <Link to="/products" className="btn btn-outline btn-lg">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="page-fade-in container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: 20 }}>Your cart is empty</h2>
        <Link to="/products" className="btn btn-primary">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="page-fade-in">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Checkout</h1>
        </div>
      </div>

      <div className="container">
        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 0 0', gap: 0 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: i <= step ? 'pointer' : 'default'
              }} onClick={() => i <= step && setStep(i)}>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: i <= step ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' : 'var(--bg-card)',
                  border: `2px solid ${i <= step ? 'var(--accent-primary)' : 'var(--border-card)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 700,
                  color: i <= step ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  transition: 'all 0.3s'
                }}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: i === step ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ width: 80, height: 2, background: i < step ? 'var(--accent-primary)' : 'var(--border-card)', margin: '0 8px', marginBottom: 22, transition: 'all 0.3s' }} />
              )}
            </div>
          ))}
        </div>

        <div className="checkout-layout" style={{ paddingTop: 32 }}>
          {/* Form */}
          <div>
            {/* Step 0: Shipping */}
            {step === 0 && (
              <div className="checkout-form page-fade-in">
                <div className="checkout-form-section">
                  <h2 className="checkout-section-title">
                    <span className="step-num">1</span>
                    Shipping Information
                  </h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">First Name *</label>
                      <input className="form-input" name="firstName" value={form.firstName} onChange={handleInput} placeholder="Ahmed" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name *</label>
                      <input className="form-input" name="lastName" value={form.lastName} onChange={handleInput} placeholder="Khan" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input className="form-input" type="email" name="email" value={form.email} onChange={handleInput} placeholder="ahmed@example.com" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input className="form-input" type="tel" name="phone" value={form.phone} onChange={handleInput} placeholder="+92 300 0000000" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Street Address *</label>
                    <input className="form-input" name="address" value={form.address} onChange={handleInput} placeholder="House #, Street, Area" required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">City *</label>
                      <input className="form-input" name="city" value={form.city} onChange={handleInput} placeholder="Lahore" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Province *</label>
                      <select className="form-input sort-select" name="province" value={form.province} onChange={handleInput} style={{ appearance: 'none', width: '100%' }}>
                        <option value="">Select Province</option>
                        <option>Punjab</option>
                        <option>Sindh</option>
                        <option>KPK</option>
                        <option>Balochistan</option>
                        <option>Islamabad (ICT)</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group" style={{ maxWidth: 200 }}>
                    <label className="form-label">Postal Code</label>
                    <input className="form-input" name="postalCode" value={form.postalCode} onChange={handleInput} placeholder="54000" />
                  </div>
                </div>

                <div className="checkout-form-section">
                  <h2 className="checkout-section-title">
                    <span className="step-num">📦</span>
                    Delivery Options
                  </h2>
                  {[
                    { id: 'standard', label: 'Standard Delivery', time: '3-5 business days', price: cart.total > 5000 ? 'FREE' : 'Rs. 299' },
                    { id: 'express', label: 'Express Delivery', time: '1-2 business days', price: 'Rs. 599' },
                    { id: 'same', label: 'Same Day (Lahore only)', time: 'Today by 9 PM', price: 'Rs. 999' },
                  ].map(opt => (
                    <div key={opt.id} style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      background: 'var(--bg-secondary)', border: '1px solid var(--border-card)',
                      borderRadius: 'var(--radius-sm)', padding: '14px 16px', marginBottom: 10, cursor: 'pointer'
                    }}>
                      <input type="radio" name="delivery" defaultChecked={opt.id === 'standard'} style={{ accentColor: 'var(--accent-primary)', width: 16, height: 16 }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 600 }}>{opt.label}</p>
                        <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{opt.time}</p>
                      </div>
                      <strong style={{ fontSize: 14, color: opt.price === 'FREE' ? 'var(--accent-green)' : 'var(--text-primary)' }}>
                        {opt.price}
                      </strong>
                    </div>
                  ))}
                </div>

                <div style={{ padding: '20px 28px' }}>
                  <button
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%' }}
                    onClick={() => setStep(1)}
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <div className="checkout-form page-fade-in">
                <div className="checkout-form-section">
                  <h2 className="checkout-section-title">
                    <span className="step-num">2</span>
                    Payment Method
                  </h2>

                  <div className="payment-methods">
                    {PAYMENT_METHODS.map(method => (
                      <div
                        key={method.id}
                        className={`payment-method ${selectedPayment === method.id ? 'selected' : ''}`}
                        onClick={() => setSelectedPayment(method.id)}
                      >
                        <span className="payment-logo">{method.icon}</span>
                        <span className="payment-name">{method.label}</span>
                      </div>
                    ))}
                  </div>

                  {(selectedPayment === 'visa' || selectedPayment === 'mastercard') && (
                    <div className="card-fields">
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Card Number</label>
                        <input className="form-input" name="cardNumber" value={form.cardNumber} onChange={handleInput} placeholder="1234 5678 9012 3456" maxLength={19} />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Cardholder Name</label>
                        <input className="form-input" name="cardName" value={form.cardName} onChange={handleInput} placeholder="Ahmed Khan" />
                      </div>
                      <div className="form-row" style={{ marginBottom: 0 }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label">Expiry Date</label>
                          <input className="form-input" name="expiry" value={form.expiry} onChange={handleInput} placeholder="MM/YY" maxLength={5} />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label">CVV</label>
                          <input className="form-input" name="cvv" value={form.cvv} onChange={handleInput} placeholder="•••" maxLength={4} type="password" />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedPayment === 'paypal' && (
                    <div style={{ marginTop: 20, padding: 20, background: '#003087', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                      <p style={{ color: '#fff', fontSize: 15, fontWeight: 600 }}>🅿️ You'll be redirected to PayPal to complete your payment</p>
                    </div>
                  )}

                  {(selectedPayment === 'jazzcash' || selectedPayment === 'easypaisa') && (
                    <div style={{ marginTop: 20, padding: 20, background: 'var(--bg-secondary)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Mobile Number</label>
                        <input className="form-input" type="tel" placeholder="+92 300 0000000" />
                      </div>
                    </div>
                  )}

                  {selectedPayment === 'bank' && (
                    <div style={{ marginTop: 20, padding: 20, background: 'var(--bg-secondary)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)' }}>
                      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        Transfer to: <strong style={{ color: 'var(--text-primary)' }}>ElectroHub Pvt. Ltd.</strong><br />
                        Bank: <strong style={{ color: 'var(--text-primary)' }}>Meezan Bank</strong><br />
                        Account: <strong style={{ color: 'var(--text-primary)' }}>0123-0456789012</strong><br />
                        IBAN: <strong style={{ color: 'var(--text-primary)' }}>PK72MEZN0001230456789012</strong>
                      </p>
                    </div>
                  )}
                </div>

                <div style={{ padding: '20px 28px', display: 'flex', gap: 12 }}>
                  <button className="btn btn-ghost btn-lg" style={{ flex: 0 }} onClick={() => setStep(0)}>
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    className="btn btn-primary btn-lg"
                    style={{ flex: 1 }}
                    onClick={() => setStep(2)}
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div className="checkout-form page-fade-in">
                <div className="checkout-form-section">
                  <h2 className="checkout-section-title">
                    <span className="step-num">3</span>
                    Review Your Order
                  </h2>

                  <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: 20, marginBottom: 20 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>Shipping To</h3>
                    <p style={{ fontSize: 15, fontWeight: 600 }}>{form.firstName} {form.lastName}</p>
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{form.address}, {form.city}, {form.province}</p>
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{form.phone} · {form.email}</p>
                  </div>

                  <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: 20 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>Payment Via</h3>
                    <p style={{ fontSize: 15, fontWeight: 600, textTransform: 'capitalize' }}>
                      {PAYMENT_METHODS.find(m => m.id === selectedPayment)?.icon} {PAYMENT_METHODS.find(m => m.id === selectedPayment)?.label}
                    </p>
                    {form.cardNumber && <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>•••• •••• •••• {form.cardNumber.slice(-4)}</p>}
                  </div>

                  <div style={{ marginTop: 20 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>Order Items</h3>
                    {cart.items.map(item => (
                      <div key={item.productId} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                        <img src={item.image} alt={item.name} style={{ width: 56, height: 44, objectFit: 'cover', borderRadius: 8, background: 'var(--bg-card)' }} onError={e => e.target.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&q=80'} />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</p>
                          <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Qty: {item.quantity}</p>
                        </div>
                        <p style={{ fontSize: 15, fontWeight: 700 }}>{formatPKR(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ padding: '20px 28px', display: 'flex', gap: 12 }}>
                  <button className="btn btn-ghost btn-lg" style={{ flex: 0 }} onClick={() => setStep(1)}>
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    className="btn btn-primary btn-lg"
                    style={{ flex: 1, background: loading ? 'var(--bg-card)' : undefined }}
                    onClick={handlePlaceOrder}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="loader" style={{ width: 20, height: 20, borderWidth: 2 }} />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle size={18} />
                        Place Order — {formatPKR(grandTotal)}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div className="order-summary">
              <h2 className="summary-title">Order Summary</h2>
              {cart.items.map(item => (
                <div key={item.productId} style={{ display: 'flex', gap: 12, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--border-subtle)' }}>
                  <img src={item.image} alt={item.name} style={{ width: 54, height: 44, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} onError={e => e.target.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&q=80'} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>{item.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>×{item.quantity}</p>
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{formatPKR(item.price * item.quantity)}</p>
                </div>
              ))}

              <div className="summary-row">
                <span className="summary-label">Subtotal</span>
                <span className="summary-value">{formatPKR(cart.total)}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Shipping</span>
                {shipping === 0 ? <span className="summary-free">FREE</span> : <span className="summary-value">{formatPKR(shipping)}</span>}
              </div>
              <div className="summary-row">
                <span className="summary-label">Tax (5%)</span>
                <span className="summary-value">{formatPKR(tax)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span style={{ color: 'var(--accent-primary)' }}>{formatPKR(grandTotal)}</span>
              </div>

              <div style={{ marginTop: 20, padding: '14px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                🔒 Your payment information is encrypted and secure. We never store card details.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
