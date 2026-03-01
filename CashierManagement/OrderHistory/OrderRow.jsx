import React from 'react';
import { Eye, Printer, RotateCcw } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSelectedOrder } from './OrderHistorySlice/ordersSlice';

const OrderRow = ({ order }) => {
  const dispatch = useDispatch();

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString('en-IN') + ' ' + date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      Delivered: 'bg-green-100 text-green-800',
      Processing: 'bg-yellow-100 text-yellow-800',
      Shipped: 'bg-blue-100 text-blue-800',
      Pending: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-4 px-4">
        <span className="font-medium text-gray-900">{order.id}</span>
      </td>
      <td className="py-4 px-4">
        <span className="text-gray-700">{formatDateTime(order.dateTime)}</span>
      </td>
      <td className="py-4 px-4">
        <span className="text-gray-700">{order.customer.name}</span>
      </td>
      <td className="py-4 px-4">
        <span className="font-semibold text-gray-900">{formatCurrency(order.amount)}</span>
      </td>
      <td className="py-4 px-4">
        <span className="text-gray-700">{order.paymentMode}</span>
      </td>
      <td className="py-4 px-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => dispatch(setSelectedOrder(order))}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            title="Print"
          >
            <Printer className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Return/Reset"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default OrderRow;