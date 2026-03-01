import React from 'react';
import { Package, Calendar, User, CreditCard } from 'lucide-react';

const OrderDetailSection = ({ order }) => {
  if (!order) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Order Details</h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center text-gray-600 mb-1">
              <Package className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Order ID</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">{order.id}</p>
          </div>
          
          <div>
            <div className="flex items-center text-gray-600 mb-1">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Date & Time</span>
            </div>
            <p className="text-gray-900">{order.dateTime}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center text-gray-600 mb-1">
              <User className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Customer</span>
            </div>
            <p className="font-semibold text-gray-900">{order.customerName}</p>
            <p className="text-gray-600">{order.customerPhone}</p>
          </div>
          
          <div>
            <div className="flex items-center text-gray-600 mb-1">
              <CreditCard className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Payment Method</span>
            </div>
            <p className="font-semibold text-gray-900">{order.paymentMode}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Total Items</p>
            <p className="text-lg font-semibold text-gray-900">
              {order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Order Total</p>
            <p className="text-lg font-semibold text-gray-900">
              ${order.amount?.toFixed(2) || '0.00'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailSection;