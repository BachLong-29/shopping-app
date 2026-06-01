/* global React, Icon, Stars */
// Admin Products — table + filters + action bar

const { useState: useStateP, useEffect: useEffectP, useRef: useRefP } = React;

// Generate realistic product rows
const STATUSES = ['Active', 'Draft', 'Out of Stock', 'Archived', 'Scheduled'];
const STATUS_TONES = {
  'Active':       { bg: 'rgba(16,185,129,0.12)', fg: '#059669',  dot: '#10b981', glow: '0 0 0 4px rgba(16,185,129,0.12)' },
  'Draft':        { bg: 'rgba(139,92,246,0.12)', fg: '#6d28d9',  dot: '#8b5cf6', glow: '0 0 0 4px rgba(139,92,246,0.10)' },
  'Out of Stock': { bg: 'rgba(244,63,94,0.12)',  fg: '#be123c',  dot: '#f43f5e', glow: '0 0 0 4px rgba(244,63,94,0.12)' },
  'Archived':     { bg: 'var(--bg-muted)',       fg: 'var(--fg-muted)', dot: 'var(--fg-soft)', glow: 'none' },
  'Scheduled':    { bg: 'rgba(14,165,233,0.12)', fg: '#0369a1',  dot: '#0ea5e9', glow: '0 0 0 4px rgba(14,165,233,0.10)' },
};

const ADMIN_PRODUCTS = [
  { id: 'HL-1042', sku: 'AETH-VOLT-II-OX',   name: 'Volta Wireless Headphones',   cat: 'Audio',      brand: 'Aether',      price: 349, disc: 289, stock: 4,    sold: 1284, rating: 4.8, status: 'Active',       vis: 'Public',  created: '2026-02-12', updated: '2026-05-22', tags: ['hero','sale','new'],       perf: 92, invStat: 'Low' },
  { id: 'HL-1041', sku: 'NORTH-HALO-MN',    name: 'Halo Mini Speaker',            cat: 'Audio',      brand: 'North&Co',    price: 129, disc: null,stock: 218,  sold: 412,  rating: 4.6, status: 'Active',       vis: 'Public',  created: '2026-01-30', updated: '2026-05-20', tags: ['new','editor'],            perf: 76, invStat: 'OK' },
  { id: 'HL-1040', sku: 'FLD-LIN-THRW-CL',  name: 'Field Linen Throw',            cat: 'Home',       brand: 'Field Lab',   price: 89,  disc: null,stock: 87,   sold: 218,  rating: 4.9, status: 'Active',       vis: 'Public',  created: '2026-01-22', updated: '2026-05-18', tags: ['hot'],                     perf: 88, invStat: 'OK' },
  { id: 'HL-1039', sku: 'PAVO-LAMP-NX',     name: 'Pavo Desk Lamp',               cat: 'Workspace',  brand: 'Pavo',        price: 249, disc: 199, stock: 32,   sold: 326,  rating: 4.7, status: 'Active',       vis: 'Public',  created: '2026-01-14', updated: '2026-05-17', tags: ['sale','featured'],         perf: 81, invStat: 'OK' },
  { id: 'HL-1038', sku: 'MONO-RING-Ti2',    name: 'Mono Smart Ring',              cat: 'Wearables',  brand: 'Mono Studio', price: 349, disc: null,stock: 14,   sold: 612,  rating: 4.5, status: 'Scheduled',    vis: 'Hidden',  created: '2026-01-02', updated: '2026-05-12', tags: ['preorder','limited'],      perf: 64, invStat: 'Low' },
  { id: 'HL-1037', sku: 'VERSE-MAT-S2',     name: 'Verse Yoga Mat',               cat: 'Wellness',   brand: 'Verse',       price: 79,  disc: null,stock: 312,  sold: 504,  rating: 4.8, status: 'Active',       vis: 'Public',  created: '2025-12-18', updated: '2026-05-10', tags: ['bestseller'],              perf: 70, invStat: 'OK' },
  { id: 'HL-1036', sku: 'HARA-CASH-CRW',    name: 'Hara Cashmere Crew',           cat: 'Apparel',    brand: 'Hara',        price: 245, disc: null,stock: 0,    sold: 188,  rating: 4.6, status: 'Out of Stock', vis: 'Public',  created: '2025-12-05', updated: '2026-05-08', tags: ['new'],                     perf: 58, invStat: 'Empty' },
  { id: 'HL-1035', sku: 'LUMI-DIFF-N4',     name: 'Lumi Diffuser No. 4',          cat: 'Home',       brand: 'Lumi',        price: 65,  disc: null,stock: 142,  sold: 829,  rating: 4.4, status: 'Active',       vis: 'Public',  created: '2025-11-28', updated: '2026-05-04', tags: ['hot'],                     perf: 79, invStat: 'OK' },
  { id: 'HL-1034', sku: 'AETH-BUDS-PR',     name: 'Aether Acoustic Buds',         cat: 'Audio',      brand: 'Aether',      price: 199, disc: 179, stock: 96,   sold: 942,  rating: 4.7, status: 'Active',       vis: 'Public',  created: '2025-11-20', updated: '2026-05-02', tags: ['sale'],                    perf: 84, invStat: 'OK' },
  { id: 'HL-1033', sku: 'NORTH-MUG-TR',     name: 'North Travel Mug',             cat: 'Workspace',  brand: 'North&Co',    price: 42,  disc: null,stock: 504,  sold: 1432, rating: 4.9, status: 'Active',       vis: 'Public',  created: '2025-11-12', updated: '2026-04-28', tags: ['bestseller','editor'],     perf: 95, invStat: 'OK' },
  { id: 'HL-1032', sku: 'MONO-NB-VL',       name: 'Mono Vinyl Notebook',          cat: 'Workspace',  brand: 'Mono Studio', price: 28,  disc: null,stock: 0,    sold: 92,   rating: 4.5, status: 'Draft',        vis: 'Hidden',  created: '2025-11-04', updated: '2026-04-20', tags: ['new'],                     perf: 42, invStat: 'Empty' },
  { id: 'HL-1031', sku: 'PAVO-CLK-WAL',     name: 'Pavo Wall Clock',              cat: 'Home',       brand: 'Pavo',        price: 188, disc: 158, stock: 24,   sold: 64,   rating: 4.6, status: 'Active',       vis: 'Public',  created: '2025-10-26', updated: '2026-04-15', tags: ['sale'],                    perf: 52, invStat: 'Low' },
  { id: 'HL-1030', sku: 'HARA-SCRF-LM',     name: 'Hara Merino Scarf',            cat: 'Apparel',    brand: 'Hara',        price: 145, disc: null,stock: 60,   sold: 142,  rating: 4.4, status: 'Archived',     vis: 'Hidden',  created: '2025-10-12', updated: '2026-03-22', tags: ['legacy'],                  perf: 28, invStat: 'OK' },
  { id: 'HL-1029', sku: 'FLD-PIL-NV',       name: 'Field Linen Pillow',           cat: 'Home',       brand: 'Field Lab',   price: 59,  disc: null,stock: 168,  sold: 318,  rating: 4.7, status: 'Active',       vis: 'Public',  created: '2025-10-01', updated: '2026-03-15', tags: [],                          perf: 71, invStat: 'OK' },
  { id: 'HL-1028', sku: 'LUMI-CDL-AM',      name: 'Lumi Amber Candle',            cat: 'Home',       brand: 'Lumi',        price: 38,  disc: null,stock: 220,  sold: 612,  rating: 4.5, status: 'Active',       vis: 'Public',  created: '2025-09-24', updated: '2026-03-10', tags: ['editor'],                  perf: 78, invStat: 'OK' },
];

