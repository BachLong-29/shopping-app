/* global React, ReactDOM, Sidebar, AdminTopbar, ActionBar, FilterDrawer, ColumnsPopover,
   ProductTable, MobileCardList, AdminPagination, ALL_COLUMNS, ADMIN_PRODUCTS, Icon,
   useTweaks, TweaksPanel, TweakSection, TweakRadio, CommandPalette */

const { useState, useEffect } = React;

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "viewport": "desktop",
  "density": "comfortable"
}/*EDITMODE-END*/;

function AdminApp() {
  const [t, setTweak] = useTweaks(DEFAULTS);
  const theme = t.theme;

  const [collapsed, setCollapsed] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ status: ['Active', 'Draft'], price: [0, 400], cat: ['Audio'], brand: [] });
  const [filterOpen, setFilterOpen] = useState(false);
  const [colsOpen, setColsOpen] = useState(false);
  const [view, setView] = useState('table');
  const [selected, setSelected] = useState([]);
  const [sortBy, setSortBy] = useState({ id: 'updated', dir: 'desc' });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState('Updated · newest');
  const [cmdOpen, setCmdOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState([
    'id', 'name', 'sku', 'cat', 'brand', 'price', 'disc', 'stock', 'sold', 'rating', 'perf', 'status', 'tags', 'updated',
  ]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(o => !o); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Filter logic
  const filtered = ADMIN_PRODUCTS
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()))
    .filter(p => filters.status.length === 0 || filters.status.includes(p.status))
    .filter(p => p.price >= filters.price[0] && p.price <= filters.price[1])
    .filter(p => filters.cat.length === 0 || filters.cat.includes(p.cat))
    .filter(p => filters.brand.length === 0 || filters.brand.includes(p.brand));

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortBy.id]; const bv = b[sortBy.id];
    const mul = sortBy.dir === 'asc' ? 1 : -1;
    if (typeof av === 'number') return (av - bv) * mul;
    return String(av).localeCompare(String(bv)) * mul;
  });

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice((page - 1) * pageSize, page * pageSize);

  const activeFilterCount = filters.status.length + filters.cat.length + filters.brand.length + (filters.price[0] > 0 || filters.price[1] < 400 ? 1 : 0);

  function toggleColumn(id) {
    setVisible(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id]);
  }

  return (
    <div className={`admin-shell viewport-${t.viewport} density-${t.density}`}>
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(c => !c)}
          active="products"
          activeChild="p-all"
          mobileOpen={mobileNav}
          onMobileClose={() => setMobileNav(false)}
        />

        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <AdminTopbar
            theme={theme}
            onThemeToggle={() => setTweak('theme', theme === 'dark' ? 'light' : 'dark')}
            onOpenSearch={() => setCmdOpen(true)}
            onOpenMobile={() => setMobileNav(true)}
            breadcrumb={['Halo Studio', 'Catalog', 'Products', 'All']}
          />

          <main style={{ padding: 'clamp(16px, 2.5vw, 28px)', flex: 1 }}>
            {/* Page header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginBottom: 20 }}>
              <div>
                <h1 className="font-display" style={{ fontSize: 'clamp(32px, 4vw, 44px)', lineHeight: 1, fontWeight: 400, letterSpacing: '-0.02em' }}>
                  All products
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8, fontSize: 13, color: 'var(--fg-muted)' }}>
                  <span><strong style={{ color: 'var(--fg)' }}>{ADMIN_PRODUCTS.length}</strong> total</span>
                  <span>·</span>
                  <span><strong style={{ color: 'var(--fg)' }}>{ADMIN_PRODUCTS.filter(p => p.status === 'Active').length}</strong> active</span>
                  <span>·</span>
                  <span><strong style={{ color: 'var(--brand-rose)' }}>{ADMIN_PRODUCTS.filter(p => p.stock === 0).length}</strong> out of stock</span>
                  <span>·</span>
                  <span>Last sync 2 min ago</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-ghost btn-sm desktop-only">
                  <Icon name="rotate" size={13}/> Sync inventory
                </button>
                <button className="btn btn-ghost btn-sm desktop-only" onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1500); }}>
                  <Icon name="rotate" size={13}/> Refresh
                </button>
              </div>
            </div>

            {/* Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }} className="stat-grid">
              <StatCard label="Total revenue" value="$284,512" delta="+12.4%" deltaGood seed={0}/>
              <StatCard label="Orders today" value="142" delta="+8.2%" deltaGood seed={1}/>
              <StatCard label="Avg. order value" value="$87.20" delta="−2.1%" seed={2}/>
              <StatCard label="Low stock" value="3" delta="2 critical" tone="warning" seed={3}/>
            </div>

            <ActionBar
              search={search} onSearch={setSearch}
              onOpenFilters={() => setFilterOpen(true)}
              activeFilterCount={activeFilterCount}
              view={view} onView={setView}
              selectedCount={selected.length}
              sort={sort.split(' · ')[0]} onSort={setSort}
              onOpenColumns={() => setColsOpen(o => !o)}
            />

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '12px 0', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--fg-soft)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginRight: 6 }}>Active</span>
                {filters.status.map(s => (
                  <button key={s} className="filter-chip" onClick={() => setFilters(f => ({ ...f, status: f.status.filter(x => x !== s) }))} style={{ background: 'var(--fg)', color: 'var(--bg)' }}>
                    Status: {s} <Icon name="close" size={11}/>
                  </button>
                ))}
                {filters.cat.map(c => (
                  <button key={c} className="filter-chip" onClick={() => setFilters(f => ({ ...f, cat: f.cat.filter(x => x !== c) }))} style={{ background: 'var(--fg)', color: 'var(--bg)' }}>
                    Category: {c} <Icon name="close" size={11}/>
                  </button>
                ))}
                {(filters.price[0] > 0 || filters.price[1] < 400) && (
                  <button className="filter-chip" onClick={() => setFilters(f => ({ ...f, price: [0, 400] }))} style={{ background: 'var(--fg)', color: 'var(--bg)' }}>
                    Price: ${filters.price[0]}–${filters.price[1]} <Icon name="close" size={11}/>
                  </button>
                )}
                <button onClick={() => setFilters({ status: [], price: [0, 400], cat: [], brand: [] })} style={{ fontSize: 11, color: 'var(--fg-muted)', textDecoration: 'underline', marginLeft: 4 }}>Clear all</button>
              </div>
            )}

            {/* Table or grid */}
            <div style={{ marginTop: 20 }}>
              {view === 'table' ? (
                <>
                  <div className="desktop-table">
                    <ProductTable
                      products={paged}
                      visible={visible}
                      selected={selected}
                      setSelected={setSelected}
                      sortBy={sortBy}
                      onSort={(id) => setSortBy(prev => prev.id === id ? { id, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { id, dir: 'asc' })}
                      loading={loading}
                    />
                  </div>
                  <div className="mobile-cards">
                    <MobileCardList products={paged} selected={selected} setSelected={setSelected}/>
                  </div>
                </>
              ) : (
                <GridView products={paged}/>
              )}
            </div>

            <AdminPagination
              total={sorted.length}
              page={page} pageSize={pageSize}
              onPage={setPage}
              onPageSize={setPageSize}
            />
          </main>
        </div>
      </div>

      <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} filters={filters} setFilters={setFilters}/>
      <ColumnsPopover open={colsOpen} onClose={() => setColsOpen(false)} visible={visible} onChange={toggleColumn}/>
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} products={window.HALO.PRODUCTS} onAdd={() => setCmdOpen(false)}/>

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
        <TweakSection title="Density">
          <TweakRadio tweakKey="density" label="Rows" options={[
            { value: 'compact', label: 'Compact' },
            { value: 'comfortable', label: 'Standard' },
          ]}/>
        </TweakSection>
        <div style={{ padding: '8px 12px', fontSize: 11, color: 'var(--fg-soft)', lineHeight: 1.5 }}>
          <a href="index.html" style={{ textDecoration: 'underline' }}>Open storefront →</a><br/>
          <a href="design-system.html" style={{ textDecoration: 'underline' }}>Design system →</a>
        </div>
      </TweaksPanel>
    </div>
  );
}

