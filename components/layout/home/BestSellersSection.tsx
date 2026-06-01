'use client'

import { Plus } from 'lucide-react'
import { HALO_PRODUCTS, productGradient } from '@/lib/halo-data'
import { Stars } from '@/components/design-system'
import { useLanguage } from '@/core/context/LanguageContext'

export default function BestSellersSection() {
  const { t } = useLanguage()
  const top = [...HALO_PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 5)
  const days = t('home.best_sellers.days').split(',')

  return (
    <section>
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[400px_1fr]">

          {/* Left: sticky promo */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center gap-2 mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              <span className="h-px w-6 bg-muted-foreground" />
              {t('home.best_sellers.eyebrow')}
            </div>
            <h2 className="font-display text-[clamp(36px,4.5vw,56px)] font-normal leading-[1.0] tracking-[-0.02em]">
              {t('home.best_sellers.title')}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              {t('home.best_sellers.sub')}
            </p>
            <div className="flex gap-2 mt-6">
              <button className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity">
                {t('home.best_sellers.cta_primary')}
              </button>
              <button className="inline-flex items-center justify-center h-10 px-5 rounded-full text-sm font-medium hover:bg-muted transition-colors">
                {t('home.best_sellers.cta_secondary')}
              </button>
            </div>

            {/* Mini chart */}
            <div className="mt-10 rounded-[20px] bg-muted p-5">
              <div className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground mb-2">
                {t('home.best_sellers.this_week')}
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-5xl leading-none">+18%</span>
                <span className="text-[13px] font-semibold text-halo-emerald">
                  {t('home.best_sellers.vs_last_week')}
                </span>
              </div>
              <div className="flex items-end gap-0.5 mt-4 h-10">
                {[40, 52, 48, 64, 58, 78, 88].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      height: `${h}%`,
                      background: i === 6 ? 'linear-gradient(135deg,#7c3aed,#ec4899)' : 'hsl(var(--border))',
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
                {days.map((d) => <span key={d}>{d}</span>)}
              </div>
            </div>
          </div>

          {/* Right: product list */}
          <ol>
            {top.map((p, i) => (
              <li
                key={p.id}
                className="grid items-center gap-5 py-5 border-b border-border last:border-0"
                style={{ gridTemplateColumns: '56px 88px 1fr auto auto' }}
              >
                {/* Rank */}
                <span className="font-display text-[44px] text-border leading-none tabular-nums">0{i + 1}</span>

                {/* Thumbnail */}
                <div className="h-[88px] w-[88px] rounded-[10px] overflow-hidden" style={productGradient(p.seed)}>
                  <div className="w-full h-full flex items-center justify-center text-white text-[11px] font-medium tracking-wide opacity-80">
                    {p.name.split(' ').slice(-1)[0]}
                  </div>
                </div>

                {/* Info */}
                <div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-[0.06em]">{p.brand}</div>
                  <div className="text-[16px] font-semibold mt-0.5">{p.name}</div>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
                    <Stars value={p.rating} size={12} />
                    <span>{p.rating} · {p.reviews.toLocaleString()} {t('general.reviews')}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right hidden sm:block">
                  <div className="text-[18px] font-bold tabular-nums">${p.price}</div>
                  {p.originalPrice && (
                    <div className="text-xs text-muted-foreground line-through">${p.originalPrice}</div>
                  )}
                </div>

                {/* Add */}
                <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-border text-xs font-medium hover:bg-muted transition-colors">
                  <Plus size={12} /> {t('home.best_sellers.add')}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
