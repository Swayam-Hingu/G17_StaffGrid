import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';

const Forgotpassword = () => {

    const {register,handleSubmit,formState: {errors}} = useForm();

    const submitHandler = async (data) => {
        try{  
          const token = localStorage.getItem('token');
          console.log(data.id,data.currpassword)
    
          const response = await axios.patch('http://localhost:8000/api/login/changepassword', {
            id: data.id,
            currpassword: data.currpassword,
            newpassword: data.newpassword 
          },{
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`  
            }
          }); 
          console.log(response)
          console.log("DONE: change password")
        }catch(error){
          console.log("ERROR:" , error);
        }
      }


  return (
    <div>
       <h1>ForgotPassword Page</h1>

       <form onSubmit={handleSubmit(submitHandler)}>
            <div>
                <label htmlFor="id">ID</label>
                <input type="text" name="id" id="id" 
                {...register("id", {
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
                {errors.id && <p style={{color: 'red'}}>{errors.id.message}</p>}
            </div>
            <div>
                <label htmlFor="currpassword">currpassword</label>
                <input type="password" name="currpassword" id="currpassword"  {...register("currpassword", {required: "Current password is required"})} />
                {errors.currpassword && <p style={{color: 'red'}}>{errors.currpassword.message}</p>}
            </div>
            <div>
                <label htmlFor="newpassword">newpassword</label>
                <input type="password" name="newpassword" id="newpassword" 
                {...register("newpassword", {
                    required: "New password is required", 
                    minLength: {
                        value: 6, 
                        message: "Password must be at least 6 characters long"
                    }
                })}
                />
                {errors.newpassword && <p style={{color: 'red'}}>{errors.newpassword.message}</p>}
            </div>
            
            <div>
                <input type="submit" value="Submit" className="btn btn-dark"/>
            </div>
        </form>
    </div>
  )
}

export default Forgotpassword
