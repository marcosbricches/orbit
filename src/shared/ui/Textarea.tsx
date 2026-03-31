import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { cn } from '../lib/cn'

export interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, disabled, id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className={cn('flex flex-col gap-1', className)}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-text-primary dark:text-text-inverse"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          className={cn(
            'min-h-[80px] w-full resize-y rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary',
            'placeholder:text-text-secondary transition-colors hover:border-text-secondary',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 focus:border-primary-500',
            'dark:bg-dark-surface dark:border-dark-border dark:text-text-inverse',
            error &&
              'border-status-error focus-visible:outline-status-error hover:border-status-error',
            disabled && 'opacity-50 cursor-not-allowed bg-surface-alt dark:bg-dark-border',
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={error && textareaId ? `${textareaId}-error` : undefined}
          {...props}
        />
        {error && (
          <p
            id={textareaId ? `${textareaId}-error` : undefined}
            className="text-sm text-status-error mt-1"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
