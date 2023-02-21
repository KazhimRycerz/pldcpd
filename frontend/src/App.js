import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./scss/App.scss";
import Home from "./pages/Home/Home.jsx";
import KnowledgeAccount from "./pages/KnowledgeAccount/KnowledgeAccount.jsx";
import PersonalAccount from "./pages/PersonalAccount/PersonalAccount.jsx";
import CareerPlanning from "./pages/CareerPlanning/CareerPlanning.jsx";
import RegisterLogin from "./pages/RegisterLogin/RegisterLogin.jsx";
import AboutTheProfession from "./pages/AboutTheProfession/AboutTheProfession.jsx";
import AboutRycerz from "./pages/AboutRycerz/AboutRycerz.jsx";
import AboutPLDCPD from "./pages/AboutPLDCPD/AboutPLDCPD.jsx";
import ListOfLearningOpportunities from "./pages/LearningOpportunities/LearningOpportunities.jsx";
import Page404 from "./pages/Page404/Page404.jsx";
import Sandbox from "./pages/Sandbox/Sandbox.jsx";
/* import { AccountButtonContext } from "./context/AccountButtonContext.js"; */

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/pldcpd" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/knowledgeaccount" element={<KnowledgeAccount />} />
          <Route path="/personalaccount" element={<PersonalAccount />} />
          <Route path="/careerplanning" element={<CareerPlanning />} />
          <Route path="/abouttheprofession" element={<AboutTheProfession />} />
          <Route path="/aboutrycerz" element={<AboutRycerz />} />
          <Route path="/aboutpldcpd" element={<AboutPLDCPD />} />
          <Route path="/listoflearningopprortunities" element={<ListOfLearningOpportunities />} />
          <Route path="/sandbox" element={<Sandbox />} />
          {/* <Route path="/listofprojectsworkedon" element={<ListOfProjectsWorkedOn />} /> */}
          {/* <Route path="/historyofcpd" element={<HistoryOfCPD />} /> */}
          {/* <Route path="/community" element={<Community />} /> */}
          <Route path="/registerlogin" element={<RegisterLogin />} />
          <Route path="/*" element={<Page404 />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
