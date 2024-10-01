const express = require('express');
const employeeModel = require('../model/employee');
const cookieParser = require('cookie-parser');
const authmiddleware = require('../auth/authmiddleware');
const adminmiddleware = require('../auth/adminmiddleware');
const router = express.Router(); 
const sendEmail = require('nodemailer');
const Counter = require('../model/storeId');
 



function generatePassword() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  const length = 8;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}


// const incrementbyoneIDs = async(role) => { 
//   let id = "";
//   const curr = await Counter.findOne({ role });
//   console.log(curr.role)  
//   console.log(curr.cnt)

//   if(curr.role=="employee") id = curr.eid;
//   if(curr.role=="hr") id = curr.hid;
//   if(curr.role=="manager") id = curr.mid; 

//   var num = 0;
//   // var num = parseInt(id.substr(5,5),10);
//   num = num + 1;
//   num = num.toString(); 
//   var com = ""
//   // var com = id.substr(0,5) + num; 

//   if(curr.role=="employee") curr.eid = com;
//   if(curr.role=="hr") id = curr.eid = com;
//   if(curr.role=="manager") curr.mid = com;

//   try {
//       await Counter.updateOne({ role }, { $set: curr });
//       console.log(curr)
//   } catch (error) {
//       console.error("Error updating the document:", error);
//   }

//   return com; 
// }

 



const adminsendemail = sendEmail.createTransport({
  service: 'gmail',
  sequre: true,
  port:465,
  auth: {
    user: 'mistryriddhi10@gmail.com',
    pass: 'vcua vpyw ovin juhk'
  }
});


// Admin first register and then send email to the register email with auto generated password
router.post('/register',authmiddleware,adminmiddleware, async (req, res) => {
  // console.log("Request Body:", req.body);
  const { name, mail, role } = req.body;
  
  
  try {
    var pass = generatePassword();
    var id = await incrementbyoneIDs(role);
    console.log(id)

    const employee = new employeeModel({ name, pass, mail, role, id}); 
     

    console.log(employee.id)
    await employee.save(); 
    res.status(201).send({ employee}); 

    //send the email to the employee
    const mailSendToEmployee = {
      from: "mistryriddhi1510@gmail.com",
      to: mail,
      subject:"Employee Registration",
      text: `Hi ${name},\n\nYour account has been created successfully. Your password is: ${pass}\nPlease change it if you wnat.\n\nBest regards,\nAdmin Team \nYour Role is: ${role} \n Your ${role}ID is: ${id} `,
    }

    adminsendemail.sendMail(mailSendToEmployee,(error,info)=>{
      if(error){
        console.log("Error For Sending Email To the Employee",error);
        return res.status(500).send(error);
      }else{
        console.log("Email IS Sent");
      }
    })


  } catch (error) {
    console.error("Error:", error);
    res.status(400).send({ error: error.message });  
  }
});



router.post('/login',async(req,res) => {
    
  try{
      // console.log(req.body.mail);
      const emp = await employeeModel.findOne({id:req.body.id});
      console.log(emp)

      if(emp==undefined){
          return res.status(404).send({
              success:false,
              message:'Employee is Not Found'
          })
      }
      //check role
      if(emp.id !== req.body.id){
          return res.status(500).send({
              success:false,
              message:'role doesn\'t match'
          });
      }
      //Compare Password 
      if(emp.pass != req.body.pass){
          return res.status(500).send({
              success:false,
              message:'Invalid password'   
          });
      }

      //token for JWT
      const token =  await emp.generateAuthToken();  
      console.log('token is: ',token)

      res.cookie("jwt",token,{
        expires: new Date(Date.now()+ 1000000),
        httpOnly:true,
    })

      return res.status(200).send({
          success:true,
          message:'Login SuccessFully',
          token,
          emp
      });

  }catch(error){
      console.log(error);
      res.status(500).send({
          success:false,
          message:'Error in Login API',
          error
      });
  }
});

//Change the password
router.patch('/login/changepassword',authmiddleware, async(req,res)=>{
  try{
    const emp = await employeeModel.findOne({id:req.body.id});
    console.log("Password changes dlfjasldfjs")
    console.log(emp)

    if(emp==undefined){
        return res.status(404).send({
            success:false,
            message:'Employee is Not Found'
        })
    }

    const currpassword = req.body.currpassword;
    const newpassword = req.body.newpassword;

    console.log(currpassword,newpassword)
    console.log(currpassword,emp.pass);

    if(currpassword != emp.pass){
      return res.status(500).send({
          success:false,
          message:'Invalid password'   
      });
    }
    //token for JWT
    const token =  await emp.generateAuthToken();  

    res.cookie("jwt",token,{
      expires: new Date(Date.now()+ 1000000),
      httpOnly:true,
    })
    
    emp.pass = newpassword;

    await emp.save();

    

    return res.status(200).send({
        success:true,
        message:'Password changed',
        token,
        emp
    });

}catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        message:'Wrong in Password change',
        error
    });
}


})

router.get('/logout', authmiddleware, async (req, res) => {
  try {

      req.employee.tokens = [];

      console.log(req.employee);

      await req.employee.save();  
      
      res.clearCookie("jwt");

      res.send({ message: "Logged out successfully" });
      
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
});


module.exports = router;
