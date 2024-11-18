const express = require('express');
const authmiddleware = require('../middlewares/authmiddleware');
const adminmiddleware = require('../middlewares/adminmiddleware'); 
const router = express.Router();

const { 
    handleApplyLeave,
    handleGetAllLeaves,
    handleGetSentLeaves,
    handleUpdateLeave,
    handleDeleteLeave 
} = require('../controllers/leaveController');

// apply leave
router.post('/apply',authmiddleware,handleApplyLeave);

// get all leave that applied[admin]
router.get('/getallleavedetails',authmiddleware,adminmiddleware,handleGetAllLeaves);

// get all leave that applied[employee]
router.get('/getsentleaves/:id',authmiddleware ,handleGetSentLeaves);

// handle leave by dmin
router.patch('/update/:leaveID',authmiddleware,adminmiddleware,handleUpdateLeave);

// handle delete option available employee if status is panding
router.delete('/delete/:leaveID',authmiddleware,handleDeleteLeave);

module.exports = router;
