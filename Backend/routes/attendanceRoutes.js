const express = require('express'); 
const authmiddleware = require('../middlewares/authmiddleware');

const {
    handleMarkAttendance ,
    handleGetEmployeeAttendance,
    handleGetAbsentList} = require("../controllers/attendanceController");

const axios = require('axios');
const router = express.Router();

router.post('/',authmiddleware,handleMarkAttendance);
router.get('/:id',authmiddleware,handleGetEmployeeAttendance);
router.get('/getabs/:id',authmiddleware,handleGetAbsentList);

module.exports = router;