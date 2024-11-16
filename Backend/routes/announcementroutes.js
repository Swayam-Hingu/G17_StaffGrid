const express = require('express');
const router = express.Router(); 
const authmiddleware = require('../middlewares/authmiddleware');
const anncmiddleware = require('../middlewares/anncmiddleware')
const { 
    handleAnnouncement ,
    handleAnnouncementView,
    handleLastIds,
    handleSendDetailsView
  } = require('../controllers/anncController');
const adminmiddleware = require('../middlewares/adminmiddleware');

router.post('/login/announcement',authmiddleware,anncmiddleware, handleAnnouncement);
router.get('/login/viewannouncement',authmiddleware, handleAnnouncementView);
router.get('/login/alllastcnt',authmiddleware,adminmiddleware, handleLastIds);
router.get('/login/viewannouncementsendbyme',authmiddleware,anncmiddleware, handleSendDetailsView);

module.exports = router;