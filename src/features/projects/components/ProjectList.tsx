import { useState } from 'react'
import { FolderOpen, Plus } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/shared/ui/Button'
import { EmptyState } from '@/shared/ui/EmptyState'
import { ErrorState } from '@/shared/ui/ErrorState'
import { Skeleton } from '@/shared/ui/Skeleton'
import { cn } from '@/shared/lib/cn'
import { useProjects } from '@/shared/hooks/use-projects'
import { ProjectCard } from './ProjectCard'
import { ProjectFormDialog } from './ProjectForm'
import type { Project } from '@/types'

type StatusFilter = 'active' | 'archived'

function ProjectCardSkeleton() {
  return (
    <div className="bg-surface rounded-md border border-border shadow-sm overflow-hidden dark:bg-dark-surface dark:border-dark-border">
      <div className="h-1 w-full bg-surface-alt dark:bg-dark-border" />
      <div className="p-4 flex flex-col gap-3">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="rectangular" height={20} width="30%" />
      </div>
    </div>
  )
}

export function ProjectList() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<StatusFilter>('active')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editProject, setEditProject] = useState<Project | undefined>()
  const { projects, isLoading, error, archiveProject } = useProjects()

  const filtered = projects.filter((p) => p.status === filter)

  function handleCardClick(projectId: string) {
    void navigate({ to: '/projects/$projectId', params: { projectId } })
  }

  function handleEdit(project: Project) {
    setEditProject(project)
    setDialogOpen(true)
  }

  function handleArchive(projectId: string) {
    void archiveProject(projectId)
  }

  function handleDialogClose() {
    setDialogOpen(false)
    setEditProject(undefined)
  }

  function handleFormSuccess(projectId: string) {
    if (!editProject) {
      void navigate({ to: '/projects/$projectId', params: { projectId } })
    }
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load projects"
        description="There was a problem loading your projects. Please try again."
      />
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-text-primary dark:text-text-inverse">
          Projects{!isLoading && ` (${filtered.length})`}
        </h1>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setEditProject(undefined)
            setDialogOpen(true)
          }}
          disabled={isLoading}
        >
          <Plus className="w-4 h-4 mr-1.5" />
          New Project
        </Button>
      </div>

      {/* Status filter toggle */}
      <div className="flex items-center gap-1 bg-surface-alt dark:bg-dark-border rounded-md p-1 w-fit">
        {(['active', 'archived'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={cn(
              'px-3 py-1.5 text-sm font-medium rounded-sm transition-all capitalize active:scale-[0.97]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              filter === status
                ? 'bg-surface text-text-primary shadow-sm dark:bg-dark-surface dark:text-text-inverse'
                : 'text-text-muted hover:text-text-primary dark:text-text-inverse/70 dark:hover:text-text-inverse',
            )}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Loading skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && filtered.length === 0 && (
        <EmptyState
          icon={FolderOpen}
          title={filter === 'active' ? 'No active projects' : 'No archived projects'}
          description={
            filter === 'active'
              ? 'Create your first project to get started.'
              : 'Projects you archive will appear here.'
          }
          action={
            filter === 'active'
              ? { label: 'New Project', onClick: () => setDialogOpen(true) }
              : undefined
          }
        />
      )}

      {/* Project grid */}
      {!isLoading && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleCardClick(project.id)}
              onEdit={() => handleEdit(project)}
              onArchive={() => handleArchive(project.id)}
            />
          ))}
        </div>
      )}

      <ProjectFormDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        project={editProject}
        onSuccess={handleFormSuccess}
      />
    </div>
  )
}
