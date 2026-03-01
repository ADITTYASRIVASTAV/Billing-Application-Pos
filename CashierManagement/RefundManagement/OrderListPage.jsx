import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../RefundManagement/RefundSlice/RefundSlice';
import OrderTable from './OrderTable';

const OrderListPage = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector(state => state.refund);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <OrderTable orders={orders} isLoading={isLoading} />
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">Error loading orders: {error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderListPage;