import { cn } from '../lib/cn'

type SeparatorOrientation = 'horizontal' | 'vertical'

export interface SeparatorProps {
  orientation?: SeparatorOrientation
  className?: string
}

export function Separator({ orientation = 'horizontal', className }: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        orientation === 'horizontal' && 'h-px w-full bg-border dark:bg-dark-border',
        orientation === 'vertical' && 'w-px h-full bg-border dark:bg-dark-border',
        className,
      )}
    />
  )
}
