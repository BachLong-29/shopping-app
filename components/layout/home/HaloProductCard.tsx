'use client'

import { Eye, Heart } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Badge, Stars } from '@/components/design-system'
import { COLOR_OPTIONS, HaloProduct, productGradient } from '@/lib/halo-data'
import { useLanguage } from '@/core/context/LanguageContext'
import { formatNumber } from '@/core/utils/format'

export default function HaloProductCard({ product }: { product: HaloProduct }) {
  const { t } = useLanguage()
  const [wished, setWished] = useState(false)

  const badgeVariant = ({
    sale:    'sale',
    new:     'new',
    hot:     'hot',
    limited: 'limited',
  } as Record<string, string>)[product.badge ?? ''] as 'sale' | 'new' | 'hot' | 'limited' | undefined

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[20px] border border-border bg-card',
        'transition-all duration-[400ms] ease-out hover:-translate-y-1 hover:border-border/80 hover:shadow-lg',
        'before:pointer-events-none before:absolute before:inset-0 before:rounded-[20px] before:z-[1]',
        'before:bg-[radial-gradient(600px_circle_at_var(--mx,50%)_var(--my,50%),rgba(124,58,237,0.06),transparent_40%)]',
        'before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300',
      )}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
      }}
    >
      {/* Media */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-[600ms] ease-out group-hover:scale-105" style={productGradient(product.seed)}>
          {/* Decorative circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-28 w-28 rounded-full bg-white/12" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-white/18" />
          </div>
          {/* Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="text-[10px] font-mono font-medium tracking-[0.12em] uppercase opacity-80">{product.brand}</div>
            <div className="mt-1 text-[16px] font-semibold tracking-[-0.01em]">{product.name.split(' ').slice(-1)[0]}</div>
          </div>
        </div>

        {/* Badges */}
        {badgeVariant && (
          <div className="absolute top-3 left-3 z-[2]">
            <Badge variant={badgeVariant}>{product.badgeText ?? product.badge?.toUpperCase()}</Badge>
          </div>
        )}

        {/* Hover actions */}
        <div className="absolute top-3 right-3 z-[2] flex flex-col gap-1.5 translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <button
            onClick={() => setWished((v) => !v)}
            className={cn(
              'h-9 w-9 flex items-center justify-center rounded-full border border-white/60 bg-white/70 backdrop-blur-md text-foreground transition-all hover:bg-foreground hover:text-background',
              wished && 'text-halo-rose',
            )}
          >
            <Heart size={14} fill={wished ? 'currentColor' : 'none'} />
          </button>
          <button className="h-9 w-9 flex items-center justify-center rounded-full border border-white/60 bg-white/70 backdrop-blur-md text-foreground transition-all hover:bg-foreground hover:text-background">
            <Eye size={14} />
          </button>
        </div>

        {/* Quick-add */}
        <div className="absolute bottom-3 left-3 right-3 z-[2] translate-y-[120%] transition-transform duration-[400ms] group-hover:translate-y-0">
          <button className="flex w-full items-center justify-center gap-1.5 h-9 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity">
            {t('home.featured.add_to_bag', { price: product.price })}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="relative z-[2] flex flex-col gap-1.5 p-4">
        <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground">{product.brand}</div>
        <div className="text-[15px] font-semibold leading-[1.3] tracking-[-0.01em] line-clamp-2">{product.name}</div>

        <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
          <Stars value={product.rating} size={12} />
          <span>{product.rating}</span>
          <span>({product.reviews.toLocaleString()})</span>
        </div>

        {product.colors.length > 0 && (
          <div className="flex gap-1.5 mt-1">
            {product.colors.slice(0, 5).map((i) => (
              <span key={i} className="h-3.5 w-3.5 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]" style={{ background: COLOR_OPTIONS[i].hex }} />
            ))}
          </div>
        )}

        <div className="flex items-baseline gap-2 mt-1.5">
          <span className="text-[17px] font-bold tracking-[-0.02em]">${formatNumber(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">${formatNumber(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </article>
  )
}
