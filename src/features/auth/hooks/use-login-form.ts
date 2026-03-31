import { useState } from 'react'
import { z } from 'zod'
import { useAuth } from '@/shared/hooks/use-auth'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type LoginFormErrors = Partial<Record<'email' | 'password', string>>

export const useLoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const login = useAuth((s) => s.login)
  const isLoading = useAuth((s) => s.isLoading)
  const serverError = useAuth((s) => s.error)
  const clearError = useAuth((s) => s.clearError)

  const validate = (): boolean => {
    const result = loginSchema.safeParse({ email, password })
    if (result.success) {
      setErrors({})
      return true
    }
    const fieldErrors: LoginFormErrors = {}
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof LoginFormErrors
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message
      }
    }
    setErrors(fieldErrors)
    return false
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    if (!validate()) return
    await login(email, password)
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    serverError,
    isLoading,
    handleSubmit,
  }
}
