
// import React, { useState, useEffect } from 'react';
// import { Search, Package, Plus} from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../Cart/cartSlice';
// import ProductCard from './ProductCard';
// import ProductDetails from './ProductDetails';
// import {
//   selectAllProducts,
//   selectFilteredProducts,
//   selectSearchQuery,
//   selectLoading,
//   selectError,
//   setSearchQuery,
//   updateProductStock,
//   selectUsingDummyData,
//   setStoreId
// } from '../../ReduxToolkit/Feature/product/ProductSlice';
// import {
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   getProductsByStore,
//   searchProducts
// } from '../../ReduxToolkit/Feature/product/productThunk';

// const ProductSection = () => {
//   const dispatch = useDispatch();
  
//   // Redux state
//   const products = useSelector(selectAllProducts);
//   const filteredProducts = useSelector(selectFilteredProducts);
//   const reduxSearchQuery = useSelector(selectSearchQuery);
//   const loading = useSelector(selectLoading);
//   const error = useSelector(selectError);
//   const usingDummyData = useSelector(selectUsingDummyData);
  
//   // Local state
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingProductId, setEditingProductId] = useState(null);
//   const [localError, setLocalError] = useState(null);
//   const [storeId, setLocalStoreId] = useState(null);
  
//   // Form state - EXACTLY matching your JSON fields (NO STOCK)
//   const [newProduct, setNewProduct] = useState({
//     name: '',
//     sku: '',
//     description: '',
//     mrp: '',
//     sellingPrice: '',
//     brand: '',
//     color: '',
//     image: '', // Changed from 'img' to 'image' to match your JSON
//     categoryId: '',
//     storeId: ''
//   });

//   const [formErrors, setFormErrors] = useState({});

//   // Fetch products when component mounts
//   useEffect(() => {
//     // Get storeId from localStorage or auth context
//     const userData = JSON.parse(localStorage.getItem('user') || '{}');
//     const userStoreId = userData?.store?.id || 1; // Default to 1 for testing
    
//     if (userStoreId) {
//       setLocalStoreId(userStoreId);
//       dispatch(setStoreId(userStoreId));
//       dispatch(getProductsByStore(userStoreId));
//     }
//   }, [dispatch]);

//   // Handle search with API
//   const handleSearch = (e) => {
//     const query = e.target.value;
//     dispatch(setSearchQuery(query));
    
//     if (query.trim() && storeId) {
//       dispatch(searchProducts({ storeId, keyword: query }));
//     } else if (storeId) {
//       dispatch(getProductsByStore(storeId));
//     }
//   };

//   const handleProductClick = (product) => {
//     // Stock comes from inventory in the response
//     const currentStock = product.inventory?.quantity || 0;
//     if (currentStock <= 0) {
//       alert(`${product.name} is out of stock!`);
//       return;
//     }
//     dispatch(addToCart(product));
//     // Note: updateProductStock will need to handle inventory
//   };

//   const validateForm = () => {
//     const errors = {};
    
