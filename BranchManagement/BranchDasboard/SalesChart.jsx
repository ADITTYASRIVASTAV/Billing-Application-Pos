
import React from 'react';
import { useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

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

// Custom Tooltip Component
const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-sm text-blue-600 font-semibold">
          ₹{payload[0].value?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

// Custom container for chart configuration
const ChartContainer = ({ children, config }) => {
  return (
    <div className="chart-container">
      {children}
    </div>
  );
};

// Mock data
const mockData = [
  {
    name: "2025-08-08",
    sales: 560,
  },
  {
    name: "2025-08-26",
    sales: 260,
  },
  {
    name: "2025-08-15",
    sales: 860,
  },
  {
    name: "2025-08-22",
    sales: 160,
  }
];

// Format date for better display
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const SalesChart = () => {
  // For Redux integration, you would use:
  // const { data, loading } = useSelector((state) => state.analytics);
  
  // Using mock data for now
  const analytics = { loading: false };
  const data = mockData.map(item => ({
    ...item,
    formattedName: formatDate(item.name)
  }));

  const chartConfig = {
    sales: {
      label: "Sales",
      color: "#3b82f6", // Tailwind blue-500
    }
  };

  // Custom Y-axis formatter
  const formatYAxis = (value) => `₹${value}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Daily Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false}
                stroke="#e5e7eb"
              />
              <XAxis
                dataKey="formattedName"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={formatYAxis}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <Tooltip 
                content={<ChartTooltip />}
                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
              />
              <Bar
                dataKey="sales"
                radius={[4, 4, 0, 0]}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={chartConfig.sales.color}
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        {analytics?.loading && (
          <div className="text-center text-xs text-gray-400 mt-2">
            Loading...
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SalesChart;

