import React from 'react';
import { X, CheckCircle, CreditCard, User, Package } from 'lucide-react';

const ReturnReceiptItemDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  refundData 
}) => {
  if (!isOpen) return null;

  const { 
    orderId, 
    customerName, 
    refundMethod, 
    returnReason, 
    items, 
    totalRefund 
  } = refundData;

  const formatMethod = (method) => {
    if (method === 'original') return 'Original Payment Method';
    return method.charAt(0).toUpperCase() + method.slice(1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Confirm Refund</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-2">Refund Amount</p>
            <p className="text-4xl font-bold text-blue-600">
              ${totalRefund.toFixed(2)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="space-y-3">
              <div className="flex items-center">
                <Package className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">Order ID:</span>
                <span className="ml-2 font-semibold">{orderId}</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">Customer:</span>
                <span className="ml-2 font-semibold">{customerName}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <CreditCard className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">Refund Method:</span>
                <span className="ml-2 font-semibold">{formatMethod(refundMethod)}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Return Reason:</span>
                <span className="ml-2 font-semibold">{returnReason}</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Items Being Returned
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-600 border-b border-gray-200">
                    <th className="pb-2">Item Name</th>
                    <th className="pb-2">Quantity</th>
                    <th className="pb-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items
                    .filter(item => item.isReturning && item.returnQuantity > 0)
                    .map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 last:border-0">
                        <td className="py-3">
                          <p className="font-medium">{item.name}</p>
                        </td>
                        <td className="py-3">{item.returnQuantity}</td>
                        <td className="py-3 text-right font-semibold">
                          ${(item.price * item.returnQuantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Confirm Refund
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnReceiptItemDialog;