import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import "./css/leaveApprovel.css";
import { faEllipsisV, faSearch, faEdit } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link ,useNavigate } from 'react-router-dom';


function LeaveApproval() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const empid = Cookies.get("employeeID");
  const token = Cookies.get("jwt11");
  const navigate = useNavigate();

 

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const [employees, setEmployees] = useState([]);

  const handleActionClick = (employee) => {
    console.log(employee)
    setSelectedEmployee(employee);
    // setValue("status", employee.leaveStatus || "Pending");  // Set initial status
    // setValue("comments", "");  // Clear comments field
    setShowPopup(true);
  };

 
  const onSubmit = (data) => {
    if (selectedEmployee) {
      selectedEmployee.leaveStatus = data.leaveStatus;
      selectedEmployee.comment = data.comment;
    } 
    console.log(selectedEmployee);
    updateLeaveStatus();
  };

  const getAllListFirst = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASEURL}/api/leave/getallleavedetails` , {
          withCredentials: true,
          headers: {
              'Authorization': `Bearer ${token}`  
          }
      }); 
      console.log(response.data.receivedLeaves)
      setEmployees(response.data.receivedLeaves);  

    } catch (error) {
        console.log("ERROR IS: ",error)
        if(error.response.data.error=="jwt malformed"){
          navigate("/api/login");
        }
    }
  }


  const updateLeaveStatus = async () => {
    console.log("SE is here, ",selectedEmployee)
    if (!selectedEmployee) return;  
    const leaveId = selectedEmployee.leaveID;
    console.log("leave id: ",leaveId)
    try {
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND_BASEURL}/api/leave/update/${leaveId}`, {
        leaveStatus: selectedEmployee.leaveStatus,
        comment: selectedEmployee.comment
      }, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }); 
      console.log(response.data)
      getAllListFirst();
      setShowPopup(false);
  
    } catch (error) {
      console.log("ERROR IS: ", error)
      if(error.response.data.error=="jwt malformed"){
        navigate("/api/login");
      }
    }
  }; 

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };


  useEffect(() => {
    getAllListFirst(); 
  }, []);

  return (
    <div className="container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Action</th>
            <th>Id</th> 
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Days</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.senderId}>
              <td>
                <span
                  className="action-icon"
                  onClick={() => handleActionClick(employee)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </span>
              </td> 
              <td>{employee.senderId}</td>
              <td>{employee.leaveType}</td>
              <td>{formatDate(employee.fromDate)}</td>
              <td>{formatDate(employee.toDate)}</td>
              <td>{employee.totalDays}</td>
              <td>{employee.leaveStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Leave Request</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="popup-field">
                <label>Status:</label>
                <select {...register("leaveStatus", { required: "Status is required" })}>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
                {errors.status && <span>{errors.status.message}</span>}
              </div>

              <div className="popup-field">
                <label>Comments:</label>
                <textarea
                  {...register("comment", { maxLength: { value: 50, message: "Max length is 50 characters" } })}
                  placeholder="Add comments"
                />
                {errors.comments && <span>{errors.comments.message}</span>}
                <p>{50 - (selectedEmployee?.comments?.length || 0)} characters remaining (50 max)</p>
              </div>

              <button type="submit">Save</button>
            </form>

            <table className="popup-table">
              <tbody>
                <tr>
                  <td>Employee</td>
                  <td>{selectedEmployee.senderId}</td>
                  <td>Leave Type</td>
                  <td>{selectedEmployee.leaveType}</td>
                </tr>
                <tr>
                  <td>From</td>
                  <td>{formatDate(selectedEmployee.fromDate)}</td>
                  <td>To</td>
                  <td>{formatDate(selectedEmployee.toDate)}</td>
                </tr>
                <tr>
                  
                  <td>Days</td>
                  <td>{selectedEmployee.totalDays}</td>
                </tr>
                <tr>
                  <td>Applied On</td>
                  <td>{formatDate(selectedEmployee.appliedOn)}</td>
                </tr>
              </tbody>
            </table>
            <button className="close" onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeaveApproval;
