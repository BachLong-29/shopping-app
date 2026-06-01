'use client'

import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { HALO_PRODUCTS } from '@/lib/halo-data'
import { useLanguage } from '@/core/context/LanguageContext'
import HaloProductCard from './HaloProductCard'

const TAB_KEYS = [
  { key: 'all',       cat: null },
  { key: 'audio',     cat: 'audio' },
  { key: 'home',      cat: 'home' },
  { key: 'workspace', cat: 'workspace' },
  { key: 'wearables', cat: 'wearables' },
]

export default function FeaturedProductsSection() {
  const { t } = useLanguage()
  const [activeKey, setActiveKey] = useState('all')

  const filtered = activeKey === 'all'
    ? HALO_PRODUCTS
    : HALO_PRODUCTS.filter((p) => p.category === activeKey)

  return (
    <section>
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              <span className="h-px w-6 bg-muted-foreground" />
              {t('home.featured.eyebrow')}
            </div>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-normal leading-[1.05] tracking-[-0.02em]">
              {t('home.featured.title')}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              {t('home.featured.sub')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Pill tabs */}
            <div className="hidden sm:inline-flex bg-muted rounded-full p-1 gap-0.5">
              {TAB_KEYS.map(({ key }) => (
                <button
                  key={key}
                  onClick={() => setActiveKey(key)}
                  className={cn(
                    'px-4 py-2 rounded-full text-xs font-medium transition-all duration-200',
                    activeKey === key
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {t(`home.featured.tab_${key}`)}
                </button>
              ))}
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
              {t('home.featured.view_all', { count: 312 })} <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.slice(0, 8).map((p, i) => (
            <div key={p.id} className="animate-reveal-up" style={{ animationDelay: `${i * 60}ms` }}>
              <HaloProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
