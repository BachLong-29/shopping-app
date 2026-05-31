'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface AccordionItem {
  title: React.ReactNode
  content: React.ReactNode
  value?: string
}

interface AccordionProps {
  items: AccordionItem[]
  defaultOpen?: number | string | null
  className?: string
  allowMultiple?: boolean
}

function Accordion({ items, defaultOpen = null, className, allowMultiple = false }: AccordionProps) {
  const [open, setOpen] = React.useState<Set<number>>(
    defaultOpen !== null ? new Set([typeof defaultOpen === 'number' ? defaultOpen : 0]) : new Set()
  )

  function toggle(idx: number) {
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) {
        next.delete(idx)
      } else {
        if (!allowMultiple) next.clear()
        next.add(idx)
      }
      return next
    })
  }

  return (
    <div className={cn('rounded-[14px] border border-border bg-card overflow-hidden', className)}>
      {items.map((item, i) => {
        const isOpen = open.has(i)
        return (
          <div key={i} className={cn(i > 0 && 'border-t border-border')}>
            <button
              type="button"
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between px-5 py-4 text-sm font-medium text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-halo-violet"
            >
              {item.title}
              <span
                className={cn(
                  'ml-4 flex-shrink-0 h-4 w-4 text-muted-foreground transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                  isOpen && 'rotate-45'
                )}
                aria-hidden
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export { Accordion }
