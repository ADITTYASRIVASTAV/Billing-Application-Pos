import React from 'react';
import { useSelector } from 'react-redux';
import { DollarSign, ShoppingBag, Users, Package } from 'lucide-react';

// Helper function to determine change type
const getChangeType = (value) => {
  if (value === undefined || value === null) return 'neutral';
  return value > 0 ? 'positive' : value < 0 ? 'negative' : 'neutral';
};

// Custom Card Component using Tailwind CSS
const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className = '' }) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

// Mock data - remove this when using Redux
const mockTodayOverview = {
  totalSales: 5678,
  salesGrowth: 34,
  ordersToday: 39,
  orderGrowth: 40,
  activeCashiers: 12,
  cashierGrowth: 30,
  lowStockItems: 9,
  lowStockGrowth: 20
};

const TodayOverview = () => {
  // Using Redux selector - uncomment when your Redux store is set up
  // const { todayOverview, loading } = useSelector((state) => state.branchAnalytics);
  
  // For now, using mock data
  const todayOverview = mockTodayOverview;
  const loading = false;

  const kpis = todayOverview ? [
    {
      title: "Today's Sales",
      value: `₹${todayOverview.totalSales?.toLocaleString() ?? "-"}`,
      icon: <DollarSign className="w-8 h-8 text-blue-600" />,
      change: todayOverview.salesGrowth !== undefined ? `${todayOverview.salesGrowth > 0 ? "+" : ""}${todayOverview.salesGrowth.toFixed(2)}%` : "-",
      changeType: getChangeType(todayOverview.salesGrowth)
    },
    {
      title: "Orders Today",
      value: todayOverview.ordersToday ?? "-",
      icon: <ShoppingBag className="w-8 h-8 text-blue-600" />,
      change: todayOverview.orderGrowth !== undefined ? `${todayOverview.orderGrowth > 0 ? "+" : ""}${todayOverview.orderGrowth.toFixed(2)}%` : "-",
      changeType: getChangeType(todayOverview.orderGrowth)
    },
    {
      title: "Active Cashiers",
      value: todayOverview.activeCashiers ?? "-",
      icon: <Users className="w-8 h-8 text-blue-600" />,
      change: todayOverview.cashierGrowth !== undefined ? `${todayOverview.cashierGrowth > 0 ? "+" : ""}${todayOverview.cashierGrowth.toFixed(2)}%` : "-",
      changeType: getChangeType(todayOverview.cashierGrowth)
    },
    {
      title: "Low Stock Items",
      value: todayOverview.lowStockItems ?? "-",
      icon: <Package className="w-8 h-8 text-blue-600" />,
      change: todayOverview.lowStockGrowth !== undefined ? `${todayOverview.lowStockGrowth > 0 ? "+" : ""}${todayOverview.lowStockGrowth.toFixed(2)}%` : "-",
      changeType: getChangeType(todayOverview.lowStockGrowth)
    },
  ] : [];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpis.length > 0 ? kpis.map((kpi, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
                <h3 className="text-2xl font-bold mt-1">{kpi.value}</h3>
                <p className={`text-xs font-medium mt-1 ${
                  kpi.changeType === 'positive' ? 'text-emerald-500' : 
                  kpi.changeType === 'negative' ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {kpi.change}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                {kpi.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      )) : (
        <div className="col-span-4 text-center text-gray-400 py-8">
          {loading ? "Loading KPIs..." : "No data available"}
        </div>
      )}
    </div>
  );
};

export default TodayOverview;