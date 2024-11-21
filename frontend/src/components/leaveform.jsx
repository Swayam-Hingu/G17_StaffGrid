import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../components/css/leaveform.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LeaveForm = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const empid = Cookies.get("employeeID");
  const token = Cookies.get("jwt11");
  const navigate = useNavigate();
  const fromDate = watch('fromDate');
  const toDate = watch('toDate');

  const onSubmit = async(data) => {
    console.log('Form submitted:', data); 
    const totalDays = calculateTotalDays();
    const payLoad = {
          senderId: empid,
          leaveType: data.leaveType, 
          fromDate: data.fromDate,
          toDate: data.toDate,
          totalDays: totalDays,
    }
    if (data.leaveType === "Other Reason") {
      payLoad.otherReason = data.otherReason;
    }
    console.log(payLoad)
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/leave/apply`, payLoad, {
          withCredentials: true,
          headers: {
              'Authorization': `Bearer ${token}`  
          }
      }); 
      console.log(response)
      navigate('/api/leave'); 
    } catch (error) {
        console.log("ERROR IS: ",error)
    }
  };

  const calculateTotalDays = () => {
    if (!fromDate || !toDate) return 0; // Ensure both dates are available
    const from = new Date(fromDate);
    const to = new Date(toDate);
    from.setHours(0, 0, 0, 0);
    to.setHours(0, 0, 0, 0);
    const timeDiff = to - from;
    const dayDiff = timeDiff / (1000 * 3600 * 24);
    return dayDiff >= 0 ? dayDiff + 1 : 0;
  };

 

  return (
    <div className="container">
      <div className="main">
        <div className="form-container">
          <h3>Apply Leave</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Employee ID</label>
              <input type="text" value={empid} readOnly />
            </div>

            <div className="form-group">
              <label>Leave Type</label>
              <select {...register('leaveType', { required: 'Leave type is required.' })}>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Earned Leave">Earned Leave</option>
                <option value="Other Reason">Other Reason</option>
              </select>
              {errors.leaveType && <small className="error">{errors.leaveType.message}</small>}
            </div>

            {watch('leaveType') === 'Other Reason' && (
              <div className="form-group">
                <label>Specify Reason</label>
                <input
                  type="text"
                  placeholder="Please specify"
                  {...register('otherReason', { required: 'Please specify the reason.' })}
                />
                {errors.otherReason && <small className="error">{errors.otherReason.message}</small>}
              </div>
            )}

            <div className="form-group">
              <label>From</label>
              <input
                type="date"
                {...register('fromDate', { required: 'Start date is required.' })}
              />
              {errors.from && <small className="error">{errors.from.message}</small>}
            </div>

            <div className="form-group">
              <label>To</label>
              <input
                type="date"
                {...register('toDate', { required: 'End date is required.' })}
              />
              {errors.to && <small className="error">{errors.to.message}</small>}
            </div>

            <div className="form-group">
              <label>Total Day(s)</label>
              <input type="text" value={calculateTotalDays()} readOnly />
            </div>

            <div className="buttons">
              <button type="submit" className={`submit ${isSubmitted ? 'submitted' : ''}`}>
                Submit
              </button> 
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeaveForm;
