import React, { useState } from "react";
import { Home, Package, Hotel, DollarSign, MessageSquare, Settings, ChevronDown, ChevronUp, X, Menu } from "lucide-react";
import ApprovalIcon from '@mui/icons-material/Approval';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const items = [
    { id: "overview", label: "Overview", icon: <Home size={18} /> },
    { id: "approvals", label: "Approvals", icon: <ApprovalIcon fontSize="small" /> },
    { 
      id: "products", 
      label: "Products", 
      icon: <Package size={18} />,
      subItems: [
        { id: "registered-sellers", label: "Registered Sellers" },
        { id: "registered-hotels", label: "Registered Hotels" }
      ]
    },
    { id: "hotels", label: "Hotels", icon: <Hotel size={18} /> },
    { id: "payments", label: "Payments", icon: <DollarSign size={18} /> },
    { id: "reviews", label: "Reviews", icon: <MessageSquare size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  const toggleProductsDropdown = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleItemClick = (itemId) => {
    setActiveTab(itemId);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 bg-white shadow-md p-4
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Close button for mobile */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button 
            className="md:hidden p-1 rounded hover:bg-gray-100"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-1">
          {items.map((item) => (
            <div key={item.id}>
              <div 
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
                  activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  if (item.subItems) {
                    toggleProductsDropdown();
                  } else {
                    handleItemClick(item.id);
                  }
                }}
              >
                <div className="flex items-center">
                  <span className="mr-3">{item.icon}</span>
                  <span className="text-sm md:text-base">{item.label}</span>
                </div>
                {item.subItems && (
                  <span>
                    {isProductsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                )}
              </div>
              
              {item.subItems && isProductsOpen && (
                <div className="ml-6 md:ml-8 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <div
                      key={subItem.id}
                      className={`p-2 rounded-lg cursor-pointer text-sm ${
                        activeTab === subItem.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => handleItemClick(subItem.id)}
                    >
                      {subItem.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;