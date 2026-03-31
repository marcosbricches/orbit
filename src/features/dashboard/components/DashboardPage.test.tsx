import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { DashboardPage } from './DashboardPage'

vi.mock('../hooks/use-dashboard-stats')
vi.mock('../hooks/use-activity-feed')

import { useDashboardStats } from '../hooks/use-dashboard-stats'
import { useActivityFeed } from '../hooks/use-activity-feed'

const mockUseDashboardStats = vi.mocked(useDashboardStats)
const mockUseActivityFeed = vi.mocked(useActivityFeed)

const defaultStats = {
  stats: { totalTasks: 5, completedThisWeek: 2, overdueTasks: 1, activeProjects: 3 },
  isLoading: false,
  tasksError: null,
  projectsError: null,
}

const defaultFeed = {
  activities: [],
  isLoading: false,
  error: null,
  refetch: vi.fn(),
}

beforeEach(() => {
  vi.clearAllMocks()
  mockUseDashboardStats.mockReturnValue(defaultStats)
  mockUseActivityFeed.mockReturnValue(defaultFeed)
})

describe('DashboardPage', () => {
  it('renders the Dashboard heading', () => {
    render(<DashboardPage />)
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
  })

  it('renders all four stat card labels', () => {
    render(<DashboardPage />)
    expect(screen.getByText('Total Tasks')).toBeInTheDocument()
    expect(screen.getByText('Completed This Week')).toBeInTheDocument()
    expect(screen.getByText('Overdue Tasks')).toBeInTheDocument()
    expect(screen.getByText('Active Projects')).toBeInTheDocument()
  })

  it('displays stat values from the hook', () => {
    render(<DashboardPage />)
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders the Recent Activity section heading', () => {
    render(<DashboardPage />)
    expect(screen.getByText('Recent Activity')).toBeInTheDocument()
  })

  it('shows empty state when activity feed has no items', () => {
    render(<DashboardPage />)
    expect(screen.getByText(/no recent activity/i)).toBeInTheDocument()
  })

  it('shows loading skeletons while stats are loading', () => {
    mockUseDashboardStats.mockReturnValue({ ...defaultStats, isLoading: true })
    render(<DashboardPage />)
    // Skeleton elements are rendered — stat values should not be visible
    expect(screen.queryByText('5')).not.toBeInTheDocument()
  })
})
