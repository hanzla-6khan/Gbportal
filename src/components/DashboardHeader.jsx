import React from 'react';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContext';

const DashboardHeader = ({ userRole, onMenuClick, isSidebarOpen, onLogout }) => {
  const { user } = useAuthContext();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Menu button and title */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold text-gray-900">
              {userRole === 'admin' ? 'Admin Dashboard' : 
               userRole === 'seller' ? 'Seller Dashboard' : 
               'User Dashboard'}
            </h1>
          </div>
        </div>

        {/* Right side - Notifications and user menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
          </button>

          {/* User menu */}
          <div className="relative group">
            <button className="flex items-center space-x-2 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <User className="h-6 w-6" />
              <span className="hidden md:block text-sm font-medium">
                {user?.name || 'User'}
              </span>
            </button>

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                <p className="font-medium">{user?.name || 'User'}</p>
                <p className="text-gray-500 capitalize">{userRole}</p>
              </div>
              
              <button
                onClick={onLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 