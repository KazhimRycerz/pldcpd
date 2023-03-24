import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./scss/index.scss";
import TurningsElements from "./components/TurningElements/Turningselements.jsx";
import { SectionsProvider } from "./context/SectionsContext.js";
import { BrowserRouter as Router } from "react-router-dom";
//import Footer from "./components/Footer/Footer.jsx"


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <SectionsProvider>
        <TurningsElements />
        <App />
      </SectionsProvider>
    </Router>
  </React.StrictMode>
);
