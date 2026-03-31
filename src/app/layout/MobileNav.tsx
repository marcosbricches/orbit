import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'motion/react'
import { CheckSquare, Circle, FolderOpen, LayoutDashboard, Settings, X } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/projects', label: 'Projects', icon: FolderOpen },
  { to: '/tasks', label: 'Tasks', icon: CheckSquare },
] as const

export const MobileNav = ({ open, onClose }: MobileNavProps) => {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-text-primary/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.nav
            className="absolute left-0 top-0 flex h-full w-72 flex-col bg-surface shadow-lg dark:bg-dark-surface"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="flex h-14 items-center justify-between border-b border-border px-4 dark:border-dark-border">
              <div className="flex items-center gap-3">
                <Circle className="size-6 text-primary-500" />
                <span className="text-lg font-semibold text-text-primary dark:text-text-inverse">
                  Orbit
                </span>
              </div>
              <button
                onClick={onClose}
                className={cn(
                  'rounded-md p-2 text-text-secondary transition-colors',
                  'hover:bg-surface-alt hover:text-text-primary dark:hover:bg-dark-border dark:hover:text-text-inverse',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                )}
                aria-label="Close navigation menu"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Nav items */}
            <div className="flex-1 space-y-1 px-2 py-4">
              {navItems.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    'text-text-secondary hover:bg-surface-alt hover:text-text-primary',
                    'dark:text-text-inverse/70 dark:hover:bg-dark-bg dark:hover:text-text-inverse',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                  )}
                  activeProps={{
                    className:
                      'bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-500 hover:bg-primary-100 dark:hover:bg-primary-500/20',
                  }}
                >
                  <Icon className="size-5 shrink-0" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>

            {/* Bottom */}
            <div className="border-t border-border px-2 py-4 dark:border-dark-border">
              <Link
                to="/dashboard"
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  'text-text-secondary hover:bg-surface-alt hover:text-text-primary',
                  'dark:text-text-inverse/70 dark:hover:bg-dark-bg dark:hover:text-text-inverse',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                )}
              >
                <Settings className="size-5 shrink-0" />
                <span>Settings</span>
              </Link>
            </div>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  )
}
