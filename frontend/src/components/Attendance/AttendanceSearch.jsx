// src/components/Attendance/AttendanceSearch.js
import React from 'react';

const AttendanceSearch = ({ month, onMonthChange }) => {
  const handleMonthChange = (event) => {
    onMonthChange(event.target.value);
  };

  return (
    <div className="attendance-search">
      <label style={{'margin-right':'20px' }}>Month</label>
      <input 
        type="month" 
        value={month} 
        onChange={handleMonthChange} 
        className="month-picker" 
      />
    </div>
  );
};

export default AttendanceSearch;
