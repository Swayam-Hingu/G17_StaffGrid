const express = require('express');
const attendanceModel = require('../model/attendanceModel');
const employeeModel = require('../model/employee');

const {handleMarkAttendance ,handleGetEmployeeAttendance} = require("../controllers/attendanceController");

const axios = require('axios');
const router = express.Router();

router.post('/',handleMarkAttendance);

router.get('/',handleGetEmployeeAttendance);
module.exports = router;