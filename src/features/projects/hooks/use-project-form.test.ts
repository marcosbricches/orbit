import { renderHook, act } from '@testing-library/react'
import { useProjectForm } from './use-project-form'
import { PROJECT_COLORS } from '../types'

describe('useProjectForm', () => {
  it('starts with default values', () => {
    const { result } = renderHook(() => useProjectForm({ onSubmit: vi.fn() }))
    expect(result.current.form.name).toBe('')
    expect(result.current.form.description).toBe('')
    expect(result.current.form.color).toBe(PROJECT_COLORS[0].hex)
    expect(result.current.form.status).toBe('active')
    expect(result.current.errors).toEqual({})
    expect(result.current.serverError).toBeNull()
    expect(result.current.isSubmitting).toBe(false)
  })

  it('initializes with provided data', () => {
    const { result } = renderHook(() =>
      useProjectForm({
        initialData: { name: 'My Project', color: '#ef4444', status: 'archived' },
        onSubmit: vi.fn(),
      }),
    )
    expect(result.current.form.name).toBe('My Project')
    expect(result.current.form.color).toBe('#ef4444')
    expect(result.current.form.status).toBe('archived')
  })

  it('validates name is required on submit', async () => {
    const { result } = renderHook(() => useProjectForm({ onSubmit: vi.fn() }))

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent)
    })

    expect(result.current.errors.name).toMatch(/at least 2 characters/i)
  })

  it('clears field error when field is updated', async () => {
    const { result } = renderHook(() => useProjectForm({ onSubmit: vi.fn() }))

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent)
    })

    expect(result.current.errors.name).toBeTruthy()

    act(() => {
      result.current.setField('name', 'New Name')
    })

    expect(result.current.errors.name).toBeUndefined()
  })

  it('calls onSubmit with valid data', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    const onSuccess = vi.fn()

    const { result } = renderHook(() => useProjectForm({ onSubmit, onSuccess }))

    act(() => {
      result.current.setField('name', 'Valid Project')
      result.current.setField('color', PROJECT_COLORS[1].hex)
    })

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent)
    })

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Valid Project', status: 'active' }),
    )
    expect(onSuccess).toHaveBeenCalled()
  })

  it('captures server error on onSubmit rejection', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useProjectForm({ onSubmit }))

    act(() => {
      result.current.setField('name', 'Valid Project')
    })

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent)
    })

    expect(result.current.serverError).toBe('Network error')
    expect(result.current.isSubmitting).toBe(false)
  })
})
