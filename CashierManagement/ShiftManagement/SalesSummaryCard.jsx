import React from 'react';
import { useSelector } from 'react-redux';
import { selectSalesSummary } from './ShilfSummarySlice/shiftSummarySlice';
import { Receipt, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const SalesSummaryCard = () => {
  const { totalOrders, totalSales, totalRefund, netSales } = useSelector(selectSalesSummary);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Sales Summary</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Receipt className="text-blue-600" size={20} />
            <span className="text-sm font-medium text-blue-700">Orders</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
          <p className="text-xs text-gray-600 mt-1">Total transactions</p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-green-600" size={20} />
            <span className="text-sm font-medium text-green-700">Total Sales</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">${totalSales.toFixed(2)}</p>
          <p className="text-xs text-gray-600 mt-1">Gross revenue</p>
        </div>

        <div className="p-4 bg-red-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <TrendingDown className="text-red-600" size={20} />
            <span className="text-sm font-medium text-red-700">Total Refund</span>
          </div>
          <p className="text-2xl font-bold text-red-600">-${totalRefund.toFixed(2)}</p>
          <p className="text-xs text-gray-600 mt-1">Refunded amount</p>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="text-purple-600" size={20} />
            <span className="text-sm font-medium text-purple-700">Net Sales</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">${netSales.toFixed(2)}</p>
          <p className="text-xs text-gray-600 mt-1">Actual revenue</p>
        </div>
      </div>
    </div>
  );
};

export default SalesSummaryCard;