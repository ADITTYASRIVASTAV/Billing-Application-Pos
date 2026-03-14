
import React from 'react';
import { X } from 'lucide-react';

const ProductDetails = ({
  showModal,
  onClose,
  onSubmit,
  productData,
  onInputChange,
  formErrors,
  loading,
  editingProductId
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">
            {editingProductId ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={loading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Modal Body - Form */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={productData.name || ''}
                  onChange={(e) => onInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    formErrors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter product name"
                  disabled={loading}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                )}
              </div>

              {/* SKU */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU *
                </label>
                <input
                  type="text"
                  value={productData.sku || ''}
                  onChange={(e) => onInputChange('sku', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    formErrors.sku ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., SHRT-M-COTTON-BLU-2025"
                  disabled={loading}
                />
                {formErrors.sku && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.sku}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={productData.description || ''}
                  onChange={(e) => onInputChange('description', e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter product description"
                  disabled={loading}
                />
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand *
                </label>
                <input
                  type="text"
                  value={productData.brand || ''}
                  onChange={(e) => onInputChange('brand', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    formErrors.brand ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter brand name"
                  disabled={loading}
                />
                {formErrors.brand && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.brand}</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space--4">
              {/* MRP */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  MRP *
                </label>
                <input
                  type="number"
                  value={productData.mrp || ''}
                  onChange={(e) => onInputChange('mrp', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    formErrors.mrp ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter MRP"
                  disabled={loading}
                />
                {formErrors.mrp && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.mrp}</p>
                )}
              </div>

              {/* Selling Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selling Price *
                </label>
                <input
                  type="number"
                  value={productData.sellingPrice || ''}
                  onChange={(e) => onInputChange('sellingPrice', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    formErrors.sellingPrice ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter selling price"
                  disabled={loading}
                />
                {formErrors.sellingPrice && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.sellingPrice}</p>
                )}
              </div>

              {/* QUANTITY FIELD - ADDED FOR STOCK */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity (Stock) *
                </label>
                <input
                  type="number"
                  value={productData.quantity || ''}
                  onChange={(e) => onInputChange('quantity', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    formErrors.quantity ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter product quantity"
                  min="0"
                  step="1"
                  disabled={loading}
                />
                {formErrors.quantity && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.quantity}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Number of items available in stock
                </p>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color *
                </label>
                <input
                  type="text"
                  value={productData.color || ''}
                  onChange={(e) => onInputChange('color', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    formErrors.color ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter color"
                  disabled={loading}
                />
                {formErrors.color && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.color}</p>
                )}
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL *
                </label>
                <input
                  type="text"
                  value={productData.image || ''}
                  onChange={(e) => onInputChange('image', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    formErrors.image ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter the image"
                  disabled={loading}
                />
                {formErrors.image && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.image}</p>
                )}
                {productData.image && (
                  <div className="mt-2">
                    <div className="text-xs text-gray-500 mb-1">Preview:</div>
                    <div className="h-20 w-20 border rounded overflow-hidden">
                      <img 
                        src={productData.image} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Category ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category ID *
                </label>
                <input
                  type="number"
                  value={productData.categoryId || ''}
                  onChange={(e) => onInputChange('categoryId', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    formErrors.categoryId ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter category ID"
                  min="1"
                  disabled={loading}
                />
                {formErrors.categoryId && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.categoryId}</p>
                )}
              </div>

              {/* Store ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Store ID *
                </label>
                <input
                  type="number"
                  value={productData.storeId || ''}
                  onChange={(e) => onInputChange('storeId', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    formErrors.storeId ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter store ID"
                  min="1"
                  disabled={loading}
                />
                {formErrors.storeId && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.storeId}</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : editingProductId ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

