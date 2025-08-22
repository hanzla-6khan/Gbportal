import React, { useState } from 'react';
import { useOrders } from '../../hooks/useOrders';
import { Package, Truck, CheckCircle, Clock, AlertCircle, Eye, Download, MessageCircle } from 'lucide-react';

const UserOrders = () => {
    const { orders, isLoading } = useOrders();
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Filter orders by status and search
    const filteredOrders = orders.filter(order => {
        const matchesStatus = selectedStatus === 'all' || order.status?.toLowerCase() === selectedStatus.toLowerCase();
        const matchesSearch = order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.items?.[0]?.product?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    // Get unique statuses
    const statuses = ['all', ...new Set(orders.map(o => o.status).filter(Boolean))];

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return <Clock className="h-5 w-5 text-yellow-500" />;
            case 'processing':
                return <Package className="h-5 w-5 text-blue-500" />;
            case 'shipped':
                return <Truck className="h-5 w-5 text-purple-500" />;
            case 'delivered':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'cancelled':
                return <AlertCircle className="h-5 w-5 text-red-500" />;
            default:
                return <Package className="h-5 w-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'shipped':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleViewOrder = (order) => {
        // TODO: Implement order detail modal/page
        console.log('Viewing order:', order);
    };

    const handleDownloadInvoice = (order) => {
        // TODO: Implement invoice download
        console.log('Downloading invoice for order:', order);
    };

    const handleContactSupport = (order) => {
        // TODO: Implement support chat/contact
        console.log('Contacting support for order:', order);
    };

    const handleTrackOrder = (order) => {
        // TODO: Implement order tracking
        console.log('Tracking order:', order);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
                <p className="text-gray-600">Track and manage your orders</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-full">
                            <Package className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Total Orders</p>
                            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-2 bg-yellow-100 rounded-full">
                            <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Pending</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {orders.filter(o => o.status?.toLowerCase() === 'pending').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-full">
                            <Truck className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">In Transit</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {orders.filter(o => ['processing', 'shipped'].includes(o.status?.toLowerCase())).length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-full">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Delivered</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {orders.filter(o => o.status?.toLowerCase() === 'delivered').length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search orders by ID or product name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="lg:w-48">
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {statuses.map(status => (
                                <option key={status} value={status}>
                                    {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                    <Package className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {orders.length === 0 ? "You haven't placed any orders yet." : "Try adjusting your search or filter criteria."}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            {/* Order Header */}
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="flex items-center gap-3">
                                        {getStatusIcon(order.status)}
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Order #{order._id.slice(-8)}</h3>
                                            <p className="text-sm text-gray-600">
                                                Placed on {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status || 'Unknown'}
                                        </span>
                                        <span className="text-lg font-bold text-gray-900">
                                            ${order.totalPrice?.toFixed(2) || '0.00'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="px-6 py-4">
                                <div className="space-y-3">
                                    {order.items?.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0">
                                                {item.product?.image ? (
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Package className="h-6 w-6 text-gray-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-gray-900 truncate">{item.product?.name || 'Unknown Product'}</h4>
                                                <p className="text-sm text-gray-600">
                                                    Quantity: {item.quantity} × ${item.price?.toFixed(2) || '0.00'}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Seller: {item.product?.seller?.name || 'Unknown Seller'}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-gray-900">
                                                    ${((item.quantity || 1) * (item.price || 0)).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Actions */}
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => handleViewOrder(order)}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                                        >
                                            <Eye className="h-4 w-4" />
                                            View Details
                                        </button>

                                        {order.status?.toLowerCase() === 'shipped' && (
                                            <button
                                                onClick={() => handleTrackOrder(order)}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors"
                                            >
                                                <Truck className="h-4 w-4" />
                                                Track Order
                                            </button>
                                        )}

                                        <button
                                            onClick={() => handleDownloadInvoice(order)}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
                                        >
                                            <Download className="h-4 w-4" />
                                            Download Invoice
                                        </button>

                                        <button
                                            onClick={() => handleContactSupport(order)}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
                                        >
                                            <MessageCircle className="h-4 w-4" />
                                            Contact Support
                                        </button>
                                    </div>
                                </div>

                                {/* Order Timeline */}
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Order Timeline</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 text-sm">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-gray-600">Order placed on {new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        {order.status?.toLowerCase() === 'processing' && (
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <span className="text-gray-600">Order is being processed</span>
                                            </div>
                                        )}
                                        {order.status?.toLowerCase() === 'shipped' && (
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                <span className="text-gray-600">Order has been shipped</span>
                                            </div>
                                        )}
                                        {order.status?.toLowerCase() === 'delivered' && (
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span className="text-gray-600">Order has been delivered</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserOrders; 