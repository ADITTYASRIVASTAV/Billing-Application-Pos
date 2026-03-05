
import { createSlice } from '@reduxjs/toolkit';
import {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByStore,
  searchProducts
} from './productThunk';

// ONLY ONE source of truth for products
const dummyProducts = [
  {
    id: 1,
    name: 'Premium Coffee Blend',
    sku: 'PC-001',
    category: 'Beverages',
    price: 299,
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=300',
    quantity: 50,
    description: '',
    mrp: 299,
    sellingPrice: 299,
    brand: 'CoffeeCo',
    color: 'Brown',
    store: 'Main Store',
    storeId: 1
  },
  {
    id: 2,
    name: 'Artisan Bread',
    sku: 'AB-002',
    category: 'Bakery',
    price: 189,
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=300',
    quantity: 50,
    description: '',
    mrp: 189,
    sellingPrice: 189,
    brand: 'BakeryFresh',
    color: 'Brown',
    store: 'Main Store',
    storeId: 1
  },
  {
    id: 3,
    name: 'Organic Tea Pack',
    sku: 'OT-003',
    category: 'Beverages',
    price: 249,
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=300',
    quantity: 50,
    description: '',
    mrp: 249,
    sellingPrice: 249,
    brand: 'TeaHaven',
    color: 'Green',
    store: 'Main Store',
    storeId: 1
  }
];

const initialState = {
  // Product data - SINGLE SOURCE
  products: dummyProducts,
  product: null,
  searchResults: [],
  
  // Search functionality
  searchQuery: '',
  filteredProducts: [],
  
  // UI states
  loading: false,
  error: null,
  
  // Store info
  storeId: null,
  usingDummyData: true,
};

// Helper function to normalize product data from API
const normalizeProduct = (product) => {
  return {
    id: product.id,
    name: product.name || '',
    sku: product.sku || '',
    // Handle category - could be string, object, or null
    category: product.category?.name || product.category || 'Uncategorized',
    price: product.sellingPrice || product.price || 0,
    image: product.img || product.image || '',
      quantity: product.quantity || 0,  // FIXED: using quantity from backend
    quantity: product.quantity || 0,
    description: product.description || '',
    mrp: product.mrp || 0,
    sellingPrice: product.sellingPrice || 0,
    brand: product.brand || '',
    color: product.color || '',
    store: product.store || '',
    storeId: product.storeId || null
  };
};


