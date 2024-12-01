import { React, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./css/Navbar.css";
import PersonIcon from "@mui/icons-material/Person";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      
      // console.log("Logout Done")
      toast.success('Logout successful!');
      
      navigate("/api/login");
    } catch (error) {
      toast.error('Logout error!');
      if(error.response.data.error=="jwt malformed"){
        toast.error("Session expired. Redirecting to login...");
        setTimeout(() => {
          navigate("/api/login");
        }, 2000);
      }
    }
  }
  return (
    <div className="navbar">
      <div className="pr">
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
      </div>
      <div>
        <p
          className="logochange"
          onClick={() => navigate('/api/homepage')}
          style={{cursor: "pointer"}}
        >
          STAFF GRID
        </p>
      </div>
      <div className="right-icons">
        <div className="p1">
          <PersonIcon style={{ fontSize: "30px", marginTop: "3px" ,cursor: "pointer"}} onClick={()=>navigate('api/profile')}/>
          <div className="n" onClick={()=>navigate('api/profile')}style={{cursor: "pointer"}}> {ID}</div>
        </div>
        <div className="pro" onClick={() => navigate("/api/view")}style={{cursor: "pointer"}}>
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Nav;
