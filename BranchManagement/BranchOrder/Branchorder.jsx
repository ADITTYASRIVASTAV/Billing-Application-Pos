import React, { useState } from "react";
import { Eye, Printer, RotateCcw } from "lucide-react";

const Branchorder = () => {
  const [showOrderDetailsDialog, setShowOrderDetailsDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // ✅ SINGLE declaration (FIXED)
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetailsDialog(true);
  };

  const handlePrintInvoice = (order) => {
    console.log("Print invoice:", order);
  };

  const handleInitiateReturn = (order) => {
    console.log("Initiate return:", order);
  };

  const orders = [
    {
      id: "ORD001",
      customer: "Rahul Sharma",
      amount: 1250,
      status: "Delivered",
      date: "2024-01-15",
    },
    {
      id: "ORD002",
      customer: "Anita Verma",
      amount: 890,
      status: "Pending",
      date: "2024-01-16",
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      {/* <h2 className="text-xl font-semibold mb-4">Branch Orders</h2>

      {/* Order List */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.customer}</td>
                <td className="px-4 py-2">{order.date}</td>
                <td className="px-4 py-2">₹{order.amount}</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="p-2 rounded hover:bg-gray-100"
                      title="View Order"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      onClick={() => handlePrintInvoice(order)}
                      className="p-2 rounded hover:bg-gray-100"
                      title="Print Invoice"
                    >
                      <Printer size={16} />
                    </button>

                    <button
                      onClick={() => handleInitiateReturn(order)}
                      className="p-2 rounded hover:bg-gray-100"
                      title="Initiate Return"
                    >
                      <RotateCcw size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Dialog */}
      {showOrderDetailsDialog && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">
              Order Details
            </h3>

            <div className="space-y-2 text-sm">
              <p><strong>Order ID:</strong> {selectedOrder.id}</p>
              <p><strong>Customer:</strong> {selectedOrder.customer}</p>
              <p><strong>Date:</strong> {selectedOrder.date}</p>
              <p><strong>Amount:</strong> ₹{selectedOrder.amount}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setShowOrderDetailsDialog(false)}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )} 
    </div>

  );
};

export default Branchorder;
