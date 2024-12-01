const mongoose = require('mongoose');


const attendanceRecordSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent', 'leave'], required: true },
}, { _id: false });

const attendanceSchema = new mongoose.Schema({ 
    id: {type: String,require: true},
    name: {type:String,require: true}, 
    attendance: [attendanceRecordSchema], 
})

const attendanceDetail = mongoose.model('attendanceDetail', attendanceSchema);
module.exports = attendanceDetail;
