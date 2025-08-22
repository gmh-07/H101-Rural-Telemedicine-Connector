import React, { useRef } from "react";
import "./login.css";
import Navbar from "./navbar";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
   
  const navigate=useNavigate();
  const emailref=useRef(null);
  const passref=useRef(null);


     const handlesignIn=async(e)=>{
    e.preventDefault();
    console.log("here in sign in")
    if( passref.current?.value==="" || emailref.current?.value===""){
        alert("Enter Valid Details Only");
        return;
    }
     else{
    
           const resp=await axios.post("http://localhost:3000/user/logIn",{
                email:emailref.current?.value,
                password:passref.current?.value
            },{withCredentials:true})

            if(resp.data.message=="User_not_exists"){
              alert("User not present!!");
              return;
            }
         
           
            if(resp.data.message==="logedin"){
                
                navigate("/",{state:{email:resp.data.email}})
            }
    
          }
     

}

  


  return (
    <>
    <Navbar/>
    <div className="auth-page">
      {/* Left: Healthcare video (65%) */}
      <div className="auth-media">
        <video autoPlay muted loop playsInline>
          {/* Use the same video URL you used in Signup to keep parity */}
          <source src="https://cdn.dribbble.com/userupload/11688966/file/original-cc8c4251d04b1e2106dffb732e809e6c.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay copy (optional) */}
        <div className="auth-overlay">
          <h1>Welcome Back</h1>
          <p>Secure access to your healthcare portal</p>
        </div>
      </div>

      {/* Right: Login form (35%) */}
      <div className="auth-form-wrap">
        <div className="auth-form">
          <h2>Sign In</h2>
          <p className="subtitle">Continue to HealthCare+</p>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Email Address</label>
              <input ref={emailref} type="email" placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input ref={passref} type="password" placeholder="Enter your password" required />
            </div>

            <div className="form-row">
              <label className="checkbox">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a className="link" href="/forgot-password">Forgot password?</a>
            </div>

            <button onClick={handlesignIn} type="submit" className="btn-primary">Sign In</button>
          </form>

          <p className="footnote">
            Don’t have an account? <a onClick={()=>navigate("/signup")} className="link" href="/signup">Create one</a>
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Login;
