import * as React from 'react'
import { cn } from '@/lib/utils'

function Menu({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-[14px] shadow-lg p-1.5 min-w-[220px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  badge?: React.ReactNode
  danger?: boolean
}

function MenuItem({ icon, badge, danger, children, className, ...props }: MenuItemProps) {
  return (
    <button
      type="button"
      className={cn(
        'flex w-full items-center gap-3 px-3 py-2 rounded-[6px] text-sm',
        'transition-colors duration-150 cursor-pointer',
        danger
          ? 'text-halo-rose hover:bg-rose-50 dark:hover:bg-rose-950/20'
          : 'text-foreground hover:bg-muted',
        className
      )}
      {...props}
    >
      {icon && (
        <span className="text-muted-foreground h-4 w-4 flex-shrink-0">{icon}</span>
      )}
      <span className="flex-1 text-left">{children}</span>
      {badge && <span>{badge}</span>}
    </button>
  )
}

function MenuLabel({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('px-3 py-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.06em]', className)}
      {...props}
    >
      {children}
    </div>
  )
}

function MenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('my-1.5 mx-1 h-px bg-border', className)} {...props} />
  )
}

interface DropdownProps {
  trigger: React.ReactElement
  children: React.ReactNode
  align?: 'left' | 'right'
  className?: string
}

function Dropdown({ trigger, children, align = 'right', className }: DropdownProps) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div ref={ref} className="relative inline-flex">
      {React.cloneElement(trigger, { onClick: () => setOpen((v) => !v) })}
      {open && (
        <div
          className={cn(
            'absolute top-[calc(100%+8px)] z-50 min-w-[220px]',
            'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-150',
            align === 'right' ? 'right-0' : 'left-0',
            className
          )}
        >
          <div onClick={() => setOpen(false)}>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export { Menu, MenuItem, MenuLabel, MenuSeparator, Dropdown }
