import { forwardRef, useId, type ComponentPropsWithoutRef } from 'react'
import { cn } from '../lib/cn'

type ToggleSize = 'sm' | 'md'

export interface ToggleProps extends Omit<ComponentPropsWithoutRef<'button'>, 'onChange'> {
  checked?: boolean
  onChange?: (checked: boolean) => void
  size?: ToggleSize
  label?: string
}

const trackStyles: Record<ToggleSize, string> = {
  sm: 'h-5 w-9',
  md: 'h-6 w-11',
}

const thumbStyles: Record<ToggleSize, { base: string; translate: string }> = {
  sm: { base: 'h-3.5 w-3.5', translate: 'translate-x-4' },
  md: { base: 'h-4 w-4', translate: 'translate-x-5' },
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ checked = false, onChange, size = 'md', label, disabled, className, ...props }, ref) => {
    const autoId = useId()

    return (
      <div className={cn('inline-flex items-center gap-2', className)}>
        <button
          ref={ref}
          id={autoId}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={label || undefined}
          disabled={disabled}
          onClick={() => onChange?.(!checked)}
          className={cn(
            'relative inline-flex shrink-0 items-center rounded-full transition-colors',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            trackStyles[size],
            checked ? 'bg-primary-500' : 'bg-border dark:bg-dark-border',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
          {...props}
        >
          <span
            className={cn(
              'pointer-events-none inline-block rounded-full bg-surface shadow-sm transition-transform dark:bg-text-inverse',
              thumbStyles[size].base,
              checked ? thumbStyles[size].translate : 'translate-x-0.5',
            )}
            aria-hidden="true"
          />
        </button>
        {label && (
          <label
            htmlFor={autoId}
            className={cn(
              'text-sm text-text-primary dark:text-text-inverse',
              disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            )}
          >
            {label}
          </label>
        )}
      </div>
    )
  },
)

Toggle.displayName = 'Toggle'
