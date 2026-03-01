import React from 'react';

const OrderItemsTable = ({ items }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const columns = [
    'Product Image',
    'Item Name',
    'SKU',
    'Quantity',
    'Price',
    'Total',
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900 font-medium">{item.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-600">{item.sku}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">{item.quantity}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">{formatCurrency(item.price)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">{formatCurrency(item.total)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderItemsTable;