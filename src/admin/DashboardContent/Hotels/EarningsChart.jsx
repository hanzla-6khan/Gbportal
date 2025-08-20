import React, { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

const EarningsChart = ({ filteredHotels }) => {
  const [view, setView] = useState('Earnings'); // Earnings or Bookings

  // Prepare chart data for stacked bars
  const chartData = useMemo(() => {
    return filteredHotels.map((hotel) => ({
      name: hotel.name,
      Completed: hotel.completedEarnings,
      Upcoming: hotel.upcomingEarnings,
      Bookings: hotel.bookingsInRange.length,
    }));
  }, [filteredHotels]);

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Hotel Overview</h2>
        <select
          className="border rounded-md p-1 text-sm bg-white"
          value={view}
          onChange={(e) => setView(e.target.value)}
        >
          <option value="Earnings">Earnings</option>
          <option value="Bookings">Bookings</option>
        </select>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value, name) =>
                name === 'Bookings' ? value : `$${value.toFixed(2)}`
              }
            />
            <Legend />
            {view === 'Earnings' ? (
              <>
                <Bar dataKey="Completed" stackId="a" fill="#10b981" />
                <Bar dataKey="Upcoming" stackId="a" fill="#f59e0b" />
              </>
            ) : (
              <Bar dataKey="Bookings" fill="#3b82f6" />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EarningsChart;
