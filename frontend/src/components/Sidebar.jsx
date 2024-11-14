import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
import './css/Sidebar.css'
import { FaUser, FaListAlt, FaCog, FaPowerOff } from 'react-icons/fa'; // Import icons

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
    <div className={`menu ${menuOpen ? "open" : ""}`}>
      <div>
      <button className="close" onClick={toggleMenu}>✖</button>
      </div>
      <ul>
        <li><Link to="/api/profile"><FaUser className="icon" /> Profile</Link></li>
        <li><Link to="/attendance"><FaListAlt className="icon" /> Attendance</Link></li>
        <li><Link to="/api/project"><FaListAlt className="icon" /> Projects</Link></li>
        <li><Link to="/apply-leave"><FaListAlt className="icon" /> Apply Leave</Link></li>
        <li><Link to="/performance"><FaListAlt className="icon" /> Performance</Link></li>
        <li><Link to="/salary"><FaListAlt className="icon" /> Salary</Link></li>
        <li><Link to="/api/login/forgotpassword"><FaCog className="icon" /> Change Password</Link></li>
        {
          role === 'admin' && (
            <li onClick={() => { navigate("/api/registration"); }} className="role-specific">
              <FaUser className="icon" /> Register
            </li>
          )
        }
        <li><Link to="/api/login" onClick={() => Cookies.remove("jwt")}><FaPowerOff className="icon" /> Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
