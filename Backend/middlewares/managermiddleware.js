const jwt = require('jsonwebtoken');
const employeeModel = require('../model/employee');
const cookieParser = require('cookie-parser')

// Check user is manager
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
        const verifymanager = jwt.verify(token, process.env.SECRET_KEY);
        // console.log("Verified manager ID:", verifymanager._id);

        // Find the manager in the database
        const manager = await employeeModel.findById(verifymanager._id); 
        if (!manager) {
            return res.status(401).send({
                success: false,
                message: 'manager not found.',
            });
        }

        // Check if the login is an manager  
        if (manager.id.substr(0,6)!=202402) {
            return res.status(403).send({
                success: false,
                message: 'Authorization failed: manager privileges required.',
            });
        }

        // Attach manager and token to the request object
        req.token = token;
        req.manager = manager;

        // Proceed to the next middleware or route handler
        next();

    } catch (error) {
        console.error("Authorization error:", error);
        return res.status(401).send({
            success: false,
            message: 'Authorization failed. manager API access denied.',
            error: error.message,
        });
    }
};
