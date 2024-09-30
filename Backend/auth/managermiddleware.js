const jwt = require('jsonwebtoken');
const employeeModel = require('../model/employee');

// Check User is MANAGER
module.exports = async (req, res, next) => {
    try { 

        //check token is provied by the postman or not
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).send({
                success: false,
                message: 'No token provided. Authorization denied.',
            });
        }

        // Extract the token from the Authorization header
        const token = authHeader.split(' ')[1]; // The token is the second part after "Bearer"
        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Invalid token format. Authorization denied.',
            });
        }

        // Verify the token
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Verified User ID:", verifyUser._id);

        // Find the user in the database
        const user = await employeeModel.findById(verifyUser._id);
        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'User not found.',
            });
        }

        // Check if the user is an admin
        if (user.role !== 'manager') {
            return res.status(403).send({
                success: false,
                message: 'Authorization failed: Admin privileges required.',
            });
        }

        // Attach user and token to the request object
        req.token = token;
        req.user = user;

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
