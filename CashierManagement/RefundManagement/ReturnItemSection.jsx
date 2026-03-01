import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateReturnItem, setReturnReason, setRefundMethod,selectTotalRefundAmount,selectIsRefundValid } from '../RefundManagement/RefundSlice/RefundSlice';
import { AlertCircle } from 'lucide-react';

const ReturnItemSection = ({ onProcessRefund }) => {
  const dispatch = useDispatch();
  const { returnItems, returnReason, refundMethod, selectedOrder } = useSelector(state => state.refund);
  const totalRefund = useSelector(selectTotalRefundAmount);
  const isRefundValid = useSelector(selectIsRefundValid);

  const returnReasons = [
    'Damaged product',
    'Wrong item',
    'Size issue',
    'Customer changed mind',
    'Quality issues',
    'Not as described'
  ];

  const handleReturnToggle = (itemId, isReturning) => {
    dispatch(updateReturnItem({ 
      itemId, 
      isReturning,
      returnQuantity: isReturning ? 1 : 0 
    }));
  };

  const handleQuantityChange = (itemId, quantity) => {
    const parsedQty = parseInt(quantity) || 0;
    dispatch(updateReturnItem({ itemId, returnQuantity: parsedQty }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Return Items</h2>
      
      <div className="space-y-4 mb-8">
        {returnItems.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  Ordered: {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${
                  item.isReturning ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {item.isReturning ? 'Return: Yes' : 'Return: No'}
                </span>
                <button
                  onClick={() => handleReturnToggle(item.id, !item.isReturning)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    item.isReturning ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span className={`block w-4 h-4 bg-white rounded-full transform transition-transform ${
                    item.isReturning ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
            
            {item.isReturning && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Return Quantity
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={item.quantity}
                      value={item.returnQuantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Max: {item.quantity}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Refund Amount</p>
                    <p className="text-lg font-bold text-blue-600">
                      ${(item.price * item.returnQuantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Return Reason <span className="text-red-500">*</span>
          </label>
          <select
            value={returnReason}
            onChange={(e) => dispatch(setReturnReason(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a reason</option>
            {returnReasons.map((reason) => (
              <option key={reason} value={reason}>{reason}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Refund Method
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['original', 'cash', 'card', 'upi'].map((method) => {
              const isOriginal = method === 'original';
              const label = isOriginal 
                ? `Original (${selectedOrder?.paymentMode || 'N/A'})`
                : method.charAt(0).toUpperCase() + method.slice(1);
              
              return (
                <button
                  key={method}
                  type="button"
                  onClick={() => dispatch(setRefundMethod(method))}
                  className={`px-4 py-2 rounded-md border transition-colors ${
                    refundMethod === method
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Total Refund Amount</p>
              <p className="text-2xl font-bold text-blue-700">
                ${totalRefund.toFixed(2)}
              </p>
            </div>
            
            <button
              onClick={onProcessRefund}
              disabled={!isRefundValid}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                isRefundValid
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Process Refund
            </button>
          </div>
          
          {!isRefundValid && totalRefund > 0 && (
            <div className="mt-3 flex items-center text-amber-600">
              <AlertCircle className="w-4 h-4 mr-2" />
              <p className="text-sm">Please select a return reason</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReturnItemSection;