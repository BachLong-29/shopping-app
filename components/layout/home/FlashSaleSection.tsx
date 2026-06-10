'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/core/context/LanguageContext'
import { HALO_PRODUCTS, productGradient } from '@/lib/halo-data'
import { Badge } from '@/components/design-system'
import { formatNumber } from '@/core/utils/format'

function pad(n: number) { return String(n).padStart(2, '0') }

function Countdown() {
  const { t } = useLanguage()
  const [time, setTime] = useState({ h: 6, m: 14, s: 42 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(({ h, m, s }) => {
        if (s > 0) return { h, m, s: s - 1 }
        if (m > 0) return { h, m: m - 1, s: 59 }
        if (h > 0) return { h: h - 1, m: 59, s: 59 }
        return { h: 23, m: 59, s: 59 }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex gap-3">
      {([
        [t('home.flash_sale.hrs'), time.h],
        [t('home.flash_sale.min'), time.m],
        [t('home.flash_sale.sec'), time.s],
      ] as [string, number][]).map(([label, value]) => (
        <div key={label} className="w-[76px] h-[84px] flex flex-col items-center justify-center rounded-[14px] bg-white/8 border border-white/12 backdrop-blur-sm">
          <div className="font-mono text-3xl font-bold tabular-nums leading-none text-white">{pad(value)}</div>
          <div className="text-[9px] tracking-[0.15em] opacity-60 mt-1.5 text-white">{label}</div>
        </div>
      ))}
    </div>
  )
}

export default function FlashSaleSection() {
  const { t } = useLanguage()
  const flash = HALO_PRODUCTS.filter((p) => p.originalPrice).slice(0, 4)

  return (
    <section>
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="relative overflow-hidden rounded-[28px] p-[clamp(28px,4vw,48px)] text-white" style={{ background: 'linear-gradient(135deg, #1a0b2e 0%, #2d0a4e 40%, #4a0e63 100%)' }}>
          <div className="pointer-events-none absolute -top-10 right-[20%] h-72 w-72 rounded-full bg-halo-pink opacity-40 blur-[60px] animate-float" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-halo-amber opacity-35 blur-[60px] animate-float [animation-delay:2s]" />

          <div className="relative z-10">
            {/* Top row */}
            <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1.5 text-[11px] font-semibold tracking-[0.1em]">
                  <span className="h-1.5 w-1.5 rounded-full bg-halo-amber shadow-[0_0_0_4px_rgba(245,158,11,0.3)] animate-pulse" />
                  {t('home.flash_sale.badge')}
                </div>
                <h2 className="font-display text-[clamp(36px,5vw,60px)] font-normal mt-4 tracking-[-0.02em] leading-[1.05]">
                  {t('home.flash_sale.title_main')}{' '}
                  <span className="bg-[linear-gradient(90deg,#f59e0b,#ec4899)] bg-clip-text text-transparent">
                    {t('home.flash_sale.title_accent')}
                  </span>
                </h2>
                <p className="text-[15px] opacity-70 mt-2 max-w-md">
                  {t('home.flash_sale.sub')}
                </p>
              </div>
              <Countdown />
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {flash.map((p) => {
                const disc = Math.round((1 - p.price / (p.originalPrice ?? p.price)) * 100)
                const sold = 60 + p.seed * 4
                return (
                  <div key={p.id} className="group overflow-hidden rounded-[20px] bg-white/6 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
                    <div className="relative aspect-[4/3] overflow-hidden" style={productGradient(p.seed)}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-20 w-20 rounded-full bg-white/12" />
                      </div>
                      <div className="absolute top-2.5 left-2.5">
                        <Badge variant="sale">−{disc}%</Badge>
                      </div>
                    </div>
                    <div className="p-4 text-white">
                      <div className="text-[11px] opacity-60 uppercase tracking-[0.06em]">{p.brand}</div>
                      <div className="text-[14px] font-semibold mt-1 mb-3">{p.name}</div>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-[22px] font-bold">${formatNumber(p.price)}</span>
                        <span className="text-[13px] line-through opacity-50">${formatNumber(p.originalPrice)}</span>
                      </div>
                      <div className="mb-2.5">
                        <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${sold}%`, background: 'linear-gradient(90deg,#f59e0b,#ec4899)' }} />
                        </div>
                        <div className="text-[11px] opacity-70 mt-1.5">
                          {t('home.flash_sale.claimed', { pct: sold })}
                        </div>
                      </div>
                      <button className="w-full h-9 rounded-full bg-white text-[#1a0b2e] text-[13px] font-semibold hover:bg-white/90 transition-colors">
                        {t('home.flash_sale.buy_now')}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
