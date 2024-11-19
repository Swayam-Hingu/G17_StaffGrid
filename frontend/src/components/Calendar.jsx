import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
  import 'react-datepicker/dist/react-datepicker.css';
  import './css/calender.css';

const Calendar = ({attendanceDates, leaveDatas, absDatas}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log("---------------------><>",absDatas)
 
  const attendanceMap = attendanceDates.reduce((map, { date, status }) => {
    map[new Date(date).toDateString()] = status;
    return map;
  }, {});

  const isLeaveDate = (date) => {
    return leaveDatas.some(({ fromDate, toDate }) => {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      const targetDate = new Date(date);
  
      return targetDate >= from && targetDate <= to;
    });
  };

  const isAbsentDate = (date) => {
    return absDatas.some((abs) => new Date(abs.date).toDateString() === date.toDateString());
  };
  


  const dayClassName = (date) => {
    const dateString = date.toDateString();

    // Highlight attendance days
    if (attendanceMap[dateString]) {
      return attendanceMap[dateString] === 'present'
        ? 'highlight-green' // Green for present
        : 'highlight-red'; // Red for absent
    }

    if (isAbsentDate(date)) {
      return 'highlight-red'; // Red for absences that coincide with leave
    }

    if (isLeaveDate(date)) {
      return 'highlight-yellow'; // Yellow for leave
    }

    // Highlight weekends
    if (date.getDay() === 6 || date.getDay() === 0) {
      return 'highlight-purple'; // Purple for weekends
    } 

    return ''; // Default class
  };

  return (
    <div className="calendar-container">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inline
        dayClassName={dayClassName}
        showMonthDropdown // Enables the month dropdown
        showYearDropdown // Enables the year dropdown
        dropdownMode="select" // Allows selecting month/year
      />
    </div>
  );
};

export default Calendar;
