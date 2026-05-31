'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface TabItem {
  value: string
  label: React.ReactNode
}

interface TabsProps {
  items: TabItem[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  variant?: 'pill' | 'underline'
  className?: string
}

function Tabs({ items, value, defaultValue, onChange, variant = 'pill', className }: TabsProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.value)
  const isControlled = value !== undefined
  const active = isControlled ? value : internal

  function select(v: string) {
    if (!isControlled) setInternal(v)
    onChange?.(v)
  }

  if (variant === 'underline') {
    return (
      <div className={cn('flex gap-6 border-b border-border', className)}>
        {items.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => select(item.value)}
            className={cn(
              'relative py-3 text-sm font-medium transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-halo-violet',
              active === item.value
                ? 'text-foreground after:absolute after:left-0 after:right-0 after:-bottom-px after:h-0.5 after:bg-foreground after:rounded-full'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className={cn('inline-flex bg-muted rounded-full p-1 gap-0.5', className)}>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => select(item.value)}
          className={cn(
            'px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ease-out cursor-pointer',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-halo-violet',
            active === item.value
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

interface TabContentProps {
  items: (TabItem & { content: React.ReactNode })[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  variant?: 'pill' | 'underline'
  className?: string
  contentClassName?: string
}

function TabsWithContent({
  items,
  value,
  defaultValue,
  onChange,
  variant = 'pill',
  className,
  contentClassName,
}: TabContentProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.value)
  const isControlled = value !== undefined
  const active = isControlled ? value : internal

  function select(v: string) {
    if (!isControlled) setInternal(v)
    onChange?.(v)
  }

  const tabItems = items.map(({ value, label }) => ({ value, label }))
  const activeItem = items.find((i) => i.value === active)

  return (
    <div>
      <Tabs items={tabItems} value={active} onChange={select} variant={variant} className={className} />
      {activeItem && (
        <div className={cn('mt-4', contentClassName)}>{activeItem.content}</div>
      )}
    </div>
  )
}

export { Tabs, TabsWithContent }
