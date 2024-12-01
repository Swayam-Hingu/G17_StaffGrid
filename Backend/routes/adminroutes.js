const express = require("express");
const router = express.Router(); 
const adminMiddleware = require("../middlewares/adminmiddleware");
const Employee = require('../model/employee'); 
const authmiddleware = require("../middlewares/authmiddleware");
const { 
    handleAllEmployeeDetails,
    handleDeleteEmployee
} = require('../controllers/adminController'); 

//Admin view All Employee List
router.get('/login/viewAllemployee',authmiddleware,adminMiddleware, handleAllEmployeeDetails); 

//Admin want to delete Employee by employee id
router.delete('/login/delete/:id',authmiddleware,adminMiddleware, handleDeleteEmployee); 
module.exports = router;