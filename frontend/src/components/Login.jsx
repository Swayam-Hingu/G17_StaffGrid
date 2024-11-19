import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';
import { Link ,useNavigate } from 'react-router-dom';
import './css/login.css';
import logo from './images/emslogo.png' 
// import ForgetPassword from './forgetpassword.jsx'
import Cookies from 'js-cookie'; 


const Login = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    const jwt = Cookies.get("jwt11");

    if(jwt) { navigate("/api/homepage"); }
  },);

  const {register,handleSubmit,formState: { errors },reset} = useForm();

  const submitHandler = async (data) => {
    try{  
      
      const response = await axios.post('http://localhost:8000/api/login', {
        id: data.id,
        pass: data.pass, 
      },{
        withCredentials: true
      }); 
      console.log("Data is: ", response.data);
      // console.log("EmployeeID: ",response.data.emp.id)
      // console.log("EmployeeRole: ",response.data.emp.role)
      Cookies.set('jwt11', response.data.token); 
      Cookies.set('employeeID', response.data.emp.id);
      Cookies.set('employeeRole',response.data.emp.role);
      Cookies.set('employeeName',response.data.emp.name);

      console.log("Login Token:: ",response.data.token);

      navigate("/api/homepage");

    }catch(error){
      reset();
      alert("Login Error { Check ID & Password :<}")

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



      </div>
        {/* <h1 >Login Page</h1> */}
        {/* <form onSubmit={handleSubmit(submitHandler)}>
            <div>
                <label htmlFor="id">ID</label>
                <input type="text" name="id" id="id" 
                {...register("id", {
                  required: "ID is required",
                  minLength: {
                    value: 10,
                    message: "ID must be at least 10 characters long"
                  }
                })}
                />
                {errors.id && <p style={{ color: 'red' }}>{errors.id.message}</p>}
            </div>
            <div>
                <label htmlFor="password">password</label>
                <input type="password" name="password" id="password" 
                {...register("pass", {
                  required: "Password is required",
                })}
                />
                {errors.pass && <p style={{ color: 'red' }}>{errors.pass.message}</p>}
            </div> 
            <div>
                <input type="submit" value="Submit" className="btn btn-dark"/>
            </div>
        </form> */}
        {/* <Link to="/api/login/chcangepassword">Forgot password</Link> */}
    </div>
  )
}

export default Login
