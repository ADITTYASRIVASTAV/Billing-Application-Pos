import React from 'react';
import { CreditCard, Percent, Tag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setDiscountType,
  setDiscountValue,
  setOrderNote,
  selectDiscountType,
  selectDiscountValue,
  selectOrderNote,
  selectTotal,
  selectCartItems,
} from '../Cart/cartSlice';

import { selectCurrentCustomer } from '../Customer/customerSlice';

import {
  setPaymentMethod,
  processPayment,
  selectPaymentMethods,
  selectSelectedPaymentMethod,
} from './paymentSlice';

const PaymentSection = () => {
  const dispatch = useDispatch();

  const total = useSelector(selectTotal);
  const discountType = useSelector(selectDiscountType);
  const discountValue = useSelector(selectDiscountValue);
  const orderNote = useSelector(selectOrderNote);
  const cartItems = useSelector(selectCartItems);
  const currentCustomer = useSelector(selectCurrentCustomer);
  const paymentMethods = useSelector(selectPaymentMethods);
  const selectedPaymentMethod = useSelector(selectSelectedPaymentMethod);

  const subtotal = useSelector((state) =>
    state.cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  );

  const handleDiscountTypeChange = (type) => {
    dispatch(setDiscountType(type));
    dispatch(setDiscountValue(0));
  };

  const handleDiscountChange = (e) => {
    dispatch(setDiscountValue(parseFloat(e.target.value) || 0));
  };

  const handleOrderNoteChange = (e) => {
    dispatch(setOrderNote(e.target.value));
  };

  const handlePaymentMethodSelect = (methodId) => {
    dispatch(setPaymentMethod(methodId));
  };

  const handleProcessPayment = () => {
    if (cartItems.length === 0) {
      alert('Add items to cart before processing payment');
      return;
    }

    const paymentData = {
      cartItems,
      customer: currentCustomer,
      subtotal,
      discount: discountValue,
      tax: (subtotal * 18) / 100,
      total,
    };

    dispatch(processPayment(paymentData));
    alert('Payment processed successfully! Check console for details.');
  };

  return (
    <div className="h-full flex flex-col bg-white">

      {/* ================= SCROLLABLE CONTENT ================= */}
      <div className="flex-1 overflow-y-auto px-1 space-y-6">

        {/* Discount */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Tag className="w-5 h-5 mr-2" />
            Discount
          </h3>

          <div className="space-y-2">
            <div className="flex space-x-2">
              <button
                onClick={() => handleDiscountTypeChange('percentage')}
                className={`flex-1 py-2 px-4 rounded-lg border ${
                  discountType === 'percentage'
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center">
                  <Percent className="w-4 h-4 mr-2" />
                  Percentage
                </div>
              </button>

              <button
                onClick={() => handleDiscountTypeChange('fixed')}
                className={`flex-1 py-2 px-4 rounded-lg border ${
                  discountType === 'fixed'
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                Fixed Amount
              </button>
            </div>

            <input
              type="number"
              value={discountValue}
              onChange={handleDiscountChange}
              min="0"
              max={discountType === 'percentage' ? 100 : undefined}
              placeholder={
                discountType === 'percentage'
                  ? 'Discount %'
                  : 'Discount amount'
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Order Note */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Order Note
          </h3>
          <textarea
            value={orderNote}
            onChange={handleOrderNoteChange}
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Add order notes here..."
          />
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Payment Method
          </h3>

          <div className="grid grid-cols-3 gap-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => handlePaymentMethodSelect(method.id)}
                className={`p-3 border rounded-lg flex flex-col items-center justify-center ${
                  selectedPaymentMethod === method.id
                    ? 'bg-green-50 border-green-500'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl">{method.icon}</span>
                <span className="text-sm">{method.name}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* ================= FIXED PAYMENT SUMMARY ================= */}
      <div className="border-t bg-green-50 p-5 sticky bottom-0">
        <div className="text-center ">
          <div className="text-3xl font-bold text-gray-900">
            ₹{total.toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">Total Amount</div>
        </div>


        <button
          onClick={handleProcessPayment}
          disabled={cartItems.length === 0}
          className={`w-full  rounded-lg font-semibold ${
            cartItems.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' :
             'bg-green-600 text-white hover:bg-green-700' }`} >
          Process Payment
        </button>
      </div>

    </div>
  );
};

export default PaymentSection;
