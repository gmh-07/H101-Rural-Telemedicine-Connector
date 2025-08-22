import React from 'react';
import './doctorai.css'; // We'll create this CSS file for styling
import Navbar from '@/components/navbar';

const Doctorai = () => {
  return (
    <>
      <Navbar/>
      <div className="doctorai-container">
        <div className="doctorai-header">
          <h1>Doctor AI Assistant</h1>
          <p>Get expert medical guidance 24/7 with AI-powered healthcare consultations</p>
        </div>
        
        <div className="iframe-wrapper">
          <iframe
            src="https://iframe.legit.health?company=5hs4s2mK5ajoUAZRKKb5JYEDCoZj3yNWNn18RaqTR4qnBzgViZfwmPNVWa3aci5m&primary=0079c8&secondary=0079c8&fontFamily=Roboto&macroscopicMedia=required&enableResult=1&isForPatient=1&locale=en&showQuestionnairesHeader=1&enableAnamnesis=1&enableQrUpload=1&enableExtendedInstructions=1&enableAlternativeCameraModule=1&enableAlternativeCameraModuleAndroid=1&extraData=user3278293928"
            title="Legit Health AI Doctor"
            className="doctorai-iframe"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
            allow="camera; microphone; geolocation"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
          />
        </div>
        
        <div className="doctorai-footer">
          <div className="disclaimer">
            <h3>⚠️ Important Medical Disclaimer</h3>
            <p>
              This AI assistant is for informational purposes only and should not replace professional medical advice. 
              Always consult with qualified healthcare providers for medical decisions. In case of emergency, call 911 immediately.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctorai;
