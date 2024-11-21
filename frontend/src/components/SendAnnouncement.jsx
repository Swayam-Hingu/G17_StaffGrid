import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import './css/sendannouncement.css';

function SendAnnouncement() {
  const { register, handleSubmit, reset } = useForm(); 
  const [responseMessage, setResponseMessage] = useState("");
  const [rangeOption, setRangeOption] = useState("Specific");
  const [emprole, setemprole] = useState("");

  useEffect(() => { 
    const role = Cookies.get('employeeRole');
    setemprole(role);
  }, []);

  const submitHandler = async (data) => { 
    const token = Cookies.get("jwt11");
    const empid = Cookies.get('employeeID');
    let empIDS = [];

    if(emprole === 'manager'){ 
      if(data.rangeOption !== "Range"){ 
        empIDS = data.specificEmployeeId.split(',').map(id => id.trim());
        empIDS.forEach(ids => {
          if(ids.substr(5,1) !== '3' || ids.length !== 10){
            console.log("ERROR INVALID IDS:::::::::::::::<><><><><");
          }
        });
      } else { 
        const start = data.rangeStart;
        const end = data.rangeEnd;
        
        if(start.substr(5,1) !== '3' || start.length !== 10 || end.substr(5,1) !== '3' || end.length !== 10 || end < start){
          console.log("ERROR IN INPUT RANGE");
        } else {
          for (let i = start; i <= end; i++) {
            const empId = `${i}`;  
            empIDS.push(empId);
          }
          console.log("Valid IDs in range:", empIDS);
        }      
      }
    } else if(emprole === 'admin'){ 
      if(data.rangeOption === "Specific"){ 
        empIDS = data.specificEmployeeId.split(',').map(id => id.trim());
        empIDS.forEach(ids => {
          if(ids.substr(5,1) === '0' || ids.length !== 10 || ids.substr(5,1) > '3'){
            console.log("ERROR INVALID IDS:::::::::::::::<><><><><ADMIN");
          }
        });
      } else if(data.rangeOption === 'All'){ 
        const mstart = "2024020001";
        const hstart = "2024010001";
        const estart = "2024030001";
        
        try {
          const response = await axios.get('http://localhost:8000/api/login/alllastcnt', 
          {
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          const { employee, manager, hr } = response.data.lastIds;
          
          if(employee > estart){
            for (let i = estart; i <= employee; i++) {
              const empId = `${i}`;  
              empIDS.push(empId);
            }
          }
          if(manager > mstart){
            for (let i = mstart; i <= manager; i++) {
              const empId = `${i}`;  
              empIDS.push(empId);
            }
          }
          if(hr > hstart){
            for (let i = hstart; i <= hr; i++) {
              const empId = `${i}`;  
              empIDS.push(empId);
            }
          }
        } catch(error){
          console.log(error);
        }
      } else { 
        const start = data.rangeStart;
        const end = data.rangeEnd;

        if((start.substr(5,1) !== end.substr(5,1)) || start.substr(5,1) < '1' || start.length !== 10 || end.substr(5,1) !== '3' || end.length !== 10 || end < start || start.substr(5,1) > '3' || end.substr(5,1) < '1' || start.substr(5,1) > '3'){
          console.log("ERROR IN INPUT RANGE ADMIN");
        } else {
          for (let i = start; i <= end; i++) {
            const empId = `${i}`;  
            empIDS.push(empId);
          }
          console.log("Valid IDs in range: ADMIN", empIDS);
        }      
      }
    } else if(emprole === 'hr'){ 
      if(data.rangeOption !== "Range"){ 
        empIDS = data.specificEmployeeId.split(',').map(id => id.trim());
        empIDS.forEach(ids => {
          if(ids.substr(5,1) <= '1' || ids.length !== 10 || ids.substr(5,1) > '3'){
            console.log("ERROR INVALID IDS:::::::::::::::<><><><><");
          }
        });
      } else { 
        const start = data.rangeStart; 
        const end = data.rangeEnd;

        if(( start.substr(5,1) !== end.substr(5,1)) || start.length !== 10 || end.length !== 10 || end < start || start.substr(5,1) <= '1' || start.substr(5,1) > '3' || end.substr(5,1) <= '1' || end.substr(5,1) > '3'){
          console.log("ERROR IN INPUT RANGE");
        } else {
          for (let i = start; i <= end; i++) {
            const empId = `${i}`;  
            empIDS.push(empId);
          }
          console.log("Valid IDs in range:", empIDS);
        }      
      }
    }

    try {
      const response = await axios.post('http://localhost:8000/api/login/announcement', {
        senderID: empid,
        senderRole: emprole,
        receiverIDs: empIDS,
        message: data.message,
      }, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setResponseMessage("Announcement sent successfully!");
    } catch (error) {
      console.error("Error sending announcement", error);
      setResponseMessage("Failed to send announcement.");
    }
  };

  return (
    <div className="send-announcement-container">
      <h2 className="title">Send Announcement</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
        <label className="form-label">Message:</label>
        <input
          className="form-input"
          type="text"
          placeholder="Enter your message here"
          {...register('message', { required: true })}
        />

        <label className="radio-label">
          <input
            type="radio"
            {...register("rangeOption")}
            value="Specific"
            checked={rangeOption === "Specific"}
            onChange={() => setRangeOption("Specific")}
          />
          Specific Employee ID
        </label>
        {rangeOption === "Specific" && (
          <input
            className="form-input"
            type="text"
            placeholder="Enter Employee ID"
            {...register('specificEmployeeId', { required: rangeOption === "Specific" })}
          />
        )}

        <label className="radio-label">
          <input
            type="radio"
            {...register("rangeOption")}
            value="Range"
            checked={rangeOption === "Range"}
            onChange={() => setRangeOption("Range")}
          />
          Range (Start and End)
        </label>
        {rangeOption === "Range" && (
          <>
            <input
              className="form-input"
              type="text"
              placeholder="Enter Start ID"
              {...register('rangeStart', { required: rangeOption === "Range" })}
            />
            <input
              className="form-input"
              type="text"
              placeholder="Enter End ID"
              {...register('rangeEnd', { required: rangeOption === "Range" })}
            />
          </>
        )}

        {emprole === "admin" && (
          <label className="radio-label">
            <input
              type="radio"
              {...register("rangeOption")}
              value="All"
              checked={rangeOption === "All"}
              onChange={() => setRangeOption("All")}
            />
            All Employees
          </label>
        )}

        <button type="submit" className="submit-button">
          Send
        </button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
}

export default SendAnnouncement;
