import type { User } from '@/types'
import type { LoginCredentials, RegisterCredentials } from '../types'

const STORAGE_KEY = 'orbit-auth-user'

const DEV_USER: User = {
  id: 'dev-user-1',
  email: 'dev@orbit.app',
  name: 'Dev User',
  createdAt: new Date().toISOString(),
}

export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (!credentials.email || !credentials.password) {
    throw new Error('Email and password are required')
  }

  if (credentials.password.length < 8) {
    throw new Error('Invalid credentials')
  }

  const user: User = {
    id: crypto.randomUUID(),
    email: credentials.email,
    name: credentials.email.split('@')[0],
    createdAt: new Date().toISOString(),
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  return user
}

export const registerUser = async (
  credentials: Omit<RegisterCredentials, 'confirmPassword'>,
): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (!credentials.email || !credentials.password || !credentials.name) {
    throw new Error('All fields are required')
  }

  const user: User = {
    id: crypto.randomUUID(),
    email: credentials.email,
    name: credentials.name,
    createdAt: new Date().toISOString(),
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  return user
}

export const logoutUser = (): void => {
  localStorage.removeItem(STORAGE_KEY)
}

export const getStoredUser = (): User | null => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored) as User
  } catch {
    return null
  }
}

export const getDevUser = (): User => DEV_USER
