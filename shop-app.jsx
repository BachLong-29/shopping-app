/* global React, ReactDOM, Header, Hero, FeaturesStrip, Categories, FeaturedProducts,
   FlashSale, HorizontalCarousel, BestSellers, BrowseSection, Testimonials,
   Newsletter, Footer, CartDrawer, CommandPalette, MobileNav, ToastStack, Icon,
   useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle */

const { useState, useEffect, useRef } = React;

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "viewport": "desktop",
  "accent": "aurora",
  "showFAB": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(DEFAULTS);
  const theme = t.theme;
  const [cart, setCart] = useState([
    { product: window.HALO.PRODUCTS[0], qty: 1 },
    { product: window.HALO.PRODUCTS[7], qty: 2 },
  ]);
  const [wishlist, setWishlist] = useState(['p3', 'p5']);
  const [cartOpen, setCartOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  // Sync theme attr on body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Scroll listener for sticky header state
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(o => !o); }
      if (e.key === 'Escape') { setCmdOpen(false); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function pushToast(toast) {
    const id = Math.random().toString(36).slice(2);
    setToasts(ts => [...ts, { ...toast, id }]);
    setTimeout(() => setToasts(ts => ts.filter(t => t.id !== id)), 4000);
  }

  function handleAdd(product) {
    setCart(c => {
      const idx = c.findIndex(i => i.product.id === product.id);
      if (idx >= 0) {
        const next = [...c]; next[idx] = { ...next[idx], qty: next[idx].qty + 1 }; return next;
      }
      return [...c, { product, qty: 1 }];
    });
    pushToast({ title: 'Added to bag', sub: `${product.name} · $${product.price}`, kind: 'success' });
  }

  function handleWish(product) {
    setWishlist(w => {
      const isIn = w.includes(product.id);
      if (isIn) { pushToast({ title: 'Removed from wishlist', sub: product.name, kind: 'info' }); return w.filter(id => id !== product.id); }
      pushToast({ title: 'Saved to wishlist', sub: product.name, kind: 'success' });
      return [...w, product.id];
    });
  }

  function handleRemove(item) { setCart(c => c.filter(i => i !== item)); }
  function handleQty(item, delta) {
    setCart(c => c.map(i => i === item ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  }

  const cartCount = cart.reduce((n, i) => n + i.qty, 0);
  const products = window.HALO.PRODUCTS;
  const trending = [...products].sort(() => Math.random() - 0.5).slice(0, 8);
  const recommended = products.slice(2, 10);

  return (
    <div className={`viewport-${t.viewport}`}>
      <Header
        theme={theme}
        onThemeToggle={() => setTweak('theme', theme === 'dark' ? 'light' : 'dark')}
        cartCount={cartCount}
        wishCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setCmdOpen(true)}
        onOpenMobile={() => setMobileNavOpen(true)}
        scrolled={scrolled}
      />

      <main>
        <Hero/>
        <FeaturesStrip/>
        <Categories/>
        <FeaturedProducts products={products} wishlist={wishlist} onAdd={handleAdd} onWish={handleWish}/>
        <FlashSale products={products} wishlist={wishlist} onAdd={handleAdd} onWish={handleWish}/>
        <HorizontalCarousel
          eyebrow="Trending right now"
          title="What people are wishlisting today."
          sub="Updated every hour from anonymized wishlist signals."
          products={trending}
          wishlist={wishlist}
          onAdd={handleAdd}
          onWish={handleWish}
        />
        <BestSellers products={products} onAdd={handleAdd}/>
        <BrowseSection products={products} wishlist={wishlist} onAdd={handleAdd} onWish={handleWish}/>
        <HorizontalCarousel
          eyebrow="Recommended for Asha"
          title="Picked for your taste profile."
          sub="Based on your saved searches and 12 recently viewed products."
          products={recommended}
          wishlist={wishlist}
          onAdd={handleAdd}
          onWish={handleWish}
        />
        <Testimonials/>
        <Newsletter/>
      </main>
      <Footer/>

      {/* Mobile bottom nav */}
      <MobileBottomNav cartCount={cartCount} onOpenCart={() => setCartOpen(true)} onOpenSearch={() => setCmdOpen(true)} onOpenMenu={() => setMobileNavOpen(true)}/>

      {/* Floating action — design system link */}
      {t.showFAB && (
        <a href="design-system.html" className="fab" style={{ bottom: 24, right: 24 }} aria-label="View design system">
          <Icon name="layout_grid" size={20}/>
        </a>
      )}

      {/* Overlays */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} onRemove={handleRemove} onQty={handleQty}/>
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} products={products} onAdd={handleAdd}/>
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} theme={theme} onThemeToggle={() => setTweak('theme', theme === 'dark' ? 'light' : 'dark')}/>
      <ToastStack toasts={toasts} onDismiss={(id) => setToasts(ts => ts.filter(t => t.id !== id))}/>

      {/* Tweaks */}
      <TweaksPanel>
        <TweakSection title="Theme">
          <TweakRadio tweakKey="theme" label="Mode" options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
          ]}/>
        </TweakSection>
        <TweakSection title="Viewport">
          <TweakRadio tweakKey="viewport" label="Device" options={[
            { value: 'desktop', label: 'Desktop' },
            { value: 'mobile', label: 'Mobile' },
          ]}/>
        </TweakSection>
        <TweakSection title="Misc">
          <TweakToggle tweakKey="showFAB" label="Show DS button"/>
        </TweakSection>
        <div style={{ fontSize: 11, color: 'var(--fg-soft)', padding: '8px 12px', lineHeight: 1.5 }}>
          Hit <span className="kbd">⌘K</span> for the search palette. <a href="design-system.html" style={{ textDecoration: 'underline' }}>Open design system →</a>
        </div>
      </TweaksPanel>
    </div>
  );
}

