import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import BranchTable from './BranchTable';
import BranchForm from './BranchForm';

const Branches = () => {
  const [branches, setBranches] = useState([
    {
      id: 1,
      name: 'Surat east branch',
      address: 'Ambavadi choke near ashoka complex',
      manager: '☏', // Using phone icon as placeholder
      phone: '9945345123',
      email: 'srivastavanurag084@gmail.com'
    },
    {
      id: 2,
      name: 'Ahemdabad - Main',
      address: 'Near Alice Bridge',
      manager: '☏', // Using phone icon as placeholder
      phone: '9913379138',
      email: ''
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);

  const handleAddBranch = (branchData) => {
    if (editingBranch) {
      // Update existing branch
      setBranches(branches.map(b => 
        b.id === editingBranch.id ? { ...branchData, id: b.id } : b
      ));
      setEditingBranch(null);
    } else {
      // Add new branch
      const newBranch = {
        ...branchData,
        id: branches.length + 1
      };
      setBranches([...branches, newBranch]);
    }
    setShowForm(false);
  };

  const handleEditBranch = (branch) => {
    setEditingBranch(branch);
    setShowForm(true);
  };

  const handleDeleteBranch = (branchId) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      setBranches(branches.filter(b => b.id !== branchId));
    }
  };

  const handleEmailBranch = (branch) => {
    if (branch.email) {
      window.location.href = `mailto:${branch.email}`;
    } else {
      alert('No email address available for this branch');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingBranch(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Branch Management</h1>
          <p className="text-gray-600 mt-2">Manage your branch locations and details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BranchTable
              branches={branches}
              onEdit={handleEditBranch}
              onDelete={handleDeleteBranch}
              onEmail={handleEmailBranch}
            />
            
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="mt-6 flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Plus className="w-5 h-5" />
                Add Branch
              </button>
            )}
          </div>

          {showForm && (
            <div className="lg:col-span-1">
              <BranchForm
                onSubmit={handleAddBranch}
                onCancel={handleCancelForm}
                initialData={editingBranch}
              />
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800">
            <strong>Note:</strong> The email icon sends email to{' '}
            <a href="mailto:srivastavanurag084@gmail.com" className="underline">
              srivastavanurag084@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Branches;