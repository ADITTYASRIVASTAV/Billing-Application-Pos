import React from 'react';
import { LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { endShift } from '../ShiftManagement/ShilfSummarySlice/shiftSummarySlice';

const ShiftReportHeader = () =>
     {

  const dispatch = useDispatch();

  const handleEndShift = () => {
    dispatch(endShift());
    // In real app, this would also navigate to login
    console.log('Shift ended and logged out');
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Shift Summary</h1>
        <p className="text-gray-600 mt-1">Daily performance overview</p>
      </div>
      <button
        onClick={handleEndShift}
        className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-sm"
      >
        <LogOut size={20} />
        End Shift & Logout
      </button>
    </div>
  );
  
};

export default ShiftReportHeader;