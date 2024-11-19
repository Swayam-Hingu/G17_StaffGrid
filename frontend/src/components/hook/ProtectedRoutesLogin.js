import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoutesLogin = () => {
    const userToken = Cookies.get('jwt11');   
    
    if (!userToken) {
      return <Navigate to="/api/login" />;   
    }
  
    return <Outlet />;  
  };
  
  export default ProtectedRoutesLogin;