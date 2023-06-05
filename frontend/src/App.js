import "./scss/App.scss";
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AutoLogout } from "./util/AutoLogout.js";
import Home from "./pages/Home/Home.jsx";
import KnowledgeAccount from "./pages/KnowledgeAccount/KnowledgeAccount.jsx";
import PersonalAccount from "./pages/PersonalAccount/PersonalAccount.jsx";
import CareerPlanning from "./pages/CareerPlanning/CareerPlanning.jsx";
import CourseListPage from "./pages/CourseListPage/CourseListPage.jsx";
import CoursePage from "./pages/CoursePage/CoursePage.jsx";
import AuthorsPage from "./pages/AuthorsPage/AuthorsPage.jsx";
import Login from "./pages/LoginPage/Login.jsx";
import Register from "./pages/RegisterPage/Register.jsx";
import Impressum from "./pages/Impressum/Impressum.jsx";
import UserProfile from "./pages/UserProfile/UserProfile.jsx";
import AboutTheProfession from "./pages/AboutTheProfession/AboutTheProfession.jsx";
import AboutRycerz from "./pages/AboutRycerz/AboutRycerz.jsx";
import AboutPLDCPD from "./pages/AboutPLDCPD/AboutPLDCPD.jsx";
import Page404 from "./pages/Page404/Page404.jsx";
import Sandbox from "./pages/Sandbox/Sandbox.jsx";

function App() {
    
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  
  let autoLog = AutoLogout()
    useEffect(() => {
    }, [autoLog])
  
  return (
    <div className="App">

      {/* <Router> */}
        <Routes>
          <Route path="/pldcpd" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/knowledgeaccount" element={<KnowledgeAccount />} />
          <Route path="/personalaccount" element={<PersonalAccount />} />
          <Route path="/careerplanning" element={<CareerPlanning />} />
          <Route path="/coursepage" element={<CoursePage />} />
          <Route path="/courselistpage" element={<CourseListPage />} />
          <Route path="/authorspage" element={<AuthorsPage />} />
          <Route path="/sandbox" element={<Sandbox />} />
          {/* <Route path="/community" element={<Community />} /> */}
          {/* <Route path="/registerlogin" element={<RegisterLogin />} /> */}
          <Route path="/abouttheprofession" element={<AboutTheProfession />} />
          <Route path="/aboutrycerz" element={<AboutRycerz />} />
          <Route path="/aboutpldcpd" element={<AboutPLDCPD />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/*" element={<Page404 />} />
          </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
