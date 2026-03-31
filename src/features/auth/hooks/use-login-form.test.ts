import { renderHook, act } from '@testing-library/react'
import { useAuth } from '@/shared/hooks/use-auth'
import { useLoginForm } from './use-login-form'

describe('useLoginForm', () => {
  beforeEach(() => {
    useAuth.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
  })

  it('starts with empty fields and no errors', () => {
    const { result } = renderHook(() => useLoginForm())
    expect(result.current.email).toBe('')
    expect(result.current.password).toBe('')
    expect(result.current.errors).toEqual({})
    expect(result.current.serverError).toBeNull()
    expect(result.current.isLoading).toBe(false)
  })

  it('validates required email', async () => {
    const { result } = renderHook(() => useLoginForm())

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent)
    })

    expect(result.current.errors.email).toBe('Email is required')
  })

  it('validates email format', async () => {
    const { result } = renderHook(() => useLoginForm())

    act(() => {
      result.current.setEmail('not-an-email')
      result.current.setPassword('password123')
    })

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent)
    })

    expect(result.current.errors.email).toBe('Invalid email format')
  })

  it('validates password minimum length', async () => {
    const { result } = renderHook(() => useLoginForm())

    act(() => {
      result.current.setEmail('test@example.com')
      result.current.setPassword('short')
    })

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent)
    })

    expect(result.current.errors.password).toBe('Password must be at least 8 characters')
  })

  it('calls login on valid submission', async () => {
    const loginSpy = vi.fn()
    useAuth.setState({ login: loginSpy } as unknown as Parameters<typeof useAuth.setState>[0])

    const { result } = renderHook(() => useLoginForm())

    act(() => {
      result.current.setEmail('test@example.com')
      result.current.setPassword('password123')
    })

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent)
    })

    expect(loginSpy).toHaveBeenCalledWith('test@example.com', 'password123')
  })
})
