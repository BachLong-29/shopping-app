/* global React, Icon, PROFILE, ProgressRing, Counter, useInView */
// Profile edit — premium multi-section form

const { useState: useStateE, useRef: useRefE, useEffect: useEffectE } = React;

const SECTIONS = [
  { id: 'personal', label: 'Personal', icon: 'user', tint: 'var(--grad-aurora)', desc: 'Identity & bio' },
  { id: 'contact', label: 'Contact', icon: 'mail', tint: 'var(--grad-ocean)', desc: 'Email & phone' },
  { id: 'address', label: 'Address', icon: 'map_pin', tint: 'var(--grad-sunset)', desc: 'Where you are' },
  { id: 'social', label: 'Social', icon: 'globe', tint: 'var(--grad-lime)', desc: 'Online presence' },
  { id: 'prefs', label: 'Preferences', icon: 'shield', tint: 'var(--grad-violet)', desc: 'How Halo behaves' },
];

// Floating-label field
function FF({ label, value, onChange, type = 'text', help, ok, err, affix, hint, required, textarea, children, span }) {
  const cls = ['ff'];
  if (ok) cls.push('ok'); if (err) cls.push('err');
  return (
    <div className={cls.join(' ')} style={span ? { gridColumn: 'span 2' } : undefined}>
      {textarea ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder=" " id={label} />
      ) : children ? children : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder=" " id={label} autoComplete="off" />
      )}
      <label htmlFor={label}>{label}{required && <span style={{ color: 'var(--brand-rose)' }}> *</span>}</label>
      {affix && <span className="ff-affix">{affix}</span>}
      {(help || hint) && (
        <div className={`ff-help ${ok ? 'ok' : ''} ${err ? 'err' : ''}`}>
          {ok && <Icon name="check" size={12} />}
          {err && <Icon name="alert" size={12} />}
          {!ok && !err && hint && <Icon name="info" size={12} />}
          {help || hint}
        </div>
      )}
    </div>
  );
}

// Select with floating label (always-filled style)
function FFSelect({ label, value, onChange, options }) {
  return (
    <div className="ff filled">
      <select value={value} onChange={e => onChange(e.target.value)}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <label>{label}</label>
    </div>
  );
}

