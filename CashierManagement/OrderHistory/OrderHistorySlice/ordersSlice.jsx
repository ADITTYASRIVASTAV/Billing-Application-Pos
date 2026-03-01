import { createSlice, createSelector } from '@reduxjs/toolkit';

// Mock data included directly in the slice file
const mockOrders = [
  {
    id: 'ORD-001',
    dateTime: '2024-03-15 14:30:00', // Updated to current month
    customer: {
      name: 'Rahul Sharma',
      phone: '+91 9876543210',
    },
    amount: 2499.99,
    paymentMode: 'UPI',
    status: 'Delivered',
    items: [
      {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        sku: 'SKU-12345',
        quantity: 1,
        price: 1999.99,
        total: 1999.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      },
      {
        id: 2,
        name: 'Phone Case',
        sku: 'SKU-67890',
        quantity: 2,
        price: 250,
        total: 500,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&h=100&fit=crop',
      },
    ],
  },
  {
    id: 'ORD-002',
    dateTime: '2024-03-14 11:20:00', // Updated to current month
    customer: {
      name: 'Priya Patel',
      phone: '+91 8765432109',
    },
    amount: 1499.50,
    paymentMode: 'CASH',
    status: 'Processing',
    items: [
      {
        id: 1,
        name: 'Smart Watch',
        sku: 'SKU-54321',
        quantity: 1,
        price: 1499.50,
        total: 1499.50,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
      },
    ],
  },
  {
    id: 'ORD-003',
    dateTime: '2024-03-13 16:45:00', // Updated to current month
    customer: {
      name: 'Amit Kumar',
      phone: '+91 7654321098',
    },
    amount: 3299.00,
    paymentMode: 'CARD',
    status: 'Shipped',
    items: [
      {
        id: 1,
        name: 'Laptop Backpack',
        sku: 'SKU-98765',
        quantity: 1,
        price: 1299.00,
        total: 1299.00,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
      },
      {
        id: 2,
        name: 'USB-C Hub',
        sku: 'SKU-24680',
        quantity: 1,
        price: 2000.00,
        total: 2000.00,
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=100&h=100&fit=crop',
      },
    ],
  },
  {
    id: 'ORD-004',
    dateTime: '2024-03-12 09:15:00', // Updated to current month
    customer: {
      name: 'Neha Gupta',
      phone: '+91 6543210987',
    },
    amount: 899.00,
    paymentMode: 'UPI',
    status: 'Pending',
    items: [
      {
        id: 1,
        name: 'Wireless Mouse',
        sku: 'SKU-13579',
        quantity: 1,
        price: 899.00,
        total: 899.00,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=100&h=100&fit=crop',
      },
    ],
  },
  {
    id: 'ORD-005',
    dateTime: '2024-03-11 19:30:00', // Updated to current month
    customer: {
      name: 'Vikram Singh',
      phone: '+91 5432109876',
    },
    amount: 4599.75,
    paymentMode: 'CARD',
    status: 'Delivered',
    items: [
      {
        id: 1,
        name: 'Gaming Keyboard',
        sku: 'SKU-11223',
        quantity: 1,
        price: 2999.75,
        total: 2999.75,
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=100&h=100&fit=crop',
      },
      {
        id: 2,
        name: 'Gaming Mouse',
        sku: 'SKU-44556',
        quantity: 1,
        price: 1600.00,
        total: 1600.00,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=100&h=100&fit=crop',
      },
    ],
  },
  {
    id: 'ORD-006',
    dateTime: '2024-03-10 10:45:00', // Updated to current month
    customer: {
      name: 'Ananya Reddy',
      phone: '+91 4321098765',
    },
    amount: 1899.00,
    paymentMode: 'UPI',
    status: 'Delivered',
    items: [
      {
        id: 1,
        name: 'Water Bottle',
        sku: 'SKU-55667',
        quantity: 2,
        price: 499.50,
        total: 999.00,
        image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=100&h=100&fit=crop',
      },
      {
        id: 2,
        name: 'Lunch Box',
        sku: 'SKU-77889',
        quantity: 1,
        price: 900.00,
        total: 900.00,
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop',
      },
    ],
  },
  {
    id: 'ORD-007',
    dateTime: '2024-03-05 15:20:00', // Updated to current month
    customer: {
      name: 'Karan Malhotra',
      phone: '+91 3210987654',
    },
    amount: 7999.99,
    paymentMode: 'CARD',
    status: 'Shipped',
    items: [
      {
        id: 1,
        name: 'Tablet',
        sku: 'SKU-99001',
        quantity: 1,
        price: 7999.99,
        total: 7999.99,
        image: 'https://images.unsplash.com/photo-1546054450-4699d6d28d1b?w=100&h=100&fit=crop',
      },
    ],
  },
  {
    id: 'ORD-008',
    dateTime: '2024-02-28 13:10:00', // Previous month for testing
    customer: {
      name: 'Sneha Verma',
      phone: '+91 2109876543',
    },
    amount: 1299.00,
    paymentMode: 'CASH',
    status: 'Processing',
    items: [
      {
        id: 1,
        name: 'Sunglasses',
        sku: 'SKU-22334',
        quantity: 1,
        price: 1299.00,
        total: 1299.00,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop',
      },
    ],
  },
];

// Helper function to normalize dates for comparison
const normalizeDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

