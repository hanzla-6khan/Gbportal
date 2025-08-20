import React from "react";
import StatsCard from "../StatsCard";
import RecentOrders from "../RecentOrders";
import UpcomingBookings from "../UpcomingBookings";

const Overview = ({ stats = [], recentOrders = [], upcomingBookings = [] }) => {
  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.length > 0 ? (
          stats.map((s, i) => <StatsCard key={i} {...s} />)
        ) : (
          <p className="col-span-4 text-center text-gray-500">No stats available</p>
        )}
      </div>

      {/* Orders & Bookings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RecentOrders orders={recentOrders} />
        <UpcomingBookings bookings={upcomingBookings} />
      </div>
    </div>
  );
};

export default Overview;
