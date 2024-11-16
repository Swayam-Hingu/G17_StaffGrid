
const leaveModel = require('../model/leaveModel.js');
const cloudinary = require("cloudinary").v2;

// how to store number of approved leave a

const generateLeaveID = async () => {
    const lastLeave = await leaveModel.findOne().sort({ appliedOn: -1 });
    if (!lastLeave) return 'L1';
    const lastID = lastLeave.projectID;
    const lastNumber = parseInt(lastID.substring(1), 10);
    return `L${lastNumber + 1}`;
};

async function handleApplyLeave(req,res){
    try {
        const { senderId,receiverId,type,leaveType,fromDate,toDate,totalDays} = req.body;

        const result = await cloudinary.uploader.upload(req.file.path);
        attachment = result.url;
        
        leaveID = generateLeaveID();
        const newLeave = new leaveModel({
            leaveID,
            senderId,
            receiverId,
            type,
            leaveType,
            fromDate,
            toDate,
            totalDays,
            attachment,
        });

        const savedLeave = await newLeave.save();
        res.status(201).send({status:true,message: 'Leave applied successfully'});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

async function handleGetReceivedLeaves(req,res){
    try {
        const { receiverId } = req.params;
    
        const receivedLeaves = await Leave.find({ receiverId }).sort({ appliedOn: -1 });
        res.status(200).send({status:true, receivedLeaves: receivedLeaves});

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

async function handleGetSentLeaves(req,res){
    try {
        const { senderId } = req.params;
        const sentLeaves = await Leave.find({ senderId }).sort({ appliedOn: -1 });
        res.status(200).send({status:true, sentLeave: sentLeaves});

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

async function handleUpadateLeave(req,res){
    try {
        const { leaveID } = req.params;
        const { leaveStatus, comment } = req.body;
    
        const updatedLeave = await leaveModel.findByIdAndUpdate(
            leaveID,
            { leaveStatus, comment },
            { new: true }
        );
    
        if (!updatedLeave) {
          return res.status(404).json({ message: 'Leave not found' });
        }
    
        res.status(200).send({ message: 'Leave status updated successfully', leaveStatus: updatedLeave.leaveStatus });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports = {
    handleApplyLeave,
    handleGetReceivedLeaves,
    handleGetSentLeaves,
    handleUpadateLeave
};