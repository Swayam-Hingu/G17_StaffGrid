const express = require('express'); 
const authmiddleware = require('../middlewares/authmiddleware');
const adminmiddleware = require('../middlewares/adminmiddleware')
const {
    handleMarkAttendance ,
    handleGetEmployeeAttendance,
    handleGetAbsentList,
    handleGetAllEmployeeDetails
    } = require("../controllers/attendanceController");

const axios = require('axios');
const router = express.Router();

//Mark Attendance
router.post('/',authmiddleware,handleMarkAttendance);

//Attendance list of Employees with id and their percentage
router.get('/getallemployeelist',authmiddleware,adminmiddleware,handleGetAllEmployeeDetails);

//Attendance list by id
router.get('/:id',authmiddleware,handleGetEmployeeAttendance);

//Attendance absent list by id
router.get('/getabs/:id',authmiddleware,handleGetAbsentList);


module.exports = router;