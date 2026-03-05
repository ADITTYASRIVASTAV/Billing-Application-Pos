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

      <div className="flex-1 overflow-y-auto px-1 space-y-6">

        {/* Payment Method */}

           <div>
  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center justify-center">
    <CreditCard className="w-1 h-1 mr-1" />
    Payment Method
  </h3>

  <div className="grid grid-cols-3 gap-3">
    {paymentMethods.map((method) => (
      <button
        key={method.id}
        onClick={() => handlePaymentMethodSelect(method.id)}
        className={`relative p-2 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300 overflow-hidden group ${
          selectedPaymentMethod === method.id
            ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white  scale-105'
            : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-green-300 hover:shadow-md'
        }`}
      >
        {/* Background effect for selected state */}
        {selectedPaymentMethod === method.id && (
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
        )}
        
        {/* Icon with animation */}
        <span className={`text-1xl transition-transform duration-100 ${
          selectedPaymentMethod === method.id ? 'scale-50' : 'group-hover:scale-70'
        }`}>
          {method.icon}
        </span>
        
        {/* Method name */}
        <span className={`text-sm font-semibold ${
          selectedPaymentMethod === method.id ? 'text-white' : 'text-gray-900'
        }`}>
          {method.name}
        </span>
        
        {/* Selected indicator */}
        {selectedPaymentMethod === method.id && (
          <span ></span>
        )}
      </button>
    ))}
  </div>
</div>

      </div>

      {/* ================= FIXED PAYMENT SUMMARY ================= */}
      <div className="border-t bg-green-50 p-1 sticky ">
        <div className="text-center ">
          <div className="text-2xl font-bold text-gray-900">
            ₹{total.toFixed(2)}
          </div>
          <div className="text-sm text-gray-900">Total Amount</div>
        </div>




           <div className="flex justify-center">


           {/* PaymentButton */}

           <button
    onClick={handleProcessPayment}
    disabled={cartItems.length === 0}
    className="relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:shadow-none disabled:hover:translate-y-0 disabled:cursor-not-allowed group overflow-hidden"
  >
    <span className="relative z-10 flex items-center justify-center gap-2">
      {cartItems.length === 0 ? (
        <>
          {/* <ShoppingCart className="w-5 h-5" /> */}
          Cart Empty
        </>
      ) : (
        <>
          <CreditCard className="w-5 h-5" />
          Process Payment
        </>
      )}
    </span>
    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
  </button>
</div>
      </div>

    </div>
  );
};

export default PaymentSection;
