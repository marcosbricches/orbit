import { useState, useRef, useCallback, type ReactElement } from 'react'
import { cn } from '../lib/cn'

type TooltipSide = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  content: string
  children: ReactElement
  side?: TooltipSide
  className?: string
}

const sidePositionStyles: Record<TooltipSide, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

export function Tooltip({ content, children, side = 'top', className }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setVisible(true), 100)
  }, [])

  const hide = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setVisible(false)
  }, [])

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            'absolute z-[60] whitespace-nowrap bg-dark-bg text-text-inverse text-xs rounded-md px-2 py-1 shadow-md pointer-events-none',
            sidePositionStyles[side],
            className,
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}
