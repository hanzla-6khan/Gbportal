// Environment Configuration
// Copy this file and rename it to .env.local for local development

export const ENV_CONFIG = {
  // API Configuration
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  
  // Environment
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  
  // Feature Flags
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_DEBUG: import.meta.env.VITE_ENABLE_DEBUG === 'true',
  
  // External Services (add your keys here)
  STRIPE_PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY || '',
  GOOGLE_ANALYTICS_ID: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || '',
};

// Development configuration
export const DEV_CONFIG = {
  API_TIMEOUT: 10000,
  LOG_LEVEL: 'debug',
  ENABLE_MOCK_DATA: true,
};

// Production configuration
export const PROD_CONFIG = {
  API_TIMEOUT: 30000,
  LOG_LEVEL: 'error',
  ENABLE_MOCK_DATA: false,
};

// Get current configuration based on environment
export const getConfig = () => {
  return ENV_CONFIG.NODE_ENV === 'production' ? PROD_CONFIG : DEV_CONFIG;
}; 