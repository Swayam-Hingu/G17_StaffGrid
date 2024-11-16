const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  leaveID : {type:String, required:true},
  senderId: { type:String, required: true,},
  receiverId: {type:String, required: true},
  type: { type: String, enum: ['Full Day', 'Half Day'],required: true,},
  leaveType: { type: String,required: true,},
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  totalDays: { type: Number, required: true },
  attachment: { type: String, },
  leaveStatus: { type: String, enum: ['Pending', 'Approved', 'Denied'],  default: 'Pending',},
  comment: {type: String,},
  appliedOn: {type: Date,default: Date.now,},
  
});

const Leave = mongoose.model('Leave', employeeSchema);
module.exports = Leave;