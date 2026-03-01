import React, { useState } from 'react';
import { Plus, Upload } from 'lucide-react';
import InventoryTable from './InventoryTable';
import InventoryDialogForm from './InventoryFormDailog';

function Inventory() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // assumed existing state/handlers (already in your project)
  const [selectedProductId, setSelectedProductId] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const[IsEditDialogOpen , setEditDialogOpen] = useState(false)

  const handleAddInventory = () => {
    // your existing submit logic
  };

  const handleOpenEditDialog = (productId) => {
    setSelectedProductId(productId);
    setIsAddDialogOpen(true);
  };

  return (
    <div className="space-y-6">``
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Inventory Management
        </h1>

        <div className="flex gap-2">
          {/* Add Inventory Button */}
          <button
            onClick={() => setEditDialogOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md
                       hover:bg-blue-700 transition"
          >
            <Plus className="h-4 w-4" />
            Add Inventory
          </button>

          {/* Import CSV Button */}
          <button
            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md
                       hover:bg-gray-100 transition"
          >
            <Upload className="h-4 w-4" />
            Import CSV
          </button>
        </div>
      </div>

      {/* Inventory Table (UNCHANGED) */}
      <InventoryTable
        SetIsEditDialogopen={setEditDialogOpen}
      />


            <InventoryDialogForm
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        selectedProductId={selectedProductId}
        setSelectedProductId={setSelectedProductId}
        quantity={quantity}
        setQuantity={setQuantity}
        onSubmit={handleAddInventory}
        mode="add"
      />

      {/* Inventory Dialog (UNCHANGED PROPS) */}
      <InventoryDialogForm
        open={IsEditDialogOpen}
        onOpenChange={setEditDialogOpen}
        selectedProductId={selectedProductId}
        setSelectedProductId={setSelectedProductId}
        quantity={quantity}
        setQuantity={setQuantity}
        onSubmit={handleAddInventory}
        mode="add"
      />
    </div>
  );
}

export default Inventory;