const ALL_COLUMNS = [
  { id: 'id',       label: 'ID',           w: 100,  sticky: 'left' },
  { id: 'name',     label: 'Product',      w: 280,  sticky: 'left' },
  { id: 'sku',      label: 'SKU',          w: 160,  mono: true },
  { id: 'cat',      label: 'Category',     w: 120 },
  { id: 'brand',    label: 'Brand',        w: 140 },
  { id: 'price',    label: 'Price',        w: 110,  align: 'right' },
  { id: 'disc',     label: 'Discount',     w: 110,  align: 'right' },
  { id: 'stock',    label: 'Stock',        w: 100,  align: 'right' },
  { id: 'sold',     label: 'Sold',         w: 100,  align: 'right' },
  { id: 'rating',   label: 'Rating',       w: 110 },
  { id: 'perf',     label: 'Performance',  w: 160 },
  { id: 'invStat',  label: 'Inventory',    w: 130 },
  { id: 'status',   label: 'Status',       w: 140 },
  { id: 'vis',      label: 'Visibility',   w: 110 },
  { id: 'tags',     label: 'Tags',         w: 200 },
  { id: 'created',  label: 'Created',      w: 120 },
  { id: 'updated',  label: 'Updated',      w: 120 },
  { id: 'action',   label: '',             w: 56,   sticky: 'right' },
];

function StatusBadge({ status }) {
  const t = STATUS_TONES[status];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 9px', borderRadius: 999,
      background: t.bg, color: t.fg,
      fontSize: 11, fontWeight: 600,
      lineHeight: 1.5,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.dot, boxShadow: t.glow }}/>
      {status}
    </span>
  );
}

