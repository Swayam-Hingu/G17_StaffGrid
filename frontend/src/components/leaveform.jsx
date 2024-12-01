import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../components/css/leaveform.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LeaveForm = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const empid = Cookies.get("employeeID");
  const token = Cookies.get("jwt11");
  const navigate = useNavigate();
  const fromDate = watch('fromDate');
  const toDate = watch('toDate');

  const onSubmit = async(data) => {
    // console.log('Form submitted:', data); 
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
    // console.log(payLoad)
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/leave/apply`, payLoad, {
          withCredentials: true,
          headers: {
              'Authorization': `Bearer ${token}`  
          }
      }); 
      // console.log(response)
      toast.success('Submit Leave Form');

      setTimeout(() => {
        navigate('/api/leave'); 
    }, 3000);
    } catch (error) {
        // console.log("ERROR IS: ",error)
        toast.error('Error submit Leave Form');
        if(error.response?.data?.error=="jwt malformed"){
        toast.error("Session expired. Redirecting to login...");
          setTimeout(() => {
            navigate("/api/login");
          }, 2000);
        }
    }
  };

  const calculateTotalDays = () => {
    if (!fromDate || !toDate) return 0; 
    const from = new Date(fromDate);
    const to = new Date(toDate);
    from.setHours(0, 0, 0, 0);
    to.setHours(0, 0, 0, 0);
    const timeDiff = to - from;
    const dayDiff = timeDiff / (1000 * 3600 * 24);
    return dayDiff >= 0 ? dayDiff + 1 : 0;
  };

 

  return (
    <div className="container1">
      <div className="main1">
        <div className="form-container1">
          <h3>Apply Leave</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group1">
              <label>Employee ID</label>
              <input type="text" value={empid} readOnly />
            </div>

            <div className="form-group1">
              <label>Leave Type</label>
              <select {...register('leaveType', { required: 'Leave type is required.' })}>
              <option value="" disabled selected hidden>Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Earned Leave">Earned Leave</option>
                <option value="Other Reason">Other Reason</option>
              </select>
              {errors.leaveType && <small className="error">{errors.leaveType.message}</small>}
            </div>

            {watch('leaveType') === 'Other Reason' && (
              <div className="form-group1">
                <label>Specify Reason</label>
                <input
                  type="text"
                  placeholder="Please specify"
                  {...register('otherReason', { required: 'Please specify the reason.' })}
                />
                {errors.otherReason && <small className="error">{errors.otherReason.message}</small>}
              </div>
            )}

            <div className="form-group1">
              <label>From</label>
              <input
                type="date"
                {...register('fromDate', { required: 'Start date is required.' })}
              />
              {errors.from && <small className="error">{errors.from.message}</small>}
            </div>

            <div className="form-group1">
              <label>To</label>
              <input
                type="date"
                {...register('toDate', { required: 'End date is required.' })}
              />
              {errors.to && <small className="error">{errors.to.message}</small>}
            </div>

            <div className="form-group1">
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

export default LeaveForm;
