import React, { useState } from 'react';
import { 
  DollarSign, 
  Download, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

const payments = ({ userType = 'product' }) => {
  const [payoutMethod, setPayoutMethod] = useState('bank');
  const [payoutFrequency, setPayoutFrequency] = useState('weekly');

  // Sample transaction data
  const transactions = [
    { id: 'TXN-789456', date: '08/15/2023', type: userType === 'product' ? 'Product Sale' : 'Room Booking', amount: userType === 'product' ? 49.99 : 129.99, status: 'completed' },
    { id: 'TXN-123456', date: '08/10/2023', type: userType === 'product' ? 'Product Sale' : 'Room Booking', amount: userType === 'product' ? 24.99 : 89.99, status: 'pending' },
    { id: 'TXN-654321', date: '08/05/2023', type: userType === 'product' ? 'Product Sale' : 'Room Booking', amount: userType === 'product' ? 99.99 : 199.99, status: 'completed' },
    { id: 'TXN-321654', date: '08/01/2023', type: 'Refund', amount: userType === 'product' ? -29.99 : -79.99, status: 'completed' },
  ];

  return (
    <div className="flex-1 p-4 md:p-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <SummaryCard 
          title="Available Balance" 
          amount="2,845.50" 
          icon={<DollarSign className="text-green-500" size={24} />} 
          bgColor="bg-green-50"
        />
        <SummaryCard 
          title="Pending Clearance" 
          amount="745.00" 
          icon={<DollarSign className="text-yellow-500" size={24} />} 
          bgColor="bg-yellow-50"
        />
        <SummaryCard 
          title={payoutFrequency === 'weekly' ? 'Next Weekly Payout' : 'Next Monthly Payout'} 
          amount={payoutFrequency === 'weekly' ? "08/21/2023" : "09/01/2023"} 
          icon={<Calendar className="text-blue-500" size={24} />} 
          bgColor="bg-blue-50"
          isDate={true}
        />
      </div>

      {/* Payout Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Payout Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payout Method</label>
            <select
              value={payoutMethod}
              onChange={(e) => setPayoutMethod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="bank">Bank Transfer</option>
              <option value="paypal">PayPal</option>
              <option value="stripe">Stripe</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payout Frequency</label>
            <select
              value={payoutFrequency}
              onChange={(e) => setPayoutFrequency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="manual">Manual</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Request Payout Now
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <button className="flex items-center text-sm text-indigo-600 hover:text-indigo-800">
            <Download className="mr-1" size={14} />
            Download History
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((txn) => (
                <tr key={txn.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{txn.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{txn.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{txn.type}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${txn.amount < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                    ${Math.abs(txn.amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${txn.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        txn.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {txn.status === 'completed' ? (
                        <CheckCircle className="mr-1" size={12} />
                      ) : txn.status === 'pending' ? (
                        <Clock className="mr-1" size={12} />
                      ) : (
                        <AlertCircle className="mr-1" size={12} />
                      )}
                      {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User-specific section */}
      {userType === 'product' && (
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Product Seller Information</h3>
          <p className="text-gray-600">Your product sales payments are processed within 2-3 business days after order fulfillment.</p>
        </div>
      )}

      {userType === 'hotel' && (
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Hotel Owner Information</h3>
          <p className="text-gray-600">Your booking payments are released 24 hours after guest check-in.</p>
        </div>
      )}
    </div>
  );
};

// Reusable component
const SummaryCard = ({ title, amount, icon, bgColor, isDate = false }) => (
  <div className={`${bgColor} p-6 rounded-lg shadow-sm`}>
    <div className="flex justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-1 text-2xl font-semibold text-gray-900">
          {!isDate && '$'}{amount}
        </p>
      </div>
      <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
        {icon}
      </div>
    </div>
  </div>
);

export default payments;