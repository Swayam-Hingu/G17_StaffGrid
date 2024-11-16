const express = require('express');
const authmiddleware = require('../middlewares/authmiddleware');
const managerMiddleware = require('../middlewares/authmiddleware');
const upload = require("../middlewares/multer");
const router = express.Router();

const { 
    handleApplyLeave,
    handleGetReceivedLeaves,
    handleGetSentLeaves,
    handleUpdateLeave 
} = require('../controllers/leaveController');

// apply leave
router.post('/apply',upload.single('attachment'),authmiddleware,handleApplyLeave);

// get all leave that applied
router.get('/getreceivedleaves/:id',authmiddleware,managerMiddleware,handleGetReceivedLeaves);

// get all leave that applied
router.get('/getsentleaves/:id',authmiddleware ,handleGetSentLeaves);

// handle leave by manager
router.patch('/update/:leaveID',authmiddleware,managerMiddleware,handleUpdateLeave);

module.exports = router;
