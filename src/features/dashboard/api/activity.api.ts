import type { Activity } from '@/types'

const STORAGE_KEY = 'orbit_activity'

const SEED_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    type: 'task_created',
    entityId: 'task-1',
    entityType: 'task',
    description: 'Created task "Set up project infrastructure"',
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    userId: 'dev-user',
  },
  {
    id: 'act-2',
    type: 'project_created',
    entityId: 'proj-1',
    entityType: 'project',
    description: 'Created project "Website Redesign"',
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    userId: 'dev-user',
  },
  {
    id: 'act-3',
    type: 'task_moved',
    entityId: 'task-1',
    entityType: 'task',
    description: 'Moved "Set up project infrastructure" to Done',
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    userId: 'dev-user',
  },
  {
    id: 'act-4',
    type: 'task_created',
    entityId: 'task-2',
    entityType: 'task',
    description: 'Created task "Design the authentication flow"',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    userId: 'dev-user',
  },
  {
    id: 'act-5',
    type: 'task_created',
    entityId: 'task-3',
    entityType: 'task',
    description: 'Created task "Implement dashboard analytics"',
    createdAt: new Date(Date.now() - 2 * 86400000 - 3600000).toISOString(),
    userId: 'dev-user',
  },
  {
    id: 'act-6',
    type: 'task_created',
    entityId: 'task-4',
    entityType: 'task',
    description: 'Created task "Write API documentation"',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    userId: 'dev-user',
  },
  {
    id: 'act-7',
    type: 'project_updated',
    entityId: 'proj-1',
    entityType: 'project',
    description: 'Updated project "Website Redesign" description',
    createdAt: new Date(Date.now() - 86400000 - 7200000).toISOString(),
    userId: 'dev-user',
  },
  {
    id: 'act-8',
    type: 'task_updated',
    entityId: 'task-2',
    entityType: 'task',
    description: 'Updated priority of "Design the authentication flow" to High',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    userId: 'dev-user',
  },
  {
    id: 'act-9',
    type: 'task_created',
    entityId: 'task-5',
    entityType: 'task',
    description: 'Created task "Fix mobile navigation overlap"',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    userId: 'dev-user',
  },
  {
    id: 'act-10',
    type: 'task_moved',
    entityId: 'task-4',
    entityType: 'task',
    description: 'Moved "Write API documentation" to Review',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    userId: 'dev-user',
  },
]

function load(): Activity[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      save(SEED_ACTIVITIES)
      return SEED_ACTIVITIES
    }
    return JSON.parse(raw) as Activity[]
  } catch {
    return SEED_ACTIVITIES
  }
}

function save(activities: Activity[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activities))
}

function delay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 300))
}

export async function fetchActivities(): Promise<Activity[]> {
  await delay()
  return load()
}

export async function addActivity(activity: Omit<Activity, 'id' | 'createdAt'>): Promise<Activity> {
  await delay()
  const activities = load()
  const newActivity: Activity = {
    ...activity,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  save([newActivity, ...activities])
  return newActivity
}
