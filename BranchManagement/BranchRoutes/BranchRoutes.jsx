import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import BranchLayout from '../BranchLayout/BranchLayout';
import Dashboard from '../BranchDasboard/Dashboard';
import Branchorder from '../BranchOrder/Branchorder';
import Inventory from '../BranchInventory/Inventory';
import Branchsettings from '../BranchSettings/Branchsettings';
import BranchEmployees from '../BranchEmployee/Employee';


function BranchRoutes() {
  return (
  <Routes>
    <Route path='/' element={<BranchLayout/>}>
    <Route index element={<Dashboard/>}/>
    <Route path="Dashboard" element={<Dashboard/>}/>
     <Route path="orders" element={<Branchorder/>}/>
      <Route path="inventory" element={<Inventory/>}/>
       <Route path="employees" element={<BranchEmployees/>}/>
       <Route path="settings" element={<Branchsettings/>}/>
    </Route>
  </Routes>
  )
}

export default BranchRoutes

