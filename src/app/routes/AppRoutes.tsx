import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router'
import { AppLayout } from '@/app/layout/AppLayout'
import { DesignSystemPage } from '@/features/design-system/DesignSystemPage'

/* ---------- Root ---------- */

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

/* ---------- Auth routes (no layout) ---------- */

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: () => (
    <div className="flex min-h-screen items-center justify-center bg-background dark:bg-dark-bg">
      <h1 className="text-2xl font-semibold text-text-primary dark:text-text-inverse">Login</h1>
    </div>
  ),
})

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: () => (
    <div className="flex min-h-screen items-center justify-center bg-background dark:bg-dark-bg">
      <h1 className="text-2xl font-semibold text-text-primary dark:text-text-inverse">Register</h1>
    </div>
  ),
})

/* ---------- Layout route (protected) ---------- */

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'layout',
  component: AppLayout,
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
  component: () => (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary dark:text-text-inverse">Dashboard</h1>
      <p className="mt-2 text-text-secondary">Welcome to Orbit.</p>
    </div>
  ),
})

const projectsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/projects',
  component: () => (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary dark:text-text-inverse">Projects</h1>
      <p className="mt-2 text-text-secondary">All projects will appear here.</p>
    </div>
  ),
})

const projectDetailRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/projects/$projectId',
  component: () => (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary dark:text-text-inverse">
        Project Detail
      </h1>
      <p className="mt-2 text-text-secondary">Project details will appear here.</p>
    </div>
  ),
})

const tasksRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/tasks',
  component: () => (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary dark:text-text-inverse">Tasks</h1>
      <p className="mt-2 text-text-secondary">All tasks will appear here.</p>
    </div>
  ),
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
