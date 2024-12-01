import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form' 
import './css/RegisterEmp.css'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EMAIL_VALIDATION_API_KEY =  process.env.REACT_APP_EMAIL_VALIDATION_API_KEY; 
console.log(EMAIL_VALIDATION_API_KEY)

const RegisterEmp = () => {
  const navigate = useNavigate();

  const {register, handleSubmit, formState: { errors }, reset} = useForm();


  const validateEmail = async (email) => {
    
    try {
      const response = await axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${EMAIL_VALIDATION_API_KEY}&email=${email}`
      );
      return response.data.is_valid_format.value && response.data.deliverability === 'DELIVERABLE';
    } catch (error) {
      console.error('Email validation error:', error);
      return false;
    }
  };

  const submitHandler = async (data) => {
    const token = Cookies.get("jwt11");


    const isEmailValid = await validateEmail(data.mail);
    // const isEmailValid=true;
    // console.log(isEmailValid)
    if (!isEmailValid) {
      alert("The email address is invalid or undeliverable. Please provide a valid email.");
      return;  
    }

    console.log(token);
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/register`, {
            name: data.name,
            mail: data.mail,
            role: data.role
        }, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });
        // console.log("User registered successfully:", response.data);
        reset();
        toast.success("Employee registered successfully!");
        
    } catch (error) {
        // console.log("ERROR: ", error.response ? error.response.data : error.message);  
        toast.error("Error occurred during registration. Please try again.");
        if(error.response.data.error=="jwt malformed"){
        toast.error("Session expired. Redirecting to login...");
          setTimeout(() => {
            navigate("/api/login");
          }, 2000);
        }
    }
  };

  return (
    <div className="registerRmployeebackground">
    <div className="register-container">
      <h1 className="register-header">Register User</h1>
      <form className="register-form" onSubmit={handleSubmit(submitHandler)}>
        <div className="form-group">
          <label className='l1'  htmlFor="name">Name :</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters long"
              },
              maxLength: {
                value: 50,
                message: "Name cannot exceed 50 characters"
              }
            })}
          />
          
        </div>
        {errors.name && <p className="error-message">{errors.name.message}</p>}

        <div className="form-group">
          <label className='l1' htmlFor="mail">Email :</label>
          <input
            className="form-control"
            type="text"
            name="mail"
            id="mail"
            
            {...register("mail", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Please enter a valid email address"
              }
            })}
          />
         
        </div>
        {errors.mail && <p className="error-message">{errors.mail.message}</p>}

          <div className="form-group">
            <label className='l1' htmlFor="role">Role :</label>
            <select
              name="role"
              id="role"
              className="form-control"
              {...register("role", {
                required: "Role is required",
                validate: value => ["manager", "employee", "hr"].includes(value.toLowerCase()) || "Role must be either 'manager', 'employee', or 'hr'"
              })}
            >
              <option value="">Select a Role</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
              <option value="hr">HR</option>
            </select>
          </div>

          {errors.role && <p className="error-message">{errors.role.message}</p>}
          <div className="form-submit">
            <input  type="submit" value="Submit" className="submitbut" style={{ width: "100%" }} />
          </div>
      </form>
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
  );
};

export default RegisterEmp;
