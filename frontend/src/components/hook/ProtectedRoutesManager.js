import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoutesManager = () => {
  const userRole = Cookies.get('employeeRole');   
  
  if (userRole !== 'manager') {
    return <Navigate to="/api/homepage" />;   
  }

  return <Outlet />;  
};

export default ProtectedRoutesManager;
