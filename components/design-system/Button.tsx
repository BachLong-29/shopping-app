'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full',
    'font-semibold text-sm leading-none tracking-[-0.01em]',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-halo-violet focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    'select-none relative overflow-hidden',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'bg-foreground text-background',
          'hover:-translate-y-px hover:shadow-md',
          'active:translate-y-0',
        ].join(' '),
        gradient: [
          'bg-aurora text-white',
          'hover:shadow-[0_10px_32px_-10px_rgba(124,58,237,0.6)]',
          'hover:-translate-y-px',
        ].join(' '),
        secondary: 'bg-muted text-foreground hover:bg-accent',
        outline: [
          'bg-transparent text-foreground',
          'ring-1 ring-inset ring-border/60',
          'hover:bg-muted hover:ring-foreground',
        ].join(' '),
        ghost: 'bg-transparent text-foreground hover:bg-muted',
        destructive: [
          'bg-halo-rose text-white',
          'hover:bg-[#e11d48] hover:shadow-[0_8px_24px_-8px_rgba(244,63,94,0.5)]',
        ].join(' '),
      },
      size: {
        sm: 'h-8 px-4 text-xs',
        default: 'h-10 px-5',
        lg: 'h-[52px] px-8 text-[15px]',
        xl: 'h-[60px] px-10 text-[17px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), loading && 'text-transparent pointer-events-none', className)}
        disabled={props.disabled ?? loading}
        {...props}
      >
        {children}
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center text-current">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent opacity-100" />
          </span>
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-all duration-200 text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-halo-violet focus-visible:ring-offset-2',
  {
    variants: {
      size: {
        sm: 'h-8 w-8',
        default: 'h-10 w-10',
        lg: 'h-12 w-12',
      },
    },
    defaultVariants: { size: 'default' },
  }
)

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size, ...props }, ref) => (
    <button ref={ref} className={cn(iconButtonVariants({ size }), className)} {...props} />
  )
)
IconButton.displayName = 'IconButton'

export interface FabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'aurora' | 'dark' | 'rose'
}

const Fab = React.forwardRef<HTMLButtonElement, FabProps>(
  ({ className, variant = 'aurora', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex h-14 w-14 items-center justify-center rounded-full text-white',
        'shadow-[0_16px_40px_-8px_rgba(124,58,237,0.5)]',
        'transition-transform duration-[250ms] hover:scale-105 hover:-rotate-2 active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-halo-violet focus-visible:ring-offset-2',
        variant === 'aurora' && 'bg-aurora',
        variant === 'dark' && 'bg-foreground text-background',
        variant === 'rose' && 'bg-halo-rose',
        className
      )}
      {...props}
    />
  )
)
Fab.displayName = 'Fab'

export { Button, buttonVariants, IconButton, iconButtonVariants, Fab }
