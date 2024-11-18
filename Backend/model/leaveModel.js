const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  leaveID : {type:String, required:true},
  senderId: { type:String, required: true,},  
  leaveType: { type: String,required: true,},
  otherReason: {type: String, required: false},
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  totalDays: { type: Number, required: true }, 
  leaveStatus: { type: String, enum: ['Pending', 'Approved', 'Denied'],  default: 'Pending',},
  comment: {type: String,},
  appliedOn: {type: Date,default: Date.now,},
  
});

const Leave = mongoose.model('Leave', leaveSchema);
module.exports = Leave;