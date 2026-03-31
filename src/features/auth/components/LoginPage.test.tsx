import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { useAuth } from '@/shared/hooks/use-auth'
import { LoginPage } from './LoginPage'

const renderLoginPage = () => {
  const rootRoute = createRootRoute()
  const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: LoginPage,
  })
  const registerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/register',
    component: () => <div>Register</div>,
  })
  const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: () => <div>Dashboard</div>,
  })

  const router = createRouter({
    routeTree: rootRoute.addChildren([loginRoute, registerRoute, dashboardRoute]),
    history: createMemoryHistory({ initialEntries: ['/login'] }),
  })

  return render(<RouterProvider router={router} />)
}

describe('LoginPage', () => {
  beforeEach(() => {
    useAuth.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      clearError: vi.fn(),
    })
  })

  it('renders login form with all fields', async () => {
    renderLoginPage()
    expect(await screen.findByRole('heading', { name: /welcome back/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('shows validation errors on empty submit', async () => {
    renderLoginPage()
    const user = userEvent.setup()

    await screen.findByRole('heading', { name: /welcome back/i })
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument()
  })

  it('has a link to the register page', async () => {
    renderLoginPage()
    expect(await screen.findByRole('link', { name: /sign up/i })).toHaveAttribute(
      'href',
      '/register',
    )
  })
})
