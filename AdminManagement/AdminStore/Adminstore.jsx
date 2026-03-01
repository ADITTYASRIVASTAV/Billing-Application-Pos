import React from "react";
import { 
  Search, 
  Filter, 
  MoreVertical,
  CheckCircle,
  Clock,
  XCircle,
  Store,
  Phone,
  Mail,
  Calendar,
  User
} from "lucide-react";

const AdminStores = () => {
  const stores = [
    {
      id: 1,
      name: "zosh shopping",
      owner: "raam",
      phone: "",
      email: "",
      status: "Active",
      registeredOn: "Jun 30, 2025, 04:03 PM"
    },
    {
      id: 2,
      name: "Rutika Shopping",
      owner: "Rutika",
      phone: "8765981231",
      email: "rutika.store@gmail.com",
      status: "Active",
      registeredOn: "Jul 1, 2025, 12:48 PM"
    },
    {
      id: 3,
      name: "Aabha Fashion",
      owner: "Abhinav Gadhwal",
      phone: "",
      email: "",
      status: "Active",
      registeredOn: "Jul 14, 2025, 12:29 PM"
    }
  ];

const getStatusIcon = (status) => {
  switch (status) {
    case "Active":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "Pending":
      return <Clock className="h-4 w-4 text-amber-500" />;
    case "Blocked":
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return null;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "bg-green-50 text-green-700 border-green-200";
    case "Pending":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "Blocked":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Stores</h1>
          <p className="text-gray-600 mt-2">Manage all registered stores and their status</p>
        </div>

        {/* All Stores Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">All Stores</h2>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search stores, owners, emails..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select className="pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white">
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Blocked</option>
              </select>
            </div>
          </div>

          {/* Actions Dropdown */}
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Actions</p>
            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition">
                <CheckCircle className="h-4 w-4" />
                Active
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 transition">
                <Clock className="h-4 w-4" />
                Pending
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition">
                <XCircle className="h-4 w-4" />
                Blocked
              </button>
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
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Phone</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Update Status</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Registered On</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stores.map((store) => (
                    <tr key={store.id} className="hover:bg-gray-50 transition">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <Store className="h-5 w-5 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-900">{store.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                          <span className="text-gray-700">{store.owner}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700">{store.phone || "-"}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-700 truncate max-w-xs">
                            {store.email || "-"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(store.status)}`}>
                          {getStatusIcon(store.status)}
                          <span className="text-sm font-medium">{store.status}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <select 
                          className={`px-3 py-1 rounded-lg border ${getStatusColor(store.status)} text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                          defaultValue={store.status}
                        >
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="Blocked">Blocked</option>
                        </select>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{store.registeredOn}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                          <MoreVertical className="h-5 w-5 text-gray-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden divide-y divide-gray-200">
              {stores.map((store) => (
                <div key={store.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="space-y-4">
                    {/* Store Name and Actions */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Store className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{store.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="p-1 bg-gray-100 rounded">
                              <User className="h-3 w-3 text-gray-600" />
                            </div>
                            <span className="text-sm text-gray-600">{store.owner}</span>
                          </div>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <MoreVertical className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Phone</span>
                        </div>
                        <p className="text-gray-900 ml-6">{store.phone || "-"}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Email</span>
                        </div>
                        <p className="text-gray-900 ml-6 truncate">{store.email || "-"}</p>
                      </div>
                    </div>

                    {/* Status Section */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-sm text-gray-600">Status</span>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(store.status)}`}>
                          {getStatusIcon(store.status)}
                          <span className="text-sm font-medium">{store.status}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-sm text-gray-600">Update Status</span>
                        <select 
                          className={`w-full px-3 py-1 rounded-lg border ${getStatusColor(store.status)} text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                          defaultValue={store.status}
                        >
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="Blocked">Blocked</option>
                        </select>
                      </div>
                    </div>

                    {/* Registration Date */}
                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Registered On:</span>
                        <span className="text-sm text-gray-900">{store.registeredOn}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStores;