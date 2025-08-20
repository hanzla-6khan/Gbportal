import React from 'react';
import { User, Clock, FileText, Search } from 'lucide-react';

const ApplicationList = ({ filteredData, activeTab, handleViewDetails, searchTerm }) => {
  return (
    <>
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredData.map(item => (
            <div key={item.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all bg-white">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-600">
                        <span className="flex items-center">
                          <User className="mr-1" size={14} />
                          {item.owner}
                        </span>
                        {activeTab === 'hotels' ? (
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {item.location}
                          </span>
                        ) : (
                          <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                            {item.category}
                          </span>
                        )}
                      </div>
                      <p className="mt-3 text-sm text-gray-500">
                        {activeTab === 'hotels' ? item.details : `${item.products} products listed`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-xs text-gray-500">
                    <Clock className="mr-1" size={14} />
                    <span>Submitted on {new Date(item.submittedDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row md:flex-col gap-2">
                  <button
                    onClick={() => handleViewDetails(item)}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600 text-sm font-medium transition-colors"
                  >
                    <FileText className="mr-1" size={14} />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="text-gray-400" size={32} />
          </div>
          <h3 className="text-lg font-medium text-gray-700">No applications found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search' : 'No pending applications at this time'}
          </p>
        </div>
      )}
    </>
  );
};

export default ApplicationList;