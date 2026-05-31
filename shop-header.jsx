/* global React, Icon */
// HALO Header — sticky, glass, mega menu, search, mobile nav

const { useState, useEffect, useRef } = React;

function HaloLogo({ size = 22 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id="halo-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c3aed"/>
            <stop offset="55%" stopColor="#ec4899"/>
            <stop offset="100%" stopColor="#f59e0b"/>
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="9" fill="none" stroke="url(#halo-mark)" strokeWidth="2.5"/>
        <circle cx="12" cy="12" r="3.2" fill="url(#halo-mark)"/>
      </svg>
      <span className="font-display" style={{ fontSize: 26, lineHeight: 1, fontWeight: 500 }}>halo</span>
    </div>
  );
}

const MEGA_MENU = {
  'New In': {
    blocks: [
      { title: 'Just Landed', items: ['This week', 'Last 30 days', 'Pre-order', 'Coming soon'] },
      { title: 'Editor\'s Picks', items: ['Halo Loves', 'Staff Edit', 'Limited drops', 'Collaborations'] },
      { title: 'Trending', items: ['Most wished', 'Best reviewed', 'Restock alert', 'Last chance'] },
    ],
    featured: { tag: 'NEW IN AUDIO', title: 'Volta Series II', sub: 'Studio-grade headphones', seed: 1 },
  },
  Shop: {
    blocks: [
      { title: 'Audio', items: ['Headphones', 'Earbuds', 'Speakers', 'Turntables'] },
      { title: 'Home', items: ['Lighting', 'Textiles', 'Ceramics', 'Diffusers'] },
      { title: 'Workspace', items: ['Lamps', 'Stationery', 'Drinkware', 'Desk gear'] },
      { title: 'Wearables', items: ['Watches', 'Rings', 'Trackers', 'Accessories'] },
    ],
    featured: { tag: 'FALL EDIT', title: 'Quiet Earth', sub: '12 pieces, one mood', seed: 7 },
  },
  Brands: {
    blocks: [
      { title: 'A–F', items: ['Aether', 'Field Lab', 'Frame', 'Forma'] },
      { title: 'G–M', items: ['Hara', 'Lumi', 'Mono Studio'] },
      { title: 'N–S', items: ['North & Co', 'Pavo', 'Rove'] },
      { title: 'T–Z', items: ['Tilde', 'Verse', 'Wove'] },
    ],
    featured: { tag: 'BRAND SPOTLIGHT', title: 'Mono Studio', sub: 'Tokyo, est. 2017', seed: 4 },
  },
  Stories: {
    blocks: [
      { title: 'Read', items: ['Journal', 'Interviews', 'Behind the design', 'Field notes'] },
      { title: 'Watch', items: ['Studio visits', 'Process films', 'Unboxings'] },
      { title: 'Listen', items: ['Halo Radio', 'Founder talks'] },
    ],
    featured: { tag: 'FILM', title: 'A morning with Hara', sub: 'Kyoto, autumn 2026', seed: 8 },
  },
  Sale: {
    blocks: [
      { title: 'Up to 50% off', items: ['Audio', 'Home', 'Workspace'] },
      { title: 'Final markdown', items: ['Under $50', 'Under $100'] },
      { title: 'Outlet', items: ['Last chance', 'Open box'] },
    ],
    featured: { tag: 'FLASH 24H', title: '−40% on Volta', sub: 'Ends midnight tonight', seed: 5 },
  },
};

