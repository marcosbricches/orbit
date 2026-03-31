import { DndContext, closestCorners, type DragEndEvent } from '@dnd-kit/core'
import type { Task, Status, Project } from '@/types'
import { KanbanColumn } from './KanbanColumn'
import { TASK_COLUMNS } from '../types'

type BoardViewProps = {
  tasks: Task[]
  projects: Project[]
  onAddTask: (status?: Status) => void
  onEditTask: (task: Task) => void
  onUpdateStatus: (taskId: string, status: Status) => void
}

export function BoardView({
  tasks,
  projects,
  onAddTask,
  onEditTask,
  onUpdateStatus,
}: BoardViewProps) {
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return

    const activeTaskId = active.id as string
    const overId = over.id as string

    const activeTask = tasks.find((t) => t.id === activeTaskId)
    if (!activeTask) return

    // over.id may be a column status or another task's id
    const isColumnTarget = TASK_COLUMNS.some((col) => col.id === overId)

    if (isColumnTarget) {
      const targetStatus = overId as Status
      if (activeTask.status !== targetStatus) {
        onUpdateStatus(activeTaskId, targetStatus)
      }
      return
    }

    // over.id is another task — use that task's column
    const overTask = tasks.find((t) => t.id === overId)
    if (!overTask) return
    if (activeTask.status !== overTask.status) {
      onUpdateStatus(activeTaskId, overTask.status)
    }
  }

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {TASK_COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            label={col.label}
            tasks={tasks.filter((t) => t.status === col.id)}
            projects={projects}
            onAddTask={() => onAddTask(col.id)}
            onEditTask={onEditTask}
          />
        ))}
      </div>
    </DndContext>
  )
}
