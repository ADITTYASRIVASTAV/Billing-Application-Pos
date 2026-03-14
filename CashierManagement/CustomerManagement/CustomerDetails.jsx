import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Phone, Mail, Calendar, ShoppingBag, DollarSign, TrendingUp, Plus } from 'lucide-react';
import { addPoints } from './CustomerManagementSlice/customerManagementSlice';

const CustomerDetails = () => {
  const customerManagementState = useSelector((state) => state.customerManagement);
  const selectedCustomer = customerManagementState?.selectedCustomer || null;
  
  const dispatch = useDispatch();
  const [pointsToAdd, setPointsToAdd] = useState('');

  const handleAddPoints = () => {
    if (pointsToAdd && !isNaN(pointsToAdd) && pointsToAdd > 0 && selectedCustomer) {
      dispatch(addPoints({
        customerId: selectedCustomer.id,
        points: parseInt(pointsToAdd)
      }));
      setPointsToAdd('');
    }
  };

  if (!selectedCustomer) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <User className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Customer Selected</h3>
        <p className="text-gray-500">Select a customer from the list to view details</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Customer Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{selectedCustomer.fullName}</h2>
            <div className="space-y-1 mt-2">
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <span>{selectedCustomer.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span>{selectedCustomer.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Joined {new Date(selectedCustomer.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex space-x-2">
        
          <input
            type="number"
            placeholder="Points"
            className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={pointsToAdd}
            onChange={(e) => setPointsToAdd(e.target.value)}
            min="1"
          />
          <button
            onClick={handleAddPoints}
            className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Points
          </button>
        </div> */}
      </div>

      {/* Statistics Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Loyalty Points</p>
              <p className="text-2xl font-bold text-gray-900">
                {selectedCustomer.loyaltyPoints.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {selectedCustomer.totalOrders}
              </p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <ShoppingBag className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">
                ${selectedCustomer.totalSpent.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </p>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Avg. Order Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${selectedCustomer.averageOrderValue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </p>
            </div>
            <div className="bg-orange-100 p-2 rounded-full">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CustomerDetails;