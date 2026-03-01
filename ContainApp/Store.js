import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../ReduxToolkit/Feature/product/ProductSlice';
import cartReducer from '../CashierManagement/Cart/cartSlice';
import customerReducer from '../CashierManagement/Customer/customerSlice'; // For logged-in customer
import customerManagementReducer from '../CashierManagement/CustomerManagement/CustomerManagementSlice/customerManagementSlice'; // For customer management
import paymentReducer from '../CashierManagement/Payment/paymentSlice';
import shiftSummaryReducer from '../CashierManagement/ShiftManagement/ShilfSummarySlice/shiftSummarySlice';
import ordersReducer from '../CashierManagement/OrderHistory/OrderHistorySlice/ordersSlice';
import refundReducer from '../CashierManagement/RefundManagement/RefundSlice/RefundSlice'; // Add refund reducer import

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    customer: customerReducer,           // For logged-in customer (session)
    customerManagement: customerManagementReducer, // For managing multiple customers
    payment: paymentReducer,
    shiftSummary: shiftSummaryReducer,
    orders: ordersReducer,
    refund: refundReducer, // Add refund reducer here
  },

  });