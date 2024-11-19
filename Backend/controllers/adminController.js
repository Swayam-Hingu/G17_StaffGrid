
const employeeModel = require('../model/employee')
const detailedProfile = require('../model/detailedProfileModel');
const attendanceModel = require('../model/attendanceModel');
const projectModel = require('../model/projectModel');
const leaveModel = require('../model/leaveModel.js'); 
const announcementModel = require('../model/announcementNote');


async function handleAllEmployeeDetails(req,res){
     console.log("Here Enter for All Employee Get...")
     const allEmpDetails = await employeeModel.find();

     const detailedProfiles = await detailedProfile.find();

     const allEmpDetailsWithProfiles = allEmpDetails.map((employee) => {
        const profile = detailedProfiles.find((detail) => detail.id === employee.id);
        console.log(`Employee ID: ${employee.id}, Profile ID: ${profile ? profile.id : 'No matching profile'}`);
        return {
            ...employee._doc, 
            imageUrl: profile ? profile.profileImage : null, 
        };
        
    });

    console.log("----------------------------------ALLEMP------------------------",allEmpDetailsWithProfiles);
     
     console.log(allEmpDetails)
     return res.status(200).send({
        allEmpDetailsWithProfiles
    });
}

async function handleDeleteEmployee(req, res) {
    // console.log("ENTER FOR DELETE");

    const { id } = req.params;  
    try { 
        const employee = await employeeModel.findOne({ id });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // 1 
        const deletedProfile = await detailedProfile.findOneAndDelete({ id });
        if (deletedProfile) {
            console.log("Deleted Profile: ", deletedProfile);
        } else {
            console.log("Profile not found for the given employee ID");
        }

        // 2
        const deletedAttendance = await attendanceModel.deleteMany({ id });
        console.log(`Deleted ${deletedAttendance.deletedCount} attendance records for employee ID: ${id}`);

        // 3 
        if (employee.role === 'Manager') {
            const deletedProjects = await projectModel.deleteMany({ managerId: id });
            console.log(`Deleted ${deletedProjects.deletedCount} projects managed by employee ID: ${id}`);
        } else {
            const updatedProjects = await projectModel.updateMany(
                { 'teamMembers.id': id },
                { $pull: { teamMembers: { id } } }
            );
            const updatedTasks = await projectModel.updateMany(
                { 'tasks.assignedTo.id': id },
                { $pull: { tasks: { 'assignedTo.id': id } } }
            );
            console.log(`Updated ${updatedTasks.modifiedCount} projects by removing manager from task assignments`);
            console.log(`Updated ${updatedProjects.modifiedCount} projects by removing employee from teamMembers`);
        }

        // 4 
        if (employee.role === 'HR' || employee.role === 'Manager') {
            const deletedAnnouncements = await announcementModel.deleteMany({ senderID: id });
            console.log(`Deleted ${deletedAnnouncements.deletedCount} announcements sent by employee ID: ${id}`);
        } else {
            const updatedAnnouncements = await announcementModel.updateMany(
                { receiverIDs: id },
                { $pull: { receiverIDs: id } } 
            );
            console.log(`Updated ${updatedAnnouncements.modifiedCount} announcements by removing employee from receiverIDs`);
        }

        // 5 
        const deletedLeaveRecords = await leaveModel.deleteMany({ senderId: id });
        console.log(`Deleted ${deletedLeaveRecords.deletedCount} leave records for employee ID: ${id}`);

        // 6 
        const deletedEmployee = await employeeModel.findOneAndDelete({ id });
        if (deletedEmployee) {
            console.log("Deleted Employee: ", deletedEmployee);
        } else {
            return res.status(404).json({ message: 'Employee not found' });
        }

        return res.status(200).json({ message: 'Employee and associated data deleted successfully' });
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ message: 'Server error while deleting employee' });
    }
}


module.exports ={
    handleAllEmployeeDetails,
    handleDeleteEmployee
}