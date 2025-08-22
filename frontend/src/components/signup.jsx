import React from "react";
import "./signup.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import Navbar from "./navbar";

const SignUp = () => {

  const navigate=useNavigate();

  const firstname=useRef(null);
  const lastname=useRef(null);
  const email=useRef(null);
  const password=useRef(null);

   const handleManualSignUp=async(e)=>{
    e.preventDefault();
    console.log("here aaya")
    if( password.current?.value==="" || email.current?.value==="" || firstname.current.value=="" || lastname.current.value==""){
        alert("Enter Valid Details Only");
        return;
    }
     else{
    
           const resp=await axios.post("http://localhost:3000/user/register",{
              firstname:firstname.current.value,
              lastname:lastname.current.value,
                email:email.current?.value,
                password:password.current?.value
            },{withCredentials:true})

            if(resp.data.message=="Email_Present"){
              alert("Email Already Present!!");
              return;
            }
         
            console.log("custom backend",resp);
            if(resp.data.message==="OTP_Send"){
                console.log("email aa gaya!!",email);
                navigate("/Otpverify",{state:{email:resp.data.email}})
            }
    
          }
     

}

    

  return (
    <>
    <Navbar/>
    <div className="signup-page">
      {/* Left - Video */}
      <div className="signup-video">
        <video autoPlay muted loop playsInline>
          <source src="https://cdn.dribbble.com/userupload/11688966/file/original-cc8c4251d04b1e2106dffb732e809e6c.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay">
          <h1>Welcome to HealthCare+</h1>
          <p>Connecting doctors & patients with modern solutions</p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="signup-form-container">
        <div className="signup-form">
          <h2>Create Account</h2>
          <p className="subtitle">Join the healthcare portal today</p>

          <form>
            <div className="form-group">
              {/* <label>Full Name</label> */}
              <input ref={firstname} type="text" placeholder="Enter your first name" required />
            </div>
            <div className="form-group">
              {/* <label>Full Name</label> */}
              <input ref={lastname} type="text" placeholder="Enter your last name" required />
            </div>


            <div className="form-group">
              {/* <label>Email</label> */}
              <input ref={email} type="email" placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              {/* <label>Password</label> */}
              <input ref={password} type="password" placeholder="Create a strong password" required />
            </div>

            {/* <div className="form-group">
              <input type="password" placeholder="Confirm your password" required />
            </div> */}

            <button onClick={handleManualSignUp} type="submit" className="signup-btn">Sign Up</button>
          </form>

          <p className="footer">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default SignUp;
