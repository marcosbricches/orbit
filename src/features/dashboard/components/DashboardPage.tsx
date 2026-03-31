import { CheckSquare, Clock, FolderOpen, ListTodo } from 'lucide-react'
import { StatCard } from './StatCard'
import { ActivityFeed } from './ActivityFeed'
import { useDashboardStats } from '../hooks/use-dashboard-stats'
import { useActivityFeed } from '../hooks/use-activity-feed'

export function DashboardPage() {
  const { stats, isLoading, tasksError, projectsError } = useDashboardStats()
  const { activities, isLoading: feedLoading, error: feedError, refetch } = useActivityFeed()

  const statsCards = [
    {
      label: 'Total Tasks',
      value: stats.totalTasks,
      icon: ListTodo,
      accentClass: undefined,
      error: tasksError,
    },
    {
      label: 'Completed This Week',
      value: stats.completedThisWeek,
      icon: CheckSquare,
      accentClass: 'bg-status-success' as const,
      error: tasksError,
    },
    {
      label: 'Overdue Tasks',
      value: stats.overdueTasks,
      icon: Clock,
      accentClass: 'bg-status-error' as const,
      error: tasksError,
    },
    {
      label: 'Active Projects',
      value: stats.activeProjects,
      icon: FolderOpen,
      accentClass: undefined,
      error: projectsError,
    },
  ]

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary dark:text-text-inverse">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-text-secondary">Overview of your workspace.</p>
      </div>

      <section aria-label="Stats overview">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((card) => (
            <StatCard
              key={card.label}
              label={card.label}
              value={card.value}
              icon={card.icon}
              accentClass={card.accentClass}
              isLoading={isLoading}
              error={card.error}
            />
          ))}
        </div>
      </section>

      <section aria-label="Recent activity">
        <ActivityFeed
          activities={activities}
          isLoading={feedLoading}
          error={feedError}
          onRetry={() => void refetch()}
        />
      </section>
    </div>
  )
}
