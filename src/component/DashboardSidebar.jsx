import React, { useState } from 'react';
import {
  Home,
  ShoppingCart,
  Package,
  Hotel,
  DollarSign,
  MessageSquare,
  Settings,
  User,
  Menu,
  ChevronDown,
  X,
  Bed,
  CalendarCheck,
  Layers
} from 'lucide-react';
const DashboardSidebar = ({ activePage, setActivePage }) => {
  const [isProductsExpanded, setIsProductsExpanded] = useState(false);
  const [isHotelsExpanded, setIsHotelsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Dashboard", page: "dashboard", active: activePage === "dashboard" },
    { icon: ShoppingCart, label: "Orders", page: "orders", active: activePage === "orders" },
    {
      icon: Package,
      label: "Products",
      page: "products",
      active: activePage === "products",
      hasDropdown: true,
      expanded: isProductsExpanded,
    },
    {
      icon: Hotel,
      label: "Hotels",
      page: "hotels",
      active: activePage === "hotels",
      hasDropdown: true,
      expanded: isHotelsExpanded,
    },
    { icon: DollarSign, label: "Payments", page: "Payments", active: activePage === "Payments" },
    { icon: MessageSquare, label: "Reviews", page: "reviews", active: activePage === "reviews" },
  ];

  const bottomMenuItems = [
    { icon: Settings, label: "SettingsPage", page: "settings", active: activePage === "settings" },
    // { icon: User, label: "Customer dashboard", page: "customer", active: activePage === "customer" },
  ];

  const toggleProducts = () => {
    setIsProductsExpanded(!isProductsExpanded);
  };

  const toggleHotels = () => {
    setIsHotelsExpanded(!isHotelsExpanded);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold">B</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-green-600">baltistan</h1>
            <p className="text-xs text-gray-400">Nasir</p>
          </div>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-1 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => {
                if (item.hasDropdown) {
                  if (item.label === "Products") toggleProducts();
                  if (item.label === "Hotels") toggleHotels();
                } else {
                  setActivePage(item.page);
                  setIsMobileMenuOpen(false);
                }
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-xl transition-all duration-300 ${
                item.active
                  ? "bg-gradient-to-r from-green-100 to-green-50 text-green-700 shadow-inner"
                  : "text-gray-600 hover:bg-gray-100/50 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon
                  className={`h-5 w-5 transition-colors ${
                    item.active ? "text-green-600" : "text-gray-400"
                  }`}
                />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.hasDropdown && (
                <ChevronDown
                  className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${
                    item.expanded ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {item.label === "Products" && item.expanded && (
              <div className="ml-8 mt-2 space-y-1">
                {["All Products", "Add Product"].map(
                  (subItem, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setActivePage(`products-${subItem.toLowerCase().replace(' ', '-')}`);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200"
                    >
                      {subItem}
                    </button>
                  )
                )}
              </div>
            )}

            {item.label === "Hotels" && item.expanded && (
              <div className="ml-8 mt-2 space-y-1">
                {[
                  { label: "Rooms", icon: Bed },
                  { label: "Booked Rooms", icon: CalendarCheck },
                  { label: "Room Revenue", icon: Layers }
                ].map((subItem, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActivePage(`hotels-${subItem.label.toLowerCase().replace(' ', '-')}`);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200"
                  >
                    <subItem.icon className="h-4 w-4 mr-2" />
                    {subItem.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="border-t border-gray-200/20 px-4 py-4 space-y-2">
        {bottomMenuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setActivePage(item.page);
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              item.active
                ? "bg-green-50 text-green-700"
                : "text-gray-600 hover:bg-gray-100/50 hover:text-gray-900"
            }`}
          >
            <item.icon
              className={`h-5 w-5 ${
                item.active ? "text-green-600" : "text-gray-400"
              }`}
            />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>

    </>
  );

  return (
    <>
      <div className="hidden md:flex md:w-64 md:flex-col bg-white/70 border-r border-gray-200 shadow-lg fixed h-full overflow-y-auto">
        <SidebarContent />
      </div>

      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        <Menu className="h-6 w-6 text-gray-600" />
      </button>

      {isMobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={toggleMobileMenu}
          />
          <div className="md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white/80 shadow-xl flex flex-col">
            <SidebarContent />
          </div>
        </>
      )}
    </>
  );
};

export default DashboardSidebar

