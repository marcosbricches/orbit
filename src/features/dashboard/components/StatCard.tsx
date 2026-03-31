import type { LucideIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/shared/lib/cn'
import { Skeleton } from '@/shared/ui/Skeleton'

type StatCardProps = {
  label: string
  value: number
  icon: LucideIcon
  accentClass?: string
  isLoading: boolean
  error: Error | null
}

export function StatCard({
  label,
  value,
  icon: Icon,
  accentClass,
  isLoading,
  error,
}: StatCardProps) {
  return (
    <motion.div
      className="relative bg-surface rounded-lg border border-border p-5 shadow-sm overflow-hidden dark:bg-dark-surface dark:border-dark-border"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {accentClass && <div className={cn('absolute bottom-0 inset-x-0 h-0.5', accentClass)} />}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5 min-w-0">
          {isLoading ? (
            <>
              <Skeleton variant="rectangular" width={56} height={36} />
              <Skeleton variant="text" width={110} />
            </>
          ) : error ? (
            <span className="text-sm text-status-error">Failed to load</span>
          ) : (
            <>
              <span className="text-3xl font-bold tracking-tight text-text-primary dark:text-text-inverse">
                {value}
              </span>
              <span className="text-sm text-text-secondary">{label}</span>
            </>
          )}
        </div>
        <div className="shrink-0 p-2 rounded-lg bg-primary-50 dark:bg-dark-border">
          <Icon className="w-5 h-5 text-primary-500" />
        </div>
      </div>
    </motion.div>
  )
}
