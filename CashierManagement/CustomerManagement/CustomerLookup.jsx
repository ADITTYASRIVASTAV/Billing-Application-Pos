import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCustomer, clearSelectedCustomer } from './CustomerManagementSlice/customerManagementSlice';

const CustomerLookup = () => {
  const customerManagementState = useSelector((state) => state.customerManagement);
  const customers = customerManagementState?.customers || [];
  const selectedCustomer = customerManagementState?.selectedCustomer || null;
  
  const dispatch = useDispatch();

  const handleSelectChange = (e) => {
    const customerId = e.target.value;
    if (customerId) {
      const customer = customers.find(c => c.id === customerId);
      if (customer) {
        dispatch(setSelectedCustomer(customer));
      }
    } else {
      dispatch(clearSelectedCustomer());
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Quick Customer Lookup
      </label>
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        value={selectedCustomer?.id || ''}
        onChange={handleSelectChange}
      >
        <option value="">Select a customer...</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.fullName} - {customer.phone}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomerLookup;