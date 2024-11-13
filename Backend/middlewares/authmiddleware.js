const jwt = require('jsonwebtoken')
const employeeModel = require('../model/employee')
const cookieParser = require('cookie-parser')

// Check User is Login
module.exports = async (req, res, next) => {
    try { 
        const token = req.cookies.jwt;
        console.log("T:",token) ;
        if (!token) {
            throw new Error("JWT not provided");
        }
        const verifiedEmployee = jwt.verify(token, process.env.SECRET_KEY);

        if(!verifiedEmployee)
            return res.status(401).send({ error: error.message || "Unauthorized access" });
        
        const employee = await employeeModel.findOne({_id: verifiedEmployee._id});
        req.token = token;
        req.employee = employee;
        next();
    } catch (error) {
        res.status(401).send({ error: error.message || "Unauthorized access" });
    }
}
