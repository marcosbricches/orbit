import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProjectCard } from './ProjectCard'
import type { Project } from '@/types'

const mockProject: Project = {
  id: 'proj-1',
  name: 'Test Project',
  description: 'A test project description',
  color: '#6366f1',
  status: 'active',
  createdAt: '2026-01-01T00:00:00.000Z',
  ownerId: 'user-1',
}

describe('ProjectCard', () => {
  it('renders project name and description', () => {
    render(
      <ProjectCard project={mockProject} onClick={vi.fn()} onEdit={vi.fn()} onArchive={vi.fn()} />,
    )
    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('A test project description')).toBeInTheDocument()
  })

  it('calls onClick when card is clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    render(
      <ProjectCard project={mockProject} onClick={onClick} onEdit={vi.fn()} onArchive={vi.fn()} />,
    )

    await user.click(screen.getByRole('button', { name: /view project/i }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('shows edit and archive in menu after clicking 3-dot button', async () => {
    const user = userEvent.setup()

    render(
      <ProjectCard project={mockProject} onClick={vi.fn()} onEdit={vi.fn()} onArchive={vi.fn()} />,
    )

    await user.click(screen.getByRole('button', { name: /project options/i }))
    expect(screen.getByRole('button', { name: /^edit$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^archive$/i })).toBeInTheDocument()
  })

  it('calls onEdit when Edit is clicked from menu', async () => {
    const onEdit = vi.fn()
    const user = userEvent.setup()

    render(
      <ProjectCard project={mockProject} onClick={vi.fn()} onEdit={onEdit} onArchive={vi.fn()} />,
    )

    await user.click(screen.getByRole('button', { name: /project options/i }))
    await user.click(screen.getByRole('button', { name: /^edit$/i }))
    expect(onEdit).toHaveBeenCalledOnce()
  })

  it('does not show archive action for archived project', async () => {
    const archivedProject = { ...mockProject, status: 'archived' as const }
    const user = userEvent.setup()

    render(
      <ProjectCard
        project={archivedProject}
        onClick={vi.fn()}
        onEdit={vi.fn()}
        onArchive={vi.fn()}
      />,
    )

    await user.click(screen.getByRole('button', { name: /project options/i }))
    expect(screen.queryByRole('button', { name: /^archive$/i })).not.toBeInTheDocument()
  })
})
