import "./CourseListMain.scss";
import { Link, useParams } from "react-router-dom";
//import C from "../../images/C.png"
import { useContext, useState, useEffect } from "react";
import { SectionsContext } from "../../context/SectionsContext.js";
import axiosConfig from "../../util/axiosConfig";
import Moment from "moment";
import Countdown from "../Countdown/Countdown.jsx";

const CourseListMain = () => {

const { isAuth, setGotoPage, setButtonPos, setAsidePos  } = useContext(SectionsContext);
const [coursesData, setCoursesData] = useState([])

const buttonPosCheck = ()=>{
  if (isAuth) {setButtonPos("showBut"); setAsidePos ("accountAside")
}
};

const searchCourseListData = async () => {
  try {
    const axiosResp = await axiosConfig.get(`http://localhost:4000/courses`);
    const fetchedData = await axiosResp.data;
    //const authorsForCourse = await fetchedData.author
    //console.log(authorsForCourse)
    setCoursesData(fetchedData)
  } catch (error) {
    console.log(error);
  }
};
console.log(coursesData)



useEffect(() => {
  setGotoPage("/courselistpage")
  searchCourseListData();
  buttonPosCheck();
}, []);

  return (
    <main id="courseListMain"> {/* MainStyling in global */}
      <h2 id="courseListHead">Übersicht aller aktuellen Kursangebote</h2>
      <table id="tableCourseList">
          <colgroup>
            <col width="10%" />
            <col width="5%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="5%" />
            <col width="5%" />
            <col width="5%" />
            <col width="10%" />
            <col width="5%" />
          </colgroup>
          <thead>
            <tr>
              <th>Thema</th>
              <th>Autor/Referent</th>
              <th>Themenfeld</th>
              <th>Kursart</th>
              <th>Kursstart</th>
              <th>Kursende</th>
              <th>CPD Wert</th>
              <th>CPD Wert plus</th>
              <th>ab Level</th>
              <th>Link zum Anbieter</th>
              <th>mehr Infos</th>
            </tr>
          </thead>
                   
          {<tbody>
            {coursesData.map((course, index)=>{
              return(
                <tr key={index}>
                  <td>{course.topic}</td>
                  <td>{}</td>
                  <td>{course.topicField}</td>
                  <td>{course.courseType}</td>
                  <td>{Moment(course.startDateOfCourse).format("DD.MM.YYYY")}</td>
                  <td>{Moment(course.endDateOfCourse).format("DD.MM.YYYY")}</td>
                  <td>{course.cpdBasicPoints}</td>
                  <td>{course.cpdAdditionalPoints}</td>
                  <td>{course.professionalLevel}</td>
                  <td><Link to={course.linkToProvider} target="_blank">{course.linkToProvider}</Link></td>
                  <td><Link to={course.linkToProvider} className="C">C</Link></td>
                  </tr>
                  )
                }
              )
            }
          </tbody>}
        </table>  
        <Countdown  targetDate={new Date("2023-04-30T00:00:00.000Z").getTime()} />

    </main>
  );
};
export default CourseListMain;
