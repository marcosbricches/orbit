import type { Task } from '@/types'

type CreateTaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>

const STORAGE_KEY = 'orbit_tasks'

const SEED_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Set up project infrastructure',
    description: 'Initialize the repository and configure build tools.',
    priority: 'high',
    status: 'done',
    projectId: null,
    dueDate: null,
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: 'task-2',
    title: 'Design the authentication flow',
    description: 'Create wireframes and mockups for login and registration.',
    priority: 'medium',
    status: 'in_progress',
    projectId: null,
    dueDate: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'task-3',
    title: 'Implement dashboard analytics',
    description: 'Add charts and metrics to the dashboard.',
    priority: 'low',
    status: 'todo',
    projectId: null,
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 'task-4',
    title: 'Write API documentation',
    description: 'Document all REST endpoints for the public API.',
    priority: 'medium',
    status: 'review',
    projectId: null,
    dueDate: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 'task-5',
    title: 'Fix mobile navigation overlap',
    description: 'The nav overlaps content on small screens.',
    priority: 'high',
    status: 'todo',
    projectId: null,
    dueDate: null,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
]

function load(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      save(SEED_TASKS)
      return SEED_TASKS
    }
    return JSON.parse(raw) as Task[]
  } catch {
    return SEED_TASKS
  }
}

function save(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

function delay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 300))
}

export async function fetchTasks(): Promise<Task[]> {
  await delay()
  return load()
}

export async function createTaskInStorage(data: CreateTaskInput): Promise<Task> {
  await delay()
  const tasks = load()
  const now = new Date().toISOString()
  const task: Task = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now }
  save([...tasks, task])
  return task
}

export async function updateTaskInStorage(
  id: string,
  data: Partial<CreateTaskInput>,
): Promise<Task> {
  await delay()
  const tasks = load()
  const index = tasks.findIndex((t) => t.id === id)
  if (index === -1) throw new Error(`Task ${id} not found`)
  const updated: Task = { ...tasks[index], ...data, updatedAt: new Date().toISOString() }
  const next = [...tasks]
  next[index] = updated
  save(next)
  return updated
}

export async function deleteTaskInStorage(id: string): Promise<void> {
  await delay()
  save(load().filter((t) => t.id !== id))
}
