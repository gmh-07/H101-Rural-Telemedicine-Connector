import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {APIProvider} from '@vis.gl/react-google-maps';



import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
            <APIProvider apiKey={'AIzaSyDeaWODZUSIyXI6fU5l4A6ExP3IVhDvDik'} onLoad={() => console.log('Maps API has loaded.')}></APIProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <APIProvider/>
  </React.StrictMode>
);
