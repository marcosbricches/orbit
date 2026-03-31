import { renderHook } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { useDashboardStats } from './use-dashboard-stats'

vi.mock('@/shared/hooks/use-tasks')
vi.mock('@/shared/hooks/use-projects')

import { useTasks } from '@/shared/hooks/use-tasks'
import { useProjects } from '@/shared/hooks/use-projects'

const mockUseTasks = vi.mocked(useTasks)
const mockUseProjects = vi.mocked(useProjects)

const today = new Date().toISOString()
const pastDate = '2020-01-01'
const futureDate = '2099-12-31'

const baseTasks = [
  {
    id: 't1',
    title: 'Task 1',
    status: 'todo' as const,
    dueDate: null,
    updatedAt: today,
    createdAt: today,
    projectId: null,
    description: '',
    priority: 'medium' as const,
    assigneeId: null,
  },
  {
    id: 't2',
    title: 'Task 2',
    status: 'done' as const,
    dueDate: null,
    updatedAt: today,
    createdAt: today,
    projectId: null,
    description: '',
    priority: 'medium' as const,
    assigneeId: null,
  },
  {
    id: 't3',
    title: 'Task 3',
    status: 'in_progress' as const,
    dueDate: pastDate,
    updatedAt: today,
    createdAt: today,
    projectId: null,
    description: '',
    priority: 'medium' as const,
    assigneeId: null,
  },
  {
    id: 't4',
    title: 'Task 4',
    status: 'todo' as const,
    dueDate: futureDate,
    updatedAt: today,
    createdAt: today,
    projectId: null,
    description: '',
    priority: 'medium' as const,
    assigneeId: null,
  },
]

const baseProjects = [
  {
    id: 'p1',
    name: 'Active A',
    status: 'active' as const,
    color: '#6366f1',
    description: '',
    createdAt: today,
    ownerId: 'u1',
  },
  {
    id: 'p2',
    name: 'Active B',
    status: 'active' as const,
    color: '#6366f1',
    description: '',
    createdAt: today,
    ownerId: 'u1',
  },
  {
    id: 'p3',
    name: 'Archived',
    status: 'archived' as const,
    color: '#6366f1',
    description: '',
    createdAt: today,
    ownerId: 'u1',
  },
]

function mockIdle(tasks = baseTasks, projects = baseProjects) {
  mockUseTasks.mockReturnValue({
    tasks,
    isLoading: false,
    error: null,
    createTask: vi.fn(),
    updateTask: vi.fn(),
    deleteTask: vi.fn(),
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
  })
  mockUseProjects.mockReturnValue({
    projects,
    isLoading: false,
    error: null,
    createProject: vi.fn(),
    updateProject: vi.fn(),
    archiveProject: vi.fn(),
    isCreating: false,
    isUpdating: false,
    isArchiving: false,
  })
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('useDashboardStats', () => {
  it('returns correct totalTasks count', () => {
    mockIdle()
    const { result } = renderHook(() => useDashboardStats())
    expect(result.current.stats.totalTasks).toBe(4)
  })

  it('counts completed-this-week tasks (status=done, updatedAt this week)', () => {
    mockIdle()
    const { result } = renderHook(() => useDashboardStats())
    // t2 has status=done and updatedAt=today (within current week)
    expect(result.current.stats.completedThisWeek).toBe(1)
  })

  it('counts overdue tasks (dueDate < today, status !== done)', () => {
    mockIdle()
    const { result } = renderHook(() => useDashboardStats())
    // t3 has dueDate=pastDate and status=in_progress → overdue
    // t4 has dueDate=futureDate → not overdue
    expect(result.current.stats.overdueTasks).toBe(1)
  })

  it('does not count done tasks as overdue', () => {
    const tasksWithDoneOverdue = [
      ...baseTasks,
      {
        id: 't5',
        title: 'Done old',
        status: 'done' as const,
        dueDate: pastDate,
        updatedAt: today,
        createdAt: today,
        projectId: null,
        description: '',
        priority: 'medium' as const,
        assigneeId: null,
      },
    ]
    mockIdle(tasksWithDoneOverdue)
    const { result } = renderHook(() => useDashboardStats())
    // t5 is done so should not be overdue; still only t3
    expect(result.current.stats.overdueTasks).toBe(1)
  })

  it('counts only active projects', () => {
    mockIdle()
    const { result } = renderHook(() => useDashboardStats())
    // p1 and p2 are active; p3 is archived
    expect(result.current.stats.activeProjects).toBe(2)
  })

  it('returns isLoading=true when either query is loading', () => {
    mockUseTasks.mockReturnValue({
      tasks: [],
      isLoading: true,
      error: null,
      createTask: vi.fn(),
      updateTask: vi.fn(),
      deleteTask: vi.fn(),
      isCreating: false,
      isUpdating: false,
      isDeleting: false,
    })
    mockUseProjects.mockReturnValue({
      projects: [],
      isLoading: false,
      error: null,
      createProject: vi.fn(),
      updateProject: vi.fn(),
      archiveProject: vi.fn(),
      isCreating: false,
      isUpdating: false,
      isArchiving: false,
    })
    const { result } = renderHook(() => useDashboardStats())
    expect(result.current.isLoading).toBe(true)
  })

  it('returns tasksError when tasks query fails', () => {
    const err = new Error('tasks failed')
    mockUseTasks.mockReturnValue({
      tasks: [],
      isLoading: false,
      error: err,
      createTask: vi.fn(),
      updateTask: vi.fn(),
      deleteTask: vi.fn(),
      isCreating: false,
      isUpdating: false,
      isDeleting: false,
    })
    mockUseProjects.mockReturnValue({
      projects: [],
      isLoading: false,
      error: null,
      createProject: vi.fn(),
      updateProject: vi.fn(),
      archiveProject: vi.fn(),
      isCreating: false,
      isUpdating: false,
      isArchiving: false,
    })
    const { result } = renderHook(() => useDashboardStats())
    expect(result.current.tasksError).toBe(err)
  })
})
