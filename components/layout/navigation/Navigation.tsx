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

/* ─── HaloLogo ───────────────────────────────────────────────────── */
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
      <span className="font-display text-[26px] leading-none font-medium tracking-[-0.02em]">
        halo
      </span>
    </div>
  )
}

/* ─── SearchOverlay ──────────────────────────────────────────────── */
function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80)
    else setQuery('')
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const popular = ['Volta headphones', 'Cashmere sweater', 'Desk lamp', 'Smart ring', 'Yoga mat']

  return (
    <div
      className={cn(
        'fixed inset-0 z-[300] bg-background/96 backdrop-blur-md transition-all duration-200',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      )}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-foreground"
      >
        <X size={20} />
      </button>

      <div className="max-w-[600px] mx-auto px-5 pt-[15vh]">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`${t('action.search')}…`}
            className="w-full h-14 pl-12 pr-12 rounded-2xl bg-muted text-foreground text-base outline-none border-2 border-transparent focus:border-border transition-colors placeholder:text-muted-foreground"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="mt-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-3">
            Popular
          </p>
          <div className="flex flex-wrap gap-2">
            {popular.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="px-3.5 py-1.5 rounded-full bg-muted hover:bg-accent text-sm text-foreground transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── MegaPanel ──────────────────────────────────────────────────── */
function MegaPanel({ panel, onClose }: { panel: string; onClose: () => void }) {
  const data = MEGA_MENU[panel]
  if (!data) return null

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 right-0 bg-card border-t border-border shadow-xl z-50 animate-in fade-in-0 slide-in-from-top-2 duration-150"
    >
      <div
        className="max-w-[1400px] mx-auto px-8 py-9 grid gap-12"
        style={{ gridTemplateColumns: '1fr 260px' }}
      >
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: `repeat(${data.blocks.length}, 1fr)` }}
        >
          {data.blocks.map((block) => (
            <div key={block.title}>
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {block.title}
              </div>
              <ul className="flex flex-col gap-2">
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

        <div
          className="relative min-h-[180px] rounded-[18px] overflow-hidden"
          style={categoryGradient(data.featured.seed)}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute left-5 right-5 bottom-5 text-white">
            <div className="text-[10px] font-semibold tracking-[0.1em] opacity-85">{data.featured.tag}</div>
            <div className="font-display text-[22px] mt-1">{data.featured.title}</div>
            <div className="text-[13px] opacity-80 mt-0.5">{data.featured.sub}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── MobileBottomSheet ──────────────────────────────────────────── */
function MobileBottomSheet({
  open,
  onClose,
  userId,
  onSearch,
}: {
  open: boolean
  onClose: () => void
  userId?: string
  onSearch: () => void
}) {
  const userProfile = useSelector((state: RootState) => state.profile)
  const { t } = useLanguage()
  const navItems = Object.keys(MEGA_MENU)
  const touchStartY = useRef(0)

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches[0].clientY - touchStartY.current > 80) onClose()
  }

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-[199] bg-black/50 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
      />

      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className={cn(
          'fixed bottom-0 left-0 right-0 z-[200] bg-background rounded-t-[24px] flex flex-col',
          'transition-transform duration-[350ms] ease-[cubic-bezier(0.32,0.72,0,1)]',
          'max-h-[85dvh] shadow-[0_-8px_40px_rgba(0,0,0,0.18)]',
          open ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 shrink-0">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/25" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-2 pb-4 shrink-0">
          <HaloLogo />
          <button
            onClick={onClose}
            className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search shortcut */}
        <div className="px-5 pb-4 shrink-0">
          <button
            onClick={() => { onClose(); onSearch() }}
            className="w-full flex items-center gap-3 h-11 px-4 rounded-full bg-muted text-muted-foreground text-sm hover:bg-accent transition-colors"
          >
            <Search size={15} />
            <span>{t('action.search')}</span>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-5 border-t border-border">
          <ul>
            {navItems.map((item) => (
              <li key={item} className="border-b border-border/60 last:border-none">
                <button
                  className="w-full flex items-center justify-between py-4 text-[15px] font-medium text-foreground hover:text-halo-violet transition-colors"
                  onClick={onClose}
                >
                  <span className="flex items-center gap-2">
                    {item}
                    {item === 'Sale' && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-halo-rose text-white rounded-full leading-none">
                        HOT
                      </span>
                    )}
                  </span>
                  <span className="text-muted-foreground">›</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div
          className="px-5 pt-4 border-t border-border flex items-center gap-2 shrink-0"
          style={{ paddingBottom: 'max(20px, env(safe-area-inset-bottom))' }}
        >
          <ThemeToggle />
          <LanguageSwitcher />
          <div className="flex-1" />
          {userId ? (
            <UserDropdown userInfo={userProfile as any} isShorten onChangeAfterSelect={onClose} />
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="inline-flex items-center justify-center h-9 px-5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {t('action.sign_in')}
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

/* ─── Navigation ─────────────────────────────────────────────────── */
const Navigation = () => {
  const dispatch = useDispatch()
  const { t } = useLanguage()
  const userProfile = useSelector((state: RootState) => state.profile)
  const cartTotal = useSelector((state: RootState) => state.cart.total)

  const [scrolled, setScrolled] = useState(false)
  const [mega, setMega] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
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

  /* ⌘K / Ctrl+K shortcut */
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', handle)
    return () => document.removeEventListener('keydown', handle)
  }, [])

  /* Prevent body scroll when overlay is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen, searchOpen])

  function enterMega(key: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMega(key)
  }
  function leaveMega() {
    closeTimer.current = setTimeout(() => setMega(null), 120)
  }

  return (
    <>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ── Promo bar ── */}
      <div className="relative z-[51] flex h-9 items-center justify-center gap-3 bg-foreground px-4 text-background text-xs tracking-[0.01em]">
        <span className="h-1.5 w-1.5 rounded-full bg-halo-amber shadow-[0_0_0_4px_rgba(245,158,11,0.3)] animate-pulse" />
        <span>{t('nav.promo_text', { time: '06:14:42', min: '500k' })}</span>
        <span className="opacity-40">·</span>
        <a href="#" className="underline underline-offset-2 hover:opacity-80 transition-opacity">
          {t('nav.promo_cta')}
        </a>
      </div>

      {/* ── Main header ── */}
      <header
        onMouseLeave={leaveMega}
        className={cn(
          'sticky top-0 z-50 border-b transition-all duration-200',
          scrolled
            ? 'bg-background/85 backdrop-blur-xl border-border shadow-sm'
            : 'bg-background border-transparent',
        )}
      >
        <div
          className="max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center gap-2 transition-[height] duration-200"
          style={{ height: scrolled ? 58 : 68 }}
        >
          {/* Mobile: hamburger */}
          <button
            className="md:hidden h-9 w-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors shrink-0"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Logo */}
          <Link href="/" className="shrink-0 mr-2">
            <HaloLogo />
          </Link>

          {/* Desktop nav (lg+) */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                onMouseEnter={() => enterMega(item)}
                onClick={() => setMega(mega === item ? null : item)}
                className={cn(
                  'relative px-3.5 py-2 text-sm font-medium rounded-full transition-colors',
                  mega === item
                    ? 'text-foreground bg-muted'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/70',
                )}
              >
                {item}
                {item === 'Sale' && (
                  <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-halo-rose" />
                )}
              </button>
            ))}
          </nav>

          {/* Tablet nav (md–lg): compact */}
          <nav className="hidden md:flex lg:hidden items-center gap-0.5">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                onMouseEnter={() => enterMega(item)}
                onClick={() => setMega(mega === item ? null : item)}
                className={cn(
                  'relative px-2.5 py-1.5 text-xs font-medium rounded-full transition-colors',
                  mega === item
                    ? 'text-foreground bg-muted'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/70',
                )}
              >
                {item}
                {item === 'Sale' && (
                  <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-halo-rose" />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop search bar */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="hidden lg:flex flex-1 max-w-[300px] ml-3 items-center gap-3 h-9 px-4 rounded-full bg-muted hover:bg-accent text-muted-foreground text-sm transition-colors shrink-0"
            aria-label={t('action.search')}
          >
            <Search size={14} />
            <span className="flex-1 text-left">{t('action.search')}</span>
            <span className="flex items-center gap-1">
              <kbd className="inline-flex items-center h-5 px-1.5 rounded border border-border bg-background text-[10px] font-mono">⌘</kbd>
              <kbd className="inline-flex items-center h-5 px-1.5 rounded border border-border bg-background text-[10px] font-mono">K</kbd>
            </span>
          </button>

          <div className="flex-1" />

          {/* ─ Action icons ─ */}
          <div className="flex items-center gap-0.5">
            {/* Mobile search */}
            <button
              className="md:hidden h-9 w-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              onClick={() => setSearchOpen(true)}
              aria-label={t('action.search')}
            >
              <Search size={18} />
            </button>

            {/* Tablet search */}
            <button
              className="hidden md:flex lg:hidden h-9 w-9 items-center justify-center rounded-full hover:bg-muted transition-colors"
              onClick={() => setSearchOpen(true)}
              aria-label={t('action.search')}
            >
              <Search size={17} />
            </button>

            {/* Theme (md+) */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* Bell (desktop only) */}
            <button
              className="hidden lg:flex relative h-9 w-9 items-center justify-center rounded-full hover:bg-muted transition-colors"
              aria-label={t('nav.notifications')}
            >
              <Bell size={17} />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-halo-rose border-2 border-background" />
            </button>

            {/* Wishlist (md+) */}
            <button
              className="hidden md:flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted transition-colors"
              aria-label={t('module.wishlist')}
            >
              <Heart size={17} />
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative h-9 w-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              aria-label={t('module.cart')}
            >
              <ShoppingBag size={18} />
              {!!cartTotal && (
                <span className="absolute top-1.5 right-1.5 min-w-[14px] h-3.5 px-1 flex items-center justify-center rounded-full bg-halo-rose text-white text-[9px] font-bold leading-none">
                  {cartTotal}
                </span>
              )}
            </Link>

            {/* Language + User (md+) */}
            <div className="hidden md:flex items-center gap-1 ml-1">
              <LanguageSwitcher />
              {hasUser ? (
                <>
                  <div className="hidden lg:block">
                    <UserDropdown userInfo={userProfile as any} />
                  </div>
                  <div className="block lg:hidden">
                    <UserDropdown userInfo={userProfile as any} isShorten />
                  </div>
                </>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center h-9 px-4 rounded-full bg-muted text-sm font-medium hover:bg-accent transition-colors"
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

      {/* Mobile bottom sheet */}
      <MobileBottomSheet
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        userId={userProfile._id}
        onSearch={() => setSearchOpen(true)}
      />
    </>
  )
}

export default Navigation
