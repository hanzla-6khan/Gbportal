import React, { createContext, useContext, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { user, isLoadingUser, userError, logout } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Update authentication state when user data changes
  React.useEffect(() => {
    console.log('AuthContext: user changed:', user); // Debug log
    console.log('AuthContext: userError:', userError); // Debug log

    if (user && !userError) {
      // Extract user role from user data
      let role = null;

      if (user.role) {
        role = user.role;
      } else if (user.data && user.data.role) {
        role = user.data.role;
      } else if (user.user && user.user.role) {
        role = user.user.role;
      }

      console.log('AuthContext: extracted role:', role); // Debug log

      if (role) {
        setIsAuthenticated(true);
        setUserRole(role);
        console.log('AuthContext: user authenticated with role:', role); // Debug log
      } else {
        console.error('AuthContext: no role found in user data');
        setIsAuthenticated(false);
        setUserRole(null);
      }
    } else if (userError) {
      console.error('AuthContext: user error, clearing auth state');
      setIsAuthenticated(false);
      setUserRole(null);
    } else {
      // Check if there's a token in localStorage
      const token = localStorage.getItem('token');
      if (token) {
        // Token exists but user data not loaded yet
        console.log('AuthContext: token exists, waiting for user data');
        setIsAuthenticated(false);
        setUserRole(null);
      } else {
        // No token
        console.log('AuthContext: no token found');
        setIsAuthenticated(false);
        setUserRole(null);
      }
    }
  }, [user, userError]);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setUserRole(null);
  };

  const hasRole = (requiredRoles) => {
    if (!isAuthenticated || !userRole) return false;
    if (Array.isArray(requiredRoles)) {
      return requiredRoles.includes(userRole);
    }
    return userRole === requiredRoles;
  };

  const hasPermission = (permission) => {
    if (!isAuthenticated || !userRole) return false;

    // Define role-based permissions
    const permissions = {
      admin: ['read', 'write', 'delete', 'approve', 'manage_users', 'view_analytics'],
      seller: ['read', 'write', 'delete', 'manage_products', 'view_orders', 'view_revenue'],
      user: ['read', 'place_orders', 'view_profile'],
    };

    return permissions[userRole]?.includes(permission) || false;
  };

  const value = {
    user,
    isAuthenticated,
    userRole,
    isLoadingUser,
    userError,
    logout: handleLogout,
    hasRole,
    hasPermission,
  };

  console.log('AuthContext: current state:', { isAuthenticated, userRole, isLoadingUser }); // Debug log

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 