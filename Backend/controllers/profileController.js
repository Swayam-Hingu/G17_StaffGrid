const multer = require('multer');
const path = require('path');
const detailedProfile = require('../model/detailedProfileModel');

async function handleUserProfileSave(req, res){

    const { firstName ,lastName , fatherName, motherName, birthDate, mail, phoneNumber, gender, role, nationality, religion, block, street, village, taluka, district, pincode, country, bankName, ifscCode, accountNo, aadharNumber} = req.body; 
    
    try {  
      const detailedprofile = new detailedProfile({firstName ,lastName , fatherName, motherName, birthDate, mail, phoneNumber, gender, role, nationality, religion, block, street, village, taluka, district, pincode, country, bankName, ifscCode, accountNo, aadharNumber}); 

      console.log(detailedprofile);

      await detailedprofile.save(); 

      res.status(201).send({ detailedprofile}); 
  
    } catch (error) {
      console.error("Error in Detail Profile:", error);
      res.status(400).send({ error: error.message });  
    }
};

module.exports = {
    handleUserProfileSave
};
