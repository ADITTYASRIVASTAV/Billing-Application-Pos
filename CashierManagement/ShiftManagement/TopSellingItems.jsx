import React from 'react';
import { useSelector } from 'react-redux';
import { selectTopSellingItems } from './ShilfSummarySlice/shiftSummarySlice';
import { TrendingUp, Crown, Star } from 'lucide-react';

const TopSellingItems = () => {
  const topItems = useSelector(selectTopSellingItems);

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-100 text-yellow-800';
      case 2:
        return 'bg-gray-100 text-gray-800';
      case 3:
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown size={16} />;
    if (rank <= 3) return <Star size={16} />;
    return <TrendingUp size={16} />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Top Selling Items</h2>
        <span className="text-sm text-gray-600">{topItems.length} products</span>
      </div>
      <div className="space-y-3">
        {topItems.map((item) => (
          <div key={item.rank} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full ${getRankColor(item.rank)}`}>
                <span className="flex items-center gap-1 text-sm font-semibold">
                  {item.rank}
                  {item.rank <= 3 && getRankIcon(item.rank)}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{item.sold} units</p>
              <p className="text-sm text-gray-600">${item.revenue.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingItems;