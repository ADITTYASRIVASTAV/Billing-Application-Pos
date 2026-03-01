import React from "react";
import { Edit } from "lucide-react";

const inventories = [
  {
    id: 1,
    name: "White Half Shirt",
    quantity: 34,
    category: "Shirt",
    sku: "SHIRT-MAN-WHITE",
  },
];

const InventoryTable = ({ setEditDialogOpen }) => {
  return (
    <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
      <table className="w-full border-collapse">
        {/* Table Header */}
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              SKU
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Product Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Quantity
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Category
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {inventories.map((item) => (
            <tr
              key={item.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3 text-sm text-gray-800">
                {item.sku}
              </td>

              <td className="px-4 py-3 text-sm text-gray-800">
                {item.name}
              </td>

              <td className="px-4 py-3 text-sm text-gray-800">
                {item.quantity}
              </td>

              <td className="px-4 py-3 text-sm text-gray-800">
                {item.category}
              </td>

              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => setEditDialogOpen(true)}
                  className="inline-flex items-center justify-center p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                >
                  <Edit size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
