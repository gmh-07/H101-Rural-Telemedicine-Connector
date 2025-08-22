// Hero.tsx
import "./Hero.css";
import { FaArrowRight, FaPhone } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="hero">
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

        <div className="hero-buttons">
          <button
            className="hero-btn-outline"
            onClick={() =>
                  window.open("https://cal.com/agenixsoft.in/30min", "_blank")
                }
          >
            <FaPhone size={14} style={{ marginRight: 6 }} />
            Call with Agent
          </button>

          <a href="/signup" style={{ textDecoration: "none" }}>
            <button className="hero-btn-primary">
              Sign up here <FaArrowRight size={14} />
            </button>
          </a>
        </div>
      </div>

      <div
        className="hero-image"
        style={{
          backgroundImage:
            "url('https://www.practostatic.com/consumer-home/desktop/images/1597423628/footer-img.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </section>
  );
};

export default Hero;