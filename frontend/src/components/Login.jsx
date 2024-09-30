import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';

const Login = () => {

  const {register,handleSubmit} = useForm();

  const submitHandler = async (data) => {
    try{  
      console.log(data.mail,data.pass)

      const response = await axios.post('http://localhost:8000/api/login', {
        mail: data.mail,
        pass: data.pass,
        role: data.role
      });
      localStorage.setItem('token', response.data.token);
      console.log("Data is: ", response.data);
    }catch(error){
      console.log("ERROR:" , error);
    }
  }

  return (
    <div>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
            <div>
                <label htmlFor="email">email</label>
                <input type="email" name="email" id="email" {...register("mail")}/>
            </div>
            <div>
                <label htmlFor="password">password</label>
                <input type="password" name="password" id="password" {...register("pass")}/>
            </div>
            <div>
                <label htmlFor="role">Role</label>
                <input type="role" name="role" id="role" {...register("role")}/>
            </div>
            <div>
                <input type="submit" value="Submit" className="btn btn-dark"/>
            </div>
        </form>
    </div>
  )
}

export default Login
