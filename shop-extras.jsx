/* global React, Icon, Stars, SectionHeader, ProductCard */
// Filter rail + product browse area + testimonials + newsletter + footer

const { useState: useStateE, useEffect: useEffectE } = React;

/* ─── BROWSE WITH FILTERS ─────────────────────────────── */
function BrowseSection({ products, wishlist, onAdd, onWish }) {
  const [view, setView] = useStateE('grid');
  const [sort, setSort] = useStateE('Featured');
  const [openCats, setOpenCats] = useStateE(['cat', 'price', 'rating']);
  const [priceRange, setPriceRange] = useStateE([20, 280]);
  const [selectedCats, setSelectedCats] = useStateE(['home', 'audio']);
  const [selectedColors, setSelectedColors] = useStateE([0, 3]);
  const [minRating, setMinRating] = useStateE(4);
  const [selectedBrands, setSelectedBrands] = useStateE(['Aether']);
  const [mobileFilter, setMobileFilter] = useStateE(false);

  const filtered = products
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .filter(p => selectedCats.length === 0 || selectedCats.includes(p.cat))
    .filter(p => p.rating >= minRating);

  return (
    <section style={{ padding: '40px 24px 80px', background: 'var(--surface-2)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Browse everything"
          title="Find your kind of quiet."
          sub="2,318 products, refined by 18 filters. Saved searches sync across devices."
        />

        <div className="browse-grid">
          {/* Filter rail */}
          <aside className={`filter-rail ${mobileFilter ? 'open' : ''}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name="filter" size={16}/> Filters
              </h3>
              <button className="btn btn-ghost btn-sm mobile-only" onClick={() => setMobileFilter(false)}>
                <Icon name="close" size={14}/> Close
              </button>
              <a style={{ fontSize: 12, color: 'var(--fg-muted)', cursor: 'pointer', textDecoration: 'underline' }} className="desktop-only">Reset all</a>
            </div>

            {/* Active filter chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {selectedCats.map(c => (
                <button key={c} className="filter-chip" onClick={() => setSelectedCats(selectedCats.filter(x => x !== c))}>
                  {c} <Icon name="close" size={11}/>
                </button>
              ))}
              {selectedBrands.map(b => (
                <button key={b} className="filter-chip" onClick={() => setSelectedBrands(selectedBrands.filter(x => x !== b))}>
                  {b} <Icon name="close" size={11}/>
                </button>
              ))}
              <span style={{ fontSize: 11, color: 'var(--fg-soft)', alignSelf: 'center', marginLeft: 'auto' }}>{selectedCats.length + selectedBrands.length} active</span>
            </div>

            <FilterGroup title="Category" open={openCats.includes('cat')} onToggle={() => setOpenCats(t => t.includes('cat') ? t.filter(x => x !== 'cat') : [...t, 'cat'])}>
              {window.HALO.CATEGORIES.map(c => (
                <label key={c.id} className="check filter-row">
                  <input type="checkbox" checked={selectedCats.includes(c.id)} onChange={() => setSelectedCats(s => s.includes(c.id) ? s.filter(x => x !== c.id) : [...s, c.id])}/>
                  <span className="check-box"><Icon name="check" size={11} strokeWidth={3}/></span>
                  <span style={{ flex: 1, fontSize: 13 }}>{c.name}</span>
                  <span style={{ fontSize: 11, color: 'var(--fg-soft)' }}>{c.count}</span>
                </label>
              ))}
            </FilterGroup>

            <FilterGroup title={`Price · $${priceRange[0]}–$${priceRange[1]}`} open={openCats.includes('price')} onToggle={() => setOpenCats(t => t.includes('price') ? t.filter(x => x !== 'price') : [...t, 'price'])}>
              <div style={{ padding: '8px 4px' }}>
                {/* Histogram */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 40, marginBottom: 8 }}>
                  {[8, 14, 22, 28, 36, 42, 38, 30, 22, 18, 12, 8].map((h, i) => {
                    const startP = i * 35;
                    const endP = startP + 35;
                    const inRange = endP >= priceRange[0] && startP <= priceRange[1];
                    return <div key={i} style={{ flex: 1, height: `${h}px`, background: inRange ? 'var(--fg)' : 'var(--border-strong)', borderRadius: 2, transition: 'all 0.2s' }}/>;
                  })}
                </div>
                <PriceSlider value={priceRange} onChange={setPriceRange}/>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--fg-soft)', marginTop: 8 }}>
                  <span>$0</span><span>$400+</span>
                </div>
              </div>
            </FilterGroup>

            <FilterGroup title="Rating" open={openCats.includes('rating')} onToggle={() => setOpenCats(t => t.includes('rating') ? t.filter(x => x !== 'rating') : [...t, 'rating'])}>
              {[5, 4, 3, 2].map(r => (
                <label key={r} className="check filter-row radio">
                  <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)}/>
                  <span className="check-box"></span>
                  <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                    <Stars value={r}/> & up
                  </span>
                </label>
              ))}
            </FilterGroup>

            <FilterGroup title="Color" open={openCats.includes('color')} onToggle={() => setOpenCats(t => t.includes('color') ? t.filter(x => x !== 'color') : [...t, 'color'])}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {window.HALO.COLOR_OPTIONS.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColors(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i])}
                    title={c.name}
                    style={{
                      aspectRatio: '1',
                      borderRadius: 'var(--r-md)',
                      background: c.hex,
                      boxShadow: selectedColors.includes(i) ? `0 0 0 2px var(--fg), inset 0 0 0 1px rgba(0,0,0,0.1)` : 'inset 0 0 0 1px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s var(--ease-spring)',
                      transform: selectedColors.includes(i) ? 'scale(0.92)' : 'scale(1)',
                    }}
                  />
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Brand" open={openCats.includes('brand')} onToggle={() => setOpenCats(t => t.includes('brand') ? t.filter(x => x !== 'brand') : [...t, 'brand'])}>
              <div className="search-input" style={{ height: 36, fontSize: 13, marginBottom: 10 }}>
                <Icon name="search" size={14}/>
                <input placeholder="Search brands…"/>
              </div>
              {window.HALO.BRANDS.slice(0, 6).map(b => (
                <label key={b} className="check filter-row">
                  <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => setSelectedBrands(s => s.includes(b) ? s.filter(x => x !== b) : [...s, b])}/>
                  <span className="check-box"><Icon name="check" size={11} strokeWidth={3}/></span>
                  <span style={{ flex: 1, fontSize: 13 }}>{b}</span>
                </label>
              ))}
            </FilterGroup>

            <FilterGroup title="Availability" open={openCats.includes('avail')} onToggle={() => setOpenCats(t => t.includes('avail') ? t.filter(x => x !== 'avail') : [...t, 'avail'])}>
              <label className="check filter-row">
                <input type="checkbox" defaultChecked/>
                <span className="check-box"><Icon name="check" size={11} strokeWidth={3}/></span>
                <span style={{ fontSize: 13 }}>In stock only</span>
              </label>
              <label className="check filter-row">
                <input type="checkbox"/>
                <span className="check-box"><Icon name="check" size={11} strokeWidth={3}/></span>
                <span style={{ fontSize: 13 }}>Pre-order welcome</span>
              </label>
              <label className="check filter-row">
                <input type="checkbox"/>
                <span className="check-box"><Icon name="check" size={11} strokeWidth={3}/></span>
                <span style={{ fontSize: 13 }}>On sale</span>
              </label>
            </FilterGroup>

            <button className="btn btn-gradient btn-block mobile-only" style={{ marginTop: 20 }} onClick={() => setMobileFilter(false)}>
              Show {filtered.length} results
            </button>
          </aside>

          {/* Results */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
              <div style={{ fontSize: 13, color: 'var(--fg-muted)' }}>
                <strong style={{ color: 'var(--fg)' }}>{filtered.length}</strong> products
                <span className="desktop-only"> · across {selectedCats.length || 'all'} categor{selectedCats.length === 1 ? 'y' : 'ies'}</span>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button className="btn btn-outline btn-sm mobile-only" onClick={() => setMobileFilter(true)}>
                  <Icon name="filter" size={14}/> Filters
                </button>
                <div className="tabs" style={{ height: 36 }}>
                  <button className={`tab ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')} aria-label="Grid view" style={{ padding: '4px 10px' }}><Icon name="grid" size={14}/></button>
                  <button className={`tab ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')} aria-label="List view" style={{ padding: '4px 10px' }}><Icon name="list" size={14}/></button>
                </div>
                <SortMenu value={sort} onChange={setSort}/>
              </div>
            </div>

            {view === 'grid' ? (
              <div className="browse-products-grid">
                {filtered.map((p, i) => (
                  <div key={p.id} className="reveal" style={{ animationDelay: `${i * 40}ms` }}>
                    <ProductCard product={p} onAdd={onAdd} onWish={onWish} isWished={wishlist.includes(p.id)}/>
                  </div>
                ))}
              </div>
            ) : (
              <ListView products={filtered} onAdd={onAdd} onWish={onWish} wishlist={wishlist}/>
            )}

            <Pagination/>
          </div>
        </div>

        <style>{`
          .browse-grid { display: grid; grid-template-columns: 260px 1fr; gap: 32px; align-items: flex-start; }
          .filter-rail { background: var(--surface); border: 1px solid var(--border); border-radius: var(--r-xl); padding: 20px; position: sticky; top: 100px; max-height: calc(100vh - 120px); overflow-y: auto; }
          .browse-products-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
          @media (max-width: 1100px) { .browse-products-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 900px) {
            .browse-grid { grid-template-columns: 1fr; }
            .filter-rail { position: fixed; inset: 0; max-height: 100vh; z-index: 200; border-radius: 0; transform: translateX(-100%); transition: transform 0.3s; }
            .filter-rail.open { transform: translateX(0); }
          }
          @media (max-width: 540px) { .browse-products-grid { grid-template-columns: 1fr; } }
          .filter-row { padding: 8px 4px; cursor: pointer; border-radius: 6px; }
          .filter-row:hover { background: var(--bg-muted); }
          .filter-chip { display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px 4px 10px; border-radius: 999px; background: var(--fg); color: var(--bg); font-size: 11px; font-weight: 500; }
          .filter-chip:hover { opacity: 0.85; }
        `}</style>
      </div>
    </section>
  );
}

function FilterGroup({ title, open, onToggle, children }) {
  return (
    <div style={{ borderTop: '1px solid var(--border)', padding: '14px 0' }}>
      <button onClick={onToggle} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', fontSize: 13, fontWeight: 600 }}>
        {title}
        <Icon name="chevron_down" size={14} style={{ transform: open ? 'rotate(180deg)' : '', transition: 'transform 0.2s' }}/>
      </button>
      {open && <div style={{ marginTop: 10 }}>{children}</div>}
    </div>
  );
}

function PriceSlider({ value, onChange }) {
  const [a, b] = value;
  const min = 0, max = 400;
  const aPct = (a / max) * 100;
  const bPct = (b / max) * 100;
  return (
    <div className="range-slider">
      <div className="track"/>
      <div className="fill" style={{ left: `${aPct}%`, right: `${100 - bPct}%` }}/>
      <input type="range" min={min} max={max} value={a} onChange={e => onChange([Math.min(+e.target.value, b - 10), b])} className="dual-thumb" style={dualStyle(aPct)}/>
      <input type="range" min={min} max={max} value={b} onChange={e => onChange([a, Math.max(+e.target.value, a + 10)])} className="dual-thumb" style={dualStyle(bPct)}/>
      <style>{`
        .dual-thumb { position: absolute; left: 0; right: 0; width: 100%; pointer-events: none; -webkit-appearance: none; background: transparent; height: 32px; margin: 0; }
        .dual-thumb::-webkit-slider-thumb { pointer-events: all; -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: white; border: 2px solid var(--fg); box-shadow: var(--shadow-md); cursor: grab; }
        .dual-thumb::-moz-range-thumb { pointer-events: all; width: 18px; height: 18px; border-radius: 50%; background: white; border: 2px solid var(--fg); box-shadow: var(--shadow-md); cursor: grab; }
      `}</style>
    </div>
  );
}
function dualStyle() { return { zIndex: 2 }; }

function SortMenu({ value, onChange }) {
  const [open, setOpen] = useStateE(false);
  const opts = ['Featured', 'Newest', 'Price: low to high', 'Price: high to low', 'Top rated', 'Best selling'];
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ height: 36, padding: '0 14px', borderRadius: 'var(--r-md)', background: 'var(--surface)', border: '1px solid var(--border)', fontSize: 13, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 8 }}
      >
        Sort: <strong>{value}</strong>
        <Icon name="chevron_down" size={14}/>
      </button>
      {open && (
        <div className="menu" onMouseLeave={() => setOpen(false)} style={{ position: 'absolute', top: 'calc(100% + 4px)', right: 0, minWidth: 200, zIndex: 30 }}>
          {opts.map(o => (
            <div key={o} className="menu-item" onClick={() => { onChange(o); setOpen(false); }}>
              <Icon name="check" size={14} className="menu-icon" style={{ opacity: value === o ? 1 : 0 }}/>
              <span>{o}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ListView({ products, onAdd, onWish, wishlist }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {products.map(p => (
        <article key={p.id} style={{
          display: 'grid', gridTemplateColumns: '160px 1fr auto', gap: 20,
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-lg)', padding: 16, alignItems: 'center',
        }}>
          <img src={p.image} alt="" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 'var(--r-md)' }}/>
          <div>
            <div style={{ fontSize: 11, color: 'var(--fg-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{p.brand}</div>
            <div style={{ fontSize: 18, fontWeight: 600, marginTop: 2 }}>{p.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6, fontSize: 12, color: 'var(--fg-muted)' }}>
              <Stars value={p.rating}/><span>{p.rating} · {p.reviews} reviews</span>
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
              {p.colorOpts.slice(0, 5).map((c, i) => <span key={i} style={{ width: 14, height: 14, borderRadius: '50%', background: c.hex, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)' }}/>)}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              {p.orig && <span style={{ fontSize: 13, color: 'var(--fg-soft)', textDecoration: 'line-through' }}>${p.orig}</span>}
              <span style={{ fontSize: 22, fontWeight: 700 }}>${p.price}</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-icon" onClick={() => onWish(p)} style={{ background: 'var(--bg-muted)' }}><Icon name="heart" size={14}/></button>
              <button className="btn btn-primary btn-sm" onClick={() => onAdd(p)}><Icon name="plus" size={12}/> Add</button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function Pagination() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, marginTop: 40 }}>
      <button className="btn-icon" style={{ background: 'var(--bg-muted)' }}><Icon name="chevron_left" size={16}/></button>
      {[1, 2, 3, 4, 5, '…', 18].map((n, i) => (
        <button key={i} style={{
          width: 36, height: 36, borderRadius: 'var(--r-full)',
          fontSize: 13, fontWeight: 500,
          background: n === 2 ? 'var(--fg)' : 'transparent',
          color: n === 2 ? 'var(--bg)' : 'var(--fg)',
        }}>{n}</button>
      ))}
      <button className="btn-icon" style={{ background: 'var(--bg-muted)' }}><Icon name="chevron_right" size={16}/></button>
    </div>
  );
}

/* ─── TESTIMONIALS / SOCIAL PROOF ─────────────────────── */
function Testimonials() {
  const T = window.HALO.TESTIMONIALS;
  return (
    <section style={{ padding: '80px 24px', background: 'var(--bg-tint)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="What people say"
          title="38,219 quietly happy people."
        />
        <div className="test-grid">
          {T.map((t, i) => (
            <div key={i} className="card card-pad" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Stars value={5} size={16}/>
                <svg width="28" height="20" viewBox="0 0 28 20" fill="currentColor" style={{ color: 'var(--brand-violet)', opacity: 0.3 }}>
                  <path d="M0 20V10C0 4.5 4.5 0 10 0v4c-3.3 0-6 2.7-6 6h6v10H0zM16 20V10c0-5.5 4.5-10 10-10v4c-3.3 0-6 2.7-6 6h6v10H16z"/>
                </svg>
              </div>
              <p style={{ fontSize: 17, lineHeight: 1.5, fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg, ${window.HALO.COLOR_OPTIONS[t.avatar].hex}, ${window.HALO.COLOR_OPTIONS[(t.avatar + 2) % 8].hex})` }}/>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{t.role}</div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--brand-emerald)' }}>
                  <Icon name="check" size={12}/> Verified
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Brand strip */}
        <div style={{ marginTop: 64, paddingTop: 40, borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: 11, textAlign: 'center', color: 'var(--fg-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>
            Featured in
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: 24, flexWrap: 'wrap', opacity: 0.6 }}>
            {['Dwell', 'Monocle', 'Wallpaper*', 'Cereal', 'Apartamento', 'Kinfolk'].map(name => (
              <span key={name} className="font-display" style={{ fontSize: 28, letterSpacing: '-0.03em' }}>{name}</span>
            ))}
          </div>
        </div>

        <style>{`
          .test-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
          @media (max-width: 900px) { .test-grid { grid-template-columns: 1fr; } }
        `}</style>
      </div>
    </section>
  );
}

