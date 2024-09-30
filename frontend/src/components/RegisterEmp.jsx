import React, { useState } from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form' 

const RegisterEmp = () => {
    

  const {register,handleSubmit} = useForm();
  
  

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
    
    <div>
      {/* {flag && <h1>Login Done</h1>} */}
      <h1>Register Form</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        {/* <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div> */}
        <div>
          <label>Name</label>
          <input type="Name" name="Name"    {...register("name")} required />
        </div>
         
        <div>
          <label>Email</label>
          <input type="email" name="mail"    {...register("mail")} required />
        </div>
        <div>
          <label>Role</label>
          <input type="text" name="role"   {...register("role")} required />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default RegisterEmp;
