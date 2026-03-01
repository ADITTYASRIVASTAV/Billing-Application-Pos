import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { processRefund, selectTotalRefundAmount } from '../RefundManagement/RefundSlice/RefundSlice';
import OrderDetailSection from '../RefundManagement/OrderDetailSection';
import ReturnItemSection from '../RefundManagement/ReturnItemSection';
import ReturnReceiptItemDialog from '../RefundManagement/ReturnReceiptItemDialog';
import { ArrowLeft } from 'lucide-react';

const RefundPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  const { selectedOrder, returnItems, returnReason, refundMethod } = useSelector(state => state.refund);
  const totalRefund = useSelector(selectTotalRefundAmount);

  if (!selectedOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No order selected</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Order List
          </button>
        </div>
      </div>
    );
  }

  const handleProcessRefund = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmRefund = async () => {
    const refundData = {
      orderId: selectedOrder.id,
      items: returnItems.filter(item => item.isReturning),
      returnReason,
      refundMethod,
      totalRefund,
    };
    
    try {
      await dispatch(processRefund(refundData)).unwrap();
      setShowConfirmDialog(false);
      
      // Show success message
      alert('Refund processed successfully!');
      navigate('/');
    } catch (error) {
      alert('Failed to process refund. Please try again.');
    }
  };

  const refundData = {
    orderId: selectedOrder.id,
    customerName: selectedOrder.customerName,
    refundMethod,
    returnReason,
    items: returnItems,
    totalRefund,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Order List
          </button>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">Process Refund</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <OrderDetailSection order={selectedOrder} />
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Items</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Item Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Quantity</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Price</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items?.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="px-4 py-3">{item.name}</td>
                        <td className="px-4 py-3">{item.quantity}</td>
                        <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                        <td className="px-4 py-3 font-semibold">
                          ${item.total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <ReturnItemSection onProcessRefund={handleProcessRefund} />
          </div>
        </div>
      </div>

      <ReturnReceiptItemDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmRefund}
        refundData={refundData}
      />
    </div>
  );
};

export default RefundPage;

