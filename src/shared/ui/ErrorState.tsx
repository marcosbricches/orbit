import { AlertCircle } from 'lucide-react'
import { cn } from '../lib/cn'
import { Button } from './Button'

export interface ErrorStateProps {
  title: string
  description: string
  retry?: () => void
  className?: string
}

export function ErrorState({ title, description, retry, className }: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <AlertCircle className="w-12 h-12 mb-4 text-status-error" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-text-primary dark:text-text-inverse">{title}</h3>
      <p className="text-sm text-text-secondary mt-1 max-w-sm">{description}</p>
      {retry && (
        <Button variant="secondary" className="mt-4" onClick={retry}>
          Try again
        </Button>
      )}
    </div>
  )
}
