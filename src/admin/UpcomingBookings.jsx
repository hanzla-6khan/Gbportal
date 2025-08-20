import React, { useState } from "react";
import { Calendar, Hotel, User, ArrowRight, List, Grid } from "lucide-react";

const UpcomingBookings = ({ bookings }) => {
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'card'

  // Sample data with hotel names added
  const bookingData = bookings || [
    { 
      id: "#BK-101", 
      hotelName: "Grand Plaza Hotel", 
      guest: "Michael Brown", 
      checkIn: "2023-06-20", 
      checkOut: "2023-06-25", 
      room: "Deluxe Suite",
      days: 5
    },
    { 
      id: "#BK-102", 
      hotelName: "Seaside Resort", 
      guest: "Sarah Wilson", 
      checkIn: "2023-06-18", 
      checkOut: "2023-06-22", 
      room: "Standard Room",
      days: 4
    },
    { 
      id: "#BK-103", 
      hotelName: "Mountain View Lodge", 
      guest: "David Lee", 
      checkIn: "2023-06-22", 
      checkOut: "2023-06-28", 
      room: "Executive Suite",
      days: 6
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h3 className="text-lg font-semibold flex items-center">
          <Calendar className="mr-2 text-blue-600" size={18} />
          Upcoming Bookings
        </h3>
        
        {/* View Toggle */}
        <div className="flex space-x-1 self-end sm:self-auto">
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-500"}`}
            title="List View"
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`p-1.5 rounded ${viewMode === "card" ? "bg-blue-100 text-blue-600" : "text-gray-500"}`}
            title="Card View"
          >
            <Grid size={18} />
          </button>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="divide-y divide-gray-100">
          {bookingData.map((booking) => (
            <div key={booking.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-1">
                    <Hotel className="mr-2 text-gray-500 shrink-0" size={16} />
                    <span className="font-medium text-gray-900 truncate">{booking.hotelName}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <User className="mr-2 shrink-0" size={14} />
                    <span className="truncate">{booking.guest}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="inline-block px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs mr-2 whitespace-nowrap">
                      {booking.room}
                    </span>
                  </div>
                </div>
                
                <div className="text-right sm:text-left sm:self-center flex-shrink-0">
                  <div className="flex flex-col sm:flex-row items-end sm:items-center text-sm text-gray-500">
                    <span className="whitespace-nowrap">{new Date(booking.checkIn).toLocaleDateString()}</span>
                    <ArrowRight className="mx-1 hidden sm:block" size={14} />
                    <span className="whitespace-nowrap">{new Date(booking.checkOut).toLocaleDateString()}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1 whitespace-nowrap">
                    {booking.days} {booking.days === 1 ? 'day' : 'days'} stay
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {bookingData.map((booking) => (
            <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-2">
                <Hotel className="mr-2 text-blue-500 shrink-0" size={18} />
                <h4 className="font-medium text-gray-900 truncate">{booking.hotelName}</h4>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <User className="mr-2 shrink-0" size={14} />
                <span className="truncate">{booking.guest}</span>
              </div>
              <div className="mb-3">
                <span className="inline-block px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs whitespace-nowrap">
                  {booking.room}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-500">
                  <div className="whitespace-nowrap">{new Date(booking.checkIn).toLocaleDateString()}</div>
                  <div className="text-xs text-gray-400 whitespace-nowrap">{booking.checkIn.split('-')[2]} day</div>
                </div>
                <ArrowRight className="text-gray-400 mx-2 shrink-0" />
                <div className="text-gray-500">
                  <div className="whitespace-nowrap">{new Date(booking.checkOut).toLocaleDateString()}</div>
                  <div className="text-xs text-gray-400 whitespace-nowrap">{booking.checkOut.split('-')[2]} day</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t text-sm text-gray-500 whitespace-nowrap">
                Total: {booking.days} {booking.days === 1 ? 'night' : 'nights'}
              </div>
            </div>
          ))}
        </div>
      )}

      {bookingData.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          No upcoming bookings
        </div>
      )}
    </div>
  );
};

export default UpcomingBookings;