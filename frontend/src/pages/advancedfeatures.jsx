import React from 'react';
import { useNavigate } from 'react-router-dom';
import './advancedfeatures.css'; // We'll create this CSS file
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const AdvancedFeatures = () => {
  const navigate = useNavigate();

  const features = [
    {
  id: 1,
  title: "BMI Calculator",
  description: "AI medical assistant that analyzes symptoms, provides health precautions, and suggests appropriate medications for better healthcare decisions 🩺",
  author: "By agenixsoft.in",
  icon: "🩺", // Medical stethoscope icon
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  route: "/advanced-features/doctor-ai"
}
,
    {
  id: 2,
  title: "Fit AI",
  description: "AI-powered fitness companion providing personalized workout routines, meal planning, exercise form guidance, and health tracking for optimal results 🏋️‍♂️",
  author: "By agenixsoft.in",
  icon: "🏋️‍♂️", // Weight lifting icon
  gradient: "linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%)", // Energetic orange-red
  route: "/advanced-features/fitai"
}
,
    {
  id: 3,
  title: "Symptoms Checker AI",
  description: "AI-powered symptom analysis in just 3 minutes. Get personalized health reports, doctor recommendations, and treatment guidance developed by medical professionals 🩺",
  author: "By esabel",
  icon: "🩺", // Medical stethoscope icon
  gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  route: "/advanced-features/symptoms-checker-ai"
}
,
    {
      id: 4,
      title: "HealthCare Cost Calculator",
      description: "Advanced AI agents for legal and professional work. Upload briefs, contacts and other documents to...",
      author: "agenixsoft.in",
      icon: "📄",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      route: "/advanced-features/health-cost-calculator"
    }
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <>
    <Navbar/>
    <div className="features-container">
      <div className="features-grid">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="feature-card"
            onClick={() => handleCardClick(feature.route)}
            style={{ '--card-gradient': feature.gradient }}
          >
            <div className="card-content">
              <div className="icon-wrapper">
                <span className="feature-icon">{feature.icon}</span>
              </div>
              
              <div className="text-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <span className="feature-author">{feature.author}</span>
              </div>
            </div>
            
            <div className="card-overlay"></div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AdvancedFeatures;
