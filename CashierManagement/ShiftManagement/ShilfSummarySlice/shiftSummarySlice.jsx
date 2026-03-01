import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  cashier: {
    name: 'John Smith',
    id: 'CSH001'
  },
  shift: {
    startTime: '2024-01-15T09:00:00',
    endTime: null,
    status: 'ongoing'
  },
  orders: [
    { id: 'ORD001', time: '2024-01-15T10:30:00', paymentMethod: 'CARD', amount: 45.99, items: 3 },
    { id: 'ORD002', time: '2024-01-15T11:15:00', paymentMethod: 'CASH', amount: 28.50, items: 2 },
    { id: 'ORD003', time: '2024-01-15T11:45:00', paymentMethod: 'UPI', amount: 62.75, items: 4 },
    { id: 'ORD004', time: '2024-01-15T12:30:00', paymentMethod: 'CARD', amount: 19.99, items: 1 },
    { id: 'ORD005', time: '2024-01-15T13:10:00', paymentMethod: 'CASH', amount: 85.25, items: 5 },
    { id: 'ORD006', time: '2024-01-15T13:45:00', paymentMethod: 'UPI', amount: 32.50, items: 2 },
    { id: 'ORD007', time: '2024-01-15T14:20:00', paymentMethod: 'CARD', amount: 54.80, items: 3 },
  ],
  refunds: [
    { id: 'REF001', orderId: 'ORD002', reason: 'Wrong item', amount: 12.50, time: '2024-01-15T12:00:00' },
    { id: 'REF002', orderId: 'ORD004', reason: 'Damaged product', amount: 19.99, time: '2024-01-15T13:30:00' },
  ],
  products: [
    { id: 1, name: 'Espresso', price: 3.50, sold: 42 },
    { id: 2, name: 'Cappuccino', price: 4.50, sold: 38 },
    { id: 3, name: 'Croissant', price: 2.99, sold: 25 },
    { id: 4, name: 'Chocolate Cake', price: 5.99, sold: 18 },
    { id: 5, name: 'Americano', price: 3.00, sold: 30 },
  ],
  payments: {
    CASH: { transactions: 2, amount: 113.75 },
    CARD: { transactions: 3, amount: 120.78 },
    UPI: { transactions: 2, amount: 95.25 }
  }
};

export const shiftSummarySlice = createSlice({
  name: 'shiftSummary',
  initialState,
  reducers: {
    endShift: (state) => {
      state.shift.endTime = new Date().toISOString();
      state.shift.status = 'ended';
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    addRefund: (state, action) => {
      state.refunds.push(action.payload);
    }
  }
});

// Selectors
export const selectCashier = (state) => state.shiftSummary.cashier;
export const selectShift = (state) => state.shiftSummary.shift;
export const selectOrders = (state) => state.shiftSummary.orders;
export const selectRefunds = (state) => state.shiftSummary.refunds;
export const selectProducts = (state) => state.shiftSummary.products;
export const selectPayments = (state) => state.shiftSummary.payments;

// Memoized selectors
export const selectSalesSummary = createSelector(
  [selectOrders, selectRefunds],
  (orders, refunds) => {
    const totalOrders = orders.length;
    const totalSales = orders.reduce((sum, order) => sum + order.amount, 0);
    const totalRefund = refunds.reduce((sum, refund) => sum + refund.amount, 0);
    const netSales = totalSales - totalRefund;
    
    return {
      totalOrders,
      totalSales: parseFloat(totalSales.toFixed(2)),
      totalRefund: parseFloat(totalRefund.toFixed(2)),
      netSales: parseFloat(netSales.toFixed(2))
    };
  }
);

export const selectPaymentSummary = createSelector(
  [selectPayments, selectOrders],
  (payments, orders) => {
    const totalSales = orders.reduce((sum, order) => sum + order.amount, 0);
    
    return Object.entries(payments).map(([method, data]) => ({
      method,
      transactions: data.transactions,
      amount: parseFloat(data.amount.toFixed(2)),
      percentage: totalSales > 0 ? parseFloat(((data.amount / totalSales) * 100).toFixed(1)) : 0
    }));
  }
);

export const selectTopSellingItems = createSelector(
  [selectProducts],
  (products) => {
    return [...products]
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5)
      .map((product, index) => ({
        rank: index + 1,
        name: product.name,
        sold: product.sold,
        price: product.price,
        revenue: parseFloat((product.sold * product.price).toFixed(2))
      }));
  }
);

export const selectRecentOrders = createSelector(
  [selectOrders],
  (orders) => {
    return [...orders]
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 10)
      .map(order => ({
        ...order,
        time: new Date(order.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        amount: parseFloat(order.amount.toFixed(2))
      }));
  }
);

export const selectFormattedRefunds = createSelector(
  [selectRefunds],
  (refunds) => {
    return refunds.map(refund => ({
      ...refund,
      amount: parseFloat(refund.amount.toFixed(2))
    }));
  }
);

export const { endShift, addOrder, addRefund } = shiftSummarySlice.actions;
export default shiftSummarySlice.reducer;