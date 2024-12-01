import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoutesManager = () => {
  const userRole = Cookies.get('employeeRole');   
  console.log("User Role is: ",userRole)
  if (userRole !== 'manager') {
    return <Navigate to="/api/homepage" />;   
  }

  return <Outlet />;  
};

export default ProtectedRoutesManager;
