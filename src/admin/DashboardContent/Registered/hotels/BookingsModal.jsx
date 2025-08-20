import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiHome
} from "react-icons/fi";

const BookingsModal = ({
  isBookingModalOpen,
  setIsBookingModalOpen,
  selectedHotel,
  bookings,
  bookingsPage,
  setBookingsPage,
  bookingsPerPage,
  deleteBooking,
  editBooking,
}) => {
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [editStatus, setEditStatus] = useState("");

  if (!isBookingModalOpen) return null;

  // Filter bookings only for the selected hotel
  const hotelBookings = bookings.filter(
    (b) => b.hotel?._id === selectedHotel?._id
  );

  const indexOfLastBooking = bookingsPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = hotelBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  const totalBookingPages = Math.ceil(hotelBookings.length / bookingsPerPage);

  // Save edited booking
  const handleSaveEdit = async (bookingId) => {
    await editBooking(bookingId, { status: editStatus });
    setEditingBookingId(null);
    setEditStatus("");
  };

  // Status badge styling
  const getStatusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-800";
      case "cancelled":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-amber-100 text-amber-800";
    }
  };

  return (
    <div className="fixed inset-0 overflow-y-auto z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <FiHome className="text-xl" />
            <h3 className="text-xl font-semibold">
              Bookings for {selectedHotel?.name}
            </h3>
          </div>
          <button
            onClick={() => setIsBookingModalOpen(false)}
            className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-blue-800">Total Bookings</h4>
                <FiCalendar className="text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-blue-900 mt-2">{hotelBookings.length}</p>
            </div>
            
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-emerald-800">Confirmed</h4>
                <FiCheck className="text-emerald-500" />
              </div>
              <p className="text-2xl font-bold text-emerald-900 mt-2">
                {hotelBookings.filter(b => b.status === "confirmed").length}
              </p>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-amber-800">Pending</h4>
                <FiEdit2 className="text-amber-500" />
              </div>
              <p className="text-2xl font-bold text-amber-900 mt-2">
                {hotelBookings.filter(b => b.status === "pending").length}
              </p>
            </div>
            
            <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-rose-800">Cancelled</h4>
                <FiX className="text-rose-500" />
              </div>
              <p className="text-2xl font-bold text-rose-900 mt-2">
                {hotelBookings.filter(b => b.status === "cancelled").length}
              </p>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FiUser className="mr-2" /> Guest
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2" /> Dates
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FiDollarSign className="mr-2" /> Price
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {currentBookings.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <FiCalendar className="text-4xl text-gray-300 mb-2" />
                        <p className="text-lg font-medium">No bookings found</p>
                        <p className="text-sm">This hotel has no bookings yet</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.user?.name || "Guest"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.user?.email || "No email provided"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(booking.checkIn).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(booking.checkOut).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.roomTypeName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        ${booking.totalPrice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingBookingId === booking._id ? (
                          <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                            className="form-select rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(
                              booking.status
                            )}`}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          {editingBookingId === booking._id ? (
                            <>
                              <button
                                onClick={() => handleSaveEdit(booking._id)}
                                className="p-2 text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors"
                                title="Save changes"
                              >
                                <FiCheck size={16} />
                              </button>
                              <button
                                onClick={() => setEditingBookingId(null)}
                                className="p-2 text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                title="Cancel editing"
                              >
                                <FiX size={16} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setEditingBookingId(booking._id);
                                  setEditStatus(booking.status);
                                }}
                                className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                title="Edit booking"
                              >
                                <FiEdit2 size={16} />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm("Are you sure you want to delete this booking?")) {
                                    deleteBooking(booking._id);
                                  }
                                }}
                                className="p-2 text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
                                title="Delete booking"
                              >
                                <FiTrash2 size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalBookingPages > 1 && (
            <div className="px-4 py-4 flex items-center justify-between border-t border-gray-200 mt-6">
              <div className="flex flex-1 items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirstBooking + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastBooking, hotelBookings.length)}
                    </span>{" "}
                    of <span className="font-medium">{hotelBookings.length}</span>{" "}
                    bookings
                  </p>
                </div>
                
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                  <button
                    onClick={() => setBookingsPage((prev) => Math.max(prev - 1, 1))}
                    disabled={bookingsPage === 1}
                    className="relative inline-flex items-center rounded-l-md px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <FiChevronLeft className="h-5 w-5" />
                  </button>
                  
                  {Array.from({ length: totalBookingPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setBookingsPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0
                          ${
                            bookingsPage === page
                              ? "z-10 bg-blue-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                              : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  
                  <button
                    onClick={() =>
                      setBookingsPage((prev) => Math.min(prev + 1, totalBookingPages))
                    }
                    disabled={bookingsPage === totalBookingPages}
                    className="relative inline-flex items-center rounded-r-md px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <FiChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsModal;