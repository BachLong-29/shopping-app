/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Bell, Heart, Menu, Search, ShoppingBag, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { MEGA_MENU, categoryGradient } from '@/lib/halo-data'
import { useLanguage } from '@/core/context/LanguageContext'
import authService from '@/core/services/authService'
import { setUser } from '@/redux/reducer/profileReducer'
import { RootState } from '@/redux/store/store'
import cartService from '@/app/cart/services/cartServices'
import { setTotal } from '@/redux/reducer/cartReducer'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import UserDropdown from './UserPopover'

/* ─── HaloLogo ─────────────────────────────────────────── */
function HaloLogo({ size = 22 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id="halo-nav" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="55%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="9" fill="none" stroke="url(#halo-nav)" strokeWidth="2.5" />
        <circle cx="12" cy="12" r="3.2" fill="url(#halo-nav)" />
      </svg>
      <span className="font-display text-[26px] leading-none font-medium tracking-[-0.02em]">halo</span>
    </div>
  )
}

/* ─── MegaMenu panel ─────────────────────────────────────── */
function MegaPanel({ panel, onClose }: { panel: string; onClose: () => void }) {
  const data = MEGA_MENU[panel]
  if (!data) return null
  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 right-0 bg-card border-t border-border shadow-lg z-50 animate-in fade-in-0 slide-in-from-top-2 duration-150"
    >
      <div className="max-w-[1400px] mx-auto px-8 py-9 grid gap-12" style={{ gridTemplateColumns: '1fr 280px' }}>
        <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${data.blocks.length}, 1fr)` }}>
          {data.blocks.map((block) => (
            <div key={block.title}>
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {block.title}
              </div>
              <ul className="flex flex-col gap-2.5">
                {block.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-foreground hover:text-halo-violet transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="relative min-h-[200px] rounded-[20px] overflow-hidden" style={categoryGradient(data.featured.seed)}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute left-5 right-5 bottom-5 text-white">
            <div className="text-[10px] font-semibold tracking-[0.1em] opacity-85">{data.featured.tag}</div>
            <div className="font-display text-[26px] mt-1">{data.featured.title}</div>
            <div className="text-[13px] opacity-85 mt-0.5">{data.featured.sub}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Mobile Drawer ─────────────────────────────────────── */
function MobileDrawer({
  open,
  onClose,
  userId,
}: {
  open: boolean
  onClose: () => void
  userId?: string
}) {
  const userProfile = useSelector((state: RootState) => state.profile)
  const { t } = useLanguage()
  const navItems = Object.keys(MEGA_MENU)

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[199] bg-black/40 backdrop-blur-sm" onClick={onClose} />
      )}
      <aside
        className={cn(
          'fixed left-0 top-0 bottom-0 z-[200] w-[min(360px,90vw)] bg-background flex flex-col',
          'transition-transform duration-[400ms] ease-out',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <HaloLogo />
          <button onClick={onClose} className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-muted">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <ul>
            {navItems.map((item) => (
              <li key={item} className="flex items-center justify-between py-3 border-b border-border text-[16px] font-medium">
                {item}
                <span className="text-muted-foreground">›</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5 border-t border-border flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
          {userId ? (
            <UserDropdown userInfo={userProfile as any} isShorten onChangeAfterSelect={onClose} />
          ) : (
            <Link href="/login" onClick={onClose} className="flex-1 inline-flex items-center justify-center h-10 rounded-full bg-foreground text-background text-sm font-semibold">
              {t('action.sign_in')}
            </Link>
          )}
        </div>
      </aside>
    </>
  )
}

/* ─── Navigation (main export) ──────────────────────────── */
const Navigation = () => {
  const dispatch = useDispatch()
  const { t } = useLanguage()
  const userProfile = useSelector((state: RootState) => state.profile)
  const cartTotal = useSelector((state: RootState) => state.cart.total)

  const [scrolled, setScrolled] = useState(false)
  const [mega, setMega] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const hasUser = useMemo(() => !!userProfile._id, [userProfile._id])
  const navItems = Object.keys(MEGA_MENU)

  /* Auth bootstrap */
  useEffect(() => {
    const load = async () => {
      const info = await authService.me()
      dispatch(setUser(info.user))
    }
    if (!userProfile._id) load().catch(() => {})
  }, [])

  /* Cart total */
  useEffect(() => {
    if (!userProfile._id) return
    cartService.getTotal(userProfile._id).then((v) => dispatch(setTotal(v))).catch(() => {})
  }, [userProfile._id])

  /* Scroll shrink */
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  function enterMega(key: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMega(key)
  }
  function leaveMega() {
    closeTimer.current = setTimeout(() => setMega(null), 120)
  }

  return (
    <>
      {/* ── Promo bar ── */}
      <div className="relative z-51 flex h-9 items-center justify-center gap-4 bg-foreground px-4 text-background text-xs tracking-[0.01em]">
        <span className="h-1.5 w-1.5 rounded-full bg-halo-amber shadow-[0_0_0_4px_rgba(245,158,11,0.3)] animate-pulse" />
        <span>{t('nav.promo_text', { time: '06:14:42', min: '500k' })}</span>
        <span className="opacity-50">·</span>
        <a href="#" className="underline cursor-pointer">{t('nav.promo_cta')}</a>
      </div>

      {/* ── Main header ── */}
      <header
        onMouseLeave={leaveMega}
        className={cn(
          'sticky top-0 z-50 border-b transition-all duration-200',
          scrolled
            ? 'bg-background/70 backdrop-blur-xl border-border'
            : 'bg-background border-transparent',
        )}
      >
        <div
          className="max-w-[1400px] mx-auto px-6 flex items-center gap-8 transition-[height] duration-200"
          style={{ height: scrolled ? 64 : 76 }}
        >
          {/* Mobile hamburger */}
          <button
            className="lg:hidden h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted"
            onClick={() => setMobileOpen(true)}
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <HaloLogo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 ml-2">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                onMouseEnter={() => enterMega(item)}
                onClick={() => enterMega(item)}
                className={cn(
                  'relative px-3.5 py-2 text-sm font-medium rounded-full transition-colors',
                  mega === item ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item}
                {item === 'Sale' && (
                  <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-halo-rose" />
                )}
              </button>
            ))}
          </nav>

          {/* Search bar */}
          <button
            type="button"
            className="hidden lg:flex flex-1 max-w-sm ml-auto items-center gap-3 h-10 px-3.5 rounded-full bg-muted text-muted-foreground text-sm hover:bg-accent transition-colors"
            aria-label={t('action.search')}
          >
            <Search size={15} />
            <span>{t('action.search')}</span>
            <span className="ml-auto flex gap-1">
              <kbd className="inline-flex items-center h-5 px-1.5 rounded border border-border bg-card text-[10px] font-mono">⌘</kbd>
              <kbd className="inline-flex items-center h-5 px-1.5 rounded border border-border bg-card text-[10px] font-mono">K</kbd>
            </span>
          </button>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-auto lg:ml-0">
            {/* Mobile search */}
            <button className="lg:hidden h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted" aria-label="Search">
              <Search size={18} />
            </button>

            <div className="hidden lg:flex items-center gap-1">
              <ThemeToggle />
              {/* Notification bell */}
              <button className="relative h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors" aria-label={t('nav.notifications')}>
                <Bell size={18} />
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-halo-rose border-2 border-background" />
              </button>
            </div>

            {/* Wishlist */}
            <button className="relative h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors" aria-label={t('module.wishlist')}>
              <Heart size={18} />
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors" aria-label={t('module.cart')}>
              <ShoppingBag size={18} />
              {!!cartTotal && (
                <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 flex items-center justify-center rounded-full bg-halo-rose text-white text-[10px] font-bold leading-none">
                  {cartTotal}
                </span>
              )}
            </Link>

            {/* User / language */}
            <div className="hidden lg:flex items-center gap-1">
              <LanguageSwitcher />
              {hasUser ? (
                <UserDropdown userInfo={userProfile as any} />
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center h-10 px-4 rounded-full bg-muted text-sm font-medium hover:bg-accent transition-colors"
                >
                  {t('action.sign_in')}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mega menu */}
        {mega && <MegaPanel panel={mega} onClose={() => setMega(null)} />}
      </header>

      {/* Mobile drawer */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} userId={userProfile._id} />
    </>
  )
}

export default Navigation
