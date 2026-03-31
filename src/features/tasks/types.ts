import type { Priority, Status } from '@/types'

export type TaskFormData = {
  title: string
  description: string
  priority: Priority
  status: Status
  projectId: string
  dueDate: string // 'YYYY-MM-DD' or ''
}

export type TaskFormErrors = Partial<Record<keyof TaskFormData, string>>

export const TASK_COLUMNS: { id: Status; label: string }[] = [
  { id: 'todo', label: 'Todo' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'review', label: 'Review' },
  { id: 'done', label: 'Done' },
]

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export const STATUS_LABELS: Record<Status, string> = {
  todo: 'Todo',
  in_progress: 'In Progress',
  review: 'Review',
  done: 'Done',
}
