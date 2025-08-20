import { FiHome, FiCalendar, FiDollarSign, FiLayers } from "react-icons/fi";

const StatsCards = ({ hotels, bookings }) => {
  const totalHotels = hotels.length;

  // Sum up total rooms across all roomTypes of all hotels
  const totalRooms = hotels.reduce(
    (sum, hotel) =>
      sum +
      hotel.roomTypes.reduce((rtSum, rt) => rtSum + (rt.totalRooms || 0), 0),
    0
  );

  const totalBookings = bookings.length;

  // occupancy rate = bookings / total rooms
  const occupancyRate =
    totalRooms > 0 ? ((totalBookings / totalRooms) * 100).toFixed(1) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Hotels */}
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition flex items-center">
        <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
          <FiHome className="text-2xl" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Total Hotels</h3>
          <p className="text-2xl font-bold text-gray-900">{totalHotels}</p>
        </div>
      </div>

      {/* Total Rooms */}
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition flex items-center">
        <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
          <FiLayers className="text-2xl" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Total Rooms</h3>
          <p className="text-2xl font-bold text-gray-900">{totalRooms}</p>
        </div>
      </div>

      {/* Total Bookings */}
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition flex items-center">
        <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
          <FiCalendar className="text-2xl" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
          <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
        </div>
      </div>

      {/* Occupancy Rate */}
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition flex items-center">
        <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
          <FiDollarSign className="text-2xl" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Occupancy Rate</h3>
          <p className="text-2xl font-bold text-gray-900">{occupancyRate}%</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
