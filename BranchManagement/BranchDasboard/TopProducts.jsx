import React from 'react';
import {
  Shirt,
  Footprints,
  ShoppingBag,
  Tag
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

/* -------------------- UI CARD COMPONENTS -------------------- */

const Card = ({ children }) => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-100">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-xl font-semibold text-gray-800">
    {children}
  </h3>
);

const CardContent = ({ children }) => (
  <div className="p-6">{children}</div>
);

/* -------------------- TOOLTIP -------------------- */

const ChartTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const Icon = data.icon || Shirt;

    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Icon className="w-4 h-4" style={{ color: data.color }} />
          <span className="text-sm font-medium text-gray-700">
            {data.name}
          </span>
        </div>
        <p className="text-sm font-semibold text-blue-600">
          {data.value} units ({data.percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

/* -------------------- LEGEND -------------------- */

const ChartLegend = ({ payload }) => (
  <div className="flex flex-wrap justify-center gap-4 mt-4">
    {payload.map((entry, index) => {
      const Icon = entry.payload.icon || Shirt;
      return (
        <div key={index} className="flex items-center gap-2">
          <Icon className="w-3 h-3" style={{ color: entry.color }} />
          <span className="text-xs text-gray-600">{entry.value}</span>
        </div>
      );
    })}
  </div>
);

/* -------------------- DATA -------------------- */

const COLORS = ['#6D214F', '#B33771', '#D980FA', '#833471'];

const data = [
  { name: 'Men Shirt', value: 34, percentage: 40, icon: Shirt },
  { name: 'T-Shirt', value: 22, percentage: 20, icon: Tag },
  { name: 'Shoes', value: 33, percentage: 10, icon: Footprints },
  { name: 'Jeans', value: 44, percentage: 30, icon: ShoppingBag }
].map((item, i) => ({ ...item, color: COLORS[i] }));

/* -------------------- COMPONENT -------------------- */

const TopProducts = () => {
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {data[index].percentage}%
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Performance</CardTitle>
      </CardHeader>

      <CardContent>
        {/* ✅ FIXED HEIGHT – THIS SOLVES EVERYTHING */}
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                label={renderLabel}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip content={<ChartTooltip />} />
              <Legend content={<ChartLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopProducts;
