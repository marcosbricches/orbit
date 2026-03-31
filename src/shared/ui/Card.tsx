import { forwardRef, type ReactNode } from 'react'
import { cn } from '../lib/cn'

type CardVariant = 'default' | 'outlined'
type CardPadding = 'sm' | 'md' | 'lg'

export interface CardProps {
  children: ReactNode
  variant?: CardVariant
  padding?: CardPadding
  className?: string
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-surface rounded-lg shadow-sm dark:bg-dark-surface',
  outlined:
    'bg-surface rounded-lg border border-border dark:bg-dark-surface dark:border-dark-border',
}

const paddingStyles: Record<CardPadding, string> = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', padding = 'md', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(variantStyles[variant], paddingStyles[padding], className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Card.displayName = 'Card'
