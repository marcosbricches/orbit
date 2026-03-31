import type { LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'
import { Button } from './Button'

export interface EmptyStateProps {
  title: string
  description: string
  icon?: LucideIcon
  action?: { label: string; onClick: () => void }
  className?: string
}

export function EmptyState({ title, description, icon: Icon, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      {Icon && <Icon className="w-12 h-12 mb-4 text-text-secondary" aria-hidden="true" />}
      <h3 className="text-lg font-semibold text-text-primary dark:text-text-inverse">{title}</h3>
      <p className="text-sm text-text-secondary mt-1 max-w-sm">{description}</p>
      {action && (
        <Button variant="primary" className="mt-4" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}
