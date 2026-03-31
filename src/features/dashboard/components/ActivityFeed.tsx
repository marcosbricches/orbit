import { CheckSquare, Folder } from 'lucide-react'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { motion, type Variants } from 'motion/react'
import { Skeleton } from '@/shared/ui/Skeleton'
import { EmptyState } from '@/shared/ui/EmptyState'
import { ErrorState } from '@/shared/ui/ErrorState'
import type { Activity } from '@/types'

type ActivityFeedProps = {
  activities: Activity[]
  isLoading: boolean
  error: Error | null
  onRetry?: () => void
}

const listVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -6 },
  show: { opacity: 1, x: 0, transition: { duration: 0.15, ease: 'easeOut' } },
}

function ActivitySkeleton() {
  return (
    <li className="-ml-3.5 mb-1">
      <div className="flex gap-3 px-2 py-2">
        <Skeleton variant="circular" width={28} height={28} className="shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1.5 flex-1 pt-0.5">
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="30%" />
        </div>
      </div>
    </li>
  )
}

function getEntityIcon(entityType: Activity['entityType']) {
  return entityType === 'task' ? CheckSquare : Folder
}

export function ActivityFeed({ activities, isLoading, error, onRetry }: ActivityFeedProps) {
  return (
    <div>
      <h2 className="text-base font-semibold text-text-primary dark:text-text-inverse mb-4">
        Recent Activity
      </h2>

      {error ? (
        <ErrorState
          title="Failed to load activity"
          description="There was a problem loading your recent activity."
          retry={onRetry}
        />
      ) : isLoading ? (
        <ul className="border-l border-border dark:border-dark-border ml-3.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <ActivitySkeleton key={i} />
          ))}
        </ul>
      ) : activities.length === 0 ? (
        <EmptyState
          title="No recent activity"
          description="Actions you take across tasks and projects will appear here."
        />
      ) : (
        <motion.ul
          className="border-l border-border dark:border-dark-border ml-3.5"
          variants={listVariants}
          initial="hidden"
          animate="show"
        >
          {activities.map((activity) => {
            const Icon = getEntityIcon(activity.entityType)
            return (
              <motion.li
                key={activity.id}
                className="-ml-3.5 mb-1 last:mb-0"
                variants={itemVariants}
              >
                <div className="flex gap-3 px-2 py-2 rounded-md transition-colors duration-150 hover:bg-surface-alt dark:hover:bg-dark-border">
                  <div className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary-50 border border-border dark:bg-dark-surface dark:border-dark-border">
                    <Icon className="h-3.5 w-3.5 text-primary-500" />
                  </div>
                  <div className="flex flex-1 items-start justify-between gap-4 min-w-0 pt-0.5">
                    <p className="text-sm text-text-primary dark:text-text-inverse leading-relaxed">
                      {activity.description}
                    </p>
                    <time className="text-xs text-text-muted dark:text-text-inverse/70 whitespace-nowrap shrink-0">
                      {formatDistanceToNow(parseISO(activity.createdAt), { addSuffix: true })}
                    </time>
                  </div>
                </div>
              </motion.li>
            )
          })}
        </motion.ul>
      )}
    </div>
  )
}
