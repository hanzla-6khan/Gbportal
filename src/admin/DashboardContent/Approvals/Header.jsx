import React from 'react';
import { Hotel, ShoppingBag, Search, ArrowLeft } from 'lucide-react';

const Header = ({
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  viewMode,
  selectedApplication,
  handleBackToList,
  hotelApprovals,
  estoreApprovals
}) => {
  return (
    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {viewMode === 'list' ? (
          <>
            <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-inner">
              <button
                onClick={() => setActiveTab('hotels')}
                className={`px-4 py-2 rounded-md flex items-center text-sm font-medium transition-all ${
                  activeTab === 'hotels' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Hotel className="mr-2" size={16} />
                Hotel Registrations
                <span className="ml-2 bg-white text-blue-600 px-2 py-0.5 rounded-full text-xs">
                  {hotelApprovals.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('estores')}
                className={`px-4 py-2 rounded-md flex items-center text-sm font-medium transition-all ${
                  activeTab === 'estores' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ShoppingBag className="mr-2" size={16} />
                eStore Approvals
                <span className="ml-2 bg-white text-blue-600 px-2 py-0.5 rounded-full text-xs">
                  {estoreApprovals.length}
                </span>
              </button>
            </div>
            
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={16} />
              </div>
              <input
                type="text"
                placeholder="Search applications..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center w-full">
            <button
              onClick={handleBackToList}
              className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
            >
              <ArrowLeft className="mr-1" size={20} />
              Back to list
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              Application Review: {selectedApplication?.name}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;