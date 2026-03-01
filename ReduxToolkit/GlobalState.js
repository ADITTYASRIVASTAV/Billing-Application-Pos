import {configureStore} from "@reduxjs/toolkit";
import cartReducer from '../CashierManagement/Cart/cartSlice';
import customerReducer from '../CashierManagement/Customer/customerSlice';
import customerManagementReducer from '../CashierManagement/CustomerManagement/CustomerManagementSlice/customerManagementSlice'; // For customer management
import paymentReducer from '../CashierManagement/Payment/paymentSlice';
import shiftSummaryReducer from '../CashierManagement/ShiftManagement/ShilfSummarySlice/shiftSummarySlice';
import ordersReducer from '../CashierManagement/OrderHistory/OrderHistorySlice/ordersSlice';
import refundReducer from '../CashierManagement/RefundManagement/RefundSlice/RefundSlice';
import authReducer from "./Feature/Auth/AuthSlice"
import userReducer from "./Feature/User/UserSlice"
import productReducer from "./Feature/product/ProductSlice"

const globalstate = configureStore({
    reducer:{
    product: productReducer,
    cart: cartReducer,
    customer: customerReducer,           
    customerManagement: customerManagementReducer, 
    payment: paymentReducer,
    shiftSummary: shiftSummaryReducer,
    orders: ordersReducer,
    refund: refundReducer, 
    auth:authReducer,
    users:userReducer,

    }
})
export default globalstate;