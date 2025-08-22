import Hero from "../components/Hero";
import BlurText from "../components/BlurText"; // Updated correct path
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Doctors from "@/components/Doctors";
import ScrollRevealText from "@/components/ScrollRevealText";
import Marquee from "@/components/Marquee";
import CircularGallery from "@/components/circulargallery";
import ImmediateMedicalConsult from "@/components/ImmediateMedicalConsult";
import BigVideo from "@/components/BigVideo"; 
import img from "../assets/image.png"
import "./home.css"

const Home = () => {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />
      <Services />

      {/* ✅ Big Video Section */}
      <BigVideo
        src="https://cdn.dribbble.com/userupload/36596768/file/large-7443d14a4ed690cca96c7006ef69a139.mp4"
        poster="/images/video-poster.jpg"
        autoplay={false}
        controls={true}
        loop={true}
      />

      <div style={{ height: "650px", position: "relative" }}>
        <CircularGallery bend={0} textColor="#ffffff" borderRadius={0.05} />
      </div>
      <HowItWorks />
      <img className="imgInHome" src={img}></img>
      <Doctors />
      <ImmediateMedicalConsult />
      <Footer />
    </>
  );
};

export default Home;
