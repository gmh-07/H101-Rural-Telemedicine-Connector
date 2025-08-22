const dotenv=require("dotenv");
dotenv.config();
const express=require("express")
const {userRouter}=require("./router/user")
const  cors =require('cors');
// import cookieparser from 'cookie-parser';
const app=express();
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true, 
}))
app.use(express.json());


app.use("/user",userRouter);


app.listen(3000,()=>{
    console.log("Server started!!!");
})