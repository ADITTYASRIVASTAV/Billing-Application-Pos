import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredOrders } from './OrderHistorySlice/ordersSlice';
import OrderRow from './OrderRow';

const OrderTable = () => {
  const orders = useSelector(selectFilteredOrders);

  const columns = [
    'Order ID',
    'Date / Time',
    'Customer',
    'Amount',
    'Payment Mode',
    'Status',
    'Actions',
  ];

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))
          ) : (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;