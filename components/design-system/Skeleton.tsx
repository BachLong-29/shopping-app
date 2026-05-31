import * as React from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: boolean
}

function Skeleton({ className, rounded, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-shimmer rounded-[10px]',
        'bg-[linear-gradient(90deg,hsl(var(--muted))_0%,hsl(var(--accent))_50%,hsl(var(--muted))_100%)]',
        'bg-[length:200%_100%]',
        rounded && 'rounded-full',
        className
      )}
      {...props}
    />
  )
}

function SkeletonProductCard({ className }: { className?: string }) {
  return (
    <div className={cn('bg-card border border-border rounded-[20px] overflow-hidden', className)}>
      <Skeleton className="aspect-[4/5] rounded-none rounded-t-[20px]" />
      <div className="p-4 flex flex-col gap-2">
        <Skeleton className="h-3 w-2/5" />
        <Skeleton className="h-[18px] w-4/5" />
        <Skeleton className="h-3.5 w-1/2" />
      </div>
    </div>
  )
}

function SkeletonReviewCard({ className }: { className?: string }) {
  return (
    <div className={cn('bg-card border border-border rounded-[14px] p-5 flex flex-col gap-3', className)}>
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-full" rounded />
        <div className="flex-1 flex flex-col gap-1.5">
          <Skeleton className="h-3.5 w-1/3" />
          <Skeleton className="h-2.5 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-3.5 w-full" />
      <Skeleton className="h-3.5 w-4/5" />
      <Skeleton className="h-3.5 w-3/5" />
    </div>
  )
}

export { Skeleton, SkeletonProductCard, SkeletonReviewCard }