function MegaMenu({ open, panel, onClose }) {
  if (!open) return null;
  const data = MEGA_MENU[panel];
  if (!data) return null;
  return (
    <div
      onMouseEnter={() => {}}
      onMouseLeave={onClose}
      style={{
        position: 'absolute',
        top: '100%', left: 0, right: 0,
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        boxShadow: 'var(--shadow-lg)',
        animation: 'fadeIn 0.2s var(--ease-out)',
        zIndex: 60,
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '36px 32px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 48 }}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${data.blocks.length}, 1fr)`, gap: 32 }}>
          {data.blocks.map(block => (
            <div key={block.title}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)', marginBottom: 14 }}>{block.title}</div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {block.items.map(item => (
                  <li key={item}>
                    <a className="menu-link" style={{ fontSize: 14, color: 'var(--fg)', cursor: 'pointer' }}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {data.featured && (
          <div
            style={{
              borderRadius: 'var(--r-xl)',
              overflow: 'hidden', position: 'relative',
              minHeight: 240,
              backgroundImage: `url(${window.HALO.productImage(data.featured.seed, data.featured.title.split(' ')[0], data.featured.tag)})`,
              backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'pointer',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.6))' }}/>
            <div style={{ position: 'absolute', left: 20, right: 20, bottom: 20, color: 'white' }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', opacity: 0.85 }}>{data.featured.tag}</div>
              <div className="font-display" style={{ fontSize: 28, marginTop: 4 }}>{data.featured.title}</div>
              <div style={{ fontSize: 13, opacity: 0.85, marginTop: 2 }}>{data.featured.sub}</div>
              <div style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500 }}>
                Discover <Icon name="arrow_right" size={14}/>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Header({ theme, onThemeToggle, cartCount, wishCount, onOpenCart, onOpenSearch, onOpenMobile, scrolled }) {
  const [mega, setMega] = useState(null);
  const [userOpen, setUserOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const closeT = useRef(null);

  function enter(key) { if (closeT.current) clearTimeout(closeT.current); setMega(key); }
  function leave() { closeT.current = setTimeout(() => setMega(null), 120); }

  const navItems = ['New In', 'Shop', 'Brands', 'Stories', 'Sale'];

  return (
    <>
      {/* Promo top bar */}
      <div style={{
        background: 'var(--fg)',
        color: 'var(--bg)',
        fontSize: 12,
        height: 36,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 16, letterSpacing: '0.01em',
        position: 'relative', zIndex: 51,
      }}>
        <span className="dot live" style={{ background: 'var(--brand-amber)' }}/>
        <span>Flash sale ends in <strong style={{ fontVariantNumeric: 'tabular-nums' }}>06:14:42</strong> · Free shipping over $80</span>
        <span style={{ opacity: 0.5 }}>·</span>
        <a style={{ textDecoration: 'underline', cursor: 'pointer' }}>Shop now →</a>
      </div>

      <header
        className={scrolled ? 'glass' : ''}
        style={{
          position: 'sticky', top: 0,
          zIndex: 50,
          borderBottom: '1px solid ' + (scrolled ? 'var(--border)' : 'transparent'),
          background: scrolled ? 'var(--glass-bg)' : 'var(--bg)',
          transition: 'all 0.25s var(--ease-out)',
        }}
        onMouseLeave={leave}
      >
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px', height: scrolled ? 64 : 76, display: 'flex', alignItems: 'center', gap: 32, transition: 'height 0.25s var(--ease-out)' }}>
          {/* Mobile hamburger */}
          <button className="btn-icon mobile-only" onClick={onOpenMobile} aria-label="Open menu">
            <Icon name="menu" size={20}/>
          </button>

          {/* Logo */}
          <a style={{ display: 'flex', cursor: 'pointer' }}><HaloLogo/></a>

          {/* Nav */}
          <nav className="desktop-only" style={{ display: 'flex', gap: 4, marginLeft: 8 }}>
            {navItems.map(item => (
              <button
                key={item}
                onMouseEnter={() => enter(item)}
                onClick={() => enter(item)}
                style={{
                  padding: '8px 14px',
                  fontSize: 14, fontWeight: 500,
                  color: mega === item ? 'var(--fg)' : 'var(--fg-muted)',
                  borderRadius: 'var(--r-full)',
                  transition: 'all 0.2s var(--ease-out)',
                  position: 'relative',
                }}
              >
                {item}
                {item === 'Sale' && (
                  <span style={{ position: 'absolute', top: 0, right: 0, width: 6, height: 6, borderRadius: '50%', background: 'var(--brand-rose)' }}/>
                )}
              </button>
            ))}
          </nav>

          {/* Search */}
          <button
            onClick={onOpenSearch}
            className="desktop-only"
            style={{
              flex: 1,
              display: 'flex', alignItems: 'center', gap: 12,
              height: 40, padding: '0 14px',
              background: 'var(--bg-muted)',
              borderRadius: 'var(--r-full)',
              color: 'var(--fg-soft)',
              fontSize: 14,
              maxWidth: 380, marginLeft: 'auto',
              transition: 'all 0.2s var(--ease-out)',
            }}
          >
            <Icon name="search" size={16}/>
            <span>Search 2,300+ products</span>
            <span style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
              <span className="kbd" style={{ background: 'var(--surface)' }}>⌘</span>
              <span className="kbd" style={{ background: 'var(--surface)' }}>K</span>
            </span>
          </button>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
            <button className="btn-icon mobile-only" onClick={onOpenSearch} aria-label="Search"><Icon name="search" size={18}/></button>

            <div className="tt-wrap desktop-only">
              <button className="btn-icon" onClick={onThemeToggle} aria-label="Toggle theme">
                <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18}/>
              </button>
              <span className="tt">Toggle theme</span>
            </div>

            <div className="tt-wrap desktop-only" style={{ position: 'relative' }}>
              <button className="btn-icon" onClick={() => { setNotifOpen(o => !o); setUserOpen(false); }} aria-label="Notifications">
                <Icon name="bell" size={18}/>
                <span style={{ position: 'absolute', top: 8, right: 8, width: 7, height: 7, borderRadius: '50%', background: 'var(--brand-rose)', border: '2px solid var(--bg)' }}/>
              </button>
              {!notifOpen && <span className="tt">Notifications</span>}
              {notifOpen && <NotifMenu onClose={() => setNotifOpen(false)}/>}
            </div>

            <div className="tt-wrap">
              <button className="btn-icon" aria-label="Wishlist" style={{ position: 'relative' }}>
                <Icon name="heart" size={18}/>
                {wishCount > 0 && <span className="cart-badge">{wishCount}</span>}
              </button>
              <span className="tt">Wishlist · {wishCount}</span>
            </div>

            <div className="tt-wrap">
              <button className="btn-icon" onClick={onOpenCart} aria-label="Cart" style={{ position: 'relative' }}>
                <Icon name="shopping_bag" size={18}/>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </button>
              <span className="tt">Cart · {cartCount}</span>
            </div>

            <div className="desktop-only" style={{ position: 'relative' }}>
              <button onClick={() => { setUserOpen(o => !o); setNotifOpen(false); }} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '4px 4px 4px 12px',
                height: 40, borderRadius: 'var(--r-full)', background: 'var(--bg-muted)',
                fontSize: 13, fontWeight: 500,
              }}>
                <span>Asha</span>
                <span style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'var(--grad-aurora)',
                  color: 'white',
                  fontSize: 12, fontWeight: 600,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>AP</span>
              </button>
              {userOpen && <UserMenu onClose={() => setUserOpen(false)}/>}
            </div>
          </div>
        </div>

        <MegaMenu open={!!mega} panel={mega} onClose={leave}/>
      </header>
    </>
  );
}

function NotifMenu({ onClose }) {
  const items = [
    { type: 'order', title: 'Order #HL-29841 shipped', sub: 'Arriving Wed, May 28', time: '2h ago', icon: 'package', tint: 'var(--brand-sky)' },
    { type: 'sale', title: 'Flash sale on Volta Series', sub: 'Up to 40% off, today only', time: '5h ago', icon: 'zap', tint: 'var(--brand-amber)' },
    { type: 'wish', title: 'Back in stock: Hara Cashmere Crew', sub: 'Your wishlist item is available', time: '1d ago', icon: 'heart', tint: 'var(--brand-rose)' },
  ];
  return (
    <div className="menu" onMouseLeave={onClose} style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 360, padding: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
        <strong style={{ fontSize: 14 }}>Notifications</strong>
        <a style={{ fontSize: 12, color: 'var(--fg-muted)', cursor: 'pointer' }}>Mark all read</a>
      </div>
      <ul style={{ padding: 6 }}>
        {items.map((n, i) => (
          <li key={i} style={{ display: 'flex', gap: 12, padding: 12, borderRadius: 'var(--r-md)', cursor: 'pointer' }} className="menu-item-row">
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: n.tint, color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={n.icon} size={16}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg)' }}>{n.title}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{n.sub}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-soft)', marginTop: 2 }}>{n.time}</div>
            </div>
          </li>
        ))}
      </ul>
      <div style={{ padding: 10, borderTop: '1px solid var(--border)' }}>
        <a style={{ fontSize: 13, color: 'var(--fg)', fontWeight: 500, cursor: 'pointer', display: 'flex', justifyContent: 'center' }}>See all notifications →</a>
      </div>
    </div>
  );
}

function UserMenu({ onClose }) {
  return (
    <div className="menu" onMouseLeave={onClose} style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 240 }}>
      <div style={{ padding: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
        <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--grad-aurora)', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 13 }}>AP</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Asha Patel</div>
          <div style={{ fontSize: 11, color: 'var(--fg-soft)' }}>asha@halo.studio</div>
        </div>
      </div>
      <div className="menu-sep"/>
      <div className="menu-label">Account</div>
      {[
        { icon: 'user', label: 'Profile' },
        { icon: 'package', label: 'Orders', badge: '2' },
        { icon: 'heart', label: 'Wishlist' },
        { icon: 'map_pin', label: 'Addresses' },
      ].map(item => (
        <div key={item.label} className="menu-item">
          <Icon name={item.icon} size={16} className="menu-icon"/>
          <span style={{ flex: 1 }}>{item.label}</span>
          {item.badge && <span className="badge badge-soft" style={{ height: 18, fontSize: 10 }}>{item.badge}</span>}
        </div>
      ))}
      <div className="menu-sep"/>
      <div className="menu-item">
        <Icon name="info" size={16} className="menu-icon"/><span>Help center</span>
      </div>
      <div className="menu-item danger">
        <Icon name="arrow_right" size={16} className="menu-icon"/><span>Sign out</span>
      </div>
    </div>
  );
}

window.Header = Header;
window.HaloLogo = HaloLogo;
