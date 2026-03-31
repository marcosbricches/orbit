import { useState } from 'react'
import { MoreHorizontal, Archive, Pencil } from 'lucide-react'
import { Badge } from '@/shared/ui/Badge'
import { cn } from '@/shared/lib/cn'
import type { Project } from '@/types'

export type ProjectCardProps = {
  project: Project
  onClick: () => void
  onEdit: () => void
  onArchive: () => void
}

export function ProjectCard({ project, onClick, onEdit, onArchive }: ProjectCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  function handleMenuClick(e: React.MouseEvent) {
    e.stopPropagation()
    setMenuOpen((prev) => !prev)
  }

  function handleEdit(e: React.MouseEvent) {
    e.stopPropagation()
    setMenuOpen(false)
    onEdit()
  }

  function handleArchive(e: React.MouseEvent) {
    e.stopPropagation()
    setMenuOpen(false)
    onArchive()
  }

  return (
    <article
      className={cn(
        'group relative flex flex-col bg-surface rounded-md border border-border shadow-sm overflow-hidden',
        'hover:shadow-md transition-all duration-150',
        'dark:bg-dark-surface dark:border-dark-border',
      )}
    >
      {/* Invisible full-card click target — sits behind content, avoids nested interactive */}
      <button
        onClick={onClick}
        className="absolute inset-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 active:scale-[0.99] cursor-pointer"
        aria-label={`View project: ${project.name}`}
      />

      {/* Color strip — dynamic user color, approved Token-First exception */}
      <div className="h-1 w-full flex-shrink-0" style={{ backgroundColor: project.color }} />

      <div className="relative z-10 flex flex-col gap-2 p-4 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-text-primary dark:text-text-inverse leading-tight">
            {project.name}
          </h3>
          <div className="relative flex-shrink-0">
            <button
              onClick={handleMenuClick}
              className={cn(
                'p-1 rounded-md text-text-secondary transition-colors',
                'opacity-0 group-hover:opacity-100 focus-visible:opacity-100',
                'hover:bg-surface-alt hover:text-text-primary active:bg-surface-alt/70 active:scale-95',
                'dark:hover:bg-dark-border dark:hover:text-text-inverse dark:active:bg-dark-border/70',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              )}
              aria-label="Project options"
              aria-haspopup="true"
              aria-expanded={menuOpen}
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-[55]"
                  onClick={(e) => {
                    e.stopPropagation()
                    setMenuOpen(false)
                  }}
                />
                <div className="absolute right-0 top-full mt-1 z-[60] min-w-[120px] rounded-md border border-border bg-surface shadow-md dark:bg-dark-surface dark:border-dark-border">
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-text-primary hover:bg-surface-alt dark:text-text-inverse dark:hover:bg-dark-border transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  {project.status === 'active' && (
                    <button
                      onClick={handleArchive}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-status-error hover:bg-status-error/10 transition-colors"
                    >
                      <Archive className="w-3.5 h-3.5" />
                      Archive
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {project.description && (
          <p className="text-sm text-text-secondary line-clamp-2">{project.description}</p>
        )}

        <div className="mt-auto pt-2">
          <Badge variant={project.status === 'active' ? 'success' : 'default'}>
            {project.status === 'active' ? 'Active' : 'Archived'}
          </Badge>
        </div>
      </div>
    </article>
  )
}
