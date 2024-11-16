const mongoose = require('mongoose');

const AnnouncementNote = new mongoose.Schema({
  senderID: {
    type: String,
    required: true
  },
  senderRole: {
    type: String,
    required: true
  },
  receiverIDs: {
    type: [String],  
    require: true, 
  },
  message: {
    type: String,
    required: true
  },
  range: {
     start: {
        type: String,
     },
     end: {
        type: String 
     }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Announcement', AnnouncementNote);

