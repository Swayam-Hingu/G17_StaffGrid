// src/components/Attendance/Attendance.js

import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import AttendanceTable from './AttendanceTable';
import AttendanceSearch from './AttendanceSearch';
import Calendar from '../calender';
import '../css/Attendance.css';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));

  useEffect(() => {
    const data = [
      { date: '2024-10-01', login: '08:45', logout: '17:00', workHours: '8:15' },
      { date: '2024-10-02', login: '08:50', logout: '17:05', workHours: '8:15' },
      { date: '2024-10-03', login: '08:40', logout: '17:00', workHours: '8:20' },
      { date: '2024-10-04', login: '08:45', logout: '16:50', workHours: '8:05' },
      { date: '2024-10-05', login: '08:50', logout: '17:10', workHours: '8:20' },
      { date: '2024-10-06', login: '08:55', logout: '17:05', workHours: '8:10' },
      { date: '2024-10-07', login: '08:47', logout: '16:55', workHours: '8:08' },
      { date: '2024-10-08', login: '08:48', logout: '17:00', workHours: '8:12' },
      { date: '2024-10-09', login: '08:42', logout: '17:00', workHours: '8:18' },
      { date: '2024-10-10', login: '08:50', logout: '17:05', workHours: '8:15' },
      { date: '2024-10-11', login: '08:46', logout: '16:58', workHours: '8:12' },
      { date: '2024-10-12', login: '08:53', logout: '17:03', workHours: '8:10' },
      { date: '2024-10-13', login: '08:41', logout: '16:56', workHours: '8:15' },
      { date: '2024-10-14', login: '08:45', logout: '17:00', workHours: '8:15' },
      { date: '2024-10-15', login: '08:49', logout: '16:57', workHours: '8:08' },
      { date: '2024-10-16', login: '08:55', logout: '17:02', workHours: '8:07' },
      { date: '2024-10-17', login: '08:50', logout: '17:05', workHours: '8:15' },
      { date: '2024-10-18', login: '08:47', logout: '16:53', workHours: '8:06' },
      { date: '2024-10-19', login: '08:52', logout: '17:06', workHours: '8:14' },
      { date: '2024-10-20', login: '08:45', logout: '16:59', workHours: '8:14' },
      { date: '2024-10-21', login: '08:51', logout: '17:03', workHours: '8:12' },
      { date: '2024-10-22', login: '08:42', logout: '16:57', workHours: '8:15' },
      { date: '2024-10-23', login: '08:50', logout: '17:00', workHours: '8:10' },
      { date: '2024-10-24', login: '08:53', logout: '17:05', workHours: '8:12' },
      { date: '2024-10-25', login: '08:48', logout: '17:01', workHours: '8:13' },
      { date: '2024-10-26', login: '08:46', logout: '17:00', workHours: '8:14' },
      { date: '2024-10-27', login: '08:44', logout: '16:58', workHours: '8:14' },
      { date: '2024-10-28', login: '08:50', logout: '17:04', workHours: '8:14' },
      { date: '2024-10-29', login: '08:48', logout: '17:02', workHours: '8:14' },
    
    
    ];
    setAttendanceData(data);
    setFilteredData(data);
  }, []);

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
    const newFilteredData = attendanceData.filter(item => item.date.startsWith(newMonth));
    setFilteredData(newFilteredData);
  };

  const attendanceDates = attendanceData.map(record => record.date);

  return (
    <div className="dashboard-container">
      {/* Page Heading */}
      <Typography variant="h3" className="dashboard-heading">
        Attendance Dashboard
      </Typography>

      <div className="dashboard-content">
        {/* Month Selector */}
        <div className="month-selector">
          <AttendanceSearch month={month} onMonthChange={handleMonthChange} />
        </div>

        {/* Attendance Table */}
        <div className="card table-card scrollable-table">
          <AttendanceTable data={filteredData} />
        </div>
      </div>

      {/* Fixed Calendar */}
      <div className="calendar-fixed">
        <Calendar attendanceDates={attendanceDates} />
      </div>
    </div>
  );
};

export default Attendance;
