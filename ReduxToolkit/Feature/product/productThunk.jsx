
// src/features/products/productThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../Utils/API";

// Helper function to get JWT token
const getAuthToken = () => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    throw new Error('No JWT token found');
  }
  return token;
};

// Helper function to set auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// ===== ADD THIS MISSING FUNCTION =====
// Get product by ID
export const getProductById = createAsyncThunk(
  "product/getById",
  async (id, { rejectWithValue }) => {
    try {
      console.log('Fetching product by ID...', { productId: id });
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/product/${id}`, { headers });
      
      console.log('Product fetched successfully:', res.data);
      
      return res.data;
    } catch (err) {
      console.error('Failed to fetch product:', {
        productId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

// Create product
export const createProduct = createAsyncThunk(
  "product/create",
  async (productData, { rejectWithValue }) => {
    try {
      console.log('Creating product...', { productData });
      
      const headers = getAuthHeaders();
      const res = await api.post("/api/product/create", productData, { headers });
      
      console.log('Product created successfully:', res.data);
      return res.data;
    } catch (err) {
      // THIS WILL SHOW THE ACTUAL ERROR FROM BACKEND
      console.error('❌ BACKEND ERROR - FULL DETAILS:', {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,        // ← THIS IS CRITICAL - shows actual error
        message: err.message,
        config: {
          url: err.config?.url,
          method: err.config?.method,
          data: err.config?.data
        }
      });
      
      if (err.response?.data) {
        console.error('Error message from backend:', JSON.stringify(err.response.data));
      }
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to create product"
      );
    }
  }
);

// Get products by store
export const getProductsByStore = createAsyncThunk(
  "product/getByStore",
  async (storeId, { rejectWithValue }) => {
    try {
      console.log('Fetching products by store...', { storeId });
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/product/getStore/${storeId}`, { headers });
      
      console.log('Products fetched successfully:', {
        storeId,
        productCount: res.data.length,
      });
      
      return res.data;
    } catch (err) {
      console.error('Failed to fetch products by store:', {
        storeId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      console.log('Updating product...', { productId: id, productData });
      
      const headers = getAuthHeaders();
      const res = await api.patch(`/api/product/update/${id}`, productData, { headers });
      
      console.log('Product updated successfully:', res.data);
      return res.data;
    } catch (err) {
      console.error('Failed to update product:', {
        productId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        requestData: productData
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to update product"
      );
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue }) => {
    try {
      console.log('Deleting product...', { productId: id });
      
      const headers = getAuthHeaders();
      const res = await api.delete(`/api/product/${id}`, { headers });
      
      console.log('Product deleted successfully:', { 
        productId: id,
        message: res.data?.message 
      }); 
      return { id, message: res.data?.message };
    } catch (err) {
      console.error('Failed to delete product:', {
        productId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

// Search products
export const searchProducts = createAsyncThunk(
  "product/search",
  async ({ storeId, keyword }, { rejectWithValue }) => {
    try {
      console.log('Searching products...', { storeId, keyword });
      
      const headers = getAuthHeaders();
      const res = await api.get(
        `/api/product/searchStore/${storeId}/Search?Keyword=${encodeURIComponent(keyword)}`, 
        { headers }
      );
      console.log('Product search completed:', {
        keyword,
        storeId,
        resultCount: res.data.length,
      });      
      return res.data;
    } catch (err) {
      console.error('Product search failed:', {
        keyword,
        storeId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || "Search failed");
    }
  }
);