

import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const ProductCard = ({ product, onEdit, onDelete, onClick }) => {
  
  // Helper function to get category name (since category might be an object or string)
  const getCategoryName = () => {
    if (!product.category) return 'Uncategorized';
    if (typeof product.category === 'object') {
      return product.category.name || 'Uncategorized';
    }
    return product.category;
  };

  // Helper function to get image URL (using 'image' field as primary)
  const getImageUrl = () => {
    return product.image || product.img || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop';
  };

  // Helper function to get stock from inventory
  // const getStock = () => {
  //   return product.inventory?.quantity || 0;
  // };


  const getStock = () => {
  return product.quantity || 0;
};

  return (
    <div
      className="bg-white border border-gray-600 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer group relative"
      onClick={() => onClick(product)}
    >
      {/* Edit/Delete Buttons */}
      <div className="absolute top-1 right-6 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(product);
          }}
          className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          title="Edit Product"
        >
          <Edit className="w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(product.id);
          }}
          className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
          title="Delete Product"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
      
      {/* Product Image - Using 'image' field */}
      <div className="h-55   overflow-hidden">
        <img
          src={getImageUrl()}
          alt={product.name || 'Product'}
          className="w-full h-full object-cover group-hover:scale-90 transition-transform duration-200"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop';
          }}
        />
      </div>
      
      {/* Product Info */}
      <div className="p-1">
        <h3 className="font-medium text-gray-900 truncate" title={product.name}>
          {product.name || 'Unnamed Product'}
        </h3>
      

      
        
        <div className="flex justify-between items-center mt-1">
          <span className="text-lg font-bold text-green-600">
            ₹{Number(product.sellingPrice || product.price || 10).toFixed(2)}
          </span>

          {/* Stock from inventory */}
          <span className="text-sm text-gray-500">
            quantity: {getStock()}
          </span>
        </div>
        
        {/* MRP display if different from selling price */}
        {product.mrp && Number(product.mrp) !== Number(product.sellingPrice) && (
          <div className="text-xs text-gray-500 line-through mt-1">
            MRP: ₹{Number(product.mrp).toFixed(1)}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default ProductCard;