/* ─── NEWSLETTER ─────────────────────────────────────── */
function Newsletter() {
  const [email, setEmail] = useStateE('');
  const [sent, setSent] = useStateE(false);
  return (
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{
          position: 'relative',
          padding: 'clamp(40px, 6vw, 80px)',
          borderRadius: 'var(--r-2xl)',
          background: 'linear-gradient(135deg, #0a0816 0%, #1a0b2e 50%, #2d0e54 100%)',
          color: 'white',
          overflow: 'hidden',
        }}>
          <div className="orb" style={{ width: 360, height: 360, background: '#ec4899', top: -80, left: '40%' }}/>
          <div className="orb" style={{ width: 280, height: 280, background: '#f59e0b', bottom: -80, right: 40, opacity: 0.5, animationDelay: '2s' }}/>
          <div className="orb" style={{ width: 220, height: 220, background: '#7c3aed', top: 20, left: 40, opacity: 0.5, animationDelay: '4s' }}/>

          <div style={{ position: 'relative', zIndex: 2, maxWidth: 640 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em' }}>
              <Icon name="mail" size={12}/> 84,210 subscribers
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 400, marginTop: 20, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              The <span style={{ background: 'linear-gradient(90deg, #ec4899, #f59e0b)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Monday Note.</span>
            </h2>
            <p style={{ fontSize: 17, opacity: 0.75, marginTop: 16, lineHeight: 1.5 }}>
              Five quiet picks, one studio visit, zero spam. Every Monday, 7am.
            </p>

            <form
              onSubmit={(e) => { e.preventDefault(); if (email) { setSent(true); setTimeout(() => setSent(false), 3000); } }}
              style={{
                display: 'flex',
                marginTop: 32,
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.16)',
                borderRadius: 999,
                padding: 6,
                maxWidth: 520,
              }}
            >
              <input
                type="email" placeholder="you@studio.com" value={email} onChange={e => setEmail(e.target.value)}
                style={{ flex: 1, background: 'transparent', border: 0, outline: 'none', padding: '0 20px', color: 'white', fontSize: 15 }}
              />
              <button type="submit" className="btn btn-gradient" style={{ height: 44 }}>
                {sent ? <><Icon name="check" size={14}/> Subscribed</> : <>Subscribe <Icon name="arrow_right" size={14}/></>}
              </button>
            </form>

            <div style={{ display: 'flex', gap: 24, marginTop: 24, fontSize: 12, opacity: 0.7, flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Icon name="check" size={12}/> Unsubscribe anytime</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Icon name="check" size={12}/> No third-party sharing</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Icon name="check" size={12}/> 1% goes to maker workshops</span>
            </div>
          </div>

          {/* Decorative envelope shapes */}
          <div style={{ position: 'absolute', right: 'clamp(40px, 6vw, 80px)', top: '50%', transform: 'translateY(-50%)', display: 'none' }} className="desktop-only-stack">
            <div style={{
              width: 240, height: 160, borderRadius: 'var(--r-lg)',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              transform: 'rotate(-6deg)',
            }}/>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────── */
function Footer() {
  const cols = [
    { title: 'Shop', items: ['New In', 'Best Sellers', 'Sale', 'Gift cards', 'Halo Loves', 'Last chance'] },
    { title: 'Help', items: ['Contact us', 'Shipping & returns', 'Order status', 'Size guide', 'Care guides', 'Repair program'] },
    { title: 'Studio', items: ['About Halo', 'The Journal', 'Maker network', 'Sustainability', 'Press kit', 'Careers'] },
    { title: 'Connect', items: ['Wholesale', 'Affiliate', 'Refer a friend', 'Trade program', 'Open call'] },
  ];

  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', paddingTop: 64 }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
        <div className="footer-top">
          <div style={{ maxWidth: 360 }}>
            <window.HaloLogo size={28}/>
            <p style={{ fontSize: 14, color: 'var(--fg-muted)', marginTop: 16, lineHeight: 1.5 }}>
              An editorial-led shop for considered objects. Independent since 2019, employee-owned since 2024.
            </p>
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 8 }}>Get the Halo app</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 'var(--r-md)', background: 'var(--fg)', color: 'var(--bg)', fontSize: 13, fontWeight: 500 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.86-3.08.42-1.09-.45-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.42C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                  App Store
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 'var(--r-md)', background: 'var(--bg-muted)', color: 'var(--fg)', fontSize: 13, fontWeight: 500 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3.6 1.5l13.5 12L3.6 22.5V1.5zm15.6 11.4L17.1 14l-2.4 2.4 4.5-2.55c.6-.45.6-1.35 0-1.8L17.1 10L15.6 8.4L13.2 12l5.7 5.4z"/></svg>
                  Play Store
                </button>
              </div>
            </div>
          </div>

          <div className="footer-cols">
            {cols.map(c => (
              <div key={c.title}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{c.title}</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {c.items.map(item => (
                    <li key={item}><a style={{ fontSize: 13, color: 'var(--fg-muted)', cursor: 'pointer' }}>{item}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, padding: '32px 0', borderTop: '1px solid var(--border)', marginTop: 48 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--fg-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="map_pin" size={14}/> 42 Redchurch Street, London E2 7DP</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="phone" size={14}/> +44 (0)20 7946 0421</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="mail" size={14}/> hello@halo.studio</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>Pay your way</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['VISA', 'MC', 'AMEX', 'PAYPAL', 'KLARNA', 'APPLE', 'GOOGLE'].map(p => (
                <div key={p} style={{ height: 28, padding: '0 10px', borderRadius: 4, background: 'var(--bg-muted)', display: 'inline-flex', alignItems: 'center', fontSize: 10, fontWeight: 700, letterSpacing: '0.04em' }}>{p}</div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 32, paddingTop: 24, borderTop: '1px solid var(--border)', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontSize: 12, color: 'var(--fg-soft)' }}>
            © 2026 Halo Studio Ltd. · <a style={{ textDecoration: 'underline', cursor: 'pointer' }}>Privacy</a> · <a style={{ textDecoration: 'underline', cursor: 'pointer' }}>Terms</a> · <a style={{ textDecoration: 'underline', cursor: 'pointer' }}>Cookies</a> · <a style={{ textDecoration: 'underline', cursor: 'pointer' }}>Accessibility</a>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { name: 'instagram', d: 'M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zM12 8a4 4 0 100 8 4 4 0 000-8zM17.5 6.5h.01' },
              { name: 'twitter', d: 'M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 00.497-3.753C20.18 7.773 21.692 5.25 22 4.009z' },
              { name: 'youtube', d: 'M22 8.5s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.2 5.4 12 5.4 12 5.4s-4.2 0-7.2.2c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 10.1 2 11.7v1.6c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.3.9 1.7.2 7.2.2 7.2.2s4.2 0 7.2-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.6c0-1.6-.5-3.2-.5-3.2zM10 15V9l5 3-5 3z' },
              { name: 'tiktok', d: 'M9 12a4 4 0 104 4V4a5 5 0 005 5' },
            ].map(s => (
              <a key={s.name} className="btn-icon sm" style={{ background: 'var(--bg-muted)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={s.d}/></svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-top { display: grid; grid-template-columns: 1fr 1.6fr; gap: 64px; }
        .footer-cols { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
        @media (max-width: 900px) {
          .footer-top { grid-template-columns: 1fr; }
          .footer-cols { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </footer>
  );
}

window.BrowseSection = BrowseSection;
window.Testimonials = Testimonials;
window.Newsletter = Newsletter;
window.Footer = Footer;
