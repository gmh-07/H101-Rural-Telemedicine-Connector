import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";

const Location = () => {
  const navigate = useNavigate();
  const addressId = useLocation().state;

  const mapRef = useRef(null);
  const addressRef = useRef(null);
  const myLatlng = { lat: 19.076, lng: 72.8777 };

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleAddress = async () => {
    if (addressRef.current?.value === "") {
      alert("Please Enter Valid Address");
      return;
    } else {
      const resp = await axios.post(
        "http://localhost:3000/user/address",
        {
          id: addressId,
          lattitude: latitude,
          longitude: longitude,
          address: addressRef.current?.value,
        },
        { withCredentials: true }
      );
      if (resp.data.message === "done") {
        navigate("/verifyacc", { state: addressId });
      }

      console.log(resp);
    }
  };

  useEffect(() => {
    const loadScript = (url) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${url}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = url;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = (err) => reject(err);
        document.body.appendChild(script);
      });
    };

    const initMap = () => {
      if (mapRef.current && window.google) {
        const map = new window.google.maps.Map(mapRef.current, {
          zoom: 4,
          center: myLatlng,
        });

        let infoWindow = new window.google.maps.InfoWindow({
          content: "Click the map to get Your Location!",
          position: myLatlng,
        });

        infoWindow.open(map);

        map.addListener("click", (mapsMouseEvent) => {
          infoWindow.close();
          infoWindow = new window.google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
          });
          console.log(mapsMouseEvent.latLng.toJSON());
          setLatitude(mapsMouseEvent.latLng.toJSON().lat);
          setLongitude(mapsMouseEvent.latLng.toJSON().lng);
          infoWindow.setContent("Thanks for Sharing Your Location");
          infoWindow.open(map);
        });
      }
    };

    // Load Google Maps script and then init map
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyASxn6LcICFwmL4ao9hyEgni2HZlZjkWxA&libraries=places`
    )
      .then(() => {
        initMap();
      })
      .catch((err) => {
        console.error("Google Maps script failed to load:", err);
      });
  }, []);

  return (
      <div className="w-full h-screen bg-green-600">
        <div ref={mapRef} className="w-full h-full rounded-lg shadow-md" />
      </div>
  );
};

export default Location;
