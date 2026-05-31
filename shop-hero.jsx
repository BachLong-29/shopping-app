/* global React, Icon, Stars */
// Hero + Categories + Features strip

const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

const SLIDES = [
  {
    eyebrow: 'AUTUMN COLLECTION 2026',
    title: ['Quiet things', 'for loud lives.'],
    sub: 'A curated edit of 32 pieces from independent makers across 12 countries. Limited runs, real materials, lifetime repair.',
    cta1: 'Shop the edit',
    cta2: 'Read the journal',
    palette: 0,
    seed: 7,
    label: 'Quiet Earth',
    stat: { value: '32', label: 'pieces' },
    stat2: { value: '12', label: 'makers' },
  },
  {
    eyebrow: 'FLASH · ENDS TONIGHT',
    title: ['Up to ', '40% off', 'sound.'],
    sub: 'The Volta Series II, Halo Mini speakers, and Aether Buds Pro — discounted only for the next 6 hours.',
    cta1: 'Shop audio sale',
    cta2: 'Set reminder',
    palette: 1,
    seed: 1,
    label: 'Volta Series II',
    stat: { value: '06:14', label: 'left' },
    stat2: { value: '−40%', label: 'top deal' },
  },
  {
    eyebrow: 'NEW · PRE-ORDER OPEN',
    title: ['Mono Smart Ring,', 'in titanium.'],
    sub: 'A 2.4g titanium wearable that tracks sleep, recovery, and tension. Ships from June 14. No subscription, ever.',
    cta1: 'Reserve yours',
    cta2: 'Watch the film',
    palette: 2,
    seed: 4,
    label: 'Mono Ring',
    stat: { value: '2.4', label: 'grams' },
    stat2: { value: '7-day', label: 'battery' },
  },
];

function Hero() {
  const [active, setActive] = useStateH(0);
  const timerRef = useRefH(null);

  useEffectH(() => {
    timerRef.current = setInterval(() => setActive(a => (a + 1) % SLIDES.length), 8000);
    return () => clearInterval(timerRef.current);
  }, []);

  const slide = SLIDES[active];

  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 24px 56px', position: 'relative' }}>
        {/* Floating orbs */}
        <div className="orb" style={{ width: 380, height: 380, background: '#7c3aed', top: -80, left: '40%' }}/>
        <div className="orb" style={{ width: 320, height: 320, background: '#ec4899', top: 100, right: '5%', animationDelay: '2s' }}/>
        <div className="orb" style={{ width: 260, height: 260, background: '#f59e0b', bottom: -40, left: '8%', animationDelay: '4s', opacity: 0.4 }}/>

        <div style={{
          position: 'relative',
          background: 'var(--surface)',
          borderRadius: 'var(--r-2xl)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          minHeight: 520,
          boxShadow: 'var(--shadow-lg)',
        }}>
          <div className="hero-grid">
            {/* Copy side */}
            <div style={{ padding: 'clamp(28px, 4vw, 56px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
              <div key={active} className="reveal">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999, background: 'var(--bg-muted)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--fg-muted)' }}>
                  <span className="dot live"/>
                  {slide.eyebrow}
                </div>
                <h1 className="font-display" style={{ fontSize: 'clamp(48px, 6vw, 84px)', lineHeight: 0.95, marginTop: 24, fontWeight: 400 }}>
                  {slide.title.map((line, i) => (
                    <div key={i} className={`reveal reveal-d${i+1}`} style={{ display: 'block' }}>
                      {i === 1 && active === 1 ? <span className="gradient-text">{line}</span> : line}
                    </div>
                  ))}
                </h1>
                <p style={{ fontSize: 16, color: 'var(--fg-muted)', marginTop: 20, maxWidth: 460, lineHeight: 1.55 }} className="reveal reveal-d3">
                  {slide.sub}
                </p>
                <div style={{ display: 'flex', gap: 10, marginTop: 28 }} className="reveal reveal-d4">
                  <button className="btn btn-gradient btn-lg">
                    {slide.cta1}
                    <Icon name="arrow_right" size={16}/>
                  </button>
                  <button className="btn btn-outline btn-lg">
                    {slide.cta2}
                  </button>
                </div>
              </div>

              {/* Bottom row: slide dots + mini stats */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 40, gap: 24, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      aria-label={`Slide ${i+1}`}
                      style={{
                        height: 6,
                        width: i === active ? 32 : 6,
                        borderRadius: 999,
                        background: i === active ? 'var(--fg)' : 'var(--border-strong)',
                        transition: 'all 0.3s var(--ease-out)',
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 32 }}>
                  <div>
                    <div className="font-display" style={{ fontSize: 28, lineHeight: 1 }}>{slide.stat.value}</div>
                    <div style={{ fontSize: 11, color: 'var(--fg-soft)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{slide.stat.label}</div>
                  </div>
                  <div>
                    <div className="font-display" style={{ fontSize: 28, lineHeight: 1 }}>{slide.stat2.value}</div>
                    <div style={{ fontSize: 11, color: 'var(--fg-soft)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{slide.stat2.label}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual side */}
            <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-tint)' }}>
              <div
                key={'v-'+active}
                style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${window.HALO.productImage(slide.seed, slide.label, slide.eyebrow.split(' ')[0])})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  animation: 'kenburns 8s var(--ease-out) both',
                }}
              />
              {/* Floating chips */}
              <FloatingChip top="8%" right="6%" delay="0s">
                <Icon name="sparkles" size={14}/>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--fg-soft)' }}>Limited drop</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Only 240 made</div>
                </div>
              </FloatingChip>

              <FloatingChip bottom="22%" left="6%" delay="0.6s">
                <span style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'var(--grad-aurora)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white',
                }}>
                  <Icon name="check" size={14}/>
                </span>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--fg-soft)' }}>Verified makers</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>4.9 · 12k reviews</div>
                </div>
              </FloatingChip>

              <FloatingChip bottom="6%" right="8%" delay="1.2s" wide>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[0,3,5,7].map(i => (
                    <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid var(--surface)', marginLeft: i > 0 ? -10 : 0, background: window.HALO.COLOR_OPTIONS[i].hex }}/>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--fg-soft)' }}>Now browsing</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>1,284 people</div>
                </div>
              </FloatingChip>

              <style>{`@keyframes kenburns { from { transform: scale(1.05); } to { transform: scale(1); } }`}</style>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-grid { display: grid; grid-template-columns: 1.05fr 1fr; min-height: 520px; }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-grid > div:last-child { min-height: 320px; order: -1; }
        }
      `}</style>
    </section>
  );
}

function FloatingChip({ children, top, right, bottom, left, delay = '0s', wide = false }) {
  return (
    <div
      className="glass"
      style={{
        position: 'absolute', top, right, bottom, left,
        padding: '10px 14px',
        borderRadius: 'var(--r-full)',
        boxShadow: 'var(--shadow-md)',
        display: 'flex', alignItems: 'center', gap: 10,
        animation: `floatChip 4s ease-in-out infinite ${delay}, fadeInChip 0.8s var(--ease-out) ${delay} both`,
        minWidth: wide ? 220 : 0,
      }}
    >
      {children}
      <style>{`
        @keyframes floatChip { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes fadeInChip { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}

/* ─── FEATURES STRIP ──────────────────────────────────────────── */
function FeaturesStrip() {
  const F = window.HALO.FEATURES;
  return (
    <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '20px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }} className="features-grid">
        {F.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 'var(--r-md)',
              background: 'var(--bg-muted)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--fg)',
              flexShrink: 0,
            }}>
              <Icon name={f.icon} size={18}/>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{f.sub}</div>
            </div>
          </div>
        ))}
        <style>{`@media (max-width: 800px) { .features-grid { grid-template-columns: repeat(2, 1fr); } }`}</style>
      </div>
    </section>
  );
}

