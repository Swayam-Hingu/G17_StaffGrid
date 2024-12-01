import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';
import { Link ,useNavigate } from 'react-router-dom';
import './css/login.css';
import logo from './images/emslogo.png' 
import Cookies from 'js-cookie'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();

  const {register,handleSubmit,formState: { errors },reset} = useForm();

  const submitHandler = async (data) => {
    try{  
      
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/login`, {
        id: data.id,
        pass: data.pass, 
      },{
        withCredentials: true
      }); 
      console.log("Data is: ", response.data); 
      Cookies.set('jwt11', response.data.token); 
      Cookies.set('employeeID', response.data.emp.id);
      Cookies.set('employeeRole',response.data.emp.role);
      Cookies.set('employeeName',response.data.emp.name);

      // console.log("Login Token:: ",response.data.token);

      toast.success('Login successful!');

      setTimeout(() => {
        navigate("/api/homepage");
      }, 2000);

    }catch(error){
      reset();
      toast.error('Login failed. Please check ID & Password.');
      // alert("Login Error { Check ID & Password :<}")

      console.log("ERROR:" , error);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
      <div className="left-side"> 
        <div class="content-wrapper"> <h1 className="staff-grid">STAFF GRID</h1> 
          <img src={logo} alt="Staff Grid Logo" className="logo-image" /> 
        </div>
      </div>

      <div className="right-side">
        <h2 className="login">Login</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
        <div className="input-box"> 
                {/* <label htmlFor="password">password</label> */}
                <input type="id" name="id" id="id"  placeholder='Id'
                 {...register("id", {
                  required: "ID is required",
                  minLength: {
                    value: 10,
                    message: "ID must be at least 10 characters long"
                  }
                })}
                />
                {errors.id && <p style={{ color: 'red' }}  className="error-message">{errors.id.message}</p>}
            </div> 
            <div className="input-box"> 
                {/* <label htmlFor="password">password</label> */}
                <input type="password" name="password" id="password"  placeholder='Password'
                {...register("pass", {
                  required: "Password is required",
                })}
                />
                {errors.pass && <p style={{ color: 'red' }}  className="error-message">{errors.pass.message}</p>}
            </div> 
            
            <div >
                <input type="submit" value="Login"  className="login-btn"/>
            </div>
        </form>
        
          <Link to="/api/login/forgotpassword" className="forgot-password-btn">
            Forgot Password?
          </Link> 
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
    </div>
  )
}

export default Login