function StatCard({ label, value, delta, deltaGood, tone, seed }) {
  const data = [40, 55, 48, 62, 58, 72, 68, 80, 75, 88, 82, 92];
  const colors = ['var(--brand-violet)', 'var(--brand-pink)', 'var(--brand-amber)', 'var(--brand-rose)'];
  return (
    <div className="card card-pad" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{label}</span>
        <Icon name="arrow_up_right" size={12} style={{ color: 'var(--fg-soft)' }}/>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span className="font-display" style={{ fontSize: 32, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: tone === 'warning' ? 'var(--brand-amber)' : deltaGood ? 'var(--brand-emerald)' : 'var(--brand-rose)' }}>{delta}</span>
      </div>
      <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 28, marginTop: 4 }}>
        {data.map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, background: i === data.length - 1 ? colors[seed % 4] : 'var(--border-strong)', borderRadius: 2, opacity: i === data.length - 1 ? 1 : 0.5 }}/>)}
      </div>
    </div>
  );
}

function GridView({ products }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
      {products.map(p => (
        <div key={p.id} className="card card-hover" style={{ padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span className="font-mono" style={{ fontSize: 10, color: 'var(--fg-muted)', padding: '2px 6px', background: 'var(--bg-muted)', borderRadius: 4 }}>{p.id}</span>
            <window.StatusBadge status={p.status}/>
          </div>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{p.name}</h3>
          <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginBottom: 14 }}>{p.brand} · {p.cat} · {p.sku}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div><div style={{ fontSize: 10, color: 'var(--fg-soft)', textTransform: 'uppercase' }}>Price</div><div style={{ fontSize: 16, fontWeight: 700 }}>${p.disc || p.price}</div></div>
            <div><div style={{ fontSize: 10, color: 'var(--fg-soft)', textTransform: 'uppercase' }}>Stock</div><div style={{ fontSize: 16, fontWeight: 700, color: p.stock === 0 ? 'var(--brand-rose)' : p.stock < 20 ? 'var(--brand-amber)' : 'var(--fg)' }}>{p.stock}</div></div>
            <div><div style={{ fontSize: 10, color: 'var(--fg-soft)', textTransform: 'uppercase' }}>Sold</div><div style={{ fontSize: 16, fontWeight: 700 }}>{p.sold.toLocaleString()}</div></div>
            <div><div style={{ fontSize: 10, color: 'var(--fg-soft)', textTransform: 'uppercase' }}>Rating</div><div style={{ fontSize: 16, fontWeight: 700 }}>★ {p.rating}</div></div>
          </div>
          <div style={{ height: 4, borderRadius: 999, background: 'var(--bg-muted)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${p.perf}%`, background: 'var(--grad-aurora)' }}/>
          </div>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AdminApp/>);
