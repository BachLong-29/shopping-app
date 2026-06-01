'use client'

import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { HALO_PRODUCTS, HaloProduct } from '@/lib/halo-data'
import { useLanguage } from '@/core/context/LanguageContext'
import HaloProductCard from './HaloProductCard'

interface Props {
  sectionKey: string
  products?: HaloProduct[]
}

export default function HorizontalCarousel({ sectionKey, products }: Props) {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 300, behavior: 'smooth' })
  const items = products ?? HALO_PRODUCTS

  return (
    <section>
      <div className="max-w-[1400px] mx-auto px-6 py-14">
      {/* Header */}
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            <span className="h-px w-6 bg-muted-foreground" />
            {t(`home.${sectionKey}.eyebrow`)}
          </div>
          <h2 className="font-display text-[clamp(28px,3.5vw,48px)] font-normal leading-[1.05] tracking-[-0.02em]">
            {t(`home.${sectionKey}.title`)}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {t(`home.${sectionKey}.sub`)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll(-1)}
            aria-label={t('general.scroll_left')}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-muted hover:bg-accent transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label={t('general.scroll_right')}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-muted hover:bg-accent transition-colors"
          >
            <ChevronRight size={18} />
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
            {t(`home.${sectionKey}.view_all`)} <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={ref}
        className="flex gap-5 overflow-x-auto pb-2 scrollbar-none"
        style={{ scrollbarWidth: 'none', WebkitMaskImage: 'linear-gradient(90deg,black 0%,black 92%,transparent 100%)' } as React.CSSProperties}
      >
        {items.map((p) => (
          <div key={p.id} className="w-[260px] flex-shrink-0">
            <HaloProductCard product={p} />
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}
