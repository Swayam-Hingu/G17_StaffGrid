import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
import './css/Sidebar.css'
import axios from 'axios';
import { FaUser, FaListAlt, FaCog, FaPowerOff } from 'react-icons/fa'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = ({ menuOpen, toggleMenu }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const token = Cookies.get("jwt11");

  useEffect(() => {
    const empRole = Cookies.get("employeeRole");
    if (empRole) {
      setRole(empRole);
    }
  }, []);
  
  const logoutsystem = async () => {
    try { 
      // console.log(token)
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASEURL}/api/logout`,{
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    },);  
      Cookies.remove("jwt11");
      Cookies.remove("employeeID");
      Cookies.remove("employeeName");
      Cookies.remove("employeeRole");
      console.log("Logout Done")
      navigate("/api/login");
    } catch (error) {
      console.error("Logout error:", error);
      if(error.response.data.error=="jwt malformed"){
        toast.error("Session expired. Redirecting to login...");
        setTimeout(() => {
          navigate("/api/login");
        }, 2000);
      }
    }
  }


  return (
    <div className={`menu ${menuOpen ? "open" : ""}`}>
      <div className='closeborder'>
      <button className="close" onClick={toggleMenu}>✖</button>
      </div>
      <ul>
        <li><Link to="/api/profile"><FaUser className="icon" /> Profile</Link></li>
        <li><Link to="/attendance"><FaListAlt className="icon" /> Attendance</Link></li>
        {
          role != "hr" && <li><Link to="/api/project"><FaListAlt className="icon" /> Projects</Link></li>
        }
        {
          role != "admin" && <li><Link to="/api/leaveform"><FaListAlt className="icon" /> Apply Leave</Link></li> 
        }
        {
          role != "admin" && <li><Link to="/api/leave"><FaListAlt className="icon" /> View Leave</Link></li> 
        }
        {
          role == "admin" && <li><Link to="/api/approve"><FaListAlt className="icon" />Leave Handle</Link></li> 
        }
        
        {
          role == 'hr' && <li><Link to="/salary"><FaListAlt className="icon" /> Salary</Link></li>
        }        
        <li><Link to="/api/login/forgotpassword"><FaCog className="icon" /> Change Password</Link></li>
        {
          role === 'admin' && (
            <li><Link to="/api/allemployeeview"><FaListAlt className="icon" />All Employee View</Link></li>
          )
        }
        {
          (role == 'admin') && (
            <li><Link to="/api/uploadprojectadmin"><FaListAlt className="icon" />Upload Project</Link></li>
          )
        }
        {
          (role == 'manager') && (
            <li><Link to="/api/uploadprojectmanager"><FaListAlt className="icon" />Upload Project</Link></li>
          )
        }
        {
          role === 'admin' && (
            <li onClick={() => { navigate("/api/registration"); }} className="role-specific">
              <FaUser className="icon" /> Register
            </li>
          )
        }
        <li><Link to="/api/login" onClick={()=>{logoutsystem()}}><FaPowerOff className="icon" /> Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
