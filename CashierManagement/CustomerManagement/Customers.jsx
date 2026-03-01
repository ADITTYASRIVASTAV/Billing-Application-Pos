import React, { useState } from 'react';
import CustomerSearch from './CustomerSearch';
import CustomerList from './CustomerList';
import CustomerDetails from './CustomerDetails';
import PurchaseHistory from './PurchaseHistory';
import AddCustomerModal from './AddCustomerModel'; // Fixed typo: AddCustomerModel → AddCustomerModal
import CustomerLookup from './CustomerLookup';

const Customers = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Customers Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Customer List */}
          <div className="lg:col-span-1">
            <CustomerSearch onAddNew={() => setIsAddModalOpen(true)} />
            <div className="mt-6">
              <CustomerLookup />
            </div>
            <div className="mt-4">
              <CustomerList />
            </div>
          </div>

          {/* Right Panel - Customer Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <CustomerDetails />
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <PurchaseHistory />
            </div>
          </div>
        </div>
      </div>

      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
};

export default Customers;