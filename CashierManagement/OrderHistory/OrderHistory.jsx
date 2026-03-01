import React from 'react';
import OrderHistoryHeader from './OrderHistoryHeader';
import OrderFilters from './OrderFilters';
import OrderTable from './OrderTable';
import OrderDetailsModal from './OrderDetailsModal';

const OrderHistory = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <OrderHistoryHeader />
      <OrderFilters />
      <OrderTable />
      <OrderDetailsModal />
    </div>
  );
};

export default OrderHistory;