import { useState } from 'react'
import { z } from 'zod'
import type { ProjectFormData } from '../types'
import { PROJECT_COLORS } from '../types'

const projectSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
  color: z.string().min(1, 'Please select a color'),
  status: z.union([z.literal('active'), z.literal('archived')]),
})

type FormErrors = Partial<Record<keyof ProjectFormData, string>>

type UseProjectFormOptions = {
  initialData?: Partial<ProjectFormData>
  onSubmit: (data: ProjectFormData) => Promise<void>
  onSuccess?: () => void
}

export function useProjectForm({ initialData, onSubmit, onSuccess }: UseProjectFormOptions) {
  const [form, setForm] = useState<ProjectFormData>({
    name: initialData?.name ?? '',
    description: initialData?.description ?? '',
    color: initialData?.color ?? PROJECT_COLORS[0].hex,
    status: initialData?.status ?? 'active',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  function setField<K extends keyof ProjectFormData>(key: K, value: ProjectFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function validate(): boolean {
    const result = projectSchema.safeParse(form)
    if (result.success) {
      setErrors({})
      return true
    }
    const fieldErrors: FormErrors = {}
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof FormErrors
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
