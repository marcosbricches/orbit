import { useState, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react'
import { cn } from '../lib/cn'

type ToastVariant = 'success' | 'error' | 'info' | 'warning'

export interface ToastProps {
  message: string
  variant: ToastVariant
  onClose?: () => void
}

interface ToastItem {
  id: string
  message: string
  variant: ToastVariant
}

const variantIcon: Record<ToastVariant, typeof CheckCircle> = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
}

const variantIconColor: Record<ToastVariant, string> = {
  success: 'text-status-success',
  error: 'text-status-error',
  info: 'text-status-info',
  warning: 'text-status-warning',
}

export function Toast({ message, variant, onClose }: ToastProps) {
  const Icon = variantIcon[variant]

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-4 rounded-lg shadow-lg bg-surface border border-border dark:bg-dark-surface dark:border-dark-border',
        'min-w-[280px] max-w-sm',
      )}
      role="alert"
    >
      <Icon className={cn('w-5 h-5 shrink-0', variantIconColor[variant])} />
      <p className="text-sm text-text-primary dark:text-text-inverse flex-1">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="text-text-secondary hover:text-text-primary hover:bg-surface-alt dark:hover:bg-dark-border dark:hover:text-text-inverse transition-colors shrink-0 p-0.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: ToastItem[]
  onRemove: (id: string) => void
}) {
  return createPortal(
    <div className="fixed bottom-4 right-4 z-[80] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Toast
              message={toast.message}
              variant={toast.variant}
              onClose={() => onRemove(toast.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  )
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const counterRef = useRef(0)

  const addToast = useCallback((message: string, variant: ToastVariant, duration = 4000) => {
    const id = String(++counterRef.current)
    setToasts((prev) => [...prev, { id, message, variant }])

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, duration)
    }

    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, addToast, removeToast }
}
