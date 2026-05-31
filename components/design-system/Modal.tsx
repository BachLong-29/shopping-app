'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  maxWidth?: string
}

function Modal({ open, onClose, children, className, maxWidth = 'max-w-lg' }: ModalProps) {
  React.useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-5 bg-[rgba(10,8,15,0.55)] backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={cn(
          'relative bg-card border border-border rounded-[28px] shadow-xl w-full',
          'animate-in slide-in-from-bottom-4 zoom-in-95 duration-300',
          maxWidth,
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  onClose?: () => void
}

function ModalHeader({ icon, onClose, children, className, ...props }: ModalHeaderProps) {
  return (
    <div className={cn('p-6 pb-0', className)} {...props}>
      {icon && (
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-aurora text-white">
          {icon}
        </div>
      )}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
        >
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
      {children}
    </div>
  )
}

function ModalBody({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  )
}

function ModalFooter({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center justify-end gap-2 px-6 pb-6', className)} {...props}>
      {children}
    </div>
  )
}

export { Modal, ModalHeader, ModalBody, ModalFooter }
