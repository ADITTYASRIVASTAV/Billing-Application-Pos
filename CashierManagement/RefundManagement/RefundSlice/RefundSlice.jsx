import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ==================== MOCK DATA ====================
const mockOrders = [
  {
    id: 'ORD001',
    dateTime: '2024-01-15 14:30:00',
    customerName: 'John Doe',
    customerPhone: '+1234567890',
    amount: 149.99,
    paymentMode: 'CARD',
    items: [
      { id: 1, name: 'Blue T-Shirt', quantity: 2, price: 29.99, total: 59.98 },
      { id: 2, name: 'Jeans', quantity: 1, price: 89.99, total: 89.99 },
    ],
  },
  {
    id: 'ORD002',
    dateTime: '2024-01-14 11:20:00',
    customerName: 'Jane Smith',
    customerPhone: '+1987654321',
    amount: 75.50,
    paymentMode: 'CASH',
    items: [
      { id: 3, name: 'Sneakers', quantity: 1, price: 75.50, total: 75.50 },
    ],
  },
  {
    id: 'ORD003',
    dateTime: '2024-01-13 16:45:00',
    customerName: 'Robert Johnson',
    customerPhone: '+1122334455',
    amount: 210.75,
    paymentMode: 'UPI',
    items: [
      { id: 4, name: 'Jacket', quantity: 1, price: 120.00, total: 120.00 },
      { id: 5, name: 'Socks', quantity: 3, price: 9.99, total: 29.97 },
      { id: 6, name: 'Cap', quantity: 1, price: 25.00, total: 25.00 },
    ],
  },
];

// ==================== MOCK API FUNCTIONS ====================
const mockAPI = {
  getOrders: async () => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    return { data: mockOrders };
  },
  
  processRefund: async (refundData) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
    return { 
      data: { 
        success: true, 
        refundId: 'REF' + Date.now(),
        message: 'Refund processed successfully',
        timestamp: new Date().toISOString()
      } 
    };
  },
};

// ==================== INITIAL STATE ====================
const initialState = {
  selectedOrder: null,
  orders: [],
  returnItems: [],
  refundMethod: 'original',
  returnReason: '',
  isLoading: false,
  isProcessing: false,
  error: null,
  success: null,
};

// ==================== ASYNC THUNKS ====================
export const fetchOrders = createAsyncThunk(
  'refund/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await mockAPI.getOrders();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const processRefund = createAsyncThunk(
  'refund/processRefund',
  async (refundData, { rejectWithValue }) => {
    try {
      const response = await mockAPI.processRefund(refundData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ==================== SLICE ====================
const refundSlice = createSlice({
  name: 'refund',
  initialState,
  reducers: {
    selectOrder: (state, action) => {
      state.selectedOrder = action.payload;
      if (action.payload.items) {
        state.returnItems = action.payload.items.map(item => ({
          ...item,
          returnQuantity: 0,
          isReturning: false,
        }));
      }
      state.error = null;
      state.success = null;
    },
    
    updateReturnItem: (state, action) => {
      const { itemId, returnQuantity, isReturning } = action.payload;
      const itemIndex = state.returnItems.findIndex(item => item.id === itemId);
      
      if (itemIndex !== -1) {
        const item = state.returnItems[itemIndex];
        const maxQuantity = item.quantity;
        const newQuantity = Math.max(0, Math.min(returnQuantity, maxQuantity));
        
        state.returnItems[itemIndex].returnQuantity = newQuantity;
        
        if (isReturning !== undefined) {
          state.returnItems[itemIndex].isReturning = isReturning;
        } else {
          state.returnItems[itemIndex].isReturning = newQuantity > 0;
        }
      }
    },
    
    setRefundMethod: (state, action) => {
      state.refundMethod = action.payload;
    },
    
    setReturnReason: (state, action) => {
      state.returnReason = action.payload;
    },
    
    resetRefund: (state) => {
      return { ...initialState };
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    clearSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch orders';
      })
      
      .addCase(processRefund.pending, (state) => {
        state.isProcessing = true;
        state.error = null;
        state.success = null;
      })
      .addCase(processRefund.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.success = action.payload.message;
        
        // Reset form if refund was successful
        if (action.payload.success) {
          state.selectedOrder = null;
          state.returnItems = [];
          state.refundMethod = 'original';
          state.returnReason = '';
        }
      })
      .addCase(processRefund.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload || 'Failed to process refund';
      });
  },
});

// ==================== SELECTORS ====================
export const selectTotalRefundAmount = (state) => {
  return state.refund.returnItems.reduce((total, item) => {
    if (item.isReturning) {
      return total + (item.price * item.returnQuantity);
    }
    return total;
  }, 0);
};

export const selectIsRefundValid = (state) => {
  const { returnItems, returnReason } = state.refund;
  const totalRefund = selectTotalRefundAmount(state);
  
  const hasReturnItems = returnItems.some(item => item.isReturning && item.returnQuantity > 0);
  const hasValidReason = returnReason.trim() !== '';
  const hasValidAmount = totalRefund > 0;
  
  return hasReturnItems && hasValidReason && hasValidAmount;
};

export const selectReturningItems = (state) => {
  return state.refund.returnItems.filter(item => item.isReturning && item.returnQuantity > 0);
};

// ==================== HELPER FUNCTIONS ====================
export const getReturnReasons = () => [
  'Damaged product',
  'Wrong item',
  'Size issue',
  'Customer changed mind',
  'Quality issues',
  'Not as described',
  'Late delivery',
  'Missing parts',
  'Defective product',
  'Wrong color',
  'Wrong size delivered',
  'Received expired product',
];

// ==================== EXPORTS ====================
export const {
  selectOrder,
  updateReturnItem,
  setRefundMethod,
  setReturnReason,
  resetRefund,
  clearError,
  clearSuccess,
} = refundSlice.actions;

export default refundSlice.reducer;