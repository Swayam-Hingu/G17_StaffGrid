import React, { useState } from 'react';
import '../components/css/home.css';    
import Cookies from 'js-cookie';


const HomePage = () => {
   
  const [employee, setEmployee] = useState({ 
    photoUrl: '/api/placeholder/150/150',
  });
  const employeename = Cookies.get("employeeID");

  return (
    <div className="homepage-container">
     
      <div className="main-content">
          
        <div className="welcome-container">
          <div className="welcome-content">
            <h1 className="welcome-text">WELCOME</h1>
            <div className="employee-welcome">
              <p className="employee-name-large">{employeename}</p>
              <p className="welcome-subtitle">We're glad to have you here</p> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default HomePage;