/* ─── ACTION BAR ─────────────────────────────────── */
function ActionBar({ search, onSearch, onOpenFilters, activeFilterCount, view, onView, selectedCount, sort, onSort, onOpenColumns }) {
  const [sortOpen, setSortOpen] = useStateP(false);
  const sortOpts = ['Updated · newest', 'Updated · oldest', 'Price · high to low', 'Price · low to high', 'Sold · most', 'Sold · least', 'Stock · lowest first'];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
      padding: '14px 0',
      borderBottom: '1px solid var(--border)',
    }}>
      {/* Search */}
      <div style={{ position: 'relative', minWidth: 240, flex: '1 1 240px', maxWidth: 360 }}>
        <Icon name="search" size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-soft)' }}/>
        <input
          className="input"
          placeholder="Search by name, SKU, ID…"
          value={search}
          onChange={e => onSearch(e.target.value)}
          style={{ paddingLeft: 34, height: 36, fontSize: 13 }}
        />
        {search && (
          <button onClick={() => onSearch('')} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', width: 22, height: 22, borderRadius: 999, background: 'var(--bg-muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="close" size={11}/>
          </button>
        )}
      </div>

      <button onClick={onOpenFilters} className="btn btn-outline btn-sm" style={{ position: 'relative' }}>
        <Icon name="filter" size={13}/> Filters
        {activeFilterCount > 0 && (
          <span style={{ minWidth: 18, height: 18, padding: '0 5px', borderRadius: 999, background: 'var(--fg)', color: 'var(--bg)', fontSize: 10, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{activeFilterCount}</span>
        )}
      </button>

      <div style={{ position: 'relative' }}>
        <button onClick={() => setSortOpen(o => !o)} className="btn btn-outline btn-sm">
          <Icon name="list" size={13}/> Sort: <strong>{sort}</strong>
          <Icon name="chevron_down" size={11}/>
        </button>
        {sortOpen && (
          <div className="menu" onMouseLeave={() => setSortOpen(false)} style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, minWidth: 220, zIndex: 30 }}>
            {sortOpts.map(o => (
              <div key={o} className="menu-item" onClick={() => { onSort(o); setSortOpen(false); }}>
                <Icon name="check" size={12} className="menu-icon" style={{ opacity: sort === o ? 1 : 0 }}/>
                <span style={{ fontSize: 12 }}>{o}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={onOpenColumns} className="btn btn-outline btn-sm">
        <Icon name="grid" size={13}/> Columns
      </button>

      <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' }}>
        {selectedCount > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 10px 4px 12px', borderRadius: 'var(--r-full)', background: 'var(--bg-tint)', border: '1px solid var(--border)', fontSize: 12, fontWeight: 500 }}>
            <strong>{selectedCount}</strong> selected
            <button className="btn-ghost btn-sm" style={{ padding: '2px 8px', fontSize: 11 }}>Bulk edit</button>
            <button className="btn-ghost btn-sm" style={{ padding: '2px 8px', fontSize: 11, color: 'var(--brand-rose)' }}>Delete</button>
          </div>
        )}

        <div className="tabs" style={{ height: 32, padding: 2 }}>
          <button className={`tab ${view === 'table' ? 'active' : ''}`} onClick={() => onView('table')} style={{ padding: '4px 8px' }}><Icon name="list" size={13}/></button>
          <button className={`tab ${view === 'grid' ? 'active' : ''}`} onClick={() => onView('grid')} style={{ padding: '4px 8px' }}><Icon name="grid" size={13}/></button>
        </div>

        <button className="btn btn-outline btn-sm"><Icon name="upload" size={13}/> Export</button>
        <button className="btn btn-outline btn-sm desktop-only"><Icon name="upload" size={13} style={{ transform: 'rotate(180deg)' }}/> Import</button>
        <button className="btn btn-gradient btn-sm"><Icon name="plus" size={13}/> Add product</button>
      </div>
    </div>
  );
}

/* ─── FILTER PANEL DRAWER ────────────────────────── */
function FilterDrawer({ open, onClose, filters, setFilters }) {
  const [openGroups, setOpenGroups] = useStateP(['status', 'price', 'cat']);
  const toggle = g => setOpenGroups(o => o.includes(g) ? o.filter(x => x !== g) : [...o, g]);

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
      <aside style={{
        position: 'fixed', right: 0, top: 0, bottom: 0,
        width: 'min(380px, 100vw)',
        background: 'var(--surface)',
        zIndex: 200,
        display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s var(--ease-out)',
        boxShadow: '-20px 0 60px rgba(0,0,0,0.2)',
      }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600 }}>Advanced filters</h3>
            <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 2 }}>Refine across 12 attributes</div>
          </div>
          <button className="btn-icon" onClick={onClose}><Icon name="close" size={16}/></button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
          <FG title="Status" g="status" open={openGroups} onToggle={toggle}>
            {STATUSES.map(s => (
              <label key={s} className="check" style={{ padding: '6px 0', display: 'flex', width: '100%' }}>
                <input type="checkbox" checked={filters.status.includes(s)} onChange={() => setFilters(f => ({ ...f, status: f.status.includes(s) ? f.status.filter(x => x !== s) : [...f.status, s] }))}/>
                <span className="check-box"><Icon name="check" size={11} strokeWidth={3}/></span>
                <span style={{ flex: 1, fontSize: 13 }}><StatusBadge status={s}/></span>
              </label>
            ))}
          </FG>

          <FG title={`Price · $${filters.price[0]}–$${filters.price[1]}`} g="price" open={openGroups} onToggle={toggle}>
            <PriceR value={filters.price} onChange={p => setFilters(f => ({ ...f, price: p }))}/>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <input className="input" style={{ height: 32, fontSize: 12 }} value={filters.price[0]} onChange={e => setFilters(f => ({ ...f, price: [+e.target.value, f.price[1]] }))}/>
              <input className="input" style={{ height: 32, fontSize: 12 }} value={filters.price[1]} onChange={e => setFilters(f => ({ ...f, price: [f.price[0], +e.target.value] }))}/>
            </div>
          </FG>

          <FG title="Category" g="cat" open={openGroups} onToggle={toggle}>
            {['Audio','Home','Workspace','Wearables','Wellness','Apparel'].map(c => (
              <label key={c} className="check" style={{ padding: '6px 0', display: 'flex', width: '100%' }}>
                <input type="checkbox" checked={filters.cat.includes(c)} onChange={() => setFilters(f => ({ ...f, cat: f.cat.includes(c) ? f.cat.filter(x => x !== c) : [...f.cat, c] }))}/>
                <span className="check-box"><Icon name="check" size={11} strokeWidth={3}/></span>
                <span style={{ fontSize: 13 }}>{c}</span>
              </label>
            ))}
          </FG>

          <FG title="Brand" g="brand" open={openGroups} onToggle={toggle}>
            <div className="search-input" style={{ height: 30, fontSize: 12, marginBottom: 8 }}>
              <Icon name="search" size={12}/>
              <input placeholder="Search brand…"/>
            </div>
            {['Aether','North&Co','Field Lab','Pavo','Mono Studio','Verse','Hara','Lumi'].map(b => (
              <label key={b} className="check" style={{ padding: '6px 0', display: 'flex', width: '100%' }}>
                <input type="checkbox" checked={filters.brand.includes(b)} onChange={() => setFilters(f => ({ ...f, brand: f.brand.includes(b) ? f.brand.filter(x => x !== b) : [...f.brand, b] }))}/>
                <span className="check-box"><Icon name="check" size={11} strokeWidth={3}/></span>
                <span style={{ fontSize: 13 }}>{b}</span>
              </label>
            ))}
          </FG>

          <FG title="Stock status" g="stock" open={openGroups} onToggle={toggle}>
            {['In stock','Low stock (<20)','Out of stock'].map(s => (
              <label key={s} className="check" style={{ padding: '6px 0', display: 'flex', width: '100%' }}>
                <input type="checkbox"/>
                <span className="check-box"><Icon name="check" size={11} strokeWidth={3}/></span>
                <span style={{ fontSize: 13 }}>{s}</span>
              </label>
            ))}
          </FG>

          <FG title="Rating" g="rating" open={openGroups} onToggle={toggle}>
            {[5, 4, 3].map(r => (
              <label key={r} className="check radio" style={{ padding: '6px 0', display: 'flex', width: '100%' }}>
                <input type="radio" name="adm-rating"/>
                <span className="check-box"/>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}><Stars value={r}/> & up</span>
              </label>
            ))}
          </FG>

          <FG title="Created date" g="created" open={openGroups} onToggle={toggle}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="input" type="date" defaultValue="2026-01-01" style={{ height: 32, fontSize: 12 }}/>
              <input className="input" type="date" defaultValue="2026-05-26" style={{ height: 32, fontSize: 12 }}/>
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              {['Today','7 days','30 days','This quarter','YTD'].map(p => (
                <button key={p} style={{ padding: '4px 9px', borderRadius: 999, background: 'var(--bg-muted)', fontSize: 11, fontWeight: 500 }}>{p}</button>
              ))}
            </div>
          </FG>

          <FG title="Visibility" g="vis" open={openGroups} onToggle={toggle}>
            {['Public','Hidden','Password protected'].map(v => (
              <label key={v} className="check" style={{ padding: '6px 0', display: 'flex', width: '100%' }}>
                <input type="checkbox"/>
                <span className="check-box"><Icon name="check" size={11} strokeWidth={3}/></span>
                <span style={{ fontSize: 13 }}>{v}</span>
              </label>
            ))}
          </FG>

          <FG title="Tags" g="tags" open={openGroups} onToggle={toggle}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['new','sale','hot','bestseller','editor','featured','preorder','limited','legacy'].map(t => (
                <button key={t} style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--bg-muted)', fontSize: 11, fontWeight: 500 }}>#{t}</button>
              ))}
            </div>
          </FG>
        </div>

        <div style={{ padding: 20, borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost btn-block" onClick={() => setFilters({ status: [], price: [0, 400], cat: [], brand: [] })}>Reset all</button>
          <button className="btn btn-primary btn-block" onClick={onClose}>Apply filters</button>
        </div>
      </aside>
    </>
  );
}

