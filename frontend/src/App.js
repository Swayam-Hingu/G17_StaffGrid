import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css'; 
import Login from './components/Login';
import Nav from './components/Nav'
import RegisterEmp from './components/RegisterEmp';
import Forgotpassword from './components/Forgotpassword';
import ForgetPassword from './components/forgetpassword.jsx'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import HomePage from './pages/HomePage.js';
import Home from "./pages/home.js"

function App() {
  // const navigate = useNavigate();
  // useEffect(()=>{
  //   const jwt = Cookies.get("jwt");

  //   // if(!jwt) { navigate("/api/login"); }
  // },[]);

  const location = useLocation();

  // Define routes where you do not want to show the <Home /> component
  const hideHomeRoutes = ['/api/login', "/forget-password"];

  return (
    <>  
    {!hideHomeRoutes.includes(location.pathname) && <Home />}
    {/* <Home /> */}
    <Routes>
      <Route path='/api/login'element = {<Login/>}/>
      {/* <Route path='/profile 'element = {<Profile/>}/> */}
      <Route path='/' element = {<HomePage/>}/>
      <Route path='/api/registration'element = {<RegisterEmp/>}/>
      {/* <Route path='./components/forgetpassword.jsx' element={<ForgetPassword />} /> */}
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path='/api/login/changepassword'element = {<Forgotpassword/>}/>

      
    </Routes>
    </>
  );
}

export default App;
