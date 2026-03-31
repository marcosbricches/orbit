// ─── Enums (union types) ──────────────────────────────────────────────────────

/** Task workflow status */
export type Status = 'todo' | 'in_progress' | 'review' | 'done'

/** Task priority level */
export type Priority = 'low' | 'medium' | 'high'

/** Project lifecycle status */
export type ProjectStatus = 'active' | 'archived'

/** Activity event types */
export type ActivityType =
  | 'task_created'
  | 'task_moved'
  | 'task_updated'
  | 'project_created'
  | 'project_updated'
  | 'project_archived'

// ─── Core Entities ────────────────────────────────────────────────────────────

export type User = {
  id: string
  email: string
  name: string
  createdAt: string // ISO 8601
}

export type Project = {
  id: string
  name: string
  description: string
  /** Preset palette color token key (e.g. 'blue', 'green') */
  color: string
  status: ProjectStatus
  createdAt: string // ISO 8601
  /** References User.id */
  ownerId: string
}

export type Task = {
  id: string
  title: string
  description: string
  priority: Priority
  status: Status
  /** References Project.id — nullable for tasks without a project */
  projectId: string | null
  /** ISO 8601 date string or null if no due date */
  dueDate: string | null
  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601
}

export type Activity = {
  id: string
  type: ActivityType
  /** ID of the entity that was acted upon (task or project) */
  entityId: string
  entityType: 'task' | 'project'
  description: string
  createdAt: string // ISO 8601
  /** References User.id */
  userId: string
}
