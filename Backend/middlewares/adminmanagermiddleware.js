const jwt = require('jsonwebtoken');
const employeeModel = require('../model/employee');
const cookieParser = require('cookie-parser')

// Check adminOrManager is adminOrManager
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
        const verifyadminOrManager = jwt.verify(token, process.env.SECRET_KEY);
        // console.log("Verified adminOrManager ID:", verifyadminOrManager._id);

        // Find the adminOrManager in the database
        const adminOrManager = await employeeModel.findById(verifyadminOrManager._id); 
        if (!adminOrManager) {
            return res.status(401).send({
                success: false,
                message: 'adminOrManager not found.',
            });
        }

        // Check if the login is an adminOrManager 
        // ----------------------update------------------------
        if (adminOrManager.id !== "2024000001" && adminOrManager.id.substr(0,6)!="202402") {
            return res.status(403).send({
                success: false,
                message: 'Authorization failed: adminOrManager privileges required.',
            });
        }

        // Attach adminOrManager and token to the request object
        req.token = token;
        req.adminOrManager = adminOrManager;

        // Proceed to the next middleware or route handler
        next();

    } catch (error) {
        console.error("Authorization error:", error);
        return res.status(401).send({
            success: false,
            message: 'Authorization failed. adminOrManager API access denied.',
            error: error.message,
        });
    }
};
