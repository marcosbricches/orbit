import { useEffect } from 'react'
import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
  Outlet,
  RouterProvider,
  useNavigate,
} from '@tanstack/react-router'
import { AppLayout } from '@/app/layout/AppLayout'
import { DesignSystemPage } from '@/features/design-system/DesignSystemPage'
import { LoginPage } from '@/features/auth/components/LoginPage'
import { RegisterPage } from '@/features/auth/components/RegisterPage'
import { ProjectList } from '@/features/projects/components/ProjectList'
import { ProjectDetail } from '@/features/projects/components/ProjectDetail'
import { TasksPage } from '@/features/tasks/components/TasksPage'
import { DashboardPage } from '@/features/dashboard/components/DashboardPage'
import { useAuth } from '@/shared/hooks/use-auth'

/* ---------- Root ---------- */

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

/* ---------- Auth routes (no layout) ---------- */

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
})

/* ---------- Protected Layout ---------- */

const ProtectedLayout = () => {
  const navigate = useNavigate()
  const isAuthenticated = useAuth((s) => s.isAuthenticated)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/login' })
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) return null

  return <AppLayout />
}

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'layout',
  beforeLoad: () => {
    const { isAuthenticated } = useAuth.getState()
    if (!isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
  component: ProtectedLayout,
})

/* ---------- Index redirect ---------- */

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/dashboard' })
  },
})

/* ---------- Protected pages ---------- */

const dashboardRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/dashboard',
  component: DashboardPage,
})

const projectsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/projects',
  component: ProjectList,
})

const projectDetailRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/projects/$projectId',
  component: ProjectDetail,
})

const tasksRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/tasks',
  component: TasksPage,
})

const designSystemRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/design-system',
  component: DesignSystemPage,
})

/* ---------- Route tree ---------- */

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  layoutRoute.addChildren([
    dashboardRoute,
    projectsRoute,
    projectDetailRoute,
    tasksRoute,
    designSystemRoute,
  ]),
])

/* ---------- Router ---------- */

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

/* ---------- Provider component ---------- */

export const AppRoutes = () => {
  return <RouterProvider router={router} />
}
