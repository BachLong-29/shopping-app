/* global React, Icon, Stars, SectionHeader */
// Product Card + product sections (featured, flash sale, trending, best sellers)

const { useState: useStateP, useRef: useRefP, useEffect: useEffectP } = React;

function ProductCard({ product, onAdd, onWish, isWished, compact = false }) {
  const ref = useRefP(null);
  const [hover, setHover] = useStateP(false);
  const [selectedColor, setSelectedColor] = useStateP(0);

  function onMouse(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }

  const discount = product.orig ? Math.round((1 - product.price / product.orig) * 100) : 0;

  return (
    <article
      ref={ref}
      className="product-card"
      onMouseMove={onMouse}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="pc-media">
        <img src={product.image} alt={product.name} loading="lazy"/>

        <div className="pc-badges">
          {product.badge === 'sale' && <span className="badge badge-sale">{product.badgeText || 'SALE'}</span>}
          {product.badge === 'new' && <span className="badge badge-new">NEW</span>}
          {product.badge === 'hot' && <span className="badge badge-hot">🔥 HOT</span>}
          {product.badge === 'limited' && <span className="badge badge-limited">{product.badgeText || 'LIMITED'}</span>}
          {product.stock === 'low' && <span className="badge badge-outline">{product.stockText}</span>}
        </div>

        <div className="pc-actions">
          <button
            className={`pc-action ${isWished ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); onWish?.(product); }}
            aria-label="Add to wishlist"
          >
            <Icon name="heart" size={16} strokeWidth={2} style={isWished ? { fill: 'currentColor' } : {}}/>
          </button>
          <button className="pc-action" aria-label="Quick view"><Icon name="eye" size={16}/></button>
          <button className="pc-action" aria-label="Compare"><Icon name="layers" size={16}/></button>
        </div>

        <div className="pc-quick">
          <button
            className="btn btn-primary btn-block"
            onClick={() => onAdd?.(product)}
            style={{ height: 40, borderRadius: 'var(--r-full)' }}
          >
            <Icon name="plus" size={14}/> Quick add · ${product.price}
          </button>
        </div>
      </div>

      <div className="pc-body">
        <div className="pc-brand">{product.brand}</div>
        <div className="pc-title">{product.name}</div>
        <div className="pc-meta">
          <Stars value={product.rating}/>
          <span style={{ fontSize: 12, fontVariantNumeric: 'tabular-nums' }}>{product.rating}</span>
          <span style={{ color: 'var(--fg-soft)' }}>·</span>
          <span style={{ fontSize: 12 }}>{product.reviews.toLocaleString()} reviews</span>
        </div>

        <div className="pc-price-row">
          <span className="pc-price">${product.price}</span>
          {product.orig && (
            <>
              <span className="pc-price-orig">${product.orig}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--brand-rose)', marginLeft: 'auto' }}>Save {discount}%</span>
            </>
          )}
        </div>

        {product.colorOpts && product.colorOpts.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <div className="pc-swatches">
              {product.colorOpts.slice(0, 5).map((c, i) => (
                <button
                  key={i}
                  className="pc-swatch"
                  onClick={() => setSelectedColor(i)}
                  aria-label={c.name}
                  style={{
                    backgroundColor: c.hex,
                    transform: selectedColor === i ? 'scale(1.18)' : 'scale(1)',
                    boxShadow: selectedColor === i ? `0 0 0 1.5px var(--fg), inset 0 0 0 1px rgba(0,0,0,0.1)` : 'inset 0 0 0 1px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s var(--ease-spring)',
                  }}
                />
              ))}
              {product.colorOpts.length > 5 && (
                <span style={{ fontSize: 11, color: 'var(--fg-soft)', marginLeft: 4, alignSelf: 'center' }}>+{product.colorOpts.length - 5}</span>
              )}
            </div>
            <span style={{ fontSize: 11, color: 'var(--fg-muted)', marginLeft: 'auto' }}>{product.colorOpts[selectedColor]?.name}</span>
          </div>
        )}
      </div>
    </article>
  );
}

/* ─── FEATURED PRODUCTS ──────────────────────────────────────── */
function FeaturedProducts({ products, wishlist, onAdd, onWish }) {
  const [tab, setTab] = useStateP('all');
  const tabs = [
    { id: 'all', label: 'All', count: products.length },
    { id: 'audio', label: 'Audio' },
    { id: 'home', label: 'Home' },
    { id: 'apparel', label: 'Apparel' },
    { id: 'wearables', label: 'Wearables' },
  ];
  const filtered = tab === 'all' ? products : products.filter(p => p.cat === tab);

  return (
    <section style={{ padding: '40px 24px 80px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Featured this week"
          title="Hand-picked, never algorithmic."
          sub="A short list, refreshed every Monday by our editors. No sponsored placements."
          cta="View all 312"
          action={
            <div className="tabs desktop-only">
              {tabs.map(t => (
                <button key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
              ))}
            </div>
          }
        />

        <div className="products-grid">
          {filtered.slice(0, 8).map((p, i) => (
            <div key={p.id} className="reveal" style={{ animationDelay: `${i * 60}ms` }}>
              <ProductCard product={p} onAdd={onAdd} onWish={onWish} isWished={wishlist.includes(p.id)}/>
            </div>
          ))}
        </div>

        <style>{`
          .products-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
          @media (max-width: 1100px) { .products-grid { grid-template-columns: repeat(3, 1fr); } }
          @media (max-width: 800px) { .products-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; } }
        `}</style>
      </div>
    </section>
  );
}

/* ─── FLASH SALE ─────────────────────────────────────────── */
function FlashSale({ products, wishlist, onAdd, onWish }) {
  const [time, setTime] = useStateP({ h: 6, m: 14, s: 42 });
  useEffectP(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 23; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pad = n => String(n).padStart(2, '0');

  const flash = products.filter(p => p.orig).slice(0, 4);

  return (
    <section style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1a0b2e 0%, #2d0a4e 40%, #4a0e63 100%)',
          borderRadius: 'var(--r-2xl)',
          padding: 'clamp(28px, 4vw, 48px)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* decorative */}
          <div className="orb" style={{ width: 280, height: 280, background: '#ec4899', top: -40, right: '20%', opacity: 0.4 }}/>
          <div className="orb" style={{ width: 220, height: 220, background: '#f59e0b', bottom: -40, right: -40, opacity: 0.35, animationDelay: '2s' }}/>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 32 }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em' }}>
                  <span className="dot live" style={{ background: '#f59e0b' }}/> FLASH SALE
                </div>
                <h2 className="font-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 400, marginTop: 16, letterSpacing: '-0.02em' }}>
                  Loud savings, <span style={{ background: 'linear-gradient(90deg, #f59e0b, #ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>quiet pieces.</span>
                </h2>
                <p style={{ fontSize: 15, opacity: 0.7, marginTop: 8, maxWidth: 480 }}>
                  Up to 40% off across audio, lighting, and home essentials. Once stock runs out, the price returns.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {[['HRS', time.h], ['MIN', time.m], ['SEC', time.s]].map(([l, v]) => (
                  <div key={l} style={{
                    width: 80, height: 88, borderRadius: 'var(--r-lg)',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(8px)',
                  }}>
                    <div className="font-mono" style={{ fontSize: 32, fontWeight: 700, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{pad(v)}</div>
                    <div style={{ fontSize: 10, letterSpacing: '0.15em', opacity: 0.6, marginTop: 6 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flash-grid">
              {flash.map(p => (
                <FlashCard key={p.id} product={p} onAdd={onAdd} isWished={wishlist.includes(p.id)} onWish={onWish}/>
              ))}
            </div>
          </div>
          <style>{`
            .flash-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
            @media (max-width: 1000px) { .flash-grid { grid-template-columns: repeat(2, 1fr); } }
          `}</style>
        </div>
      </div>
    </section>
  );
}

function FlashCard({ product, onAdd }) {
  const discount = product.orig ? Math.round((1 - product.price / product.orig) * 100) : 0;
  const sold = 60 + (product.seed * 4);
  return (
    <div style={{
      background: 'rgba(255,255,255,0.06)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 'var(--r-xl)',
      overflow: 'hidden',
      transition: 'all 0.3s var(--ease-out)',
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
      <div style={{ aspectRatio: '4/3', position: 'relative', background: `url(${product.image}) center/cover` }}>
        <span className="badge badge-sale" style={{ position: 'absolute', top: 10, left: 10 }}>−{discount}%</span>
      </div>
      <div style={{ padding: 16, color: 'white' }}>
        <div style={{ fontSize: 11, opacity: 0.6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{product.brand}</div>
        <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4, marginBottom: 12 }}>{product.name}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 22, fontWeight: 700 }}>${product.price}</span>
          <span style={{ fontSize: 13, opacity: 0.5, textDecoration: 'line-through' }}>${product.orig}</span>
        </div>
        <div style={{ marginBottom: 10 }}>
          <div style={{ height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${sold}%`, background: 'linear-gradient(90deg, #f59e0b, #ec4899)' }}/>
          </div>
          <div style={{ fontSize: 11, opacity: 0.7, marginTop: 6 }}>{sold}% claimed</div>
        </div>
        <button
          onClick={() => onAdd(product)}
          style={{
            width: '100%', height: 36, borderRadius: 999,
            background: 'white', color: '#1a0b2e',
            fontSize: 13, fontWeight: 600,
          }}
        >Grab it now</button>
      </div>
    </div>
  );
}

