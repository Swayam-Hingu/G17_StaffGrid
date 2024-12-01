const jwt = require('jsonwebtoken');
const employeeModel = require('../model/employee');
const cookieParser = require('cookie-parser')

// Check User is Admin
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
        const verifyadmin = jwt.verify(token, process.env.SECRET_KEY);
        // console.log("Verified admin ID:", verifyadmin._id);

        // Find the admin in the database
        const admin = await employeeModel.findById(verifyadmin._id); 
        if (!admin) {
            return res.status(401).send({
                success: false,
                message: 'admin not found.',
            });
        }

        // Check if the login is an admin 
        // ----------------------update------------------------
        if (admin.id !== "2024000001") {
            return res.status(403).send({
                success: false,
                message: 'Authorization failed: Admin privileges required.',
            });
        }

        // Attach admin and token to the request object
        req.token = token;
        req.admin = admin;

        // Proceed to the next middleware or route handler
        next();

    } catch (error) {
        console.error("Authorization error:", error);
        return res.status(401).send({
            success: false,
            message: 'Authorization failed. Admin API access denied.',
            error: error.message,
        });
    }
};
