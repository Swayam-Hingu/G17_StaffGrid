import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoutesAdmin = () => {
  const userRole = Cookies.get('employeeRole');   
  
  if (userRole !== 'admin') {
    return <Navigate to="/api/homepage" />;   
  }

  return <Outlet />;  
};

export default ProtectedRoutesAdmin;
