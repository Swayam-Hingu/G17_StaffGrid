const express = require('express');
const authmiddleware = require('../middlewares/authmiddleware');
const router = express.Router();
const { handleUserProfileSave } = require('../controllers/profileController');

// Route to update profile details (including text fields, excluding image)
router.post('/add-detailprofile',handleUserProfileSave);

module.exports = router;
