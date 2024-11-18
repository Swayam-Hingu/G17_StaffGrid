
const employeeModel = require('../model/employee')
const detailedProfile = require('../model/detailedProfileModel');

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

 

module.exports ={
    handleAllEmployeeDetails
}