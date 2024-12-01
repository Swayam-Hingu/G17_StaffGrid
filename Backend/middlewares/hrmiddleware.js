const jwt = require('jsonwebtoken');
const employeeModel = require('../model/employee');
const cookieParser = require('cookie-parser')

// Check User is hr
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
        const verifyhr = jwt.verify(token, process.env.SECRET_KEY);
        // console.log("Verified hr ID:", verifyhr._id);

        // Find the hr in the database
        const hr = await employeeModel.findById(verifyhr._id); 
        if (!hr) {
            return res.status(401).send({
                success: false,
                message: 'hr not found.',
            });
        }

        // Check if the login is an hr  
        if (hr.id.substr(0,6)!="202403") {
            return res.status(403).send({
                success: false,
                message: 'Authorization failed: hr privileges required.',
            });
        }

        // Attach hr and token to the request object
        req.token = token;
        req.hr = hr;

        // Proceed to the next middleware or route handler
        next();

    } catch (error) {
        console.error("Authorization error:", error);
        return res.status(401).send({
            success: false,
            message: 'Authorization failed. hr API access denied.',
            error: error.message,
        });
    }
};
