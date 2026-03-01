import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { User } from 'lucide-react';

/* ---------------- Card Components ---------------- */

const Card = ({ children }) => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-xl font-semibold text-gray-800">{children}</h3>
);

const CardContent = ({ children }) => (
  <div className="p-6">{children}</div>
);

/* ---------------- Tooltip ---------------- */

const ChartTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
        <p className="text-sm font-medium text-gray-700">
          {payload[0].payload.name}
        </p>
        <p className="text-sm font-semibold text-blue-600">
          ₹{payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

/* ---------------- Data ---------------- */

const data = [
  { name: 'Thanos', sales: 560 },
  { name: 'Hokaee', sales: 260 },
  { name: 'DrDoom', sales: 860 },
  { name: 'Kai', sales: 160 },
];

/* ---------------- Component ---------------- */

const CashierPerformance = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cashier Performance</CardTitle>
        <User className="text-blue-600" size={20} />
      </CardHeader>

      <CardContent>
        {/* ✅ FIX: Parent container now has a REAL height */}
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={90} />
              <Tooltip content={<ChartTooltip />} />
              <Bar
                dataKey="sales"
                fill="#3b82f6"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CashierPerformance;
