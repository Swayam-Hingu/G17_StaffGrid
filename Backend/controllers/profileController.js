const multer = require('multer');
const path = require('path');
const detailedProfile = require('../model/detailedProfileModel');
const employeeModel = require('../model/employee');
const attendanceModel = require("../model/attendanceModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});


// async function handleUpdateDetails(req,res){
//   try {
//     const { id } = req.params;
//     const updateData = { ...req.body };

//     const emp = detailedProfile.findOne({id:id});

//     if (!req.file) {
//       updateData.profileImage="";
//     }
//     else{
//       const result = await cloudinary.uploader.upload(req.file.path);
//       updateData.profileImage = result.url;
//       // cloudinary.uploader.upload(req.file.path, function (err, result){
//       //   if(err) {
//       //     return res.status(500).send({ success: false,message:err});
//       //   }
//       //   updateData.profileImage=result.url;
//       // })
//     }

//       if(emp){
//         const updatedEmployee = await detailedProfile.findOneAndUpdate(
//           { id:id},
//           { $set: updateData },
//           { new: true, runValidators: true }
//         );

//         if (!updatedEmployee) {
//           return res.status(404).send({ success: false, message: 'Employee not found' });
//         }

//         res.status(200).send({ success: true, message: 'Employee profile updated successfully', profileImageURl: updatedEmployee.profileImage});
//       }
//       else{

//         const { name, id,firstName ,lastName , fatherName, motherName, birthDate, mail, phoneNumber, gender, role, nationality, religion, block, street, village, taluka, district, pincode, country, bankName, ifscCode, accountNo, aadharNumber} = req.body; 
//         const profileImage=updateData.profileImage

//         const detailedprofile = new detailedProfile({name,id,role,profileImage,firstName ,lastName , fatherName, motherName, birthDate, mail, phoneNumber, gender, nationality, religion, block, street, village, taluka, district, pincode, country, bankName, ifscCode, accountNo, aadharNumber}); 

//         console.log(detailedprofile);

//         await detailedprofile.save(); 

//         console.log("Save DONE:::><")
//         res.status(201).send({ detailedprofile});

//       }

//   } catch (error) {
//       res.status(500).send({ success: false, message: 'Error updating employee profile', error: error.message });
//   }
// }

// async function handleUploadImage(req,res){
//   if (!req.file) {
//     return res.status(400).send({ success: false, message: "No file uploaded" });
//   }
//   cloudinary.uploader.upload(req.file.path, function (err, result){
//     if(err) {
//       return res.status(500).send({ success: false,message:err});
//     }
//     res.status(200).send({success: true,message:"profileImageUploaded Successfully!",imageURL: result.url});
//   })
// }

// async function handleUserProfileSave(req, res){
 
//   console.log(req.body);
//     const { name, id,firstName ,lastName , fatherName, motherName, birthDate, mail, phoneNumber, gender, role, nationality, religion, block, street, village, taluka, district, pincode, country, bankName, ifscCode, accountNo, aadharNumber} = req.body;  
    
//     try {  
//       let photosaved;
//       if (!req.file) {
//         photosaved="";
//       }else{
//         const result = await cloudinary.uploader.upload(req.file.path);
//         photosaved = result.url;
//       }


//       const detailedprofile = new detailedProfile({name,id,role,profileImage:photosaved,firstName ,lastName , fatherName, motherName, birthDate, mail, phoneNumber, gender, nationality, religion, block, street, village, taluka, district, pincode, country, bankName, ifscCode, accountNo, aadharNumber}); 

//       console.log(detailedprofile);

//       if (!req.file) {
//         detailedprofile.profileImage="";
//       }else{
//         const result = await cloudinary.uploader.upload(req.file.path);
//         detailedprofile.profileImage = result.url;
//       }

//       await detailedprofile.save(); 

//       console.log("Save DONE:::><")
//       res.status(201).send({ detailedprofile}); 
  
//     } catch (error) {
//       console.error("Error in Detail Profile:", error);
//       res.status(400).send({ error: error.message });  
//     }
// };


//Save Profile Employee/HR/Manager
async function handleUserProfileSave(req, res) {


  const { 
    name, id,firstName,lastName,fatherName,motherName,birthDate,mail,phoneNumber,gender,role,nationality,religion,block,street,village,taluka,district,pincode,country,bankName,ifscCode,accountNo,aadharNumber 
  } = req.body;


  try {
    let profileImageUrl = "";   
 
    // console.log("HERE IS BACKEND FILE: ",req.file);
    
    if (req.file) { 
      const result = await cloudinary.uploader.upload(req.file.path);
      profileImageUrl = result.url;   
    } 
    const detailedprofile = new detailedProfile({name,id,role,profileImage: profileImageUrl,firstName,   lastName,fatherName,motherName,birthDate,mail,phoneNumber,gender,nationality,religion,block,street,  village,taluka,district,pincode,country,bankName,ifscCode,accountNo,aadharNumber
    });

    // Save the profile in the database
    await detailedprofile.save();

    // console.log("Save DONE:::><");
    res.status(201).send({ detailedprofile });
  } catch (error) {
    console.error("Error in Detail Profile:", error);
    res.status(400).send({ error: error.message });
  }
}

//Check already fill or not
async function handleUserProfileGet(req, res){

  try {
    const { id } = req.params;
    // console.log(id)
    const employee = await employeeModel.findOne({id}); 
    // console.log(employee) 
    res.status(200).send(employee);
} catch (error) {
    console.log("Error For find ID")
    res.status(505).send("ERROR for find thee User")
}
};

//get detail profile 
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

//Check save or not In Profile In DP
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
