import React from 'react'
import TodayOverview from './TodayOverview'
import PaymentBreakdown from './PaymentBreakdown'
import SalesChart from './SalesChart'
import TopProducts from './TopProducts'
import CashierPerformance from './CashierPerformance'
import RecentOrders from './RecentOrders'



const Branch = {
  name:"surat east branch:"
}

function Dashboard() {
  return (
  <>
        <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Branch Dashboard</h1>
      {Branch&&<p className="text-gray-500">{Branch.name}</p>}  
      </div>
      {/* KPI Cards */}
      <TodayOverview/>
      
      {/* Payment Breakdown */}
      <PaymentBreakdown/>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SalesChart/>
        <TopProducts />
      </div>
      {/* Additional Data */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CashierPerformance />
        <RecentOrders />
      </div>
    </div>
  </>
  )
}

export default Dashboard