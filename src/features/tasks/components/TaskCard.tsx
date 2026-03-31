import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'motion/react'
import { format, isPast, isValid, parseISO } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Badge } from '@/shared/ui/Badge'
import type { Task, Priority, Project } from '@/types'

type PriorityVariant = 'success' | 'warning' | 'error'

const PRIORITY_VARIANT: Record<Priority, PriorityVariant> = {
  low: 'success',
  medium: 'warning',
  high: 'error',
}

const PRIORITY_LABEL: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

type TaskCardProps = {
  task: Task
  project?: Project
  onClick: () => void
}

export function TaskCard({ task, project, onClick }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const isOverdue =
    task.dueDate != null &&
    task.dueDate !== '' &&
    isValid(parseISO(task.dueDate)) &&
    isPast(parseISO(task.dueDate))

  function handleClick() {
    if (isDragging) return
    onClick()
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={[
        'rounded-md bg-surface border border-border p-3',
        'cursor-grab active:cursor-grabbing select-none outline-none',
        'shadow-sm hover:shadow-md transition-shadow duration-150',
        'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1',
        'dark:bg-dark-surface dark:border-dark-border',
        isDragging ? 'opacity-50 shadow-lg' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={handleClick}
    >
      <p className="text-sm font-medium text-text-primary dark:text-text-inverse leading-snug mb-2 line-clamp-2">
        {task.title}
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant={PRIORITY_VARIANT[task.priority]}>{PRIORITY_LABEL[task.priority]}</Badge>
        {task.dueDate && task.dueDate !== '' && isValid(parseISO(task.dueDate)) && (
          <span
            className={[
              'flex items-center gap-1 text-xs',
              isOverdue ? 'text-status-error' : 'text-text-secondary',
            ].join(' ')}
          >
            <CalendarIcon size={12} />
            {format(parseISO(task.dueDate), 'MMM d')}
          </span>
        )}
        {project && (
          <span className="flex items-center gap-1 text-xs text-text-secondary">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: project.color }}
            />
            {project.name}
          </span>
        )}
      </div>
    </motion.div>
  )
}
