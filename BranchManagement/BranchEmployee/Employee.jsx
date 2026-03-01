// BranchEmployees.jsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import AddEmployeeDialog from './AddEmployeeDialog';
import EmployeeTable from './EmployeeTable';
import EditEmployeeDialog from './EditEmployeeDialog';
import BranchEmployeeStats from './EmployeeState';

const BranchEmployees = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  // Initial employee data
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'vinjal jaara',
      role: 'ROLE_BRANCH_MANAGER',
      email: 'vinjal@gmail.com',
      loginAccess: 'Disabled',
      status: 'Disabled',
      assignedSince: '2024-01-15',
      actions: '✅'
    },
    {
      id: 2,
      name: 'chery rathod',
      role: 'ROLE_BRANCH_CASHIER',
      email: 'chery@gmail.com',
      loginAccess: 'Disabled',
      status: 'Disabled',
      assignedSince: '2024-01-20',
      actions: '✅'
    },
    {
      id: 3,
      name: 'vinod',
      role: 'ROLE_BRANCH_CASHIER',
      email: 'vinod@gmail.com',
      loginAccess: 'Disabled',
      status: 'Disabled',
      assignedSince: '2024-01-25',
      actions: '✅'
    },
    {
      id: 4,
      name: 'Pinku Dubey',
      role: 'ROLE_BRANCH_CASHIER',
      email: 'pinku@gmail.com',
      loginAccess: 'Disabled',
      status: 'Disabled',
      assignedSince: '2024-02-01',
      actions: '✅'
    },
    {
      id: 5,
      name: 'tiger',
      role: 'ROLE_BRANCH_CASHIER',
      email: 'tiger@gmail.com',
      loginAccess: 'Disabled',
      status: 'Disabled',
      assignedSince: '2024-02-05',
      actions: '✅'
    }
  ]);

  // Available roles
  const branchAdminRole = [
    { value: 'ROLE_BRANCH_MANAGER', label: 'Branch Manager' },
    { value: 'ROLE_BRANCH_CASHIER', label: 'Cashier' }
  ];

  // Get status color class
  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-yellow-100 text-yellow-800';
      case 'Disabled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle adding new employee
  const handleAddEmployee = (newEmployee) => {
    const employeeWithId = {
      ...newEmployee,
      id: employees.length + 1,
      loginAccess: 'Disabled',
      status: 'Disabled',
      assignedSince: new Date().toLocaleDateString('en-CA'),
      actions: '✅'
    };
    setEmployees([...employees, employeeWithId]);
    setIsAddDialogOpen(false);
  };

  // Handle editing employee
  const handleEditEmployee = (updatedEmployee) => {
    setEmployees(employees.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    ));
    setIsEditDialogOpen(false);
    setSelectedEmployee(null);
  };

  // Toggle login access
  const handleToggleAccess = (employeeId) => {
    setEmployees(employees.map(emp => {
      if (emp.id === employeeId) {
        const newAccess = emp.loginAccess === 'Enabled' ? 'Disabled' : 'Enabled';
        const newStatus = emp.status === 'Active' ? 'Disabled' : 'Active';
        return {
          ...emp,
          loginAccess: newAccess,
          status: newStatus
        };
      }
      return emp;
    }));
  };

  // Open edit dialog
  const openEditDialog = (employee) => {
    setSelectedEmployee(employee);
    setIsEditDialogOpen(true);
  };

  // Reset password
  const openResetPasswordDialog = (employee) => {
    if (window.confirm(`Reset password for ${employee.name}?`)) {
      alert(`Password reset link sent to ${employee.email}`);
    }
  };

  // View performance
  const openPerformanceDialog = (employee) => {
    alert(`Performance report for ${employee.name}:\n\nRole: ${employee.role}\nStatus: ${employee.status}\nEmail: ${employee.email}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Employee Management
        </h1>
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="w-5 h-5" />
          Add Employee
        </button>
      </div>
      
      <BranchEmployeeStats employees={employees} />
      <EmployeeTable
        employees={employees}
        getStatusColor={getStatusColor}
        handleToggleAccess={handleToggleAccess}
        openEditDialog={openEditDialog}
        openResetPasswordDialog={openResetPasswordDialog}
        openPerformanceDialog={openPerformanceDialog}
      />

      <AddEmployeeDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddEmployee}
        roles={branchAdminRole}
      />

      <EditEmployeeDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedEmployee(null);
        }}
        employee={selectedEmployee}
        onSave={handleEditEmployee}
        roles={branchAdminRole}
      />
    </div>
  );
};

export default BranchEmployees;