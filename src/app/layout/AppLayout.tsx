import { useState } from 'react'
import { Outlet } from '@tanstack/react-router'
import { cn } from '@/shared/lib/cn'
import { Sidebar } from '@/app/layout/Sidebar'
import { TopBar } from '@/app/layout/TopBar'
import { MobileNav } from '@/app/layout/MobileNav'

export const AppLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((prev) => !prev)}
        />
      </div>

      {/* Mobile nav */}
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      {/* Top bar */}
      <TopBar sidebarCollapsed={sidebarCollapsed} onMobileMenuOpen={() => setMobileNavOpen(true)} />

      {/* Main content */}
      <main
        className={cn(
          'min-h-[calc(100vh-3.5rem)] p-6 transition-all duration-200',
          sidebarCollapsed ? 'md:ml-16' : 'md:ml-60',
        )}
      >
        <Outlet />
      </main>
    </div>
  )
}
