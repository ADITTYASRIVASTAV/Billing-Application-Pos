import React from 'react';
import { useSelector } from 'react-redux';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

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

// Custom Table Components
const Table = ({ children, className = '' }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
        {children}
      </table>
    </div>
  );
};

const TableHeader = ({ children }) => {
  return <thead className="bg-gray-50">{children}</thead>;
};

const TableRow = ({ children, className = '' }) => {
  return <tr className={`${className}`}>{children}</tr>;
};

const TableHead = ({ children, className = '' }) => {
  return (
    <th
      className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  );
};

const TableBody = ({ children }) => {
  return <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>;
};

const TableCell = ({ children, className = '' }) => {
  return (
    <td className={`px-4 py-3 text-sm text-gray-900 ${className}`}>
      {children}
    </td>
  );
};

// Custom Badge Component
const Badge = ({ children, className = '', variant = 'default' }) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    secondary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Helper functions
const getStatusColor = (status) => {
  const statusLower = status?.toLowerCase() || '';
  
  if (statusLower.includes('complete') || statusLower.includes('delivered') || statusLower.includes('success')) {
    return 'success';
  } else if (statusLower.includes('pending') || statusLower.includes('processing')) {
    return 'warning';
  } else if (statusLower.includes('cancelled') || statusLower.includes('failed')) {
    return 'danger';
  }
  return 'secondary';
};

const getStatusIcon = (status) => {
  const statusLower = status?.toLowerCase() || '';
  
  if (statusLower.includes('complete') || statusLower.includes('delivered') || statusLower.includes('success')) {
    return <CheckCircle className="w-3 h-3 mr-1" />;
  } else if (statusLower.includes('pending') || statusLower.includes('processing')) {
    return <Clock className="w-3 h-3 mr-1" />;
  } else if (statusLower.includes('cancelled') || statusLower.includes('failed')) {
    return <XCircle className="w-3 h-3 mr-1" />;
  }
  return <AlertCircle className="w-3 h-3 mr-1" />;
};

const formatDateTime = (dateString) => {
  if (!dateString) return '-';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        return `${diffInMinutes}m ago`;
      }
      return `${diffInHours}h ago`;
    }
    
    return date.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return dateString;
  }
};

// Mock data
const mockRecentOrders = [
  {
    id: '#ORD-001',
    customerName: 'John Doe',
    amount: 1250,
    status: 'Completed',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    id: '#ORD-002',
    customerName: 'Jane Smith',
    amount: 890,
    status: 'Processing',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
  },
  {
    id: '#ORD-003',
    customerName: 'Bob Johnson',
    amount: 2450,
    status: 'Pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
  {
    id: '#ORD-004',
    customerName: 'Alice Williams',
    amount: 560,
    status: 'Cancelled',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: '#ORD-005',
    customerName: 'Charlie Brown',
    amount: 1780,
    status: 'Completed',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
];

const RecentOrders = () => {
  // For Redux integration, you would use:
  // const { recentOrders, loading } = useSelector((state) => state.orders);
  
  // Using mock data for now
  const loading = false;
  const recentOrders = mockRecentOrders;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(recentOrders || []).map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">
                  {order.id}
                </TableCell>
                <TableCell className="text-gray-700">
                  {order.customer?.fullName || order.customerName || "-"}
                </TableCell>
                <TableCell className="font-medium text-gray-900">
                  {order.amount ? `₹${order.amount.toLocaleString()}` : order.totalAmount ? `₹${order.totalAmount.toLocaleString()}` : "-"}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={getStatusColor(order.status)}
                    className="flex items-center w-fit"
                  >
                    {getStatusIcon(order.status)}
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-gray-500">
                  {formatDateTime(order.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {loading && (
          <div className="text-center text-xs text-gray-400 mt-4 py-2">
            Loading...
          </div>
        )}
        {!loading && (!recentOrders || recentOrders.length === 0) && (
          <div className="text-center text-gray-400 py-4">
            No orders found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentOrders;