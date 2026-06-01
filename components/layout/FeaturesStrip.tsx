'use client'

import { Package, RotateCcw, ShieldCheck, Zap } from 'lucide-react'
import { useLanguage } from '@/core/context/LanguageContext'

export default function FeaturesStrip() {
  const { t } = useLanguage()

  const features = [
    { icon: Package,    titleKey: 'home.features.shipping_title', subKey: 'home.features.shipping_sub' },
    { icon: RotateCcw,  titleKey: 'home.features.returns_title',  subKey: 'home.features.returns_sub' },
    { icon: ShieldCheck,titleKey: 'home.features.payment_title',  subKey: 'home.features.payment_sub' },
    { icon: Zap,        titleKey: 'home.features.delivery_title', subKey: 'home.features.delivery_sub' },
  ]

  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-6 px-6 py-5 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.titleKey} className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] bg-muted text-foreground">
              <f.icon size={18} strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-sm font-semibold">{t(f.titleKey)}</div>
              <div className="text-xs text-muted-foreground">{t(f.subKey)}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
