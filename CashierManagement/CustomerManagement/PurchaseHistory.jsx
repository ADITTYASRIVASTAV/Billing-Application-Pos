import React from 'react';
import { useSelector } from 'react-redux';
import { Calendar, Clock, CheckCircle, Package, CreditCard } from 'lucide-react';

const PurchaseHistory = () => {
  const customerManagementState = useSelector((state) => state.customerManagement);
  const selectedCustomer = customerManagementState?.selectedCustomer || null;

  if (!selectedCustomer) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-2">Select a customer to view purchase history</div>
      </div>
    );
  }

  if (!selectedCustomer.purchaseHistory || selectedCustomer.purchaseHistory.length === 0) {
    return (
      <div className="text-center py-8 border border-gray-200 rounded-lg bg-gray-50">
        <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <div className="text-gray-500 mb-1">No purchase history found</div>
        <div className="text-sm text-gray-400">This customer hasn't made any purchases yet</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Purchase History</h3>
        <div className="text-sm text-gray-500">
          {selectedCustomer.purchaseHistory.length} order(s) total
        </div>
      </div>
      
      <div className="space-y-4">
        {selectedCustomer.purchaseHistory.map((order, index) => (
          <div 
            key={`${order.orderId}-${index}`} 
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Order Header */}
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  <div className="min-w-0"> {/* Added to prevent overflow */}
                    <h4 className="font-semibold text-gray-900 truncate">{order.orderId}</h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 mt-1">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span className="truncate">
                          {new Date(order.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{order.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ${order.totalAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </p>
                    <div className="flex items-center justify-end text-green-600 text-sm">
                      <CheckCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="capitalize truncate">{order.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-4">
              <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Package className="w-4 h-4 mr-2 flex-shrink-0" />
                Order Items ({order.items.length})
              </h5>
              <div className="space-y-3">
                {order.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex} 
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 hover:bg-gray-50 rounded gap-2"
                  >
                    <div className="flex items-center min-w-0">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-xs font-medium text-blue-600">#{itemIndex + 1}</span>
                      </div>
                      <div className="min-w-0">
                        <span className="text-gray-900 font-medium truncate block">{item.name}</span>
                        <div className="text-xs text-gray-500 mt-1">
                          Unit Price: ${item.price.toFixed(2)} × {item.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="text-right sm:text-left">
                      <div className="text-gray-900 font-bold">
                        ${(item.price * item.quantity).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </div>
                      <div className="text-xs text-gray-500">
                        ${item.price.toFixed(2)} each
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Subtotal
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ${(order.totalAmount * 0.9).toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <div className="text-sm text-gray-600">
                    Tax (10%)
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ${(order.totalAmount * 0.1).toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                  <div className="font-semibold text-gray-900">
                    Total Amount
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    ${order.totalAmount.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm gap-2">
                <div className="text-gray-600 truncate">
                  Payment Method: <span className="font-medium text-gray-900">Credit Card</span>
                </div>
                <div className="text-gray-600 truncate">
                  Payment Status: <span className="font-medium text-green-600">Paid</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseHistory;