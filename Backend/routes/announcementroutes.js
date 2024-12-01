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

//send Announcement By Admin/Manager/Hr
router.post('/login/announcement',authmiddleware,anncmiddleware, handleAnnouncement);

//View All recived Announcement
router.get('/login/viewannouncement',authmiddleware, handleAnnouncementView);

//Last id of All Employee,Manager,Hr because of All [all notification send]
router.get('/login/alllastcnt',authmiddleware,adminmiddleware, handleLastIds);

//View All send Announcement
router.get('/login/viewannouncementsendbyme',authmiddleware,anncmiddleware, handleSendDetailsView);

module.exports = router;