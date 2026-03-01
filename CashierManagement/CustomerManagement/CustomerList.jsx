import React from 'react';
import { useSelector } from 'react-redux';
import CustomerCard from './CustomerCard';

const CustomerList = () => {
  const customerManagementState = useSelector((state) => state.customerManagement);
  const filteredCustomers = customerManagementState?.filteredCustomers || [];
  const selectedCustomer = customerManagementState?.selectedCustomer || null;

  if (filteredCustomers.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-2">No customers found</div>
        <div className="text-sm text-gray-500">Try a different search term</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredCustomers.map((customer) => (
        <CustomerCard
          key={customer.id}
          customer={customer}
          isSelected={selectedCustomer?.id === customer.id}
        />
      ))}
    </div>
  );
};

export default CustomerList;