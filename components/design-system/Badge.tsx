import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2 h-[22px] text-[11px] font-semibold tracking-[0.02em] leading-none whitespace-nowrap',
  {
    variants: {
      variant: {
        sale: 'bg-halo-rose text-white',
        hot: 'bg-grad-sunset text-white',
        new: 'bg-halo-emerald text-white',
        limited: 'bg-halo-amber text-[#1a1626]',
        soldout: 'bg-muted text-muted-foreground',
        gradient: 'bg-aurora text-white',
        soft: 'bg-muted text-foreground',
        outline: 'bg-transparent ring-1 ring-inset ring-border/60 text-muted-foreground',
        success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
        warning: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
        error: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300',
        info: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300',
      },
    },
    defaultVariants: {
      variant: 'soft',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

function LiveDot({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-block h-1.5 w-1.5 rounded-full bg-halo-emerald',
        'shadow-[0_0_0_4px_rgba(16,185,129,0.2)] animate-pulse',
        className
      )}
    />
  )
}

export { Badge, badgeVariants, LiveDot }
