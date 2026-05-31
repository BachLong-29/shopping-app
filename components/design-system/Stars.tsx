import * as React from 'react'
import { cn } from '@/lib/utils'

interface StarsProps {
  value?: number
  max?: number
  size?: number
  className?: string
}

function Stars({ value = 5, max = 5, size = 14, className }: StarsProps) {
  const full = Math.floor(value)
  const hasHalf = value - full >= 0.5

  return (
    <span
      className={cn('inline-flex gap-0.5 text-halo-amber', className)}
      aria-label={`${value} out of ${max} stars`}
    >
      {Array.from({ length: max }).map((_, i) => {
        const id = `half-${i}-${size}`
        if (i < full) {
          return (
            <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          )
        }
        if (i === full && hasHalf) {
          return (
            <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <defs>
                <linearGradient id={id}>
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="currentColor" stopOpacity="0.18" />
                </linearGradient>
              </defs>
              <path fill={`url(#${id})`} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          )
        }
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path fillOpacity="0.2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        )
      })}
    </span>
  )
}

export { Stars }
