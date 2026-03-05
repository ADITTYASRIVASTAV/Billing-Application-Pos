// src/features/cart/CartSection.jsx
import React from 'react';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  removeFromCart,
  updateQuantity,
  clearCart,
  holdCart,
  selectSubtotal,
  selectTax,
  selectDiscountAmount,
  selectTotal,
} from './cartSlice';
import { updateProductStock, restoreProductStock } from '../../ReduxToolkit/Feature/product/ProductSlice';

const CartSection = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectSubtotal);
  const tax = useSelector(selectTax);
  const discount = useSelector(selectDiscountAmount);
  const total = useSelector(selectTotal);

  const handleQuantityChange = (id, newQuantity) => {
    const item = cartItems.find(item => item.id === id);
    if (item && newQuantity >= 1 && newQuantity <= item.availableStock) {
      const oldQuantity = item.cartQuantity;
      const quantityDiff = newQuantity - oldQuantity;
      
      // Update cart quantity
      dispatch(updateQuantity({ id, quantity: newQuantity }));
      
      // Update product stock based on quantity difference
      if (quantityDiff > 0) {
        // Increasing quantity: decrease product stock
        dispatch(updateProductStock({ id, quantity: quantityDiff }));
      } else if (quantityDiff < 0) {
        // Decreasing quantity: increase product stock
        dispatch(restoreProductStock({ id, quantity: Math.abs(quantityDiff) }));
      }
    }
  };

  const handleRemoveItem = (id) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      // Restore the full cart quantity to product stock
      dispatch(restoreProductStock({ id, quantity: item.cartQuantity }));
      dispatch(removeFromCart(id));
    }
  };

  const handleClearCart = () => {
    // Restore stock for all items when clearing cart
    cartItems.forEach(item => {
      dispatch(restoreProductStock({ id: item.id, quantity: item.cartQuantity }));
    });
    dispatch(clearCart());
  };

  const handleHoldCart = () => {
    dispatch(holdCart());
    alert('Cart held successfully!');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Current Order</h3>
          <div className="flex space-x-2">
            <button
              onClick={handleHoldCart}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Hold Cart
            </button>
            <button
              onClick={handleClearCart}
              className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <ShoppingCart className="w-12 h-12 mb-4" />
            <p>Your cart is empty</p>
            <p className="text-sm mt-2">Add products from the left panel</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.sku}</p>
                        {/* Show available stock */}
                        {/* <p className="text-xs text-gray-400 mt-1">
                          Available: {item.availableStock}
                        </p> */}
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.cartQuantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                          disabled={item.cartQuantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.cartQuantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.cartQuantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                          disabled={item.cartQuantity >= item.availableStock}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          ₹{(item.price || item.sellingPrice) * item.cartQuantity}
                        </div>
                        <div className="text-sm text-gray-500">
                          ₹{item.price || item.sellingPrice} × {item.cartQuantity}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-900 p-1 space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Subtotal</span>
          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-900">Tax (18% GST)</span>
          <span className="font-medium">₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Discount</span>
          <span className="font-medium text-green-400">-₹{discount.toFixed(2)}</span>
        </div>
        <div className="border-t pt-1">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSection;



