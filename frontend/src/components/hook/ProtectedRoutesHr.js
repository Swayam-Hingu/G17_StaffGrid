import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoutesHr = () => {
  const userRole = Cookies.get('employeeRole');   
  
  if (userRole !== 'hr') {
    return <Navigate to="/api/homepage" />;   
  }

  return <Outlet />;  
};

export default ProtectedRoutesHr;
