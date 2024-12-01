import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import AttendanceTable from './AttendanceTable';
import Calendar from './Calendar';
import './css/Attendance.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [adminAttendanceData,setAdminAttendanceData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const [absData, setAbsData] = useState([]);
  const [mergedDatas,setMergeDatas] = useState([]);
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();

  navigator.geolocation.getCurrentPosition(function (position) {
    // console.log(position.coords.latitude + ', ' + position.coords.longitude);
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  });

  const token = Cookies.get("jwt11");
  const id = Cookies.get('employeeID');
  const role = Cookies.get('employeeRole')

  const AttendanceHere = async () => {
    // console.log(token);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/attendance`,
        {
          id: id,
          latitude: latitude,
          longitude: longitude,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log('User Attendance successfully:', response.data);
      await getAttendanceDatas();
      
      // alert('Mark Your Attendance Successfully');
      toast.success('Attendance marked successfully!');
    } catch (error) {
      // alert('Mark Your Attendance Already Or Any Error');
      toast.error('You have already marked attendance or an error occurred.');
      console.log('ERROR: ', error);
    }
  };
  

  const getAttendanceDatas = async () => {
    // console.log(id);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/attendance/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('User Fetch successfully:', response.data);
      setAttendanceData(response.data.attendance); 
    } catch (error) {
      // console.log('ERROR: ', error);
    }
  };
  //Apply Leave
  const getLeaveDates= async () => {
    // console.log(id);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/leave/listget/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.leaveDates)
      setLeaveData(response?.data?.leaveDates)
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  //Without Apply Leave
  const getTotalWithoutApplyLeave = async () => {
    // console.log(id);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASEURL}/api/attendance/getabs/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Here Data is: ",response.data.absentDays) 
      setAbsData(response.data.absentDays);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

    //Admin Handle All Leaves
    const getAllAttdByAdmin = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASEURL}/api/attendance/getallemployeelist`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data.data)
        setAdminAttendanceData(response.data.data);
        
      } catch (error) {
        console.log('ERROR: ', error);
      }
    };

     

  useEffect(() => {
    const fetchData = async () => {
    if(role!='admin'){
      await getLeaveDates();
      await getAttendanceDatas();
      await getTotalWithoutApplyLeave();
    }else{
      await getAllAttdByAdmin();
    }
   }
   fetchData(); 
   const up = prioritizedData.slice(0, 30); 
   setMergeDatas(up);
  }, []);
  

  //fetch Date and status
  const attendanceDates = attendanceData.map((record) => ({
    date: new Date(record.date).toDateString(),  
    status: record.status,  
  })); 
 
  const leaveDatas = leaveData.map((record) => ({
    fromDate: new Date(record.fromDate).toDateString(),
    toDate: new Date(record.toDate).toDateString(),
    type: 'leave',  
  }));  

  const absDatas = absData.map((date) => ({
    date: new Date(date.date),
    type: 'absent',
  }));

  const mergedData = [
    ...attendanceDates,
    ...leaveDatas.map(record => ({
      date: new Date(record.fromDate).toDateString(),
      type: 'leave',
    })),
    ...absDatas.map(record => ({
      date: new Date(record.date).toDateString(),
      type: 'absent',
    })),
  ];
   
  const prioritizedData = mergedData.reduce((acc, current) => {
    const existing = acc.find(item => item.date === current.date);
    
    if (!existing) { 
      acc.push(current);
    }
    return acc;
  }, []);
  // console.log("prd: ",prioritizedData)
   
  const currentDate = new Date().toISOString().split("T")[0];

  prioritizedData.sort((a, b) => {
    if (a.date === currentDate) return -1; 
    if (b.date === currentDate) return 1;  
    return new Date(b.date) - new Date(a.date);
  });
 

  return (
    <div className='dashboard-container'>
      <div>
        <Typography variant='h3' className='dashboard-heading'>
          Attendance Dashboard
        </Typography>
      </div>

      {role != 'admin' && 
      <>
        <div className='calendar-fixed'>
          <Calendar attendanceDates={attendanceDates} leaveDatas={leaveDatas} absDatas={absDatas}/>
        </div>
        <div className=' '>
          <button  onClick={AttendanceHere}>MARK_Attendance</button>
      </div>
      </>
      }
      {
        role == 'admin' && 
        <>
           <div>
            <AttendanceTable data={adminAttendanceData} />
          </div>
        </>
      }
      {
        role != 'admin' && 
        <>
           <div>
            <AttendanceTable data={adminAttendanceData}  data2={mergedDatas}/>
          </div>
        </>
      }

      
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

export default Attendance;
