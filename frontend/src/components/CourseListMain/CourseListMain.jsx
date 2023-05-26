import "./CourseListMain.scss";
import { Route, Link, useParams, useLocation } from "react-router-dom";
//import C from "../../images/C.png"
import { useContext, useState, useEffect } from "react";
import { SectionsContext } from "../../context/SectionsContext.js";
import axiosConfig from "../../util/axiosConfig";
import Moment from "moment";
import Countdown from "../Countdown/Countdown.jsx";

const CourseListMain = () => {
  const { isAuth, setGotoPage, setButtonPos, setAsidePos  } = useContext(SectionsContext);
  const [coursesData, setCoursesData] = useState([])
  const [authorsData, setAuthorsData] = useState([])
    
  const buttonPosCheck = ()=>{
    if (isAuth) {setButtonPos("showBut"); setAsidePos ("accountAside")
  }
};

const searchCourseListData = async () => {
  try {
    const axiosResp = await axiosConfig.get(`http://localhost:4000/courses`);
    const fetchedData = await axiosResp.data;
    const authorsForCourse = fetchedData.map(({ author }) => author);
    setAuthorsData(authorsForCourse)  
    //console.log("AuthorsData:", authorsForCourse)
    setCoursesData(fetchedData)
    //console.log("Info", fetchedData[0]._id)
  } catch (error) {
    console.log(error);
  }
};
setGotoPage("/courselistpage")

useEffect(() => {
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
            <col width="2%" />
            <col width="2%" />
            <col width="2%" />
            <col width="10%" />
            <col width="1%" />
          </colgroup>
          <thead>
            <tr>
              <th>Thema</th>
              <th><select name="Filter" id="Filter">
                  <option value="Themenfeld">Autor/Referent</option>
                  <option value="Art">Art</option>
                  <option value="Datum">Datum</option>
                  <option value="Level">Level</option>
                </select></th>
              <th><select name="Filter" id="Filter">
                  <option value="Themenfeld">Themenfeld</option>
                  <option value="Art">Art</option>
                  <option value="Datum">Datum</option>
                  <option value="Level">Level</option>
                </select></th>
              <th><select name="Filter" id="Filter">
                  <option value="Themenfeld">Kursart</option>
                  <option value="Art">Art</option>
                  <option value="Datum">Datum</option>
                  <option value="Level">Level</option>
                </select>
                </th>
              <th><select name="Filter" id="Filter">
                  <option value="Themenfeld">Kursstart</option>
                  <option value="Art">Art</option>
                  <option value="Datum">Datum</option>
                  <option value="Level">Level</option>
                </select></th>
              <th><select name="Filter" id="Filter">
                  <option value="Themenfeld">Kursende</option>
                  <option value="Art">Art</option>
                  <option value="Datum">Datum</option>
                  <option value="Level">Level</option>
                </select></th>
              <th>CPD</th>
              <th>CPD plus</th>
              <th><select name="Filter" id="Filter">
                  <option value="">level</option>
                  <option value="qualified">qualified</option>
                  <option value="student">student</option>
                  <option value="master">master</option>
                </select></th>
              <th>Link zum Anbieter</th>
              <th>mehr Infos</th>
            </tr>
          </thead>         
          <tbody>
            {coursesData.map((course, index)=>{
              return(
                <tr key={index}>
                  <td className="larger">
                    <Link to={{ 
                      pathname: '/coursepage/',
                      state: course._id
                      }} id="topicLink">
                      {course._id}{course.topic}
                    </Link>
                  </td>
                  <td className="larger">
                    {authorsData[index].map((author, innerIndex) => (
                      <li key={innerIndex} id="author">
                        {author.professionalTitle}{author.professionalTitle && " "}{author.firstName} {author.lastName}{author.appendix && " "}{author.appendix}{/* {authorsData[index]>0 ? "" : ","}  */}
                      </li>
                      )
                    )}
                  </td>
                  <td>{course.topicField}</td>
                  <td>{course.courseType}</td>
                  <td>{Moment(course.startDateOfCourse).format("DD.MM.YYYY")}</td>
                  <td>{Moment(course.endDateOfCourse).format("DD.MM.YYYY")}</td>
                  <td>{course.cpdBasicPoints}</td>
                  <td>{course.cpdAdditionalPoints}</td>
                  <td>{course.professionalLevel}</td>
                  <td><a href={course.linkToProvider} target="_blank" rel="noopener noreferrer">{course.linkToProvider}</a></td>
                  <td><Link to={course.linkToProvider} className="C">C</Link></td>
                  </tr>
                  )
                }
              )
            }
          </tbody>
        </table>  
      
      <Countdown  targetDate={new Date("2023-04-30T00:00:00.000Z").getTime()} />

    </main>
  );
};
export default CourseListMain;
