import type { User } from '@/types'

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterCredentials = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type AuthState = {
  user: User | null
  isAuthenticated: boolean
}
