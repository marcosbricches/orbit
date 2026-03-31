import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { cn } from '../lib/cn'

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, disabled, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className={cn('flex flex-col gap-1', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-primary dark:text-text-inverse"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={cn(
            'h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-text-primary',
            'placeholder:text-text-secondary transition-colors hover:border-text-secondary',
            'focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-primary-500 focus-visible:border-transparent',
            'dark:bg-dark-surface dark:border-dark-border dark:text-text-inverse',
            error &&
              'border-status-error focus-visible:outline-status-error hover:border-status-error',
            disabled && 'opacity-50 cursor-not-allowed bg-surface-alt dark:bg-dark-border',
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={error && inputId ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p
            id={inputId ? `${inputId}-error` : undefined}
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

Input.displayName = 'Input'
