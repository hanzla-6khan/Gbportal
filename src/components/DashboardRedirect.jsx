import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const DashboardRedirect = () => {
    const { userRole, isAuthenticated, isLoadingUser } = useAuthContext();
    const navigate = useNavigate();

    // Handle redirects based on authentication state
    React.useEffect(() => {
        if (!isLoadingUser) {
            if (isAuthenticated && userRole) {
                // Redirect to appropriate dashboard based on user role
                switch (userRole) {
                    case 'admin':
                        navigate('/admin');
                        break;
                    case 'seller':
                        navigate('/seller');
                        break;
                    case 'user':
                        navigate('/user');
                        break;
                    default:
                        navigate('/');
                        break;
                }
            } else if (!isAuthenticated) {
                // Not authenticated, redirect to login
                navigate('/login');
            }
        }
    }, [userRole, isAuthenticated, isLoadingUser, navigate]);

    // Show loading while determining redirect
    if (isLoadingUser) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Show loading while redirecting
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Redirecting to dashboard...</p>
            </div>
        </div>
    );
};

export default DashboardRedirect;
