const express = require('express');
const authmiddleware = require('../middlewares/authmiddleware');
const upload = require("../middlewares/multer");

const router = express.Router();
const { 
    handleUserProfileSave ,
    handleUserProfileGet,
    handleUserProfileGetDetailed,
    handleUserProfileViewOrNot,
    handleUploadImage,
    handleUpdateDetails
} = require('../controllers/profileController');
 

// ahiya have post to register vakhte thai jase

// aa patch/put karine frontend sathe connect karvanu che ---  handleUpdateDetails 
router.patch('/updateProfileDetail/:id',authmiddleware,upload.single('profileImage'),handleUpdateDetails);
router.post('/add-detailprofile/:id',upload.single('profileImage'),handleUserProfileSave);
router.get('/getEmpDetailbyid/:id',authmiddleware,handleUserProfileGet);
router.get('/getEmpfulldetailbyid/:id',authmiddleware,handleUserProfileGetDetailed);
router.get('/checkfillornot/:id',authmiddleware,handleUserProfileViewOrNot);

router.post('/uploadImage',authmiddleware,upload.single('profileImage'),handleUploadImage);

module.exports = router;
