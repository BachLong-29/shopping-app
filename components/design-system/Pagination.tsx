'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
  siblingCount?: number
  className?: string
}

function buildRange(page: number, total: number, siblings: number): (number | '…')[] {
  const left = Math.max(2, page - siblings)
  const right = Math.min(total - 1, page + siblings)
  const pages: (number | '…')[] = [1]

  if (left > 2) pages.push('…')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < total - 1) pages.push('…')
  if (total > 1) pages.push(total)

  return pages
}

function Pagination({ page, totalPages, onChange, siblingCount = 1, className }: PaginationProps) {
  const pages = buildRange(page, totalPages, siblingCount)

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="h-9 w-9 rounded-full flex items-center justify-center bg-muted text-foreground hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-halo-violet"
        aria-label="Previous page"
      >
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`ellipsis-${i}`} className="w-9 text-center text-sm text-muted-foreground select-none">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p as number)}
            aria-current={page === p ? 'page' : undefined}
            className={cn(
              'h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-halo-violet',
              page === p
                ? 'bg-foreground text-background'
                : 'text-foreground hover:bg-muted'
            )}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="h-9 w-9 rounded-full flex items-center justify-center bg-muted text-foreground hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-halo-violet"
        aria-label="Next page"
      >
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </nav>
  )
}

export { Pagination }
