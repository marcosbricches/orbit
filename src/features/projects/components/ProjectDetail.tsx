import { useState } from 'react'
import { ArrowLeft, Pencil, Archive, ListTodo } from 'lucide-react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { Button } from '@/shared/ui/Button'
import { Badge } from '@/shared/ui/Badge'
import { EmptyState } from '@/shared/ui/EmptyState'
import { ErrorState } from '@/shared/ui/ErrorState'
import { Skeleton } from '@/shared/ui/Skeleton'
import { Dialog } from '@/shared/ui/Dialog'
import { useProjects } from '@/shared/hooks/use-projects'
import { ProjectFormDialog } from './ProjectForm'

export function ProjectDetail() {
  const navigate = useNavigate()
  const params = useParams({ strict: false })
  const projectId = (params as Record<string, string>).projectId
  const [editOpen, setEditOpen] = useState(false)
  const [archiveConfirmOpen, setArchiveConfirmOpen] = useState(false)
  const { projects, isLoading, error, archiveProject, isArchiving } = useProjects()

  const project = projects.find((p) => p.id === projectId)

  if (error) {
    return (
      <ErrorState
        title="Failed to load project"
        description="There was a problem loading this project."
        retry={() => void navigate({ to: '/projects' })}
      />
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton variant="text" width={120} height={20} />
        <Skeleton variant="rectangular" height={140} />
        <Skeleton variant="rectangular" height={200} />
      </div>
    )
  }

  if (!project) {
    return (
      <ErrorState
        title="Project not found"
        description="This project may have been deleted or moved."
        retry={() => void navigate({ to: '/projects' })}
      />
    )
  }

  function handleArchive() {
    void archiveProject(projectId).then(() => {
      setArchiveConfirmOpen(false)
      void navigate({ to: '/projects' })
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Back navigation */}
      <button
        onClick={() => void navigate({ to: '/projects' })}
        className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary active:opacity-60 dark:hover:text-text-inverse transition-colors w-fit rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      >
        <ArrowLeft className="w-4 h-4" />
        All Projects
      </button>

      {/* Project header card */}
      <div className="bg-surface rounded-lg border border-border shadow-sm overflow-hidden dark:bg-dark-surface dark:border-dark-border">
        {/* Color strip — dynamic user color, approved Token-First exception */}
        <div className="h-2 w-full" style={{ backgroundColor: project.color }} />
        <div className="p-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-text-primary dark:text-text-inverse">
              {project.name}
            </h1>
            {project.description && (
              <p className="text-sm text-text-secondary max-w-prose">{project.description}</p>
            )}
            <Badge variant={project.status === 'active' ? 'success' : 'default'}>
              {project.status === 'active' ? 'Active' : 'Archived'}
            </Badge>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="secondary" size="sm" onClick={() => setEditOpen(true)}>
              <Pencil className="w-3.5 h-3.5 mr-1.5" />
              Edit
            </Button>
            {project.status === 'active' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setArchiveConfirmOpen(true)}
                disabled={isArchiving}
              >
                <Archive className="w-3.5 h-3.5 mr-1.5" />
                Archive
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Task list placeholder */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-text-primary dark:text-text-inverse">Tasks</h2>
        <div className="bg-surface rounded-lg border border-border dark:bg-dark-surface dark:border-dark-border">
          <EmptyState
            icon={ListTodo}
            title="Tasks coming soon"
            description="Task management will be available in the next update."
          />
        </div>
      </div>

      {/* Edit dialog */}
      <ProjectFormDialog open={editOpen} onClose={() => setEditOpen(false)} project={project} />

      {/* Archive confirmation dialog */}
      <Dialog
        open={archiveConfirmOpen}
        onClose={() => setArchiveConfirmOpen(false)}
        title="Archive Project"
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-text-secondary dark:text-text-inverse/70">
            Are you sure you want to archive{' '}
            <strong className="text-text-primary dark:text-text-inverse">{project.name}</strong>? It
            will be removed from your active projects.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setArchiveConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleArchive} loading={isArchiving}>
              Archive
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
