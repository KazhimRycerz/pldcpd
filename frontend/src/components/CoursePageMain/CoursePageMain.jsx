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
  //console.log(cID);
  const { isAuth, setGotoPage, setButtonPos, setAsidePos, navigate } = useContext(SectionsContext);
  const [courseData, setCourseData] = useState({})
  const [authorsData, setAuthorsData] = useState([])
  const buttonPosCheck = ()=>{
    if (isAuth) {setButtonPos("showBut"); setAsidePos ("accountAside")
  }}
  setGotoPage("/coursepage")
  
  const searchCourseData = async (id) => {
  const courseID = id
  const axiosResp = await axiosConfig
  .get(`http://localhost:4000/courses/${courseID}`);
  const courseData = axiosResp.data;
  const authorsForCourse = courseData.author;
  setAuthorsData(authorsForCourse)
  setCourseData(courseData);
  console.log(courseData.author); 
  console.log(authorsForCourse); 
};

  const zurückZurListe = () => {
    navigate(-1)
  }
  
useEffect(() => {
  searchCourseData(cID);
  buttonPosCheck();
}, []);

  return (
    <main id="courseMain"> {/* Styling in global */}
      <div id="headBox">
        <h2 id="courseHead">Kursinhalt und Beschreibung</h2>
        <button onClick={zurückZurListe} className="buttonBasics" id="returnToCoursePage">zurück zur Übersicht</button>
      </div>
      
      <article id="courseArticle">
        <div className="courseBoxes" id="boxAutor"> 
            <p>Kursthema</p> 
            <div className="output" id="courseTopic">{courseData.topic}</div>
        </div>
        <div className="courseBoxes"> 
              <p>Autoren</p> 
            <div className="output" id="courseHead">
              {authorsData.map((author, index) => (
                <li key={index} id="author">
                  <Link to="/authorspage" state= {author._id} id="authorsLink">
                  {author.professionalTitle}{author.professionalTitle && " "}{author.firstName} {author.lastName}{author.appendix && " "}{author.appendix}{/* {authorsData[index]>0 ? "" : ","}  */}
                  </Link>
                </li>
                ))
              }
            </div>
        </div>
        <div> 
            <p>Kursart</p> 
            <div className="output" id="courseField">{courseData.courseType}</div>
        </div>
        <div> 
            <p>Themenbereich</p> 
            <div className="output" id="courseTopicField">{courseData.topicField}</div>
        </div>
        <div id="courseInhalt"> 
            <p>Inhalt</p> 
            <div className="output" id="courseContent">
              <div>{courseData.courseContent}</div>
              <div id="contentImages">
                <img src={require('../../images/level_5_senior.jpg')} alt="" />
                <img src={require('../../images/level_5_senior.jpg')} alt="" />
                <img src={require('../../images/level_5_senior.jpg')} alt="" />
              </div>
            </div>
            
        </div>
        <div className="boxGroup">
          <div> 
            <p>Kursstart</p> 
            <div className="output" id="courseStart" >{Moment(courseData.startDateOfCourse).format("DD.MM.YYYY")}</div>
          </div> 
          <div> 
            <p>Kursende</p> 
            <div className="output" id="courseEnd" >{Moment(courseData.endOfCourse).format("DD.MM.YYYY")}</div>
          </div>
        </div>
        <div className="boxGroup">
          <div> 
            <p>CPD-Punkte</p> 
            <div className="output punkte" id="courseAdditionalPoints" >{courseData.cpdBasicPoints}</div>
          </div>
          <div> 
            <p>CPD-plusPu</p> 
            <div className="output punkte" id="courseBasicPoints" >{courseData.cpdAdditionalPoints}</div>
          </div>
        </div>
        <div> 
          <p>Kursanbieter</p> 
          <div className="output" id="courseProvider" ><a href={courseData.linkToProvider} target="_blank" rel="noopener noreferrer">{courseData.linkToProvider}</a></div>
        </div>
        {/* <p>dieses Thema auf meine Lernliste setzen!</p> */}
          
      </article>
        <div id="buttonBottom">
          <h2></h2>
          <button className="buttonBasics" /* id="buttonLernListe" */>auf meine Lernliste</button>
        </div>   
    </main>
  );
};
export default CourseMain;
