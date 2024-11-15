const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const attendanceRecordSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent', 'leave'], required: true },
}, { _id: false });

const attendanceSchema = new mongoose.Schema({ 
    id: {type: String,require: true},
    name: {type:String,require: true},
    //profilePhoto:{type:String},
    attendance: [attendanceRecordSchema],
    // encodedProfilePhoto: { type: Array }
})

const attendanceDetail = mongoose.model('detailProfile', attendanceSchema);
module.exports = attendanceDetail;
