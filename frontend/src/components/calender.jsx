import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './css/calender.css';

const Calendar = ({ attendanceDates }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Highlight attendance dates
  const highlightDates = attendanceDates.map(date => new Date(date));

  return (
    <div className="calendar-container">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inline
        highlightDates={highlightDates}
        dayClassName={(date) =>
          highlightDates.some(d => d.toDateString() === date.toDateString())
            ? "highlight-attendance" // Add CSS class for highlighted dates
            : undefined
        }
      />
    </div>
  );
};

export default Calendar;
