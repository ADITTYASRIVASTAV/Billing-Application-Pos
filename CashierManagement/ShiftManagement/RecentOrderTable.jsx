import React from 'react';
import { useSelector } from 'react-redux';
import { selectRecentOrders } from './ShilfSummarySlice/shiftSummarySlice';
import { CreditCard, Wallet, Smartphone } from 'lucide-react';

const RecentOrderTable = () => {
  const recentOrders = useSelector(selectRecentOrders);

  const getPaymentIcon = (method) => {
    switch (method) {
      case 'CASH':
        return <Wallet size={16} className="text-green-600" />;
      case 'CARD':
        return <CreditCard size={16} className="text-blue-600" />;
      case 'UPI':
        return <Smartphone size={16} className="text-purple-600" />;
      default:
        return <CreditCard size={16} />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Order ID</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Time</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Payment Method</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <span className="font-medium text-gray-900">{order.id}</span>
                </td>
                <td className="py-3 px-4 text-gray-600">{order.time}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {getPaymentIcon(order.paymentMethod)}
                    <span className="text-gray-700">{order.paymentMethod}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="font-semibold text-gray-900">${order.amount.toFixed(2)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrderTable;