import React from "react";
import {
  FileText,
  User,
  Store,
  Phone,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  User as UserIcon
} from "lucide-react";

const PendingRequests = () => {
  const requests = [
    {
      id: 1,
      storeName: "Aabha Fashion",
      owner: "Abhinav Gadhwal",
      contact: "-",
      businessType: "-",
      submittedOn: "Jul 14, 2025, 12:29 PM",
      hasDocuments: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pending Requests</h1>
          <p className="text-gray-600 mt-2">Review and approve new store registration requests</p>
        </div>

        {/* Store Registration Requests Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Store Registration Requests</h2>

          {/* Request Count */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-5 w-5 text-amber-500" />
              <span className="font-medium">1 Pending</span>
            </div>
            <div className="text-sm text-gray-500 font-medium">
              srivastavanu
            </div>
          </div>

          {/* Table - Responsive Design */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Store Name</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Owner</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Contact</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Business Type</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Submitted On</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Documents</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {requests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50 transition">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <Store className="h-5 w-5 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-900">{request.storeName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                          <span className="text-gray-700">{request.owner}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">{request.contact}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">{request.businessType}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{request.submittedOn}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center">
                          {request.hasDocuments ? (
                            <button className="p-2 hover:bg-blue-50 rounded-lg transition group">
                              <div className="relative">
                                <FileText className="h-6 w-6 text-blue-500 group-hover:text-blue-600" />
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                              </div>
                            </button>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition">
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden divide-y divide-gray-200">
              {requests.map((request) => (
                <div key={request.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="space-y-4">
                    {/* Store Name and Owner */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Store className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{request.storeName}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="p-1 bg-gray-100 rounded">
                              <UserIcon className="h-3 w-3 text-gray-600" />
                            </div>
                            <span className="text-sm text-gray-600">{request.owner}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact and Business Type */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Contact</span>
                        </div>
                        <p className="text-gray-900 ml-6">{request.contact}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Business Type</span>
                        </div>
                        <p className="text-gray-900 ml-6">{request.businessType}</p>
                      </div>
                    </div>

                    {/* Submitted Date */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Submitted On</span>
                      </div>
                      <p className="text-gray-900 ml-6 text-sm">{request.submittedOn}</p>
                    </div>

                    {/* Documents and Actions */}
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200">
                      <div className="space-y-1">
                        <span className="text-sm text-gray-600">Documents</span>
                        <div className="flex items-center">
                          {request.hasDocuments ? (
                            <button className="p-2 hover:bg-blue-50 rounded-lg transition group">
                              <div className="relative">
                                <FileText className="h-5 w-5 text-blue-500 group-hover:text-blue-600" />
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                              </div>
                            </button>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-sm text-gray-600">Actions</span>
                        <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition">
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              <span>1 Pending</span>
            </div>
            <div className="font-medium">srivastavanu</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingRequests;