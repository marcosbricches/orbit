import { useState } from 'react'
import { z } from 'zod'
import { useAuth } from '@/shared/hooks/use-auth'

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type RegisterFormErrors = Partial<Record<'name' | 'email' | 'password' | 'confirmPassword', string>>

export const useRegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<RegisterFormErrors>({})
  const register = useAuth((s) => s.register)
  const isLoading = useAuth((s) => s.isLoading)
  const serverError = useAuth((s) => s.error)
  const clearError = useAuth((s) => s.clearError)

  const validate = (): boolean => {
    const result = registerSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    })
    if (result.success) {
      setErrors({})
      return true
    }
    const fieldErrors: RegisterFormErrors = {}
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof RegisterFormErrors
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
    await register(name, email, password)
  }

  return {
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
  }
}
