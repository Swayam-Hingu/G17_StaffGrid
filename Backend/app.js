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
// const fileUpload = require('express-fileupload')

// Connect Mongodb
require('./connection.js');

const staticRoutes = require('./routes/authRoutes.js')//adding all datas
const employeeRoutes = require('./routes/employeeroutes.js')
const adminRoutes = require('./routes/adminroutes.js');
const profileRoute = require('./routes/profileroutes.js');
const attendanceRoute = require('./routes/attendanceRoutes.js');
const projectRoute = require('./routes/projectRoutes.js');
const announcementroutes = require('./routes/announcementroutes.js');
const leaveRoute = require('./routes/leaveRoutes.js');

const _dirname = path.resolve();

const corsOptions = {
    origin: 'https://staff-grid.vercel.app',  
    credentials: true,  
};


// const corsOptions = {
//   origin: 'http://localhost:3000',   
//   credentials: true,   
// };

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 
// app.use(fileUpload({
//   useTempFiles:true
// }));

app.use("/api",staticRoutes); 
app.use("/api/attendance",attendanceRoute);
app.use("/api/project",projectRoute);
app.use("/api/leave",leaveRoute);
app.use("/employee/api",employeeRoutes);
app.use('/profile/api', profileRoute);
app.use("/api",announcementroutes)
app.use("/api",adminRoutes)



app.listen(PORT,() => {
    console.log("Server is runing at port: ",PORT)
})
