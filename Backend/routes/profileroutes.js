const express = require('express');
const authmiddleware = require('../middlewares/authmiddleware');
const router = express.Router();
const { 
    handleUserProfileSave ,
    handleUserProfileGet,
    handleUserProfileGetDetailed,
    handleUserProfileViewOrNot
} = require('../controllers/profileController');
 
router.post('/add-detailprofile',authmiddleware,handleUserProfileSave);
router.get('/getEmpDetailbyid/:id',authmiddleware,handleUserProfileGet);
router.get('/getEmpfulldetailbyid/:id',authmiddleware,handleUserProfileGetDetailed);
router.get('/checkfillornot/:id',authmiddleware,handleUserProfileViewOrNot)


module.exports = router;
