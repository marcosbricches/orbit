import { Dialog } from '@/shared/ui/Dialog'
import { Input } from '@/shared/ui/Input'
import { Textarea } from '@/shared/ui/Textarea'
import { Select } from '@/shared/ui/Select'
import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'
import { useProjects } from '@/shared/hooks/use-projects'
import { useProjectForm } from '../hooks/use-project-form'
import { PROJECT_COLORS } from '../types'
import type { Project } from '@/types'

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'archived', label: 'Archived' },
]

export type ProjectFormDialogProps = {
  open: boolean
  onClose: () => void
  project?: Project
  onSuccess?: (projectId: string) => void
}

export function ProjectFormDialog({ open, onClose, project, onSuccess }: ProjectFormDialogProps) {
  const { createProject, updateProject } = useProjects()
  const isEditing = Boolean(project)

  const { form, setField, errors, isSubmitting, serverError, handleSubmit } = useProjectForm({
    initialData: project
      ? {
          name: project.name,
          description: project.description,
          color: project.color,
          status: project.status,
        }
      : undefined,
    onSubmit: async (data) => {
      if (isEditing && project) {
        await updateProject(project.id, data)
        onSuccess?.(project.id)
      } else {
        const created = await createProject(data)
        onSuccess?.(created.id)
      }
    },
    onSuccess: onClose,
  })

  return (
    <Dialog open={open} onClose={onClose} title={isEditing ? 'Edit Project' : 'New Project'}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Name"
          value={form.name}
          onChange={(e) => setField('name', e.target.value)}
          error={errors.name}
          placeholder="Project name"
          autoFocus
        />
        <Textarea
          label="Description"
          value={form.description}
          onChange={(e) => setField('description', e.target.value)}
          placeholder="What is this project about?"
          rows={3}
        />
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-text-primary dark:text-text-inverse">
            Color
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {PROJECT_COLORS.map((c) => (
              <button
                key={c.key}
                type="button"
                aria-label={c.label}
                onClick={() => setField('color', c.hex)}
                className={cn(
                  'w-7 h-7 rounded-full transition-transform hover:scale-110 active:scale-95',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                  form.color === c.hex && 'ring-2 ring-offset-2 ring-primary-500',
                )}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
          {errors.color && (
            <p className="text-sm text-status-error" role="alert">
              {errors.color}
            </p>
          )}
        </div>
        <Select
          label="Status"
          options={STATUS_OPTIONS}
          value={form.status}
          onChange={(v) => setField('status', v as 'active' | 'archived')}
          error={errors.status}
        />
        {serverError && (
          <p className="text-sm text-status-error" role="alert">
            {serverError}
          </p>
        )}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={isSubmitting}>
            {isEditing ? 'Save Changes' : 'Create Project'}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
