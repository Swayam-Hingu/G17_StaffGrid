const express = require('express');
const employee = require('../model/employee');
const authmiddleware = require('../middlewares/authmiddleware');
const router = express.Router();

router.get("/:id",authmiddleware, async(req, res) => { 
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

router.get('employee/update/:id',authmiddleware,async (req,res)=>{
    const id = req.params.id;

    try{
        
    }catch(err){
        console.log(err);
        res.status(505).send("Error you can not update profile")
    }
});

module.exports = router;



// login

// Admin
// Register 
// Mail user 
// changePass 
