/* global React, ReactDOM, Icon, PROFILE, Counter, ProgressRing, SocialGlyph */
// Fullscreen portfolio-style preview modal + success flow

const { useState: useStateP, useRef: useRefP, useEffect: useEffectP } = React;

// reveal that observes inside a given scroll container
function PVReveal({ root, children, className = '', delay = 0, style = {} }) {
  const ref = useRefP(null);
  const [inV, setInV] = useStateP(false);
  useEffectP(() => {
    const el = ref.current; if (!el) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInV(true); ob.disconnect(); } },
      { root: root?.current || null, threshold: 0.18 });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);
  return <div ref={ref} className={`pv-reveal ${inV ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>{children}</div>;
}

function PVNum({ n }) { return <span className="pv-num">{String(n).padStart(2, '0')} —</span>; }

function PreviewModal({ onClose, onSave }) {
  const P = PROFILE;
  const scrollRef = useRefP(null);
  const [prog, setProg] = useStateP(0);
  const [saving, setSaving] = useStateP(false);

  useEffectP(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const onScroll = () => {
    const el = scrollRef.current; if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProg(max > 0 ? (el.scrollTop / max) * 100 : 0);
  };

  const doSave = () => {
    setSaving(true);
    fireConfetti();
    setTimeout(() => { onSave && onSave(); }, 2100);
  };

  return (
    <div className="pv-overlay" ref={scrollRef} onScroll={onScroll}>
      <div className="pv-progress" style={{ width: `${prog}%` }} />
      <button className="pv-close" onClick={onClose} aria-label="Close preview"><Icon name="close" size={20} /></button>

      {/* 1 · HERO */}
      <section className="pv-section pv-hero">
        <div className="pv-hero-orbs">
          <div className="orb" style={{ width: 360, height: 360, background: '#7c3aed', top: '6%', left: '8%', opacity: 0.28 }} />
          <div className="orb" style={{ width: 320, height: 320, background: '#ec4899', bottom: '8%', right: '10%', opacity: 0.24 }} />
          <div className="orb" style={{ width: 240, height: 240, background: '#f59e0b', top: '40%', left: '54%', opacity: 0.2 }} />
        </div>
        <PVReveal root={scrollRef} style={{ position: 'relative' }}>
          <div className="avatar-frame" style={{ width: 132, margin: '0 auto 28px' }}>
            <div className="avatar-inner">{P.initials}</div>
            <span className="avatar-status" />
          </div>
          <div className="pv-kicker">{P.title} · {P.org}</div>
          <h1 className="pv-bigname">Asha<br /><span className="pv-gradname">Patel</span></h1>
          <p className="pv-lead">{P.bio}</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 26 }}>
            <span className="chip grad"><Icon name="sparkles" size={13} /> {P.tier}</span>
            <span className="chip"><Icon name="check" size={13} style={{ color: 'var(--brand-sky)' }} /> Verified</span>
            <span className="chip ghost"><Icon name="map_pin" size={13} /> {P.address.city}</span>
            <span className="chip ghost"><Icon name="bell" size={13} /> Since {P.joinedShort}</span>
          </div>
          <div style={{ marginTop: 48, color: 'var(--fg-soft)', fontSize: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, animation: 'bob 2.4s ease-in-out infinite' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em' }}>Scroll to explore</span>
            <Icon name="chevron_down" size={18} />
          </div>
        </PVReveal>
      </section>

      {/* 2 · PERSONAL */}
      <section className="pv-section">
        <div className="pv-split">
          <PVReveal root={scrollRef}>
            <PVNum n={1} />
            <h2 className="pv-h">Personal</h2>
            <p className="pv-lead" style={{ margin: '0 0 8px' }}>The essentials — identity, languages, and how to reach a real human.</p>
          </PVReveal>
          <PVReveal root={scrollRef} delay={120} className="pv-split-media">
            <div className="p-card" style={{ padding: 28 }}>
              {[
                ['Full name', P.personal.fullName], ['Date of birth', `${P.personal.dob} · ${P.personal.age}`],
                ['Nationality', P.personal.nationality], ['Email', P.personal.email],
                ['Phone', P.personal.phone], ['Languages', P.personal.languages.join(', ')],
                ['Timezone', P.personal.timezone],
              ].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', gap: 20, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--fg-soft)', fontSize: 13 }}>{l}</span>
                  <span style={{ fontWeight: 600, fontSize: 14, textAlign: 'right' }}>{v}</span>
                </div>
              ))}
            </div>
          </PVReveal>
        </div>
      </section>

      {/* 3 · ADDRESS */}
      <section className="pv-section">
        <div className="pv-split rev">
          <PVReveal root={scrollRef} className="pv-split-media">
            <div className="p-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="map-canvas" style={{ height: 240, borderRadius: 0, border: 0 }}>
                <div className="map-grid" /><div className="map-route" /><div className="map-pulse" />
                <div className="map-pin"><div className="pin-body" /></div>
                <div className="map-coords">{P.address.coords}</div>
              </div>
              <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                <div><div className="eyebrow" style={{ marginBottom: 6 }}>Billing</div><div style={{ fontSize: 13, color: 'var(--fg-muted)', whiteSpace: 'pre-line', lineHeight: 1.5 }}>{P.address.billing}</div></div>
                <div><div className="eyebrow" style={{ marginBottom: 6 }}>Shipping</div><div style={{ fontSize: 13, color: 'var(--fg-muted)', whiteSpace: 'pre-line', lineHeight: 1.5 }}>{P.address.shipping}</div></div>
              </div>
            </div>
          </PVReveal>
          <PVReveal root={scrollRef} delay={120}>
            <PVNum n={2} />
            <h2 className="pv-h">Based in {P.address.city}</h2>
            <p className="pv-lead" style={{ margin: '0 0 12px' }}>{P.address.full}, {P.address.district} — {P.address.postal}, {P.address.country}.</p>
          </PVReveal>
        </div>
      </section>

      {/* 4 · ACCOUNT */}
      <section className="pv-section">
        <PVReveal root={scrollRef}><PVNum n={3} /><h2 className="pv-h">Account standing</h2></PVReveal>
        <div className="pv-split" style={{ marginTop: 32 }}>
          <PVReveal root={scrollRef} className="pv-split-media" style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            <ProgressRing root={scrollRef} value={P.completion} size={150} cap="Complete" colors={['#7c3aed', '#ec4899', '#f59e0b']} />
            <ProgressRing root={scrollRef} value={P.securityScore} size={150} cap="Security" colors={['#84cc16', '#10b981']} />
          </PVReveal>
          <PVReveal root={scrollRef} delay={120}>
            <div className="p-card" style={{ padding: 28 }}>
              {[['User ID', P.account.userId], ['Membership', P.account.tier], ['Plan', P.account.plan], ['Registered', P.account.registered], ['Last login', P.account.lastLogin], ['Status', P.account.statusLabel]].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', gap: 20, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--fg-soft)', fontSize: 13 }}>{l}</span>
                  <span style={{ fontWeight: 600, fontSize: 14, fontFamily: l === 'User ID' ? 'var(--font-mono)' : 'inherit' }}>{v}</span>
                </div>
              ))}
            </div>
          </PVReveal>
        </div>
      </section>

      {/* 5 · STATS */}
      <section className="pv-section">
        <PVReveal root={scrollRef}><PVNum n={4} /><h2 className="pv-h">By the numbers</h2></PVReveal>
        <div className="pv-stat-grid" style={{ marginTop: 32 }}>
          {[
            { v: P.stats.orders, l: 'Total orders', s: '' },
            { v: P.stats.spend, l: 'Lifetime spend', p: '£' },
            { v: P.stats.reviews, l: 'Reviews written' },
            { v: P.stats.points, l: 'Reward points' },
          ].map((m, i) => (
            <PVReveal root={scrollRef} delay={i * 90} key={m.l}>
              <div className="pv-stat">
                <div className="v">{m.p}<Counter root={scrollRef} value={m.v} /></div>
                <div className="l">{m.l}</div>
              </div>
            </PVReveal>
          ))}
        </div>
      </section>

      {/* 6 · SOCIAL */}
      <section className="pv-section">
        <PVReveal root={scrollRef}><PVNum n={5} /><h2 className="pv-h">Elsewhere</h2></PVReveal>
        <div className="social-grid" style={{ marginTop: 32, gridTemplateColumns: 'repeat(3,1fr)' }}>
          {P.socials.map((s, i) => (
            <PVReveal root={scrollRef} delay={i * 70} key={s.key}>
              <div className="social-card" style={{ background: 'var(--surface)' }}>
                <SocialGlyph ic={s.ic} tint={s.tint} />
                <div><div className="sc-handle">{s.handle}</div><div className="sc-meta">{s.label} · {s.meta}</div></div>
              </div>
            </PVReveal>
          ))}
        </div>
      </section>

      {/* 7 · PREFERENCES */}
      <section className="pv-section">
        <PVReveal root={scrollRef}><PVNum n={6} /><h2 className="pv-h">Preferences</h2></PVReveal>
        <div className="bento" style={{ marginTop: 32 }}>
          {[
            { l: 'Theme', v: P.preferences.theme, ic: 'sun' },
            { l: 'Language', v: P.preferences.language, ic: 'globe' },
            { l: 'Communication', v: P.preferences.comms, ic: 'mail' },
            { l: 'Order updates', v: 'On', ic: 'bell' },
            { l: 'Product news', v: 'On', ic: 'sparkles' },
            { l: 'Marketing', v: 'Off', ic: 'eye' },
          ].map((p, i) => (
            <PVReveal root={scrollRef} delay={i * 60} key={p.l} className="col-4">
              <div className="p-card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span className="pref-ic"><Icon name={p.ic} size={16} /></span>
                <div style={{ flex: 1 }}><div style={{ fontSize: 12, color: 'var(--fg-soft)' }}>{p.l}</div><div style={{ fontSize: 15, fontWeight: 700 }}>{p.v}</div></div>
              </div>
            </PVReveal>
          ))}
        </div>
      </section>

      {/* 8 · ACHIEVEMENTS */}
      <section className="pv-section" style={{ paddingBottom: 140 }}>
        <PVReveal root={scrollRef}><PVNum n={7} /><h2 className="pv-h">Highlights</h2></PVReveal>
        <div className="bento" style={{ marginTop: 32 }}>
          {P.achievements.map((a, i) => (
            <PVReveal root={scrollRef} delay={i * 80} key={a.title} className="col-3">
              <div className="p-card" style={{ textAlign: 'center', padding: 28 }}>
                <span className="mt-ic" style={{ background: a.tint, width: 48, height: 48, margin: '0 auto 14px' }}><Icon name={a.ic} size={22} /></span>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{a.title}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-soft)', marginTop: 4 }}>{a.meta}</div>
              </div>
            </PVReveal>
          ))}
        </div>
        <PVReveal root={scrollRef}>
          <div style={{ textAlign: 'center', marginTop: 64 }}>
            <div className="pv-kicker">Ready when you are</div>
            <h2 className="pv-h" style={{ margin: '12px 0 18px' }}>Looks great, Asha.</h2>
            <button className="cta-edit" style={{ height: 52, fontSize: 15, animation: 'none' }} onClick={doSave}><Icon name="check" size={17} strokeWidth={2.5} /> Save profile</button>
          </div>
        </PVReveal>
      </section>

      {/* sticky save bar */}
      <div className="pv-savebar">
        <div style={{ fontSize: 13, color: 'var(--fg-muted)' }}>Previewing your public profile</div>
        <button className="btn btn-ghost btn-sm" onClick={onClose}>Keep editing</button>
        <button className="cta-edit" style={{ height: 40, animation: 'none' }} onClick={doSave}><Icon name="check" size={15} strokeWidth={2.5} /> Save profile</button>
      </div>

      {saving && <SuccessSplash />}
    </div>
  );
}

function SuccessSplash() {
  const P = PROFILE;
  return (
    <div className="success-splash">
      <div className="success-check"><Icon name="check" size={48} strokeWidth={3} /></div>
      <h2 className="font-display" style={{ fontSize: 'clamp(30px,4vw,46px)', fontWeight: 400 }}>Profile saved</h2>
      <p style={{ color: 'var(--fg-muted)', fontSize: 15, textAlign: 'center', maxWidth: '40ch' }}>Your identity is live. Looking sharp, {P.fullName.split(' ')[0]}.</p>
    </div>
  );
}

function fireConfetti() {
  const colors = ['#7c3aed', '#ec4899', '#f59e0b', '#0ea5e9', '#10b981'];
  for (let i = 0; i < 70; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = colors[i % colors.length];
    c.style.animationDuration = (1.6 + Math.random() * 1.6) + 's';
    c.style.animationDelay = (Math.random() * 0.5) + 's';
    c.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3600);
  }
}

window.PreviewModal = PreviewModal;
