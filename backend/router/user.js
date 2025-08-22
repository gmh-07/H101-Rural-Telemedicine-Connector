
const express = require("express");
const userRouter = express.Router();
const z =require('zod');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {userModel,otpmodel,Doctormodel}=require("../db/db");
const JWT_KEY=process.env.JWT_KEY;
const otpgenerator=require("otp-generator");
const sendemail=require("../otplogic/otp");


function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

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



 userRouter.get("/getlist",async(req,res)=>{
        

   //  const token = req.cookies.uidcookie;
   
   //     if (!token) {
   //         return res.json({ message: "not_signedIn" });
   //     }
   
       const { userLattitude, userLongitude } = req.body;

       console.log("userlat",userLattitude);
       console.log("userlng",userLongitude);
   
       const AllClinicsFromDB = await Doctormodel.find({});
   
     
       let ClinicDistanceFromUser = AllClinicsFromDB.map(clinic => ({
           distance: getDistanceFromLatLonInKm(userLattitude, userLongitude, clinic.Lattitude, clinic.Longitude),
           latitude: clinic.Lattitude,
           longitude: clinic.Longitude
       }));
   
      
       ClinicDistanceFromUser.sort((a, b) => a.distance - b.distance);
   
       let NearestClinicArray =[];
   
       //top 3 clinics only  just ensure that more than 3 clinics must present
       for(let i=0;i<3;i++){
           NearestClinicArray.push(ClinicDistanceFromUser[i]);
       }
   

       console.log(NearestClinicArray);

       
       res.json({
           message: "nearest clinics location",
           NearestClinicArray
       });

 })



 module.exports={
 userRouter:userRouter
        }