# E-commerce Platform

A modern, production-ready e-commerce platform built with React, featuring role-based access control (RBAC), TanStack Query for API management, and a unified dashboard system.

## 🚀 Features

- **Role-Based Access Control (RBAC)**: Admin, Seller, and User roles with protected routes
- **Unified Dashboard**: Single dashboard component that adapts based on user role
- **Modern API Integration**: TanStack Query for efficient data fetching and caching
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Protected Routes**: Secure navigation with role-based permissions
- **Centralized API Management**: Organized API services with interceptors

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── DashboardLayout.jsx      # Main dashboard wrapper
│   ├── DashboardSidebar.jsx     # Unified sidebar navigation
│   ├── DashboardHeader.jsx      # Dashboard header with user menu
│   └── ProtectedRoute.jsx       # Route protection component
├── contexts/            # React contexts
│   └── AuthContext.jsx          # Authentication and authorization context
├── hooks/               # Custom React hooks
│   ├── useAuth.js               # Authentication hooks
│   ├── useProducts.js           # Products data hooks
│   └── useOrders.js             # Orders data hooks
├── pages/               # Page components organized by role
│   ├── auth/                    # Authentication pages
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── admin/                   # Admin-specific pages
│   │   ├── Overview.jsx
│   │   ├── Products.jsx
│   │   └── ... (other admin pages)
│   ├── seller/                  # Seller-specific pages
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   └── ... (other seller pages)
│   ├── user/                    # User-specific pages
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   └── ... (other user pages)
│   └── errors/                  # Error pages
│       ├── Unauthorized.jsx
│       └── NotFound.jsx
├── routes/              # Routing configuration
│   └── index.jsx                # Main router with protected routes
├── services/            # API services and configuration
│   ├── api.js                   # Main API service with interceptors
│   └── config.js                # API configuration and endpoints
├── App.jsx              # Main application component
└── main.jsx             # Application entry point
```

## 🛠️ Technologies Used

- **Frontend Framework**: React 19
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Build Tool**: Vite

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   NODE_ENV=development
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🔐 Authentication & Authorization

### User Roles

- **Admin**: Full platform access, user management, analytics
- **Seller**: Product management, order tracking, revenue analytics
- **User**: Product browsing, order placement, profile management

### Protected Routes

Routes are protected using the `ProtectedRoute` component with role-based access control:

```jsx
<ProtectedRoute requiredRoles={['admin']}>
  <DashboardLayout>
    <AdminOverview />
  </DashboardLayout>
</ProtectedRoute>
```

## 🌐 API Integration

### TanStack Query Setup

The application uses TanStack Query for efficient data fetching:

```jsx
const { products, isLoading, error } = useProducts();
const { createProduct, isCreating } = useProducts();
```

### API Service Structure

- **Centralized Configuration**: Base URL and endpoints in `services/config.js`
- **Interceptors**: Automatic token handling and error management
- **Organized Methods**: Grouped by resource type (auth, products, orders, etc.)

## 🎨 Component Architecture

### Dashboard Layout

The `DashboardLayout` component provides a unified interface that:
- Automatically adapts based on user role
- Handles responsive sidebar behavior
- Manages authentication state

### Sidebar Navigation

The `DashboardSidebar` component:
- Shows different navigation items based on user role
- Highlights active routes
- Provides logout functionality

## 🔄 State Management

### Authentication Context

The `AuthContext` provides:
- User authentication state
- Role-based permissions
- Logout functionality
- Route protection utilities

### Data Fetching

TanStack Query handles:
- Server state management
- Caching and synchronization
- Background updates
- Error handling

## 🚦 Routing

### Route Structure

- `/login` - Authentication page
- `/register` - User registration
- `/admin/*` - Admin dashboard routes
- `/seller/*` - Seller dashboard routes
- `/user/*` - User dashboard routes

### Navigation Guards

- Unauthenticated users are redirected to login
- Users without proper permissions see unauthorized page
- Role-based route access control

## 📱 Responsive Design

- Mobile-first approach
- Collapsible sidebar on mobile devices
- Touch-friendly interface
- Responsive grid layouts

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Organization

- **Components**: Reusable UI elements
- **Pages**: Route-specific components
- **Hooks**: Custom React hooks for data and logic
- **Services**: API integration layer
- **Contexts**: Global state management

## 🔒 Security Features

- JWT token-based authentication
- Role-based access control
- Protected API endpoints
- Secure route navigation
- Automatic token refresh handling

## 📊 Performance Optimizations

- TanStack Query caching
- Lazy loading of components
- Optimized re-renders
- Efficient state updates
- Background data synchronization

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

3. **Configure environment variables** for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

## 🔄 Migration from Old Structure

The project has been restructured from the previous version:

- **Old**: Multiple dashboard components (AdminDashboard, SellerAdmin)
- **New**: Unified DashboardLayout with role-based content
- **Old**: Direct axios calls throughout components
- **New**: Centralized API services with TanStack Query
- **Old**: State-based page switching
- **New**: React Router with protected routes
- **Old**: Scattered component organization
- **New**: Organized folder structure by feature and role

All existing functionality has been preserved while improving the architecture and maintainability.
