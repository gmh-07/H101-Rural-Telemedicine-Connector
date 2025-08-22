import React, { useRef, useEffect } from "react";

const BigVideo = ({ src, poster, loop = true }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true; // 🔥 autoplay ke liye mute karna zaruri hai
      video.play().catch((err) => {
        console.log("Autoplay blocked:", err);
      });
    }
  }, []);

  const containerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "2rem 0",
  };

  const videoStyle = {
    width: "90%",
    maxWidth: "1200px",
    height: "auto",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "scale(1.02)";
    e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.3)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
  };

  return (
    <div style={containerStyle}>
      <video
        ref={videoRef}
        style={videoStyle}
        src={src}
        poster={poster}
        loop={loop}
        playsInline
        muted
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BigVideo;
