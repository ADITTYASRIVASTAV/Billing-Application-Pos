// src/components/DashboardPreview.jsx
import React from "react";

const DashboardPreview = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Dashboard Insights
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real-time analytics and reporting at your fingertips.
          </p>
        </div>
        
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="text-gray-400 text-sm mb-2">Today Sales</div>
              <div className="text-3xl font-bold text-white">$12,456</div>
              <div className="text-green-400 text-sm flex items-center mt-2">
                <span>↑ 12%</span>
                <span className="text-gray-400 ml-2">from yesterday</span>
              </div>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="text-gray-400 text-sm mb-2">Total Orders</div>
              <div className="text-3xl font-bold text-white">89</div>
              <div className="text-green-400 text-sm flex items-center mt-2">
                <span>↑ 8%</span>
                <span className="text-gray-400 ml-2">from yesterday</span>
              </div>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="text-gray-400 text-sm mb-2">Average Order</div>
              <div className="text-3xl font-bold text-white">$140</div>
              <div className="text-green-400 text-sm flex items-center mt-2">
                <span>↑ 5%</span>
                <span className="text-gray-400 ml-2">from yesterday</span>
              </div>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="text-gray-400 text-sm mb-2">Conversion Rate</div>
              <div className="text-3xl font-bold text-white">68%</div>
              <div className="text-green-400 text-sm flex items-center mt-2">
                <span>↑ 3%</span>
                <span className="text-gray-400 ml-2">from yesterday</span>
              </div>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Top Products</h3>
              <div className="space-y-4">
                {[
                  { name: "Premium Coffee Blend", sales: "$3,450" },
                  { name: "Artisan Bread", sales: "$2,890" },
                  { name: "Organic Tea", sales: "$2,120" },
                  { name: "Pastry Box", sales: "$1,850" }
                ].map((product, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded mr-3" />
                      <span className="text-gray-300">{product.name}</span>
                    </div>
                    <span className="text-white font-semibold">{product.sales}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Revenue Trend</h3>
              <div className="h-48 flex items-end space-x-2">
                {[30, 45, 60, 75, 90, 85, 95, 80].map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-8 bg-gradient-to-t from-indigo-500 to-purple-600 rounded-t"
                      style={{ height: `${value}%` }}
                    />
                    <span className="text-gray-400 text-xs mt-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Today"][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;