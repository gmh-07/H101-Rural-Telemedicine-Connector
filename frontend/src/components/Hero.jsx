import "./Hero.css";
import { FaArrowRight, FaPhone } from "react-icons/fa";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

const Hero = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "agenixsoft" });
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#4F46E5" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <section className="hero">
      {/* Left side */}
      <div className="hero-content">
        <span className="hero-badge">We’re live!</span>
        <h1 className="hero-title">
          This is the start of <br /> something!
        </h1>
        <p className="hero-subtitle">
          Managing a small business today is already tough. Avoid further
          complications by ditching outdated, tedious trade methods. Our goal is
          to streamline SMB trade, making it easier and faster than ever.
        </p>

        {/* Buttons */}
        <div className="hero-buttons">
          {/* Cal.com booking button */}
          <button
            className="hero-btn-outline"
            data-cal-namespace="agenixsoft"
            data-cal-link="agenixsoft.in/30min"
            data-cal-config='{"layout":"month_view","theme":"light"}'
          >
            <FaPhone size={14} style={{ marginRight: "6px" }} />
            Call with Agent
          </button>

          {/* Normal Sign Up Button */}
          <button className="hero-btn-primary">
            Sign up here <FaArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Right side placeholder */}
      <div
        className="hero-image"
        style={{
          backgroundImage:
            "url('https://www.practostatic.com/consumer-home/desktop/images/1597423628/footer-img.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </section>
  );
};

export default Hero;
