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
const [authorsData, setAuthorsData] = useState([])

const buttonPosCheck = ()=>{
  if (isAuth) {setButtonPos("showBut"); setAsidePos ("accountAside")
}
};

const searchCourseListData = async () => {

  try {
    const axiosResp = await axiosConfig.get(`http://localhost:4000/courses`);
    const fetchedData = await axiosResp.data;
    const authors = await axiosResp.data.author;
    const authorsForCourse = fetchedData.map(({ author }) => author);
    setAuthorsData(authorsForCourse)  
    console.log("AuthorsData:", authorsForCourse)
    console.log("Authors:", authors)
    setCoursesData(fetchedData)
  } catch (error) {
    console.log(error);
  }
};
//console.log(coursesData)



useEffect(() => {
  setGotoPage("/courselistpage")
  searchCourseListData();
  buttonPosCheck();
}, []);

  return (
    <main id="courseListMain"> {/* MainStyling in global */}
      <h2 id="courseListHead">Übersicht aller aktuellen Kursangebote</h2>
      {/* <form className="filterThemenfeld">
        <div>
          <input
              type="text"
              name="search"
              placeholder="Themenfeld"
              id="search"
              //ref={searchInputRef}
          />
        </div>
        <div>
          <input
              type="text"
              name="search"
              placeholder="Kursart"
              id="search"
              //ref={searchInputRef}
              />
        </div>
      </form> */}
      <form>
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
              <th><select name="Filter" id="Filter">
                  <option value="Themenfeld">CPD</option>
                  <option value="Art">Art</option>
                  <option value="Datum">Datum</option>
                  <option value="Level">Level</option>
                </select></th>
              <th>CPD plus</th>
              <th><select name="Filter" id="Filter">
                  <option value="Themenfeld">Level</option>
                  <option value="Art">Art</option>
                  <option value="Datum">Datum</option>
                  <option value="Level">Level</option>
                </select></th>
              <th>Link zum Anbieter</th>
              <th>mehr Infos</th>
            </tr>
          </thead>         
          <tbody>
            {coursesData.map((course, index)=>{
              return(
                <tr key={index}>
                  <td>{course.topic}</td>
                  <td>
                    {authorsData.length > 0 && authorsData.map((author, index) => {
                      return (
                        <div key={index}>
                          <p>"test"{author.firstName} {author.lastName}</p>
                        </div>
                      );
                    })}
                  </td>
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
          </tbody>
        </table>  
      </form>
      <Countdown  targetDate={new Date("2023-04-30T00:00:00.000Z").getTime()} />

    </main>
  );
};
export default CourseListMain;
