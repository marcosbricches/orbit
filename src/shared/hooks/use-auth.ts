import { create } from 'zustand'
import type { User } from '@/types'
import {
  loginUser,
  registerUser,
  logoutUser,
  getStoredUser,
  getDevUser,
} from '@/features/auth/api/auth.api'

type AuthStore = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  clearError: () => void
}

const initialUser = import.meta.env.DEV ? getDevUser() : getStoredUser()

export const useAuth = create<AuthStore>((set) => ({
  user: initialUser,
  isAuthenticated: initialUser !== null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const user = await loginUser({ email, password })
      set({ user, isAuthenticated: true, isLoading: false })
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Login failed',
        isLoading: false,
      })
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null })
    try {
      const user = await registerUser({ name, email, password })
      set({ user, isAuthenticated: true, isLoading: false })
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Registration failed',
        isLoading: false,
      })
    }
  },

  logout: () => {
    logoutUser()
    set({ user: null, isAuthenticated: false, error: null })
  },

  clearError: () => set({ error: null }),
}))
