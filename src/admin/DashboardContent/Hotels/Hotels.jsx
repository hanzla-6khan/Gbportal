import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimeRangeSelector from './TimeRangeSelector';
import StatsCard from './StatsCard';
import SearchAndFilters from './SearchAndFilters';
import EarningsChart from './EarningsChart';
import HotelsTable from './HotelsTable';
import { FiDollarSign, FiHome, FiCalendar, FiAlertCircle } from 'react-icons/fi';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [timeRange, setTimeRange] = useState('month');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hotels from API
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        const { data } = await axios.get(
          'http://localhost:5000/api/admin/hotels/stats',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (Array.isArray(data)) {
          setHotels(data);
        } else {
          setHotels([]);
          setError('Invalid data format received from server');
        }
      } catch (err) {
        console.error('Failed to fetch hotels:', err);
        setError('Failed to load hotel data. Please try again later.');
        setHotels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // Update start/end date based on timeRange
  useEffect(() => {
    const now = new Date();
    let start;
    
    // Reset time part for accurate date comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (timeRange) {
      case 'week':
        start = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000); // 7 days ago
        break;
      case 'month':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'quarter':
        start = new Date(today.getFullYear(), today.getMonth() - 2, 1);
        break;
      case 'year':
        start = new Date(today.getFullYear(), 0, 1);
        break;
      case 'custom':
        // Keep the current custom dates
        return;
      default:
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
    }
    
    // Set end date to end of the current day
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);
    
    setStartDate(start);
    setEndDate(timeRange === 'custom' ? now : endOfDay);
  }, [timeRange]);

  // Filter bookings by date range and calculate earnings
  const processedHotels = hotels.map((hotel) => {
    // Handle cases where owner data might be missing
    const ownerName = hotel.owner?.name || 'Unknown Owner';
    const ownerEmail = hotel.owner?.email || 'N/A';
    
    // Ensure bookings is an array
    const hotelBookings = Array.isArray(hotel.bookings) ? hotel.bookings : [];
    
    const bookingsInRange = hotelBookings.filter((b) => {
      if (!b.checkIn) return false;
      
      const checkInDate = new Date(b.checkIn);
      // Normalize dates for comparison (ignore time component)
      const normalizedCheckIn = new Date(
        checkInDate.getFullYear(), 
        checkInDate.getMonth(), 
        checkInDate.getDate()
      );
      
      const normalizedStart = new Date(
        startDate.getFullYear(), 
        startDate.getMonth(), 
        startDate.getDate()
      );
      
      const normalizedEnd = new Date(
        endDate.getFullYear(), 
        endDate.getMonth(), 
        endDate.getDate()
      );
      
      return normalizedCheckIn >= normalizedStart && normalizedCheckIn <= normalizedEnd;
    });

    const totalEarnings = bookingsInRange.reduce((sum, b) => sum + (b.totalPrice || 0) * 0.1, 0);
    const completedEarnings = bookingsInRange
      .filter((b) => b.status === 'completed')
      .reduce((sum, b) => sum + (b.totalPrice || 0) * 0.1, 0);
    const upcomingEarnings = bookingsInRange
      .filter((b) => b.status === 'upcoming')
      .reduce((sum, b) => sum + (b.totalPrice || 0) * 0.1, 0);

    return {
      ...hotel,
      owner: {
        name: ownerName,
        email: ownerEmail
      },
      bookingsInRange,
      totalEarnings,
      completedEarnings,
      upcomingEarnings,
    };
  });

  // Apply search filter
  const filteredHotels = processedHotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.owner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);
  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

  // Calculate summary stats
  const totalEarnings = filteredHotels.reduce((sum, h) => sum + h.totalEarnings, 0);
  const completedBookingsCount = filteredHotels.reduce(
    (sum, h) => sum + h.bookingsInRange.filter((b) => b.status === 'completed').length, 0
  );
  const upcomingBookingsCount = filteredHotels.reduce(
    (sum, h) => sum + h.bookingsInRange.filter((b) => b.status === 'upcoming').length, 0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading hotel data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <FiAlertCircle className="text-red-500 text-5xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Hotel Earnings</h1>

        <TimeRangeSelector
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard
            icon={FiDollarSign}
            title="Total Earnings"
            value={totalEarnings.toFixed(2)}
            trend="from selected period"
            bgColor="bg-blue-100"
            textColor="text-blue-600"
          />
          <StatsCard
            icon={FiHome}
            title="Completed Earnings"
            value={filteredHotels.reduce((sum, h) => sum + h.completedEarnings, 0).toFixed(2)}
            subValue={`${completedBookingsCount} bookings`}
            bgColor="bg-green-100"
            textColor="text-green-600"
          />
          <StatsCard
            icon={FiCalendar}
            title="Upcoming Earnings"
            value={filteredHotels.reduce((sum, h) => sum + h.upcomingEarnings, 0).toFixed(2)}
            subValue={`${upcomingBookingsCount} bookings`}
            bgColor="bg-yellow-100"
            textColor="text-yellow-600"
          />
        </div>

        <SearchAndFilters 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          resultsCount={filteredHotels.length}
        />
        
        {filteredHotels.length > 0 ? (
          <>
            <EarningsChart filteredHotels={filteredHotels} />
            <HotelsTable
              loading={loading}
              currentHotels={currentHotels}
              filteredHotels={filteredHotels}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              indexOfFirstHotel={indexOfFirstHotel}
              indexOfLastHotel={indexOfLastHotel}
            />
          </>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <FiHome className="text-gray-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              {hotels.length === 0 ? 'No Hotels Found' : 'No Matching Hotels'}
            </h3>
            <p className="text-gray-500">
              {hotels.length === 0 
                ? 'There are no hotels in the system yet.' 
                : 'Try adjusting your search or filters to find what you\'re looking for.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;