/* ─── MOBILE BOTTOM NAV ─────────────────────────────── */
function MobileBottomNav({ cartCount, onOpenCart, onOpenSearch, onOpenMenu }) {
  const [active, setActive] = useState('home');
  const items = [
    { id: 'home', icon: 'home', label: 'Shop' },
    { id: 'search', icon: 'search', label: 'Search', onTap: onOpenSearch },
    { id: 'cart', icon: 'shopping_bag', label: 'Bag', badge: cartCount, onTap: onOpenCart, primary: true },
    { id: 'wish', icon: 'heart', label: 'Saved' },
    { id: 'me', icon: 'user', label: 'Me' },
  ];
  return (
    <nav className="mobile-bottom-nav glass">
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => { setActive(item.id); item.onTap?.(); }}
          className={active === item.id ? 'active' : ''}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1, padding: '8px 4px', color: active === item.id ? 'var(--fg)' : 'var(--fg-soft)', fontSize: 10, fontWeight: 500, position: 'relative' }}
        >
          {item.primary ? (
            <span style={{
              width: 44, height: 44, marginTop: -16, borderRadius: '50%',
              background: 'var(--grad-aurora)',
              color: 'white',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 10px 24px -8px rgba(124,58,237,0.6)',
              position: 'relative',
            }}>
              <Icon name={item.icon} size={20}/>
              {item.badge > 0 && <span style={{ position: 'absolute', top: -4, right: -4, minWidth: 18, height: 18, padding: '0 5px', borderRadius: 999, background: 'var(--bg)', color: 'var(--fg)', fontSize: 10, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--bg)' }}>{item.badge}</span>}
            </span>
          ) : (
            <span style={{ position: 'relative' }}>
              <Icon name={item.icon} size={20}/>
              {item.badge > 0 && <span className="cart-badge" style={{ top: -4, right: -8 }}>{item.badge}</span>}
            </span>
          )}
          <span>{item.label}</span>
          {active === item.id && !item.primary && <span style={{ position: 'absolute', top: 0, width: 16, height: 2, background: 'var(--fg)', borderRadius: 999 }}/>}
        </button>
      ))}
    </nav>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
