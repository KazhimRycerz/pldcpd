import "./CourseMain.scss";
import { Link } from "react-router-dom";
//import C from "../../images/C.png"
import { useContext, useState, useEffect } from "react";
import { SectionsContext } from "../../context/SectionsContext.js";
import axiosConfig from "../../util/axiosConfig";
import Moment from "moment"


const CourseMain = () => {

  const { isAuth, gotoPage, setGotoPage, buttonPos, setButtonPos, asidePos, setAsidePos  } = useContext(SectionsContext);
  const [courseData, setCourseData] = useState({})
  
  const buttonPosCheck = ()=>{
  if /* (isAuth && gotoPage ==="/KnowledgeAccount") {setButtonPos("showBut"); setAsidePos("accountAside")
} else if */ (isAuth) {setButtonPos("showBut"); setAsidePos ("accountAside")
}}
//console.log("buttonPos:", buttonPos, "AsidePos:", asidePos)


const searchCourseData = async (course_id) => {
  //const courseID = course_id
  const courseID = "642c3afc82c7307308c4e725"
  const axiosResp = await axiosConfig
  .get(`http://localhost:4000/courses/${courseID}`);
  const courseData = axiosResp.data;
  setCourseData(courseData)
};
//console.log(courseData)


useEffect(() => {
  searchCourseData();
  buttonPosCheck()
}, []);

  return (
    <main id="courseMain"> {/* Styling in global */}
    <h2 id="courseHead">Thema und Beschreibung</h2>
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
          <div id="buttonBox"><button id="buttonLernliste">list</button></div>
          </div>
       
      </article>
        
    </main>
  );
};
export default CourseMain;
