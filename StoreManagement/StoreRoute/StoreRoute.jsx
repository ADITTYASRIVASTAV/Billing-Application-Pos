import React from 'react'
import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import StoreLayout from '../StoreLayout/Layout';
function StoreRoute() {
  return (
    <>
  <Routes>
    <Route path='/' element={<StoreLayout/>}>
    <Route index element={<Dashboard/>}/>
    <Route path="Dashboard" element={<Dashboard/>}/>
     <Route path="orders" element={<Branchorder/>}/>
      <Route path="inventory" element={<Inventory/>}/>
       <Route path="employees" element={<BranchEmployees/>}/>
       <Route path="settings" element={<Branchsettings/>}/>
       
    </Route>
  </Routes>

    </>
  )
}

export default StoreRoute