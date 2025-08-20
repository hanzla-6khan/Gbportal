import React from 'react';
import { useOrders } from '../../hooks/useOrders';
import { ShoppingCart, Package, Heart, User, TrendingUp } from 'lucide-react';

const UserDashboard = () => {
  const { orders, isLoading } = useOrders();

  // Calculate user-specific stats
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
  const completedOrders = orders.filter(order => 
    order.status?.toLowerCase() === 'delivered'
  ).length;
  const pendingOrders = orders.filter(order => 
    order.status?.toLowerCase() === 'pending'
  ).length;

  const stats = [
    {
      title: 'Total Orders',
      value: totalOrders,
      change: 'Your order history',
      icon: <ShoppingCart className="h-6 w-6" />,
      changeType: 'neutral',
    },
    {
      title: 'Total Spent',
      value: `$${totalSpent.toFixed(2)}`,
      change: 'Lifetime spending',
      icon: <Package className="h-6 w-6" />,
      changeType: 'neutral',
    },
    {
      title: 'Completed Orders',
      value: completedOrders,
      change: 'Successfully delivered',
      icon: <Heart className="h-6 w-6" />,
      changeType: 'positive',
    },
    {
      title: 'Pending Orders',
      value: pendingOrders,
      change: 'In progress',
      icon: <User className="h-6 w-6" />,
      changeType: 'neutral',
    },
  ];

  const recentOrders = orders.slice(0, 5).map(order => ({
    id: order._id,
    date: new Date(order.createdAt).toLocaleDateString(),
    amount: `$${order.totalPrice}`,
    status: order.status,
    items: order.items?.length || 0,
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="text-gray-600">Here's what's happening with your account</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.change}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id.slice(-8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.items} items
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              Browse Products
            </button>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
              View Orders
            </button>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
              Update Profile
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• Order #12345 marked as delivered</p>
            <p>• New product "Premium Widget" available</p>
            <p>• Payment confirmed for order #12344</p>
            <p>• Review submitted for "Quality Product"</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended for You</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900">New Arrivals</h4>
            <p className="text-sm text-gray-600">Check out the latest products</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900">Trending</h4>
            <p className="text-sm text-gray-600">Popular items this week</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <Heart className="h-8 w-8 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900">Favorites</h4>
            <p className="text-sm text-gray-600">Your saved items</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 