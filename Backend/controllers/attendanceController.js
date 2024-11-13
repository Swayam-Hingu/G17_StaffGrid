const attendanceModel = require('../model/attendanceModel');
const employeeModel = require('../model/employee');

const axios = require('axios');

async function handleMarkAttendance(req,res){
    try {

        console.log(req.body.id);
        emp = await employeeModel.findOne({
            id:req.body.id
        })

        if(!emp)
            return res.status(404).send({"error":"employee with this id not found"}); 
        
        console.log(emp.id);
        const response = await axios.post(' http://127.0.0.1:5000/api/mark',{
            id:emp.id
        },{ timeout: 600000  });

        return res.status(response.status).send(response.data);
    } catch (error) {
        return res.status(504).send({
            status:false,
            "error":"API not found"
        })
    }
}

async function handleGetEmployeeAttendance(req,res){
    try {
        const employee = await attendanceModel.findOne({ id: req.params.id });

        if (!employee) {
            // still not have any attendance
            return res.status(200).json({ success: true, attendance: [] });
        }

        res.status(200).json({ success: true, attendance: employee.attendance });
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ success: false, message: "Error fetching attendance" });
    }
}

module.exports = {
    handleMarkAttendance,
    handleGetEmployeeAttendance
};