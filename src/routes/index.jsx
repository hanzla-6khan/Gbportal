import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import DashboardLayout from '../components/DashboardLayout';

// Auth pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Home page
import Home from '../pages/Home';

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

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/unauthorized',
        element: <Unauthorized />,
    },
    // Admin routes
    {
        path: '/admin',
        element: (
            <ProtectedRoute requiredRoles={['admin']}>
                <DashboardLayout>
                    <AdminOverview />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/products',
        element: (
            <ProtectedRoute requiredRoles={['admin']}>
                <DashboardLayout>
                    <AdminProducts />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/hotels',
        element: (
            <ProtectedRoute requiredRoles={['admin']}>
                <DashboardLayout>
                    <AdminHotels />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/orders',
        element: (
            <ProtectedRoute requiredRoles={['admin']}>
                <DashboardLayout>
                    <AdminOrders />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/sellers',
        element: (
            <ProtectedRoute requiredRoles={['admin']}>
                <DashboardLayout>
                    <AdminSellers />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/approvals',
        element: (
            <ProtectedRoute requiredRoles={['admin']}>
                <DashboardLayout>
                    <AdminApprovals />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/payments',
        element: (
            <ProtectedRoute requiredRoles={['admin']}>
                <DashboardLayout>
                    <AdminPayments />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/reviews',
        element: (
            <ProtectedRoute requiredRoles={['admin']}>
                <DashboardLayout>
                    <AdminReviews />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/analytics',
        element: (
            <ProtectedRoute requiredRoles={['admin']}>
                <DashboardLayout>
                    <AdminAnalytics />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/settings',
        element: (
            <ProtectedRoute requiredRoles={['admin']}>
                <DashboardLayout>
                    <AdminSettings />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    // Seller routes
    {
        path: '/seller',
        element: (
            <ProtectedRoute requiredRoles={['seller']}>
                <DashboardLayout>
                    <SellerDashboard />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/seller/products',
        element: (
            <ProtectedRoute requiredRoles={['seller']}>
                <DashboardLayout>
                    <SellerProducts />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/seller/orders',
        element: (
            <ProtectedRoute requiredRoles={['seller']}>
                <DashboardLayout>
                    <SellerOrders />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/seller/hotel-rooms',
        element: (
            <ProtectedRoute requiredRoles={['seller']}>
                <DashboardLayout>
                    <SellerHotelRooms />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/seller/booked-rooms',
        element: (
            <ProtectedRoute requiredRoles={['seller']}>
                <DashboardLayout>
                    <SellerBookedRooms />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/seller/revenue',
        element: (
            <ProtectedRoute requiredRoles={['seller']}>
                <DashboardLayout>
                    <SellerRevenue />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/seller/reviews',
        element: (
            <ProtectedRoute requiredRoles={['seller']}>
                <DashboardLayout>
                    <SellerReviews />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/seller/settings',
        element: (
            <ProtectedRoute requiredRoles={['seller']}>
                <DashboardLayout>
                    <SellerSettings />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    // User routes
    {
        path: '/user',
        element: (
            <ProtectedRoute requiredRoles={['user']}>
                <DashboardLayout>
                    <UserDashboard />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/user/products',
        element: (
            <ProtectedRoute requiredRoles={['user']}>
                <DashboardLayout>
                    <UserProducts />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/user/orders',
        element: (
            <ProtectedRoute requiredRoles={['user']}>
                <DashboardLayout>
                    <UserOrders />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/user/bookings',
        element: (
            <ProtectedRoute requiredRoles={['user']}>
                <DashboardLayout>
                    <UserBookings />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/user/profile',
        element: (
            <ProtectedRoute requiredRoles={['user']}>
                <DashboardLayout>
                    <UserProfile />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/user/settings',
        element: (
            <ProtectedRoute requiredRoles={['user']}>
                <DashboardLayout>
                    <UserSettings />
                </DashboardLayout>
            </ProtectedRoute>
        ),
    },
    // Catch all route
    {
        path: '*',
        element: <NotFound />,
    },
]); 