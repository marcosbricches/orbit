import { Link } from '@tanstack/react-router'
import {
  ChevronsLeft,
  ChevronsRight,
  CheckSquare,
  Circle,
  FolderOpen,
  LayoutDashboard,
  Settings,
} from 'lucide-react'
import { cn } from '@/shared/lib/cn'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/projects', label: 'Projects', icon: FolderOpen },
  { to: '/tasks', label: 'Tasks', icon: CheckSquare },
] as const

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-border bg-surface transition-all duration-200',
        'dark:bg-dark-surface dark:border-dark-border',
        collapsed ? 'w-16' : 'w-60',
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center gap-3 border-b border-border px-4 dark:border-dark-border">
        <Circle className="size-6 shrink-0 text-primary-500" />
        {!collapsed && (
          <span className="text-lg font-semibold text-text-primary dark:text-text-inverse">
            Orbit
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              collapsed && 'justify-center px-2',
            )}
            activeProps={{
              className:
                'bg-primary-50 text-primary-600 hover:bg-primary-100 dark:bg-primary-500/10 dark:text-primary-500 dark:hover:bg-primary-500/20',
            }}
            inactiveProps={{
              className:
                'text-text-secondary hover:bg-surface-alt hover:text-text-primary dark:text-text-inverse/70 dark:hover:bg-dark-bg dark:hover:text-text-inverse',
            }}
          >
            <Icon className="size-5 shrink-0" />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="space-y-1 border-t border-border px-2 py-4 dark:border-dark-border">
        <Link
          to="/dashboard"
          className={cn(
            'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            'text-text-secondary hover:bg-surface-alt hover:text-text-primary',
            'dark:text-text-inverse/70 dark:hover:bg-dark-bg dark:hover:text-text-inverse',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            collapsed && 'justify-center px-2',
          )}
        >
          <Settings className="size-5 shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>

        <button
          onClick={onToggle}
          className={cn(
            'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            'text-text-secondary hover:bg-surface-alt hover:text-text-primary',
            'dark:text-text-inverse/70 dark:hover:bg-dark-bg dark:hover:text-text-inverse',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            collapsed && 'justify-center px-2',
          )}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronsRight className="size-5 shrink-0" />
          ) : (
            <>
              <ChevronsLeft className="size-5 shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
