import React, { createContext, useContext, useEffect, useState } from 'react';
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
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check if there's a token in localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      // If there's a token, wait for the user data to load
      if (user && !userError) {
        setIsAuthenticated(true);
        setUserRole(user.role);
        setIsInitialized(true);
      } else if (userError) {
        // If there's an error, clear the token and set as not authenticated
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUserRole(null);
        setIsInitialized(true);
      }
    } else {
      // No token, so not authenticated
      setIsAuthenticated(false);
      setUserRole(null);
      setIsInitialized(true);
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
    isLoadingUser: isLoadingUser || !isInitialized,
    userError,
    logout: handleLogout,
    hasRole,
    hasPermission,
    isInitialized,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 