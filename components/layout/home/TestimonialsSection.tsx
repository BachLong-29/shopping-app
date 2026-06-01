'use client'

import { CheckCircle } from 'lucide-react'
import { COLOR_OPTIONS, HALO_TESTIMONIALS } from '@/lib/halo-data'
import { Stars } from '@/components/design-system'
import { useLanguage } from '@/core/context/LanguageContext'

const BRANDS = ['Dwell', 'Monocle', 'Wallpaper*', 'Cereal', 'Apartamento', 'Kinfolk']

export default function TestimonialsSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-muted/30 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              <span className="h-px w-6 bg-muted-foreground" />
              {t('home.testimonials.eyebrow')}
            </div>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-normal leading-[1.05] tracking-[-0.02em]">
              {t('home.testimonials.title')}
            </h2>
          </div>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HALO_TESTIMONIALS.map((testimonial, i) => {
            const c1 = COLOR_OPTIONS[testimonial.avatar].hex
            const c2 = COLOR_OPTIONS[(testimonial.avatar + 2) % 8].hex
            return (
              <div key={i} className="flex flex-col gap-4 p-6 bg-card border border-border rounded-[20px]">
                <div className="flex items-center justify-between">
                  <Stars value={5} size={16} />
                  <svg width={28} height={20} viewBox="0 0 28 20" fill="currentColor" className="text-halo-violet opacity-30" aria-hidden>
                    <path d="M0 20V10C0 4.5 4.5 0 10 0v4c-3.3 0-6 2.7-6 6h6v10H0zM16 20V10c0-5.5 4.5-10 10-10v4c-3.3 0-6 2.7-6 6h6v10H16z"/>
                  </svg>
                </div>
                <p className="text-[17px] leading-relaxed font-display tracking-[-0.01em] flex-1">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 mt-auto">
                  <div
                    className="h-10 w-10 rounded-full flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
                  />
                  <div>
                    <div className="text-[14px] font-semibold">{testimonial.name}</div>
                    <div className="text-[12px] text-muted-foreground">{testimonial.role}</div>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-[11px] text-halo-emerald font-medium">
                    <CheckCircle size={12} /> {t('home.testimonials.verified')}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Featured in */}
        <div className="mt-16 pt-10 border-t border-border">
          <div className="text-[11px] text-center text-muted-foreground uppercase tracking-[0.1em] mb-6">
            {t('home.testimonials.featured_in')}
          </div>
          <div className="flex flex-wrap items-center justify-around gap-6 opacity-50">
            {BRANDS.map((b) => (
              <span key={b} className="font-display text-[26px] tracking-[-0.03em]">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
