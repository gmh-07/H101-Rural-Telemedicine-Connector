import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/navbar";
import "./AI.css";

const AI = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const defaultCenter = { lat: 19.076, lng: 72.8777 }; // Mumbai

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const addressRef = useRef(null);

  const handleAddress = async () => {
    if (!addressRef.current?.value) {
      alert("Please enter a valid address");
      return;
    }

    try {
      const resp = await axios.post(
        "http://localhost:3000/user/address",
        {
          latitude,
          longitude,
          address: addressRef.current.value,
        },
        { withCredentials: true }
      );

      if (resp.data.message === "done") {
        navigate("/verifyacc");
      }
    } catch (err) {
      console.error("Error saving address", err);
    }
  };

  useEffect(() => {
    if (!window.google) return; // ensure Maps script is loaded

    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 5,
      center: defaultCenter,
    });

    let marker = null;

    map.addListener("click", (mapsMouseEvent) => {
      const clicked = mapsMouseEvent.latLng.toJSON();
      setLatitude(clicked.lat);
      setLongitude(clicked.lng);

      if (marker) {
        marker.setMap(null);
      }
      marker = new window.google.maps.Marker({
        position: mapsMouseEvent.latLng,
        map,
      });
    });
  }, []);

  return (
    <div className="ai-page">
      <Navbar />

      <div className="ai-header">
        <h1>Click On Your Exact Location From The Map Below</h1>
      </div>

      <div className="ai-map" ref={mapRef}></div>

      <div className="ai-form">
        <input
          ref={addressRef}
          type="text"
          placeholder="Enter Your Correct Address"
          className="ai-input"
        />
        <button onClick={handleAddress} className="ai-btn">
          Step 2/3
        </button>
        <button onClick={() => navigate("/create")} className="ai-btn">
          Back
        </button>
      </div>
    </div>
  );
};

export default AI;
