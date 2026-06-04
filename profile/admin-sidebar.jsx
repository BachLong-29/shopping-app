/* global React, Icon, HaloLogo */
// Admin Sidebar + Topbar

const { useState: useStateS } = React;

const NAV = [
  { section: 'Overview', items: [
    { id: 'dashboard', icon: 'home', label: 'Dashboard' },
    { id: 'analytics', icon: 'sparkles', label: 'Analytics', badge: 'PRO' },
  ]},
  { section: 'Commerce', items: [
    { id: 'orders', icon: 'package', label: 'Orders', badge: 28 },
    { id: 'products', icon: 'shopping_bag', label: 'Products', href: 'admin.html', children: [
      { id: 'p-all', label: 'All products' },
      { id: 'p-drafts', label: 'Drafts', count: 3 },
      { id: 'p-archived', label: 'Archived' },
      { id: 'p-collections', label: 'Collections' },
    ]},
    { id: 'inventory', icon: 'layers', label: 'Inventory', badge: '!', badgeTone: 'rose' },
    { id: 'categories', icon: 'grid', label: 'Categories' },
    { id: 'promotions', icon: 'zap', label: 'Promotions' },
  ]},
  { section: 'People', items: [
    { id: 'customers', icon: 'user', label: 'Customers' },
    { id: 'reviews', icon: 'star', label: 'Reviews', badge: 12 },
  ]},
  { section: 'Account', items: [
    { id: 'profile', icon: 'user', label: 'My profile', href: 'profile.html' },
    { id: 'settings', icon: 'shield', label: 'Settings' },
  ]},
];

