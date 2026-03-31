import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchActivities } from '../api/activity.api'

export function useActivityFeed() {
  const query = useQuery({
    queryKey: ['activities'],
    queryFn: fetchActivities,
  })

  const activities = useMemo(
    () =>
      [...(query.data ?? [])].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 10),
    [query.data],
  )

  return {
    activities,
    isLoading: query.isPending,
    error: query.error,
    refetch: query.refetch,
  }
}
