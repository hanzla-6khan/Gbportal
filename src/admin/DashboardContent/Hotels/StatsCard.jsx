import React from 'react';

const StatsCard = ({ icon: Icon, title, value, subValue, trend, bgColor, textColor }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${bgColor} ${textColor} mr-4`}>
          <Icon className="text-xl" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold">${value}</p>
          {trend ? (
            <p className="text-sm text-green-600 flex items-center">{trend}</p>
          ) : (
            <p className="text-sm text-gray-500">{subValue}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
