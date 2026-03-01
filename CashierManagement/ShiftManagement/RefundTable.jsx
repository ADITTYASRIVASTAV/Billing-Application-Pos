import React from 'react';
import { useSelector } from 'react-redux';
import { selectFormattedRefunds } from './ShilfSummarySlice/shiftSummarySlice';
import { RefreshCw, AlertCircle } from 'lucide-react';

const RefundTable = () => {
  const refunds = useSelector(selectFormattedRefunds);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Refunds</h2>
        <div className="flex items-center gap-2 text-red-600">
          <RefreshCw size={18} />
          <span className="text-sm font-medium">{refunds.length} refunds issued</span>
        </div>
      </div>
      {refunds.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Refund ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Order ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Reason</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              {refunds.map((refund) => (
                <tr key={refund.id} className="border-b border-gray-100 hover:bg-red-50 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">{refund.id}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-700">{refund.orderId}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle size={16} className="text-orange-500" />
                      <span className="text-gray-700">{refund.reason}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-red-600">-${refund.amount.toFixed(2)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
            <RefreshCw className="text-green-600" size={24} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Refunds Issued</h3>
          <p className="text-gray-600">Great job! No refunds were processed during this shift.</p>
        </div>
      )}
    </div>
  );
};

export default RefundTable;