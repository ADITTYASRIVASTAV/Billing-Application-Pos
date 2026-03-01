import React from 'react';
import { CreditCard, Wallet, Smartphone } from 'lucide-react';

// Custom Card Components using Tailwind CSS
const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = '' }) => {
  return (
    <h3 className={`text-lg font-semibold ${className}`}>
      {children}
    </h3>
  );
};

const CardContent = ({ children, className = '' }) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

// Helper function to get payment icon
const getPaymentIcon = (type) => {
  switch (type.toLowerCase()) {
    case 'card':
      return <CreditCard className="w-5 h-5 text-blue-600" />;
    case 'cash':
      return <Wallet className="w-5 h-5 text-green-600" />;
    case 'upi':
      return <Smartphone className="w-5 h-5 text-purple-600" />;
    default:
      return <CreditCard className="w-5 h-5 text-gray-600" />;
  }
};

// Mock data
const paymentBreakdown = [
  {
    type: "Card",
    transactionCount: 30,
    percentage: 50,
    totalAmount: 5899,
  },
  {
    type: "Cash",
    transactionCount: 20,
    percentage: 30,
    totalAmount: 1899,
  },
  {
    type: "UPI",
    transactionCount: 50,
    percentage: 50,
    totalAmount: 8899,
  }
];

const PaymentBreakdown = () => {
  // For Redux integration, you would use:
  // const { paymentBreakdown, loading } = useSelector((state) => state.payments);
  
  // Using mock data for now
  const loading = false;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Payment Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {paymentBreakdown && paymentBreakdown.length > 0 ? paymentBreakdown.map((payment, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getPaymentIcon(payment.type)}
                <span className="font-medium text-gray-700">{payment.type}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600"
                    style={{ width: `${payment.percentage ?? 0}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  ₹{payment.totalAmount?.toLocaleString() ?? "-"}
                </span>
                <span className="text-xs text-gray-500 min-w-[40px]">
                  {payment.percentage ? `${payment.percentage}%` : ""}
                </span>
                <span className="text-xs text-gray-500 min-w-[70px]">
                  {payment.transactionCount ? `(${payment.transactionCount} txns)` : ""}
                </span>
              </div>
            </div>
          )) : (
            <div className="text-center text-gray-400 py-4">
              {loading ? "Loading payment breakdown..." : "No data available"}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentBreakdown;