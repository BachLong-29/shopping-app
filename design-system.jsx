/* global React, ReactDOM, Icon, Stars, HaloLogo */
// Halo Design System — single-page documentation

const { useState, useEffect, useRef } = React;

/* ─── HELPERS ─────────────────────────────────────── */
function Section({ id, eyebrow, title, sub, children }) {
  return (
    <section id={id} style={{ padding: '64px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 8 }}>{eyebrow}</div>
        <h2 className="font-display" style={{ fontSize: 48, lineHeight: 1, fontWeight: 400 }}>{title}</h2>
        {sub && <p style={{ fontSize: 15, color: 'var(--fg-muted)', marginTop: 12, maxWidth: 720, lineHeight: 1.5 }}>{sub}</p>}
      </div>
      {children}
    </section>
  );
}

function Subhead({ children, tag }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, margin: '32px 0 16px', paddingBottom: 8, borderBottom: '1px solid var(--border)' }}>
      <h3 style={{ fontSize: 18, fontWeight: 600 }}>{children}</h3>
      {tag && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-soft)' }}>{tag}</span>}
    </div>
  );
}

function Demo({ children, label, bg }) {
  return (
    <div style={{ marginBottom: 12 }}>
      {label && <div style={{ fontSize: 11, color: 'var(--fg-soft)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>{label}</div>}
      <div style={{
        padding: 24,
        background: bg || 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16,
      }}>
        {children}
      </div>
    </div>
  );
}

/* ─── COLOR ───────────────────────────────────────── */
function ColorScale({ name, colors }) {
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{name}</div>
      <div style={{ display: 'flex', gap: 4 }}>
        {colors.map(c => (
          <div key={c.shade} style={{ flex: 1 }}>
            <div style={{ height: 56, background: c.hex, borderRadius: 'var(--r-sm)' }}/>
            <div style={{ fontSize: 10, color: 'var(--fg-muted)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>{c.shade}</div>
            <div style={{ fontSize: 9, color: 'var(--fg-soft)', fontFamily: 'var(--font-mono)' }}>{c.hex}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const SCALES = {
  violet: [['50','#F5F3FF'],['100','#EDE9FE'],['200','#DDD6FE'],['300','#C4B5FD'],['400','#A78BFA'],['500','#8B5CF6'],['600','#7C3AED'],['700','#6D28D9'],['800','#5B21B6'],['900','#4C1D95']],
  pink: [['50','#FDF2F8'],['100','#FCE7F3'],['200','#FBCFE8'],['300','#F9A8D4'],['400','#F472B6'],['500','#EC4899'],['600','#DB2777'],['700','#BE185D'],['800','#9D174D'],['900','#831843']],
  amber: [['50','#FFFBEB'],['100','#FEF3C7'],['200','#FDE68A'],['300','#FCD34D'],['400','#FBBF24'],['500','#F59E0B'],['600','#D97706'],['700','#B45309'],['800','#92400E'],['900','#78350F']],
  neutral: [['50','#FAFAF7'],['100','#F2EFE8'],['200','#E5E1D6'],['300','#C4BFB1'],['400','#8A8295'],['500','#5B5468'],['600','#403B4D'],['700','#2A2538'],['800','#1A1626'],['900','#0F0A1A']],
};

function ColorsBlock() {
  return (
    <div>
      <Subhead tag="Gradient palette">Aurora gradient family</Subhead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
        {[
          ['Aurora', 'var(--grad-aurora)'],
          ['Violet', 'var(--grad-violet)'],
          ['Sunset', 'var(--grad-sunset)'],
          ['Ocean', 'var(--grad-ocean)'],
          ['Lime', 'var(--grad-lime)'],
        ].map(([n, g]) => (
          <div key={n}>
            <div style={{ height: 96, background: g, borderRadius: 'var(--r-md)' }}/>
            <div style={{ fontSize: 12, fontWeight: 600, marginTop: 8 }}>{n}</div>
            <div style={{ fontSize: 10, color: 'var(--fg-soft)', fontFamily: 'var(--font-mono)' }}>--grad-{n.toLowerCase()}</div>
          </div>
        ))}
      </div>

      <Subhead tag="Scales · 50–900">Solid color tokens</Subhead>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {Object.entries(SCALES).map(([name, list]) => (
          <ColorScale key={name} name={name} colors={list.map(([shade, hex]) => ({ shade, hex }))}/>
        ))}
      </div>

      <Subhead tag="Semantic">Status colors</Subhead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { name: 'Success', bg: 'var(--success-bg)', fg: 'var(--success-fg)' },
          { name: 'Warning', bg: 'var(--warning-bg)', fg: 'var(--warning-fg)' },
          { name: 'Error', bg: 'var(--error-bg)', fg: 'var(--error-fg)' },
          { name: 'Info', bg: 'var(--info-bg)', fg: 'var(--info-fg)' },
        ].map(s => (
          <div key={s.name} style={{ padding: 16, background: s.bg, color: s.fg, borderRadius: 'var(--r-md)', fontSize: 13, fontWeight: 500 }}>
            {s.name}
            <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4, fontFamily: 'var(--font-mono)' }}>--{s.name.toLowerCase()}-bg / -fg</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── TYPOGRAPHY ──────────────────────────────────── */
function TypographyBlock() {
  const samples = [
    { tag: 'Display · 80px / Instrument Serif', cls: 'font-display', size: 80, lh: 0.95, weight: 400, text: 'Quietly engineered.' },
    { tag: 'Display · 60px / Instrument Serif', cls: 'font-display', size: 60, lh: 1, weight: 400, text: 'Considered things.' },
    { tag: 'Heading 1 · 44px / Plus Jakarta Sans 600', size: 44, weight: 600, lh: 1.05, text: 'Hand-picked, never algorithmic.' },
    { tag: 'Heading 2 · 32px / 600', size: 32, weight: 600, lh: 1.15, text: 'Six worlds, one studio.' },
    { tag: 'Heading 3 · 24px / 600', size: 24, weight: 600, lh: 1.25, text: 'What 38,219 people actually bought.' },
    { tag: 'Body Large · 17px / 400', size: 17, weight: 400, lh: 1.6, text: 'A curated edit of 32 pieces from independent makers across 12 countries. Limited runs, real materials, lifetime repair.' },
    { tag: 'Body · 14px / 400', size: 14, weight: 400, lh: 1.5, text: 'Independent since 2019, employee-owned since 2024. Every category is editorial-led.' },
    { tag: 'Caption · 12px / 500', size: 12, weight: 500, lh: 1.4, text: 'No third-party tracking · Unsubscribe anytime · 1% to maker workshops' },
    { tag: 'Mono · 12px / JetBrains Mono', cls: 'font-mono', size: 12, weight: 500, lh: 1.5, text: 'HALO-2026-VOLTA-II / EDITION 240 / STUDIO N. LONDON' },
  ];
  return (
    <div>
      <Subhead tag="Type pairing">Instrument Serif · Plus Jakarta Sans · JetBrains Mono</Subhead>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {samples.map((s, i) => (
          <div key={i} style={{ borderTop: '1px dashed var(--border)', paddingTop: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--fg-soft)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>{s.tag}</div>
            <div className={s.cls || ''} style={{ fontSize: s.size, fontWeight: s.weight, lineHeight: s.lh, letterSpacing: s.size > 30 ? '-0.02em' : '-0.005em' }}>
              {s.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SPACING + RADII + SHADOWS ────────────────────── */
function SpacingBlock() {
  const space = [['s-1','4'],['s-2','8'],['s-3','12'],['s-4','16'],['s-5','20'],['s-6','24'],['s-7','32'],['s-8','40'],['s-9','56'],['s-10','72']];
  const radius = [['xs','4'],['sm','6'],['md','10'],['lg','14'],['xl','20'],['2xl','28'],['full','999']];
  return (
    <div>
      <Subhead tag="4px base · linear">Spacing scale</Subhead>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {space.map(([t, v]) => (
          <div key={t} style={{ display: 'grid', gridTemplateColumns: '80px 60px 1fr', gap: 16, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-muted)' }}>--{t}</span>
            <span style={{ fontSize: 13, fontWeight: 500 }}>{v}px</span>
            <div style={{ height: 10, width: `${v}px`, background: 'var(--grad-aurora)', borderRadius: 2 }}/>
          </div>
        ))}
      </div>

      <Subhead tag="Soft to round">Radius</Subhead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12 }}>
        {radius.map(([t, v]) => (
          <div key={t} style={{ textAlign: 'center' }}>
            <div style={{ width: '100%', aspectRatio: 1, background: 'var(--bg-muted)', border: '1px solid var(--border)', borderRadius: `${v}px` }}/>
            <div style={{ fontSize: 11, fontWeight: 600, marginTop: 8 }}>{t}</div>
            <div style={{ fontSize: 10, color: 'var(--fg-soft)', fontFamily: 'var(--font-mono)' }}>{v === '999' ? '∞' : v + 'px'}</div>
          </div>
        ))}
      </div>

      <Subhead tag="4 elevations">Shadows</Subhead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {['sm','md','lg','xl'].map(s => (
          <div key={s} style={{ padding: 32, background: 'var(--surface)', borderRadius: 'var(--r-lg)', boxShadow: `var(--shadow-${s})`, textAlign: 'center' }}>
            <div style={{ fontSize: 12, fontWeight: 600 }}>shadow/{s}</div>
            <div style={{ fontSize: 11, color: 'var(--fg-soft)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>--shadow-{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── BUTTONS ─────────────────────────────────────── */
function ButtonsBlock() {
  return (
    <div>
      <Subhead tag="9 variants · 4 sizes · 8 states">Buttons</Subhead>
      <Demo label="Variants">
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-outline">Outline</button>
        <button className="btn btn-ghost">Ghost</button>
        <button className="btn btn-gradient">Gradient<Icon name="sparkles" size={14}/></button>
        <button className="btn btn-destructive">Destructive</button>
      </Demo>
      <Demo label="Sizes">
        <button className="btn btn-primary btn-sm">Small</button>
        <button className="btn btn-primary">Default</button>
        <button className="btn btn-primary btn-lg">Large</button>
        <button className="btn btn-primary btn-xl">Extra large</button>
      </Demo>
      <Demo label="With icon">
        <button className="btn btn-primary"><Icon name="plus" size={14}/> New product</button>
        <button className="btn btn-outline">Continue <Icon name="arrow_right" size={14}/></button>
        <button className="btn btn-secondary"><Icon name="upload" size={14}/> Upload</button>
        <button className="btn btn-gradient">Checkout <Icon name="arrow_right" size={14}/></button>
      </Demo>
      <Demo label="States">
        <button className="btn btn-primary">Default</button>
        <button className="btn btn-primary" style={{ transform: 'translateY(-1px)', boxShadow: 'var(--shadow-md)' }}>Hover</button>
        <button className="btn btn-primary btn-loading">Loading</button>
        <button className="btn btn-primary" disabled>Disabled</button>
      </Demo>
      <Demo label="Icon button">
        <button className="btn-icon sm" style={{ background: 'var(--bg-muted)' }}><Icon name="heart" size={14}/></button>
        <button className="btn-icon" style={{ background: 'var(--bg-muted)' }}><Icon name="heart" size={16}/></button>
        <button className="btn-icon lg" style={{ background: 'var(--bg-muted)' }}><Icon name="heart" size={18}/></button>
        <button className="btn-icon" style={{ background: 'var(--grad-aurora)', color: 'white' }}><Icon name="plus" size={16}/></button>
        <button className="btn-icon" style={{ background: 'var(--fg)', color: 'var(--bg)' }}><Icon name="send" size={16}/></button>
      </Demo>
      <Demo label="FAB">
        <span className="fab" style={{ position: 'static' }}><Icon name="plus" size={22}/></span>
        <span className="fab" style={{ position: 'static', background: 'var(--fg)', color: 'var(--bg)', boxShadow: 'var(--shadow-lg)' }}><Icon name="shopping_bag" size={20}/></span>
        <span className="fab" style={{ position: 'static', background: 'var(--brand-rose)' }}><Icon name="heart" size={20}/></span>
      </Demo>
    </div>
  );
}

/* ─── INPUTS ──────────────────────────────────────── */
function InputsBlock() {
  const [val, setVal] = useState('');
  const [pwd, setPwd] = useState('hunter2');
  const [showPwd, setShowPwd] = useState(false);
  return (
    <div>
      <Subhead tag="Text · password · email · phone">Inputs</Subhead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
        <div className="field">
          <label className="field-label">Full name <span className="req">*</span></label>
          <input className="input" value={val} onChange={e => setVal(e.target.value)} placeholder="Asha Patel"/>
        </div>
        <div className="field">
          <label className="field-label">Email</label>
          <div className="input-wrap has-icon">
            <Icon name="mail" size={16} className="input-icon"/>
            <input className="input" type="email" placeholder="you@studio.com"/>
          </div>
        </div>
        <div className="field">
          <label className="field-label">Password</label>
          <div className="input-wrap" style={{ position: 'relative' }}>
            <input className="input" type={showPwd ? 'text' : 'password'} value={pwd} onChange={e => setPwd(e.target.value)} style={{ paddingRight: 80 }}/>
            <button className="btn-ghost btn-sm" onClick={() => setShowPwd(s => !s)} style={{ position: 'absolute', right: 4, top: 4, padding: '6px 10px', fontSize: 12, height: 36 }}>
              <Icon name="eye" size={14}/> {showPwd ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <div className="field">
          <label className="field-label">Phone</label>
          <div className="input-wrap has-icon">
            <Icon name="phone" size={16} className="input-icon"/>
            <input className="input" placeholder="+44 (0)20 7946 0421"/>
          </div>
        </div>
        <div className="field">
          <label className="field-label">Promo code <span style={{ color: 'var(--brand-emerald)', fontSize: 11 }}>HALO20 applied</span></label>
          <input className="input success" defaultValue="HALO20"/>
          <span className="input-help success"><Icon name="check" size={11} style={{ display: 'inline', verticalAlign: '-1px' }}/> Saved $42 on this order</span>
        </div>
        <div className="field">
          <label className="field-label">Card number</label>
          <input className="input error" defaultValue="4242 4242 4242 124"/>
          <span className="input-help error"><Icon name="alert" size={11} style={{ display: 'inline', verticalAlign: '-1px' }}/> Card number is incomplete</span>
        </div>
      </div>

      <Subhead tag="With suggestions">Search input</Subhead>
      <div className="search-input" style={{ maxWidth: 480 }}>
        <Icon name="search" size={16}/>
        <input placeholder="Search 2,318 products…" defaultValue="linen throw"/>
        <span style={{ fontSize: 11, color: 'var(--fg-soft)' }}>32 results</span>
        <span className="kbd">⌘K</span>
      </div>
      <div style={{ marginTop: 8, maxWidth: 480 }}>
        <div className="menu" style={{ width: '100%' }}>
          <div className="menu-label">Suggested</div>
          {['Field linen throw', 'Hara cashmere throw', 'Linen pillow set'].map(s => (
            <div key={s} className="menu-item">
              <Icon name="search" size={14} className="menu-icon"/>
              <span style={{ flex: 1 }}>{s}</span>
              <Icon name="arrow_up_right" size={12} className="menu-icon"/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── SELECTION CONTROLS ──────────────────────────── */
function SelectionBlock() {
  const [check, setCheck] = useState({ a: true, b: false, c: true });
  const [radio, setRadio] = useState('std');
  const [sw, setSw] = useState({ a: true, b: false, c: true });
  return (
    <div>
      <Subhead tag="Checkbox · radio · switch">Selection</Subhead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        <Demo label="Checkboxes">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            {Object.keys(check).map(k => (
              <label key={k} className="check">
                <input type="checkbox" checked={check[k]} onChange={() => setCheck(c => ({ ...c, [k]: !c[k] }))}/>
                <span className="check-box"><Icon name="check" size={11} strokeWidth={3}/></span>
                <span style={{ fontSize: 13 }}>Option {k.toUpperCase()}</span>
              </label>
            ))}
            <label className="check" style={{ opacity: 0.5 }}>
              <input type="checkbox" disabled/>
              <span className="check-box"/>
              <span style={{ fontSize: 13 }}>Disabled</span>
            </label>
          </div>
        </Demo>

        <Demo label="Radio">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            {[['std','Standard · 3–5 days'], ['exp','Express · next day'], ['pick','Pick up in store']].map(([k, l]) => (
              <label key={k} className="check radio">
                <input type="radio" name="ship" checked={radio === k} onChange={() => setRadio(k)}/>
                <span className="check-box"/>
                <span style={{ fontSize: 13 }}>{l}</span>
              </label>
            ))}
          </div>
        </Demo>

        <Demo label="Switch">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start', width: '100%' }}>
            {Object.entries(sw).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span style={{ fontSize: 13 }}>{k === 'a' ? 'Marketing email' : k === 'b' ? 'SMS updates' : 'Push notifications'}</span>
                <span className={`switch ${v ? 'on' : ''}`} onClick={() => setSw(s => ({ ...s, [k]: !s[k] }))}/>
              </div>
            ))}
          </div>
        </Demo>
      </div>
    </div>
  );
}

/* ─── BADGES ──────────────────────────────────────── */
function BadgesBlock() {
  return (
    <div>
      <Subhead>Badges</Subhead>
      <Demo>
        <span className="badge badge-sale">−20% SALE</span>
        <span className="badge badge-hot">🔥 HOT</span>
        <span className="badge badge-new">NEW</span>
        <span className="badge badge-limited">LIMITED</span>
        <span className="badge badge-soldout">SOLD OUT</span>
        <span className="badge badge-gradient">EXCLUSIVE</span>
        <span className="badge badge-soft">Free shipping</span>
        <span className="badge badge-outline">Pre-order</span>
        <span className="badge badge-soft" style={{ background: 'var(--success-bg)', color: 'var(--success-fg)' }}><span className="dot live" style={{ width: 5, height: 5 }}/> In stock</span>
      </Demo>
    </div>
  );
}

/* ─── TABS / ACCORDION / TOOLTIPS ─────────────────── */
function NavComponentsBlock() {
  const [tab, setTab] = useState('over');
  const [accOpen, setAccOpen] = useState(0);
  const items = [
    { title: 'Materials & care', body: '100% European linen, pre-washed for softness. Wash cold, line dry. Will soften with every wash for 10+ years.' },
    { title: 'Shipping & returns', body: 'Free shipping over $80. 60-day no-questions returns. Carbon-neutral delivery via our courier partner.' },
    { title: 'Maker & origin', body: 'Made by Field Lab in their family-owned workshop outside Porto, Portugal. Established 2012, 14 staff.' },
  ];
  return (
    <div>
      <Subhead>Tabs</Subhead>
      <Demo label="Pill tabs">
        <div className="tabs">
          {['Overview', 'Details', 'Reviews', 'Shipping'].map(t => (
            <button key={t} className={`tab ${tab === t.toLowerCase().slice(0,4) ? 'active' : ''}`} onClick={() => setTab(t.toLowerCase().slice(0,4))}>{t}</button>
          ))}
        </div>
      </Demo>
      <Demo label="Underline tabs">
        <div className="tabs-underline" style={{ width: '100%' }}>
          {['Overview', 'Details', 'Reviews · 412', 'Shipping'].map((t, i) => (
            <button key={t} className={`tab ${i === 0 ? 'active' : ''}`}>{t}</button>
          ))}
        </div>
      </Demo>

      <Subhead>Accordion</Subhead>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
        {items.map((item, i) => (
          <div key={i} style={{ borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
            <button onClick={() => setAccOpen(o => o === i ? -1 : i)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '16px 20px', fontSize: 14, fontWeight: 500 }}>
              {item.title}
              <Icon name="plus" size={16} style={{ transform: accOpen === i ? 'rotate(45deg)' : '', transition: 'transform 0.2s var(--ease-spring)' }}/>
            </button>
            {accOpen === i && (
              <div style={{ padding: '0 20px 20px', fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.5 }}>{item.body}</div>
            )}
          </div>
        ))}
      </div>

      <Subhead>Tooltips</Subhead>
      <Demo>
        <span className="tt-wrap">
          <button className="btn btn-secondary">Hover me</button>
          <span className="tt" style={{ opacity: 1, transform: 'translateX(-50%) translateY(-4px)' }}>Helpful hint</span>
        </span>
        <span className="tt-wrap"><button className="btn-icon" style={{ background: 'var(--bg-muted)' }}><Icon name="info" size={14}/></button><span className="tt">More info</span></span>
        <span className="tt-wrap"><button className="btn-icon" style={{ background: 'var(--bg-muted)' }}><Icon name="heart" size={14}/></button><span className="tt">Save for later</span></span>
      </Demo>
    </div>
  );
}

/* ─── PROGRESS / SKELETON / LOADING ──────────────── */
function FeedbackBlock() {
  return (
    <div>
      <Subhead>Progress</Subhead>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
        <div className="progress"><div className="progress-bar" style={{ width: '35%' }}/></div>
        <div className="progress"><div className="progress-bar shine" style={{ width: '72%' }}/></div>
        <div className="progress"><div className="progress-bar" style={{ width: '100%', background: 'var(--brand-emerald)' }}/></div>
      </div>

      <Subhead>Skeleton</Subhead>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ width: 240, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: 16 }}>
          <div className="skeleton" style={{ aspectRatio: '4/5', borderRadius: 'var(--r-md)' }}/>
          <div className="skeleton" style={{ height: 12, marginTop: 12, width: '40%' }}/>
          <div className="skeleton" style={{ height: 18, marginTop: 8, width: '80%' }}/>
          <div className="skeleton" style={{ height: 14, marginTop: 8, width: '50%' }}/>
        </div>
        <div style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div className="skeleton" style={{ width: 48, height: 48, borderRadius: '50%' }}/>
            <div style={{ flex: 1 }}>
              <div className="skeleton" style={{ height: 14, width: '30%' }}/>
              <div className="skeleton" style={{ height: 10, width: '50%', marginTop: 6 }}/>
            </div>
          </div>
          <div className="skeleton" style={{ height: 14, width: '100%' }}/>
          <div className="skeleton" style={{ height: 14, width: '80%' }}/>
          <div className="skeleton" style={{ height: 14, width: '60%' }}/>
        </div>
      </div>

      <Subhead>Loading</Subhead>
      <Demo>
        <div style={{ width: 24, height: 24, border: '3px solid var(--border-strong)', borderTopColor: 'var(--fg)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }}/>
        <div style={{ display: 'flex', gap: 4 }}>
          {[0,1,2].map(i => <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--fg)', animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite both` }}/>)}
        </div>
        <div style={{ width: 60, height: 60, position: 'relative' }}>
          <svg width="60" height="60" viewBox="0 0 60 60">
            <defs><linearGradient id="loader-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#ec4899"/></linearGradient></defs>
            <circle cx="30" cy="30" r="24" fill="none" stroke="var(--bg-muted)" strokeWidth="4"/>
            <circle cx="30" cy="30" r="24" fill="none" stroke="url(#loader-grad)" strokeWidth="4" strokeLinecap="round" strokeDasharray="150" strokeDashoffset="50" style={{ animation: 'spin 1s linear infinite', transformOrigin: 'center' }}/>
          </svg>
        </div>
        <style>{`@keyframes bounce { 0%, 80%, 100% { transform: scale(0.5); } 40% { transform: scale(1); } }`}</style>
      </Demo>

      <Subhead>Toasts</Subhead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        <div className="toast success"><div className="toast-icon"><Icon name="check" size={16}/></div><div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600 }}>Added to bag</div><div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>Volta Series II · $289</div></div></div>
        <div className="toast info"><div className="toast-icon"><Icon name="info" size={16}/></div><div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600 }}>Saved for later</div><div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>Check your wishlist</div></div></div>
        <div className="toast warning"><div className="toast-icon"><Icon name="alert" size={16}/></div><div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600 }}>Low stock</div><div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>Only 2 left at this price</div></div></div>
        <div className="toast error"><div className="toast-icon"><Icon name="alert" size={16}/></div><div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600 }}>Payment declined</div><div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>Card 4242 · try a different method</div></div></div>
      </div>

      <Subhead>Empty state</Subhead>
      <div className="empty card" style={{ padding: '48px 24px' }}>
        <div className="empty-art"><Icon name="package" size={32}/></div>
        <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--fg)', marginBottom: 4 }}>No orders yet</div>
        <div style={{ fontSize: 13, maxWidth: 320, margin: '0 auto' }}>When you place your first order, it'll appear here. Use code <strong>FIRST10</strong> for 10% off.</div>
        <button className="btn btn-primary" style={{ marginTop: 24 }}>Start shopping</button>
      </div>
    </div>
  );
}

/* ─── CARDS ───────────────────────────────────────── */
function CardsBlock() {
  const product = window.HALO.PRODUCTS[3];
  return (
    <div>
      <Subhead>Cards</Subhead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {/* Info card */}
        <div className="card card-pad" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ width: 36, height: 36, borderRadius: 'var(--r-md)', background: 'var(--bg-muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="truck" size={18}/></span>
          <h4 style={{ fontSize: 17, fontWeight: 600 }}>Free shipping over $80</h4>
          <p style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.5 }}>Carbon-neutral courier in 3–5 working days. Express and same-day available on most products.</p>
          <a style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)', display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 4 }}>Read policy <Icon name="arrow_right" size={12}/></a>
        </div>

        {/* Stat card */}
        <div className="card card-pad" style={{ background: 'linear-gradient(135deg, #1a0b2e 0%, #2d0a4e 100%)', color: 'white', position: 'relative', overflow: 'hidden' }}>
          <div className="orb" style={{ width: 180, height: 180, background: '#ec4899', top: -40, right: -40, opacity: 0.5 }}/>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Orders this month</div>
            <div className="font-display" style={{ fontSize: 56, lineHeight: 1, marginTop: 8 }}>1,284</div>
            <div style={{ fontSize: 13, marginTop: 8, color: '#6ee7b7' }}>↗ +18% vs last month</div>
            <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', marginTop: 20, height: 36 }}>
              {[30, 40, 35, 50, 48, 55, 70, 64, 78, 72, 88, 92].map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, background: 'rgba(255,255,255,0.4)', borderRadius: 2 }}/>)}
            </div>
          </div>
        </div>

        {/* Product preview card */}
        <div className="product-card">
          <div className="pc-media" style={{ aspectRatio: '4/3' }}>
            <img src={product.image} alt={product.name}/>
            <div className="pc-badges"><span className="badge badge-sale">-20%</span></div>
          </div>
          <div className="pc-body">
            <div className="pc-brand">{product.brand}</div>
            <div className="pc-title">{product.name}</div>
            <div className="pc-meta"><Stars value={product.rating}/><span style={{ fontSize: 12 }}>{product.rating}</span></div>
            <div className="pc-price-row"><span className="pc-price">${product.price}</span><span className="pc-price-orig">${product.orig}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── TABLE ───────────────────────────────────────── */
function TableBlock() {
  const orders = [
    { id: 'HL-29841', date: '24 May 2026', items: 3, total: '$412.00', status: 'Shipped', tint: 'var(--info-fg)', bg: 'var(--info-bg)' },
    { id: 'HL-29822', date: '18 May 2026', items: 1, total: '$89.00', status: 'Delivered', tint: 'var(--success-fg)', bg: 'var(--success-bg)' },
    { id: 'HL-29801', date: '02 May 2026', items: 2, total: '$268.00', status: 'Returned', tint: 'var(--fg-muted)', bg: 'var(--bg-muted)' },
    { id: 'HL-29778', date: '21 Apr 2026', items: 4, total: '$634.00', status: 'Delivered', tint: 'var(--success-fg)', bg: 'var(--success-bg)' },
  ];
  return (
    <div>
      <Subhead>Data table</Subhead>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottom: '1px solid var(--border)' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Recent orders</div>
            <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>Showing 4 of 28</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-outline btn-sm"><Icon name="filter" size={12}/> Filter</button>
            <button className="btn btn-outline btn-sm"><Icon name="upload" size={12}/> Export</button>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Order', 'Date ↓', 'Items', 'Total', 'Status', ''].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 11, fontWeight: 600, color: 'var(--fg-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '14px 16px', fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{o.id}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--fg-muted)' }}>{o.date}</td>
                <td style={{ padding: '14px 16px', fontSize: 13 }}>{o.items}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 600 }}>{o.total}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ padding: '4px 10px', borderRadius: 999, background: o.bg, color: o.tint, fontSize: 11, fontWeight: 600 }}>{o.status}</span>
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                  <button className="btn-icon sm"><Icon name="chevron_right" size={14}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── DROPDOWN / MENU / MODAL ─────────────────────── */
function OverlayComponentsBlock() {
  const [modal, setModal] = useState(false);
  return (
    <div>
      <Subhead>Dropdown menu</Subhead>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, alignItems: 'flex-start' }}>
        <div className="menu" style={{ width: 240 }}>
          <div className="menu-label">Account</div>
          <div className="menu-item"><Icon name="user" size={16} className="menu-icon"/>Profile</div>
          <div className="menu-item"><Icon name="package" size={16} className="menu-icon"/>Orders<span className="badge badge-soft" style={{ marginLeft: 'auto', height: 18, fontSize: 10 }}>2</span></div>
          <div className="menu-item"><Icon name="heart" size={16} className="menu-icon"/>Wishlist</div>
          <div className="menu-sep"/>
          <div className="menu-label">Settings</div>
          <div className="menu-item"><Icon name="globe" size={16} className="menu-icon"/>Country · UK</div>
          <div className="menu-item"><Icon name="moon" size={16} className="menu-icon"/>Dark mode</div>
          <div className="menu-sep"/>
          <div className="menu-item danger"><Icon name="arrow_right" size={16} className="menu-icon"/>Sign out</div>
        </div>

        <div>
          <button className="btn btn-primary" onClick={() => setModal(true)}>Open modal</button>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal-panel" onClick={e => e.stopPropagation()}>
            <div style={{ padding: 24 }}>
              <div style={{ width: 48, height: 48, borderRadius: 'var(--r-full)', background: 'var(--grad-aurora)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <Icon name="sparkles" size={20}/>
              </div>
              <h3 className="font-display" style={{ fontSize: 28, fontWeight: 400, marginTop: 16 }}>Confirm your order</h3>
              <p style={{ fontSize: 14, color: 'var(--fg-muted)', marginTop: 8, lineHeight: 1.5 }}>You're about to place an order for 3 items totaling <strong style={{ color: 'var(--fg)' }}>$412.00</strong>. This action will charge your card ending in 4242.</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 24, justifyContent: 'flex-end' }}>
                <button className="btn btn-ghost" onClick={() => setModal(false)}>Cancel</button>
                <button className="btn btn-gradient" onClick={() => setModal(false)}>Confirm · Pay $412</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Subhead>Command palette</Subhead>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-xl)',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: 560,
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Icon name="search" size={18} style={{ color: 'var(--fg-soft)' }}/>
          <input placeholder="Search products, brands, ideas…" style={{ flex: 1, background: 'transparent', border: 0, outline: 'none', fontSize: 16 }} defaultValue="volta"/>
          <span className="kbd">ESC</span>
        </div>
        <div style={{ padding: 8 }}>
          <div className="menu-label">Products · 2 found</div>
          {window.HALO.PRODUCTS.slice(0, 2).map(p => (
            <div key={p.id} className="menu-item" style={{ padding: 8 }}>
              <img src={p.image} style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover' }}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{p.brand} · ${p.price}</div>
              </div>
              <Icon name="arrow_up_right" size={14}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── UPLOAD + PAGINATION + SLIDER ────────────────── */
function MiscBlock() {
  const [range, setRange] = useState([40, 240]);
  return (
    <div>
      <Subhead>Range slider</Subhead>
      <div style={{ maxWidth: 320, padding: 12, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
          <span>${range[0]}</span><span>${range[1]}</span>
        </div>
        <PriceSliderInline value={range} onChange={setRange}/>
      </div>

      <Subhead>Pagination</Subhead>
      <Demo>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
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
      </Demo>

      <Subhead>Upload</Subhead>
      <div style={{
        padding: 32, border: '2px dashed var(--border-strong)', borderRadius: 'var(--r-lg)',
        background: 'var(--bg-muted)', textAlign: 'center', cursor: 'pointer',
      }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
          <Icon name="upload" size={20}/>
        </div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>Drag & drop an image, or click to browse</div>
        <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 4 }}>PNG, JPG up to 10MB · 1200×1500 recommended</div>
      </div>

      <Subhead>Date picker</Subhead>
      <div style={{ display: 'inline-block', padding: 16, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, padding: '0 4px' }}>
          <button className="btn-icon sm"><Icon name="chevron_left" size={14}/></button>
          <div style={{ fontSize: 13, fontWeight: 600 }}>May 2026</div>
          <button className="btn-icon sm"><Icon name="chevron_right" size={14}/></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 32px)', gap: 4 }}>
          {['M','T','W','T','F','S','S'].map((d,i) => <div key={i} style={{ textAlign: 'center', fontSize: 10, color: 'var(--fg-soft)', fontWeight: 600, padding: 4 }}>{d}</div>)}
          {Array.from({ length: 35 }).map((_, i) => {
            const d = i - 3;
            const valid = d > 0 && d <= 31;
            const today = d === 26;
            const inRange = d >= 12 && d <= 19;
            return (
              <button key={i} style={{
                width: 32, height: 32, borderRadius: 999, fontSize: 12,
                background: today ? 'var(--fg)' : inRange ? 'var(--bg-muted)' : 'transparent',
                color: today ? 'var(--bg)' : valid ? 'var(--fg)' : 'var(--fg-soft)',
                fontWeight: today ? 600 : 400,
                cursor: valid ? 'pointer' : 'default',
              }}>{valid ? d : ''}</button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PriceSliderInline({ value, onChange }) {
  const [a, b] = value;
  const min = 0, max = 400;
  return (
    <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, height: 4, background: 'var(--bg-muted)', borderRadius: 999 }}/>
      <div style={{ position: 'absolute', height: 4, background: 'var(--fg)', borderRadius: 999, left: `${(a/max)*100}%`, right: `${100-(b/max)*100}%` }}/>
      <input type="range" min={min} max={max} value={a} onChange={e => onChange([Math.min(+e.target.value, b-10), b])} className="dual-thumb-ds" style={{ position: 'absolute', left: 0, right: 0, width: '100%', pointerEvents: 'none', WebkitAppearance: 'none', background: 'transparent', height: 24, margin: 0 }}/>
      <input type="range" min={min} max={max} value={b} onChange={e => onChange([a, Math.max(+e.target.value, a+10)])} className="dual-thumb-ds" style={{ position: 'absolute', left: 0, right: 0, width: '100%', pointerEvents: 'none', WebkitAppearance: 'none', background: 'transparent', height: 24, margin: 0 }}/>
      <style>{`
        .dual-thumb-ds::-webkit-slider-thumb { pointer-events: all; -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: white; border: 2px solid var(--fg); box-shadow: var(--shadow-md); cursor: grab; }
        .dual-thumb-ds::-moz-range-thumb { pointer-events: all; width: 18px; height: 18px; border-radius: 50%; background: white; border: 2px solid var(--fg); box-shadow: var(--shadow-md); cursor: grab; }
      `}</style>
    </div>
  );
}

/* ─── ROOT APP ─────────────────────────────────────── */
function DSApp() {
  const [theme, setTheme] = useState('light');
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);

  const nav = [
    ['Foundations', [
      { id: 'colors', label: 'Color' },
      { id: 'type', label: 'Typography' },
      { id: 'space', label: 'Spacing & shadow' },
    ]],
    ['Components', [
      { id: 'buttons', label: 'Buttons' },
      { id: 'inputs', label: 'Inputs' },
      { id: 'selection', label: 'Selection' },
      { id: 'badges', label: 'Badges' },
      { id: 'cards', label: 'Cards' },
      { id: 'nav', label: 'Tabs / Accordion' },
      { id: 'feedback', label: 'Feedback' },
      { id: 'overlay', label: 'Overlays' },
      { id: 'table', label: 'Tables' },
      { id: 'misc', label: 'Utilities' },
    ]],
  ];

  return (
    <>
      {/* Top bar */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64, padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <HaloLogo size={22}/>
            <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 999, background: 'var(--bg-muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Design System v3.2</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a href="index.html" className="btn btn-ghost btn-sm">← Back to shop</a>
            <div className="divider-v" style={{ height: 20 }}/>
            <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>Theme</span>
            <div className="tabs" style={{ height: 32 }}>
              <button className={`tab ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')} style={{ padding: '4px 10px' }}><Icon name="sun" size={14}/></button>
              <button className={`tab ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')} style={{ padding: '4px 10px' }}><Icon name="moon" size={14}/></button>
            </div>
          </div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
        {/* Side nav */}
        <aside style={{ position: 'sticky', top: 64, alignSelf: 'flex-start', padding: '40px 0', maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
          {nav.map(([title, items]) => (
            <div key={title} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-soft)', marginBottom: 8, padding: '0 8px' }}>{title}</div>
              <ul>
                {items.map(item => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} style={{ display: 'block', padding: '6px 8px', fontSize: 13, color: 'var(--fg-muted)', borderRadius: 'var(--r-sm)' }}
                      onMouseEnter={e => { e.target.style.background = 'var(--bg-muted)'; e.target.style.color = 'var(--fg)'; }}
                      onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--fg-muted)'; }}
                    >{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Body */}
        <main style={{ padding: '40px 0 40px 40px' }}>
          {/* Cover */}
          <div style={{ padding: '40px 0 32px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 12 }}>Halo / Design System</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(56px, 6vw, 96px)', lineHeight: 0.95, fontWeight: 400 }}>
              The system <br/><span className="gradient-text">behind the shop.</span>
            </h1>
            <p style={{ fontSize: 17, color: 'var(--fg-muted)', maxWidth: 640, marginTop: 20, lineHeight: 1.5 }}>
              Tokens, components, and patterns powering halo.studio. Built for React + TailwindCSS,
              documented for design and engineering teams.
            </p>
            <div style={{ display: 'flex', gap: 24, marginTop: 32 }}>
              {[
                ['v3.2.0', 'current version'],
                ['82', 'tokens'],
                ['25', 'components'],
                ['8', 'states each'],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display" style={{ fontSize: 36, lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 11, color: 'var(--fg-soft)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <Section id="colors" eyebrow="01 / Foundations" title="Color">
            <ColorsBlock/>
          </Section>
          <Section id="type" eyebrow="02 / Foundations" title="Typography">
            <TypographyBlock/>
          </Section>
          <Section id="space" eyebrow="03 / Foundations" title="Spacing & shadow">
            <SpacingBlock/>
          </Section>
          <Section id="buttons" eyebrow="04 / Components" title="Buttons">
            <ButtonsBlock/>
          </Section>
          <Section id="inputs" eyebrow="05 / Components" title="Inputs">
            <InputsBlock/>
          </Section>
          <Section id="selection" eyebrow="06 / Components" title="Selection">
            <SelectionBlock/>
          </Section>
          <Section id="badges" eyebrow="07 / Components" title="Badges">
            <BadgesBlock/>
          </Section>
          <Section id="cards" eyebrow="08 / Components" title="Cards">
            <CardsBlock/>
          </Section>
          <Section id="nav" eyebrow="09 / Components" title="Navigation">
            <NavComponentsBlock/>
          </Section>
          <Section id="feedback" eyebrow="10 / Components" title="Feedback">
            <FeedbackBlock/>
          </Section>
          <Section id="overlay" eyebrow="11 / Components" title="Overlays">
            <OverlayComponentsBlock/>
          </Section>
          <Section id="table" eyebrow="12 / Components" title="Tables">
            <TableBlock/>
          </Section>
          <Section id="misc" eyebrow="13 / Components" title="Utilities">
            <MiscBlock/>
          </Section>

          <div style={{ padding: '64px 0 96px', textAlign: 'center', color: 'var(--fg-soft)', fontSize: 12 }}>
            Halo Design System v3.2.0 · Last updated 26 May 2026 · <a href="index.html" style={{ textDecoration: 'underline' }}>Back to shop</a>
          </div>
        </main>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<DSApp/>);
