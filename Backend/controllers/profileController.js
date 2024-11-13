const multer = require('multer');
const path = require('path');
const detailedProfile = require('../model/detailedProfileModel');
const employeeModel = require('../model/employee');

async function handleUserProfileSave(req, res){

    const { name, id,firstName ,lastName , fatherName, motherName, birthDate, mail, phoneNumber, gender, role, nationality, religion, block, street, village, taluka, district, pincode, country, bankName, ifscCode, accountNo, aadharNumber} = req.body; 
    const profileImage="img"
    
    try {  
      const detailedprofile = new detailedProfile({name,id,role,profileImage,firstName ,lastName , fatherName, motherName, birthDate, mail, phoneNumber, gender, nationality, religion, block, street, village, taluka, district, pincode, country, bankName, ifscCode, accountNo, aadharNumber}); 

      console.log(detailedprofile);

      await detailedprofile.save(); 

      console.log("Save DONE:::><")
      res.status(201).send({ detailedprofile}); 
  
    } catch (error) {
      console.error("Error in Detail Profile:", error);
      res.status(400).send({ error: error.message });  
    }
};

async function handleUserProfileGet(req, res){

  try {
    const { id } = req.params;
    console.log(id)
    const employee = await employeeModel.findOne({id}); 
    console.log(employee) 
    res.status(200).send(employee);
} catch (error) {
    console.log("Error For find ID")
    res.status(505).send("ERROR for find thee User")
}
};

async function handleUserProfileGetDetailed(req, res){

  try {
    const { id } = req.params;
    const detailemployee = await detailedProfile.findOne({id}); 
    res.status(200).send(detailemployee);
} catch (error) {
    console.log("Error For find ID")
    res.status(505).send("ERROR for find thee User")
}
};

async function handleUserProfileViewOrNot(req, res) {
  try {
    const { id } = req.params;
    // console.log(id)
    const detailemployee = await detailedProfile.findOne({id}); 
    // console.log(detailemployee)
    if (detailemployee) {
      return res.status(200).send({success: true,detailemployee}); 
    } else {
      return res.status(404).send(false); 
    }
  } catch (error) {
    return res.status(500).send(false);  
  }
}



module.exports = {
    handleUserProfileSave,
    handleUserProfileGet,
    handleUserProfileGetDetailed,
    handleUserProfileViewOrNot
};
