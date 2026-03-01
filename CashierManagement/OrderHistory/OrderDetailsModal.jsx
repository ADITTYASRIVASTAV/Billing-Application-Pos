import React from 'react';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedOrder, selectSelectedOrder } from '../OrderHistory/OrderHistorySlice/ordersSlice';
import OrderInfoCard from './OrderInfoCard';
import CustomerInfoCard from './CustomerInfoCard';
import OrderItemsTable from './OrderItemsTable';

const OrderDetailsModal = () => {
  const dispatch = useDispatch();
  const order = useSelector(selectSelectedOrder);

  if (!order) return null;

  const handleClose = () => {
    dispatch(clearSelectedOrder());
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
              <p className="text-gray-600 mt-1">Order ID: {order.id}</p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <OrderInfoCard order={order} />
                <CustomerInfoCard customer={order.customer} />
              </div>
              
              <OrderItemsTable items={order.items} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;