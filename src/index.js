import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/index.scss";
import App from "./App.js";
//import drehmoment2 from './images/drehmoment2.png'
import TurningsElements from "./components/TurningElements/Turningselements.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TurningsElements />
    <App />
  </React.StrictMode>
);
