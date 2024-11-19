const express = require('express');
const attendanceModel = require('../model/attendanceModel');
const employeeModel = require('../model/employee');
const authmiddleware = require('../middlewares/authmiddleware');

const {handleMarkAttendance ,handleGetEmployeeAttendance} = require("../controllers/attendanceController");

const axios = require('axios');
const router = express.Router();

router.post('/',handleMarkAttendance);

router.get('/',authmiddleware,handleGetEmployeeAttendance);
module.exports = router;