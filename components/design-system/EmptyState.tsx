import * as React from 'react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center text-center px-5 py-12 text-muted-foreground', className)}>
      {icon && (
        <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-aurora text-white opacity-90">
          {icon}
        </div>
      )}
      <div className="text-[18px] font-semibold text-foreground mb-1">{title}</div>
      {description && (
        <p className="text-sm max-w-xs leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

export { EmptyState }
