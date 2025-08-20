import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TimeRangeSelector = ({ timeRange, setTimeRange, startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex space-x-2">
          {['week','month','quarter','year'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                timeRange === range ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {`This ${range.charAt(0).toUpperCase() + range.slice(1)}`}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="border rounded-md p-2 text-sm"
          />
          <span>to</span>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="border rounded-md p-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default TimeRangeSelector;
