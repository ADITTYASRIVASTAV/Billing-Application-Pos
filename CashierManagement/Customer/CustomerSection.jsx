// src/features/customer/CustomerSection.jsx
import React, { useState } from 'react';
import { User, Phone, Mail, Award, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCustomer, selectAllCustomers, setCurrentCustomer } from './customerSlice';

const CustomerSection = () => {
  const dispatch = useDispatch();
  const currentCustomer = useSelector(selectCurrentCustomer);
  const allCustomers = useSelector(selectAllCustomers);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCustomerSelect = (customer) => {
    dispatch(setCurrentCustomer(customer));
    setShowDropdown(false);
  };

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2" />
          Customer Details
        </h3>
        <div className="relative">
          <div className="bg-white border border-gray-300 rounded-lg p-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-medium text-gray-900">{currentCustomer.name}</h4>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-1" />
                  {currentCustomer.phone}
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-1" />
                  {currentCustomer.email}
                </div>
              </div>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-gray-500 hover:text-gray-700"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            </div>
          </div>

          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {allCustomers.map((customer) => (
                <button
                  key={customer.id}
                  onClick={() => handleCustomerSelect(customer)}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
                    currentCustomer.id === customer.id ? 'bg-green-50' : ''
                  }`}
                >
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-sm text-gray-600">{customer.phone}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerSection;