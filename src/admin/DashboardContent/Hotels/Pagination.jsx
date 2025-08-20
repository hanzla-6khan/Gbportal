import React from 'react';
import { FiChevronLeft, FiChevronRight, FiMoreHorizontal } from 'react-icons/fi';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  setCurrentPage, 
  indexOfFirstHotel, 
  indexOfLastHotel, 
  filteredHotels 
}) => {
  // Generate pagination items with ellipsis logic
  const getPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      // Always include first page
      items.push(1);
      
      // Calculate start and end of visible page range
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        endPage = 4;
      }
      
      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        items.push('ellipsis-left');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        items.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        items.push('ellipsis-right');
      }
      
      // Always include last page
      items.push(totalPages);
    }
    
    return items;
  };

  const paginationItems = getPaginationItems();

  return (
    <div className="bg-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
      <div className="text-sm text-gray-600">
        Showing <span className="font-medium">{indexOfFirstHotel + 1}</span> to{" "}
        <span className="font-medium">{Math.min(indexOfLastHotel, filteredHotels.length)}</span> of{" "}
        <span className="font-medium">{filteredHotels.length}</span> hotels
      </div>
      
      <div className="flex items-center space-x-1">
        {/* Previous button */}
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <FiChevronLeft className="w-4 h-4" />
        </button>
        
        {/* Page numbers */}
        {paginationItems.map((item, index) => {
          if (item === 'ellipsis-left' || item === 'ellipsis-right') {
            return (
              <span key={index} className="px-2 py-1 text-gray-400">
                <FiMoreHorizontal className="w-4 h-4" />
              </span>
            );
          }
          
          return (
            <button
              key={index}
              onClick={() => setCurrentPage(item)}
              className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${
                currentPage === item
                  ? 'border-blue-500 bg-blue-50 text-blue-600 font-semibold'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
              aria-label={`Page ${item}`}
              aria-current={currentPage === item ? 'page' : undefined}
            >
              {item}
            </button>
          );
        })}
        
        {/* Next button */}
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <FiChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;