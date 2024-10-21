// Sidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ menuOpen, toggleMenu }) => {
  const navigate = useNavigate();
  return (
    menuOpen && (
      <div className="menu">
        <button className="close" onClick={toggleMenu}>
          ✖
        </button>
        <ul>
          <li>Profile</li>
          <li>Projects</li>
          <li>Apply Leave</li>
          <li>Performance</li>
          <li>Salary</li>
          <li>Change Password</li>
          <li onClick={()=>{navigate("/api/registration")}}>Register</li>
          <li>Logout</li>
        </ul>
      </div>
    )
  );
};

export default Sidebar;