function Sidebar({ collapsed, onToggle, active = 'products', activeChild = 'p-all', mobileOpen, onMobileClose }) {
  const [expanded, setExpanded] = useStateS(['products']);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className="sidebar-overlay"
        onClick={onMobileClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(10,8,15,0.4)', backdropFilter: 'blur(6px)',
          zIndex: 99,
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s var(--ease-out)',
        }}
      />
      <aside
        className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
        style={{
          width: collapsed ? 72 : 248,
          background: 'var(--surface)',
          borderRight: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column',
          transition: 'width 0.3s var(--ease-out)',
        }}
      >
        {/* Logo + collapse */}
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', padding: collapsed ? 0 : '0 16px', borderBottom: '1px solid var(--border)' }}>
          {!collapsed && <HaloLogo size={22}/>}
          {collapsed && (
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <linearGradient id="halo-mark-side" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7c3aed"/><stop offset="55%" stopColor="#ec4899"/><stop offset="100%" stopColor="#f59e0b"/>
                </linearGradient>
              </defs>
              <circle cx="12" cy="12" r="9" fill="none" stroke="url(#halo-mark-side)" strokeWidth="2.5"/>
              <circle cx="12" cy="12" r="3.2" fill="url(#halo-mark-side)"/>
            </svg>
          )}
          {!collapsed && (
            <button onClick={onToggle} className="btn-icon sm" aria-label="Collapse sidebar" style={{ background: 'var(--bg-muted)' }}>
              <Icon name="chevron_left" size={14}/>
            </button>
          )}
        </div>

        {/* Workspace switcher */}
        {!collapsed && (
          <div style={{ padding: 12, borderBottom: '1px solid var(--border)' }}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '8px 10px',
              borderRadius: 'var(--r-md)',
              transition: 'background 0.15s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-muted)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{
                width: 32, height: 32, borderRadius: 'var(--r-md)',
                background: 'var(--grad-aurora)', color: 'white',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 13,
              }}>H</span>
              <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Halo Studio</div>
                <div style={{ fontSize: 11, color: 'var(--fg-soft)' }}>Pro plan · 12 seats</div>
              </div>
              <Icon name="chevron_down" size={14} style={{ color: 'var(--fg-soft)' }}/>
            </button>
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: collapsed ? '12px 8px' : '12px' }}>
          {NAV.map(group => (
            <div key={group.section} style={{ marginBottom: 18 }}>
              {!collapsed && (
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-soft)', padding: '4px 10px', marginBottom: 4 }}>
                  {group.section}
                </div>
              )}
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {group.items.map(item => {
                  const isActive = item.id === active;
                  const isExpanded = expanded.includes(item.id);
                  const NavTag = (item.href && !item.children) ? 'a' : 'button';
                  return (
                    <li key={item.id}>
                      <NavTag
                        href={(item.href && !item.children) ? item.href : undefined}
                        onClick={() => {
                          if (item.children && !collapsed) {
                            setExpanded(e => e.includes(item.id) ? e.filter(x => x !== item.id) : [...e, item.id]);
                          }
                        }}
                        className={`sidebar-item ${isActive ? 'active' : ''}`}
                        style={{
                          display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 12, width: '100%',
                          padding: collapsed ? '10px' : '8px 10px',
                          borderRadius: 'var(--r-md)',
                          justifyContent: collapsed ? 'center' : 'flex-start',
                          position: 'relative',
                          color: isActive ? 'var(--fg)' : 'var(--fg-muted)',
                          background: isActive ? 'var(--bg-muted)' : 'transparent',
                          fontSize: 13, fontWeight: 500,
                          transition: 'all 0.15s var(--ease-out)',
                        }}
                      >
                        {isActive && (
                          <span style={{
                            position: 'absolute', left: -12, top: '50%',
                            transform: 'translateY(-50%)',
                            width: 3, height: 18,
                            background: 'var(--grad-aurora)',
                            borderRadius: '0 2px 2px 0',
                          }}/>
                        )}
                        <Icon name={item.icon} size={16} strokeWidth={isActive ? 2 : 1.75}/>
                        {!collapsed && (
                          <>
                            <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                            {item.badge && (
                              <span style={{
                                padding: '1px 7px',
                                borderRadius: 999, fontSize: 10, fontWeight: 700,
                                background: item.badgeTone === 'rose' ? 'var(--brand-rose)' :
                                            item.badge === 'PRO' ? 'var(--grad-aurora)' :
                                            'var(--bg-tint)',
                                color: item.badgeTone === 'rose' || item.badge === 'PRO' ? 'white' : 'var(--fg-muted)',
                                lineHeight: 1.6,
                              }}>{item.badge}</span>
                            )}
                            {item.children && (
                              <Icon name="chevron_down" size={12} style={{ transform: isExpanded ? 'rotate(180deg)' : '', transition: 'transform 0.2s', color: 'var(--fg-soft)' }}/>
                            )}
                          </>
                        )}
                        {collapsed && (
                          <span className="sidebar-tt">
                            {item.label}
                            {item.badge && <span style={{ marginLeft: 6, padding: '0 6px', borderRadius: 999, background: 'rgba(255,255,255,0.15)', fontSize: 10 }}>{item.badge}</span>}
                          </span>
                        )}
                      </NavTag>
                      {!collapsed && item.children && isExpanded && (
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: 2, marginLeft: 14, paddingLeft: 14, borderLeft: '1px solid var(--border)' }}>
                          {item.children.map(child => {
                            const childActive = child.id === activeChild;
                            return (
                              <li key={child.id}>
                                <button style={{
                                  display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                                  padding: '6px 10px',
                                  borderRadius: 'var(--r-sm)',
                                  fontSize: 12, fontWeight: childActive ? 600 : 500,
                                  color: childActive ? 'var(--fg)' : 'var(--fg-muted)',
                                  background: childActive ? 'var(--bg-muted)' : 'transparent',
                                  transition: 'all 0.15s ease',
                                }}
                                onMouseEnter={e => { if (!childActive) e.currentTarget.style.color = 'var(--fg)'; }}
                                onMouseLeave={e => { if (!childActive) e.currentTarget.style.color = 'var(--fg-muted)'; }}
                                >
                                  <span style={{ flex: 1, textAlign: 'left' }}>{child.label}</span>
                                  {child.count && <span style={{ fontSize: 10, color: 'var(--fg-soft)' }}>{child.count}</span>}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Upgrade cta */}
        {!collapsed ? (
          <div style={{ padding: 12, borderTop: '1px solid var(--border)' }}>
            <div style={{ padding: 14, borderRadius: 'var(--r-md)', background: 'linear-gradient(135deg, #1a0b2e 0%, #2d0a4e 100%)', color: 'white', position: 'relative', overflow: 'hidden' }}>
              <div className="orb" style={{ width: 140, height: 140, background: '#ec4899', top: -60, right: -60, opacity: 0.5 }}/>
              <div style={{ position: 'relative' }}>
                <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Storage</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
                  <span style={{ fontSize: 20, fontWeight: 700 }}>78%</span>
                  <span style={{ fontSize: 11, opacity: 0.7 }}>· 7.8 of 10 GB</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 999, marginTop: 8, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '78%', background: 'linear-gradient(90deg, #f59e0b, #ec4899)' }}/>
                </div>
                <button style={{ width: '100%', height: 30, marginTop: 12, background: 'white', color: '#1a0b2e', fontSize: 12, fontWeight: 600, borderRadius: 'var(--r-sm)' }}>Upgrade plan</button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: 12, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'center' }}>
            <button onClick={onToggle} className="btn-icon" style={{ background: 'var(--bg-muted)' }} aria-label="Expand sidebar">
              <Icon name="chevron_right" size={14}/>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

/* ─── ADMIN TOPBAR ───────────────────────────────── */
function AdminTopbar({ theme, onThemeToggle, onOpenSearch, onOpenMobile, breadcrumb }) {
  return (
    <header
      style={{
        height: 64,
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(20px) saturate(140%)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 16,
        padding: '0 20px',
        position: 'sticky', top: 0,
        zIndex: 50,
      }}
    >
      <button className="btn-icon mobile-only" onClick={onOpenMobile} aria-label="Open menu">
        <Icon name="menu" size={20}/>
      </button>

      {/* Breadcrumb */}
      <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
        {breadcrumb.map((crumb, i) => (
          <React.Fragment key={i}>
            {i > 0 && <Icon name="chevron_right" size={12} style={{ color: 'var(--fg-soft)' }}/>}
            <a style={{
              color: i === breadcrumb.length - 1 ? 'var(--fg)' : 'var(--fg-muted)',
              fontWeight: i === breadcrumb.length - 1 ? 600 : 500,
              cursor: 'pointer',
            }}>{crumb}</a>
          </React.Fragment>
        ))}
      </nav>

      {/* Search */}
      <button
        onClick={onOpenSearch}
        className="desktop-only"
        style={{
          flex: 1,
          display: 'flex', alignItems: 'center', gap: 10,
          height: 36, padding: '0 12px',
          background: 'var(--bg-muted)',
          borderRadius: 'var(--r-md)',
          color: 'var(--fg-soft)',
          fontSize: 13,
          maxWidth: 360, marginLeft: 'auto',
        }}
      >
        <Icon name="search" size={14}/>
        <span>Search…</span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 3 }}>
          <span className="kbd" style={{ fontSize: 10 }}>⌘</span>
          <span className="kbd" style={{ fontSize: 10 }}>K</span>
        </span>
      </button>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
        <button className="btn-icon mobile-only" onClick={onOpenSearch}><Icon name="search" size={18}/></button>

        <div className="tt-wrap desktop-only">
          <button className="btn-icon" onClick={onThemeToggle}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18}/>
          </button>
          <span className="tt">Toggle theme</span>
        </div>

        <div className="tt-wrap desktop-only">
          <button className="btn-icon" style={{ position: 'relative' }}>
            <Icon name="bell" size={18}/>
            <span style={{ position: 'absolute', top: 8, right: 8, width: 7, height: 7, borderRadius: '50%', background: 'var(--brand-rose)', border: '2px solid var(--bg)' }}/>
          </button>
          <span className="tt">3 new alerts</span>
        </div>

        <div className="tt-wrap desktop-only">
          <a href="index.html" className="btn-icon"><Icon name="arrow_up_right" size={18}/></a>
          <span className="tt">Open storefront</span>
        </div>

        <div className="divider-v desktop-only" style={{ height: 24, margin: '0 6px' }}/>

        <a href="profile.html" style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '4px 4px 4px 10px',
          height: 36, borderRadius: 'var(--r-full)', background: 'var(--bg-muted)',
          fontSize: 12, fontWeight: 500,
        }}>
          <span className="desktop-only" style={{ display: 'inline' }}>Asha</span>
          <span style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'var(--grad-aurora)', color: 'white',
            fontSize: 11, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>AP</span>
        </a>
      </div>
    </header>
  );
}

window.Sidebar = Sidebar;
window.AdminTopbar = AdminTopbar;
