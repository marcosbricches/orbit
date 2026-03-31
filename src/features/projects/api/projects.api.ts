import type { Project } from '@/types'

const STORAGE_KEY = 'orbit_projects'
const OWNER_ID = 'dev-user-1'

const SEED_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'Website Redesign',
    description: 'Redesign the company website with new branding and improved UX.',
    color: '#6366f1',
    status: 'active',
    createdAt: '2026-01-15T10:00:00.000Z',
    ownerId: OWNER_ID,
  },
  {
    id: 'proj-2',
    name: 'Mobile App',
    description: 'Build the iOS and Android apps for the product launch.',
    color: '#3b82f6',
    status: 'active',
    createdAt: '2026-02-01T09:00:00.000Z',
    ownerId: OWNER_ID,
  },
  {
    id: 'proj-3',
    name: 'Q1 Marketing',
    description: 'Marketing campaigns and materials for Q1.',
    color: '#22c55e',
    status: 'archived',
    createdAt: '2026-01-01T08:00:00.000Z',
    ownerId: OWNER_ID,
  },
]

function load(): Project[] {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PROJECTS))
    return SEED_PROJECTS
  }
  try {
    return JSON.parse(stored) as Project[]
  } catch {
    return SEED_PROJECTS
  }
}

function save(projects: Project[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

const delay = () => new Promise<void>((resolve) => setTimeout(resolve, 300))

export type CreateProjectInput = Omit<Project, 'id' | 'createdAt' | 'ownerId'>

export const fetchProjects = async (): Promise<Project[]> => {
  await delay()
  return load()
}

export const createProjectInStorage = async (data: CreateProjectInput): Promise<Project> => {
  await delay()
  const projects = load()
  const newProject: Project = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ownerId: OWNER_ID,
  }
  save([...projects, newProject])
  return newProject
}

export const updateProjectInStorage = async (
  id: string,
  data: CreateProjectInput,
): Promise<Project> => {
  await delay()
  const projects = load()
  const index = projects.findIndex((p) => p.id === id)
  if (index === -1) throw new Error(`Project ${id} not found`)
  const updated: Project = { ...projects[index], ...data }
  const next = [...projects]
  next[index] = updated
  save(next)
  return updated
}

export const archiveProjectInStorage = async (id: string): Promise<Project> => {
  await delay()
  const projects = load()
  const index = projects.findIndex((p) => p.id === id)
  if (index === -1) throw new Error(`Project ${id} not found`)
  const next = [...projects]
  next[index] = { ...next[index], status: 'archived' }
  save(next)
  return next[index]
}
