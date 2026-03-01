// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  discountType: 'percentage',
  discountValue: 0,
  taxRate: 18,
  orderNote: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          existingItem.quantity += 1;
        }
      } else {
        if (product.stock > 0) {
          state.items.push({
            ...product,
            quantity: 1,
          });
        }
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item && quantity > 0 && quantity <= item.stock) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.discountValue = 0;
      state.orderNote = '';
    },
    holdCart: (state) => {
      console.log('Cart held:', state.items);
    },
    setDiscountType: (state, action) => {
      state.discountType = action.payload;
    },
    setDiscountValue: (state, action) => {
      state.discountValue = action.payload;
    },
    setOrderNote: (state, action) => {
      state.orderNote = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  holdCart,
  setDiscountType,
  setDiscountValue,
  setOrderNote,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectDiscountType = (state) => state.cart.discountType;
export const selectDiscountValue = (state) => state.cart.discountValue;
export const selectOrderNote = (state) => state.cart.orderNote;
export const selectSubtotal = (state) =>
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectTax = (state) => (selectSubtotal(state) * state.cart.taxRate) / 100;
export const selectDiscountAmount = (state) => {
  const subtotal = selectSubtotal(state);
  if (state.cart.discountType === 'percentage') {
    return (subtotal * state.cart.discountValue) / 100;
  }
  return state.cart.discountValue;
};
export const selectTotal = (state) => {
  const subtotal = selectSubtotal(state);
  const tax = selectTax(state);
  const discount = selectDiscountAmount(state);
  return subtotal + tax - discount;
};

export default cartSlice.reducer;