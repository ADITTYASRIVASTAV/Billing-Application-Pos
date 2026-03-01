import React from 'react';

import { BarChart3, Mail } from 'lucide-react';
import { DashboardStats } from './DashboardStats';
import { RecentSales } from './RecentSales';
import { SalesTrend } from './SalesTrend';

export default function StoreDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="mt-2 flex items-center space-x-2 text-gray-600">
            <Mail className="h-4 w-4" />
            <span className="text-sm">srivastavanurag084@gmail.com</span>
          </div>
        </div>

        {/* Stats Grid */}
        <DashboardStats />

        {/* Divider */}
        <hr className="my-8 border-gray-200" />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Sales Section */}
          <div>
            <RecentSales />
          </div>

          {/* Sales Trend Section */}
          <div>
            <SalesTrend />
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>All data is updated in real-time. Last updated: Today</p>
        </div>
      </div>
    </div>
  );
}