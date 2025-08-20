import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchAndFilters = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search hotels by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <select className="border rounded-md p-2 text-sm bg-white">
            <option>All Hotels</option>
            <option>Top Performers</option>
            <option>New Partners</option>
          </select>
          <select className="border rounded-md p-2 text-sm bg-white">
            <option>Sort by: Highest Earnings</option>
            <option>Sort by: Most Bookings</option>
            <option>Sort by: Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;
