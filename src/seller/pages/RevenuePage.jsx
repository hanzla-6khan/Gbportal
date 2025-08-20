import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const RevenuePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  // Example revenue data
  const revenues = [
    { id: "#REV102", date: "Wed Jul 09 2025", amount: 138.00, status: "PENDING" },
    { id: "#REV097", date: "Tue Jul 01 2025", amount: 46.00, status: "RECEIVED" },
    { id: "#REV088", date: "Sun Jun 29 2025", amount: 25.00, status: "RECEIVED" },
    { id: "#REV077", date: "Mon Jun 16 2025", amount: 27.00, status: "RECEIVED" },
    { id: "#REV066", date: "Mon Jun 09 2025", amount: 1253.00, status: "REFUNDED" },
  ];

  const statusStyles = {
    PENDING: "bg-yellow-100 text-yellow-800",
    RECEIVED: "bg-green-100 text-green-800",
    REFUNDED: "bg-red-100 text-red-800",
  };

  // Filter records by search
  const filteredRevenues = useMemo(() => {
    if (!searchTerm) return revenues;

    return revenues.filter(rev =>
      rev.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rev.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rev.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rev.amount.toString().includes(searchTerm)
    );
  }, [revenues, searchTerm]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRevenues = filteredRevenues.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRevenues.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Total Revenue Calculation
  const totalRevenue = filteredRevenues
    .filter(rev => rev.status === "RECEIVED") // only count received
    .reduce((acc, rev) => acc + rev.amount, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Revenue</h1>
            <p className="text-gray-500">
              {filteredRevenues.length} records found • 
              <span className="font-semibold text-green-600"> ${totalRevenue.toFixed(2)} total</span>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search revenue..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <button className="flex items-center justify-center sm:justify-start space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap">
              <Filter size={16} />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue ID
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRevenues.length > 0 ? (
              currentRevenues.map((rev, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {rev.id}
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {rev.date}
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    ${rev.amount.toFixed(2)}
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[rev.status]}`}>
                      {rev.status}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-green-600 hover:text-green-900 mr-3">View</button>
                    <button className="text-gray-600 hover:text-gray-900 hidden sm:inline-block">Export</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 lg:px-6 py-4 text-center text-sm text-gray-500">
                  No revenue records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredRevenues.length > 0 && (
        <div className="bg-white px-4 lg:px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button 
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button 
              onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages}
              className="ml-3 px-4 py-2 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-medium">
                {indexOfLastItem > filteredRevenues.length ? filteredRevenues.length : indexOfLastItem}
              </span> of{' '}
              <span className="font-medium">{filteredRevenues.length}</span> results
            </p>
            <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className="px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 border text-sm font-medium ${
                    currentPage === number
                      ? 'z-10 bg-green-50 border-green-500 text-green-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
                className="px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenuePage;
