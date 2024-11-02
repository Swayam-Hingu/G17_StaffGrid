// Sidebar.jsx
import {React, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';

const Sidebar = ({ menuOpen, toggleMenu }) => {
  const navigate = useNavigate();

  const [role, setRole] = useState("");

  useEffect(() => {
    const empRole = Cookies.get("employeeRole");
    if (empRole) {
      setRole(empRole);
    }
  }, []);


  return (
    menuOpen && (
      <div className="menu">
        <button className="close" onClick={toggleMenu}>
          ✖
        </button>
        <ul>
          <li>Profile</li>
          <li><Link to="/attendance">Attendance</Link></li>
          <li>Projects</li>
          <li>Apply Leave</li>
          <li>Performance</li>
          <li>Salary</li>
          <li><Link to="/api/login/forgotpassword">Change Password</Link></li>
          { 
            role==='admin' && <li onClick={()=>{navigate("/api/registration")}}>Register</li>
          }
          <li>Logout</li>
        </ul>
      </div>
    )
  );
};

export default Sidebar;
