import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Search, Plus } from 'lucide-react';
import { setSearchQuery } from './CustomerManagementSlice/customerManagementSlice';

const CustomerSearch = ({ onAddNew }) => {
  const [localQuery, setLocalQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const value = e.target.value;
    setLocalQuery(value);
    dispatch(setSearchQuery(value));
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search customers by name, phone, or email..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          value={localQuery}
          onChange={handleSearch}
        />
      </div>
      <button
        onClick={onAddNew}
        className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add New
      </button>
    </div>
  );
};

export default CustomerSearch;