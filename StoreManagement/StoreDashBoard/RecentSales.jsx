import React from 'react';
import { Store, Calendar } from 'lucide-react';

export function RecentSales() {
  const sales = [
    { 
      store: "Main Store", 
      time: "Today", 
      amount: "₹1,234",
      timeIcon: Calendar
    },
    { 
      store: "Downtown Branch", 
      time: "Today", 
      amount: "₹891",
      timeIcon: Calendar
    },
    { 
      store: "West Side Location", 
      time: "Yesterday", 
      amount: "₹654",
      timeIcon: Calendar
    },
    { 
      store: "East End Shop", 
      time: "Yesterday", 
      amount: "₹1,021",
      timeIcon: Calendar
    }
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Sales</h2>
      <div className="space-y-4">
        {sales.map((sale, index) => (
          <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg bg-blue-50">
                <Store className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{sale.store}</p>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>{sale.time}</span>
                </div>
              </div>
            </div>
            <div className="text-lg font-semibold text-gray-900">{sale.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}