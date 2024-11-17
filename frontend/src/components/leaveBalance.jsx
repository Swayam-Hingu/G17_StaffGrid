import React, { useState } from 'react';
import './css/leaveBalance.css';
import { Link } from 'react-router-dom';

const LeaveBalance = () => {
  const [leaveRecords, setLeaveRecords] = useState([
    { id: 1, applied: '2024-11-01', type: 'Sick Leave', from: '2024-11-01', to: '2024-11-02', days: 2, status: 'Pending' },
    { id: 2, applied: '2024-10-15', type: 'Annual Leave', from: '2024-10-15', to: '2024-10-19', days: 5, status: 'Approved' },
    { id: 3, applied: '2024-09-20', type: 'Emergency Leave', from: '2024-09-20', to: '2024-09-20', days: 1, status: 'Rejected' },
    { id: 4, applied: '2024-09-20', type: 'Emergency Leave', from: '2024-09-20', to: '2024-09-20', days: 1, status: 'Rejected' },
  ]);

  // Function to handle the cancellation of leave directly
  const handleCancelClick = (leave) => {
    setLeaveRecords((prevRecords) => prevRecords.filter((record) => record.id !== leave.id));
  };

  return (
    <div className="leave-balance-container">
      <h2 className="leave-title">Your Leave</h2>

      <div className="leave-info">
        <div className="leave-item">
          <h3>Applied</h3>
          <p>{leaveRecords.length}</p>
        </div>
        <div className="leave-item approved">
          <h3>Approved</h3>
          <p>{leaveRecords.filter((record) => record.status === 'Approved').length}</p>
        </div>
        <div className="leave-item pending">
          <h3>Pending</h3>
          <p>{leaveRecords.filter((record) => record.status === 'Pending').length}</p>
        </div>
        <div className="leave-item rejected">
          <h3>Rejected</h3>
          <p>{leaveRecords.filter((record) => record.status === 'Rejected').length}</p>
        </div>
      </div>

      <button className="apply-leave-button">
        <Link to="/api/leaveform">Apply Leave</Link>
      </button>

      <h3 className="leave-records-title">Leave Records</h3>
      <table className="leave-records-table">
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Applied On</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Days</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.type}</td>
              <td>{record.applied}</td>
              <td>{record.from}</td>
              <td>{record.to}</td>
              <td>{record.days}</td>
              <td>
                <button
                  className="cancel-button"
                  onClick={() => handleCancelClick(record)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveBalance;
