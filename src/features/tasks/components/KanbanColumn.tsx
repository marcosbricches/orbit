import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { AnimatePresence } from 'motion/react'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/shared/ui/Button'
import { TaskCard } from './TaskCard'
import type { Task, Status, Project } from '@/types'

type KanbanColumnProps = {
  id: Status
  label: string
  tasks: Task[]
  projects: Project[]
  onAddTask: () => void
  onEditTask: (task: Task) => void
}

export function KanbanColumn({
  id,
  label,
  tasks,
  projects,
  onAddTask,
  onEditTask,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })
  const projectMap = Object.fromEntries(projects.map((p) => [p.id, p]))

  return (
    <div className="flex flex-col min-w-[260px] max-w-[300px] flex-shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-text-primary dark:text-text-inverse">
            {label}
          </span>
          <span className="text-xs font-medium bg-primary-100 text-primary-500 dark:bg-primary-500/20 dark:text-text-inverse rounded-full px-2 py-0.5">
            {tasks.length}
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={onAddTask} aria-label={`Add task to ${label}`}>
          <PlusIcon size={16} />
        </Button>
      </div>

      {/* Drop zone */}
      <div
        ref={setNodeRef}
        className={[
          'flex flex-col gap-2 min-h-[120px] rounded-md p-2 transition-colors duration-150',
          isOver ? 'bg-primary-50 dark:bg-primary-500/10' : 'bg-surface-alt dark:bg-dark-surface',
        ].join(' ')}
      >
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                project={task.projectId ? projectMap[task.projectId] : undefined}
                onClick={() => onEditTask(task)}
              />
            ))}
          </AnimatePresence>
        </SortableContext>
        {tasks.length === 0 && !isOver && (
          <div className="flex items-center justify-center h-16">
            <p className="text-xs text-text-secondary">No tasks</p>
          </div>
        )}
      </div>
    </div>
  )
}
