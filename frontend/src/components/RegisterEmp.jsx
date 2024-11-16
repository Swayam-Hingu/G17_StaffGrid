import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form' 
import './css/RegisterEmp.css'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const RegisterEmp = () => {
  const navigate = useNavigate();

  const {register, handleSubmit, formState: { errors }} = useForm();

  const submitHandler = async (data) => {
    const token = localStorage.getItem('token'); 
    console.log(token);
    try {
        const response = await axios.post('http://localhost:8000/api/register', {
            name: data.name,
            mail: data.mail,
            role: data.role
        }, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${token}` // Set the token in the Authorization header
            }
        });
        console.log("User registered successfully:", response.data);
    } catch (error) {
        console.log("ERROR: ", error.response ? error.response.data : error.message); // Log error response
    }
  };

  return (
    <div className="registerRmployeebackground">
    <div className="register-container">
      <h1 className="register-header">Register User</h1>
      <form className="register-form" onSubmit={handleSubmit(submitHandler)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
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
          <label htmlFor="mail">Email</label>
          <input
            type="email"
            name="mail"
            id="mail"
            className="form-control"
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
          <label htmlFor="role">Role</label>
          <input
            type="text"
            name="role"
            id="role"
            className="form-control"
            {...register("role", {
              required: "Role is required",
              validate: value => ["manager", "employee", "hr"].includes(value.toLowerCase()) || "Role must be either 'manager', 'employee', or 'hr'"
            })}
          />
          
        </div>
        {errors.role && <p className="error-message">{errors.role.message}</p>}
        <div className="form-submit">
          <input type="submit" value="Submit" className="submit-button" />
        </div>
      </form>
    </div>
    </div>
  );
};

export default RegisterEmp;
