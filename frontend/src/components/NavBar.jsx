// Nav.jsx
import {React, useEffect, useState} from 'react'; 
import axios from 'axios';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import './css/Navbar.css'

const Nav = ({ toggleMenu }) => {
  const navigate = useNavigate();
  const [ID, setID] = useState("");

  useEffect(() => {
    const ID = Cookies.get("employeeID");
    if (ID) {
      setID(ID);
    }
  }, []);

  const logoutsystem = async () => {
    try { 
      const response = await axios.get('http://localhost:8000/api/logout',{
        withCredentials: true,  
      });  
      Cookies.remove("jwt");
      console.log("Logout Done")
      navigate("/api/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }
  return (
    <div className="navbar">
      <div className='pr'>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <h3 className='sg' style={{cursor: 'pointer'}} onClick={() => navigate('/api/homepage')}>Staff Grid</h3>
      </div>
      <div className="right-icons"> 
        <button className="pro" onClick={() => navigate('/api/view')}>🔔 </button>
        <button className="pro">{ID}</button> 
        <button className="pro" onClick={()=>{logoutsystem()}}>LogOut</button>
      </div>
    </div>
  );
};

export default Nav;
