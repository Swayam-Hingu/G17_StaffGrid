const employeeModel = require('../model/employee');
const cookieParser = require('cookie-parser');
const sendEmail = require('nodemailer');
const Counter = require('../model/storeId');
const bcrypt = require('bcryptjs');

// Generate 8 digit password
function generatePassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$_';
    let password = '';
    const length = 8;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
}

// Give next Id for assign to new user
const getNextId = async(role) => { 
    let id = "";
    const curr = await Counter.findOne({ role });
    id = curr.cnt;

    var num = parseInt(id.slice(5, 10), 10);
    num = num + 1;
    num = num.toString(); 
    var com = ""
    var com = id.slice(0, 5) + num;
  
    curr.cnt = com;
    await Counter.updateOne({ role }, { $set: curr }); 
    return com; 
}

// Create an email transport object
const adminSendeMail = sendEmail.createTransport({
    service: 'gmail',
    sequre: true,
    port:465,
    auth: {
      user: 'mistryriddhi10@gmail.com',
      pass: 'vcua vpyw ovin juhk'
    }
});

// Handle Registration process
async function handleUserRegistration(req, res){

    const { name, mail, role } = req.body; 
    
    try {
      var pass = generatePassword();
      var id = await getNextId(role);
      console.log(id)

      //Encoding password for purpose of the security
      emailpass = pass
      pass = await bcrypt.hash(pass,10);
        
      // Create new employee with this given details
      const employee = new employeeModel({ name, pass, mail, role, id}); 
      console.log(employee.id);

      await employee.save(); 
      res.status(201).send({ employee}); 
  
      // Send the email to the employee
      const mailSendToEmployee = {
        from: "mistryriddhi1510@gmail.com",
        to: mail,
        subject:"Employee Registration - Welcome to StaffGrid",
        text: `Dear ${name},

        We are pleased to inform you that your account has been successfully created on our Employee Management System. Below are your account details:

        Role: ${role}
        ${role} ID: ${id}

        Your temporary password is: ${emailpass}

        For security purposes, we strongly recommend changing your password after your first login. If you encounter any issues or need assistance, feel free to contact the support team.

        Best regards,
        Admin Team
        StaffGrid\n`,
      }
  
      adminSendeMail.sendMail(mailSendToEmployee,(error,info)=>{
        if(error){
          console.log("Sending Email Error",error);
          return res.status(500).send(error);
        }else{
          console.log("Email is sent");
        }
      })
  
    } catch (error) {
      console.error("Error in registration:", error);
      res.status(400).send({ error: error.message });  
    }
};

// Handle Login process
async function  handleUserLogin(req,res){

    try{
        const emp = await employeeModel.findOne({id:req.body.id});
        //console.log(emp)

        if(emp==undefined){
            return res.status(404).send({
                success:false,
                message:`ID is not valid`
            });
        }

        //first decode the password and compare with original pass 
        console.log(req.body.pass,emp.pass)        
        const statusoflogin = await bcrypt.compare(req.body.pass,emp.pass)
        console.log("SOLOGIN: ",statusoflogin)
        if(!statusoflogin){
            return res.status(500).send({
                        success:false,
                        message:'Invalid Password'   
                    });
        }

        //token for JWT
        const token =  await emp.generateAuthToken();  
        console.log('TOKEN: ',token)

        res.cookie("jwt",token,{
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
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
            message:'Login Error',
            error
        });
    }
};

 

async function handleChangePassword(req,res){

    try{
        // first get user from the data base
        const emp = await employeeModel.findOne({id:req.body.id}); 
    
        if(emp==undefined){
            return res.status(404).send({
                success:false,
                message:'ID is not valid'
            })
        }

        const currpassword = req.body.currpassword;
        const newpassword = req.body.newpassword; 
        
    
        console.log(currpassword,newpassword)
        console.log(currpassword,emp.pass);


        const statusofchange = await bcrypt.compare(req.body.currpassword,emp.pass)

        console.log(statusofchange,currpassword)

        if(!statusofchange){
            return res.status(500).send({
                        success:false,
                        message:'Invalid Password'   
                    });
        }
         

        //token for JWT
        const token =  await emp.generateAuthToken();  
    
        res.cookie("jwt",token,{
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          httpOnly:true,
        })

        emp.pass =  await bcrypt.hash(newpassword,10);;
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
            message:'Error in password change',
            error
        });
    }
};
async function handleSendEmailForChangePassword(req,res){

    try{
         
        const emp = await employeeModel.findOne({id:req.body.id});
        const mail = emp.mail; 
    
        if(emp==undefined){
            return res.status(404).send({
                success:false,
                message:'ID is not valid'
            })
        } 
        var pass = generatePassword(); 

        const mailSendToEmployee = {
            from: "mistryriddhi1510@gmail.com",
            to: mail,
            subject:"OTP for reset password",
            text: `Dear ${emp.name},
    
            our One Time Password (OTP) for Reset password is: ${pass} 
     
            Best regards,
            Admin Team
            StaffGrid\n`,
          }
          pass = await bcrypt.hash(pass,10) 
          emp.pass = pass;
          console.log(pass,"hashPassW: ",emp.pass)
          await emp.save();

        adminSendeMail.sendMail(mailSendToEmployee,(error,info)=>{
            if(error){
              console.log("Sending Email Error",error);
              return res.status(500).send(error);
            }else{
              console.log("Email is sent");
            }
          }) 

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Email is not sent Password ERROR',
            error
        });
    }
};

 
// handle User Logout Process 
async function handleUserLogout(req,res){
    try {
        req.employee.tokens = [];
        //console.log(req.employee);
        await req.employee.save();  
        res.clearCookie("jwt");
        res.send({ message: "Logged out successfully" });

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};



module.exports ={
    handleUserRegistration,
    handleUserLogin,
    handleSendEmailForChangePassword,
    handleChangePassword,
    handleUserLogout
}