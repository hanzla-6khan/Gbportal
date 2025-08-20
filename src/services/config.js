import { ENV_CONFIG, getConfig } from '../config/environment';

// API Configuration
export const API_CONFIG = {
  BASE_URL: ENV_CONFIG.API_URL,
  TIMEOUT: getConfig().API_TIMEOUT,
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

// Environment variables
export const ENV = {
  NODE_ENV: ENV_CONFIG.NODE_ENV,
  API_URL: ENV_CONFIG.API_URL,
  ENABLE_ANALYTICS: ENV_CONFIG.ENABLE_ANALYTICS,
  ENABLE_DEBUG: ENV_CONFIG.ENABLE_DEBUG,
};

// API Endpoints
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
  },
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
  },
  PRODUCTS: {
    BASE: '/products',
    BY_SELLER: '/products?seller=',
    CREATE: '/products',
    UPDATE: '/products/',
    DELETE: '/products/',
  },
  ORDERS: {
    BASE: '/orders',
    CREATE: '/orders',
    UPDATE: '/orders/',
    DELETE: '/orders/',
  },
  HOTELS: {
    BASE: '/hotels',
    ROOMS: '/hotels/rooms',
    BOOKINGS: '/hotels/bookings',
  },
  ADMIN: {
    SELLERS: '/admin/sellers',
    HOTELS: '/admin/hotels',
    PRODUCTS: '/admin/products',
    BOOKINGS: '/admin/bookings',
    STATS: '/admin/stats',
  },
  SELLER: {
    DASHBOARD: '/seller/dashboard',
    PRODUCTS: '/seller/products',
    ORDERS: '/seller/orders',
    REVENUE: '/seller/revenue',
  },
}; 