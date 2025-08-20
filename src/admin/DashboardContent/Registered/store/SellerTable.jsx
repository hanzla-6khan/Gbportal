import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiMoreHorizontal, FiEye } from 'react-icons/fi';

const SellerTable = ({
  sellers = [],           // Array of seller users from backend
  loading = false,        // Loading state
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 10,
  totalItems = 0,
  onPageChange,
  onViewProducts
}) => {
  const [expandedSeller, setExpandedSeller] = useState(null);

  const toggleSellerDetails = (sellerId) => {
    setExpandedSeller(expandedSeller === sellerId ? null : sellerId);
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                </td>
              </tr>
            ) : sellers.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  No sellers found
                </td>
              </tr>
            ) : (
              sellers.map((seller) => {
                const sellerId = seller._id;
                const status = seller.sellerApplication?.status || 'pending';
                const avatar = seller.profile?.avatar || '';
                return (
                  <tr key={sellerId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                          {avatar ? (
                            <img src={avatar} alt={seller.name} className="h-10 w-10 rounded-full object-cover" />
                          ) : (
                            seller.name?.charAt(0) || '?'
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{seller.name || 'No Name'}</div>
                          <div className="text-sm text-gray-500">
                            {seller.createdAt ? new Date(seller.createdAt).toLocaleDateString() : 'No Date'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{seller.email || 'No Email'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${status === 'approved' ? 'bg-green-100 text-green-800' :
                          status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => onViewProducts(sellerId)}
                        className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors"
                      >
                        View Products
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-gray-200">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        ) : sellers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No sellers found</div>
        ) : (
          sellers.map((seller) => {
            const sellerId = seller._id;
            const status = seller.sellerApplication?.status || 'pending';
            const avatar = seller.profile?.avatar || '';
            return (
              <div key={sellerId} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                      {avatar ? (
                        <img src={avatar} alt={seller.name} className="h-10 w-10 rounded-full object-cover" />
                      ) : (
                        seller.name?.charAt(0) || '?'
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{seller.name || 'No Name'}</div>
                      <div className="text-xs text-gray-500">{seller.createdAt ? new Date(seller.createdAt).toLocaleDateString() : 'No Date'}</div>
                    </div>
                  </div>
                  <button onClick={() => toggleSellerDetails(sellerId)} className="p-1 text-gray-400 hover:text-gray-600">
                    <FiMoreHorizontal size={18} />
                  </button>
                </div>

                {expandedSeller === sellerId && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Actions:</span>
                      <button
                        onClick={() => onViewProducts(sellerId)}
                        className="flex items-center text-blue-600 hover:text-blue-800 px-3 py-1 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors"
                      >
                        <FiEye size={14} className="mr-1" /> View Products
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500">Email:</div>
                  <div className="text-gray-900 truncate">{seller.email || 'No Email'}</div>

                  <div className="text-gray-500">Status:</div>
                  <div>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${status === 'approved' ? 'bg-green-100 text-green-800' :
                        status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:flex-1 sm:items-center sm:justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startItem}</span> to{' '}
                <span className="font-medium">{endItem}</span> of{' '}
                <span className="font-medium">{totalItems}</span> sellers
              </p>
            </div>
            <div className="flex justify-center">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <FiChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </button>
                <div className="hidden sm:flex">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => onPageChange(page)}
                      className={`relative inline-flex items-center px-3 py-2 border text-sm font-medium 
                        ${currentPage === page ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <div className="sm:hidden flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  {currentPage} / {totalPages}
                </div>
                <button
                  onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <FiChevronRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SellerTable;
