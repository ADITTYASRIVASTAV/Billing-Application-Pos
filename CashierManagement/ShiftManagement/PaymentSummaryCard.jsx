import React from 'react';
import { useSelector } from 'react-redux';
import { selectPaymentSummary } from './ShilfSummarySlice/shiftSummarySlice';
import { CreditCard, Wallet, Smartphone } from 'lucide-react';

const PaymentSummaryCard = () => {
  const paymentMethods = useSelector(selectPaymentSummary);

  const getIcon = (method) => {
    switch (method) {
      case 'CASH':
        return <Wallet size={20} className="text-green-600" />;
      case 'CARD':
        return <CreditCard size={20} className="text-blue-600" />;
      case 'UPI':
        return <Smartphone size={20} className="text-purple-600" />;
      default:
        return <CreditCard size={20} />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment Summary</h2>
      <div className="space-y-4">
        {paymentMethods.map((payment) => (
          <div key={payment.method} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                {getIcon(payment.method)}
              </div>
              <div>
                <p className="font-medium text-gray-900">{payment.method}</p>
                <p className="text-sm text-gray-600">{payment.transactions} transactions</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">${payment.amount.toFixed(2)}</p>
              <p className="text-sm text-gray-600">{payment.percentage}% of total</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentSummaryCard;