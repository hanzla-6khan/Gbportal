import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  ShoppingCart,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Clock,
  Search,
  X
} from 'lucide-react';

const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const totalOrders = 1243;
  const pendingPayments = 18;
  const completedOrders = 985;
  
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Orders',
        data: [45, 72, 86, 93, 105, 128, 112],
        borderColor: 'rgb(22, 163, 74)',
        backgroundColor: 'rgba(22, 163, 74, 0.1)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20
        }
      }
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Add your search functionality here
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6">
      {/* Improved Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className={`relative w-full md:w-72 transition-all duration-200 ${isSearchFocused ? 'md:w-96' : ''}`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={`h-5 w-5 ${isSearchFocused ? 'text-green-500' : 'text-gray-400'}`} />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-200"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={handleSearch}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-label="Clear search"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{totalOrders.toLocaleString()}</h3>
              <p className="text-sm text-gray-500 mt-2 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">12.5%</span> from last week
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Payments</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{pendingPayments}</h3>
              <p className="text-sm text-gray-500 mt-2 flex items-center">
                <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-yellow-500">Require attention</span>
              </p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Completed Orders</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{completedOrders.toLocaleString()}</h3>
              <p className="text-sm text-gray-500 mt-2 flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500">79.2%</span> success rate
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h3 className="text-lg font-bold text-gray-900">Order Trends</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-green-50 text-green-700 rounded-lg">Week</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-50 rounded-lg">Month</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-50 rounded-lg">Year</button>
          </div>
        </div>
        <div className="h-80">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;