// EmployeeStats.jsx
import React from 'react';
import { Users, UserCheck, User } from 'lucide-react';

const BranchEmployeeStats = ({ employees }) => {
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === 'Active').length;
  const cashiers = employees.filter(emp => emp.role === 'ROLE_BRANCH_CASHIER').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Employees Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Employees</p>
            <p className="text-3xl font-bold mt-2 text-gray-900">{totalEmployees}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Active Employees Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Employees</p>
            <p className="text-3xl font-bold mt-2 text-gray-900">{activeEmployees}</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <UserCheck className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Cashiers Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Cashiers</p>
            <p className="text-3xl font-bold mt-2 text-gray-900">{cashiers}</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <User className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchEmployeeStats;