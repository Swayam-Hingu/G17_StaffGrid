import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import "./css/leaveApprovel.css";

function LeaveApprpval() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [status, setStatus] = useState("");
  const [comments, setComments] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);

  const searchInputRef = useRef(null);

  const employees = [
    { id: 1, name: "Kishan Thakor", leaveType: "Casual Leave", from: "2023-11-01", to: "2023-11-05", days: 5, status: "Pending" },
    { id: 2, name: "Chirag Chaudhary", leaveType: "Vacation", from: "2023-11-10", to: "2023-11-15", days: 5, status: "Pending" },
    { id: 3, name: "Kashyap Trivadi", leaveType: "Time Pass", from: "2023-11-10", to: "2023-3-15", days: 100, status: "Pending" },
    // Add more employee data as needed
  ];

  const handleActionClick = (employee) => {
    setSelectedEmployee(employee);
    setStatus(employee.status || "Pending"); // Set initial status to Pending if not set
    setComments(""); // Clear comments for each new pop-up
    setShowPopup(true);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedEmployee) {
      selectedEmployee.status = status;
    }
    setShowPopup(false);
  };

  const handleSearch = () => {
    return employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const toggleSearchInput = () => {
    setShowSearchInput(true);
    setTimeout(() => searchInputRef.current.focus(), 100); // Focus on input when shown
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSearchInput(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="container">

      <table className="employee-table">
        <thead>
          <tr>
            <th>Action</th>
            <th>Name</th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Days</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {handleSearch().map((employee) => (
            <tr key={employee.id}>
              <td>
                <span
                  className="action-icon"
                  onClick={() => handleActionClick(employee)}
                >
                  ⋮
                </span>
              </td>
              <td>{employee.name}</td>
              <td>{employee.leaveType}</td>
              <td>{employee.from}</td>
              <td>{employee.to}</td>
              <td>{employee.days}</td>
              <td>{employee.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Leaverequest</h3>
            <div className="popup-field">
              <label>Status:</label>
              <select value={status} onChange={handleStatusChange}>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="popup-field">
              <label>Comments:</label>
              <textarea
                maxLength="50"
                value={comments}
                onChange={handleCommentsChange}
                placeholder="Add comments"
              />
              <p>{50 - comments.length} characters remaining (50 maximum)</p>
            </div>
            <button onClick={handleSubmit}>Save</button>
            <table className="popup-table">
              <tbody>
                <tr>
                  <td>Employee</td>
                  <td>{selectedEmployee.name}</td>
                  <td>Leave Type</td>
                  <td>{selectedEmployee.leaveType}</td>
                </tr>
                <tr>
                  <td>From</td>
                  <td>{selectedEmployee.from}</td>
                  <td>To</td>
                  <td>{selectedEmployee.to}</td>
                </tr>
                <tr>
                  <td>Leave For</td>
                  <td>{selectedEmployee.days > 1 ? `${selectedEmployee.days} days` : "Half day"}</td>
                  <td>Days</td>
                  <td>{selectedEmployee.days}</td>
                </tr>
                <tr>
                  <td>Applied On</td>
                  <td>{selectedEmployee.from}</td>
                </tr>
              </tbody>
            </table>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeaveApprpval;
