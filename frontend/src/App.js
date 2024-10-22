import { Route, Routes, useLocation,Navigate } from 'react-router-dom';
import './App.css'; 
import Login from './components/Login'; 
import RegisterEmp from './components/RegisterEmp';
import Forgotpassword from './components/Forgotpassword'; 
import React from 'react';
import HomePage from './pages/HomePage.js';
import Home from "./pages/home.js"

function App() {
  const location = useLocation();
 
  const hideHomeRoutes = ['/api/login', "/api/login/forgotpassword"];

  return (
    <>  
    {!hideHomeRoutes.includes(location.pathname) && <Home />} 
    <Routes>
      <Route exact path="/" element={<Navigate to="/api/login" />} />
      <Route path='/api/login'element = {<Login/>}/> 
      <Route path='/' element = {<HomePage/>}/>
      <Route path='/api/registration'element = {<RegisterEmp/>}/> 
      <Route path="/api/login/forgotpassword" element={<Forgotpassword />} />
      <Route path='/api/login/changepassword'element = {<Forgotpassword/>}/>      
    </Routes>
    </>
  );
}

export default App;
