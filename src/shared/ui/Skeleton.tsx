import { cn } from '../lib/cn'

type SkeletonVariant = 'text' | 'circular' | 'rectangular'

export interface SkeletonProps {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
  className?: string
}

export function Skeleton({ variant = 'text', width, height, className }: SkeletonProps) {
  const style: React.CSSProperties = {
    width: width ?? undefined,
    height: height ?? undefined,
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-surface-alt dark:bg-dark-border',
        variant === 'text' && 'h-4 w-full rounded-md',
        variant === 'circular' && 'rounded-full',
        variant === 'rectangular' && 'rounded-md',
        className,
      )}
      style={style}
      aria-hidden="true"
    />
  )
}
