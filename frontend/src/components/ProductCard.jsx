import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const formatPKR = (price) =>
  new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 })
    .format(price);

const calcDiscount = (original, current) =>
  Math.round(((original - current) / original) * 100);

const getBadgeClass = (badge) => {
  if (!badge) return '';
  const map = {
    'Best Seller': 'badge-bestseller',
    'Hot Deal': 'badge-hot',
    'New Arrival': 'badge-new',
    'Sale': 'badge-sale',
  };
  return map[badge] || 'badge-default';
};

const StarRating = ({ rating }) => {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={13}
          fill={i <= Math.floor(rating) ? '#f59e0b' : 'none'}
          color={i <= Math.floor(rating) ? '#f59e0b' : 'var(--text-muted)'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, loading } = useCart();

  const discount = calcDiscount(product.originalPrice, product.price);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product.id);
  };

  return (
    <div className="product-card" onClick={() => navigate(`/products/${product.id}`)}>
      <div className="product-card-img-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-img"
          loading="lazy"
          onError={e => { e.target.src = `https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80`; }}
        />
        {product.badge && (
          <span className={`product-badge ${getBadgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: 1
          }}>
            OUT OF STOCK
          </div>
        )}
      </div>

      <div className="product-card-body">
        <p className="product-card-category">{product.category}</p>
        <h3 className="product-card-name">{product.name}</h3>

        <div className="product-card-rating">
          <StarRating rating={product.rating} />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{product.rating}</span>
          <span className="rating-count">({product.reviewCount?.toLocaleString()})</span>
        </div>

        <div className="product-card-price">
          <span className="price-current">{formatPKR(product.price)}</span>
          {product.originalPrice > product.price && (
            <>
              <span className="price-original">{formatPKR(product.originalPrice)}</span>
              <span className="price-discount">-{discount}%</span>
            </>
          )}
        </div>

        <button
          className="btn btn-primary"
          style={{ width: '100%' }}
          onClick={handleAddToCart}
          disabled={loading || !product.inStock}
        >
          <ShoppingCart size={16} />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
export { formatPKR, StarRating };
