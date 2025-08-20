import React from "react";

const StatsCard = ({ title, value, change, icon, changeType = 'positive' }) => {
  // Determine change color based on type
  const changeColor = changeType === 'positive' 
    ? 'text-green-500' 
    : changeType === 'negative' 
      ? 'text-red-500' 
      : 'text-gray-500';

  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4 w-full">
      <div className="text-blue-600 flex-shrink-0">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-xs sm:text-sm text-gray-500 truncate">{title}</h3>
        <p className="text-base sm:text-lg font-bold truncate">{value}</p>
        <span className={`text-xs sm:text-sm ${changeColor} truncate`}>
          {change}
        </span>
      </div>
    </div>
  );
};

export default StatsCard;