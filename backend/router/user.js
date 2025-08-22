
const express = require("express");
const userRouter = express.Router();
const z =require('zod');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {userModel,otpmodel}=require("../db/db");
const JWT_KEY=process.env.JWT_KEY;
const otpgenerator=require("otp-generator");
const sendemail=require("../otplogic/otp");

userRouter.post("/register", async function(req,res){
     const requiredatas=z.object({
        firstname:z.string().min(3).max(100),
        lastname:z.string().min(5).max(100),
        email:z.string().min(5).max(100),
        password:z.string().min(5).max(100)
     })

     const checkdata=requiredatas.safeParse(req.body);


     if(!checkdata.success){
        res.status(422).send("Invalid Input types");
        return;
    }

     const {firstname,lastname,email,password}=req.body;
     const hashedpassword=await bcrypt.hash(password,5);
     console.log(firstname);
     console.log(lastname);
     console.log(email);
     console.log(password);

   
     const checkAlreadyEmailExistOrNot=await userModel.findOne({
        email:email
     })

     console.log("check error  s ",checkAlreadyEmailExistOrNot);

     if(checkAlreadyEmailExistOrNot){
        res.json({
            message:"Email_Present"
        })
        return;
     }

     const registerUser=await userModel.create({
          firstname:firstname,
          lastname:lastname,
          password:hashedpassword,
          email:email
     })


      const otp=otpgenerator.generate(6,{
        digits:true,upperCaseAlphabets:false,specialChars:false,lowerCaseAlphabets:false
     })

        const response=await otpmodel.create({
            email:email,
            otp:otp
        })

     await sendemail(registerUser.email,"OTP-VERIFICATION",otp);
               
     res.json({
        message:"OTP_Send",
        email:email
     })

})





userRouter.post("/logIn", async function(req,res){
    const requiredatas=z.object({
        email:z.string().min(3).max(100).email(),
        password:z.string().min(5).max(100)
     })

     const checkdata=requiredatas.safeParse(req.body);
     if(!checkdata.success){
        res.json({
            message:checkdata.error,
        })
        return;
     }

      const {email,password} =req.body;
      console.log("login in bac",email)
      console.log("login in bac",password)
      const checkedUser=await userModel.findOne({
         email:email
      })

      if(!checkedUser){
        res.json({
            message:"User_not_exists"
        })
        return;
      }
      const finduser= await bcrypt.compare(password,checkedUser.password);
      

      if(finduser){
          const token=jwt.sign({
             id:checkedUser._id
            },JWT_KEY)
            res.json({
                token:token,
                message:"logedin"
            })
        }else{
            res.json({
                message:"User_not_exists"
            })
            return;
        }           
})





 userRouter.post("/verifyOTP",async(req,res)=>{
             const {email,otp}=req.body;

             

             console.log("backend otp worksing")
             console.log(req.body);
             console.log(email);
             console.log(otp);

             const FindUserFromDB=await userModel.findOne({
                email:email
             })

             if(!FindUserFromDB){
                res.json({
                 message:"User_not_exist"
                })
                return;
              }

             const FindUserWithOTP=await otpmodel.findOne({
               otp:otp
             })

             if(!FindUserWithOTP){
               res.json({
                message:"INVALID_OTP"
               })
               return;
             }
             const verifyUserTrue=await userModel.updateOne({
                  email:email,
                  verified:true
             })

             await otpmodel.findByIdAndDelete({
                _id:FindUserWithOTP._id
             })

             res.json({
                message:"Verified_otp"
             })
 })


 module.exports={
 userRouter:userRouter
        }