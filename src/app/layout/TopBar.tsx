import { useState, useRef, useEffect } from 'react'
import { Bell, LogOut, Menu, Moon, Search, Sun } from 'lucide-react'
import { cn } from '@/shared/lib/cn'
import { useAuth } from '@/shared/hooks/use-auth'
import { useTheme } from '@/shared/hooks/use-theme'

interface TopBarProps {
  sidebarCollapsed: boolean
  onMobileMenuOpen: () => void
}

export const TopBar = ({ sidebarCollapsed, onMobileMenuOpen }: TopBarProps) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const user = useAuth((s) => s.user)
  const logout = useAuth((s) => s.logout)

  const initial = user?.name?.charAt(0).toUpperCase() ?? 'U'

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [userMenuOpen])

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
        <ThemeToggle />

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

        {/* User menu */}
        <div ref={menuRef} className="relative ml-2">
          <button
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className={cn(
              'flex size-8 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-600 transition-colors',
              'hover:bg-primary-50 dark:bg-primary-500/20 dark:text-primary-500 dark:hover:bg-primary-500/30',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            )}
            aria-label="User menu"
            aria-expanded={userMenuOpen}
          >
            {initial}
          </button>

          {userMenuOpen && (
            <div
              className={cn(
                'absolute right-0 top-full mt-2 w-56 rounded-md border border-border bg-surface py-1 shadow-md',
                'dark:border-dark-border dark:bg-dark-surface',
              )}
              role="menu"
            >
              <div className="border-b border-border px-3 py-2 dark:border-dark-border">
                <p className="text-sm font-medium text-text-primary dark:text-text-inverse">
                  {user?.name ?? 'User'}
                </p>
                <p className="text-xs text-text-secondary">{user?.email ?? ''}</p>
              </div>
              <button
                onClick={() => {
                  setUserMenuOpen(false)
                  logout()
                }}
                className={cn(
                  'flex w-full items-center gap-2 px-3 py-2 text-sm text-text-secondary transition-colors',
                  'hover:bg-surface-alt hover:text-text-primary dark:hover:bg-dark-border dark:hover:text-text-inverse',
                )}
                role="menuitem"
              >
                <LogOut className="size-4" />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

const ThemeToggle = () => {
  const theme = useTheme((s) => s.theme)
  const setTheme = useTheme((s) => s.setTheme)

  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'rounded-md p-2 text-text-secondary transition-colors',
        'hover:bg-surface-alt hover:text-text-primary dark:hover:bg-dark-border dark:hover:text-text-inverse',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  )
}