//     // Required fields based on your JSON
//     if (!newProduct.name.trim()) errors.name = 'Product name is required';
//     if (!newProduct.sku.trim()) errors.sku = 'SKU is required';
//     if (!newProduct.sellingPrice || parseFloat(newProduct.sellingPrice) <= 0) {
//       errors.sellingPrice = 'Valid selling price is required';
//     }
//     if (!newProduct.mrp || parseFloat(newProduct.mrp) <= 0) {
//       errors.mrp = 'Valid MRP is required';
//     }
//     if (!newProduct.categoryId) {
//       errors.categoryId = 'Category is required';
//     }
//     if (!newProduct.brand.trim()) {
//       errors.brand = 'Brand is required';
//     }
//     if (!newProduct.color.trim()) {
//       errors.color = 'Color is required';
//     }
//     if (!newProduct.image.trim()) {
//       errors.image = 'Image URL is required';
//     }
    
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleAddProduct = async () => {
//     if (!validateForm()) return;

//     try {
//       const userData = JSON.parse(localStorage.getItem('user') || '{}');
//       const userStoreId = userData?.store?.id || storeId;

//       // Product data - EXACTLY matching your JSON structure
//       const productData = {
//         name: newProduct.name.trim(),
//         sku: newProduct.sku.trim(),
//         description: newProduct.description.trim() || null,
//         mrp: parseFloat(newProduct.mrp),
//         sellingPrice: parseFloat(newProduct.sellingPrice),
//         brand: newProduct.brand.trim(),
//         color: newProduct.color.trim(),
//         img: newProduct.image.trim(), // Using 'image' to match JSON
//         categoryId: parseInt(newProduct.categoryId),
//         storeId: parseInt(userStoreId)
//       };

//       console.log('Sending product data to backend:', productData);

//       if (editingProductId) {
//         // UPDATE existing product
//         await dispatch(updateProduct({ 
//           id: editingProductId, 
//           productData 
//         })).unwrap();
//         console.log('Product updated successfully');
//       } else {
//         // CREATE new product
//         await dispatch(createProduct(productData)).unwrap();
//         console.log('Product created successfully');
//       }

//       resetForm();
//       setShowAddModal(false);
      
//       // Refresh products list
//       dispatch(getProductsByStore(userStoreId));
      
//     } catch (err) {
//       console.error('Product operation failed:', err);
//       setLocalError(err.message || 'Operation failed');
//     }
//   };


//   const handleEditProduct = (product) => {
//     setEditingProductId(product.id);
//     setNewProduct({
//       name: product.name || '',
//       sku: product.sku || '',
//       description: product.description || '',
//       mrp: product.mrp || '',
//       sellingPrice: product.sellingPrice || '',
//       brand: product.brand || '',
//       color: product.color || '',
//       image: product.image || product.img || '', // Handle both image and img fields
//       categoryId: product.categoryId || product.category?.id || '',
//       storeId: product.storeId || ''
//     });
//     setShowAddModal(true);
//   };

//   const handleDeleteProduct = async (productId) => {
//     if (!window.confirm('Are you sure you want to delete this product?')) return;

//     try {
//       await dispatch(deleteProduct(productId)).unwrap();
//       console.log('Product deleted successfully');
//       dispatch(getProductsByStore(storeId));
//     } catch (err) {
//       setLocalError('Delete failed');
//     }
//   };

//   const resetForm = () => {
//     setNewProduct({
//       name: '',
//       sku: '',
//       description: '',
//       mrp: '',
//       sellingPrice: '',
//       brand: '',
//       color: '',
//       image: '',
//       categoryId: '',
//       storeId: ''
//     });
//     setEditingProductId(null);
//     setFormErrors({});
//   };

//   const handleInputChange = (field, value) => {
//     setNewProduct(prev => ({ ...prev, [field]: value }));
//     if (formErrors[field]) {
//       setFormErrors(prev => ({ ...prev, [field]: '' }));
//     }
//   };

//   const handleCloseModal = () => {
//     setShowAddModal(false);
//     resetForm();
//   };

//   // Clear local error after 5 seconds
//   useEffect(() => {
//     if (localError) {
//       const timer = setTimeout(() => setLocalError(null), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [localError]);

//   // Determine which products to display
//   const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;



  

//   return (
//     <div className="h-full flex flex-col">
//       {/* Header */}
//       <div className="p-3 border-b border-gray-200 bg-white">
//         <div className="flex justify-between items-center mb-2">
//           <h2 className="text-lg font-semibold text-gray-800">
//             Products {usingDummyData && '(Demo Mode)'}
//           </h2>
//           <button
//             onClick={() => {
//               resetForm();
//               setShowAddModal(true);
//             }}
//             className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//             disabled={loading}
//           >
//             <Plus className="w-3 h-3" />
//             <span className="text-sm font-medium">Add Product</span>
//           </button>
//         </div>
        
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <input
//             type="text"
//             placeholder="Search products by name, SKU or category..."
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//             value={reduxSearchQuery}
//             onChange={handleSearch}
//             disabled={loading}
//           />
//         </div>
        
//         {(error || localError) && (
//           <div className="mt-1 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
//             {error || localError}
//           </div>
//         )}
        
//         <div className="mt-1 text-sm text-gray-500">
//           <span>{displayProducts.length} product{displayProducts.length !== 1 ? 's' : ''} found</span>
//           {loading && <span className="ml-2 text-blue-600">Loading...</span>}
//         </div>
//       </div>

//       {/* Add/Edit Product Modal */}
//       <ProductDetails
//         showModal={showAddModal}
//         onClose={handleCloseModal}
//         onSubmit={handleAddProduct}
//         productData={newProduct}
//         onInputChange={handleInputChange}
//         formErrors={formErrors}
//         loading={loading}
//         editingProductId={editingProductId}
//       />

//       {/* Product Grid */}
//       <div className="flex-1 p-1">
//         {loading && displayProducts.length === 0 ? (
//           <div className="flex flex-col items-center justify-center  text-gray-500">
//             <div className="animate-spin rounded-full h-22 w-22 border-b-2 border-green-600 mb-4"></div>
//             <p className="text-lg">Loading products...</p>
//           </div>
//         ) : displayProducts.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-full text-gray-500">
//             <Package className="w-4 h-4 mb-1" />
//             <p>No products found</p>
//             {reduxSearchQuery && <p className="text-sm mt-1">Try a different search term</p>}
//           </div>
//         ) : (
//           <div
//             className={`grid grid-cols-1 md:grid-cols-3 gap-2 overflow-y-auto ${
//               displayProducts.length > 5 ? 'max-h-[calc(100vh-280px)]' : 'max-h-full'
//             }`}
//           >
//             {displayProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 onEdit={handleEditProduct}
//                 onDelete={handleDeleteProduct}
//                 onClick={handleProductClick}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductSection;






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
  
  // Form state - EXACTLY matching your JSON fields (NO STOCK)
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    description: '',
    mrp: '',
    sellingPrice: '',
    brand: '',
    color: '',
    image: '', // Changed from 'img' to 'image' to match your JSON
    categoryId: '',
    storeId: ''
  });

  const [formErrors, setFormErrors] = useState({});

  // Fetch products when component mounts
  useEffect(() => {
    // Get storeId from localStorage or auth context
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const userStoreId = userData?.store?.id || 1; // Default to 1 for testing
    
    if (userStoreId) {
      setLocalStoreId(userStoreId);
      dispatch(setStoreId(userStoreId));
      dispatch(getProductsByStore(userStoreId));
    }
  }, [dispatch]);

  // Handle search with API
  const handleSearch = (e) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query));
    
    if (query.trim() && storeId) {
      dispatch(searchProducts({ storeId, keyword: query }));
    } else if (storeId) {
      dispatch(getProductsByStore(storeId));
    }
  };

  const handleProductClick = (product) => {
    // Stock comes from inventory in the response
    const currentStock = product.inventory?.quantity || 0;
    if (currentStock <= 0) {
      alert(`${product.name} is out of stock!`);
      return;
    }
    dispatch(addToCart(product));
    // Note: updateProductStock will need to handle inventory
  };

  const validateForm = () => {
    const errors = {};
    
    // Required fields based on your JSON
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
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddProduct = async () => {
    if (!validateForm()) return;

    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const userStoreId = userData?.store?.id || storeId;

      // Product data - EXACTLY matching your JSON structure
      const productData = {
        name: newProduct.name.trim(),
        sku: newProduct.sku.trim(),
        description: newProduct.description.trim() || null,
        mrp: parseFloat(newProduct.mrp),
        sellingPrice: parseFloat(newProduct.sellingPrice),
        brand: newProduct.brand.trim(),
        color: newProduct.color.trim(),
        img: newProduct.image.trim(), // Using 'image' to match JSON
        categoryId: parseInt(newProduct.categoryId),
        storeId: parseInt(userStoreId)
      };

      console.log('Sending product data to backend:', productData);

      if (editingProductId) {
        // UPDATE existing product
        await dispatch(updateProduct({ 
          id: editingProductId, 
          productData 
        })).unwrap();
        console.log('Product updated successfully');
      } else {
        // CREATE new product
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
      image: product.image || product.img || '', // Handle both image and img fields
      categoryId: product.categoryId || product.category?.id || '',
      storeId: product.storeId || ''
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
      storeId: ''
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
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search products by name, SKU or category..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={reduxSearchQuery}
            onChange={handleSearch}
            disabled={loading}
          />
        </div>
        
        {(error || localError) && (
          <div className="mt-1 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error || localError}
          </div>
        )}
        
        <div className="mt-1 text-sm text-gray-500">
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
          <div className="flex flex-col items-center justify-center  text-gray-500">
            <div className="animate-spin rounded-full h-22 w-22 border-b-2 border-green-600 mb-4"></div>
            <p className="text-lg">Loading products...</p>
          </div>
        ) : displayProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Package className="w-4 h-4 mb-1" />
            <p>No products found</p>
            {reduxSearchQuery && <p className="text-sm mt-1">Try a different search term</p>}
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