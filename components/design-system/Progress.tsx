import * as React from 'react'
import { cn } from '@/lib/utils'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  variant?: 'aurora' | 'emerald' | 'violet' | 'rose'
  shine?: boolean
  size?: 'sm' | 'default' | 'lg'
}

function Progress({ value, max = 100, variant = 'aurora', shine, size = 'default', className, ...props }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  const barColors: Record<string, string> = {
    aurora: 'bg-aurora',
    emerald: 'bg-halo-emerald',
    violet: 'bg-halo-violet',
    rose: 'bg-halo-rose',
  }

  const heights: Record<string, string> = {
    sm: 'h-1',
    default: 'h-2',
    lg: 'h-3',
  }

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemax={max}
      className={cn('w-full rounded-full bg-muted overflow-hidden relative', heights[size], className)}
      {...props}
    >
      <div
        className={cn('h-full rounded-full transition-[width] duration-500 ease-out relative', barColors[variant])}
        style={{ width: `${pct}%` }}
      >
        {shine && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shine" />
        )}
      </div>
    </div>
  )
}

export { Progress }
