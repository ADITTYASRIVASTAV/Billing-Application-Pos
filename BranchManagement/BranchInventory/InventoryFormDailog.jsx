import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { X, Filter } from "lucide-react";

const InventoryDialogForm = ({
  open,
  onOpenChange,
  selectedProductId,
  setSelectedProductId,
  quantity,
  setQuantity,
  onSubmit,
  mode = "add",
}) => {
  // ✅ SAFE selector (never crashes)
  const products = useSelector(
    (state) => state.product?.products ?? []
  );

  const [errors, setErrors] = useState({});
  const isEdit = mode === "edit";

  const selectedProduct = products.find(
    (p) => String(p.id) === String(selectedProductId)
  );

  // Reset errors when modal opens/closes
  useEffect(() => {
    if (!open) {
      setErrors({});
    }
  }, [open]);

  if (!open) return null;

  const validateForm = () => {
    const newErrors = {};
    
    if (!isEdit && !selectedProductId) {
      newErrors.productId = "Please select a product";
    }
    
    if (!quantity || quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    } else if (!Number.isInteger(Number(quantity))) {
      newErrors.quantity = "Quantity must be a whole number";
    }
    
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Call the parent's onSubmit
    onSubmit();
    
    // Reset errors
    setErrors({});
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    // Allow empty string or positive numbers
    if (value === "" || (/^\d+$/.test(value) && parseInt(value) > 0)) {
      setQuantity(value);
      // Clear quantity error when user types
      if (errors.quantity) {
        setErrors(prev => ({ ...prev, quantity: "" }));
      }
    }
  };

  const handleProductChange = (e) => {
    setSelectedProductId(e.target.value);
    // Clear product error when user selects something
    if (errors.productId) {
      setErrors(prev => ({ ...prev, productId: "" }));
    }
  };

  return (
    /* Overlay */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* Modal */}
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit Inventory" : "Add Inventory"}
          </h2>
          <button
            onClick={() => {
              setErrors({});
              onOpenChange(false);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          {/* Product */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-sm font-medium text-right">
              Product
            </label>

            {isEdit ? (
              <div className="col-span-3">
                <input
                  type="text"
                  disabled
                  value={selectedProduct?.name || selectedProduct?.sku || ""}
                  className="w-full border rounded-md px-3 py-2 bg-gray-100"
                />
              </div>
            ) : (
              <div className="col-span-3 relative">
                <Filter className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <select
                  value={selectedProductId || ""}
                  onChange={handleProductChange}
                  className={`w-full border rounded-md pl-9 pr-3 py-2
                             focus:outline-none focus:ring-2 focus:ring-blue-500
                             ${errors.productId ? "border-red-500" : ""}`}
                >
                  <option value="" disabled>
                    Select a product
                  </option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name || product.sku}
                    </option>
                  ))}
                </select>
                {errors.productId && (
                  <p className="text-red-500 text-xs mt-1">{errors.productId}</p>
                )}
              </div>
            )}
          </div>

          {/* Quantity */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-sm font-medium text-right">
              Quantity
            </label>
            <div className="col-span-3">
              <input
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={handleQuantityChange}
                className={`w-full border rounded-md px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           ${errors.quantity ? "border-red-500" : ""}`}
              />
              {errors.quantity && (
                <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-5 py-4 border-t">
          <button
            onClick={() => {
              setErrors({});
              onOpenChange(false);
            }}
            className="px-4 py-2 border rounded-md hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md
                       hover:bg-blue-700 transition disabled:opacity-50"
            disabled={!quantity || quantity <= 0 || (!isEdit && !selectedProductId)}
          >
            {isEdit ? "Update Inventory" : "Add Inventory"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryDialogForm;