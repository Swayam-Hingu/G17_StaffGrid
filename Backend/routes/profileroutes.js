const express = require('express');
const authmiddleware = require('../middlewares/authmiddleware');
const upload = require("../middlewares/multer");

const router = express.Router();
const { 
    handleUserProfileSave ,
    handleUserProfileGet,
    handleUserProfileGetDetailed,
    handleUserProfileViewOrNot
} = require('../controllers/profileController');
 


//Add Detail profile details
router.post('/add-detailprofile/:id',upload.single('profileImage'),handleUserProfileSave);

//Get Profile by id
router.get('/getEmpDetailbyid/:id',authmiddleware,handleUserProfileGet);

//get admin/employee/hr/manager details profile
router.get('/getEmpfulldetailbyid/:id',authmiddleware,handleUserProfileGetDetailed);

//Check user fill or not their profile detail
router.get('/checkfillornot/:id',authmiddleware,handleUserProfileViewOrNot);
 

module.exports = router;
