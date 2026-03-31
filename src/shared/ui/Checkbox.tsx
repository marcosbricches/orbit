import { forwardRef, useId, type ComponentPropsWithoutRef } from 'react'
import { Check } from 'lucide-react'
import { cn } from '../lib/cn'

export interface CheckboxProps extends Omit<
  ComponentPropsWithoutRef<'input'>,
  'onChange' | 'type' | 'checked'
> {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked = false, onChange, label, disabled, className, ...props }, ref) => {
    const autoId = useId()

    return (
      <label
        htmlFor={autoId}
        className={cn(
          'inline-flex items-center gap-2 select-none',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
          className,
        )}
      >
        <span className="relative inline-flex items-center justify-center">
          <input
            ref={ref}
            id={autoId}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.checked)}
            className="peer sr-only"
            {...props}
          />
          <span
            className={cn(
              'flex h-4 w-4 items-center justify-center rounded-sm border transition-colors',
              'peer-focus-visible:outline-2 peer-focus-visible:-outline-offset-1 peer-focus-visible:outline-primary-500',
              checked
                ? 'border-primary-500 bg-primary-500 hover:bg-primary-600 hover:border-primary-600'
                : 'border-border bg-surface hover:border-text-secondary dark:bg-dark-surface dark:border-dark-border dark:hover:border-text-secondary',
            )}
            aria-hidden="true"
          >
            {checked && <Check className="h-3 w-3 text-text-inverse" strokeWidth={3} />}
          </span>
        </span>
        {label && <span className="text-sm text-text-primary dark:text-text-inverse">{label}</span>}
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'
