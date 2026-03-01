import React from 'react';
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchFilter, setDateFilter, selectFilters } from '../OrderHistory/OrderHistorySlice/ordersSlice';

const OrderFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const dateFilters = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'custom', label: 'Custom' },
  ];

  return (
    <div className="mb-6 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by order ID or customer…"
          value={filters.search}
          onChange={(e) => dispatch(setSearchFilter(e.target.value))}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Date Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {dateFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => dispatch(setDateFilter(filter.id))}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              filters.dateRange === filter.id
                ? 'bg-blue-100 text-blue-700 border-blue-300'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderFilters;