import "./CoursePageMain.scss";
import { Link, useLocation } from "react-router-dom";
//import C from "../../images/C.png"
import { useContext, useState, useEffect } from "react";
import { SectionsContext } from "../../context/SectionsContext.js";
import axiosConfig from "../../util/axiosConfig";
import Moment from "moment"

const CourseMain = () => {
  const { state } = useLocation();
  const  cID  = state;
  console.log(cID);
  const { isAuth, setGotoPage, setButtonPos, setAsidePos, navigate } = useContext(SectionsContext);
  const [courseData, setCourseData] = useState({})
  const buttonPosCheck = ()=>{
    if (isAuth) {setButtonPos("showBut"); setAsidePos ("accountAside")
  }}
  setGotoPage("/coursepage")
  
  const searchCourseData = async (id) => {
  const courseID = id
  const axiosResp = await axiosConfig
  .get(`http://localhost:4000/courses/${courseID}`);
  const courseData = axiosResp.data;
  setCourseData(courseData)
};

  const zurückZurListe = () => {
    navigate("/courselistpage")
  }

useEffect(() => {
  searchCourseData(cID);
  buttonPosCheck();
}, []);

  return (
    <main id="courseMain"> {/* Styling in global */}
      <div id="headBox">
        <h2 id="courseHead">Kursinhalt und Beschreibung</h2>
        <button onClick={zurückZurListe} className="buttonBasics" id="returnOnCoursePage">zurück zur Übersicht</button>
      </div>
      <article id="courseArticle">
        <div className="courseBoxes"> 
            <p>Kursname</p> 
            <output id="courseTopic">{courseData.topic}</output>
        </div>
        <div> 
            <p>Kursart</p> 
            <output id="courseAuthor">{courseData.courseType}</output>
        </div>
        <div> 
            <p>Themenbereich</p> 
            <output id="coursetopicField">{courseData.topicField}</output>
        </div>
        <div> 
            <p>Inhalt</p> 
            <output id="courseContent">
              <div>{courseData.courseContent}</div>
              <div id="contentImages">
                <img src={require('../../images/level_5_senior.jpg')} alt="" />
                <img src={require('../../images/level_5_senior.jpg')} alt="" />
                <img src={require('../../images/level_5_senior.jpg')} alt="" />
              </div>
            </output>
            
        </div>
        <div> 
            <p>Kursstart</p> 
            <output id="courseStart" >{Moment(courseData.startDateOfCourse).format("DD.MM.YYYY")}</output>
        </div> 
          <div> 
            <p>Kursende</p> 
            <output id="courseEnd" >{Moment(courseData.endOfCourse).format("DD.MM.YYYY")}</output>
        </div>
        <div> 
            <p>CPD-Punkte</p> 
            <output id="courseAdditionalPoints" className="punkte">{courseData.cpdAdditionalPoints}</output>
        </div>
        <div> 
            <p>CPD-plusPunkte</p> 
            <output id="courseBasicPoints" className="punkte">{courseData.cpdBasicPoints}</output>
        </div>
        <div><p>dieses Thema auf meine Lernliste setzen!</p>
          <div id="buttonBox"><button  id="buttonLernliste">add to my learniglist</button></div>
          </div>
      </article>
      
    </main>
  );
};
export default CourseMain;
