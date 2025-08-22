
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
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
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



//  userRouter.get("/getlist",async(req,res)=>{
        

//    //  const token = req.cookies.uidcookie;
   
//    //     if (!token) {
//    //         return res.json({ message: "not_signedIn" });
//    //     }
   
//        const { userLattitude, userLongitude } = req.query;

//         const lattitude = parseFloat(userLattitude);
//         const longitude = parseFloat(userLongitude);

//        console.log("userlat in backend",userLattitude);
//        console.log("userlng in bk",userLongitude);
   
//        const AllClinicsFromDB = await Doctormodel.find({});
   
     
//        let ClinicDistanceFromUser = AllClinicsFromDB.map(clinic => ({
//            distance: getDistanceFromLatLonInKm(lattitude, longitude, clinic.latitude, clinic.longitude),
//            latitude: clinic.latitude,
//            longitude: clinic.longitude
//        }));

//        console.log(ClinicDistanceFromUser);
   
      
//        ClinicDistanceFromUser.sort((a, b) => a.distance - b.distance);
   
//        let NearestClinicArray =[];
   
//        //top 3 clinics only  just ensure that more than 3 clinics must present
//        for(let i=0;i<3;i++){
//            NearestClinicArray.push(ClinicDistanceFromUser[i]);
//        }
   

//        console.log(NearestClinicArray);


//        res.json({
//            message: "nearest clinics location",
//            NearestClinicArray
//        });

//  })



// userRouter.get("/getlist", async (req, res) => {
//     try {
//         const { userLattitude, userLongitude } = req.query;

//         if (!userLattitude || !userLongitude) {
//             return res.status(400).json({ message: "Missing latitude or longitude" });
//         }

//         const userLat = parseFloat(userLattitude);
//         const userLng = parseFloat(userLongitude);

//         console.log("User location:", userLat, userLng);

//         const allDoctors = await Doctormodel.find({});

//         // Map doctors to include distance from user
//         const doctorsWithDistance = allDoctors.map(doc => ({
//             name: doc.name,
//             profession: doc.profession,
//             yoe: doc.yoe,
//             location: doc.location,
//             latitude: doc.latitude,
//             longitude: doc.longitude,
//             distance: getDistanceFromLatLonInKm(userLat, userLng, doc.latitude, doc.longitude)
//         }));

//         // Sort by distance ascending
//         doctorsWithDistance.sort((a, b) => a.distance - b.distance);

//         // Get top 3 nearest doctors
//         const nearestDoctors = doctorsWithDistance.slice(0, 3);

//         console.log("Nearest doctors:", nearestDoctors);

//         res.json({
//             message: "Nearest doctors fetched successfully",
//             nearestDoctors
//         });
//     } catch (error) {
//         console.error("Error fetching doctors:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });



// userRouter.get("/getlist", async (req, res) => {
//     try {
//         const { userLattitude, userLongitude } = req.query;

//         if (!userLattitude || !userLongitude) {
//             return res.status(400).json({ message: "Missing latitude or longitude" });
//         }

//         const userLat = parseFloat(userLattitude);
//         const userLng = parseFloat(userLongitude);

//         const allDoctors = await Doctormodel.find({});

//       //   const doctorsWithDistance = allDoctors.map(doc => ({
//       //       name: doc.name,
//       //       profession: doc.profession,
//       //       yoe: doc.yoe,
//       //       location: doc.location,
//       //       latitude: doc.latitude,
//       //       longitude: doc.longitude,
//       //       distance: getDistanceFromLatLonInKm(userLat, userLng, doc.latitude, doc.longitude)
//       //   }));


//       const ClinicDistanceFromUser = AllClinicsFromDB.map(clinic => ({
//   distance: getDistanceFromLatLonInKm(
//     latitude,
//     longitude,
//     clinic.latitude,  // correct field name
//     clinic.longitude
//   ),
//   name: clinic.name,
//   profession: clinic.profession,
//   yoe: clinic.yoe,
//   location: clinic.location,
//   latitude: clinic.latitude,
//   longitude: clinic.longitude
// }));


//         // Sort by nearest distance
//      ClinicDistanceFromUser.sort((a, b) => a.distance - b.distance);
// const nearestDoctors = ClinicDistanceFromUser.slice(0, 3);

// console.log(nearestDoctors);

//         res.json({
//             message: "Nearest doctors fetched",
//             nearestDoctors
//         });
//     } catch (err) {
//         console.error("Error fetching nearest doctors:", err);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });


userRouter.get("/getlist", async (req, res) => {
    try {
        const { userLattitude, userLongitude } = req.query;

        if (!userLattitude || !userLongitude) {
            return res.status(400).json({ message: "Missing latitude or longitude" });
        }

        const userLat = parseFloat(userLattitude);
        const userLng = parseFloat(userLongitude);

        const allDoctors = await Doctormodel.find({});

        console.log("all docotr",allDoctors);

        // Map doctors with distance from user
        const doctorsWithDistance = allDoctors.map(doc => ({
            name: doc.name,
            profession: doc.profession,
            yoe: doc.yoe,
            location: doc.location,
            latitude: doc.latitude,
            longitude: doc.longitude,
            distance: getDistanceFromLatLonInKm(userLat, userLng, doc.latitude, doc.longitude)
        }));

        // Sort by nearest distance
        doctorsWithDistance.sort((a, b) => a.distance - b.distance);

        // Pick top 3 nearest doctors
        const nearestDoctors = doctorsWithDistance.slice(0, 3);

        console.log("Nearest doctors:", nearestDoctors);

        res.json({
            message: "Nearest doctors fetched",
            nearestDoctors
        });
    } catch (err) {
        console.error("Error fetching nearest doctors:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});



 module.exports={
 userRouter:userRouter
        }