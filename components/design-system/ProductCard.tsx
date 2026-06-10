'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from './Badge'
import { Stars } from './Stars'
import { formatNumber } from '@/core/utils/format'

interface ProductCardProps {
  image: string
  brand?: string
  name: string
  rating?: number
  reviewCount?: number
  price: number
  originalPrice?: number
  badges?: Array<{ label: string; variant?: React.ComponentProps<typeof Badge>['variant'] }>
  swatches?: string[]
  isWishlisted?: boolean
  onWishlist?: () => void
  onAddToCart?: () => void
  onQuickView?: () => void
  className?: string
}

function ProductCard({
  image,
  brand,
  name,
  rating,
  reviewCount,
  price,
  originalPrice,
  badges = [],
  swatches = [],
  isWishlisted,
  onWishlist,
  onAddToCart,
  onQuickView,
  className,
}: ProductCardProps) {
  return (
    <div
      className={cn(
        'group relative flex flex-col bg-card border border-border rounded-[20px] overflow-hidden',
        'transition-all duration-[400ms] ease-out',
        'hover:border-border/80 hover:shadow-lg hover:-translate-y-1',
        'before:absolute before:inset-0 before:rounded-[20px] before:pointer-events-none before:z-[1]',
        'before:bg-[radial-gradient(600px_circle_at_var(--mx,50%)_var(--my,50%),rgba(124,58,237,0.06),transparent_40%)]',
        'before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300',
        className
      )}
    >
      {/* Media */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
        />

        {/* Badges */}
        {badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-[2]">
            {badges.map((b, i) => (
              <Badge key={i} variant={b.variant ?? 'soft'}>{b.label}</Badge>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-[2] opacity-0 translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0">
          <button
            type="button"
            onClick={onWishlist}
            className={cn(
              'h-9 w-9 rounded-full flex items-center justify-center',
              'bg-white/70 backdrop-blur-md border border-white/60',
              'text-foreground transition-all duration-200 hover:bg-foreground hover:text-background hover:scale-105',
              isWishlisted && 'text-halo-rose'
            )}
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>
        </div>

        {/* Quick add */}
        <div className="absolute left-3 right-3 bottom-3 flex gap-2 z-[2] translate-y-[120%] transition-transform duration-[400ms] ease-out group-hover:translate-y-0">
          {onQuickView && (
            <button
              type="button"
              onClick={onQuickView}
              className="flex-1 h-9 rounded-full bg-white/80 backdrop-blur-md text-foreground text-xs font-semibold border border-white/60 hover:bg-white transition-colors"
            >
              Quick view
            </button>
          )}
          {onAddToCart && (
            <button
              type="button"
              onClick={onAddToCart}
              className="flex-1 h-9 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Add to bag
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-1.5 relative z-[2]">
        {brand && (
          <div className="text-[11px] text-muted-foreground uppercase tracking-[0.06em] font-medium">
            {brand}
          </div>
        )}
        <div className="text-[15px] font-semibold leading-[1.3] tracking-[-0.01em]">{name}</div>
        {rating !== undefined && (
          <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
            <Stars value={rating} size={12} />
            <span>{rating}</span>
            {reviewCount && <span>({reviewCount})</span>}
          </div>
        )}

        {swatches.length > 0 && (
          <div className="flex gap-1.5 mt-1">
            {swatches.map((color, i) => (
              <span
                key={i}
                className="h-4 w-4 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]"
                style={{ background: color }}
              />
            ))}
          </div>
        )}

        <div className="flex items-baseline gap-2 mt-1.5">
          <span className="text-[17px] font-bold tracking-[-0.02em]">${formatNumber(price)}</span>
          {originalPrice && (
            <span className="text-xs text-muted-foreground line-through">${formatNumber(originalPrice)}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export { ProductCard }
