import React from 'react';
import { TrendingUp } from 'lucide-react';

export function SalesTrend() {
  // Data points for the chart
  const chartData = [
    { day: "Day 1", value: 2200 },
    { day: "Day 2", value: 1800 },
    { day: "Day 3", value: 2800 },
    { day: "Day 4", value: 1500 },
    { day: "Day 5", value: 2500 },
    { day: "Day 6", value: 2000 },
    { day: "Day 7", value: 3000 }
  ];

  const maxValue = 3000;
  const yAxisLabels = ["₹3000", "₹2250", "₹1500", "₹750", "₹0"];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Sales Trend</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <TrendingUp className="h-4 w-4" />
          <span>Daily</span>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative h-64">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between py-4">
          {yAxisLabels.map((label, index) => (
            <div key={index} className="text-xs text-gray-500 font-medium">
              {label}
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div className="ml-12 h-full flex items-end justify-between pt-4">
          {chartData.map((data, index) => {
            const heightPercentage = (data.value / maxValue) * 100;
            return (
              <div key={index} className="flex flex-col items-center" style={{ width: '12%' }}>
                {/* Bar */}
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg transition-all duration-300 hover:opacity-80"
                  style={{ height: `${heightPercentage}%` }}
                />
                {/* Day label */}
                <div className="mt-2 text-xs text-gray-500">{data.day}</div>
              </div>
            );
          })}
        </div>

        {/* Grid lines */}
        <div className="absolute left-12 right-0 top-0 bottom-0 -z-10">
          {/* Horizontal grid lines */}
          {[0, 25, 50, 75, 100].map((percent) => (
            <div 
              key={percent}
              className="absolute w-full border-t border-gray-200"
              style={{ top: `${percent}%` }}
            />
          ))}
        </div>
      </div>

      {/* X-axis label */}
      <div className="mt-2 text-center text-sm text-gray-500">
        Day
      </div>
    </div>
  );
}