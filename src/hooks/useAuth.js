import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authAPI } from '../services/api';

export const useAuth = () => {
  const queryClient = useQueryClient();

  // Check if token exists
  const token = localStorage.getItem('token');

  // Get current user - only if token exists
  const { data: user, isLoading: isLoadingUser, error: userError } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authAPI.getMe,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!token, // Only run query if token exists
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.data.token);
      queryClient.setQueryData(['auth', 'me'], data.data);
      queryClient.invalidateQueries(['auth']);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: authAPI.register,
    onSuccess: (data) => {
      localStorage.setItem('token', data.data.token);
      queryClient.setQueryData(['auth', 'me'], data.data);
      queryClient.invalidateQueries(['auth']);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      localStorage.removeItem('token');
      queryClient.clear();
      queryClient.invalidateQueries();
    },
  });

  const login = (credentials) => loginMutation.mutate(credentials);
  const register = (userData) => registerMutation.mutate(userData);
  const logout = () => logoutMutation.mutate();

  return {
    user,
    isLoadingUser: isLoadingUser && !!token, // Only show loading if we have a token
    userError,
    login,
    register,
    logout,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    logoutError: logoutMutation.error,
  };
}; 