function FG({ title, g, open, onToggle, children }) {
  const isOpen = open.includes(g);
  return (
    <div style={{ borderBottom: '1px solid var(--border)', padding: '14px 0' }}>
      <button onClick={() => onToggle(g)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', fontSize: 13, fontWeight: 600 }}>
        {title}
        <Icon name="chevron_down" size={14} style={{ transform: isOpen ? 'rotate(180deg)' : '', transition: 'transform 0.2s' }}/>
      </button>
      {isOpen && <div style={{ marginTop: 10 }}>{children}</div>}
    </div>
  );
}

function PriceR({ value, onChange }) {
  const [a, b] = value;
  return (
    <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, height: 4, background: 'var(--bg-muted)', borderRadius: 999 }}/>
      <div style={{ position: 'absolute', height: 4, background: 'var(--fg)', borderRadius: 999, left: `${(a/500)*100}%`, right: `${100-(b/500)*100}%` }}/>
      <input type="range" min={0} max={500} value={a} onChange={e => onChange([Math.min(+e.target.value, b-10), b])} style={dual()}/>
      <input type="range" min={0} max={500} value={b} onChange={e => onChange([a, Math.max(+e.target.value, a+10)])} style={dual()}/>
    </div>
  );
}
function dual() { return { position: 'absolute', left: 0, right: 0, width: '100%', pointerEvents: 'none', WebkitAppearance: 'none', background: 'transparent', height: 24, margin: 0 }; }

