import React from 'react';
import { Search, ShoppingCart, FileText, Plus, RefreshCw } from 'lucide-react';

const ProductTable = ({ products, onAddProduct, onRefresh }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Product Management</h1>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Search
        </button>
      </div>

      <hr className="my-4 border-gray-300" />

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Image</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Product</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Category</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Price</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Stock</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Image</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {product.category}
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold text-gray-800">
                  $ {product.price}
                </td>
                <td className="py-4 px-4">
                  <ShoppingCart className="w-5 h-5 text-gray-600" />
                </td>
                <td className="py-4 px-4">
                  <FileText className="w-5 h-5 text-gray-600" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={onAddProduct}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </button>
        <button
          onClick={onRefresh}
          className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Refresh
        </button>
      </div>
    </div>
  );
};

export default ProductTable;