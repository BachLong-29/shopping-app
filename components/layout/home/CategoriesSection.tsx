'use client'

import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/core/context/LanguageContext'
import { HALO_CATEGORIES, categoryGradient } from '@/lib/halo-data'

export default function CategoriesSection() {
  const { t } = useLanguage()

  return (
    <section>
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            <span className="h-px w-6 bg-muted-foreground" />
            {t('home.categories.eyebrow')}
          </div>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-normal leading-[1.05] tracking-[-0.02em]">
            {t('home.categories.title')}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground max-w-xl">
            {t('home.categories.sub')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {HALO_CATEGORIES.map((cat, i) => (
            <a
              key={cat.id}
              href="#"
              className="group relative aspect-[4/5] rounded-[20px] overflow-hidden cursor-pointer transition-all duration-[400ms] hover:-translate-y-1 hover:shadow-lg"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="absolute inset-0 transition-transform duration-[600ms] group-hover:scale-[1.06]" style={categoryGradient(cat.seed)} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-white/10" />
              <div className="absolute top-8 -left-6 h-28 w-28 rounded-full bg-white/8" />

              <div className="absolute left-5 right-5 bottom-5 flex items-end justify-between gap-2 text-white">
                <div>
                  <h3 className="text-[18px] font-semibold tracking-[-0.02em] leading-tight">{cat.name}</h3>
                  <div className="text-[11px] opacity-80 mt-0.5">
                    {t('home.categories.products_count', { count: cat.count })}
                  </div>
                </div>
                <div className="h-9 w-9 flex-shrink-0 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:text-[#1a1626] group-hover:-rotate-45">
                  <ArrowRight size={15} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
