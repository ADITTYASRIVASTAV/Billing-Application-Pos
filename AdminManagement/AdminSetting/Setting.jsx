import React from "react";
import { User, Phone, Mail, Shield, Bell, Settings } from "lucide-react";

const SettingsProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account and system preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Settings Menu */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="space-y-1">
                <button className="flex items-center space-x-3 w-full p-3 text-left bg-blue-50 text-blue-700 rounded-lg">
                  <User className="h-5 w-5" />
                  <span className="font-medium">Profile</span>
                </button>
                <button className="flex items-center space-x-3 w-full p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg">
                  <Shield className="h-5 w-5" />
                  <span className="font-medium">Security</span>
                </button>
                <button className="flex items-center space-x-3 w-full p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg">
                  <Bell className="h-5 w-5" />
                  <span className="font-medium">Notifications</span>
                </button>
                <button className="flex items-center space-x-3 w-full p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg">
                  <Settings className="h-5 w-5" />
                  <span className="font-medium">System</span>
                </button>
              </div>

              {/* Divider */}
              <div className="my-6">
                <hr className="border-gray-300" />
              </div>

              {/* Bottom email display */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm truncate">srivastavanurag084@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Profile Information */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Profile Information</h2>

              {/* Full Name Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <input
                    type="text"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Enter your full name"
                    defaultValue="zosh"
                  />
                </div>
              </div>

              {/* Phone Number Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <Phone className="h-5 w-5 text-gray-600" />
                  </div>
                  <input
                    type="tel"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Email Address Field */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <Mail className="h-5 w-5 text-gray-600" />
                  </div>
                  <input
                    type="email"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Enter your email address"
                    defaultValue="codewithzosh@gmail.com"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="my-6">
                <hr className="border-gray-300" />
              </div>

              {/* Update Profile Button */}
              <div className="flex justify-end">
                <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsProfile;