import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Orbit } from 'lucide-react'

export interface AuthLayoutProps {
  children: ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 dark:bg-dark-bg">
      <motion.div
        className="w-full max-w-[420px]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="mb-8 flex items-center justify-center gap-2.5">
          <Orbit className="h-8 w-8 text-primary-500" strokeWidth={1.75} />
          <span className="text-2xl font-bold tracking-tight text-text-primary dark:text-text-inverse">
            Orbit
          </span>
        </div>
        <div className="rounded-lg border border-border bg-surface p-8 shadow-sm dark:border-dark-border dark:bg-dark-surface">
          {children}
        </div>
      </motion.div>
    </div>
  )
}
