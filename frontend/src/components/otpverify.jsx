import React, { useRef } from "react";
import "./signup.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const OTP = () => {
  const otpref = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // ✅ we get the email passed from SignUp page

  console.log("otp page ",email);

  const verifyotp = async (e) => {
    e.preventDefault();
    console.log("Verifying OTP...");

    if (otpref.current.value === "") {
      alert("Enter Valid OTP");
      return;
    }

    try {
      const resp = await axios.post(
        "http://localhost:3000/user/verifyOTP",
        {
          email: email,
          otp: otpref.current.value,
        },
        { withCredentials: true }
      );

      if (resp.data.message === "User_not_exist") {
        alert("Invalid user OTP!!");
        return;
      }

      if (resp.data.message === "INVALID_OTP") {
        alert("Invalid OTP");
        return;
      }

      console.log("custom backend", resp);

      if (resp.data.message === "Verified_otp") {
        console.log("verified");
        navigate("/", { state: { email: email } });
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      alert("Something went wrong, try again!");
    }
  };

  return (
    <div className="signup-page">
      {/* Left - Video */}
      <div className="signup-video">
        <video autoPlay muted loop playsInline>
          <source src="https://cdn.dribbble.com/userupload/11688966/file/original-cc8c4251d04b1e2106dffb732e809e6c.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay">
          <h1>Welcome to HealthCare+</h1>
          <p>Verify your email with OTP</p>
        </div>
      </div>

      {/* Right - OTP Form */}
      <div className="signup-form-container">
        <div className="signup-form">
          <h2>Email Verification</h2>
          <p className="subtitle">Enter the OTP sent to your email</p>

          <form onSubmit={verifyotp}>
            <div className="form-group">
              <input
                ref={otpref}
                type="text"
                placeholder="Enter OTP"
                required
              />
            </div>

            <button type="submit" className="signup-btn">
              Verify OTP
            </button>
          </form>

          <p className="footer">
            Didn’t receive the OTP? <a href="/resend-otp">Resend</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTP;
