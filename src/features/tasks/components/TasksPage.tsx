import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { LayoutGrid, List, Plus } from 'lucide-react'
import { Button } from '@/shared/ui/Button'
import { ErrorState } from '@/shared/ui/ErrorState'
import { LoadingState } from '@/shared/ui/LoadingState'
import { useProjects } from '@/shared/hooks/use-projects'
import { useTasks } from '@/shared/hooks/use-tasks'
import { useUIStore } from '../stores/use-ui-store'
import { BoardView } from './BoardView'
import { ListView } from './ListView'
import { TaskDrawer } from './TaskDrawer'
import type { Task, Status } from '@/types'
import type { TaskFormData } from '../types'

export function TasksPage() {
  const { tasks, isLoading, error, createTask, updateTask } = useTasks()
  const { projects } = useProjects()
  const { taskView, setTaskView } = useUIStore()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined)
  const [defaultStatus, setDefaultStatus] = useState<Status | undefined>(undefined)

  function openCreate(status?: Status) {
    setEditingTask(undefined)
    setDefaultStatus(status)
    setDrawerOpen(true)
  }

  function openEdit(task: Task) {
    setEditingTask(task)
    setDefaultStatus(undefined)
    setDrawerOpen(true)
  }

  async function handleSubmit(data: TaskFormData) {
    const projectId = data.projectId !== '' ? data.projectId : null
    const dueDate = data.dueDate !== '' ? data.dueDate : null
    if (editingTask) {
      await updateTask({ id: editingTask.id, data: { ...data, projectId, dueDate } })
    } else {
      await createTask({ ...data, projectId, dueDate })
    }
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load tasks"
        description="Could not fetch tasks. Please try again."
        retry={() => window.location.reload()}
      />
    )
  }

  const drawerKey = editingTask ? editingTask.id : `create-${defaultStatus ?? 'todo'}`

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-text-primary dark:text-text-inverse">Tasks</h1>
        <div className="flex items-center gap-3">
          {/* Board / List toggle */}
          <div className="flex rounded-md border border-border dark:border-dark-border overflow-hidden">
            <button
              onClick={() => setTaskView('board')}
              aria-label="Board view"
              aria-pressed={taskView === 'board'}
              className={[
                'p-2 transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500',
                taskView === 'board'
                  ? 'bg-primary-500 text-text-inverse'
                  : 'bg-surface text-text-secondary hover:bg-surface-alt dark:bg-dark-surface dark:text-text-secondary dark:hover:bg-dark-border',
              ].join(' ')}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setTaskView('list')}
              aria-label="List view"
              aria-pressed={taskView === 'list'}
              className={[
                'p-2 transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 border-l border-border dark:border-dark-border',
                taskView === 'list'
                  ? 'bg-primary-500 text-text-inverse'
                  : 'bg-surface text-text-secondary hover:bg-surface-alt dark:bg-dark-surface dark:text-text-secondary dark:hover:bg-dark-border',
              ].join(' ')}
            >
              <List size={16} />
            </button>
          </div>
          <Button variant="primary" size="sm" onClick={() => openCreate()}>
            <Plus size={16} />
            New task
          </Button>
        </div>
      </div>

      {/* Main content */}
      {isLoading ? (
        <LoadingState variant="spinner" />
      ) : (
        <AnimatePresence mode="wait">
          {taskView === 'board' ? (
            <motion.div
              key="board"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.15 }}
            >
              <BoardView
                tasks={tasks}
                projects={projects}
                onAddTask={openCreate}
                onEditTask={openEdit}
                onUpdateStatus={(id, status) => void updateTask({ id, data: { status } })}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
            >
              <ListView tasks={tasks} projects={projects} onEditTask={openEdit} />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Task Drawer — keyed to force form re-init on task change */}
      <TaskDrawer
        key={drawerKey}
        open={drawerOpen}
        task={editingTask}
        defaultStatus={defaultStatus}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
