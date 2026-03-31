import { cn } from '../lib/cn'
import { Skeleton } from './Skeleton'

type LoadingVariant = 'spinner' | 'skeleton' | 'dots'

export interface LoadingStateProps {
  variant?: LoadingVariant
  className?: string
}

function SpinnerIndicator() {
  return (
    <div className="w-8 h-8 rounded-full border-2 border-border border-t-primary-500 animate-spin" />
  )
}

function DotsIndicator() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-primary-500 animate-bounce"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  )
}

function SkeletonIndicator() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      <Skeleton variant="text" className="w-full" />
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
    </div>
  )
}

export function LoadingState({ variant = 'spinner', className }: LoadingStateProps) {
  return (
    <div className={cn('flex items-center justify-center py-12', className)}>
      {variant === 'spinner' && <SpinnerIndicator />}
      {variant === 'skeleton' && <SkeletonIndicator />}
      {variant === 'dots' && <DotsIndicator />}
    </div>
  )
}
