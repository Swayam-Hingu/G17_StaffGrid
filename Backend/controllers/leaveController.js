
const leaveModel = require('../model/leaveModel.js'); 

// how to store number of approved leave a

const generateLeaveID = async () => {
    const lastLeave = await leaveModel.findOne().sort({ appliedOn: -1 });
    if (!lastLeave) return 'L1';
    const lastID = lastLeave.leaveID;
    const lastNumber = parseInt(lastID.substring(1), 10);
    return `L${lastNumber + 1}`;
};

async function handleApplyLeave(req,res){
    console.log("ENTER HERE FOR SAVE LEAVE...")
    try {
        const { senderId,leaveType,fromDate,toDate,totalDays,otherReason} = req.body;  

        leaveID = await generateLeaveID();

        if (leaveType === "Other Reason" && !otherReason) {
            return res.status(400).send({
                status: false,
                message: "Please provide additional details for 'Other' leave type."
            });
        }

        const newLeave = new leaveModel({
            leaveID,
            senderId,  
            leaveType,
            fromDate,
            toDate,
            totalDays, 
            ...(leaveType === "Other Reason" && { otherReason }), 
            appliedOn: new Date()
        });

        const savedLeave = await newLeave.save();
        res.status(201).send({status:true,message: 'Leave applied successfully'});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

async function handleGetAllLeaves(req,res){
    try { 
        const receivedLeaves = await leaveModel.find().sort({ appliedOn: -1 });
        res.status(200).send({status:true, receivedLeaves: receivedLeaves});

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

async function handleGetSentLeaves(req,res){
    try {
        const { id: senderId } = req.params;
        console.log(senderId)
        const sentLeaves = await leaveModel.find({ senderId }).sort({ appliedOn: -1 });
        res.status(200).send({status:true, sentLeave: sentLeaves});

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

async function handleUpdateLeave(req,res){
    console.log("ENTER HERE....")
    try {
        const { leaveID } = req.params;
        const leaveData = req.body;
        // console.log(leaveID,leaveStatus,comment) 

        console.log(leaveData,leaveID)
      const LeaveUpdate = await leaveModel.findOneAndUpdate(
        { leaveID: leaveID },
        leaveData,
          { new: true }
      );
      
      if (!LeaveUpdate) {
          return res.status(404).json({ message: "Leave not found" });
      }

      return res.status(200).json({
          message: "Leave updated successfully",
          LeaveUpdate
      });

    } catch(error) {
      console.error("Error updating Leave:", error);
      return res.status(500).json({ message: "Server error" });
    }
    
       
}


async function handleDeleteLeave(req,res){
    console.log("Enter Here...")
    try {
        const { leaveID } = req.params;
        console.log(leaveID)
        if (!leaveID) {
            return res.status(400).send({ error: "Leave ID is required." });
        }
        const deletedLeave = await leaveModel.findOneAndDelete({ leaveID:leaveID });
        if (!deletedLeave) {
            return res.status(404).send({ error: "Leave record not found." });
        }
        res.status(200).send({ message: "Leave record deleted successfully.", deletedLeave });


    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports = {
    handleApplyLeave,
    handleGetAllLeaves,
    handleGetSentLeaves,
    handleUpdateLeave,
    handleDeleteLeave 
};