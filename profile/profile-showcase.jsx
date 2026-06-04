/* global React, Icon, PROFILE, Reveal, Counter, ProgressRing, GlowCard, CardHead, InfoRow, SecHead, SocialGlyph, Spark, Stars */
// Profile showcase — the "digital identity" page

function ProfileShowcase({ onEdit, onPreview }) {
  const P = PROFILE;

  return (
    <div className="profile-showcase">
      {/* ════ HERO ════ */}
      <section className="hero">
        <div className="hero-cover">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="hero-grain" />
          <div className="hero-sheen" />
          <div className="hero-cover-actions">
            <button className="glass-btn" onClick={onPreview}><Icon name="eye" size={14} /> Preview</button>
            <button className="glass-btn icon" aria-label="Share"><Icon name="send" size={14} /></button>
            <button className="glass-btn icon" aria-label="Change cover"><Icon name="image" size={14} /></button>
          </div>
        </div>

        <div className="hero-identity">
          <div className="avatar-frame">
            <div className="avatar-inner">{P.initials}</div>
            <span className="avatar-status" title="Online" />
          </div>

          <div className="hero-meta">
            <h1 className="hero-name">
              {P.fullName}
              {P.verified && <span className="verify" title="Verified"><Icon name="check" size={15} strokeWidth={3} /></span>}
            </h1>
            <div className="hero-sub">
              <span className="hero-handle">@{P.username}</span>
              <span style={{ color: 'var(--fg-soft)' }}>·</span>
              <span>{P.title}</span>
              <span style={{ color: 'var(--fg-soft)' }}>·</span>
              <span>{P.org}</span>
            </div>
            <p className="hero-bio">{P.bio}</p>
            <div className="hero-badges">
              <span className="chip grad"><Icon name="sparkles" size={13} /> {P.tier}</span>
              <span className="chip"><Icon name="zap" size={13} style={{ color: 'var(--brand-amber)' }} /> {P.level}</span>
              <span className="chip ghost"><span className="dot-live" /> Online now</span>
              <span className="chip ghost"><Icon name="map_pin" size={13} /> {P.address.city}</span>
              <span className="chip ghost"><Icon name="bell" size={13} /> Joined {P.joinedShort}</span>
            </div>
          </div>

          <div className="hero-actions">
            <button className="cta-edit" onClick={onEdit}>
              <Icon name="sparkles" size={16} /> Edit profile
            </button>
            <div className="hero-stats">
              <div className="hero-stat"><div className="v"><Counter value={P.stats.orders} /></div><div className="l">Orders</div></div>
              <div className="hero-stat"><div className="v"><Counter value={P.stats.reviews} /></div><div className="l">Reviews</div></div>
              <div className="hero-stat"><div className="v"><Counter value={P.stats.followers / 1000} decimals={1} format={false} suffix="k" /></div><div className="l">Followers</div></div>
            </div>
          </div>
        </div>
      </section>

      <div className="profile-wrap">
        {/* ════ INSIGHTS ════ */}
        <SecHead kicker="Activity & insights" title="The numbers behind Asha"
          desc="A living snapshot of everything earned, saved, and shipped."
          action={<button className="btn btn-ghost btn-sm desktop-only"><Icon name="arrow_up_right" size={13} /> Full report</button>} />

        <div className="bento">
          {[
            { c: 'col-3', l: 'Total orders', v: P.stats.orders, ic: 'package', tint: 'var(--grad-ocean)', spark: [30,45,38,60,52,70,65,82], col: 'var(--brand-sky)' },
            { c: 'col-3', l: 'Lifetime spend', v: P.stats.spend, ic: 'shopping_bag', tint: 'var(--grad-aurora)', prefix: '£', spark: [40,42,55,50,68,72,80,90], col: 'var(--brand-violet)' },
            { c: 'col-3', l: 'Reward points', v: P.stats.points, ic: 'sparkles', tint: 'var(--grad-sunset)', spark: [20,35,30,48,55,60,75,88], col: 'var(--brand-pink)' },
            { c: 'col-3', l: 'Reviews written', v: P.stats.reviews, ic: 'star', tint: 'var(--grad-lime)', spark: [50,48,60,58,72,68,85,92], col: 'var(--brand-emerald)' },
          ].map((m, i) => (
            <Reveal key={m.l} className={m.c} delay={i * 70}>
              <div className="metric-tile" style={{ height: '100%' }}>
                <span className="mt-ic" style={{ background: m.tint }}><Icon name={m.ic} size={17} /></span>
                <div className="mt-v">{m.prefix && m.prefix}<Counter value={m.v} /></div>
                <div className="mt-l">{m.l}</div>
                <Spark data={m.spark} color={m.col} />
              </div>
            </Reveal>
          ))}
        </div>

        {/* ════ PERSONAL + ADDRESS ════ */}
        <SecHead kicker="Personal information" title="Who Asha is" desc="Contact, identity, and the essentials — grouped for easy scanning." />
        <div className="bento">
          <Reveal className="col-7">
            <GlowCard style={{ height: '100%' }}>
              <CardHead icon="user" title="Personal details" tint="var(--grad-aurora)"
                action={<button className="btn btn-ghost btn-sm" onClick={onEdit}><Icon name="sparkles" size={12} /> Edit</button>} />
              <div className="info-grid">
                <InfoRow icon="user" label="Full name" value={P.personal.fullName} />
                <InfoRow icon="bell" label="Date of birth" value={`${P.personal.dob} · ${P.personal.age}`} />
                <InfoRow icon="user" label="Gender" value={P.personal.gender} />
                <InfoRow icon="globe" label="Nationality" value={P.personal.nationality} />
                <InfoRow icon="mail" label="Email" value={P.personal.email} mono />
                <InfoRow icon="phone" label="Phone" value={P.personal.phone} mono />
                <InfoRow icon="phone" label="Secondary phone" value={P.personal.phone2} mono />
                <InfoRow icon="shield" label="Emergency contact" value={P.personal.emergency} />
                <InfoRow icon="chat" label="Languages" value={P.personal.languages.join(', ')} />
                <InfoRow icon="globe" label="Timezone" value={P.personal.timezone} />
              </div>
            </GlowCard>
          </Reveal>

          <Reveal className="col-5" delay={90}>
            <GlowCard style={{ height: '100%' }}>
              <CardHead icon="map_pin" title="Location" tint="var(--grad-sunset)"
                action={<span className="chip ghost" style={{ height: 26 }}>{P.address.country}</span>} />
              <div className="map-canvas">
                <div className="map-grid" />
                <div className="map-route" />
                <div className="map-pulse" />
                <div className="map-pin"><div className="pin-body" /></div>
                <div className="map-coords">{P.address.coords}</div>
              </div>
              <div className="addr-block">
                <div className="addr-mini">
                  <div className="eyebrow" style={{ marginBottom: 6 }}>Billing</div>
                  <div style={{ fontSize: 13, color: 'var(--fg-muted)', whiteSpace: 'pre-line', lineHeight: 1.5 }}>{P.address.billing}</div>
                </div>
                <div className="addr-mini">
                  <div className="eyebrow" style={{ marginBottom: 6 }}>Shipping</div>
                  <div style={{ fontSize: 13, color: 'var(--fg-muted)', whiteSpace: 'pre-line', lineHeight: 1.5 }}>{P.address.shipping}</div>
                </div>
              </div>
            </GlowCard>
          </Reveal>
        </div>

        {/* ════ ACCOUNT + ACTIVITY ════ */}
        <SecHead kicker="Account & security" title="Status & standing" desc="Membership, completion, and how protected the account is." />
        <div className="bento">
          <Reveal className="col-5">
            <GlowCard style={{ height: '100%' }}>
              <CardHead icon="shield" title="Account health" tint="var(--grad-lime)" />
              <div style={{ display: 'flex', gap: 18, alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', padding: '6px 0 14px' }}>
                <ProgressRing value={P.completion} size={120} cap="Complete" colors={['#7c3aed', '#ec4899', '#f59e0b']} />
                <ProgressRing value={P.securityScore} size={120} cap="Security" colors={['#84cc16', '#10b981']} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div className="addr-mini">
                  <div className="l" style={{ fontSize: 11, color: 'var(--fg-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Status</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 4, fontWeight: 600, fontSize: 14 }}><span className="dot-live" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--brand-emerald)', display: 'inline-block', boxShadow: '0 0 0 3px rgba(16,185,129,0.2)' }} /> {P.account.statusLabel}</div>
                </div>
                <div className="addr-mini">
                  <div className="l" style={{ fontSize: 11, color: 'var(--fg-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Sessions</div>
                  <div style={{ marginTop: 4, fontWeight: 600, fontSize: 14 }}>{P.account.sessions} active devices</div>
                </div>
              </div>
            </GlowCard>
          </Reveal>

          <Reveal className="col-3" delay={80}>
            <GlowCard glow={false} style={{ height: '100%' }}>
              <CardHead icon="info" title="Account" tint="var(--grad-ocean)" />
              <div className="info-grid" style={{ gridTemplateColumns: '1fr' }}>
                <InfoRow icon="command" label="User ID" value={P.account.userId} mono />
                <InfoRow icon="sparkles" label="Membership" value={P.account.tier} />
                <InfoRow icon="zap" label="Plan" value={P.account.plan} />
                <InfoRow icon="bell" label="Registered" value={P.account.registered} />
                <InfoRow icon="rotate" label="Last login" value={P.account.lastLogin} />
              </div>
            </GlowCard>
          </Reveal>

          <Reveal className="col-4" delay={150}>
            <GlowCard style={{ height: '100%' }}>
              <CardHead icon="zap" title="Recent activity" tint="var(--grad-aurora)"
                action={<span className="chip ghost" style={{ height: 26 }}>Live</span>} />
              <div>
                {P.activity.map((a, i) => (
                  <div className="feed-row" key={i}>
                    <span className="feed-ic" style={{ background: a.tint }}><Icon name={a.icon} size={15} /></span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em' }}>{a.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 2 }}>{a.meta}</div>
                      <div style={{ fontSize: 11, color: 'var(--fg-soft)', marginTop: 3 }}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlowCard>
          </Reveal>
        </div>

        {/* ════ SOCIAL ════ */}
        <SecHead kicker="Social & online presence" title="Find Asha elsewhere" desc="Every channel, linked and verified." />
        <Reveal>
          <GlowCard glow={false}>
            <div className="social-grid">
              {P.socials.map((s) => (
                <a key={s.key} className="social-card" href="#" onClick={(e) => e.preventDefault()}>
                  <SocialGlyph ic={s.ic} tint={s.tint} />
                  <div>
                    <div className="sc-handle">{s.handle}</div>
                    <div className="sc-meta">{s.label} · {s.meta}</div>
                  </div>
                  <span className="sc-arrow"><Icon name="arrow_up_right" size={16} /></span>
                </a>
              ))}
            </div>
          </GlowCard>
        </Reveal>

        {/* ════ PREFERENCES + ACHIEVEMENTS ════ */}
        <SecHead kicker="Preferences & highlights" title="Tuned to taste" desc="How Asha likes Halo to behave — plus a few things she's proud of." />
        <div className="bento">
          <Reveal className="col-7">
            <GlowCard glow={false} style={{ height: '100%' }}>
              <CardHead icon="shield" title="Preferences" tint="var(--grad-ocean)"
                action={<button className="btn btn-ghost btn-sm" onClick={onEdit}><Icon name="sparkles" size={12} /> Manage</button>} />
              <PrefRow icon="sun" t="Appearance" d="Match system, or pick a side">
                <ThemeSeg />
              </PrefRow>
              <PrefRow icon="globe" t="Language" d={P.preferences.language}>
                <span className="chip ghost" style={{ height: 28 }}>EN-GB</span>
              </PrefRow>
              <PrefRow icon="bell" t="Order updates" d="Shipping, delivery & returns">
                <Sw on />
              </PrefRow>
              <PrefRow icon="sparkles" t="Product news" d="New drops & restocks">
                <Sw on />
              </PrefRow>
              <PrefRow icon="mail" t="Marketing emails" d="Editorials & offers">
                <Sw />
              </PrefRow>
              <PrefRow icon="eye" t="Public profile" d="Anyone can view your showcase">
                <Sw on />
              </PrefRow>
            </GlowCard>
          </Reveal>

          <Reveal className="col-5" delay={90}>
            <GlowCard glow={false} style={{ height: '100%' }}>
              <CardHead icon="sparkles" title="Achievements" tint="var(--grad-sunset)" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {P.achievements.map((a, i) => (
                  <div key={i} className="addr-mini" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span className="mt-ic" style={{ background: a.tint, width: 34, height: 34 }}><Icon name={a.ic} size={16} /></span>
                    <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em' }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--fg-soft)' }}>{a.meta}</div>
                  </div>
                ))}
              </div>
            </GlowCard>
          </Reveal>
        </div>

        {/* ════ CTA strip ════ */}
        <Reveal>
          <div className="p-card" style={{ marginTop: 'clamp(32px,4vw,48px)', padding: 'clamp(24px,3vw,40px)', background: 'linear-gradient(135deg, #1a0b2e, #2d0a4e 60%, #3a1208)', border: 0, color: 'white', overflow: 'hidden' }}>
            <div className="orb" style={{ width: 240, height: 240, background: '#ec4899', top: -100, right: '10%', opacity: 0.4 }} />
            <div className="orb" style={{ width: 200, height: 200, background: '#f59e0b', bottom: -120, left: '20%', opacity: 0.35 }} />
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
              <div>
                <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)' }}>Your profile is {P.completion}% complete</div>
                <h3 className="font-display" style={{ fontSize: 'clamp(24px,3vw,34px)', fontWeight: 400, marginTop: 8, color: 'white' }}>Make it unmistakably you.</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 6, fontSize: 14, maxWidth: '46ch' }}>Add a few missing details and preview your identity as a portfolio.</p>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button className="glass-btn" style={{ height: 48, padding: '0 20px', fontSize: 14 }} onClick={onPreview}><Icon name="eye" size={16} /> Preview</button>
                <button className="cta-edit" style={{ animation: 'none' }} onClick={onEdit}><Icon name="sparkles" size={16} /> Edit profile</button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function PrefRow({ icon, t, d, children }) {
  return (
    <div className="pref-row">
      <span className="pref-ic"><Icon name={icon} size={16} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="pref-t">{t}</div>
        <div className="pref-d">{d}</div>
      </div>
      {children}
    </div>
  );
}

function Sw({ on: initial }) {
  const [on, setOn] = React.useState(!!initial);
  return <button className={`switch ${on ? 'on' : ''}`} onClick={() => setOn(o => !o)} role="switch" aria-checked={on} />;
}

function ThemeSeg() {
  const [v, setV] = React.useState('system');
  return (
    <div className="seg">
      {['light', 'system', 'dark'].map(o => (
        <button key={o} className={v === o ? 'on' : ''} onClick={() => setV(o)} style={{ textTransform: 'capitalize' }}>{o}</button>
      ))}
    </div>
  );
}

window.ProfileShowcase = ProfileShowcase;
