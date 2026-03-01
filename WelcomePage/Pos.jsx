import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetPayment } from '../CashierManagement/Payment/paymentSlice';
import ProductSection from '../CashierManagement/Product/ProductSection';
import CartSection from '../CashierManagement/Cart/CartSection';
import CustomerSection from '../CashierManagement/Customer/CustomerSection';
import PaymentSection from '../CashierManagement/Payment/PaymentSection';

const POS = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetPayment());
  }, [dispatch]);

  return (
    <div className="h-[calc(100vh-8rem)] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <ProductSection />
        </div>

        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <CartSection />
        </div>

        <div className="bg-white rounded-lg border shadow-sm h-full flex flex-col overflow-hidden">
          <div className="border-b p-3">
            <CustomerSection />
          </div>
          <div className="flex-1 overflow-hidden">
            <PaymentSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default POS;