const express = require('express');
const employee = require('../model/employee');
const authmiddleware = require('../auth/authmiddleware');
const router = express.Router();

router.get("/employee/:id",authmiddleware, async(req, res) => { 
    try {
        const _id = req.params.id; 
        const employeeEntity = await employee.findById({_id}); 
        if(!_id){
            return res.status(404).send("Error for find by id :<>")
        }
        res.status(200).send(employeeEntity);
    } catch (error) {
        console.log("Error For find ID")
        res.status(505).send("ERROR for find thee User")
    }
});

module.exports = router;