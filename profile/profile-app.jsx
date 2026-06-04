/* global React, ReactDOM, Sidebar, AdminTopbar, CommandPalette, ProfileShowcase, ProfileEdit, PreviewModal,
   useTweaks, TweaksPanel, TweakSection, TweakRadio, Icon */

const { useState: useStateA, useEffect: useEffectA } = React;

const PROFILE_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "viewport": "desktop",
  "motion": "on"
}/*EDITMODE-END*/;

function ProfileApp() {
  const [t, setTweak] = useTweaks(PROFILE_DEFAULTS);
  const theme = t.theme;

  const [collapsed, setCollapsed] = useStateA(false);
  const [mobileNav, setMobileNav] = useStateA(false);
  const [cmdOpen, setCmdOpen] = useStateA(false);
  const [view, setView] = useStateA('showcase'); // showcase | edit
  const [preview, setPreview] = useStateA(false);
  const [toast, setToast] = useStateA(null);

  useEffectA(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);
  useEffectA(() => {
    document.documentElement.style.setProperty('--motion', t.motion === 'off' ? 'paused' : 'running');
    document.body.classList.toggle('motion-off', t.motion === 'off');
  }, [t.motion]);

  useEffectA(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(o => !o); }
      if (e.key === 'Escape') { setPreview(false); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffectA(() => { window.scrollTo({ top: 0 }); }, [view]);

  const openEdit = () => setView('edit');
  const backToShowcase = () => setView('showcase');
  const openPreview = () => setPreview(true);

  const onSaved = () => {
    setPreview(false);
    setView('showcase');
    setToast('Profile saved successfully');
    setTimeout(() => setToast(null), 3600);
  };

  const breadcrumb = view === 'edit'
    ? ['Halo Studio', 'Account', 'My profile', 'Edit']
    : ['Halo Studio', 'Account', 'My profile'];

  return (
    <div className={`profile-shell viewport-${t.viewport}`}>
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(c => !c)}
          active="profile"
          activeChild=""
          mobileOpen={mobileNav}
          onMobileClose={() => setMobileNav(false)}
        />

        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <AdminTopbar
            theme={theme}
            onThemeToggle={() => setTweak('theme', theme === 'dark' ? 'light' : 'dark')}
            onOpenSearch={() => setCmdOpen(true)}
            onOpenMobile={() => setMobileNav(true)}
            breadcrumb={breadcrumb}
          />

          <main className="profile-main">
            {view === 'showcase'
              ? <ProfileShowcase onEdit={openEdit} onPreview={openPreview} />
              : <ProfileEdit onCancel={backToShowcase} onPreview={openPreview} />}
          </main>
        </div>
      </div>

      {preview && <PreviewModal onClose={() => setPreview(false)} onSave={onSaved} />}

      {/* toast */}
      <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 300, pointerEvents: 'none' }}>
        {toast && (
          <div className="toast success" style={{ animation: 'slideUp 0.35s var(--ease-spring)' }}>
            <span className="toast-icon"><Icon name="check" size={16} strokeWidth={2.5} /></span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{toast}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 2 }}>Your changes are now live.</div>
            </div>
          </div>
        )}
      </div>

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} products={(window.HALO && window.HALO.PRODUCTS) || []} onAdd={() => setCmdOpen(false)} />

      <TweaksPanel>
        <TweakSection label="Theme">
          <TweakRadio label="Mode" value={t.theme} options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} onChange={v => setTweak('theme', v)} />
        </TweakSection>
        <TweakSection label="Viewport">
          <TweakRadio label="Device" value={t.viewport} options={[{ value: 'desktop', label: 'Desktop' }, { value: 'mobile', label: 'Mobile' }]} onChange={v => setTweak('viewport', v)} />
        </TweakSection>
        <TweakSection label="Motion">
          <TweakRadio label="Animations" value={t.motion} options={[{ value: 'on', label: 'On' }, { value: 'off', label: 'Reduced' }]} onChange={v => setTweak('motion', v)} />
        </TweakSection>
        <div style={{ padding: '8px 12px', fontSize: 11, color: 'var(--fg-soft)', lineHeight: 1.6 }}>
          <a href="admin.html" style={{ textDecoration: 'underline' }}>← Admin dashboard</a><br />
          <a href="index.html" style={{ textDecoration: 'underline' }}>Open storefront →</a>
        </div>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ProfileApp />);
