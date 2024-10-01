//main role is employee,manager,hr,admin
// employee model -> name,pass,mail,role
// manager model -> name,pass,mail,role
// hr model -> name,pass,mail,role
// admin model -> name,pass,mail,role
require('dotenv').config()
const express = require('express');
const app = express();
const PORT = 8000 || process.env.PORT
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('./connection.js');
const routes = require('./routes/authroute.js')//adding all datas
const employeeroutes = require('./routes/employeeroutes.js')
const adminRoutes = require('./routes/adminroutes.js');

const _dirname = path.resolve();
const corsOptions = {
    origin: 'http://localhost:3000',  
    credentials: true,  
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api",routes);
app.use("/api",adminRoutes)
app.use("/api",employeeroutes)
 
app.use(express.static(path.join(__dirname, '../Frontend/build')));
console.log(path.join(__dirname, '../Frontend/build'))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/build/index.html'));
});




app.listen(PORT,() => {
    console.log("Server is runing at port: ",PORT)
})