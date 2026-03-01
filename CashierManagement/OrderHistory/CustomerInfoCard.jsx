import React from 'react';
import { User, Phone } from 'lucide-react';

const CustomerInfoCard = ({ customer }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Customer Name</p>
            <p className="font-medium text-gray-900">{customer.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Phone className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="font-medium text-gray-900">{customer.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoCard;