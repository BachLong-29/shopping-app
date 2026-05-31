'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  label?: React.ReactNode
  description?: string
  className?: string
  id?: string
}

function Switch({
  checked,
  defaultChecked = false,
  onChange,
  disabled,
  label,
  description,
  className,
  id,
}: SwitchProps) {
  const [internal, setInternal] = React.useState(defaultChecked)
  const isControlled = checked !== undefined
  const isOn = isControlled ? checked : internal
  const switchId = id ?? React.useId()

  function toggle() {
    if (disabled) return
    if (!isControlled) setInternal((v) => !v)
    onChange?.(!isOn)
  }

  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      {(label || description) && (
        <label htmlFor={switchId} className="flex flex-col cursor-pointer select-none">
          {label && <span className="text-sm font-medium">{label}</span>}
          {description && <span className="text-xs text-muted-foreground">{description}</span>}
        </label>
      )}
      <button
        id={switchId}
        role="switch"
        type="button"
        aria-checked={isOn}
        disabled={disabled}
        onClick={toggle}
        className={cn(
          'relative flex-shrink-0 h-6 w-10 rounded-full',
          'transition-colors duration-300 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-halo-violet focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          isOn ? 'bg-foreground' : 'bg-border'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white',
            'shadow-[0_2px_4px_rgba(0,0,0,0.15)]',
            'transition-transform duration-[250ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]',
            isOn && 'translate-x-4'
          )}
        />
      </button>
    </div>
  )
}

export { Switch }
