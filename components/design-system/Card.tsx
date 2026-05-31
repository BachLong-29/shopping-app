import * as React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  padded?: boolean
}

function Card({ className, hover, padded, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-[20px]',
        'transition-all duration-300 ease-out',
        padded && 'p-6',
        hover && 'hover:-translate-y-0.5 hover:shadow-lg hover:border-border/80 cursor-pointer',
        className
      )}
      {...props}
    />
  )
}

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: React.ReactNode
  trend?: string
  trendUp?: boolean
  chart?: number[]
}

function StatCard({ label, value, trend, trendUp, chart, className, ...props }: StatCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[20px] p-6',
        'bg-[linear-gradient(135deg,#1a0b2e_0%,#2d0a4e_100%)] text-white',
        className
      )}
      {...props}
    >
      <div className="absolute -top-10 -right-10 h-44 w-44 rounded-full bg-halo-pink opacity-50 blur-[60px] pointer-events-none" />
      <div className="relative">
        <div className="text-[11px] opacity-70 uppercase tracking-[0.08em]">{label}</div>
        <div className="font-display text-[56px] leading-none mt-2">{value}</div>
        {trend && (
          <div className={cn('text-sm mt-2', trendUp ? 'text-emerald-300' : 'text-rose-300')}>
            {trendUp ? '↗' : '↘'} {trend}
          </div>
        )}
        {chart && (
          <div className="flex items-end gap-0.5 mt-5 h-9">
            {chart.map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="flex-1 bg-white/40 rounded-sm"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export { Card, StatCard }
