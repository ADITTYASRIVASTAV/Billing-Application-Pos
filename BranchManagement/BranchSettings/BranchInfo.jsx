import React, { useState, useEffect } from 'react';
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Save,
  Check,
  X
} from 'lucide-react';

const BranchInfo = () => {
  // State for branch information
  const [branchInfo, setBranchInfo] = useState({
    name: "Surat east branch",
    address: "Ambavadi chokenear ashoka complex",
    phone: "9945345123",
    email: "",
    openingTime: "--:--",
    closingTime: "--:--",
    workingDays: ["Monday", "Wednesday"]
  });

  // All available days
  const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Handle input changes
  const handleInputChange = (field, value) => {
    setBranchInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle working day toggle
  const toggleWorkingDay = (day) => {
    setBranchInfo(prev => {
      const isSelected = prev.workingDays.includes(day);
      if (isSelected) {
        return {
          ...prev,
          workingDays: prev.workingDays.filter(d => d !== day)
        };
      } else {
        return {
          ...prev,
          workingDays: [...prev.workingDays, day]
        };
      }
    });
  };

  // Handle save
  const handleSave = () => {
    console.log('Saving branch info:', branchInfo);
    alert('Branch information saved successfully!');
  };

  // Format time display
  const formatTimeDisplay = (time) => {
    return time === '--:--' ? '' : time;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Card Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">Branch Information</h2>
        <p className="text-sm text-gray-600 mt-1">
          Update your branch details and business hours.
        </p>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-6">
        {/* Branch Details Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Branch Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Branch Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={branchInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Enter branch name"
                />
                <div className="absolute right-3 top-3">
                  <span className="text-blue-600 font-medium">I</span>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={branchInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Enter branch address"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone Number */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={branchInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={branchInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Enter email address"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200"></div>

        {/* Business Hours Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-gray-600" />
            Business Hours
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Opening Time */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Opening Time
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={formatTimeDisplay(branchInfo.openingTime)}
                  onChange={(e) => handleInputChange('openingTime', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                {branchInfo.openingTime === '--:--' && (
                  <span className="absolute left-4 top-3 text-gray-400">--:--</span>
                )}
              </div>
            </div>

            {/* Closing Time */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Closing Time
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={formatTimeDisplay(branchInfo.closingTime)}
                  onChange={(e) => handleInputChange('closingTime', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                {branchInfo.closingTime === '--:--' && (
                  <span className="absolute left-4 top-3 text-gray-400">--:--</span>
                )}
              </div>
            </div>
          </div>

          {/* Working Days */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Working Days
            </label>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {allDays.map((day) => {
                const isSelected = branchInfo.workingDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleWorkingDay(day)}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-sm font-medium">{day}</span>
                    <div className="ml-2">
                      {isSelected ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200"></div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default BranchInfo;