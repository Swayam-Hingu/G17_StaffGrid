
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Forgotpassword.css'
import Cookies from 'js-cookie';  
import { toast, ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 

const Forgotpassword = () => {
  const { register: register1, handleSubmit: handleSubmit1, formState: { errors: errors1 } } = useForm();  
  const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 }, getValues} = useForm();
  const [userId, setuserId] = useState();
  const navigate = useNavigate(); 
  const token = Cookies.get("jwt11");


  const submitHandler1 = async (data) => {
    try { 
      toast.info('Loding for send mail');
      
      // console.log(data.id);
      setuserId(data.id);
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND_BASEURL}/api/login/sendmailforpasschange`, {
        id: data.id
      }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log(response);
      // console.log("EmailSubmitHandler");
      // alert('Email is Sent');
      
    } catch (error) {
      // alert('Resend Again');
      toast.error('Failed to send email. Try again');
      // console.log("ERROR:", error);
      if(error.response.data.error=="jwt malformed"){
        toast.error("Session expired. Redirecting to login...");
        setTimeout(() => {
          navigate("/api/login");
        }, 2000);
        
      }
    }
  };

  const submitHandler2 = async (data) => {
    try { 
      // console.log(userId, data.currpassword);

      const response = await axios.patch(`${process.env.REACT_APP_BACKEND_BASEURL}/api/login/changepassword`, {
        id: userId,
        currpassword: data.currpassword,
        newpassword: data.newpassword
      }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log(response);
      // console.log("DONE: change password");
      toast.success('Password changed successfully');
      setTimeout(() => {
        navigate("/api/login");
      }, 2000); 
    } catch (error) {
      // console.log("ERROR:", error);
      // alert('Error In Form Submission');
      toast.error('Error in changing password. Please try again');
      if(error.response.data.error=="jwt malformed"){
        toast.error("Session expired. Redirecting to login...");
        setTimeout(() => {
          navigate("/api/login");
        }, 2000);
      }
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
            <label htmlFor="cnp"></label>
            <input
              type="password"
              name="cnp"
              placeholder='Confirm Password'
              id="cnp"
              className="input-field"
              {...register2("cnp", {
                required: "Confirm password is required",
                minLength: {
                  value: 6,
                  message: "Confirm Password must be at least 6 characters"
                },
                validate: (value) => {
                  // console.log(value,getValues("newpassword"))
                  if (value !== getValues("newpassword")) {
                    return "Passwords do not match";
                  }
                  return true;
                }
              })}
              
            />
            
          </div>
          {errors2.cnp && <p className="error-message">{errors2.cnp.message}</p>}
          <div className="form-group">
            <label htmlFor="currpassword"></label>
            <input
              type="password"
              name="currpassword"
              id="currpassword"
              placeholder='OTP'
              className="input-field"
              {...register2("currpassword", { required: "OTP password is required" })}
            />
            
          </div>
          {errors2.currpassword && <p className="error-message">{errors2.currpassword.message}</p>}
          <div className="form-group">
            <input type="submit" value="Confirm" className="btn confirm-btn"  />
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

export default Forgotpassword;


