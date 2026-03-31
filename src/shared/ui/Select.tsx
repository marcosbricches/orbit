import { forwardRef, useState, useRef, useEffect, useCallback } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '../lib/cn'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  label?: string
  error?: string
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  id?: string
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ label, error, options, value, onChange, placeholder, disabled, className, id }, ref) => {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
    const selected = options.find((o) => o.value === value)

    const close = useCallback(() => setOpen(false), [])

    useEffect(() => {
      if (!open) return
      const handleClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) close()
      }
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') close()
      }
      document.addEventListener('mousedown', handleClick)
      document.addEventListener('keydown', handleKey)
      return () => {
        document.removeEventListener('mousedown', handleClick)
        document.removeEventListener('keydown', handleKey)
      }
    }, [open, close])

    return (
      <div className={cn('flex flex-col gap-1', className)} ref={containerRef}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-text-primary dark:text-text-inverse"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <button
            ref={ref}
            id={selectId}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-invalid={error ? true : undefined}
            aria-describedby={error && selectId ? `${selectId}-error` : undefined}
            disabled={disabled}
            onClick={() => !disabled && setOpen((o) => !o)}
            className={cn(
              'flex h-10 w-full items-center justify-between rounded-md border border-border bg-surface px-3 text-sm text-text-primary',
              'transition-colors hover:border-text-secondary cursor-pointer',
              'focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-primary-500 focus-visible:border-transparent',
              'dark:bg-dark-surface dark:border-dark-border dark:text-text-inverse',
              error &&
                'border-status-error focus-visible:outline-status-error hover:border-status-error',
              disabled && 'opacity-50 cursor-not-allowed bg-surface-alt dark:bg-dark-border',
            )}
          >
            <span className={cn(!selected && 'text-text-secondary')}>
              {selected ? selected.label : placeholder || 'Select...'}
            </span>
            <ChevronDown
              className={cn(
                'h-4 w-4 shrink-0 text-text-secondary transition-transform',
                open && 'rotate-180',
              )}
              aria-hidden="true"
            />
          </button>

          {open && (
            <ul
              role="listbox"
              className={cn(
                'absolute z-[60] mt-1 w-full overflow-auto rounded-md border border-border bg-surface py-1 shadow-md',
                'dark:bg-dark-surface dark:border-dark-border',
                'max-h-60',
              )}
            >
              {options.map((opt) => (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={opt.value === value}
                  onClick={() => {
                    onChange?.(opt.value)
                    close()
                  }}
                  className={cn(
                    'flex cursor-pointer items-center gap-2 px-3 py-2 text-sm transition-colors',
                    'text-text-primary dark:text-text-inverse',
                    'hover:bg-surface-alt dark:hover:bg-dark-border',
                    opt.value === value &&
                      'bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-100',
                  )}
                >
                  {opt.value === value && <Check className="h-4 w-4 shrink-0" />}
                  <span className={cn(opt.value !== value && 'pl-6')}>{opt.label}</span>
                </li>
              ))}
            </ul>
          )}
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
