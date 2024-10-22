// Nav.jsx
import {React, useEffect, useState} from 'react'; 
import axios from 'axios';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

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
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <h3>Staff Grid</h3>
      <div className="right-icons">
        <button className="search">🔍</button>
        <button className="profile">👤 {ID}</button>
      {/* <Link  to='/api/login'>Login</Link>
      <Link   to='/api/registration'>RegisterEmployee</Link>  */}
      <button onClick={()=>{logoutsystem()}}>LogOut</button>
      </div>
    </div>
  );
};

export default Nav;
