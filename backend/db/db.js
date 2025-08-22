const mongoose=require("mongoose")
const schema=mongoose.Schema;

mongoose.connect(process.env.mongourl);


const userSchema=new schema({
    email:{
        type:String,unique:true
    },
    password:String,
    firstname:String,
    lastname:String,
    verified:{
        type:Boolean,
        default:false
    }
})

const otpSchema=new schema({
    email:{
        ref:"users",
        type:String,
        required:true
    },
    otp:{
        type:String,
        unique:true
    },
    createdAt: { type: Date, expires: '5m', default: Date.now }
})


const usermodel=mongoose.model("users",userSchema);
 const otpmodel=mongoose.model("otps",otpSchema);


module.exports={
    userModel:usermodel,
    otpmodel:otpmodel
}