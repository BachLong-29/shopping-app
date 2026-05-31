/* global React, Icon, Stars */
// Overlays — Cart drawer, Command palette, Mobile menu, Toast container

const { useState: useStateO, useEffect: useEffectO, useRef: useRefO } = React;

/* ─── CART DRAWER ─────────────────────────────────────── */
function CartDrawer({ open, onClose, cart, onRemove, onQty }) {
  const subtotal = cart.reduce((s, item) => s + item.product.price * item.qty, 0);
  const shipping = subtotal >= 80 ? 0 : 6;
  const freeShipProgress = Math.min(1, subtotal / 80);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(10,8,15,0.4)',
          backdropFilter: 'blur(6px)',
          zIndex: 199,
          opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s var(--ease-out)',
        }}
      />
      <aside
        style={{
          position: 'fixed', right: 0, top: 0, bottom: 0,
          width: 'min(440px, 100vw)',
          background: 'var(--bg)',
          zIndex: 200,
          display: 'flex', flexDirection: 'column',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s var(--ease-out)',
          boxShadow: '-20px 0 60px rgba(0,0,0,0.2)',
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600 }}>Your bag</h3>
            <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 2 }}>{cart.length} item{cart.length === 1 ? '' : 's'}</div>
          </div>
          <button className="btn-icon" onClick={onClose} aria-label="Close"><Icon name="close" size={18}/></button>
        </div>

        {/* Free shipping progress */}
        {cart.length > 0 && (
          <div style={{ padding: '16px 24px', background: 'var(--bg-tint)' }}>
            {shipping === 0 ? (
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--brand-emerald)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon name="check" size={14}/> Free shipping unlocked
              </div>
            ) : (
              <div style={{ fontSize: 13, color: 'var(--fg)' }}>
                Add <strong>${(80 - subtotal).toFixed(2)}</strong> for free shipping
              </div>
            )}
            <div className="progress" style={{ marginTop: 8 }}>
              <div className="progress-bar" style={{ width: `${freeShipProgress * 100}%` }}/>
            </div>
          </div>
        )}

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {cart.length === 0 ? (
            <div className="empty">
              <div className="empty-art"><Icon name="shopping_bag" size={28}/></div>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg)' }}>Your bag is empty</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>Add a few quiet things and they'll show up here.</div>
              <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={onClose}>Start shopping</button>
            </div>
          ) : (
            <ul>
              {cart.map(item => (
                <li key={item.product.id + (item.color || '')} style={{ display: 'flex', gap: 14, padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
                  <img src={item.product.image} alt="" style={{ width: 80, height: 100, objectFit: 'cover', borderRadius: 'var(--r-md)' }}/>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                      <div>
                        <div style={{ fontSize: 11, color: 'var(--fg-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.product.brand}</div>
                        <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{item.product.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ width: 10, height: 10, borderRadius: '50%', background: item.product.colorOpts[0].hex, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)' }}/>
                          {item.product.colorOpts[0].name} · Size M
                        </div>
                      </div>
                      <button className="btn-icon sm" onClick={() => onRemove(item)} aria-label="Remove">
                        <Icon name="trash" size={14}/>
                      </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 0, border: '1px solid var(--border)', borderRadius: 999, height: 28 }}>
                        <button onClick={() => onQty(item, -1)} style={{ width: 28, height: 28, borderRadius: 999 }}><Icon name="minus" size={12}/></button>
                        <span style={{ minWidth: 24, textAlign: 'center', fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{item.qty}</span>
                        <button onClick={() => onQty(item, 1)} style={{ width: 28, height: 28, borderRadius: 999 }}><Icon name="plus" size={12}/></button>
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>${(item.product.price * item.qty).toFixed(2)}</div>
                    </div>
                  </div>
                </li>
              ))}

              {/* Recommendations strip */}
              <div style={{ padding: '20px 24px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 10 }}>Often bought together</div>
                <div style={{ display: 'flex', gap: 10, overflowX: 'auto' }} className="scrollable-x">
                  {window.HALO.PRODUCTS.slice(8, 12).map(p => (
                    <div key={p.id} style={{ width: 120, flexShrink: 0 }}>
                      <img src={p.image} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 'var(--r-md)' }}/>
                      <div style={{ fontSize: 11, fontWeight: 500, marginTop: 6, lineHeight: 1.3 }}>{p.name}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, marginTop: 2 }}>${p.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ul>
          )}
        </div>

        {/* Footer / checkout */}
        {cart.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border)', padding: '20px 24px', background: 'var(--surface)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--fg-muted)' }}>Subtotal</span>
                <span style={{ fontWeight: 500 }}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--fg-muted)' }}>Shipping</span>
                <span style={{ fontWeight: 500, color: shipping === 0 ? 'var(--brand-emerald)' : 'inherit' }}>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 8, paddingTop: 12, borderTop: '1px dashed var(--border)' }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>Total</span>
                <span style={{ fontSize: 22, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>${(subtotal + shipping).toFixed(2)}</span>
              </div>
            </div>
            <button className="btn btn-gradient btn-lg btn-block" style={{ marginTop: 16 }}>
              Checkout · ${(subtotal + shipping).toFixed(2)} <Icon name="arrow_right" size={14}/>
            </button>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, fontSize: 11, color: 'var(--fg-soft)', marginTop: 12 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="shield" size={11}/> Secure checkout</span>
              <span>·</span>
              <span>Pay in 4 with Klarna</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

/* ─── COMMAND PALETTE ─────────────────────────────────── */
function CommandPalette({ open, onClose, products, onAdd }) {
  const [q, setQ] = useStateO('');
  const inputRef = useRefO(null);
  useEffectO(() => {
    if (open && inputRef.current) {
      setQ('');
      setTimeout(() => inputRef.current.focus(), 30);
    }
  }, [open]);

  if (!open) return null;

  const ql = q.toLowerCase();
  const matched = q
    ? products.filter(p => p.name.toLowerCase().includes(ql) || p.brand.toLowerCase().includes(ql) || p.cat.includes(ql)).slice(0, 6)
    : products.slice(0, 5);

  const sections = [
    { label: 'Quick actions', items: [
      { icon: 'package', label: 'Track an order', kbd: 'O' },
      { icon: 'rotate', label: 'Start a return', kbd: 'R' },
      { icon: 'bookmark', label: 'Saved searches', kbd: 'S' },
      { icon: 'globe', label: 'Switch country: United Kingdom', kbd: 'C' },
    ]},
    { label: 'Categories', items: window.HALO.CATEGORIES.slice(0, 4).map(c => ({ icon: 'grid', label: c.name, kbd: '' })) },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-xl)',
          width: 'min(640px, 100%)',
          maxHeight: '70vh',
          display: 'flex', flexDirection: 'column',
          boxShadow: 'var(--shadow-xl)',
          animation: 'slideUp 0.25s var(--ease-spring)',
        }}
      >
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <Icon name="search" size={18} style={{ color: 'var(--fg-soft)' }}/>
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search products, brands, ideas…"
            style={{ flex: 1, background: 'transparent', border: 0, outline: 'none', fontSize: 17, color: 'var(--fg)' }}
          />
          <span className="kbd">ESC</span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
          {!q && (
            <>
              <div style={{ padding: '8px 16px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)', marginBottom: 8 }}>Trending searches</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['linen throw', 'walnut desk', 'mono ring', 'volta headphones', 'wireless speaker', 'cashmere'].map(t => (
                    <button key={t} onClick={() => setQ(t)} style={{ padding: '6px 12px', borderRadius: 999, background: 'var(--bg-muted)', fontSize: 12, fontWeight: 500 }}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="menu-sep"/>
            </>
          )}

          <div style={{ padding: 6 }}>
            <div className="menu-label">{q ? `Products · ${matched.length} found` : 'Suggested for you'}</div>
            {matched.map(p => (
              <button
                key={p.id}
                onClick={() => { onAdd(p); onClose(); }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '10px 12px', borderRadius: 'var(--r-md)', textAlign: 'left' }}
                className="menu-item-row"
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-muted)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <img src={p.image} style={{ width: 44, height: 44, borderRadius: 'var(--r-sm)', objectFit: 'cover' }}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{p.brand} · ${p.price}</div>
                </div>
                {p.badge && (
                  <span className={`badge badge-${p.badge}`}>{p.badge.toUpperCase()}</span>
                )}
                <Icon name="arrow_up_right" size={14} style={{ color: 'var(--fg-soft)' }}/>
              </button>
            ))}
          </div>

          {!q && sections.map(sec => (
            <div key={sec.label} style={{ padding: 6 }}>
              <div className="menu-label">{sec.label}</div>
              {sec.items.map((item, i) => (
                <div key={i} className="menu-item">
                  <Icon name={item.icon} size={16} className="menu-icon"/>
                  <span style={{ flex: 1, fontSize: 13 }}>{item.label}</span>
                  {item.kbd && <span className="kbd">{item.kbd}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', display: 'flex', gap: 16, fontSize: 11, color: 'var(--fg-soft)' }}>
          <span><span className="kbd">↑↓</span> navigate</span>
          <span><span className="kbd">↵</span> select</span>
          <span style={{ marginLeft: 'auto' }}>Powered by Halo Search · v3</span>
        </div>
      </div>
    </div>
  );
}

/* ─── MOBILE NAV DRAWER ─────────────────────────────────── */
function MobileNav({ open, onClose, theme, onThemeToggle }) {
  const sections = [
    { title: 'Shop', items: ['New In', 'Audio', 'Home', 'Workspace', 'Wearables', 'Wellness', 'Apparel', 'Sale'] },
    { title: 'Discover', items: ['Brands', 'Stories', 'Journal', 'Studio visits'] },
    { title: 'Account', items: ['Profile', 'Orders', 'Wishlist', 'Addresses', 'Help'] },
  ];
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(10,8,15,0.4)', backdropFilter: 'blur(6px)',
          zIndex: 199,
          opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s var(--ease-out)',
        }}
      />
      <aside
        style={{
          position: 'fixed', left: 0, top: 0, bottom: 0,
          width: 'min(360px, 90vw)',
          background: 'var(--bg)',
          zIndex: 200,
          display: 'flex', flexDirection: 'column',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.4s var(--ease-out)',
        }}
      >
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
          <window.HaloLogo/>
          <button className="btn-icon" onClick={onClose}><Icon name="close" size={18}/></button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          {sections.map(sec => (
            <div key={sec.title} style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)', marginBottom: 12 }}>{sec.title}</div>
              <ul>
                {sec.items.map(item => (
                  <li key={item} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 16, fontWeight: 500 }}>
                    {item}
                    <Icon name="chevron_right" size={16} style={{ color: 'var(--fg-soft)' }}/>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ padding: 20, borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Dark mode</span>
            <span className={`switch ${theme === 'dark' ? 'on' : ''}`} onClick={onThemeToggle}/>
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>Signed in as Asha Patel · <a style={{ textDecoration: 'underline', cursor: 'pointer' }}>Sign out</a></div>
        </div>
      </aside>
    </>
  );
}

/* ─── TOAST CONTAINER ──────────────────────────────────── */
function ToastStack({ toasts, onDismiss }) {
  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 300, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.kind || 'success'}`} style={{ animation: 'slideUp 0.3s var(--ease-spring)' }}>
          <div className="toast-icon">
            <Icon name={t.kind === 'error' ? 'alert' : t.kind === 'warning' ? 'alert' : t.kind === 'info' ? 'info' : 'check'} size={16}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{t.title}</div>
            {t.sub && <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 2 }}>{t.sub}</div>}
          </div>
          <button className="btn-icon sm" onClick={() => onDismiss(t.id)}><Icon name="close" size={14}/></button>
        </div>
      ))}
    </div>
  );
}

window.CartDrawer = CartDrawer;
window.CommandPalette = CommandPalette;
window.MobileNav = MobileNav;
window.ToastStack = ToastStack;
