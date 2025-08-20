import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  ShoppingCart, 
  Package, 
  Hotel, 
  DollarSign, 
  MessageSquare, 
  Settings, 
  Users,
  BarChart3,
  CheckCircle,
  Building2,
  Store,
  LogOut
} from 'lucide-react';

const DashboardSidebar = ({ userRole, onLogout }) => {
  const location = useLocation();

  // Navigation items based on user role
  const getNavigationItems = () => {
    switch (userRole) {
      case 'admin':
        return [
          { name: 'Overview', href: '/admin', icon: Home },
          { name: 'Products', href: '/admin/products', icon: Package },
          { name: 'Hotels', href: '/admin/hotels', icon: Hotel },
          { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
          { name: 'Sellers', href: '/admin/sellers', icon: Store },
          { name: 'Approvals', href: '/admin/approvals', icon: CheckCircle },
          { name: 'Payments', href: '/admin/payments', icon: DollarSign },
          { name: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
          { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
          { name: 'Settings', href: '/admin/settings', icon: Settings },
        ];
      
      case 'seller':
        return [
          { name: 'Dashboard', href: '/seller', icon: Home },
          { name: 'Products', href: '/seller/products', icon: Package },
          { name: 'Orders', href: '/seller/orders', icon: ShoppingCart },
          { name: 'Hotel Rooms', href: '/seller/hotel-rooms', icon: Hotel },
          { name: 'Booked Rooms', href: '/seller/booked-rooms', icon: Building2 },
          { name: 'Revenue', href: '/seller/revenue', icon: DollarSign },
          { name: 'Reviews', href: '/seller/reviews', icon: MessageSquare },
          { name: 'Settings', href: '/seller/settings', icon: Settings },
        ];
      
      case 'user':
        return [
          { name: 'Dashboard', href: '/user', icon: Home },
          { name: 'Products', href: '/user/products', icon: Package },
          { name: 'My Orders', href: '/user/orders', icon: ShoppingCart },
          { name: 'Hotel Bookings', href: '/user/bookings', icon: Hotel },
          { name: 'Profile', href: '/user/profile', icon: Users },
          { name: 'Settings', href: '/user/settings', icon: Settings },
        ];
      
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg">
      {/* Logo/Brand */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">
          {userRole === 'admin' ? 'Admin Panel' : 
           userRole === 'seller' ? 'Seller Dashboard' : 
           'User Dashboard'}
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar; 