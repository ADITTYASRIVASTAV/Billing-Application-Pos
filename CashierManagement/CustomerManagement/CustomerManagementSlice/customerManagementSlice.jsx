import { createSlice } from '@reduxjs/toolkit';

// Mock data for customers with proper purchase history
const initialCustomers = [
  {
    id: '1',
    fullName: 'John Doe',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@example.com',
    loyaltyPoints: 1250,
    joinDate: '2023-01-15',
    totalOrders: 15,
    totalSpent: 4250.75,
    averageOrderValue: 283.38,
    purchaseHistory: [
      {
        orderId: 'ORD-001',
        date: '2024-01-15',
        time: '14:30',
        totalAmount: 299.99,
        items: [
          { id: 1, name: 'Wireless Headphones', quantity: 1, price: 199.99 },
          { id: 2, name: 'Screen Protector', quantity: 2, price: 50.00 }
        ],
        status: 'completed'
      },
      {
        orderId: 'ORD-002',
        date: '2024-01-10',
        time: '11:15',
        totalAmount: 450.50,
        items: [
          { id: 1, name: 'Smart Watch', quantity: 1, price: 350.00 },
          { id: 2, name: 'Charging Cable', quantity: 3, price: 33.50 }
        ],
        status: 'completed'
      }
    ]
  },
  {
    id: '2',
    fullName: 'Jane Smith',
    phone: '+1 (555) 987-6543',
    email: 'jane.smith@example.com',
    loyaltyPoints: 850,
    joinDate: '2023-03-22',
    totalOrders: 8,
    totalSpent: 1850.25,
    averageOrderValue: 231.28,
    purchaseHistory: [
      {
        orderId: 'ORD-003',
        date: '2024-01-12',
        time: '16:45',
        totalAmount: 150.75,
        items: [
          { id: 1, name: 'Phone Case', quantity: 1, price: 45.75 },
          { id: 2, name: 'Ear Buds', quantity: 1, price: 105.00 }
        ],
        status: 'completed'
      }
    ]
  },

];

const initialState = {
  customers: initialCustomers,
  selectedCustomer: initialCustomers[0], // Auto-select first customer for testing
  searchQuery: '',
  filteredCustomers: initialCustomers,
  isLoading: false,
  error: null
};

const customerManagementSlice = createSlice({
  name: 'customerManagement',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      const query = action.payload.toLowerCase();
      
      if (!query.trim()) {
        state.filteredCustomers = state.customers;
      } else {
        state.filteredCustomers = state.customers.filter(customer =>
          customer.fullName.toLowerCase().includes(query) ||
          customer.phone.toLowerCase().includes(query) ||
          customer.email.toLowerCase().includes(query)
        );
      }
    },
    addCustomer: (state, action) => {
      const newCustomer = {
        ...action.payload,
        id: Date.now().toString(),
        loyaltyPoints: 0,
        totalOrders: 0,
        totalSpent: 0,
        averageOrderValue: 0,
        purchaseHistory: [],
        joinDate: new Date().toISOString().split('T')[0]
      };
      state.customers.unshift(newCustomer);
      state.filteredCustomers.unshift(newCustomer);
    },
    updateCustomer: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.customers.findIndex(c => c.id === id);
      if (index !== -1) {
        state.customers[index] = { ...state.customers[index], ...updates };
        state.filteredCustomers = state.filteredCustomers.map(c =>
          c.id === id ? { ...c, ...updates } : c
        );
        
        if (state.selectedCustomer?.id === id) {
          state.selectedCustomer = { ...state.selectedCustomer, ...updates };
        }
      }
    },
    addPoints: (state, action) => {
      const { customerId, points } = action.payload;
      const customer = state.customers.find(c => c.id === customerId);
      if (customer) {
        customer.loyaltyPoints += points;
        
        if (state.selectedCustomer?.id === customerId) {
          state.selectedCustomer.loyaltyPoints += points;
        }
      }
    },
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
    },
    addPurchase: (state, action) => {
      const { customerId, order } = action.payload;
      const customer = state.customers.find(c => c.id === customerId);
      if (customer) {
        // Add order to purchase history
        customer.purchaseHistory.unshift(order);
        
        // Update customer stats
        customer.totalOrders += 1;
        customer.totalSpent += order.totalAmount;
        customer.averageOrderValue = customer.totalSpent / customer.totalOrders;
        
        // Update selected customer if it's the same
        if (state.selectedCustomer?.id === customerId) {
          state.selectedCustomer.purchaseHistory.unshift(order);
          state.selectedCustomer.totalOrders += 1;
          state.selectedCustomer.totalSpent += order.totalAmount;
          state.selectedCustomer.averageOrderValue = state.selectedCustomer.totalSpent / state.selectedCustomer.totalOrders;
        }
      }
    }
  }
});

export const {
  setSelectedCustomer,
  setSearchQuery,
  addCustomer,
  updateCustomer,
  addPoints,
  clearSelectedCustomer,
  addPurchase
} = customerManagementSlice.actions;

export default customerManagementSlice.reducer;