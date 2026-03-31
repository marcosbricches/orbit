import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchProjects,
  createProjectInStorage,
  updateProjectInStorage,
  archiveProjectInStorage,
  type CreateProjectInput,
} from '@/features/projects/api/projects.api'

export type { CreateProjectInput }

export function useProjects() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  })

  const createMutation = useMutation({
    mutationFn: createProjectInStorage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateProjectInput }) =>
      updateProjectInStorage(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  })

  const archiveMutation = useMutation({
    mutationFn: archiveProjectInStorage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  })

  return {
    projects: query.data ?? [],
    isLoading: query.isPending,
    error: query.error,
    createProject: (data: CreateProjectInput) => createMutation.mutateAsync(data),
    updateProject: (id: string, data: CreateProjectInput) =>
      updateMutation.mutateAsync({ id, data }),
    archiveProject: (id: string) => archiveMutation.mutateAsync(id),
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isArchiving: archiveMutation.isPending,
  }
}
