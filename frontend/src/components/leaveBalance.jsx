import React, { useEffect, useState } from 'react';
import './css/leaveBalance.css';
import { Link,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios'; 

const LeaveBalance = () => {
  const [leaveRecords, setLeaveRecords] = useState([
    { id: 1, applied: '2024-11-01', type: 'Sick Leave', from: '2024-11-01', to: '2024-11-02', days: 2, status: 'Pending' },
  ]);
  const empid = Cookies.get("employeeID");
  const token = Cookies.get("jwt11");
  const navigate = useNavigate();


  // Function to handle the cancellation of leave directly
  const handleCancelClick = async (leavedata) => {
    console.log("Delete This...",leavedata);
    const leaveId = leavedata.leaveID;
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_BASEURL}/api/leave/delete/${leaveId}` , {
          withCredentials: true,
          headers: {
              'Authorization': `Bearer ${token}`  
          }
      }); 
      getAllListofLeave();
      console.log(response)  

    } catch (error) {
        console.log("ERROR IS: ",error)
        if(error.response.data.error=="jwt malformed"){
          navigate("/api/login");
        }
    }
  };

  const getAllListofLeave = async () =>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASEURL}/api/leave/getsentleaves/${empid}` , {
          withCredentials: true,
          headers: {
              'Authorization': `Bearer ${token}`  
          }
      }); 
      console.log(response) 
      setLeaveRecords(response.data.sentLeave);

    } catch (error) {
        console.log("ERROR IS: ",error)
        if(error.response.data.error=="jwt malformed"){
          navigate("/api/login");
        }
    }
  }
  useEffect(()=>{
    getAllListofLeave();
  },[])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className='leave-container'>
    <div className="leave-balance-container">
      <h2 className="leave-title">Your Leave</h2>

      <div className="leave-info">
        <div className="leave-item">
          <h3>Applied</h3>
          <p>{leaveRecords.length}</p>
        </div>
        <div className="leave-item approved">
          <h3>Approved</h3>
          <p>{leaveRecords.filter((record) => record.
leaveStatus
 === 'Approved').length}</p>
        </div>
        <div className="leave-item pending">
          <h3>Pending</h3>
          <p>{leaveRecords.filter((record) => record.leaveStatus === 'Pending').length}</p>
        </div>
        <div className="leave-item rejected">
          <h3>Rejected</h3>
          <p>{leaveRecords.filter((record) => record.leaveStatus === 'Rejected').length}</p>
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
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.leaveType}</td>
              <td>{formatDate(record.appliedOn)}</td>
              <td>{formatDate(record.fromDate)}</td>
              <td>{formatDate(record.toDate)}</td>
              <td>{record.totalDays}</td>
              <td>{record.leaveStatus}</td>
              <td>
              {record.leaveStatus === "Pending" && (
                <button
                  className="cancel-button"
                  onClick={() => handleCancelClick(record)}
                >
                  Cancel
                </button>
              )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default LeaveBalance;
