import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/navbar";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./AI.css";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AI = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const latt = useRef(null);
  const lang = useRef(null);

  const navigate = useNavigate();
  const [hasPickedLocation, setHasPickedLocation] = useState(false);
  const [loading, setLoading] = useState(false);

  const givelist = async (e) => {
    e.preventDefault();
    if (!hasPickedLocation || latt.current == null || lang.current == null) return;
    try {
      setLoading(true);
      const doctorList = await axios.get("http://localhost:3000/user/getlist", {
        params: {
          userLattitude: latt.current,
          userLongitude: lang.current,
        },
      });
      if (doctorList?.data?.nearestDoctors) {
        navigate("/listeddoctor", { state: { doctorList: doctorList.data.nearestDoctors } });
      }
    } catch (err) {
      console.error("Failed to fetch doctors:", err);
      // Optionally show a toast or inline error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      const map = L.map(mapRef.current, { zoomControl: false }).setView([20.5937, 78.9629], 5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
      }).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        latt.current = lat;
        lang.current = lng;
        setHasPickedLocation(true);

        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng]).bindPopup("Location selected").openPopup();
        } else {
          markerRef.current = L.marker([lat, lng]).addTo(map).bindPopup("Location selected").openPopup();
        }
      });

      mapInstance.current = map;

      setTimeout(() => map.invalidateSize(), 120);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="ai150-page">
      <Navbar />

      <header className="ai150-header">
        <h1 className="ai150-title">Find Doctors Near You</h1>
        <p className="ai150-subtitle">Tap on the map to select your location. Then get a clean list of nearby doctors.</p>
      </header>

      <main className="ai150-content">
        <section className="ai150-card">
          <div className="ai150-mapWrap">
            <div ref={mapRef} className="ai150-map" />
            <div className="ai150-hint">Click on the map to drop a pin at your location</div>
          </div>

          <div className="ai150-controls">
            <button
              onClick={givelist}
              className={`ai150-btn ${!hasPickedLocation || loading ? "ai150-btn--disabled" : ""}`}
              disabled={!hasPickedLocation || loading}
              aria-disabled={!hasPickedLocation || loading}
            >
              {loading ? "Fetching doctors..." : "Get Doctors"}
              <FaArrowRight size={14} />
            </button>
            {!hasPickedLocation && <span className="ai150-help">Select a location on the map to continue</span>}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AI;
