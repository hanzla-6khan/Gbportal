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
    onSuccess: (response) => {
      console.log('Login response:', response); // Debug log
      
      // Handle different response structures
      let authToken, userData;
      
      if (response.data && response.data.token) {
        // Structure: { data: { token: "...", user: {...} } }
        authToken = response.data.token;
        userData = response.data.user || response.data;
      } else if (response.data && response.data.data) {
        // Structure: { data: { data: { token: "...", user: {...} } } }
        authToken = response.data.data.token;
        userData = response.data.data.user || response.data.data;
      } else {
        // Fallback: assume response.data is the user data
        authToken = response.data.token;
        userData = response.data;
      }
      
      if (authToken) {
        localStorage.setItem('token', authToken);
        // Store user data in query cache
        queryClient.setQueryData(['auth', 'me'], userData);
        queryClient.invalidateQueries(['auth']);
        console.log('User data stored:', userData); // Debug log
        
        // Handle redirect based on user role
        if (userData.role) {
          const redirectPath = getRedirectPath(userData.role);
          console.log('Redirecting to:', redirectPath);
          // Use window.location for immediate redirect
          window.location.href = redirectPath;
        }
      } else {
        console.error('No token found in response');
      }
    },
    onError: (error) => {
      console.error('Login error:', error);
    }
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: authAPI.register,
    onSuccess: (response) => {
      console.log('Register response:', response); // Debug log
      
      // Handle different response structures
      let authToken, userData;
      
      if (response.data && response.data.token) {
        authToken = response.data.token;
        userData = response.data.user || response.data;
      } else if (response.data && response.data.data) {
        authToken = response.data.data.token;
        userData = response.data.data.user || response.data.data;
      } else {
        authToken = response.data.token;
        userData = response.data;
      }
      
      if (authToken) {
        localStorage.setItem('token', authToken);
        queryClient.setQueryData(['auth', 'me'], userData);
        queryClient.invalidateQueries(['auth']);
        console.log('User data stored:', userData); // Debug log
        
        // Handle redirect based on user role
        if (userData.role) {
          const redirectPath = getRedirectPath(userData.role);
          console.log('Redirecting to:', redirectPath);
          // Use window.location for immediate redirect
          window.location.href = redirectPath;
        }
      }
    },
    onError: (error) => {
      console.error('Register error:', error);
    }
  });

  // Logout mutation - Fixed to prevent jumping/shaking
  const logoutMutation = useMutation({
    mutationFn: authAPI.logout,
    onMutate: async () => {
      // Optimistically clear user data before API call
      await queryClient.cancelQueries(['auth', 'me']);
      queryClient.setQueryData(['auth', 'me'], undefined);
    },
    onSuccess: () => {
      // Clear token and cache after successful logout
      localStorage.removeItem('token');
      queryClient.clear();
      queryClient.invalidateQueries();
      
      // Redirect to login page
      window.location.href = '/login';
    },
    onError: (error) => {
      console.error('Logout error:', error);
      // Even if logout fails, clear local state
      localStorage.removeItem('token');
      queryClient.clear();
      queryClient.invalidateQueries();
      
      // Redirect to login page
      window.location.href = '/login';
    },
    onSettled: () => {
      // Always ensure clean state
      queryClient.invalidateQueries();
    }
  });

  // Helper function to get redirect path based on role
  const getRedirectPath = (role) => {
    switch (role) {
      case 'admin':
        return '/admin';
      case 'seller':
        return '/seller';
      case 'user':
        return '/user';
      default:
        return '/user';
    }
  };

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