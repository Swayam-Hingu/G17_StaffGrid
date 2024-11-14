import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import './css/sendannouncement.css';

function SendAnnouncement() {
  const { register, handleSubmit, reset } = useForm();
  const [responseMessage, setResponseMessage] = useState("");
  const [rangeOption, setRangeOption] = useState("Specific");
  const [emprole, setemprole] = useState();

  useEffect(() => {
    const role = Cookies.get('employeeRole');
    setemprole(role);
  }, []);

  const submitHandler = async (data) => {
    console.log(data);
    const token = Cookies.get('token');
    const empid = Cookies.get('employeeID');
    let empIDS = [];

    if (emprole === 'manager') {
      if (data.rangeOption !== "Range") {
        empIDS = data.specificEmployeeId.split(',').map(id => id.trim());
        empIDS.forEach(ids => {
          if (ids.substr(5, 1) !== '3' || ids.length !== 10) {
            console.log("ERROR INVALID IDS");
          }
        });
      } else {
        const start = data.rangeStart;
        const end = data.rangeEnd;
        if (start.substr(5, 1) !== '3' || start.length !== 10 || end.substr(5, 1) !== '3' || end.length !== 10 || end < start) {
          console.log("ERROR IN INPUT RANGE");
        } else {
          for (let i = start; i <= end; i++) {
            empIDS.push(`${i}`);
          }
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

        {/* {emprole === "admin" && ( */}
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
        {/* )} */}

        <button type="submit" className="submit-button">
          Send
        </button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
}

export default SendAnnouncement;