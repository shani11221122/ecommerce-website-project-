import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, ChevronRight, Truck, Shield, RotateCcw, Award } from 'lucide-react';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { formatPKR, StarRating } from '../components/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, loading } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const load = async () => {
      setPageLoading(true);
      try {
        const res = await productAPI.getById(id);
        if (res.data.success) {
          setProduct(res.data.product);
          setRelated(res.data.related);
          setActiveImage(0);
        }
      } catch (e) {
        console.error(e);
        navigate('/products');
      } finally {
        setPageLoading(false);
      }
    };
    load();
  }, [id]);

  if (pageLoading) return (
    <div className="loader-wrapper" style={{ minHeight: '60vh' }}>
      <div className="loader" />
    </div>
  );

  if (!product) return null;

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const savings = product.originalPrice - product.price;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product.id);
  };

  return (
    <div className="page-fade-in">
      <div className="container">
        {/* Breadcrumb */}
        <div className="detail-breadcrumb" style={{ padding: '20px 0 0' }}>
          <Link to="/">Home</Link>
          <ChevronRight size={14} className="sep" />
          <Link to="/products">Products</Link>
          <ChevronRight size={14} className="sep" />
          <Link to={`/products?category=${product.category}`}>{product.category}</Link>
          <ChevronRight size={14} className="sep" />
          <span style={{ color: 'var(--text-primary)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {product.name}
          </span>
        </div>

        <div className="product-detail">
          {/* Gallery */}
          <div className="product-detail-gallery">
            <img
              src={product.images?.[activeImage] || product.image}
              alt={product.name}
              className="main-image"
              onError={e => { e.target.src = product.image; }}
            />
            {product.images?.length > 1 && (
              <div className="thumbnail-row">
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className={`thumbnail ${activeImage === idx ? 'active' : ''}`}
                    onClick={() => setActiveImage(idx)}
                    onError={e => { e.target.src = product.image; }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="detail-category">{product.category}</p>
            <h1 className="detail-name">{product.name}</h1>

            <div className="detail-rating">
              <span className="detail-rating-score">{product.rating}</span>
              <StarRating rating={product.rating} />
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                ({product.reviewCount?.toLocaleString()} reviews)
              </span>
              <div className="in-stock-badge" style={{ marginLeft: 'auto' }}>
                <span className="in-stock-dot" />
                In Stock
              </div>
            </div>

            {/* Price Block */}
            <div className="detail-price-block">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                <span className="detail-price">{formatPKR(product.price)}</span>
                <span className="detail-original-price">{formatPKR(product.originalPrice)}</span>
              </div>
              {savings > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                  <div className="detail-savings">
                    You save {formatPKR(savings)} ({discount}% off)
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="detail-description">{product.description}</p>

            {/* Specs */}
            {product.specs && (
              <>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>
                  Key Specs
                </h3>
                <div className="spec-grid">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="spec-item">
                      <p className="spec-label">{k}</p>
                      <p className="spec-value">{v}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Qty + Add to Cart */}
            <div className="detail-actions" style={{ marginBottom: 28 }}>
              <div className="qty-selector">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className="qty-num">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <button
                className="btn btn-primary btn-lg"
                style={{ flex: 1 }}
                onClick={handleAddToCart}
                disabled={loading}
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button
                className={`nav-icon-btn ${wishlisted ? '' : ''}`}
                style={{ width: 52, height: 52, borderRadius: 12, border: '1px solid var(--border-card)', background: wishlisted ? 'rgba(239,68,68,0.1)' : 'var(--bg-card)' }}
                onClick={() => setWishlisted(!wishlisted)}
                title="Add to Wishlist"
              >
                <Heart size={20} fill={wishlisted ? '#ef4444' : 'none'} color={wishlisted ? '#ef4444' : 'var(--text-secondary)'} />
              </button>
            </div>

            {/* Trust Features */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12
            }}>
              {[
                { icon: <Truck size={18} />, title: 'Free Delivery', text: 'On orders over Rs. 5,000' },
                { icon: <RotateCcw size={18} />, title: '7-Day Returns', text: 'Easy returns & refunds' },
                { icon: <Shield size={18} />, title: 'Warranty', text: 'Manufacturer warranty' },
                { icon: <Award size={18} />, title: '100% Genuine', text: 'Authentic products only' },
              ].map(item => (
                <div key={item.title} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10
                }}>
                  <div style={{ color: 'var(--accent-primary)', flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section style={{ paddingBottom: 60 }}>
            <div className="section-header">
              <div>
                <p className="section-eyebrow">You May Also Like</p>
                <h2 className="section-title">Related Products</h2>
              </div>
            </div>
            <div className="products-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
