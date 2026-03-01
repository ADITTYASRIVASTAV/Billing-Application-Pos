import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from '../AdminLayout/AdminLayout';
import AdminDashboard from '../AdminDashBoard/AdminDashboard';
import AdminStores from '../AdminStore/Adminstore';
import PendingRequests from '../AdminPending/Pending';
import SettingsProfile from '../AdminSetting/Setting';



function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout/>}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="stores" element={<AdminStores />} />
        <Route path="requests" element={<PendingRequests />} />
        <Route path="settings" element={<SettingsProfile />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes
