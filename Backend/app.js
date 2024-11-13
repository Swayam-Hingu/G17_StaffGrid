// main role is employee,manager,hr,admin

// employee model -> name,pass,mail,role
// manager model -> name,pass,mail,role
// hr model -> name,pass,mail,role
// admin model -> name,pass,mail,role

/*
  User Information/ Details
  // We have to make model of this 
*/

require('dotenv').config()
const express = require('express');
const app = express();

const PORT = 8000 || process.env.PORT

const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Connect Mongodb
require('./connection.js');

const staticRoutes = require('./routes/authRoutes.js')//adding all datas
const employeeRoutes = require('./routes/employeeRoutes.js')
const adminRoutes = require('./routes/adminRoutes.js');
const profileRoute = require('./routes/profileroutes.js');
const attendanceRoute = require('./routes/attendanceRoutes.js');
const projectRoute = require('./routes/projectRoutes.js');

const _dirname = path.resolve();

const corsOptions = {
    origin: 'http://localhost:3000',  
    credentials: true,  
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 

app.use("/api",staticRoutes);
app.use("/api",adminRoutes);
app.use("/api/attendance",attendanceRoute);
app.use("/api/project",projectRoute);

app.use("/employee/api",employeeRoutes);
app.use('/profile/api', profileRoute);

 

app.listen(PORT,() => {
    console.log("Server is runing at port: ",PORT)
})