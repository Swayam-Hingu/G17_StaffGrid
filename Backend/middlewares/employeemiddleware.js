const jwt = require('jsonwebtoken');
const employeeModel = require('../model/employee');
const cookieParser = require('cookie-parser')

// Check employee is employee
module.exports = async (req, res, next) => {
    try { 

        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Authorization denied.',
            });
        }

        // Verify the token
        const verifyemployee = jwt.verify(token, process.env.SECRET_KEY);
        // console.log("Verified employee ID:", verifyemployee._id);

        // Find the employee in the database
        const employee = await employeeModel.findById(verifyemployee._id); 
        if (!employee) {
            return res.status(401).send({
                success: false,
                message: 'employee not found.',
            });
        }

        // Check if the login is an employee  
        if (employee.id.substr(0,6)!="202403") {
            return res.status(403).send({
                success: false,
                message: 'Authorization failed: employee privileges required.',
            });
        }

        // Attach employee and token to the request object
        req.token = token;
        req.employee = employee;

        // Proceed to the next middleware or route handler
        next();

    } catch (error) {
        console.error("Authorization error:", error);
        return res.status(401).send({
            success: false,
            message: 'Authorization failed. employee API access denied.',
            error: error.message,
        });
    }
};
