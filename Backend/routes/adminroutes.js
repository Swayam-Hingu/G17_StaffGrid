const express = require("express");
const adminMiddleware = require("../middlewares/adminmiddleware");
const Employee = require('../model/employee'); 
const authmiddleware = require("../middlewares/authmiddleware");

const router = express.Router(); 

router.get('/employeelist',authmiddleware , adminMiddleware, async (req, res) => {
    try {
        const employees = await Employee.find({});  
        res.status(200).json(employees);  
    } catch (error) {
        console.error("Error fetching employee list:", error);
        res.status(500).send('Server error');
    }
});

module.exports = router;