const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Search actions
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredProducts = state.products.filter(product =>
        product.name.toLowerCase().includes(action.payload.toLowerCase()) ||
        product.sku.toLowerCase().includes(action.payload.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(action.payload.toLowerCase()))
      );
    },

    // Stock management
    // updateProductStock: (state, action) => {
    //   const { id, quantity } = action.payload;
    //   const product = state.products.find(p => p.id === id);
    //   if (product) {
    //     product.stock -= quantity;
    //   }
    // },


    
        // FIXED: Stock management
    updateProductStock: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.products.find(p => p.id === id);
      if (product) {
        product.quantity = Math.max(0, product.quantity - quantity);
      }
      
      // Update filtered products if search is active
      if (state.searchQuery && state.filteredProducts.length > 0) {
        state.filteredProducts = state.filteredProducts.map(p => 
          p.id === id ? { ...p, quantity: Math.max(0, p.quantity - quantity) } : p
        );
      }
    },

    // restoreProductStock: (state, action) => {
    //   const { id, quantity } = action.payload;
    //   const product = state.products.find(p => p.id === id);
    //   if (product && product.quantity >= quantity) {
    //     product.stock += quantity;
    //   }
    // },


        restoreProductStock: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.products.find(p => p.id === id);
      if (product) {
        product.quantity += quantity;
      }
      
      if (state.searchQuery && state.filteredProducts.length > 0) {
        state.filteredProducts = state.filteredProducts.map(p => 
          p.id === id ? { ...p, quantity: p.quantity + quantity } : p
        );
      }
    },

    // Local CRUD operations (for immediate UI update)
    addProductLocally: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: state.products.length > 0 
          ? Math.max(...state.products.map(p => p.id)) + 1 
          : 1,
        price: action.payload.sellingPrice || action.payload.price,
        image: action.payload.img || action.payload.image,
         quantity: action.payload.quantity || 0,
        category: action.payload.category || 'Uncategorized'
      };
      state.products.push(newProduct);
      
      // Update filtered products if search is active
      if (state.searchQuery) {
        state.filteredProducts = state.products.filter(product =>
          product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.sku.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          (product.category && product.category.toLowerCase().includes(state.searchQuery.toLowerCase()))
        );
      }
    },

    updateProductLocally: (state, action) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = {
          ...action.payload,
          price: action.payload.sellingPrice || action.payload.price,
          image: action.payload.img || action.payload.image,
          category: action.payload.category || state.products[index].category
        };
      }
      
      // Update filtered products if search is active
      if (state.searchQuery) {
        state.filteredProducts = state.products.filter(product =>
          product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.sku.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          (product.category && product.category.toLowerCase().includes(state.searchQuery.toLowerCase()))
        );
      }
    },

    deleteProductLocally: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      
      // Update filtered products if search is active
      if (state.searchQuery) {
        state.filteredProducts = state.products.filter(product =>
          product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.sku.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          (product.category && product.category.toLowerCase().includes(state.searchQuery.toLowerCase()))
        );
      }
    },

    // State management actions
    clearProductState: (state) => {
      state.product = null;
      state.products = dummyProducts;
      state.searchResults = [];
      state.error = null;
      state.usingDummyData = true;
      state.searchQuery = '';
      state.filteredProducts = [];
    },

    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = '';
      state.filteredProducts = [];
    },

    setStoreId: (state, action) => {
      state.storeId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Normalize the product before adding to state
        const normalizedProduct = normalizeProduct(action.payload);
        state.products.push(normalizedProduct);
        state.usingDummyData = false;
        
        // Update filtered products if search is active
        if (state.searchQuery) {
          state.filteredProducts = state.products.filter(product =>
            product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            (product.category && product.category.toLowerCase().includes(state.searchQuery.toLowerCase()))
          );
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Product by ID
      .addCase(getProductById.fulfilled, (state, action) => {
        state.product = normalizeProduct(action.payload);
      })
      
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const normalizedProduct = normalizeProduct(action.payload);
        const index = state.products.findIndex((p) => p.id === normalizedProduct.id);
        if (index !== -1) {
          state.products[index] = normalizedProduct;
        }
        
        // Update filtered products if search is active
        if (state.searchQuery) {
          state.filteredProducts = state.products.filter(product =>
            product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            (product.category && product.category.toLowerCase().includes(state.searchQuery.toLowerCase()))
          );
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((p) => p.id !== action.payload.id);
        
        // Update filtered products if search is active
        if (state.searchQuery) {
          state.filteredProducts = state.products.filter(product =>
            product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            (product.category && product.category.toLowerCase().includes(state.searchQuery.toLowerCase()))
          );
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Products by Store - THIS IS THE KEY FIX
      .addCase(getProductsByStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByStore.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.length > 0) {
          // NORMALIZE ALL PRODUCTS FROM API
          state.products = action.payload.map(item => normalizeProduct(item));
          state.usingDummyData = false;
        } else {
          state.products = dummyProducts;
          state.usingDummyData = true;
        }
        
        // Update filtered products if search is active
        if (state.searchQuery) {
          state.filteredProducts = state.products.filter(product =>
            product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            (product.category && product.category.toLowerCase().includes(state.searchQuery.toLowerCase()))
          );
        }
      })
      .addCase(getProductsByStore.rejected, (state, action) => {
        state.loading = false;
        state.products = dummyProducts;
        state.usingDummyData = true;
        state.error = action.payload;
      })
      
      // Search Products
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        // Normalize search results
        state.searchResults = action.payload.map(item => normalizeProduct(item));
      })
      .addCase(searchProducts.rejected, (state) => {
        state.loading = false;
        state.searchResults = [];
      });
  },
});

// Selectors
export const selectAllProducts = (state) => state.product.products;
export const selectProductById = (state, productId) =>
  state.product.products.find(product => product.id === productId);
export const selectFilteredProducts = (state) => 
  state.product.searchQuery ? state.product.filteredProducts : state.product.products;
export const selectSearchQuery = (state) => state.product.searchQuery;
export const selectProduct = (state) => state.product.product;
export const selectSearchResults = (state) => state.product.searchResults;
export const selectLoading = (state) => state.product.loading;
export const selectError = (state) => state.product.error;
export const selectUsingDummyData = (state) => state.product.usingDummyData;

export const { 
  setSearchQuery,
  updateProductStock,
  restoreProductStock,
  addProductLocally,
  updateProductLocally,
  deleteProductLocally,
  clearProductState,
  clearSearchResults,
  setStoreId
} = productSlice.actions;

export default productSlice.reducer;


