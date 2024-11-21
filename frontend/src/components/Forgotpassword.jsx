
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Forgotpassword.css'
import Cookies from 'js-cookie'; 

import logo from './images/emslogo.png'



const Forgotpassword = () => {
  const { register: register1, handleSubmit: handleSubmit1, formState: { errors: errors1 } } = useForm();  
  const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 } } = useForm();
  const [userId, setuserId] = useState();
  const navigate = useNavigate(); 
  const token = Cookies.get("jwt11");



  const submitHandler1 = async (data) => {
    try { 
      
      console.log(data.id);
      setuserId(data.id);

      const response = await axios.patch('http://localhost:8000/api/login/sendmailforpasschange', {
        id: data.id
      }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      console.log("EmailSubmitHandler");
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const submitHandler2 = async (data) => {
    try { 
      console.log(userId, data.currpassword);

      const response = await axios.patch('http://localhost:8000/api/login/changepassword', {
        id: userId,
        currpassword: data.currpassword,
        newpassword: data.newpassword
      }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      console.log("DONE: change password");
      navigate('/api/login');  
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  return (
    <div className="password-reset-container forgotpage">
      <div className="password-reset-box">
       <h1 className="staff-grid">STAFF GRID</h1> 
         
        <h1 className="password-reset-title">Password Reset</h1>

        {/* First Form */}
        <form onSubmit={handleSubmit1(submitHandler1)} className="form">
          <div className="form-group">
            <label htmlFor="id"></label>
            <input
              type="text"
              name="id"
              placeholder='Employee ID'
              id="id"
              className="input-field"
              {...register1("id", {
                required: "ID is required",
                minLength: {
                  value: 10,
                  message: "ID must be exactly 10 characters long"
                },
                maxLength: {
                  value: 10,
                  message: "ID must be exactly 10 characters long"
                }
              })}
            />
            
          </div>
          {errors1.id && <p className="error-message">{errors1.id.message}</p>}

          <div className="form-group">
            <input type="submit" value="Generate Password" className="btn generate-btn" />
          </div>
        </form>

        {/* Second Form */}
        <form onSubmit={handleSubmit2(submitHandler2)} className="form">
          <div className="form-group">
            <label htmlFor="newpassword"></label>
            <input
              type="password"
              name="newpassword"
              placeholder='New Password'
              id="newpassword"
              className="input-field"
              {...register2("newpassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long"
                }
              })}
            />
            
          </div>
          {errors2.newpassword && <p className="error-message">{errors2.newpassword.message}</p>}
          <div className="form-group">
            <label htmlFor="currpassword"></label>
            <input
              type="password"
              name="currpassword"
              id="currpassword"
              placeholder='Confirm New Password'
              className="input-field"
              {...register2("currpassword", { required: "Confirmation password is required" })}
            />
            
          </div>
          {errors2.currpassword && <p className="error-message">{errors2.currpassword.message}</p>}
          <div className="form-group">
            <input type="submit" value="Confirm" className="btn confirm-btn"  />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;


