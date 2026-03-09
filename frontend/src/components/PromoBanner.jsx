import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

const PromoBanner = () => {
  const [time, setTime] = useState({ h: 11, m: 47, s: 32 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = n => String(n).padStart(2, '0');

  return (
    <div className="promo-banner">
      <div>
        <div className="promo-badge">
          <Zap size={12} />
          Flash Sale — Limited Time
        </div>

        <h2 className="promo-title">
          Up to <span>40% OFF</span><br />
          on Premium Gadgets
        </h2>

        <p className="promo-text">
          Grab the best deals on laptops, smartphones, and audio gear before the
          sale ends. Prices this low won't last!
        </p>

        <div className="promo-countdown">
          {[
            { val: pad(time.h), label: 'Hours' },
            { val: pad(time.m), label: 'Mins' },
            { val: pad(time.s), label: 'Secs' },
          ].map(({ val, label }, i) => (
            <div key={label}>
              <div className="countdown-item">
                <div className="countdown-num">{val}</div>
                <div className="countdown-label">{label}</div>
              </div>
              {i < 2 && (
                <span style={{
                  fontSize: 24, fontWeight: 800, color: 'var(--accent-primary)',
                  display: 'flex', alignItems: 'center', height: '100%', marginTop: 8
                }}>:</span>
              )}
            </div>
          ))}
        </div>

        <Link to="/products" className="btn btn-primary btn-lg">
          Shop the Sale
          <ArrowRight size={18} />
        </Link>
      </div>

      <div>
        <img
          src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&q=80"
          alt="Electronics Sale"
          className="promo-img"
        />
      </div>
    </div>
  );
};

export default PromoBanner;
