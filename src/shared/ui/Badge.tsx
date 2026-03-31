import { forwardRef, type ReactNode } from 'react'
import { cn } from '../lib/cn'

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info'

export interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-surface-alt text-text-secondary dark:bg-dark-border dark:text-text-inverse',
  success:
    'bg-status-success/10 text-status-success-fg dark:bg-status-success/20 dark:text-status-success',
  warning:
    'bg-status-warning/10 text-status-warning-fg dark:bg-status-warning/20 dark:text-status-warning',
  error: 'bg-status-error/10 text-status-error-fg dark:bg-status-error/20 dark:text-status-error',
  info: 'bg-status-info/10 text-status-info-fg dark:bg-status-info/20 dark:text-status-info',
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'default', className }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
          variantStyles[variant],
          className,
        )}
      >
        {children}
      </span>
    )
  },
)

Badge.displayName = 'Badge'
