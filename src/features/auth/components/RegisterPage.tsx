import { useEffect } from 'react'
import { useNavigate, Link } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'motion/react'
import { AlertCircle } from 'lucide-react'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'
import { useAuth } from '@/shared/hooks/use-auth'
import { useRegisterForm } from '../hooks/use-register-form'
import { AuthLayout } from './AuthLayout'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const isAuthenticated = useAuth((s) => s.isAuthenticated)
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    serverError,
    isLoading,
    handleSubmit,
  } = useRegisterForm()

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/dashboard' })
    }
  }, [isAuthenticated, navigate])

  return (
    <AuthLayout>
      <h1 className="mb-6 text-center text-2xl font-semibold text-text-primary dark:text-text-inverse">
        Create your account
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
          label="Name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          autoComplete="name"
        />

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
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="new-password"
        />

        <Input
          label="Confirm password"
          type="password"
          placeholder="Repeat your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        <Button type="submit" loading={isLoading} className="mt-2 w-full">
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-medium text-primary-500 underline-offset-2 transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
