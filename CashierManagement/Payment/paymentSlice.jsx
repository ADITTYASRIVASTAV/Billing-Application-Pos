// src/features/payment/paymentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paymentMethods: [
    { id: 1, name: 'Cash', icon: '💵' },
    { id: 2, name: 'Credit Card', icon: '💳' },
    { id: 3, name: 'Debit Card', icon: '🏦' },
    { id: 4, name: 'UPI', icon: '📱' },
    { id: 5, name: 'Net Banking', icon: '🌐' },
  ],
  selectedPaymentMethod: 1,
  paymentStatus: 'pending',
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentMethod: (state, action) => {
      state.selectedPaymentMethod = action.payload;
    },
    processPayment: (state, action) => {
      const { cartItems, customer, total, discount, tax, subtotal } = action.payload;
      
      console.log('Payment processed:', {
        orderId: `ORD-${Date.now()}`,
        customer,
        items: cartItems,
        paymentSummary: {
          subtotal,
          tax,
          discount,
          total,
        },
        paymentMethod: state.paymentMethods.find(m => m.id === state.selectedPaymentMethod)?.name,
        timestamp: new Date().toISOString(),
      });
      
      state.paymentStatus = 'completed';
    },
    resetPayment: (state) => {
      state.paymentStatus = 'pending';
    },
  },
});

export const { setPaymentMethod, processPayment, resetPayment } = paymentSlice.actions;
export const selectPaymentMethods = (state) => state.payment.paymentMethods;
export const selectSelectedPaymentMethod = (state) => state.payment.selectedPaymentMethod;
export const selectPaymentStatus = (state) => state.payment.paymentStatus;

export default paymentSlice.reducer;
