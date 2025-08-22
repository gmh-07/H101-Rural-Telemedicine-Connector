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
      <div style={{ height: "650px", position: "relative" }}>
        <CircularGallery bend={0} textColor="#ffffff" borderRadius={0.05} />
      </div>
      <HowItWorks />
      <Doctors />
      <Footer />
    </>
  );
};

export default Home;
