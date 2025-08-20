import React, { useState } from 'react';
import { FiStar, FiMapPin, FiTrendingUp, FiInfo, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const HotelRow = ({ hotel, isEven }) => {
  const [expanded, setExpanded] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const earnings = hotel.totalEarnings || 0;
  const bookings = hotel.bookingsInRange ? hotel.bookingsInRange.length : 0;

  const performanceIndicator = bookings > 0
    ? (earnings / bookings > 50 ? 'high' : earnings / bookings > 20 ? 'medium' : 'low')
    : 'none';

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {/* Main Table Row */}
      <tr
        className={`transition-all duration-200 ${isEven ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 cursor-pointer ${expanded ? 'bg-blue-50' : ''}`}
        onClick={toggleExpand}
      >
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
              {hotel.name.charAt(0)}
            </div>
            <div className="ml-4">
              <div className="font-medium text-gray-900">{hotel.name}</div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <FiMapPin className="mr-1" size={14} />
                {hotel.location}
              </div>
            </div>
          </div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{hotel.location}</div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {hotel.commissionRate || 10}%
          </div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{bookings} bookings</div>
          <div className="text-xs text-gray-500">{bookings > 0 ? Math.round((bookings / 30) * 10) / 10 : 0}/day avg</div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div>
              <div className="text-sm font-medium text-gray-900">${earnings.toFixed(2)}</div>
              <div className="text-xs text-gray-500">
                ${bookings > 0 ? (earnings / bookings).toFixed(2) : 0}/booking
              </div>
            </div>
            <div className="ml-2">
              {performanceIndicator === 'high' && <FiTrendingUp className="text-green-500" size={16} />}
              {performanceIndicator === 'medium' && <div className="text-yellow-500"><FiTrendingUp size={16} /></div>}
              {performanceIndicator === 'low' && <div className="text-red-500 transform rotate-45"><FiTrendingUp size={16} /></div>}
            </div>
          </div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          {expanded ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
        </td>
      </tr>

      {/* Expanded Row */}
      {expanded && (
        <tr className="bg-blue-50">
          <td colSpan="6" className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Performance Card */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiInfo className="mr-1" /> Performance Details
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Earnings Potential</span>
                    <span className="text-xs font-medium">
                      {performanceIndicator === 'high' ? 'High' : performanceIndicator === 'medium' ? 'Medium' : 'Low'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Avg. Booking Value</span>
                    <span className="text-xs font-medium">
                      ${bookings > 0 ? (earnings / bookings).toFixed(2) : 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Commission Card */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Commission Structure</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Current Rate</span>
                    <span className="text-xs font-medium">{hotel.commissionRate || 10}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Potential Earnings</span>
                    <span className="text-xs font-medium">
                      ${(earnings * (15 / (hotel.commissionRate || 10))).toFixed(2)} at 15%
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions Card */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Actions</h4>
                <div className="flex flex-col space-y-2">
                  <button
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserDetails(!showUserDetails);
                    }}
                  >
                    {showUserDetails ? 'Hide Details' : 'View Details'}
                  </button>
                  <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors">
                    Contact
                  </button>

                  {/* Owner Details */}
                  {showUserDetails && hotel.owner && (
                    <div className="mt-2 p-2 border rounded bg-gray-50 text-xs space-y-1">
                      {typeof hotel.owner === 'object' ? (
                        <>
                          <div><span className="font-medium">Name:</span> {typeof hotel.owner.name === 'string' ? hotel.owner.name : JSON.stringify(hotel.owner.name)}</div>
                          <div><span className="font-medium">Email:</span> {hotel.owner.email}</div>
                          <div><span className="font-medium">Role:</span> {hotel.owner.role}</div>
                          <div><span className="font-medium">ID:</span> {hotel.owner._id}</div>
                        </>
                      ) : (
                        <div><span className="font-medium">Owner ID:</span> {hotel.owner}</div>
                      )}
                    </div>
                  )}


                </div>
              </div>

            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default HotelRow;
