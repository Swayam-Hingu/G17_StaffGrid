// // Nav.jsx
// import {React, useEffect, useState} from 'react';
// import axios from 'axios';
// import Cookies from "js-cookie";
// import { useNavigate } from 'react-router-dom';
// import './css/Navbar.css'

// const Nav = ({ toggleMenu }) => {
//   const navigate = useNavigate();
//   const [ID, setID] = useState("");
//   const token = Cookies.get("jwt11");

//   useEffect(() => {
//     const ID = Cookies.get("employeeID");
//     if (ID) {
//       setID(ID);
//     }
//   }, []);

//   const logoutsystem = async () => {
//     try {
//       console.log(token)
//       const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASEURL}/api/logout`,{
//         withCredentials: true,
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     },);
//       Cookies.remove("jwt11");
//       console.log("Logout Done")
//       navigate("/api/login");
//     } catch (error) {
//       console.error("Logout error:", error);
//       if(error.response.data.error=="jwt malformed"){
//         navigate("/api/login");
//       }
//     }
//   }
//   return (
//     <div className="navbar">
//       <div className='pr'>
//       <button className="hamburger" onClick={toggleMenu}>
//         ☰
//       </button>
//       <button>
//       <h3 className='sg' style={{cursor: 'pointer'}} onClick={() => navigate('/api/homepage')}>Staff Grid</h3>
//       </button>
//       </div>
//       <div className="right-icons">
//         <button className="pro" onClick={() => navigate('/api/view')}>🔔 </button>
//         <button className="pro">{ID}</button>
//         <button className="pro" onClick={()=>{logoutsystem()}}>LogOut</button>
//       </div>
//     </div>
//   );
// };

// export default Nav;

// Nav.jsx
import { React, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./css/Navbar.css";
import logo from "./images/staffgrid.jpg";
// import person from './images/person.png';
import PersonIcon from "@mui/icons-material/Person";
const Nav = ({ toggleMenu }) => {
  const navigate = useNavigate();
  const [ID, setID] = useState("");
  const token = Cookies.get("jwt11");

  useEffect(() => {
    const ID = Cookies.get("employeeID");
    if (ID) {
      setID(ID);
    }
  }, []);

  const logoutsystem = async () => {
    try {
      console.log(token);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/logout`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Cookies.remove("jwt11");
      console.log("Logout Done");
      navigate("/api/login");
    } catch (error) {
      console.error("Logout error:", error);
      if (error.response.data.error == "jwt malformed") {
        navigate("/api/login");
      }
    }
  };
  return (
    <div className="navbar">
      <div className="pr">
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
        <div
          className="sg"
          style={{ cursor: "pointer", fontSize: "25px" }}
          onClick={() => navigate("/api/homepage")}
        >
          {/* <p
            className="logochange"
            style={{ height: "43px", color: "white", marginLeft: "10px" }}
          >
            STAFF GRID
          </p> */}
        </div>
      </div>
      <div>
        <p
          className="logochange"
          
        >
          STAFF GRID
        </p>
      </div>
      <div className="right-icons">
        <div className="p1">
          <PersonIcon style={{ fontSize: "30px", marginTop: "3px" }} />
          <div className="n"> {ID}</div>
        </div>
        <div className="pro" onClick={() => navigate("/api/view")}>
          🔔
        </div>
        <div
          className="logout"
          onClick={() => {
            logoutsystem();
          }}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default Nav;
