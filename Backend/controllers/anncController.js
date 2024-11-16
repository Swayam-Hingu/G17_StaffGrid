const announcementModel = require('../model/announcementNote');
const employeeModel = require('../model/employee')
const stroeIdModel = require('../model/storeId')

const jwt = require('jsonwebtoken');

async function handleAnnouncement(req,res){
    console.log("ENter here ",req.body) 
    const { senderID,senderRole, receiverIDs, message } = req.body; 
    const announcement = new announcementModel({ senderID,senderRole,receiverIDs,message}); 
    console.log(announcement)
    await announcement.save();
}
async function handleAnnouncementView(req,res){
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).send({
            success: false,
            message: 'Authorization denied.',
        });
    }
 
    const verifyemp = jwt.verify(token, process.env.SECRET_KEY);
    const emp = await employeeModel.findById(verifyemp._id); 
    console.log(emp.id)
    const announcements = await announcementModel.find({ receiverIDs: { $in: [emp.id] } }); 
    console.log(announcements);

    if (announcements.length > 0) {
        res.status(200).send({
            announcements
        })
    } else {
        res.status(404).send({
            success:false,
            message:"Error In Announcement"
        });
    }

}
async function handleLastIds(req,res){
    console.log("Enter-----------------------------<><><>:<><><><><>")
    const roles = ['admin', 'hr', 'manager', 'employee'];

    const lastIds = {};
    try {
        for (const role of roles) {
            const lastCounter = await stroeIdModel.findOne({ role }).sort({ cnt: -1 }); 
            lastIds[role] = lastCounter.cnt;
        } 
        res.status(200).send({
            success: true,
            lastIds
        });
    } catch (error) {
        console.error("Error fetching last IDs", error);
        res.status(500).send({
            success: false,
            message: "Error fetching last IDs",
            error: error.message
        });
    }
}
async function handleSendDetailsView(req,res){
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).send({
            success: false,
            message: 'Authorization denied.',
        });
    }
 
    const verifyemp = jwt.verify(token, process.env.SECRET_KEY);
    const emp = await employeeModel.findById(verifyemp._id); 
    console.log(emp.id)
    const announcements = await announcementModel.find({senderID:emp.id}); 
    console.log(announcements);

    if (announcements.length > 0) {
        res.status(200).send({
            announcements
        })
    } else {
        res.status(404).send({
            success:false,
            message:"Error In Announcement"
        });
    }
}



module.exports ={
    handleAnnouncement ,
    handleAnnouncementView,
    handleLastIds,
    handleSendDetailsView
}