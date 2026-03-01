import React from 'react';
import { Phone, Mail, MapPin, User } from 'lucide-react';

const BranchTable = ({ branches, onEdit, onDelete, onEmail }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="py-3 px-4 text-left font-medium text-gray-700">Branch Name</th>
            <th className="py-3 px-4 text-left font-medium text-gray-700">Address</th>
            <th className="py-3 px-4 text-left font-medium text-gray-700">Manager</th>
            <th className="py-3 px-4 text-left font-medium text-gray-700">Phone</th>
            <th className="py-3 px-4 text-left font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch, index) => (
            <tr 
              key={index} 
              className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}
            >
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-gray-900">{branch.name}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-gray-700">{branch.address}</td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">{branch.manager}</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-purple-600" />
                  <a 
                    href={`tel:${branch.phone}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    {branch.phone}
                  </a>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onEmail(branch)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="Send Email"
                  >
                    <Mail className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onEdit(branch)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                    title="Edit Branch"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(branch.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete Branch"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BranchTable;