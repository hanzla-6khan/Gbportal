import axios from 'axios';
import { API_CONFIG, ENDPOINTS } from './config';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API methods
export const authAPI = {
  login: (credentials) => api.post(ENDPOINTS.AUTH.LOGIN, credentials),
  register: (userData) => api.post(ENDPOINTS.AUTH.REGISTER, userData),
  getMe: () => api.get(ENDPOINTS.AUTH.ME),
  logout: () => api.post(ENDPOINTS.AUTH.LOGOUT),
};

// Products API methods
export const productsAPI = {
  getAll: (params) => api.get(ENDPOINTS.PRODUCTS.BASE, { params }),
  getById: (id) => api.get(`${ENDPOINTS.PRODUCTS.BASE}/${id}`),
  create: (productData) => api.post(ENDPOINTS.PRODUCTS.CREATE, productData),
  update: (id, productData) => api.put(`${ENDPOINTS.PRODUCTS.UPDATE}${id}`, productData),
  delete: (id) => api.delete(`${ENDPOINTS.PRODUCTS.DELETE}${id}`),
  getBySeller: (sellerId) => api.get(`${ENDPOINTS.PRODUCTS.BY_SELLER}${sellerId}`),
};

// Orders API methods
export const ordersAPI = {
  getAll: (params) => api.get(ENDPOINTS.ORDERS.BASE, { params }),
  getById: (id) => api.get(`${ENDPOINTS.ORDERS.BASE}/${id}`),
  create: (orderData) => api.post(ENDPOINTS.ORDERS.CREATE, orderData),
  update: (id, orderData) => api.put(`${ENDPOINTS.ORDERS.UPDATE}${id}`, orderData),
  delete: (id) => api.delete(`${ENDPOINTS.ORDERS.DELETE}${id}`),
};

// Hotels API methods
export const hotelsAPI = {
  getAll: (params) => api.get(ENDPOINTS.HOTELS.BASE, { params }),
  getRooms: (hotelId) => api.get(`${ENDPOINTS.HOTELS.BASE}/${hotelId}/rooms`),
  getBookings: (params) => api.get(ENDPOINTS.HOTELS.BOOKINGS, { params }),
};

// Admin API methods
export const adminAPI = {
  getSellers: () => api.get(ENDPOINTS.ADMIN.SELLERS),
  getHotels: () => api.get(ENDPOINTS.ADMIN.HOTELS),
  getStats: () => api.get(ENDPOINTS.ADMIN.STATS),
  deleteProduct: (id) => api.delete(`${ENDPOINTS.ADMIN.PRODUCTS}${id}`),
  deleteBooking: (id) => api.delete(`${ENDPOINTS.ADMIN.BOOKINGS}${id}`),
  updateSeller: (id, data) => api.put(`${ENDPOINTS.ADMIN.SELLERS}/${id}`, data),
  updateHotel: (id, data) => api.put(`${ENDPOINTS.ADMIN.HOTELS}/${id}`, data),
};

// Seller API methods
export const sellerAPI = {
  getDashboard: () => api.get(ENDPOINTS.SELLER.DASHBOARD),
  getProducts: () => api.get(ENDPOINTS.SELLER.PRODUCTS),
  getOrders: () => api.get(ENDPOINTS.SELLER.ORDERS),
  getRevenue: () => api.get(ENDPOINTS.SELLER.REVENUE),
};

export default api; 