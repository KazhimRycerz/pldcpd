import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/index.scss";
import App from "./App.js";
import TurningsElements from "./components/TurningElements/Turningselements.js";
import { SectionsProvider } from "./context/SectionsContext.js";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    
    <SectionsProvider>
      <TurningsElements />
      <App />
    </SectionsProvider>
    
  </React.StrictMode>
);
