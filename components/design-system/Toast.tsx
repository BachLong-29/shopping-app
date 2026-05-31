'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const toastVariants = cva(
  'flex items-start gap-3 p-4 bg-card border border-border rounded-[14px] shadow-lg min-w-[280px] max-w-[360px]',
  {
    variants: {
      variant: {
        success: '',
        info: '',
        warning: '',
        error: '',
      },
    },
    defaultVariants: { variant: 'info' },
  }
)

const iconStyles: Record<string, string> = {
  success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  info: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300',
  warning: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
  error: 'bg-rose-50 text-halo-rose dark:bg-rose-950/40 dark:text-rose-300',
}

const defaultIcons: Record<string, React.ReactNode> = {
  success: (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  info: (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22a10 10 0 100-20 10 10 0 000 20zM12 16v-4M12 8h.01" />
    </svg>
  ),
  warning: (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" />
    </svg>
  ),
  error: (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" />
    </svg>
  ),
}

interface ToastProps extends VariantProps<typeof toastVariants> {
  title: string
  description?: string
  icon?: React.ReactNode
  onClose?: () => void
  className?: string
}

function Toast({ variant = 'info', title, description, icon, onClose, className }: ToastProps) {
  const v = variant ?? 'info'
  return (
    <div className={cn(toastVariants({ variant }), className)}>
      <div className={cn('h-8 w-8 flex-shrink-0 rounded-full flex items-center justify-center', iconStyles[v])}>
        {icon ?? defaultIcons[v]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold">{title}</div>
        {description && <div className="text-xs text-muted-foreground mt-0.5">{description}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
        >
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  children: React.ReactNode
  className?: string
}

function ToastContainer({ position = 'bottom-right', children, className }: ToastContainerProps) {
  const posClass = {
    'top-right': 'top-4 right-4 items-end',
    'top-left': 'top-4 left-4 items-start',
    'bottom-right': 'bottom-4 right-4 items-end',
    'bottom-left': 'bottom-4 left-4 items-start',
    'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
  }[position]

  return (
    <div className={cn('fixed z-[300] flex flex-col gap-2', posClass, className)}>
      {children}
    </div>
  )
}

export { Toast, ToastContainer }
