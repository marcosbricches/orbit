import { renderHook, act } from '@testing-library/react'
import { useTaskForm } from './use-task-form'

describe('useTaskForm', () => {
  it('starts with default values', () => {
    const { result } = renderHook(() => useTaskForm({ onSubmit: vi.fn() }))
    expect(result.current.form.title).toBe('')
    expect(result.current.form.priority).toBe('medium')
    expect(result.current.form.status).toBe('todo')
    expect(result.current.errors).toEqual({})
    expect(result.current.serverError).toBeNull()
    expect(result.current.isSubmitting).toBe(false)
  })

  it('initializes with provided data', () => {
    const { result } = renderHook(() =>
      useTaskForm({
        initialData: { title: 'Fix bug', priority: 'high', status: 'in_progress' },
        onSubmit: vi.fn(),
      }),
    )
    expect(result.current.form.title).toBe('Fix bug')
    expect(result.current.form.priority).toBe('high')
    expect(result.current.form.status).toBe('in_progress')
  })

  it('validates title is required on submit', async () => {
    const { result } = renderHook(() => useTaskForm({ onSubmit: vi.fn() }))

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent)
    })

    expect(result.current.errors.title).toMatch(/at least 2 characters/i)
  })

  it('clears field error when field is updated', async () => {
    const { result } = renderHook(() => useTaskForm({ onSubmit: vi.fn() }))

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent)
    })

    expect(result.current.errors.title).toBeTruthy()

    act(() => {
      result.current.setField('title', 'Valid title')
    })

    expect(result.current.errors.title).toBeUndefined()
  })

  it('calls onSubmit with valid data', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    const onSuccess = vi.fn()

    const { result } = renderHook(() => useTaskForm({ onSubmit, onSuccess }))

    act(() => {
      result.current.setField('title', 'Valid task title')
    })

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent)
    })

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Valid task title', priority: 'medium', status: 'todo' }),
    )
    expect(onSuccess).toHaveBeenCalled()
  })

  it('captures server error on onSubmit rejection', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error('Server error'))

    const { result } = renderHook(() => useTaskForm({ onSubmit }))

    act(() => {
      result.current.setField('title', 'Valid task title')
    })

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent)
    })

    expect(result.current.serverError).toBe('Server error')
    expect(result.current.isSubmitting).toBe(false)
  })
})
