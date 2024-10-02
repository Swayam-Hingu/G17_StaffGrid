const express = require('express');
const authmiddleware = require('../middlewares/authmiddleware');
const adminmiddleware = require('../middlewares/adminmiddleware');
const router = express.Router(); 

const { 
  handleUserRegistration,
  handleUserLogin,
  handleChangePassword,
  handleUserLogout
} = require('../controllers/auth');


// Admin first register and then send email to the register email with auto generated password
router.post('/register',authmiddleware,adminmiddleware, handleUserRegistration);

// Login 
router.post('/login',handleUserLogin);

//Change the password
router.patch('/login/changepassword',authmiddleware, handleChangePassword);

// Logout
router.get('/logout', authmiddleware,handleUserLogout);


module.exports = router;