/* ─── KEBAB MENU ─────────────────────────────────── */
function RowMenu({ open, onClose, onAction, anchorTop }) {
  const items = [
    { id: 'view', icon: 'eye', label: 'View details', kbd: 'V' },
    { id: 'edit', icon: 'shield', label: 'Edit product', kbd: 'E' },
    { id: 'dup',  icon: 'layers', label: 'Duplicate', kbd: 'D' },
    { id: 'inv',  icon: 'package', label: 'Manage inventory' },
    { id: 'feat', icon: 'sparkles', label: 'Feature product' },
    { id: 'status', icon: 'rotate', label: 'Change status' },
    { sep: true },
    { id: 'arch', icon: 'bookmark', label: 'Archive' },
    { id: 'del',  icon: 'trash', label: 'Delete', danger: true, kbd: '⌫' },
  ];

  if (!open) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 90 }}/>
      <div className="menu" style={{
        position: 'fixed',
        right: 80,
        top: anchorTop,
        minWidth: 220,
        zIndex: 100,
        animation: 'slideUp 0.2s var(--ease-spring)',
      }}>
        {items.map((it, i) =>
          it.sep ? <div key={i} className="menu-sep"/> :
          <div key={it.id}
            className={`menu-item ${it.danger ? 'danger' : ''}`}
            onClick={() => { onAction?.(it.id); onClose(); }}
          >
            <Icon name={it.icon} size={14} className="menu-icon"/>
            <span style={{ flex: 1, fontSize: 13 }}>{it.label}</span>
            {it.kbd && <span className="kbd" style={{ fontSize: 10 }}>{it.kbd}</span>}
          </div>
        )}
      </div>
    </>
  );
}

/* ─── COLUMNS POPOVER ────────────────────────────── */
function ColumnsPopover({ open, onClose, visible, onChange }) {
  if (!open) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 90 }}/>
      <div className="menu" style={{ position: 'absolute', top: 70, right: 220, minWidth: 220, zIndex: 100, maxHeight: 400, overflowY: 'auto', padding: 8 }}>
        <div className="menu-label">Show columns</div>
        {ALL_COLUMNS.filter(c => c.id !== 'action').map(col => (
          <label key={col.id} className="check" style={{ width: '100%', padding: '6px 8px', cursor: col.sticky ? 'not-allowed' : 'pointer' }}>
            <input type="checkbox" checked={visible.includes(col.id)} disabled={col.sticky} onChange={() => onChange(col.id)}/>
            <span className="check-box"><Icon name="check" size={11} strokeWidth={3}/></span>
            <span style={{ fontSize: 12, flex: 1 }}>{col.label || col.id}</span>
            {col.sticky && <span style={{ fontSize: 10, color: 'var(--fg-soft)' }}>locked</span>}
          </label>
        ))}
      </div>
    </>
  );
}

