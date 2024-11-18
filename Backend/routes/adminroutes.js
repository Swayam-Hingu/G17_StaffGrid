const express = require("express");
const router = express.Router(); 
const adminMiddleware = require("../middlewares/adminmiddleware");
const Employee = require('../model/employee'); 
const authmiddleware = require("../middlewares/authmiddleware");
const { 
    handleAllEmployeeDetails
} = require('../controllers/adminController'); 

router.get('/login/viewAllemployee',authmiddleware,adminMiddleware, handleAllEmployeeDetails); 

module.exports = router;