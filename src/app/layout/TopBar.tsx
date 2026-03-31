import { Bell, Menu, Search } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

interface TopBarProps {
  sidebarCollapsed: boolean
  onMobileMenuOpen: () => void
}

export const TopBar = ({ sidebarCollapsed, onMobileMenuOpen }: TopBarProps) => {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-surface/80 px-6 backdrop-blur-md transition-all duration-200',
        'dark:bg-dark-surface/80 dark:border-dark-border',
        sidebarCollapsed ? 'md:ml-16' : 'md:ml-60',
      )}
    >
      {/* Left: mobile menu + breadcrumb area */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuOpen}
          className={cn(
            'rounded-md p-2 text-text-secondary transition-colors md:hidden',
            'hover:bg-surface-alt hover:text-text-primary dark:hover:bg-dark-border dark:hover:text-text-inverse',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          )}
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" />
        </button>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1">
        <button
          className={cn(
            'rounded-md p-2 text-text-secondary transition-colors',
            'hover:bg-surface-alt hover:text-text-primary dark:hover:bg-dark-border dark:hover:text-text-inverse',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          )}
          aria-label="Search"
        >
          <Search className="size-5" />
        </button>

        <button
          className={cn(
            'rounded-md p-2 text-text-secondary transition-colors',
            'hover:bg-surface-alt hover:text-text-primary dark:hover:bg-dark-border dark:hover:text-text-inverse',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          )}
          aria-label="Notifications"
        >
          <Bell className="size-5" />
        </button>

        <div
          className="ml-2 flex size-8 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-600 dark:bg-primary-500/20 dark:text-primary-500"
          aria-label="User avatar"
        >
          U
        </div>
      </div>
    </header>
  )
}
