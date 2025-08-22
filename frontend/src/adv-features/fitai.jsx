import React from 'react';
import './fitai.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const FitAi = () => {
  return (
    <>
      <Navbar/>
      <div className="ai-page-container">
        <iframe
          src="https://fitness-ai-weld.vercel.app/"
          title="FitBuddy AI"
          className="ai-iframe"
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <div className="ai-footer-strip"></div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default FitAi;