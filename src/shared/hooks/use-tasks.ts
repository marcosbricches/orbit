import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Task } from '@/types'
import {
  fetchTasks,
  createTaskInStorage,
  updateTaskInStorage,
  deleteTaskInStorage,
} from '@/features/tasks/api/tasks.api'

const TASKS_KEY = ['tasks'] as const

export function useTasks() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: TASKS_KEY,
    queryFn: fetchTasks,
  })

  const createMutation = useMutation({
    mutationFn: createTaskInStorage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASKS_KEY }),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<Task, 'id' | 'createdAt'>> }) =>
      updateTaskInStorage(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASKS_KEY }),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTaskInStorage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASKS_KEY }),
  })

  return {
    tasks: query.data ?? [],
    isLoading: query.isPending,
    error: query.error,
    createTask: createMutation.mutateAsync,
    updateTask: updateMutation.mutateAsync,
    deleteTask: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
