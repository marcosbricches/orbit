import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  createColumnHelper,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table'
import { format, isPast, isValid, parseISO } from 'date-fns'
import { Badge } from '@/shared/ui/Badge'
import type { Task, Status, Priority, Project } from '@/types'
import { PRIORITY_LABELS, STATUS_LABELS } from '../types'

type PriorityVariant = 'success' | 'warning' | 'error'
const PRIORITY_VARIANT: Record<Priority, PriorityVariant> = {
  low: 'success',
  medium: 'warning',
  high: 'error',
}

const STATUS_VARIANT: Record<Status, 'default' | 'info' | 'warning' | 'success'> = {
  todo: 'default',
  in_progress: 'info',
  review: 'warning',
  done: 'success',
}

const colHelper = createColumnHelper<Task>()

type UseListViewParams = {
  tasks: Task[]
  projects: Project[]
}

export function useListView({ tasks, projects }: UseListViewParams) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')

  const projectMap = useMemo(() => Object.fromEntries(projects.map((p) => [p.id, p])), [projects])

  const columns = useMemo(
    () => [
      colHelper.accessor('title', {
        header: 'Title',
        cell: (info) => (
          <span className="text-sm font-medium text-text-primary dark:text-text-inverse">
            {info.getValue()}
          </span>
        ),
        enableSorting: false,
      }),
      colHelper.accessor('projectId', {
        header: 'Project',
        cell: (info) => {
          const p = info.getValue() ? projectMap[info.getValue()!] : undefined
          if (!p) return <span className="text-xs text-text-secondary">—</span>
          return (
            <span className="flex items-center gap-1 text-xs text-text-secondary">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: p.color }}
              />
              {p.name}
            </span>
          )
        },
        enableSorting: false,
      }),
      colHelper.accessor('priority', {
        header: 'Priority',
        cell: (info) => (
          <Badge variant={PRIORITY_VARIANT[info.getValue()]}>
            {PRIORITY_LABELS[info.getValue()]}
          </Badge>
        ),
        sortingFn: (a, b) => {
          const order: Record<Priority, number> = { low: 0, medium: 1, high: 2 }
          return order[a.original.priority] - order[b.original.priority]
        },
      }),
      colHelper.accessor('dueDate', {
        header: 'Due Date',
        cell: (info) => {
          const v = info.getValue()
          if (!v || !isValid(parseISO(v)))
            return <span className="text-xs text-text-secondary">—</span>
          const overdue = isPast(parseISO(v))
          return (
            <span
              className={['text-xs', overdue ? 'text-status-error' : 'text-text-secondary'].join(
                ' ',
              )}
            >
              {format(parseISO(v), 'MMM d, yyyy')}
            </span>
          )
        },
        sortingFn: (a, b) => {
          const aDate = a.original.dueDate ? new Date(a.original.dueDate).getTime() : 0
          const bDate = b.original.dueDate ? new Date(b.original.dueDate).getTime() : 0
          return aDate - bDate
        },
      }),
      colHelper.accessor('status', {
        header: 'Status',
        cell: (info) => (
          <Badge variant={STATUS_VARIANT[info.getValue()]}>{STATUS_LABELS[info.getValue()]}</Badge>
        ),
        enableSorting: false,
      }),
    ],
    [projectMap],
  )

  const filteredData = useMemo(() => {
    return tasks.filter((t) => {
      if (statusFilter && t.status !== statusFilter) return false
      if (priorityFilter && t.priority !== priorityFilter) return false
      return true
    })
  }, [tasks, statusFilter, priorityFilter])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return {
    table,
    columns,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    rows: table.getRowModel().rows,
  }
}
