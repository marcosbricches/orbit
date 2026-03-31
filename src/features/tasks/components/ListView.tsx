import { AnimatePresence, motion } from 'motion/react'
import { flexRender } from '@tanstack/react-table'
import { ChevronUpIcon, ChevronDownIcon, ChevronsUpDownIcon, ListIcon } from 'lucide-react'
import { Select } from '@/shared/ui/Select'
import { EmptyState } from '@/shared/ui/EmptyState'
import type { Task, Project } from '@/types'
import { STATUS_LABELS, PRIORITY_LABELS } from '../types'
import { useListView } from '../hooks/use-list-view'

type ListViewProps = {
  tasks: Task[]
  projects: Project[]
  onEditTask: (task: Task) => void
}

export function ListView({ tasks, projects, onEditTask }: ListViewProps) {
  const { table, columns, statusFilter, setStatusFilter, priorityFilter, setPriorityFilter, rows } =
    useListView({ tasks, projects })

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center gap-2 flex-wrap">
        <Select
          label=""
          className="w-[176px]"
          options={[
            { value: '', label: 'All statuses' },
            ...Object.entries(STATUS_LABELS).map(([v, l]) => ({ value: v, label: l })),
          ]}
          value={statusFilter}
          onChange={(v) => setStatusFilter(v)}
          placeholder="Status"
        />
        <Select
          label=""
          className="w-[176px]"
          options={[
            { value: '', label: 'All priorities' },
            ...Object.entries(PRIORITY_LABELS).map(([v, l]) => ({ value: v, label: l })),
          ]}
          value={priorityFilter}
          onChange={(v) => setPriorityFilter(v)}
          placeholder="Priority"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden bg-surface dark:bg-dark-surface dark:border-dark-border">
        <table className="w-full text-sm">
          <thead className="bg-surface-alt dark:bg-dark-surface border-b border-border dark:border-dark-border">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-semibold text-text-secondary dark:text-text-secondary tracking-wide"
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        onClick={header.column.getToggleSortingHandler()}
                        className={[
                          'flex items-center gap-1 uppercase tracking-wide rounded-sm',
                          header.column.getCanSort()
                            ? 'cursor-pointer hover:text-text-primary dark:hover:text-text-inverse focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2'
                            : 'cursor-default',
                        ].join(' ')}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="opacity-60">
                            {header.column.getIsSorted() === 'asc' ? (
                              <ChevronUpIcon size={12} />
                            ) : header.column.getIsSorted() === 'desc' ? (
                              <ChevronDownIcon size={12} />
                            ) : (
                              <ChevronsUpDownIcon size={12} />
                            )}
                          </span>
                        )}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <motion.tbody>
            <AnimatePresence>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="py-12">
                    <EmptyState
                      title="No tasks found"
                      description="Try adjusting your filters or create a new task."
                      icon={ListIcon}
                    />
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="border-b border-border dark:border-dark-border last:border-0 cursor-pointer hover:bg-surface-alt dark:hover:bg-dark-border transition-colors duration-150"
                    onClick={() => onEditTask(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </motion.tbody>
        </table>
      </div>
    </div>
  )
}
