import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Forgotpassword = () => {
  const { register: register1, handleSubmit: handleSubmit1, formState: { errors: errors1 } } = useForm();  
  const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 } } = useForm();
  const [userId, setuserId] = useState();
  const navigate = useNavigate(); 
  
  const submitHandler1 = async (data) => {
    try {
      const token = localStorage.getItem('token');
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
      const token = localStorage.getItem('token');
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
    <div>
      <h1>Forgot Password Page</h1>
      <form onSubmit={handleSubmit1(submitHandler1)}>
      <div>
          <label htmlFor="id">ID</label>
          <input
            type="text"
            name="id"
            id="id"
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
          {errors1.id && <p style={{ color: 'red' }}>{errors1.id.message}</p>}
        </div>

        <div>
           <input type="submit" value="GeneratePassword" className="btn btn-dark" />
        </div>
      </form>
      <form onSubmit={handleSubmit2(submitHandler2)}>
       
       
            <div>
              <label htmlFor="currpassword">Current Password</label>
              <input
                type="password"
                name="currpassword"
                id="currpassword"
                {...register2("currpassword", { required: "Current password is required" })}
              />
              {errors2.currpassword && <p style={{ color: 'red' }}>{errors2.currpassword.message}</p>}
            </div>

            <div>
              <label htmlFor="newpassword">New Password</label>
              <input
                type="password"
                name="newpassword"
                id="newpassword"
                {...register2("newpassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long"
                  }
                })}
              />
              {errors2.newpassword && <p style={{ color: 'red' }}>{errors2.newpassword.message}</p>}
            </div> 

        <div>
          <input type="submit" value="Submit" className="btn btn-dark" />
        </div>
      </form>
    </div>
  );
};

export default Forgotpassword;
