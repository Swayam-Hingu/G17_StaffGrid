const jwt = require('jsonwebtoken');
const employeeModel = require('../model/employee');
const cookieParser = require('cookie-parser')

// Check employee is manager || HR || Admin
module.exports = async (req, res, next) => {
    try { 

        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Authorization denied.',
            });
        }
 
        const verifyemp = jwt.verify(token, process.env.SECRET_KEY);
        // console.log("Verified emp ID:", verifyemp._id);

        // Find the emp in the database
        const emp = await employeeModel.findById(verifyemp._id); 
        if (!emp) {
            return res.status(401).send({
                success: false,
                message: 'emp not found.',
            });
        }

        // Check if the login is an emp 
        // ----------------------update------------------------
        console.log("emp id:                            ",emp.role)
        if (emp.role != 'manager' && emp.role != 'hr' && emp.role != 'admin') {
            return res.status(403).send({
                success: false,
                message: 'Authorization failed: emp privileges required.',
            });
        }

        // Attach emp and token to the request object
        req.token = token;
        req.emp = emp;

        // Proceed to the next middleware or route handler
        next();

    } catch (error) {
        console.error("Authorization error:", error);
        return res.status(401).send({
            success: false,
            message: 'Authorization failed. emp API access denied.',
            error: error.message,
        });
    }
};
