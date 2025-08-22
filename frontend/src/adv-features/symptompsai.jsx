import React, { useState } from 'react';
import './symptomsai.css'; // We'll create this CSS file
import Navbar from '@/components/navbar';

const Symptompsai = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Navbar/>
      <div className="symptoms-ai-container">
        <div className="symptoms-ai-header">
          <h1>Symptoms Checker AI</h1>
          <p>Get AI-powered health insights in just 3 minutes - developed by doctors, trusted worldwide</p>
        </div>
        
        <div className="iframe-wrapper">
          {isLoading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
              <p>Loading Ubie Health Symptom Checker...</p>
            </div>
          )}
          
          <iframe
            src="https://symptomchecker.isabelhealthcare.com/isabel-tool-page"
            title="Symptoms Checker AI"
            className="symptoms-ai-iframe"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
            allow="camera; microphone; geolocation"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
            onLoad={() => setIsLoading(false)}
            style={{ opacity: isLoading ? 0 : 1 }}
          />
        </div>
        
        <div className="symptoms-ai-footer">
          <div className="features-highlight">
            <h3>✨ Why Choose Ubie Health?</h3>
            <div className="features-grid">
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <div>
                  <strong>71.6% Top-10 Accuracy</strong>
                  <p>Outperforms leading symptom checkers</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">⏱️</span>
                <div>
                  <strong>Just 3 Minutes</strong>
                  <p>Quick, personalized health assessment</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">👨‍⚕️</span>
                <div>
                  <strong>Doctor Developed</strong>
                  <p>Created by medical professionals worldwide</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🏆</span>
                <div>
                  <strong>Award Winning</strong>
                  <p>Google Play Best of 2023, Newsweek recognition</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="disclaimer">
            <h3>⚠️ Important Medical Disclaimer</h3>
            <p>
              This AI symptom checker provides health insights for informational purposes only and should not replace professional medical advice. 
              Always consult with qualified healthcare providers for medical decisions. In case of emergency, call 911 immediately.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Symptompsai;
