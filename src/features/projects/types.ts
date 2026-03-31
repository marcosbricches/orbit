import type { ProjectStatus } from '@/types'

export type ProjectFormData = {
  name: string
  description: string
  color: string
  status: ProjectStatus
}

export const PROJECT_COLORS = [
  { key: 'indigo', label: 'Indigo', hex: '#6366f1' },
  { key: 'blue', label: 'Blue', hex: '#3b82f6' },
  { key: 'green', label: 'Green', hex: '#22c55e' },
  { key: 'yellow', label: 'Yellow', hex: '#eab308' },
  { key: 'orange', label: 'Orange', hex: '#f97316' },
  { key: 'red', label: 'Red', hex: '#ef4444' },
  { key: 'purple', label: 'Purple', hex: '#a855f7' },
  { key: 'pink', label: 'Pink', hex: '#ec4899' },
] as const

export type ProjectColorKey = (typeof PROJECT_COLORS)[number]['key']
