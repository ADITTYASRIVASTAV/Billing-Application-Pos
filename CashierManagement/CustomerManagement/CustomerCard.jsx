import React from 'react';
import { useDispatch } from 'react-redux';
import { User, Phone, Mail, Star } from 'lucide-react';
import { setSelectedCustomer } from './CustomerManagementSlice/customerManagementSlice';

const CustomerCard = ({ customer, isSelected }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedCustomer(customer));
  };

  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-md'
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{customer.fullName}</h3>
            <div className="space-y-1 mt-2">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-3 h-3 mr-2" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-3 h-3 mr-2" />
                <span className="truncate">{customer.email}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
          <Star className="w-4 h-4 text-yellow-500 mr-1" />
          <span className="text-sm font-medium text-yellow-800">
            {customer.loyaltyPoints.toLocaleString()} pts
          </span>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        {customer.totalOrders} orders • ${customer.totalSpent.toFixed(2)} spent
      </div>
    </div>
  );
};

export default CustomerCard;