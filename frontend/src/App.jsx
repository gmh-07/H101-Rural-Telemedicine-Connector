import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./components/login";
import Footer from "./components/footer";
import SignUp from "./components/signup";
import Contact from "./pages/contact";
import About from "./pages/about";
import Home from "./pages/Home";
import Location from './pages/Location';
import Leaderboard from "./pages/leaderboard";
import Advancedfeatures from "./pages/advancedfeatures";
import OTP from "./components/otpverify";
import AI from "./pages/AI";
import FitAi from "./adv-features/fitai";
<<<<<<< HEAD
import Symptompsai from "./adv-features/symptompsai";
import Healthcost from "./adv-features/healthcost";
import BMI from "./adv-features/bmi";
=======
import ListedDoctor from  "./pages/listeddoctor";;
>>>>>>> 54d39e4919ca566582ec4fe1e0e9a5294eead1f9


function App() {
  const [loadingFinished, setLoadingFinished] = useState(false);

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
        <Route path="/listeddoctor" element={<ListedDoctor/>}/>
        <Route path="/aifeature" element={<AI/>}/>
        <Route path="advanced-features/fitai" element={<FitAi/>}/>
<<<<<<< HEAD
        <Route path="/advanced-features/doctor-ai" element={<BMI/>}/>
        <Route path="/advanced-features/symptoms-checker-ai" element={<Symptompsai/>}/>
        <Route path="/advanced-features/health-cost-calculator" element={<Healthcost/>}/>
=======
>>>>>>> 54d39e4919ca566582ec4fe1e0e9a5294eead1f9
      </Routes>
  
    
    </>
  );
}

export default App;
