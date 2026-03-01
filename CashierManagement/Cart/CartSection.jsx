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
import { restoreProductStock } from '../../ReduxToolkit/Feature/product/ProductSlice';

const CartSection = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectSubtotal);
  const tax = useSelector(selectTax);
  const discount = useSelector(selectDiscountAmount);
  const total = useSelector(selectTotal);

  const handleQuantityChange = (id, newQuantity) => {
    const item = cartItems.find(item => item.id === id);
    if (item && newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id, quantity) => {
    dispatch(restoreProductStock({ id, quantity }));
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    cartItems.forEach(item => {
      dispatch(restoreProductStock({ id: item.id, quantity: item.quantity }));
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
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.sku}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id, item.quantity)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          ₹{item.price * item.quantity}
                        </div>
                        <div className="text-sm text-gray-500">
                          ₹{item.price} × {item.quantity}
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

      <div className="border-t border-gray-200 p-4  space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (18% GST)</span>
          <span className="font-medium">₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Discount</span>
          <span className="font-medium text-green-600">-₹{discount.toFixed(2)}</span>
        </div>
        <div className="border-t pt-3">
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