import React from 'react';
import { RefreshCw } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { refreshOrders } from '../OrderHistory/OrderHistorySlice/ordersSlice';

const OrderHistoryHeader = () => {
  const dispatch = useDispatch();

  const handleRefresh = () => {
    dispatch(refreshOrders());
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
        <p className="text-gray-600 mt-1">Track and manage all your orders</p>
      </div>
      <button
        onClick={handleRefresh}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Refresh
      </button>
    </div>
  );
};

export default OrderHistoryHeader;