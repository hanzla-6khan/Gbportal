import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider, useAuthContext } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import DashboardLayout from '../components/DashboardLayout';
import DashboardRedirect from '../components/DashboardRedirect';

// Auth pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Home page - now handled by DashboardRedirect

// Admin pages
import AdminOverview from '../pages/admin/Overview';
import AdminProducts from '../pages/admin/Products';
import AdminHotels from '../pages/admin/Hotels';
import AdminOrders from '../pages/admin/Orders';
import AdminSellers from '../pages/admin/Sellers';
import AdminApprovals from '../pages/admin/Approvals';
import AdminPayments from '../pages/admin/Payments';
import AdminReviews from '../pages/admin/Reviews';
import AdminAnalytics from '../pages/admin/Analytics';
import AdminSettings from '../pages/admin/Settings';

// Seller pages
import SellerDashboard from '../pages/seller/Dashboard';
import SellerProducts from '../pages/seller/Products';
import SellerOrders from '../pages/seller/Orders';
import SellerHotelRooms from '../pages/seller/HotelRooms';
import SellerBookedRooms from '../pages/seller/BookedRooms';
import SellerRevenue from '../pages/seller/Revenue';
import SellerReviews from '../pages/seller/Reviews';
import SellerSettings from '../pages/seller/Settings';

// User pages
import UserDashboard from '../pages/user/Dashboard';
import UserProducts from '../pages/user/Products';
import UserOrders from '../pages/user/Orders';
import UserBookings from '../pages/user/Bookings';
import UserProfile from '../pages/user/Profile';
import UserSettings from '../pages/user/Settings';

// Error pages
import Unauthorized from '../pages/errors/Unauthorized';
import NotFound from '../pages/errors/NotFound';

// Root layout component that provides AuthProvider
const RootLayout = ({ children }) => {
    return <AuthProvider>{children}</AuthProvider>;
};

// Debug component to show authentication state
const DebugAuth = () => {
    const { user, isAuthenticated, userRole, isLoadingUser } = useAuthContext();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Authentication Debug</h1>
            <pre className="bg-gray-100 p-4 rounded">
                {JSON.stringify({
                    user,
                    isAuthenticated,
                    userRole,
                    isLoadingUser,
                    token: localStorage.getItem('token')
                }, null, 2)}
            </pre>
        </div>
    );
};

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <RootLayout>
                <DashboardRedirect />
            </RootLayout>
        ),
    },
    {
        path: '/debug',
        element: (
            <RootLayout>
                <DebugAuth />
            </RootLayout>
        ),
    },
    {
        path: '/login',
        element: (
            <RootLayout>
                <Login />
            </RootLayout>
        ),
    },
    {
        path: '/register',
        element: (
            <RootLayout>
                <Register />
            </RootLayout>
        ),
    },
    {
        path: '/unauthorized',
        element: (
            <RootLayout>
                <Unauthorized />
            </RootLayout>
        ),
    },
    // Admin routes
    {
        path: '/admin',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['admin']}>
                    <DashboardLayout>
                        <AdminOverview />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    {
        path: '/admin/products',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['admin']}>
                    <DashboardLayout>
                        <AdminProducts />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    {
        path: '/admin/hotels',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['admin']}>
                    <DashboardLayout>
                        <AdminHotels />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    {
        path: '/admin/orders',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['admin']}>
                    <DashboardLayout>
                        <AdminOrders />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    {
        path: '/admin/sellers',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['admin']}>
                    <DashboardLayout>
                        <AdminSellers />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    {
        path: '/admin/approvals',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['admin']}>
                    <DashboardLayout>
                        <AdminApprovals />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    {
        path: '/admin/payments',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['admin']}>
                    <DashboardLayout>
                        <AdminPayments />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    {
        path: '/admin/reviews',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['admin']}>
                    <DashboardLayout>
                        <AdminReviews />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    {
        path: '/admin/analytics',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['admin']}>
                    <DashboardLayout>
                        <AdminAnalytics />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    {
        path: '/admin/settings',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['admin']}>
                    <DashboardLayout>
                        <AdminSettings />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    // Seller routes
    {
        path: '/seller',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['seller']}>
                    <DashboardLayout>
                        <SellerDashboard />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    {
        path: '/seller/products',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['seller']}>
                    <DashboardLayout>
                        <SellerProducts />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    {
        path: '/seller/orders',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['seller']}>
                    <DashboardLayout>
                        <SellerOrders />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    {
        path: '/seller/hotel-rooms',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['seller']}>
                    <DashboardLayout>
                        <SellerHotelRooms />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    {
        path: '/seller/booked-rooms',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['seller']}>
                    <DashboardLayout>
                        <SellerBookedRooms />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    {
        path: '/seller/revenue',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['seller']}>
                    <DashboardLayout>
                        <SellerRevenue />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    {
        path: '/seller/reviews',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['seller']}>
                    <DashboardLayout>
                        <SellerReviews />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    {
        path: '/seller/settings',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['seller']}>
                    <DashboardLayout>
                        <SellerSettings />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    // User routes
    {
        path: '/user',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['user']}>
                    <DashboardLayout>
                        <UserDashboard />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    {
        path: '/user/products',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['user']}>
                    <DashboardLayout>
                        <UserProducts />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    {
        path: '/user/orders',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['user']}>
                    <DashboardLayout>
                        <UserOrders />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    {
        path: '/user/bookings',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['user']}>
                    <DashboardLayout>
                        <UserBookings />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    {
        path: '/user/profile',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['user']}>
                    <DashboardLayout>
                        <UserProfile />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    {
        path: '/user/settings',
        element: (
            <RootLayout>
                <ProtectedRoute requiredRoles={['user']}>
                    <DashboardLayout>
                        <UserSettings />
                    </DashboardLayout>
                </ProtectedRoute>
            </RootLayout>
        ),
    },
    // Catch all route
    {
        path: '*',
        element: (
            <RootLayout>
                <NotFound />
            </RootLayout>
        ),
    },
]); 