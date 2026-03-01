import React from "react";
import { 
  Store, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  PieChart
} from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of all stores and system statistics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Stores Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Store className="h-6 w-6 text-blue-600" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">3</h3>
            <p className="text-gray-700 font-medium">Total Stores</p>
            <p className="text-gray-500 text-sm mt-1">from last month</p>
          </div>

          {/* Active Stores Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">2</h3>
            <p className="text-gray-700 font-medium">Active Stores</p>
            <p className="text-gray-500 text-sm mt-1">currently operational</p>
          </div>

          {/* Blocked Stores Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">0</h3>
            <p className="text-gray-700 font-medium">Blocked Stores</p>
            <p className="text-gray-500 text-sm mt-1">suspended accounts</p>
          </div>

          {/* Pending Requests Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">1</h3>
            <p className="text-gray-700 font-medium">Pending Requests</p>
            <p className="text-gray-500 text-sm mt-1">awaiting approval</p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8">
          <hr className="border-gray-300" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Store Registrations Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Store Registrations (Last 7 Days)
              </h2>
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            
            <div className="relative h-64">
              {/* Chart Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[4, 3, 2, 1].map((num, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-8 text-right text-gray-400 text-sm mr-4">{num}</div>
                    <div className="flex-1 border-t border-gray-200"></div>
                  </div>
                ))}
                <div className="flex items-center">
                  <div className="w-8 text-right text-gray-400 text-sm mr-4">0</div>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>
              </div>

              {/* Bars */}
              <div className="absolute inset-0 left-12 flex items-end space-x-6">
                {[
                  { height: "45%", label: "Mon" },
                  { height: "70%", label: "Tue" },
                  { height: "90%", label: "Wed" },
                  { height: "30%", label: "Thu" },
                  { height: "60%", label: "Fri" },
                  { height: "85%", label: "Sat" },
                  { height: "50%", label: "Sun" }
                ].map((bar, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1">
                    <div 
                      className={`w-3/4 rounded-t-lg ${
                        idx === 2 
                          ? "bg-blue-600" 
                          : idx === 5 
                          ? "bg-blue-500" 
                          : "bg-blue-400"
                      }`}
                      style={{ height: bar.height }}
                    ></div>
                    <div className="mt-2 text-gray-600 text-sm">{bar.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Store Status Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Store Status Distribution
              </h2>
              <PieChart className="h-5 w-5 text-blue-600" />
            </div>

            <div className="flex items-center justify-center h-64">
              {/* Pie Chart Visualization */}
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full border-8 border-green-500"></div>
                <div className="absolute inset-0 rounded-full border-8 border-gray-300" 
                  style={{ clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)" }}>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">67%</div>
                    <div className="text-gray-600">Active</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="text-gray-700 font-medium">Active</span>
                </div>
                <span className="text-gray-900 font-semibold">67%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                  <span className="text-gray-700 font-medium">Blocked</span>
                </div>
                <span className="text-gray-900 font-semibold">0%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;