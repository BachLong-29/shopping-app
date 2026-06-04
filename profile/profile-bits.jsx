/* global React, Icon */
// Shared profile primitives — reveal, counters, rings, cards

const { useRef: useRefB, useEffect: useEffectB, useState: useStateB } = React;

// ── useInView ────────────────────────────────────────────
function useInView(opts = {}) {
  const ref = useRefB(null);
  const [inView, setInView] = useStateB(false);
  useEffectB(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); ob.disconnect(); }
    }, { threshold: opts.threshold ?? 0.15, rootMargin: opts.rootMargin ?? '0px 0px -8% 0px', root: opts.root ?? null });
    ob.observe(el);
    return () => ob.disconnect();
  }, [opts.root]);
  return [ref, inView];
}

// ── Reveal — fades/slides children up on scroll ─────────
function Reveal({ children, delay = 0, className = '', as = 'div', cls = 'r-up', style = {}, root }) {
  const [ref, inView] = useInView({ root });
  const Tag = as;
  return (
    <Tag ref={ref} className={`${cls} ${inView ? 'in' : ''} ${className}`}
         style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </Tag>
  );
}

// ── Counter — animates a number when it enters view ─────
function Counter({ value, duration = 1400, prefix = '', suffix = '', decimals = 0, format = true, root }) {
  const [ref, inView] = useInView({ root });
  const [n, setN] = useStateB(0);
  useEffectB(() => {
    if (!inView) return;
    let raf; const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);
  const shown = decimals > 0 ? n.toFixed(decimals) : Math.round(n);
  const out = format ? Number(shown).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : shown;
  return <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>{prefix}{out}{suffix}</span>;
}

// ── ProgressRing — animated SVG ring ────────────────────
function ProgressRing({ value = 75, size = 120, stroke = 10, gradId = 'ringg', colors = ['#7c3aed', '#ec4899', '#f59e0b'], label, cap, trackColor = 'var(--bg-muted)', children, root }) {
  const [ref, inView] = useInView({ root });
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = inView ? circ * (1 - value / 100) : circ;
  const uid = useRefB('rg-' + Math.random().toString(36).slice(2, 8)).current;
  return (
    <div className="ring-wrap" ref={ref} style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id={uid} x1="0" y1="0" x2="1" y2="1">
            {colors.map((c, i) => <stop key={i} offset={`${(i / (colors.length - 1)) * 100}%`} stopColor={c} />)}
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={`url(#${uid})`} strokeWidth={stroke}
                strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 1.3s cubic-bezier(0.16,1,0.3,1)' }} />
      </svg>
      <div className="ring-label">
        {children || (
          <>
            <span className="ring-num"><Counter value={value} suffix="%" format={false} /></span>
            {cap && <span className="ring-cap">{cap}</span>}
          </>
        )}
      </div>
    </div>
  );
}

// ── Card with mouse-tracking glow ───────────────────────
function GlowCard({ className = '', children, style = {}, glow = true, ...rest }) {
  const ref = useRefB(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={glow ? onMove : undefined}
         className={`p-card hover ${className}`} style={style} {...rest}>
      {glow && <div className="p-card-glow" />}
      {children}
    </div>
  );
}

// ── Card header with gradient icon ──────────────────────
function CardHead({ icon, tint = 'var(--grad-aurora)', title, action }) {
  return (
    <div className="p-card-head">
      <div className="p-card-title">
        <span className="p-card-ic" style={{ background: tint }}><Icon name={icon} size={16} /></span>
        {title}
      </div>
      {action}
    </div>
  );
}

// ── Info row ────────────────────────────────────────────
function InfoRow({ icon, label, value, mono }) {
  return (
    <div className="info-row">
      <span className="info-ic"><Icon name={icon} size={15} /></span>
      <div style={{ minWidth: 0 }}>
        <div className="l">{label}</div>
        <div className="v" style={{ fontFamily: mono ? 'var(--font-mono)' : 'inherit', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</div>
      </div>
    </div>
  );
}

// ── Section heading ─────────────────────────────────────
function SecHead({ kicker, title, desc, action }) {
  return (
    <div className="sec-head">
      <div>
        {kicker && <div className="eyebrow" style={{ marginBottom: 8 }}>{kicker}</div>}
        <h2>{title}</h2>
        {desc && <p>{desc}</p>}
      </div>
      {action}
    </div>
  );
}

// ── Brand glyph for social cards (text marks, no logos) ──
const GLYPHS = {
  in: 'in', gh: '{ }', x: '𝕏', ig: '◎', fb: 'f',
};
function SocialGlyph({ ic, tint }) {
  if (ic === 'globe') {
    return <span className="sc-ic" style={{ background: tint }}><Icon name="globe" size={18} /></span>;
  }
  return <span className="sc-ic" style={{ background: tint, fontFamily: ic === 'gh' ? 'var(--font-mono)' : 'inherit' }}>{GLYPHS[ic] || '·'}</span>;
}

// ── Mini sparkline bars ─────────────────────────────────
function Spark({ data, color = 'var(--brand-violet)', root }) {
  const [ref, inView] = useInView({ root });
  const max = Math.max(...data);
  return (
    <div className="mt-spark" ref={ref}>
      {data.map((d, i) => (
        <i key={i} style={{
          height: inView ? `${(d / max) * 100}%` : '8%',
          background: i === data.length - 1 ? color : undefined,
          opacity: i === data.length - 1 ? 1 : undefined,
          transition: `height 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 40}ms`,
        }} />
      ))}
    </div>
  );
}

Object.assign(window, {
  useInView, Reveal, Counter, ProgressRing, GlowCard, CardHead, InfoRow, SecHead, SocialGlyph, Spark,
});
