import { useEffect } from 'react'
import { useNavigate, Link } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'motion/react'
import { AlertCircle } from 'lucide-react'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'
import { useAuth } from '@/shared/hooks/use-auth'
import { useLoginForm } from '../hooks/use-login-form'
import { AuthLayout } from './AuthLayout'

export const LoginPage = () => {
  const navigate = useNavigate()
  const isAuthenticated = useAuth((s) => s.isAuthenticated)
  const { email, setEmail, password, setPassword, errors, serverError, isLoading, handleSubmit } =
    useLoginForm()

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/dashboard' })
    }
  }, [isAuthenticated, navigate])

  return (
    <AuthLayout>
      <h1 className="mb-6 text-center text-2xl font-semibold text-text-primary dark:text-text-inverse">
        Welcome back
      </h1>

      <AnimatePresence>
        {serverError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-4 overflow-hidden"
          >
            <div className="flex items-start gap-2 rounded-md bg-status-error/10 p-3 text-sm text-status-error">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{serverError}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="current-password"
        />

        <Button type="submit" loading={isLoading} className="mt-2 w-full">
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Don&apos;t have an account?{' '}
        <Link
          to="/register"
          className="font-medium text-primary-500 underline-offset-2 transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  )
}
