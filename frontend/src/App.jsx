import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./components/login";
import Footer from "./components/footer";
import SignUp from "./components/signup";
import Contact from "./pages/contact";
import About from "./pages/about";
import Home from "./pages/Home";
import Location from './pages/Location'
import Leaderboard from "./pages/leaderboard";
import Advancedfeatures from "./pages/advancedfeatures";
import OTP from "./components/otpverify";
import AI from "./pages/AI";
import FitAi from "./adv-features/fitai";
import Symptompsai from "./adv-features/symptompsai";
import Healthcost from "./adv-features/healthcost";
import BMI from "./adv-features/bmi";


function App() {
  return (
    <>
      <Routes>
         <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Location" element={<Location/>}/>
        <Route path="/doctors" element={<Leaderboard/>}/>
        <Route path="/Otpverify" element={<OTP/>}/>
        <Route path="/advanced-features" element={<Advancedfeatures/>}/>
        <Route path="/aifeature" element={<AI/>}/>
        <Route path="advanced-features/fitai" element={<FitAi/>}/>
        <Route path="/advanced-features/doctor-ai" element={<BMI/>}/>
        <Route path="/advanced-features/symptoms-checker-ai" element={<Symptompsai/>}/>
        <Route path="/advanced-features/health-cost-calculator" element={<Healthcost/>}/>
      </Routes>
  
    
    </>
  );
}

export default App;