function ProfileEdit({ onCancel, onPreview }) {
  const P = PROFILE;
  const [f, setF] = useStateE({
    fullName: P.personal.fullName,
    username: P.username,
    title: P.title,
    bio: P.bio,
    dob: '1991-08-14',
    gender: P.personal.gender,
    nationality: P.personal.nationality,
    email: P.personal.email,
    phone: P.personal.phone,
    phone2: '',
    country: P.address.country,
    state: P.address.state,
    city: P.address.city,
    district: P.address.district,
    postal: P.address.postal,
    address: P.address.full,
    website: 'ashapatel.studio',
    linkedin: 'in/ashapatel',
    github: 'ashapatel',
    twitter: '@asha_makes',
    instagram: '',
    facebook: '',
    languages: ['English', 'Hindi', 'Gujarati', 'French'],
    language: 'English (UK)',
    theme: 'System',
  });
  const set = (k) => (v) => setF(prev => ({ ...prev, [k]: v }));

  const [active, setActive] = useStateE('personal');
  const refs = useRefE({});

  // sync sticky nav with scroll
  useEffectE(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-30% 0px -55% 0px' });
    SECTIONS.forEach(s => { const el = refs.current[s.id]; if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const jump = (id) => {
    const el = refs.current[id];
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  // completion: count filled required-ish fields
  const tracked = ['fullName', 'username', 'title', 'bio', 'email', 'phone', 'country', 'city', 'postal', 'address', 'website'];
  const filled = tracked.filter(k => String(f[k] || '').trim().length > 0).length;
  const completion = Math.round((filled / tracked.length) * 100);

  const emailOk = /.+@.+\..+/.test(f.email);
  const userOk = f.username.length >= 3;

  const LANGS = ['English', 'Hindi', 'Gujarati', 'French', 'Spanish', 'German', 'Mandarin', 'Arabic'];
  const toggleLang = (l) => setF(prev => ({ ...prev, languages: prev.languages.includes(l) ? prev.languages.filter(x => x !== l) : [...prev.languages, l] }));

  return (
    <div className="profile-wrap" style={{ paddingTop: 28 }}>
      {/* page header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 28 }}>
        <div>
          <button onClick={onCancel} className="btn btn-ghost btn-sm" style={{ marginBottom: 12, paddingLeft: 8 }}><Icon name="chevron_left" size={14} /> Back to profile</button>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Edit profile</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(30px,4vw,46px)', fontWeight: 400, lineHeight: 1, letterSpacing: '-0.02em' }}>Refine your identity</h1>
          <p style={{ color: 'var(--fg-muted)', marginTop: 8, fontSize: 14 }}>Five quick sections. Changes preview as a portfolio before they go live.</p>
        </div>
      </div>

      <div className="edit-shell">
        {/* ── Sticky nav ── */}
        <aside className="edit-nav">
          <div className="en-prog">
            <ProgressRing value={completion} size={64} stroke={7} cap="" colors={['#7c3aed', '#ec4899', '#f59e0b']}>
              <span className="ring-num" style={{ fontSize: 16 }}><Counter value={completion} suffix="%" format={false} /></span>
            </ProgressRing>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Profile {completion}%</div>
              <div style={{ fontSize: 11, color: 'var(--fg-soft)', marginTop: 2 }}>{filled} of {tracked.length} key fields</div>
            </div>
          </div>
          {SECTIONS.map((s, i) => (
            <button key={s.id} className={`edit-nav-item ${active === s.id ? 'active' : ''}`} onClick={() => jump(s.id)}>
              <span className="en-num">{i + 1}</span>
              <span style={{ flex: 1 }}>{s.label}</span>
              {active === s.id && <Icon name="chevron_right" size={14} />}
            </button>
          ))}
          <div style={{ margintop: 8, padding: '14px 12px', fontSize: 11, color: 'var(--fg-soft)', lineHeight: 1.5 }}>
            <Icon name="info" size={12} style={{ verticalAlign: '-2px', marginRight: 4 }} />
            Autosaved to draft. Nothing is public until you save.
          </div>
        </aside>

        {/* ── Form ── */}
        <div>
          {/* Personal */}
          <section className="edit-section" id="personal" ref={el => refs.current.personal = el}>
            <div className="edit-section-head">
              <span className="es-ic" style={{ background: SECTIONS[0].tint }}><Icon name="user" size={18} /></span>
              <div><h3>Personal</h3><p>Your avatar, name, and the story up top.</p></div>
            </div>
            <div className="p-card" style={{ marginBottom: 16 }}>
              <div className="upload-cover">
                <span className="uc-btn"><Icon name="image" size={14} /> Change cover image</span>
              </div>
              <div className="upload-avatar-row">
                <div className="upload-avatar">{P.initials}<span className="ua-cam"><Icon name="image" size={18} /></span></div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>Profile photo</div>
                  <div style={{ fontSize: 12, color: 'var(--fg-soft)', marginTop: 2, marginBottom: 8 }}>PNG or JPG, at least 400×400px.</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-outline btn-sm"><Icon name="upload" size={13} /> Upload</button>
                    <button className="btn btn-ghost btn-sm">Remove</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-card">
              <div className="form-grid">
                <FF label="Full name" value={f.fullName} onChange={set('fullName')} required ok={f.fullName.length > 2} />
                <FF label="Username" value={f.username} onChange={set('username')} required ok={userOk} err={!userOk}
                  affix={userOk ? <Icon name="check" size={15} style={{ color: 'var(--brand-emerald)' }} /> : null}
                  help={userOk ? `halo.studio/@${f.username}` : 'Min. 3 characters'} />
                <FF label="Professional title" value={f.title} onChange={set('title')} span />
                <FF label="Bio" value={f.bio} onChange={set('bio')} textarea span hint={`${f.bio.length}/240 — a sentence or two about you.`} />
                <FF label="Date of birth" value={f.dob} onChange={set('dob')} type="date" />
                <FFSelect label="Gender" value={f.gender} onChange={set('gender')} options={['Female', 'Male', 'Non-binary', 'Prefer not to say']} />
                <FFSelect label="Nationality" value={f.nationality} onChange={set('nationality')} options={['British Indian', 'British', 'Indian', 'American', 'French', 'Other']} />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--fg-soft)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Languages</div>
                  <div className="chip-select">
                    {LANGS.map(l => (
                      <button key={l} className={`chip-opt ${f.languages.includes(l) ? 'on' : ''}`} onClick={() => toggleLang(l)}>{l}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="edit-section" id="contact" ref={el => refs.current.contact = el}>
            <div className="edit-section-head">
              <span className="es-ic" style={{ background: SECTIONS[1].tint }}><Icon name="mail" size={18} /></span>
              <div><h3>Contact</h3><p>How Halo and customers reach you.</p></div>
            </div>
            <div className="p-card">
              <div className="form-grid">
                <FF label="Email address" value={f.email} onChange={set('email')} type="email" required ok={emailOk} err={!emailOk}
                  affix={emailOk ? <span className="badge badge-soft" style={{ height: 20 }}>Verified</span> : null}
                  help={emailOk ? 'Confirmed & primary' : 'Enter a valid email'} />
                <FF label="Primary phone" value={f.phone} onChange={set('phone')} type="tel" ok={f.phone.length > 6} hint="Used for delivery & 2FA" />
                <FF label="Secondary phone" value={f.phone2} onChange={set('phone2')} type="tel" hint="Optional backup number" />
                <FF label="Emergency contact" value={f.emergency || ''} onChange={set('emergency')} hint="Name · number" />
              </div>
            </div>
          </section>

          {/* Address */}
          <section className="edit-section" id="address" ref={el => refs.current.address = el}>
            <div className="edit-section-head">
              <span className="es-ic" style={{ background: SECTIONS[2].tint }}><Icon name="map_pin" size={18} /></span>
              <div><h3>Address</h3><p>Billing & shipping — auto-complete as you type.</p></div>
            </div>
            <div className="p-card">
              <div className="form-grid">
                <FFSelect label="Country" value={f.country} onChange={set('country')} options={['United Kingdom', 'United States', 'France', 'Germany', 'India', 'Canada']} />
                <FF label="State / Province" value={f.state} onChange={set('state')} />
                <FF label="City" value={f.city} onChange={set('city')} required ok={f.city.length > 1} />
                <FF label="District" value={f.district} onChange={set('district')} />
                <FF label="Postal code" value={f.postal} onChange={set('postal')} required ok={f.postal.length > 2} affix={<Icon name="map_pin" size={15} style={{ color: 'var(--fg-soft)' }} />} />
                <FF label="Full street address" value={f.address} onChange={set('address')} span hint="Auto-completed from postal code" />
              </div>
            </div>
          </section>

          {/* Social */}
          <section className="edit-section" id="social" ref={el => refs.current.social = el}>
            <div className="edit-section-head">
              <span className="es-ic" style={{ background: SECTIONS[3].tint }}><Icon name="globe" size={18} /></span>
              <div><h3>Social</h3><p>Link the channels you want on your showcase.</p></div>
            </div>
            <div className="p-card">
              <div className="form-grid">
                <FF label="Website" value={f.website} onChange={set('website')} affix={<Icon name="globe" size={15} style={{ color: 'var(--fg-soft)' }} />} />
                <FF label="LinkedIn" value={f.linkedin} onChange={set('linkedin')} affix={<span style={{ fontSize: 11, color: 'var(--fg-soft)', fontWeight: 700 }}>in</span>} />
                <FF label="GitHub" value={f.github} onChange={set('github')} affix={<span className="font-mono" style={{ fontSize: 12, color: 'var(--fg-soft)' }}>{'{ }'}</span>} />
                <FF label="X (Twitter)" value={f.twitter} onChange={set('twitter')} affix={<span style={{ fontSize: 13, color: 'var(--fg-soft)' }}>𝕏</span>} />
                <FF label="Instagram" value={f.instagram} onChange={set('instagram')} hint="Optional" />
                <FF label="Facebook" value={f.facebook} onChange={set('facebook')} hint="Optional" />
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="edit-section" id="prefs" ref={el => refs.current.prefs = el}>
            <div className="edit-section-head">
              <span className="es-ic" style={{ background: SECTIONS[4].tint }}><Icon name="shield" size={18} /></span>
              <div><h3>Preferences</h3><p>Theme, language, notifications & privacy.</p></div>
            </div>
            <div className="p-card">
              <div className="form-grid" style={{ marginBottom: 8 }}>
                <FFSelect label="Theme" value={f.theme} onChange={set('theme')} options={['System', 'Light', 'Dark']} />
                <FFSelect label="Language" value={f.language} onChange={set('language')} options={['English (UK)', 'English (US)', 'Français', 'Deutsch', 'हिन्दी']} />
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 6 }}>
                <ETog icon="bell" t="Order updates" d="Shipping, delivery & returns" on />
                <ETog icon="sparkles" t="Product news" d="New drops & restocks" on />
                <ETog icon="mail" t="Marketing emails" d="Editorials & seasonal offers" />
                <ETog icon="eye" t="Public profile" d="Anyone can view your showcase" on />
                <ETog icon="zap" t="Show activity" d="Display recent orders & reviews" />
                <ETog icon="search" t="Searchable" d="Appear in member directory" on />
              </div>
            </div>
          </section>

          {/* Save bar */}
          <div className="save-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <ProgressRing value={completion} size={42} stroke={5} cap="" colors={['#7c3aed', '#ec4899']}>
                <span style={{ fontSize: 11, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{completion}</span>
              </ProgressRing>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{completion === 100 ? 'All set — ready to save' : `${completion}% complete`}</div>
                <div style={{ fontSize: 11, color: 'var(--fg-soft)' }}>{completion === 100 ? 'Everything required is filled in.' : `${tracked.length - filled} field${tracked.length - filled === 1 ? '' : 's'} left for a complete profile.`}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
              <button className="cta-edit" style={{ animation: 'none', height: 44 }} onClick={() => onPreview(f)}>
                <Icon name="eye" size={16} /> Preview &amp; save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ETog({ icon, t, d, on: initial }) {
  const [on, setOn] = useStateE(!!initial);
  return (
    <div className="pref-row">
      <span className="pref-ic"><Icon name={icon} size={16} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="pref-t">{t}</div>
        <div className="pref-d">{d}</div>
      </div>
      <button className={`switch ${on ? 'on' : ''}`} onClick={() => setOn(o => !o)} role="switch" aria-checked={on} />
    </div>
  );
}

window.ProfileEdit = ProfileEdit;
