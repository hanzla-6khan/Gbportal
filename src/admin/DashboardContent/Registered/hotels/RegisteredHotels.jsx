import { useState, useEffect } from "react";
import axios from "axios";
import StatsCards from "./StatsCards";
import SearchBar from "./SearchBar";
import HotelsTable from "./HotelsTable";
import BookingsModal from "./BookingsModal";

const RegisteredHotels = () => {
  // State management
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPage, setBookingsPage] = useState(1);
  const hotelsPerPage = 8;
  const bookingsPerPage = 5;
  const [loading, setLoading] = useState({
    hotels: false,
    bookings: false,
  });

  // ✅ Fetch hotels from backend
  useEffect(() => {
    const fetchHotels = async () => {
      setLoading((prev) => ({ ...prev, hotels: true }));
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/hotels", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHotels(res.data || []);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading((prev) => ({ ...prev, hotels: false }));
      }
    };

    fetchHotels();
  }, []);

  // ✅ Fetch bookings for a specific hotel
  const viewBookings = async (hotelId) => {
    setSelectedHotel(hotels.find((h) => h._id === hotelId));
    setIsBookingModalOpen(true);
    setBookingsPage(1);

    setLoading((prev) => ({ ...prev, bookings: true }));
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/admin/bookings`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBookings(res.data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading((prev) => ({ ...prev, bookings: false }));
    }
  };

  // ✅ Delete a booking
  const deleteBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/admin/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  // ✅ Edit a booking
  const editBooking = async (bookingId, updates) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/admin/bookings/${bookingId}`,
        updates,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update state
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? res.data : b))
      );
    } catch (error) {
      console.error("Error editing booking:", error);
    }
  };

  // 🔍 Filter hotels based on search term
  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic for hotels
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = filteredHotels.slice(
    indexOfFirstHotel,
    indexOfLastHotel
  );
  const totalHotelPages = Math.ceil(filteredHotels.length / hotelsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Hotel Management
        </h1>

        <StatsCards hotels={hotels} bookings={bookings} />

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <HotelsTable
          loading={loading.hotels}
          currentHotels={currentHotels}
          filteredHotels={filteredHotels}
          currentPage={currentPage}
          totalHotelPages={totalHotelPages}
          indexOfFirstHotel={indexOfFirstHotel}
          indexOfLastHotel={indexOfLastHotel}
          setCurrentPage={setCurrentPage}
          viewBookings={viewBookings}
        />
      </div>

      <BookingsModal
        isBookingModalOpen={isBookingModalOpen}
        setIsBookingModalOpen={setIsBookingModalOpen}
        selectedHotel={selectedHotel}
        bookings={bookings}
        bookingsPage={bookingsPage}
        setBookingsPage={setBookingsPage}
        bookingsPerPage={bookingsPerPage}
        deleteBooking={deleteBooking}
        editBooking={editBooking}
      />

    </div>
  );
};

export default RegisteredHotels;