/* ─── CATEGORIES ─────────────────────────────────────────────── */
function Categories() {
  const cats = window.HALO.CATEGORIES;
  return (
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Shop by category"
          title="Six worlds, one studio."
          sub="Every category is editorial-led. We don't list a product unless we've used it for at least 30 days."
        />
        <div className="cat-grid">
          {cats.map((c, i) => (
            <a key={c.id} className="cat-card reveal" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="cat-bg" style={{ backgroundImage: `url(${c.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}/>
              <div className="cat-overlay"/>
              <div className="cat-content">
                <div>
                  <h3>{c.name}</h3>
                  <div className="cat-count">{c.count} products</div>
                </div>
                <div className="cat-arrow"><Icon name="arrow_right" size={16}/></div>
              </div>
            </a>
          ))}
        </div>
        <style>{`
          .cat-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; }
          @media (max-width: 1100px) { .cat-grid { grid-template-columns: repeat(3, 1fr); } }
          @media (max-width: 640px) { .cat-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; } }
        `}</style>
      </div>
    </section>
  );
}

/* ─── SECTION HEADER REUSABLE ─────────────────────────────────── */
function SectionHeader({ eyebrow, title, sub, cta, action }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 36, flexWrap: 'wrap' }}>
      <div style={{ maxWidth: 640 }}>
        {eyebrow && (
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 24, height: 1, background: 'var(--fg-muted)' }}/>
            {eyebrow}
          </div>
        )}
        <h2 className="font-display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 1.05, fontWeight: 400 }}>{title}</h2>
        {sub && <p style={{ fontSize: 15, color: 'var(--fg-muted)', marginTop: 12, lineHeight: 1.5 }}>{sub}</p>}
      </div>
      {(cta || action) && (
        <div style={{ display: 'flex', gap: 8 }}>
          {action}
          {cta && (
            <button className="btn btn-outline">
              {cta} <Icon name="arrow_right" size={14}/>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

window.Hero = Hero;
window.FeaturesStrip = FeaturesStrip;
window.Categories = Categories;
window.SectionHeader = SectionHeader;
