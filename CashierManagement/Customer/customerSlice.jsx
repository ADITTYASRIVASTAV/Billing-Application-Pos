// src/features/customer/customerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCustomer: {
    id: 1,
    name: 'John Doe',
    phone: '+91 9876543210',
    email: 'john@example.com',
    loyaltyPoints: 1250,
  },
  customers: [
    {
      id: 1,
      name: 'John Doe',
      phone: '+91 9876543210',
      email: 'john@example.com',
      loyaltyPoints: 1250,
    },
    {
      id: 2,
      name: 'Jane Smith',
      phone: '+91 9876543211',
      email: 'jane@example.com',
      loyaltyPoints: 850,
    },
    {
      id: 3,
      name: 'Bob Johnson',
      phone: '+91 9876543212',
      email: 'bob@example.com',
      loyaltyPoints: 2100,
    },
  ],
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCurrentCustomer: (state, action) => {
      state.currentCustomer = action.payload;
    },
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
    },
    updateCustomer: (state, action) => {
      const index = state.customers.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.customers[index] = action.payload;
      }
    },
  },
});

export const { setCurrentCustomer, addCustomer, updateCustomer } = customerSlice.actions;
export const selectCurrentCustomer = (state) => state.customer.currentCustomer;
export const selectAllCustomers = (state) => state.customer.customers;

export default customerSlice.reducer;