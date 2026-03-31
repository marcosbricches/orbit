import { useState } from 'react'
import { z } from 'zod'
import type { TaskFormData, TaskFormErrors } from '../types'

const taskSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().optional(),
  priority: z.union([z.literal('low'), z.literal('medium'), z.literal('high')]),
  status: z.union([
    z.literal('todo'),
    z.literal('in_progress'),
    z.literal('review'),
    z.literal('done'),
  ]),
  projectId: z.string().optional(),
  dueDate: z.string().optional(),
})

type UseTaskFormOptions = {
  initialData?: Partial<TaskFormData>
  onSubmit: (data: TaskFormData) => Promise<void>
  onSuccess?: () => void
}

export function useTaskForm({ initialData, onSubmit, onSuccess }: UseTaskFormOptions) {
  const [form, setForm] = useState<TaskFormData>({
    title: initialData?.title ?? '',
    description: initialData?.description ?? '',
    priority: initialData?.priority ?? 'medium',
    status: initialData?.status ?? 'todo',
    projectId: initialData?.projectId ?? '',
    dueDate: initialData?.dueDate ?? '',
  })
  const [errors, setErrors] = useState<TaskFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  function setField<K extends keyof TaskFormData>(key: K, value: TaskFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function validate(): boolean {
    const result = taskSchema.safeParse(form)
    if (result.success) {
      setErrors({})
      return true
    }
    const fieldErrors: TaskFormErrors = {}
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof TaskFormErrors
      if (!fieldErrors[field]) fieldErrors[field] = issue.message
    }
    setErrors(fieldErrors)
    return false
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setServerError(null)
    if (!validate()) return
    setIsSubmitting(true)
    try {
      await onSubmit({ ...form, description: form.description ?? '' })
      onSuccess?.()
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { form, setField, errors, isSubmitting, serverError, handleSubmit }
}
