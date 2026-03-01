import React from 'react';
import ShiftReportHeader from './ShiftReportHeader';
import ShiftInformation from './ShiftInformation';
import SalesSummaryCard from './SalesSummaryCard';
import PaymentSummaryCard from './PaymentSummaryCard';
import TopSellingItems from './TopSellingItems';
import RecentOrderTable from './RecentOrderTable';
import RefundTable from './RefundTable';

const ShiftSummaryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <ShiftReportHeader />
        <ShiftInformation />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SalesSummaryCard />
          <PaymentSummaryCard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TopSellingItems />
          <div className="space-y-6">
            <RecentOrderTable />
            <RefundTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftSummaryPage;