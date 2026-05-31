'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  [
    'w-full h-11 px-4 rounded-[10px]',
    'border border-border bg-card text-foreground text-sm',
    'placeholder:text-muted-foreground',
    'transition-[border-color,box-shadow] duration-200 ease-out',
    'hover:border-border/80',
    'focus:outline-none focus:border-halo-violet focus:shadow-[0_0_0_3px_rgba(124,58,237,0.15)]',
    'disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed',
  ].join(' '),
  {
    variants: {
      state: {
        default: '',
        error: 'border-halo-rose focus:shadow-[0_0_0_3px_rgba(244,63,94,0.15)]',
        success: 'border-halo-emerald',
      },
    },
    defaultVariants: { state: 'default' },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string
  required?: boolean
  helpText?: React.ReactNode
  helpVariant?: 'default' | 'error' | 'success'
  leftIcon?: React.ReactNode
  rightElement?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      state,
      label,
      required,
      helpText,
      helpVariant = 'default',
      leftIcon,
      rightElement,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId()
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-muted-foreground flex items-center gap-2">
            {label}
            {required && <span className="text-halo-rose">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputVariants({ state }),
              leftIcon && 'pl-11',
              rightElement && 'pr-20',
              className
            )}
            {...props}
          />
          {rightElement && (
            <span className="absolute right-1 top-1/2 -translate-y-1/2">{rightElement}</span>
          )}
        </div>
        {helpText && (
          <span
            className={cn(
              'text-[11px]',
              helpVariant === 'error' && 'text-halo-rose',
              helpVariant === 'success' && 'text-halo-emerald',
              helpVariant === 'default' && 'text-muted-foreground'
            )}
          >
            {helpText}
          </span>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rightLabel?: React.ReactNode
  kbd?: string
}

function SearchInput({ className, rightLabel, kbd, ...props }: SearchInputProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 h-11 px-4 rounded-full',
        'bg-muted border border-transparent',
        'transition-all duration-200 ease-out',
        'focus-within:bg-card focus-within:border-border focus-within:shadow-md',
        className
      )}
    >
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground shrink-0" aria-hidden>
        <path d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3" />
      </svg>
      <input
        className="flex-1 bg-transparent border-0 outline-none text-sm text-foreground placeholder:text-muted-foreground"
        {...props}
      />
      {rightLabel && <span className="text-[11px] text-muted-foreground">{rightLabel}</span>}
      {kbd && (
        <span className="inline-flex items-center font-mono text-[11px] font-medium px-1.5 min-w-5 h-5 rounded border border-border bg-card text-muted-foreground leading-none">
          {kbd}
        </span>
      )}
    </div>
  )
}

export { Input, inputVariants, SearchInput }
