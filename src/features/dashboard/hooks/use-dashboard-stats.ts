import { useMemo } from 'react'
import { format, parseISO, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns'
import { useTasks } from '@/shared/hooks/use-tasks'
import { useProjects } from '@/shared/hooks/use-projects'

export type DashboardStats = {
  totalTasks: number
  completedThisWeek: number
  overdueTasks: number
  activeProjects: number
}

export function useDashboardStats() {
  const { tasks, isLoading: tasksLoading, error: tasksError } = useTasks()
  const { projects, isLoading: projectsLoading, error: projectsError } = useProjects()

  const stats = useMemo<DashboardStats>(() => {
    const now = new Date()
    const today = format(now, 'yyyy-MM-dd')
    const weekStart = startOfWeek(now, { weekStartsOn: 1 })
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 })
    return {
      totalTasks: tasks.length,
      completedThisWeek: tasks.filter((t) => {
        if (t.status !== 'done') return false
        const updated = parseISO(t.updatedAt)
        return isWithinInterval(updated, { start: weekStart, end: weekEnd })
      }).length,
      overdueTasks: tasks.filter(
        (t) => t.dueDate !== null && t.dueDate < today && t.status !== 'done',
      ).length,
      activeProjects: projects.filter((p) => p.status === 'active').length,
    }
  }, [tasks, projects])

  return {
    stats,
    isLoading: tasksLoading || projectsLoading,
    tasksError,
    projectsError,
  }
}
