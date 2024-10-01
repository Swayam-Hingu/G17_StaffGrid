import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';

const Forgotpassword = () => {

    const {register,handleSubmit} = useForm();

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
                <input type="text" name="id" id="id" {...register("id")}/>
            </div>
            <div>
                <label htmlFor="currpassword">currpassword</label>
                <input type="currpassword" name="currpassword" id="currpassword" {...register("currpassword")}/>
            </div>
            <div>
                <label htmlFor="newpassword">newpassword</label>
                <input type="newpassword" name="newpassword" id="newpassword" {...register("newpassword")}/>
            </div>
            
            <div>
                <input type="submit" value="Submit" className="btn btn-dark"/>
            </div>
        </form>
    </div>
  )
}

export default Forgotpassword
