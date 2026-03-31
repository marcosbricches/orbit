import { render, screen, fireEvent } from '@testing-library/react'
import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { TaskCard } from './TaskCard'
import type { Task } from '@/types'

const mockTask: Task = {
  id: 'task-1',
  title: 'Fix login bug',
  description: 'Users cannot log in with SSO',
  priority: 'high',
  status: 'in_progress',
  projectId: null,
  dueDate: null,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
}

function renderCard(props: Partial<Parameters<typeof TaskCard>[0]> = {}) {
  return render(
    <DndContext>
      <SortableContext items={[mockTask.id]}>
        <TaskCard task={mockTask} onClick={vi.fn()} {...props} />
      </SortableContext>
    </DndContext>,
  )
}

describe('TaskCard', () => {
  it('renders task title', () => {
    renderCard()
    expect(screen.getByText('Fix login bug')).toBeInTheDocument()
  })

  it('renders high priority badge', () => {
    renderCard()
    expect(screen.getByText('High')).toBeInTheDocument()
  })

  it('shows project dot and name when project is provided', () => {
    const project = {
      id: 'proj-1',
      name: 'Alpha',
      color: '#6366f1',
      description: '',
      status: 'active' as const,
      createdAt: '2026-01-01T00:00:00.000Z',
      ownerId: 'user-1',
    }
    renderCard({ project })
    expect(screen.getByText('Alpha')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    renderCard({ onClick })
    fireEvent.click(screen.getByText('Fix login bug'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders overdue date in red when dueDate is in the past', () => {
    const overdueTask: Task = { ...mockTask, dueDate: '2020-01-01' }
    render(
      <DndContext>
        <SortableContext items={[overdueTask.id]}>
          <TaskCard task={overdueTask} onClick={vi.fn()} />
        </SortableContext>
      </DndContext>,
    )
    const dateEl = screen.getByText(/Jan 1/)
    expect(dateEl.className).toContain('text-status-error')
  })
})
