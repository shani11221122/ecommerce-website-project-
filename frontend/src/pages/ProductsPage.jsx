import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../services/api';

const CATEGORIES = [
  { name: 'all', label: 'All Products', icon: '🛒' },
  { name: 'laptops', label: 'Laptops', icon: '💻' },
  { name: 'phones', label: 'Smartphones', icon: '📱' },
  { name: 'cameras', label: 'Cameras', icon: '📷' },
  { name: 'headphones', label: 'Headphones', icon: '🎧' },
  { name: 'monitors', label: 'Monitors', icon: '🖥️' },
  { name: 'tvs', label: 'Smart TVs', icon: '📺' },
];

const SORT_OPTIONS = [
  { value: '', label: 'Sort: Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name A–Z' },
];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort') || '';

  const [localSearch, setLocalSearch] = useState(searchParam);
  const [sort, setSort] = useState(sortParam);
  const [activeCategory, setActiveCategory] = useState(categoryParam);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (activeCategory !== 'all') params.category = activeCategory;
      if (localSearch) params.search = localSearch;
      if (sort) params.sort = sort;

      const res = await productAPI.getAll(params);
      if (res.data.success) {
        setProducts(res.data.products);
        setTotal(res.data.count);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, localSearch, sort]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const q = searchParams.get('search') || '';
    setActiveCategory(cat);
    setLocalSearch(q);
  }, [searchParams]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    const params = new URLSearchParams(searchParams);
    if (cat === 'all') params.delete('category');
    else params.set('category', cat);
    setSearchParams(params);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (localSearch) params.set('search', localSearch);
    else params.delete('search');
    setSearchParams(params);
  };

  const clearSearch = () => {
    setLocalSearch('');
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    setSearchParams(params);
  };

  const handleSortChange = (val) => {
    setSort(val);
    const params = new URLSearchParams(searchParams);
    if (val) params.set('sort', val);
    else params.delete('sort');
    setSearchParams(params);
  };

  const activeCatLabel = CATEGORIES.find(c => c.name === activeCategory)?.label || 'All Products';

  return (
    <div className="page-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>
            <a href="/" style={{ color: 'var(--accent-primary)' }}>Home</a>
            {' / '}
            <span>Products</span>
            {activeCategory !== 'all' && ` / ${activeCatLabel}`}
          </p>
          <h1 className="page-title">{activeCatLabel}</h1>
          <p className="page-subtitle">
            {loading ? 'Loading...' : `${total} product${total !== 1 ? 's' : ''} found`}
          </p>
        </div>
      </div>

      <div className="container section" style={{ paddingTop: 40 }}>
        <div className="products-layout">
          {/* Sidebar */}
          <aside className="sidebar">
            {/* Search */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">Search</h3>
              <form onSubmit={handleSearch}>
                <div className="search-wrapper">
                  <Search className="search-icon" size={16} />
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Search products..."
                    value={localSearch}
                    onChange={e => setLocalSearch(e.target.value)}
                  />
                </div>
                {localSearch && (
                  <button
                    type="button"
                    className="btn btn-sm btn-ghost"
                    style={{ marginTop: 8, width: '100%' }}
                    onClick={clearSearch}
                  >
                    <X size={14} /> Clear Search
                  </button>
                )}
              </form>
            </div>

            {/* Categories */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">Category</h3>
              <ul className="filter-list">
                {CATEGORIES.map(cat => (
                  <li
                    key={cat.name}
                    className={`filter-item ${activeCategory === cat.name ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(cat.name)}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Filter by Status */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">Availability</h3>
              <ul className="filter-list">
                <li className="filter-item active">
                  <span>✅</span> In Stock
                </li>
              </ul>
            </div>

            {/* Price ranges (UI only) */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">Price Range (PKR)</h3>
              <ul className="filter-list">
                {[
                  'Under Rs. 50,000',
                  'Rs. 50K – 1 Lakh',
                  'Rs. 1L – 3 Lakh',
                  'Rs. 3L – 5 Lakh',
                  'Above Rs. 5 Lakh',
                ].map(label => (
                  <li key={label} className="filter-item" style={{ cursor: 'default' }}>
                    <span style={{ width: 16, height: 16, border: '2px solid var(--border-card)', borderRadius: 4, display: 'inline-block' }} />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Products Area */}
          <div>
            <div className="products-toolbar">
              <p className="results-count">
                Showing <strong style={{ color: 'var(--text-primary)' }}>{total}</strong> results
                {localSearch && <span style={{ color: 'var(--accent-primary)' }}> for "{localSearch}"</span>}
              </p>
              <select
                className="sort-select"
                value={sort}
                onChange={e => handleSortChange(e.target.value)}
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {loading ? (
              <div className="loader-wrapper"><div className="loader" /></div>
            ) : products.length === 0 ? (
              <div className="no-results">
                <div style={{ fontSize: 56, marginBottom: 16 }}>🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria.</p>
                <button className="btn btn-outline" style={{ marginTop: 20 }} onClick={() => { setLocalSearch(''); setActiveCategory('all'); }}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
