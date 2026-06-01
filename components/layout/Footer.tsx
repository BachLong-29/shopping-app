'use client'

import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/core/context/LanguageContext'

const SOCIAL = [
  { name: 'Instagram', d: 'M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zM12 8a4 4 0 100 8 4 4 0 000-8zM17.5 6.5h.01' },
  { name: 'Twitter',   d: 'M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 00.497-3.753C20.18 7.773 21.692 5.25 22 4.009z' },
  { name: 'TikTok',    d: 'M9 12a4 4 0 104 4V4a5 5 0 005 5' },
]

const PAYMENTS = ['VISA', 'MC', 'AMEX', 'PAYPAL', 'KLARNA', 'MOMO', 'VNPAY']

function HaloLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width={22} height={22} viewBox="0 0 24 24" aria-hidden>
        <defs>
          <linearGradient id="halo-footer" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="55%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="9" fill="none" stroke="url(#halo-footer)" strokeWidth="2.5" />
        <circle cx="12" cy="12" r="3.2" fill="url(#halo-footer)" />
      </svg>
      <span className="font-display text-[26px] leading-none font-medium tracking-[-0.02em]">halo</span>
    </div>
  )
}

export default function Footer() {
  const pathname = usePathname()
  const { t, tArr } = useLanguage()

  if (pathname.startsWith('/my-task')) return null

  const COLS = [
    { titleKey: 'footer.cols.shop',    items: tArr('footer.shop_items') },
    { titleKey: 'footer.cols.help',    items: tArr('footer.help_items') },
    { titleKey: 'footer.cols.studio',  items: tArr('footer.studio_items') },
    { titleKey: 'footer.cols.connect', items: tArr('footer.connect_items') },
  ]

  return (
    <footer className="bg-card border-t border-border pt-16">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.6fr]">
          {/* Brand column */}
          <div className="max-w-xs">
            <HaloLogo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t('footer.tagline')}
            </p>
            <div className="mt-6">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                {t('footer.get_app')}
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 rounded-[10px] bg-foreground text-background px-3.5 py-2.5 text-[13px] font-medium">
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M17.05 20.28c-.98.95-2.05.86-3.08.42-1.09-.45-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.42C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                  {t('footer.app_store')}
                </button>
                <button className="flex items-center gap-2 rounded-[10px] bg-muted text-foreground px-3.5 py-2.5 text-[13px] font-medium">
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M3.6 1.5l13.5 12L3.6 22.5V1.5z"/></svg>
                  {t('footer.play_store')}
                </button>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLS.map((col) => (
              <div key={col.titleKey}>
                <div className="mb-3 text-[13px] font-semibold">{t(col.titleKey)}</div>
                <ul className="flex flex-col gap-2">
                  {col.items.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact + payments */}
        <div className="mt-12 flex flex-wrap items-start gap-10 py-8 border-t border-border">
          <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><MapPin size={13} /> {t('footer.address')}</div>
            <div className="flex items-center gap-2"><Phone size={13} /> {t('footer.phone')}</div>
            <div className="flex items-center gap-2"><Mail size={13} /> {t('footer.email')}</div>
          </div>
          <div className="ml-auto flex flex-col gap-3">
            <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
              {t('footer.payment_methods')}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PAYMENTS.map((p) => (
                <div key={p} className="inline-flex items-center h-7 px-2.5 rounded border border-border bg-muted text-[10px] font-bold tracking-[0.04em]">
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-border">
          <div className="text-[12px] text-muted-foreground">
            {t('footer.copyright')} ·{' '}
            {tArr('footer.legal_items').map((label, i, arr) => (
              <span key={label}>
                <a href="#" className="underline cursor-pointer hover:text-foreground transition-colors">{label}</a>
                {i < arr.length - 1 && ' · '}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            {SOCIAL.map((s) => (
              <a
                key={s.name}
                href="#"
                aria-label={s.name}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-muted hover:bg-accent transition-colors"
              >
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
