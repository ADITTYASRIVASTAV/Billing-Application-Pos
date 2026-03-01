import React from 'react';
import { useSelector } from 'react-redux';
import { selectCashier, selectShift } from './ShilfSummarySlice/shiftSummarySlice';
import { User, Clock, Calendar } from 'lucide-react';

const ShiftInformation = () => {
  const cashier = useSelector(selectCashier);
  const shift = useSelector(selectShift);

  const formatTime = (timeString) => {
    if (!timeString) return 'Ongoing';
    return new Date(timeString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const calculateDuration = () => {
    const start = new Date(shift.startTime);
    const end = shift.endTime ? new Date(shift.endTime) : new Date();
    const diffMs = end - start;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Shift Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <div className="p-2 bg-blue-100 rounded-lg">
            <User className="text-blue-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Cashier</p>
            <p className="font-semibold text-gray-900">{cashier.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <div className="p-2 bg-green-100 rounded-lg">
            <Clock className="text-green-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Shift Start</p>
            <p className="font-semibold text-gray-900">{formatTime(shift.startTime)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Clock className="text-purple-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Shift End</p>
            <p className="font-semibold text-gray-900">
              {shift.endTime ? formatTime(shift.endTime) : 'Ongoing'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Calendar className="text-orange-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Duration</p>
            <p className="font-semibold text-gray-900">{calculateDuration()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftInformation;