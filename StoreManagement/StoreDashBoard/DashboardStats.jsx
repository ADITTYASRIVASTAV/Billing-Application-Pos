import React from 'react';
import { TrendingUp, Store, Package, Users, IndianRupee } from 'lucide-react';

export function DashboardStats() {
  const stats = [
    {
      title: "Total Sales",
      value: "₹38,926",
      change: "+0% from last month",
      icon: IndianRupee,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Total Branches",
      value: "2",
      change: "+0% from last month",
      icon: Store,
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      title: "Total Products",
      value: "3",
      change: "+0% from last month",
      icon: Package,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      title: "Total Employees",
      value: "0",
      change: "+0% from last month",
      icon: Users,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div key={index} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium text-gray-500">{stat.title}</span>
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <div className="flex items-center space-x-1">
                <span className="text-sm text-gray-500">{stat.change}</span>
              </div>
            </div>
            <div className={`p-3 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}