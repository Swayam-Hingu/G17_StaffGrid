import React, { useState } from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form' 

const RegisterEmp = () => {
    

  const {register,handleSubmit,formState: { errors }} = useForm();
  
  

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
          <input type="Name" name="Name"
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
           {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </div>
         
        <div>
          <label>Email</label>
          <input type="email" name="mail"    
          {...register("mail", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Please enter a valid email address"
            }
          })}
          />
          {errors.mail && <p style={{ color: 'red' }}>{errors.mail.message}</p>}
        </div>
        <div>
          <label>Role</label>
          <input type="text" name="role"   
          {...register("role", {
            required: "Role is required",
            validate: value => ["manager", "employee", "hr"].includes(value.toLowerCase()) || "Role must be either 'manager', 'employee', or 'hr'"
          })}
           />
           {errors.role && <p style={{ color: 'red' }}>{errors.role.message}</p>}
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default RegisterEmp;
