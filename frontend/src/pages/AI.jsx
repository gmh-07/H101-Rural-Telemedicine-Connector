import { useEffect, useRef } from "react";
import Navbar from "@/components/navbar";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./AI.css";

const AI = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      const newMap = L.map(mapRef.current).setView([19.076, 72.8777], 5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(newMap);

      newMap.on("click", (e) => {
        const { lat, lng } = e.latlng;
        console.log("Latitude:", lat);
        console.log("Longitude:", lng);

        if (markerRef.current) {
          // move existing marker
          markerRef.current
            .setLatLng([lat, lng])
            .bindPopup("Thanks for Sharing Your Location")
            .openPopup();
        } else {
          // create new marker
          markerRef.current = L.marker([lat, lng])
            .addTo(newMap)
            .bindPopup("Thanks for Sharing Your Location")
            .openPopup();
        }
      });

      mapInstance.current = newMap;

      // fix half-render issue
      setTimeout(() => {
        newMap.invalidateSize();
      }, 100);
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
    <div className="ai-page">
      <Navbar />
      <div className="ai-header">
        <h1>Find Nearest Doctor At Your Location</h1>
        <h4>Click on below map at your location and get nearby doctor list</h4>
      </div>
      <div className="ai-map-container">
        <div className="ai-map" ref={mapRef}></div>
      </div>
    </div>
  );
};

export default AI;
