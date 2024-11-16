const express = require('express');
const authmiddleware = require('../middlewares/authmiddleware');
const managerMiddleware = require('../middlewares/authmiddleware');

const upload = require("../middlewares/multer");

const { 
    handleApplyLeave,
    handleGetReceivedLeaves,
    handleGetSentLeaves,
    handleUpadateLeave
} = require('../controllers/profileController');

const router = express.Router();

// apply leave
router.post('/apply',upload.single('attachment'),authmiddleware,handleApplyLeave);

// get all leave that applied
router.get('/getreceivedleaves/:id',authmiddleware,managerMiddleware,handleGetReceivedLeaves);

// get all leave that applied
router.get('/getsentleaves/:id',authmiddleware ,handleGetSentLeaves);

// handle leave by manager
router.patch('/update/:leaveID',authmiddleware,managerMiddleware,handleUpadateLeave);

module.exports = router;