// Helper function to get date ranges for filters
const getDateRange = (dateRange, customDates = {}) => {
  const now = new Date();
  
  switch (dateRange) {
    case 'today': {
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      return { start, end };
    }
    
    case 'week': {
      const start = new Date(now);
      // Get the start of week (Sunday)
      start.setDate(now.getDate() - now.getDay());
      start.setHours(0, 0, 0, 0);
      
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      return { start, end };
    }
    
    case 'month': {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      end.setHours(23, 59, 59, 999);
      return { start, end };
    }
    
    case 'custom': {
      if (customDates.startDate && customDates.endDate) {
        const start = new Date(customDates.startDate);
        start.setHours(0, 0, 0, 0);
        
        const end = new Date(customDates.endDate);
        end.setHours(23, 59, 59, 999);
        
        return { start, end };
      }
      return null;
    }
    
    default:
      return null;
  }
};

// Initial state with mock data
const initialState = {
  orders: mockOrders,
  selectedOrder: null,
  filters: {
    search: '',
    dateRange: 'today',
    startDate: null,
    endDate: null,
  },
};

// Create slice
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Set selected order for details view
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    
    // Clear selected order
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
    
    // Set search filter
    setSearchFilter: (state, action) => {
      state.filters.search = action.payload;
    },
    
    // Set date filter (today, week, month, custom)
    setDateFilter: (state, action) => {
      state.filters.dateRange = action.payload;
      
      // Reset custom dates when selecting predefined ranges
      if (action.payload !== 'custom') {
        state.filters.startDate = null;
        state.filters.endDate = null;
      }
    },
    
    // Set custom date range
    setCustomDateRange: (state, action) => {
      state.filters.startDate = action.payload.startDate;
      state.filters.endDate = action.payload.endDate;
      state.filters.dateRange = 'custom';
    },
    
    // Refresh orders (simulates API refresh)
    refreshOrders: (state) => {
      // In a real app, this would fetch from API
      // For mock, we simulate by resetting to initial data
      state.orders = [...mockOrders];
      state.filters.search = '';
      state.selectedOrder = null;
    },
    
    // Add a new order (for demonstration)
    addNewOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },
    
    // Update order status
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(order => order.id === orderId);
      if (order) {
        order.status = status;
        // Update selected order if it's the same
        if (state.selectedOrder && state.selectedOrder.id === orderId) {
          state.selectedOrder.status = status;
        }
      }
    },
  },
});

// Export actions
export const {
  setSelectedOrder,
  clearSelectedOrder,
  setSearchFilter,
  setDateFilter,
  setCustomDateRange,
  refreshOrders,
  addNewOrder,
  updateOrderStatus,
} = ordersSlice.actions;

// Basic selectors
export const selectAllOrders = (state) => state.orders.orders;
export const selectSelectedOrder = (state) => state.orders.selectedOrder;
export const selectFilters = (state) => state.orders.filters;

// Memoized selector for filtered orders using createSelector
export const selectFilteredOrders = createSelector(
  [selectAllOrders, selectFilters],
  (orders, filters) => {
    // Early return if no orders
    if (!orders || orders.length === 0) return [];
    
    // Apply search filter
    let filtered = orders;
    if (filters.search.trim()) {
      const searchLower = filters.search.toLowerCase().trim();
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchLower) ||
        order.customer.name.toLowerCase().includes(searchLower) ||
        order.customer.phone.includes(searchLower)
      );
    }
    
    // Apply date filter
    if (filters.dateRange) {
      const dateRange = getDateRange(filters.dateRange, {
        startDate: filters.startDate,
        endDate: filters.endDate
      });
      
      if (dateRange && dateRange.start && dateRange.end) {
        filtered = filtered.filter(order => {
          const orderDate = new Date(order.dateTime);
          return orderDate >= dateRange.start && orderDate <= dateRange.end;
        });
      }
    }
    
    // Return sorted array (create new array to avoid mutation)
    return [...filtered].sort((a, b) => 
      new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
    );
  }
);

// Memoized selector for today's orders
export const selectTodayOrders = createSelector(
  [selectFilteredOrders],
  (filteredOrders) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return filteredOrders.filter(order => {
      const orderDate = new Date(order.dateTime);
      return orderDate >= today && orderDate < tomorrow;
    });
  }
);

// Memoized selector for this week's orders
export const selectThisWeekOrders = createSelector(
  [selectFilteredOrders],
  (filteredOrders) => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
    endOfWeek.setHours(23, 59, 59, 999);
    
    return filteredOrders.filter(order => {
      const orderDate = new Date(order.dateTime);
      return orderDate >= startOfWeek && orderDate <= endOfWeek;
    });
  }
);

// Memoized selector for this month's orders
export const selectThisMonthOrders = createSelector(
  [selectFilteredOrders],
  (filteredOrders) => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);
    
    return filteredOrders.filter(order => {
      const orderDate = new Date(order.dateTime);
      return orderDate >= startOfMonth && orderDate <= endOfMonth;
    });
  }
);

// Memoized selector for order statistics
export const selectOrderStats = createSelector(
  [selectAllOrders],
  (orders) => {
    return {
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, order) => sum + order.amount, 0),
      deliveredOrders: orders.filter(order => order.status === 'Delivered').length,
      pendingOrders: orders.filter(order => order.status === 'Pending').length,
      processingOrders: orders.filter(order => order.status === 'Processing').length,
      shippedOrders: orders.filter(order => order.status === 'Shipped').length,
    };
  }
);

// Memoized selector for current filter stats
export const selectCurrentFilterStats = createSelector(
  [selectFilteredOrders],
  (filteredOrders) => {
    return {
      filteredCount: filteredOrders.length,
      filteredRevenue: filteredOrders.reduce((sum, order) => sum + order.amount, 0),
      filteredDelivered: filteredOrders.filter(order => order.status === 'Delivered').length,
      filteredPending: filteredOrders.filter(order => order.status === 'Pending').length,
    };
  }
);

// Export the reducer
export default ordersSlice.reducer;

// Export mock data for use in tests or other components if needed
export { mockOrders };