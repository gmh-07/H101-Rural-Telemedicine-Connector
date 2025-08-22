import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/navbar";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./AI.css";

const AI = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      const newMap = L.map(mapRef.current).setView([19.076, 72.8777], 5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(newMap);

      newMap.on("click", (e) => {
        const { lat, lng } = e.latlng;

        if (marker) {
          marker.setLatLng([lat, lng]);
        } else {
          const newMarker = L.marker([lat, lng]).addTo(newMap);
          setMarker(newMarker);
        }
      });

      mapInstance.current = newMap;

      // 👇 this fixes the "half map" rendering issue
      setTimeout(() => {
        newMap.invalidateSize();
      }, 100);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [marker]);

  return (
    <div className="ai-page">
      <Navbar />
      <div className="ai-header">
        <h1>Click on your exact location from the map below</h1>
      </div>
      <div className="ai-map-container">
        <div className="ai-map" ref={mapRef}></div>
      </div>
    </div>
  );
};

export default AI;