/* ─── HORIZONTAL CAROUSEL ─────────────────────────────── */
function HorizontalCarousel({ title, eyebrow, sub, products, wishlist, onAdd, onWish, accent }) {
  const ref = useRefP(null);
  const scroll = (dir) => {
    ref.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };
  return (
    <section style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          sub={sub}
          action={
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-icon" style={{ background: 'var(--bg-muted)' }} onClick={() => scroll(-1)} aria-label="Scroll left"><Icon name="chevron_left" size={18}/></button>
              <button className="btn-icon" style={{ background: 'var(--bg-muted)' }} onClick={() => scroll(1)} aria-label="Scroll right"><Icon name="chevron_right" size={18}/></button>
            </div>
          }
          cta="See all"
        />
        <div ref={ref} className="scrollable-x fade-mask-r" style={{ display: 'flex', gap: 20, paddingBottom: 8 }}>
          {products.map(p => (
            <div key={p.id} style={{ width: 280, flexShrink: 0 }}>
              <ProductCard product={p} onAdd={onAdd} onWish={onWish} isWished={wishlist.includes(p.id)}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── BEST SELLERS LIST ───────────────────────────────── */
function BestSellers({ products, onAdd }) {
  const top = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5);
  return (
    <section style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: 48 }} className="best-grid">
          <div style={{ position: 'sticky', top: 100, alignSelf: 'flex-start' }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 24, height: 1, background: 'var(--fg-muted)' }}/>
              Best sellers · This month
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(40px, 4.5vw, 60px)', lineHeight: 1, fontWeight: 400 }}>
              What 38,219 people actually bought.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--fg-muted)', marginTop: 16, lineHeight: 1.5 }}>
              Ranked by orders, not search volume. Updated daily at midnight UTC.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
              <button className="btn btn-primary">Shop best sellers</button>
              <button className="btn btn-ghost">View report →</button>
            </div>

            <div style={{ marginTop: 40, padding: 20, borderRadius: 'var(--r-xl)', background: 'var(--bg-muted)' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 8 }}>This week</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span className="font-display" style={{ fontSize: 56, lineHeight: 1 }}>+18%</span>
                <span style={{ fontSize: 13, color: 'var(--brand-emerald)', fontWeight: 600 }}>vs last week</span>
              </div>
              <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', marginTop: 16, height: 60 }}>
                {[40, 52, 48, 64, 58, 78, 88].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 6 ? 'var(--grad-aurora)' : 'var(--border-strong)', borderRadius: 4 }}/>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--fg-soft)', marginTop: 8 }}>
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </div>

          <ol style={{ display: 'flex', flexDirection: 'column' }}>
            {top.map((p, i) => (
              <li key={p.id} style={{
                display: 'grid',
                gridTemplateColumns: '60px 100px 1fr auto auto',
                gap: 20, alignItems: 'center',
                padding: '20px 0',
                borderBottom: i < top.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <span className="font-display" style={{ fontSize: 48, color: 'var(--border-strong)', lineHeight: 1, fontWeight: 400, fontVariantNumeric: 'tabular-nums' }}>0{i+1}</span>
                <img src={p.image} alt="" style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 'var(--r-md)' }}/>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--fg-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{p.brand}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>{p.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6, fontSize: 12, color: 'var(--fg-muted)' }}>
                    <Stars value={p.rating}/>
                    <span>{p.rating} · {p.reviews.toLocaleString()} reviews</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>${p.price}</div>
                  {p.orig && <div style={{ fontSize: 12, color: 'var(--fg-soft)', textDecoration: 'line-through' }}>${p.orig}</div>}
                </div>
                <button className="btn btn-outline btn-sm" onClick={() => onAdd(p)}>
                  <Icon name="plus" size={12}/> Add
                </button>
              </li>
            ))}
          </ol>
        </div>
        <style>{`
          @media (max-width: 1000px) {
            .best-grid { grid-template-columns: 1fr !important; }
            .best-grid > div:first-child { position: static !important; }
          }
          @media (max-width: 640px) {
            .best-grid ol li { grid-template-columns: 40px 70px 1fr !important; }
            .best-grid ol li > *:nth-child(4),
            .best-grid ol li > *:nth-child(5) { grid-column: 2 / 4; }
          }
        `}</style>
      </div>
    </section>
  );
}

window.ProductCard = ProductCard;
window.FeaturedProducts = FeaturedProducts;
window.FlashSale = FlashSale;
window.HorizontalCarousel = HorizontalCarousel;
window.BestSellers = BestSellers;
