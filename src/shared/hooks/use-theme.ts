import { create } from 'zustand'

type Theme = 'light' | 'dark' | 'system'

type ThemeStore = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system'
  return (localStorage.getItem('orbit-theme') as Theme) ?? 'system'
}

const applyTheme = (theme: Theme) => {
  const root = document.documentElement
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  root.classList.toggle('dark', isDark)
  localStorage.setItem('orbit-theme', theme)
}

const initialTheme = getInitialTheme()
if (typeof window !== 'undefined') {
  applyTheme(initialTheme)
}

export const useTheme = create<ThemeStore>((set) => ({
  theme: initialTheme,
  setTheme: (theme) => {
    applyTheme(theme)
    set({ theme })
  },
}))
