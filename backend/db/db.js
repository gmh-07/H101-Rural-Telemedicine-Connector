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

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profession: { type: String, required: true },
  yoe: { type: Number, required: true }, // years of experience
  location: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
});



const Doctormodel = mongoose.model("Doctor", doctorSchema);


const usermodel=mongoose.model("users",userSchema);
 const otpmodel=mongoose.model("otps",otpSchema);


module.exports={
    userModel:usermodel,
    otpmodel:otpmodel,
    Doctormodel:Doctormodel
}