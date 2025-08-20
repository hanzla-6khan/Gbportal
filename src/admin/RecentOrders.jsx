import React, { useState } from "react";
import {
  ShoppingCart,
  User,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  Truck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const RecentOrders = ({ orders = [] }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      Shipped: {
        color: "bg-blue-100 text-blue-800",
        icon: <Truck size={14} />,
      },
      Processing: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <Clock size={14} />,
      },
      Delivered: {
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle size={14} />,
      },
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          statusConfig[status]?.color ||
          "bg-gray-100 text-gray-800"
        }`}
      >
        {statusConfig[status]?.icon && (
          <span className="mr-1">{statusConfig[status].icon}</span>
        )}
        {status}
      </span>
    );
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b bg-gray-50">
        <h3 className="text-lg font-semibold flex items-center">
          <ShoppingCart className="mr-2 text-blue-600" size={18} />
          Recent Orders
        </h3>
      </div>

      {orders.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No recent orders found
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seller
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="mr-2 text-gray-400" size={14} />
                        {order.customer}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {order.seller || "N/A"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="mr-2 text-gray-400" size={14} />
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <DollarSign className="mr-2 text-gray-400" size={14} />
                        {order.amount}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-gray-200">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div
                  className="flex justify-between items-start cursor-pointer"
                  onClick={() => toggleOrderDetails(order.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        {order.id}
                      </span>
                      <StatusBadge status={order.status} />
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <User className="mr-2 text-gray-400" size={14} />
                      <span className="truncate">{order.customer}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <span className="truncate">
                        Seller: {order.seller || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Calendar className="mr-2 text-gray-400" size={14} />
                      <span>{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="mr-2 text-gray-400" size={14} />
                      <span>{order.amount}</span>
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    {expandedOrder === order.id ? (
                      <ChevronUp className="text-gray-400" size={18} />
                    ) : (
                      <ChevronDown className="text-gray-400" size={18} />
                    )}
                  </div>
                </div>

                {expandedOrder === order.id && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Order ID:</div>
                      <div className="text-gray-900">{order.id}</div>
                      <div className="text-gray-500">Customer:</div>
                      <div className="text-gray-900">{order.customer}</div>
                      <div className="text-gray-500">Seller:</div>
                      <div className="text-gray-900">
                        {order.seller || "N/A"}
                      </div>
                      <div className="text-gray-500">Date:</div>
                      <div className="text-gray-900">
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                      <div className="text-gray-500">Amount:</div>
                      <div className="text-gray-900">{order.amount}</div>
                      <div className="text-gray-500">Status:</div>
                      <div className="text-gray-900">
                        <StatusBadge status={order.status} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RecentOrders;
