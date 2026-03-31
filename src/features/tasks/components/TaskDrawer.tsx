import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { XIcon } from 'lucide-react'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Textarea } from '@/shared/ui/Textarea'
import { Select } from '@/shared/ui/Select'
import { useProjects } from '@/shared/hooks/use-projects'
import { useTaskForm } from '../hooks/use-task-form'
import type { Task, Status } from '@/types'
import type { TaskFormData } from '../types'

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

const STATUS_OPTIONS = [
  { value: 'todo', label: 'Todo' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'review', label: 'Review' },
  { value: 'done', label: 'Done' },
]

type TaskDrawerProps = {
  open: boolean
  task?: Task
  defaultStatus?: Status
  onClose: () => void
  onSubmit: (data: TaskFormData) => Promise<void>
}

export function TaskDrawer({ open, task, defaultStatus, onClose, onSubmit }: TaskDrawerProps) {
  const { projects } = useProjects()

  const projectOptions = [
    { value: '', label: 'No project' },
    ...projects.map((p) => ({ value: p.id, label: p.name })),
  ]

  const initialData: Partial<TaskFormData> = task
    ? {
        title: task.title,
        description: task.description ?? '',
        priority: task.priority,
        status: task.status,
        projectId: task.projectId ?? '',
        dueDate: task.dueDate ?? '',
      }
    : { status: defaultStatus ?? 'todo' }

  const { form, setField, errors, isSubmitting, serverError, handleSubmit } = useTaskForm({
    initialData,
    onSubmit,
    onSuccess: onClose,
  })

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  const title = task ? 'Edit task' : 'New task'

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal aria-label={title}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute right-0 top-0 h-full w-full max-w-[480px] bg-surface dark:bg-dark-surface shadow-lg flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border dark:border-dark-border">
              <h2 className="text-lg font-semibold text-text-primary dark:text-text-inverse">
                {title}
              </h2>
              <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
                <XIcon size={18} />
              </Button>
            </div>

            {/* Form body */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
                <Input
                  label="Title *"
                  placeholder="Task title"
                  value={form.title}
                  onChange={(e) => setField('title', e.target.value)}
                  error={errors.title}
                  autoFocus
                />
                <Textarea
                  label="Description"
                  placeholder="Optional description"
                  value={form.description}
                  onChange={(e) => setField('description', e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Priority *"
                    options={PRIORITY_OPTIONS}
                    value={form.priority}
                    onChange={(v) => setField('priority', v as TaskFormData['priority'])}
                    error={errors.priority}
                  />
                  <Select
                    label="Status *"
                    options={STATUS_OPTIONS}
                    value={form.status}
                    onChange={(v) => setField('status', v as TaskFormData['status'])}
                    error={errors.status}
                  />
                </div>
                <Select
                  label="Project"
                  options={projectOptions}
                  value={form.projectId}
                  onChange={(v) => setField('projectId', v)}
                  placeholder="No project"
                />
                <Input
                  label="Due Date"
                  placeholder="YYYY-MM-DD"
                  value={form.dueDate}
                  onChange={(e) => setField('dueDate', e.target.value)}
                  pattern="\d{4}-\d{2}-\d{2}"
                  title="Enter date as YYYY-MM-DD"
                />
                {serverError && (
                  <p className="text-sm text-status-error" role="alert">
                    {serverError}
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 px-6 py-4 border-t border-border dark:border-dark-border">
                <Button type="button" variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" loading={isSubmitting}>
                  {task ? 'Save changes' : 'Create task'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
