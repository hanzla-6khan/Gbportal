import React from 'react';
import HotelRow from './HotelRow';
import Pagination from './Pagination';

const HotelsTable = ({
  loading,
  currentHotels,
  filteredHotels,
  currentPage,
  totalPages,
  setCurrentPage,
  indexOfFirstHotel,
  indexOfLastHotel
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 text-sm uppercase">
              <th className="px-6 py-4 text-left font-semibold tracking-wider">Hotel</th>
              <th className="px-6 py-4 text-left font-semibold tracking-wider">Location</th>
              <th className="px-6 py-4 text-left font-semibold tracking-wider">Commission Rate</th>
              <th className="px-6 py-4 text-left font-semibold tracking-wider">Bookings</th>
              <th className="px-6 py-4 text-left font-semibold tracking-wider">Earnings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-6 py-5" colSpan="5">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </td>
                </tr>
              ))
            ) : currentHotels.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <svg
                      className="w-16 h-16 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      ></path>
                    </svg>
                    <p className="text-xl font-medium mb-1">No hotels found</p>
                    <p className="text-sm">Try adjusting your search criteria</p>
                  </div>
                </td>
              </tr>
            ) : (
              currentHotels.map((hotel, index) => (
                <HotelRow
                  key={hotel._id}
                  hotel={hotel} // hotel.owner should already be populated
                  isEven={index % 2 === 0}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="border-t border-gray-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            indexOfFirstHotel={indexOfFirstHotel}
            indexOfLastHotel={indexOfLastHotel}
            filteredHotels={filteredHotels}
          />
        </div>
      )}
    </div>
  );
};

export default HotelsTable;
