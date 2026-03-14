import React, { useState, useEffect } from 'react';
import { Search, Package, Plus} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Cart/cartSlice';
import ProductCard from './ProductCard';
import ProductDetails from './ProductDetails';
import {
  selectAllProducts,
  selectFilteredProducts,
  selectSearchQuery,
  selectLoading,
  selectError,
  setSearchQuery,
  updateProductStock,
  selectUsingDummyData,
  setStoreId
} from '../../ReduxToolkit/Feature/product/ProductSlice';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByStore,
  searchProducts
} from '../../ReduxToolkit/Feature/product/productThunk';

const ProductSection = () => {
  const dispatch = useDispatch();
  
  // Redux state
  const products = useSelector(selectAllProducts);
  const filteredProducts = useSelector(selectFilteredProducts);
  const reduxSearchQuery = useSelector(selectSearchQuery);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const usingDummyData = useSelector(selectUsingDummyData);
  
  // Local state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [localError, setLocalError] = useState(null);
  const [storeId, setLocalStoreId] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchInput, setSearchInput] = useState(''); // Local input state
  
  // Form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    description: '',
    mrp: '',
    sellingPrice: '',
    brand: '',
    color: '',
    image: '',
    categoryId: '',
    storeId: '',
    quantity: ''
  });

  const [formErrors, setFormErrors] = useState({});

  // Fetch products when component mounts
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const userStoreId = userData?.store?.id || 1;
    
    if (userStoreId) {
      setLocalStoreId(userStoreId);
      dispatch(setStoreId(userStoreId));
      dispatch(getProductsByStore(userStoreId));
    }
  }, [dispatch]);

  // ✅ FIXED: Handle search input - ONLY updates local state, NOT Redux
  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchInput(query); // Update local state only
    // Don't update Redux search query yet
    // Don't call API yet
  };

  // ✅ NEW: Handle search button click
  const handleSearch = () => {
    if (!storeId) {
      setLocalError('Store ID not found');
      return;
    }

    console.log('🔍 Performing search for:', searchInput);
    setIsSearching(true);
    
    // Update Redux search query
    dispatch(setSearchQuery(searchInput));
    
    if (searchInput && searchInput.trim() !== '') {
      // Call search API
      dispatch(searchProducts({ 
        storeId, 
        keyword: searchInput.trim() 
      }))
        .unwrap()
        .then((result) => {
          console.log('✅ Search completed. Results:', result?.length || 0);
          setIsSearching(false);
        })
        .catch((err) => {
          console.error('❌ Search failed:', err);
          setLocalError(err.message || 'Search failed');
          setIsSearching(false);
        });
    } else {
      // If search is empty, fetch all products
      dispatch(getProductsByStore(storeId))
        .unwrap()
        .then(() => {
          setIsSearching(false);
        })
        .catch((err) => {
          console.error('❌ Fetch failed:', err);
          setLocalError(err.message || 'Failed to fetch products');
          setIsSearching(false);
        });
    }
  };

  // ✅ NEW: Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // ✅ NEW: Clear search
  const handleClearSearch = () => {
    setSearchInput('');
    dispatch(setSearchQuery(''));
    if (storeId) {
      setIsSearching(true);
      dispatch(getProductsByStore(storeId))
        .unwrap()
        .finally(() => setIsSearching(false));
    }
  };

  const handleProductClick = (product) => {
    const currentStock = product.quantity || 0;

    if (currentStock <= 0) {
      alert(`${product.name} is out of stock!`);
      return;
    }

    dispatch(addToCart(product));
    dispatch(updateProductStock({ 
      id: product.id, 
      quantity: 1 
    }));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!newProduct.name.trim()) errors.name = 'Product name is required';
    if (!newProduct.sku.trim()) errors.sku = 'SKU is required';
    if (!newProduct.sellingPrice || parseFloat(newProduct.sellingPrice) <= 0) {
      errors.sellingPrice = 'Valid selling price is required';
    }
    if (!newProduct.mrp || parseFloat(newProduct.mrp) <= 0) {
      errors.mrp = 'Valid MRP is required';
    }
    if (!newProduct.categoryId) {
      errors.categoryId = 'Category is required';
    }
    if (!newProduct.brand.trim()) {
      errors.brand = 'Brand is required';
    }
    if (!newProduct.color.trim()) {
      errors.color = 'Color is required';
    }
    if (!newProduct.image.trim()) {
      errors.image = 'Image URL is required';
    }

    if (!editingProductId) {
      if (!newProduct.quantity || parseInt(newProduct.quantity) < 0) {
        errors.quantity = 'Valid quantity is required';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddProduct = async () => {
    if (!validateForm()) return;

    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const userStoreId = userData?.store?.id || storeId;

      const productData = {
        name: newProduct.name.trim(),
        sku: newProduct.sku.trim(),
        description: newProduct.description.trim() || null,
        mrp: parseFloat(newProduct.mrp),
        sellingPrice: parseFloat(newProduct.sellingPrice),
        brand: newProduct.brand.trim(),
        color: newProduct.color.trim(),
        img: newProduct.image.trim(),
        categoryId: parseInt(newProduct.categoryId),
        storeId: parseInt(userStoreId),
        quantity: newProduct.quantity ? parseInt(newProduct.quantity) : 0
      };

      console.log('Sending product data to backend:', productData);

      if (editingProductId) {
        await dispatch(updateProduct({ 
          id: editingProductId, 
          productData 
        })).unwrap();
        console.log('Product updated successfully');
      } else {
        await dispatch(createProduct(productData)).unwrap();
        console.log('Product created successfully');
      }

      resetForm();
      setShowAddModal(false);
      
      // Refresh products list
      dispatch(getProductsByStore(userStoreId));
      
    } catch (err) {
      console.error('Product operation failed:', err);
      setLocalError(err.message || 'Operation failed');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProductId(product.id);
    setNewProduct({
      name: product.name || '',
      sku: product.sku || '',
      description: product.description || '',
      mrp: product.mrp || '',
      sellingPrice: product.sellingPrice || '',
      brand: product.brand || '',
      color: product.color || '',
      image: product.image || product.img || '',
      categoryId: product.categoryId || product.category?.id || '',
      storeId: product.storeId || '',
      quantity: product.quantity || ''
    });
    setShowAddModal(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await dispatch(deleteProduct(productId)).unwrap();
      console.log('Product deleted successfully');
      dispatch(getProductsByStore(storeId));
    } catch (err) {
      setLocalError('Delete failed');
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: '',
      sku: '',
      description: '',
      mrp: '',
      sellingPrice: '',
      brand: '',
      color: '',
      image: '',
      categoryId: '',
      storeId: '',
      quantity: ''
    });
    setEditingProductId(null);
    setFormErrors({});
  };

  const handleInputChange = (field, value) => {
    setNewProduct(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    resetForm();
  };

  // Clear local error after 5 seconds
  useEffect(() => {
    if (localError) {
      const timer = setTimeout(() => setLocalError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [localError]);

  // Determine which products to display
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-gray-200 bg-white">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            Products {usingDummyData && '(Demo Mode)'}
          </h2>
          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            disabled={loading}
          >
            <Plus className="w-3 h-3" />
            <span className="text-sm font-medium">Add Product</span>
          </button>
        </div>
        
        {/* ✅ FIXED: Search bar with button */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Type product name and click Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchInput}
              onChange={handleSearchInput}
              onKeyPress={handleKeyPress}
              disabled={loading || isSearching}
            />
          </div>
          
          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={loading || isSearching}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
                     transition-colors flex items-center gap-2 disabled:opacity-50 
                     min-w-[100px] justify-center"
          >
            {isSearching ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Searching</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Search</span>
              </>
            )}
          </button>

          {/* Clear Search Button - Show only when search is active */}
          {reduxSearchQuery && (
            <button
              onClick={handleClearSearch}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 
                       transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        
        {/* Show current search term if any */}
        {reduxSearchQuery && (
          <div className="mt-2 text-sm text-gray-600">
            Currently searching for: "<span className="font-semibold">{reduxSearchQuery}</span>"
          </div>
        )}
        
        {(error || localError) && (
          <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error || localError}
          </div>
        )}
        
        <div className="mt-2 text-sm text-gray-500">
          <span>{displayProducts.length} product{displayProducts.length !== 1 ? 's' : ''} found</span>
          {loading && <span className="ml-2 text-blue-600">Loading...</span>}
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      <ProductDetails
        showModal={showAddModal}
        onClose={handleCloseModal}
        onSubmit={handleAddProduct}
        productData={newProduct}
        onInputChange={handleInputChange}
        formErrors={formErrors}
        loading={loading}
        editingProductId={editingProductId}
      />

      {/* Product Grid */}
      <div className="flex-1 p-1">
        {loading && displayProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500">
            <div className="animate-spin rounded-full h-22 w-22 border-b-2 border-green-600 mb-4"></div>
            <p className="text-lg">Loading products...</p>
          </div>
        ) : displayProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Package className="w-4 h-4 mb-1" />
            <p>No products found</p>
            {reduxSearchQuery && (
              <p className="text-sm mt-1">
                No results for "<span className="font-semibold">{reduxSearchQuery}</span>"
              </p>
            )}
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-2 overflow-y-auto ${
              displayProducts.length > 5 ? 'max-h-[calc(100vh-280px)]' : 'max-h-full'
            }`}
          >
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onClick={handleProductClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSection;

