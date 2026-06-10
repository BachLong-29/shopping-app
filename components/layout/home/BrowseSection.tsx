'use client'

import { useState } from 'react'
import { Filter, Grid, List, Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { HALO_CATEGORIES, HALO_PRODUCTS, productGradient } from '@/lib/halo-data'
import { useLanguage } from '@/core/context/LanguageContext'
import { formatNumber } from '@/core/utils/format'
import HaloProductCard from './HaloProductCard'
import { Stars } from '@/components/design-system'

const BRANDS = ['Aether', 'North&Co', 'Mono Studio', 'Hara', 'Field Lab', 'Lumi']
const SORT_KEYS = ['featured', 'newest', 'price_asc', 'price_desc', 'top_rated'] as const
type SortKey = typeof SORT_KEYS[number]

export default function BrowseSection() {
  const { t } = useLanguage()
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [sort, setSort] = useState<SortKey>('featured')
  const [selCats, setSelCats] = useState<string[]>([])
  const [priceMax, setPriceMax] = useState(400)
  const [minRating, setMinRating] = useState(0)
  const [filterOpen, setFilterOpen] = useState(false)

  const filtered = HALO_PRODUCTS.filter((p) => {
    if (selCats.length > 0 && !selCats.includes(p.category)) return false
    if (p.price > priceMax) return false
    if (p.rating < minRating) return false
    return true
  })

  function toggleCat(id: string) {
    setSelCats((v) => v.includes(id) ? v.filter((c) => c !== id) : [...v, id])
  }

  return (
    <section className="bg-card border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        {/* Section header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            <span className="h-px w-6 bg-muted-foreground" />
            {t('home.browse.eyebrow')}
          </div>
          <h2 className="font-display text-[clamp(28px,4vw,48px)] font-normal leading-[1.05] tracking-[-0.02em]">
            {t('home.browse.title')}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {t('home.browse.sub')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">

          {/* Filter rail */}
          <aside className={cn(
            'lg:static lg:block',
            'fixed inset-0 z-[200] bg-background overflow-y-auto p-5 transition-transform duration-300',
            'lg:translate-x-0 lg:bg-transparent lg:p-0 lg:rounded-[20px] lg:border lg:border-border lg:p-5',
            filterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          )}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[16px] font-semibold flex items-center gap-2">
                <Filter size={16} /> {t('home.browse.filters_title')}
              </h3>
              <button className="lg:hidden h-8 w-8 flex items-center justify-center rounded-full hover:bg-muted" onClick={() => setFilterOpen(false)}>
                <X size={16} />
              </button>
            </div>

            {/* Active chips */}
            {selCats.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {selCats.map((c) => {
                  const name = HALO_CATEGORIES.find((cat) => cat.id === c)?.name ?? c
                  return (
                    <button
                      key={c}
                      onClick={() => toggleCat(c)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-foreground text-background text-[11px] font-medium"
                    >
                      {name} <X size={10} />
                    </button>
                  )
                })}
              </div>
            )}

            {/* Category filter */}
            <div className="border-t border-border pt-4 pb-2">
              <div className="text-[13px] font-semibold mb-3">{t('home.browse.filter_category')}</div>
              {HALO_CATEGORIES.map((c) => (
                <label key={c.id} className="flex items-center gap-3 py-2 px-1 rounded-[6px] cursor-pointer hover:bg-muted text-[13px]">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selCats.includes(c.id)}
                    onChange={() => toggleCat(c.id)}
                  />
                  <span className={cn(
                    'h-[18px] w-[18px] rounded border flex items-center justify-center transition-colors',
                    selCats.includes(c.id) ? 'bg-foreground border-foreground' : 'border-border',
                  )}>
                    {selCats.includes(c.id) && (
                      <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                    )}
                  </span>
                  <span className="flex-1">{c.name}</span>
                  <span className="text-muted-foreground text-[11px]">{c.count}</span>
                </label>
              ))}
            </div>

            {/* Price */}
            <div className="border-t border-border pt-4 pb-2">
              <div className="text-[13px] font-semibold mb-3">
                {t('home.browse.filter_price', { price: priceMax })}
              </div>
              <input
                type="range" min={0} max={400} value={priceMax}
                onChange={(e) => setPriceMax(+e.target.value)}
                className="w-full accent-foreground"
              />
            </div>

            {/* Rating */}
            <div className="border-t border-border pt-4 pb-2">
              <div className="text-[13px] font-semibold mb-3">{t('home.browse.filter_rating')}</div>
              {[5, 4, 3, 2].map((r) => (
                <label key={r} className="flex items-center gap-3 py-2 px-1 rounded-[6px] cursor-pointer hover:bg-muted text-[13px]">
                  <input type="radio" name="rating" className="sr-only" checked={minRating === r} onChange={() => setMinRating(r)} />
                  <span className={cn('h-[18px] w-[18px] rounded-full border flex items-center justify-center transition-colors', minRating === r ? 'border-foreground' : 'border-border')}>
                    {minRating === r && <span className="h-2 w-2 rounded-full bg-foreground" />}
                  </span>
                  <Stars value={r} size={12} /> <span>{t('home.browse.and_up')}</span>
                </label>
              ))}
            </div>

            {/* Brands */}
            <div className="border-t border-border pt-4">
              <div className="text-[13px] font-semibold mb-3">{t('home.browse.filter_brand')}</div>
              {BRANDS.map((b) => (
                <div key={b} className="py-2 px-1 text-[13px] text-muted-foreground hover:text-foreground cursor-pointer">{b}</div>
              ))}
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="text-[13px] text-muted-foreground">
                {t('home.browse.products_count', { count: filtered.length })}
              </div>
              <div className="flex items-center gap-2">
                {/* Mobile filter toggle */}
                <button className="lg:hidden inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-border text-[13px] font-medium" onClick={() => setFilterOpen(true)}>
                  <Filter size={14} /> {t('home.browse.filters_btn')}
                </button>
                {/* View toggle */}
                <div className="inline-flex bg-muted rounded-full p-1 gap-0.5">
                  {(['grid', 'list'] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={cn('h-8 w-8 flex items-center justify-center rounded-full transition-all', view === v ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground')}
                    >
                      {v === 'grid' ? <Grid size={14} /> : <List size={14} />}
                    </button>
                  ))}
                </div>
                {/* Sort */}
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="h-9 px-3 rounded-[10px] border border-border bg-card text-[13px] font-medium focus:outline-none"
                >
                  {SORT_KEYS.map((key) => (
                    <option key={key} value={key}>{t(`home.browse.sort_${key}`)}</option>
                  ))}
                </select>
              </div>
            </div>

            {view === 'grid' ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p, i) => (
                  <div key={p.id} className="animate-reveal-up" style={{ animationDelay: `${i * 40}ms` }}>
                    <HaloProductCard product={p} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map((p) => (
                  <div
                    key={p.id}
                    className="grid items-center gap-5 p-4 bg-card border border-border rounded-[14px]"
                    style={{ gridTemplateColumns: '120px 1fr auto' }}
                  >
                    <div className="h-[100px] w-[100px] rounded-[10px] overflow-hidden" style={productGradient(p.seed)}>
                      <div className="w-full h-full flex items-center justify-center text-white/80 text-[11px] font-medium">
                        {p.name.split(' ').slice(-1)[0]}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-muted-foreground uppercase tracking-[0.06em]">{p.brand}</div>
                      <div className="text-[16px] font-semibold mt-0.5">{p.name}</div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Stars value={p.rating} size={12} />
                        <span>{p.rating} · {p.reviews.toLocaleString()} {t('general.reviews')}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-[18px] font-bold">${formatNumber(p.price)}</div>
                      <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-foreground text-background text-xs font-semibold">
                        <Plus size={12} /> {t('home.best_sellers.add')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
