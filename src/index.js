import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/index.scss";
import App from "./App.js";
//import drehmoment2 from './images/drehmoment2.png'
import TurningsElements from "./components/TurningElements/Turningselements.js";
import { AccountButtonProvider } from "./context/AccountButtonContext.js"
import { AsideAccountProvider } from "./context/AsideAccountContext.js"


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AccountButtonProvider>
    <AsideAccountProvider>
      <TurningsElements />
      <App />
    </AsideAccountProvider>
    </AccountButtonProvider>
  </React.StrictMode>
);
