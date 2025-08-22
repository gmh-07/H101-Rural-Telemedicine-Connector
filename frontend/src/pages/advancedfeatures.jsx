import React from "react";
import { useNavigate } from "react-router-dom";
import { FaComments, FaImage, FaMicrophoneAlt, FaCode, FaChartBar } from "react-icons/fa";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./advancedfeatures.css";

const features = [
  {
    title: "AI Chat Assistant",
    description: "A conversational AI to answer queries in real-time with natural language.",
    link: "/ai-chat",
    icon: <FaComments />,
  },
  {
    title: "Image Recognition AI",
    description: "Upload and analyze images to detect objects, faces, and scenes accurately.",
    link: "/image-recognition",
    icon: <FaImage />,
  },
  {
    title: "Voice-to-Text AI",
    description: "Convert speech into text instantly with high accuracy and multilingual support.",
    link: "/voice-to-text",
    icon: <FaMicrophoneAlt />,
  },
  {
    title: "AI Code Generator",
    description: "Generate optimized code snippets using AI trained on millions of repositories.",
    link: "/code-generator",
    icon: <FaCode />,
  },
  {
    title: "Data Analytics AI",
    description: "Advanced data-driven insights with visualization and predictive analysis.",
    link: "/data-analytics",
    icon: <FaChartBar />,
  },
];

const AdvancedFeatures = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="advancedfeatures-container">
        <h1 className="advancedfeatures-title">🚀 Advanced Features</h1>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              onClick={() => navigate(feature.link)}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h2 className="feature-title">{feature.title}</h2>
              <p className="feature-desc">{feature.description}</p>
              <button className="feature-btn">Explore →</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdvancedFeatures;
