import React, { useState } from "react";
import { Bell, Menu, X, Search } from "lucide-react";

const Header = ({ activeTab, notifications, onMenuClick, isSidebarOpen }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    // Close search if open
    if (showSearch) setShowSearch(false);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    // Close notifications if open
    if (showNotifications) setShowNotifications(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex justify-between items-center p-4">
        {/* Left section - Menu button and title */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Page title */}
          <h1 className="text-xl font-semibold capitalize truncate">
            {activeTab.replace(/-/g, ' ')}
          </h1>
        </div>

        {/* Right section - Search, notifications, and profile */}
        <div className="flex items-center gap-3">
          {/* Search bar - hidden on mobile unless activated */}
          <div className="relative">
            {/* Search toggle for mobile */}
            <button 
              className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={toggleSearch}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            {/* Search input - always visible on desktop, conditional on mobile */}
            <div className={`
              ${showSearch ? 'flex' : 'hidden'} 
              md:flex items-center
              absolute md:static top-full right-0 mt-2 md:mt-0
              bg-white md:bg-gray-100 rounded-lg shadow-md md:shadow-none
              z-10
            `}>
              <input
                type="text"
                placeholder="Search..."
                className="w-48 md:w-56 lg:w-64 px-4 py-2 bg-transparent border-none focus:outline-none focus:ring-0"
              />
              <button 
                className="p-2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowSearch(false)}
                aria-label="Close search"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button 
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors relative"
              onClick={toggleNotifications}
              aria-label="Notifications"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <p className="text-sm text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1 capitalize">{notification.type}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="flex items-center gap-2">
            <img
              src="https://i.pravatar.cc/40"
              alt="Admin"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-200"
            />
            {/* User name - hidden on mobile */}
            <span className="hidden md:block text-sm font-medium text-gray-700">
              Admin User
            </span>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showSearch) && (
        <div 
          className="fixed inset-0 z-10"
          onClick={() => {
            setShowNotifications(false);
            setShowSearch(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;