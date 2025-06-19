import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api/api';
import { Profile } from '@/types';

/**
 * useProfile - React Query hook to fetch user profile and validate access token
 * The access token is automatically handled by the API interceptor
 *
 * @returns {object} - { data, isLoading, isError, error }
 */
export function useProfile() {
  return useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: async () => {
      const accessToken = await api.auth.getAccessToken();
      if (!accessToken) throw new Error('No access token found');

      const res = await api.get<Profile>('/accounts/profile/');
      if (!res.success)
        throw new Error(res.message || 'Failed to fetch profile');
      return res.data!;
    },
    retry: (failureCount, error: any) => {
      // Don't retry if it's an auth error (401)
      if (error?.response?.status === 401) return false;
      return failureCount < 2;
    },
  });
}
