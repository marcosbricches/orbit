import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../lib/cn'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends Omit<ComponentPropsWithoutRef<'select'>, 'onChange'> {
  label?: string
  error?: string
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, options, value, onChange, placeholder, disabled, className, id, ...props },
    ref,
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className={cn('flex flex-col gap-1', className)}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-text-primary dark:text-text-inverse"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.value)}
            className={cn(
              'h-10 w-full appearance-none rounded-md border border-border bg-surface px-3 pr-10 text-sm text-text-primary',
              'placeholder:text-text-secondary transition-colors hover:border-text-secondary cursor-pointer',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 focus:border-primary-500',
              'dark:bg-dark-surface dark:border-dark-border dark:text-text-inverse',
              error && 'border-status-error focus:ring-status-error/50 focus:border-status-error',
              disabled && 'opacity-50 cursor-not-allowed bg-surface-alt dark:bg-dark-border',
            )}
            aria-invalid={error ? true : undefined}
            aria-describedby={error && selectId ? `${selectId}-error` : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary"
            aria-hidden="true"
          />
        </div>
        {error && (
          <p
            id={selectId ? `${selectId}-error` : undefined}
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

Select.displayName = 'Select'
