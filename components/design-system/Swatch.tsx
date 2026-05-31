'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface SwatchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: string
  selected?: boolean
  size?: 'sm' | 'default' | 'lg'
  label?: string
}

function Swatch({ color, selected, size = 'default', label, className, ...props }: SwatchProps) {
  const sizes = {
    sm: 'h-4 w-4',
    default: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  return (
    <button
      type="button"
      aria-label={label ?? color}
      aria-pressed={selected}
      className={cn(
        'relative rounded-full inline-block shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]',
        'transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.15]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-halo-violet focus-visible:ring-offset-2',
        sizes[size],
        selected && 'after:absolute after:-inset-1 after:rounded-full after:border-[1.5px] after:border-foreground',
        className
      )}
      style={{ background: color }}
      {...props}
    />
  )
}

interface SwatchGroupProps {
  colors: string[]
  value?: string
  defaultValue?: string
  onChange?: (color: string) => void
  size?: SwatchProps['size']
  className?: string
}

function SwatchGroup({ colors, value, defaultValue, onChange, size, className }: SwatchGroupProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? colors[0])
  const isControlled = value !== undefined
  const selected = isControlled ? value : internal

  function select(color: string) {
    if (!isControlled) setInternal(color)
    onChange?.(color)
  }

  return (
    <div className={cn('flex gap-1.5', className)}>
      {colors.map((color) => (
        <Swatch
          key={color}
          color={color}
          size={size}
          selected={selected === color}
          onClick={() => select(color)}
        />
      ))}
    </div>
  )
}

export { Swatch, SwatchGroup }
