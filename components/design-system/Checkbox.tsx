'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, children, id, ...props }, ref) => {
    const inputId = id ?? React.useId()
    return (
      <label
        htmlFor={inputId}
        className={cn(
          'inline-flex items-center gap-3 cursor-pointer select-none',
          props.disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <input ref={ref} id={inputId} type="checkbox" className="sr-only" {...props} />
        <span
          className={cn(
            'flex-shrink-0 flex items-center justify-center',
            'h-[18px] w-[18px] rounded-[4px] border-[1.5px] border-border/60 bg-card',
            'transition-all duration-200 ease-out',
            'group-hover:border-foreground',
            '[input:checked+&]:bg-foreground [input:checked+&]:border-foreground',
            'peer-checked:bg-foreground peer-checked:border-foreground'
          )}
        >
          <svg
            width={11} height={11} viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth={3}
            strokeLinecap="round" strokeLinejoin="round"
            className="opacity-0 scale-50 transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-background [input:checked~span_&]:opacity-100 [input:checked~span_&]:scale-100"
            aria-hidden
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </span>
        {(label ?? children) && (
          <span className="text-sm">{label ?? children}</span>
        )}
      </label>
    )
  }
)
Checkbox.displayName = 'Checkbox'

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, children, id, ...props }, ref) => {
    const inputId = id ?? React.useId()
    return (
      <label
        htmlFor={inputId}
        className={cn(
          'inline-flex items-center gap-3 cursor-pointer select-none',
          props.disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <input ref={ref} id={inputId} type="radio" className="sr-only" {...props} />
        <span
          className={cn(
            'flex-shrink-0 flex items-center justify-center',
            'h-[18px] w-[18px] rounded-full border-[1.5px] border-border/60 bg-card',
            'transition-all duration-200 ease-out',
            'after:content-[""] after:w-2 after:h-2 after:rounded-full after:bg-foreground',
            'after:scale-0 after:transition-transform after:duration-200 after:ease-[cubic-bezier(0.34,1.56,0.64,1)]',
            '[input:checked+&]:border-foreground',
            '[input:checked+&]:after:scale-100'
          )}
        />
        {(label ?? children) && (
          <span className="text-sm">{label ?? children}</span>
        )}
      </label>
    )
  }
)
Radio.displayName = 'Radio'

export { Checkbox, Radio }