/* ─── TABLE ROW ─────────────────────────────────── */
function TableRow({ p, selected, onSelect, visible, onMenuOpen, menuOpenId, hoverRow, onHover }) {
  const isHover = hoverRow === p.id;
  return (
    <tr
      onMouseEnter={() => onHover(p.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        background: isHover ? 'var(--bg-muted)' : (selected ? 'var(--bg-tint)' : 'transparent'),
        transition: 'background 0.12s ease',
      }}
    >
      <td className="td-sticky-l" data-pos="0" style={{ padding: '0 12px', width: 44 }}>
        <label className="check" style={{ display: 'inline-flex' }}>
          <input type="checkbox" checked={selected} onChange={onSelect}/>
          <span className="check-box"><Icon name="check" size={11} strokeWidth={3}/></span>
        </label>
      </td>

      {visible.includes('id') && (
        <td className="td-sticky-l" data-pos="1" style={cellStyle('id')}>
          <span className="font-mono" style={{ fontSize: 11, color: 'var(--fg-muted)', padding: '2px 6px', background: 'var(--bg-muted)', borderRadius: 4 }}>{p.id}</span>
        </td>
      )}

      {visible.includes('name') && (
        <td className="td-sticky-l" data-pos="2" style={cellStyle('name')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 32, height: 32, borderRadius: 'var(--r-sm)', background: 'var(--bg-muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--fg-soft)' }}>
              <Icon name="shopping_bag" size={14}/>
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-soft)', marginTop: 1 }}>{p.cat}</div>
            </div>
          </div>
        </td>
      )}

      {visible.includes('sku') && <td style={cellStyle('sku')}><span className="font-mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{p.sku}</span></td>}
      {visible.includes('cat') && <td style={cellStyle('cat')}><span style={{ fontSize: 12 }}>{p.cat}</span></td>}
      {visible.includes('brand') && <td style={cellStyle('brand')}><span style={{ fontSize: 12, fontWeight: 500 }}>{p.brand}</span></td>}

      {visible.includes('price') && (
        <td style={{ ...cellStyle('price'), textAlign: 'right' }}>
          <div style={{ fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>${p.price}</div>
        </td>
      )}
      {visible.includes('disc') && (
        <td style={{ ...cellStyle('disc'), textAlign: 'right' }}>
          {p.disc ? (
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--brand-rose)', fontVariantNumeric: 'tabular-nums' }}>${p.disc}</div>
              <div style={{ fontSize: 10, color: 'var(--fg-soft)' }}>−{Math.round((1 - p.disc / p.price) * 100)}%</div>
            </div>
          ) : <span style={{ color: 'var(--fg-soft)' }}>—</span>}
        </td>
      )}
      {visible.includes('stock') && (
        <td style={{ ...cellStyle('stock'), textAlign: 'right' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: p.stock === 0 ? 'var(--brand-rose)' : p.stock < 20 ? 'var(--brand-amber)' : 'var(--fg)', fontVariantNumeric: 'tabular-nums' }}>{p.stock}</div>
        </td>
      )}
      {visible.includes('sold') && (
        <td style={{ ...cellStyle('sold'), textAlign: 'right' }}>
          <div style={{ fontSize: 13, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{p.sold.toLocaleString()}</div>
        </td>
      )}
      {visible.includes('rating') && (
        <td style={cellStyle('rating')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Stars value={p.rating} size={11}/>
            <span style={{ fontSize: 11, color: 'var(--fg-muted)', fontVariantNumeric: 'tabular-nums' }}>{p.rating}</span>
          </div>
        </td>
      )}

      {visible.includes('perf') && (
        <td style={cellStyle('perf')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, height: 6, borderRadius: 999, background: 'var(--bg-muted)', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${p.perf}%`,
                background: p.perf > 75 ? 'var(--brand-emerald)' : p.perf > 50 ? 'var(--grad-aurora)' : 'var(--brand-amber)',
                borderRadius: 999,
              }}/>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, fontVariantNumeric: 'tabular-nums', minWidth: 28, textAlign: 'right' }}>{p.perf}</span>
          </div>
        </td>
      )}

      {visible.includes('invStat') && (
        <td style={cellStyle('invStat')}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontSize: 11, fontWeight: 500,
            color: p.invStat === 'Empty' ? 'var(--brand-rose)' : p.invStat === 'Low' ? 'var(--brand-amber)' : 'var(--brand-emerald)',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }}/>
            {p.invStat}
          </span>
        </td>
      )}

      {visible.includes('status') && <td style={cellStyle('status')}><StatusBadge status={p.status}/></td>}
      {visible.includes('vis') && (
        <td style={cellStyle('vis')}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: p.vis === 'Hidden' ? 'var(--fg-soft)' : 'var(--fg)' }}>
            <Icon name="eye" size={11} strokeWidth={2}/> {p.vis}
          </span>
        </td>
      )}

      {visible.includes('tags') && (
        <td style={cellStyle('tags')}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {p.tags.slice(0, 3).map(t => (
              <span key={t} style={{ padding: '1px 7px', borderRadius: 999, background: 'var(--bg-muted)', fontSize: 10, fontWeight: 500, color: 'var(--fg-muted)' }}>#{t}</span>
            ))}
            {p.tags.length === 0 && <span style={{ color: 'var(--fg-soft)', fontSize: 11 }}>—</span>}
          </div>
        </td>
      )}

      {visible.includes('created') && <td style={cellStyle('created')}><span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{p.created}</span></td>}
      {visible.includes('updated') && <td style={cellStyle('updated')}><span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{p.updated}</span></td>}

      <td className="td-sticky-r" style={{ width: 56, padding: '0 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            className="btn-icon sm"
            onClick={(e) => {
              e.stopPropagation();
              const rect = e.currentTarget.getBoundingClientRect();
              onMenuOpen(p.id, rect.top);
            }}
            style={{ background: menuOpenId === p.id ? 'var(--bg-muted)' : 'transparent' }}
            aria-label="Row actions"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

function cellStyle(id) {
  const col = ALL_COLUMNS.find(c => c.id === id);
  return {
    minWidth: col?.w || 100,
    padding: '12px 14px',
    whiteSpace: 'nowrap',
  };
}

/* ─── MAIN TABLE ─────────────────────────────────── */
function ProductTable({ products, visible, selected, setSelected, sortBy, onSort, loading }) {
  const [menuId, setMenuId] = useStateP(null);
  const [menuTop, setMenuTop] = useStateP(0);
  const [hoverRow, setHoverRow] = useStateP(null);

  const allSelected = selected.length === products.length && products.length > 0;

  return (
    <div style={{ position: 'relative', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', overflow: 'hidden', background: 'var(--surface)' }}>
      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: 1400 }}>
          <thead>
            <tr style={{ background: 'var(--bg-tint)' }}>
              <th className="th-sticky-l" data-pos="0" style={{ width: 44, padding: '0 12px', textAlign: 'left' }}>
                <label className="check" style={{ display: 'inline-flex' }}>
                  <input type="checkbox" checked={allSelected} onChange={() => setSelected(allSelected ? [] : products.map(p => p.id))}/>
                  <span className="check-box"><Icon name="check" size={11} strokeWidth={3}/></span>
                </label>
              </th>
              {visible.includes('id') && <Th id="id" sortBy={sortBy} onSort={onSort} sticky="l" pos={1}>ID</Th>}
              {visible.includes('name') && <Th id="name" sortBy={sortBy} onSort={onSort} sticky="l" pos={2}>Product</Th>}
              {visible.includes('sku') && <Th id="sku">SKU</Th>}
              {visible.includes('cat') && <Th id="cat" sortBy={sortBy} onSort={onSort}>Category</Th>}
              {visible.includes('brand') && <Th id="brand" sortBy={sortBy} onSort={onSort}>Brand</Th>}
              {visible.includes('price') && <Th id="price" sortBy={sortBy} onSort={onSort} align="right">Price</Th>}
              {visible.includes('disc') && <Th id="disc" align="right">Discount</Th>}
              {visible.includes('stock') && <Th id="stock" sortBy={sortBy} onSort={onSort} align="right">Stock</Th>}
              {visible.includes('sold') && <Th id="sold" sortBy={sortBy} onSort={onSort} align="right">Sold</Th>}
              {visible.includes('rating') && <Th id="rating" sortBy={sortBy} onSort={onSort}>Rating</Th>}
              {visible.includes('perf') && <Th id="perf">Performance</Th>}
              {visible.includes('invStat') && <Th id="invStat">Inventory</Th>}
              {visible.includes('status') && <Th id="status" sortBy={sortBy} onSort={onSort}>Status</Th>}
              {visible.includes('vis') && <Th id="vis">Visibility</Th>}
              {visible.includes('tags') && <Th id="tags">Tags</Th>}
              {visible.includes('created') && <Th id="created" sortBy={sortBy} onSort={onSort}>Created</Th>}
              {visible.includes('updated') && <Th id="updated" sortBy={sortBy} onSort={onSort}>Updated</Th>}
              <th className="th-sticky-r" style={{ width: 56, padding: '0 8px' }}/>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} visible={visible}/>)
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={visible.length + 2}>
                  <div className="empty" style={{ padding: '80px 24px' }}>
                    <div className="empty-art"><Icon name="package" size={28}/></div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg)' }}>No products match your filters</div>
                    <div style={{ fontSize: 13, marginTop: 4, maxWidth: 360, margin: '4px auto 0' }}>Try widening the price range, clearing tag filters, or removing the search query.</div>
                    <button className="btn btn-outline" style={{ marginTop: 20 }}>Clear all filters</button>
                  </div>
                </td>
              </tr>
            ) : products.map(p => (
              <TableRow
                key={p.id}
                p={p}
                selected={selected.includes(p.id)}
                onSelect={() => setSelected(s => s.includes(p.id) ? s.filter(x => x !== p.id) : [...s, p.id])}
                visible={visible}
                onMenuOpen={(id, top) => { setMenuId(id); setMenuTop(top); }}
                menuOpenId={menuId}
                hoverRow={hoverRow}
                onHover={setHoverRow}
              />
            ))}
          </tbody>
        </table>
      </div>

      <RowMenu
        open={menuId !== null}
        onClose={() => setMenuId(null)}
        anchorTop={menuTop}
        onAction={(action) => console.log('action', action, menuId)}
      />
    </div>
  );
}

function Th({ id, children, align, sortBy, onSort, sticky, pos }) {
  const isSorted = sortBy?.id === id;
  const dir = sortBy?.dir;
  const sortable = !!onSort;
  return (
    <th
      className={sticky === 'l' ? 'th-sticky-l' : sticky === 'r' ? 'th-sticky-r' : ''}
      data-pos={pos}
      onClick={sortable ? () => onSort(id) : undefined}
      style={{
        padding: '10px 14px',
        textAlign: align || 'left',
        fontSize: 11, fontWeight: 600,
        color: 'var(--fg-muted)',
        letterSpacing: '0.04em', textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        cursor: sortable ? 'pointer' : 'default',
        userSelect: 'none',
        minWidth: ALL_COLUMNS.find(c => c.id === id)?.w || 100,
        borderBottom: '1px solid var(--border)',
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
        {children}
        {sortable && (
          <span style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 0.5, opacity: isSorted ? 1 : 0.3 }}>
            <Icon name="chevron_down" size={10} style={{ transform: 'rotate(180deg)', color: isSorted && dir === 'asc' ? 'var(--fg)' : 'inherit' }}/>
            <Icon name="chevron_down" size={10} style={{ color: isSorted && dir === 'desc' ? 'var(--fg)' : 'inherit', marginTop: -3 }}/>
          </span>
        )}
      </span>
    </th>
  );
}

function SkeletonRow({ visible }) {
  return (
    <tr>
      <td style={{ padding: '12px 14px' }}><div className="skeleton" style={{ width: 16, height: 16 }}/></td>
      {visible.map((v, i) => (
        <td key={i} style={{ padding: '12px 14px' }}>
          <div className="skeleton" style={{ height: 14, width: `${50 + Math.random() * 40}%` }}/>
        </td>
      ))}
      <td style={{ padding: '12px 14px' }}><div className="skeleton" style={{ width: 20, height: 20, borderRadius: 999 }}/></td>
    </tr>
  );
}

/* ─── MOBILE CARD LIST ───────────────────────────── */
function MobileCardList({ products, selected, setSelected }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {products.map(p => (
        <div key={p.id} style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-lg)',
          padding: 14,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span className="font-mono" style={{ fontSize: 10, color: 'var(--fg-muted)', padding: '1px 5px', background: 'var(--bg-muted)', borderRadius: 3 }}>{p.id}</span>
                <StatusBadge status={p.status}/>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 2 }}>{p.brand} · {p.cat}</div>
            </div>
            <button className="btn-icon sm"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 12, paddingTop: 12, borderTop: '1px dashed var(--border)' }}>
            <div>
              <div style={{ fontSize: 10, color: 'var(--fg-soft)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>${p.price}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--fg-soft)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Stock</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: p.stock === 0 ? 'var(--brand-rose)' : p.stock < 20 ? 'var(--brand-amber)' : 'var(--fg)' }}>{p.stock}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--fg-soft)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sold</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{p.sold.toLocaleString()}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── PAGINATION ──────────────────────────────── */
function AdminPagination({ total, page, pageSize, onPage, onPageSize }) {
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  function pages() {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 3) return [1, 2, 3, 4, '…', totalPages];
    if (page >= totalPages - 2) return [1, '…', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '…', page - 1, page, page + 1, '…', totalPages];
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, padding: '20px 0' }}>
      <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>
        Showing <strong style={{ color: 'var(--fg)' }}>{start}–{end}</strong> of <strong style={{ color: 'var(--fg)' }}>{total}</strong> products
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
          <span style={{ color: 'var(--fg-muted)' }}>Rows per page</span>
          <select value={pageSize} onChange={e => onPageSize(+e.target.value)} style={{ height: 28, padding: '0 8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', fontSize: 12 }}>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button className="btn-icon sm" style={{ background: 'var(--bg-muted)' }} disabled={page === 1} onClick={() => onPage(page - 1)}>
            <Icon name="chevron_left" size={14}/>
          </button>
          {pages().map((n, i) => (
            <button key={i} disabled={n === '…'} onClick={() => typeof n === 'number' && onPage(n)} style={{
              minWidth: 28, height: 28, padding: '0 6px',
              borderRadius: 'var(--r-sm)',
              fontSize: 12, fontWeight: 500,
              fontVariantNumeric: 'tabular-nums',
              background: n === page ? 'var(--fg)' : 'transparent',
              color: n === page ? 'var(--bg)' : 'var(--fg)',
            }}>{n}</button>
          ))}
          <button className="btn-icon sm" style={{ background: 'var(--bg-muted)' }} disabled={page === totalPages} onClick={() => onPage(page + 1)}>
            <Icon name="chevron_right" size={14}/>
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
          <span style={{ color: 'var(--fg-muted)' }}>Jump to</span>
          <input type="number" min="1" max={totalPages} defaultValue={page} onBlur={e => { const v = +e.target.value; if (v >= 1 && v <= totalPages) onPage(v); }} style={{ width: 48, height: 28, padding: '0 8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', fontSize: 12, textAlign: 'center' }}/>
        </div>
      </div>
    </div>
  );
}

window.ALL_COLUMNS = ALL_COLUMNS;
window.ADMIN_PRODUCTS = ADMIN_PRODUCTS;
window.STATUSES = STATUSES;
window.StatusBadge = StatusBadge;
window.ActionBar = ActionBar;
window.FilterDrawer = FilterDrawer;
window.ColumnsPopover = ColumnsPopover;
window.ProductTable = ProductTable;
window.MobileCardList = MobileCardList;
window.AdminPagination = AdminPagination;
