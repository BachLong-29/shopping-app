import * as React from 'react'
import { cn } from '@/lib/utils'

interface TooltipProps {
  content: React.ReactNode
  children: React.ReactElement
  side?: 'top' | 'bottom'
  className?: string
}

function Tooltip({ content, children, side = 'top', className }: TooltipProps) {
  return (
    <span className="relative inline-flex group">
      {children}
      <span
        className={cn(
          'pointer-events-none absolute left-1/2 -translate-x-1/2 z-50',
          'px-2.5 py-1.5 rounded-[6px]',
          'bg-foreground text-background text-[11px] font-medium whitespace-nowrap',
          'opacity-0 transition-all duration-200 ease-out',
          'group-hover:opacity-100',
          side === 'top'
            ? 'bottom-[calc(100%+8px)] translate-y-1 group-hover:translate-y-0 after:top-full after:border-t-foreground'
            : 'top-[calc(100%+8px)] -translate-y-1 group-hover:translate-y-0 after:bottom-full after:border-b-foreground',
          'after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2',
          'after:border-4 after:border-transparent',
          side === 'top' && 'after:top-full after:[border-top-color:hsl(var(--foreground))]',
          side === 'bottom' && 'after:bottom-full after:[border-bottom-color:hsl(var(--foreground))]',
          className
        )}
      >
        {content}
      </span>
    </span>
  )
}

interface KbdProps extends React.HTMLAttributes<HTMLSpanElement> {}

function Kbd({ children, className, ...props }: KbdProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center min-w-5 h-5 px-1.5',
        'font-mono text-[11px] font-medium rounded border border-border',
        'bg-muted text-muted-foreground leading-none',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export { Tooltip, Kbd }
