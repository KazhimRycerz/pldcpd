import "./CourseListMain.scss";
import { Link } from "react-router-dom";
//import C from "../../images/C.png"
import { useContext, useState, useEffect } from "react";
import { SectionsContext } from "../../context/SectionsContext";
import { ListOfCourseTypes, ListOfLanguages, ListOfTopicFields, ListOfLevel } from "../ListsOfData/ListOfData.jsx";
import axiosConfig from "../../util/axiosConfig";
import baseUrl from "../../util/constants";
import Moment from "moment";
import Countdown from "../Countdown/Countdown.jsx";

const CourseAddMain = () => {
  const { isAuth, setGotoPage, setButtonPos, setAsidePos, knowledgeData  } = useContext(SectionsContext);
  const [coursesData, setCoursesData] = useState([])
  const [authorsData, setAuthorsData] = useState([])
  const [languageData, setLanguageData] = useState([])
  //const [listOfThemen, setListOfThemen] = useState([])
  //const [listOfKursart, setListOfKursart] = useState([])
  //const [listOfLanguage, setListOfLanguage] = useState([])
  //const [items, setItems] = useState([]);
  const [autorenFilter, setAutorenFilter] = useState('');
  const [themenFilter, setThemenFilter] = useState("");
  const [kursartFilter, setKursartFilter] = useState('');
  const [kursstartFilter, setKursstartFilter] = useState('');
  const [kursendeFilter, setKursendeFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [sprachFilter, setSprachFilter] = useState('');

  const [filterElements,setFilterElements] = useState(["keine"]);
  const [sortElement, setSortElement] = useState('');

  const cpdStartDate = knowledgeData && new Date(knowledgeData.cpdActiveSince);
  //console.log(cpdStartDate)
  
  const buttonPosCheck = ()=>{
    if (isAuth) {setButtonPos("showBut"); setAsidePos ("accountAside")
    }
}

const handleFilter = (e, setFilterFunc) => {
  setFilterFunc(e.target.value)}

const resetFilter= () => {
  setAutorenFilter("")
  setThemenFilter("")
  setKursartFilter("")
  setLevelFilter("")
  setSprachFilter("")
  setSortElement("")
  setFilterElements([])
}

const searchCourseListData = async () => {
  const filterItems = {
    autor: autorenFilter,
    themenfeld: themenFilter,
    kursart: kursartFilter,
    kursstart: kursstartFilter,
    kursende: kursendeFilter,
    level: levelFilter,
    sprache: sprachFilter,
    sortierung: sortElement,
    //active: true,
  };
  
  const filterList = Object.entries(filterItems)
    .filter(([key, value]) => value !== "")
    .map(([key, value]) => key.charAt(0).toUpperCase() + key.slice(1));
  setFilterElements(filterList)
  //console.log(filterList);
    
  try {
    const axiosResp = await axiosConfig.get("/courses/courselist", {params: filterItems}
    );
    console.debug("axiosResp.filterItems:", axiosResp.filterItems);
    const receivedData = await axiosResp.data;
    const authorsForCourse = receivedData.map(({ author }) => author);
    const courseLanguage = receivedData.map(({ courseLanguage }) => courseLanguage); 
    const themenliste = receivedData.map(({topicField }) => topicField);
    setAuthorsData(authorsForCourse)  
    setCoursesData(receivedData)
    setLanguageData(courseLanguage)
    //console.log(themenliste)
  } catch (error) {
    console.log(error);
  }
};

const searchListElements = async () => { 
  try {
    const axiosResp = await axiosConfig.get("/courses");
    const receivedData = await axiosResp.data;

    /* const themenListe = receivedData.map(({topicField }) => topicField);
    const reducedThemenListeSet = new Set(themenListe);
    const reducedThemenListe = Array.from(reducedThemenListeSet) */

    /* const kursartListe = receivedData.map(({courseType }) => courseType);
    const reducedKursartListeSet = new Set(kursartListe);
    const reducedKursartListe = Array.from(reducedKursartListeSet) */

    /* const sprachenListe = receivedData.map(({ courseLanguage }) => courseLanguage); 
    //const flachesArray = [].concat(...sprachenListe);
    const doppelflachesArray = [].concat(...([].concat(...sprachenListe)))
    //Liste von allen Themenfeldern in allen Datensätzen:
    const reducedLanguageListeSet = new Set(doppelflachesArray);
    // reduziert, so dass keine Dubletten mehr vorhanden sind:
    const reducedLanguageListe = Array.from(reducedLanguageListeSet) */

    //setListLanguage(courseLanguage)
    //setListOfThemen(reducedThemenListe)
    //setListOfLanguage(reducedLanguageListe)
    //setListOfKursart(reducedKursartListe)
    /* console.log(sprachenListe)
    console.log(reducedKursartListe)
    console.log(reducedLanguageListe) */
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  setGotoPage("/courselistpage")
  searchCourseListData();
  buttonPosCheck()
  //searchListElements()
}, [ sortElement, themenFilter, kursartFilter, autorenFilter, kursstartFilter, levelFilter, sprachFilter]);

  return (
    <main id="courseListMain"> {/* MainStyling in global */}
      <h2 id="courseListHead">Übersicht aller aktuellen Kursangebote</h2>
      <div id="overviewCourses">
        <div>
          {/* <p>sie können nch Ihren Bedürfnissen filtern...</p> */}
          {/* <p>gesetzte Filter: {filterElements}</p> */}
          <ul>gesetzte Filter: {filterElements.length >= 1 ? <div>{filterElements.map((value, index) => (
                    <li key={index}> {value}</li>
                  ))}</div> : <div><li>ohne Filter</li></div>}
          </ul>
          
          <p>sortiert nach: 
            <select 
            name="sortItem"  
            value={sortElement}
            onChange={(e) => setSortElement(e.target.value)}
            id="sortItem">
              <option value="">nicht sortiert</option>
              <option value="Kursstart">Kursstart</option>
              <option value="Level">Level</option>
            </select></p>
                            
          <p id="filterLöschen" onClick={resetFilter}><span className="C">C </span>Filter löschen</p>
        </div>
        <table id="tableCourseList">
          <colgroup>
            <col width="10%" />
            <col width="10%" />
            <col width="5%" />
            <col width="5%" />
            <col width="3%" />
            <col width="5%" />
            <col width="5%" />
            <col width="2%" />
            <col width="2%" />
            <col width="2%" />
            <col width="10%" />
            <col width="1%" />
          </colgroup>
          <thead>
            <tr>
              <th>Thema</th>
              <th>
                {/* <input type="text" name="autorenFilter" 
                value={autorenFilter} 
                onChange={(e) => handleFilter(e, setAutorenFilter)} 
                id="autorenFilter"/> */}
                Autoren
              </th>
              <th>
                <p>Themenfeld</p>
                <select 
                name="Themenfeld" 
                value={themenFilter} 
                onChange={(e) => handleFilter(e, setThemenFilter)} id="themenFilter">
                  <option value="">ohne Filter</option>
                  {/* < ListOfTopicFields /> */}
                  {ListOfTopicFields.map((topicField, index) => (
            <option key={index} value={topicField}>
              {topicField}
            </option>
          ))}
                </select>
              </th>
              <th>
               <p>Kursart</p>
                <select name="Kursart" value={kursartFilter} /* onChange={handleKursartFilter}  */onChange={(e) => handleFilter(e, setKursartFilter)} id="kursartFilter">
                  <option value="">ohne Filter</option>
                  {/* {listOfKursart.map((value, index) => (
                    <option key={index}>{value}</option>
                  ))} */}
                  < ListOfCourseTypes />
                </select>
              </th>
              <th>
                <p>Kursstart</p>
                <select 
                name="Kurstart" 
                value={kursstartFilter} 
                onChange={(e) => handleFilter(e, setKursstartFilter)}
                id="kursstartFilter">
                  <option value="">ohne Filter</option>
                  <option value="Art">Art</option>
                  <option value="Datum">Datum</option>
                  <option value="Level">Level</option>
                </select>
              </th>
              <th>
                <select name="Kursende" id="Filter">
                  <option value="">Kursende</option>
                  <option value="Art">Art</option>
                  <option value="Datum">Datum</option>
                  <option value="Level">Level</option>
                </select>
              </th>
              <th>
                <p>Sprachfilter</p>
                <select 
                name="Sprache" 
                value={sprachFilter} 
                onChange={(e) => handleFilter(e, setSprachFilter)} 
                id="sprachFilter">
                  <option value="">ohne Filter</option>
                  {ListOfLanguages.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
                </select>
              </th>
              <th>CPD</th>
              <th>CPD plus</th>
              <th>
              <p>Levelfilter</p>
                <select 
                name="Level" 
                onChange={(e) => handleFilter(e, setLevelFilter)}
                id="levelFilter"
                >
                  <option value="">ohne Filter</option>
                  {ListOfLevel.map((level, index) => (
            <option key={index} value={level.value}>
              {level.discription}
            </option>
          ))}
                </select></th>
              <th>Link zum Anbieter</th>
              <th>mehr Infos</th>
            </tr>
          </thead>    
          {/* hier beginnt die Liste der gefundenen Datensätze  */}    
          {coursesData.length >=0 ? (
          <tbody>
            {coursesData.map((course, index)=>{
              return(
                <tr key={index}>
                  <td className="larger">
                    <li id="topic">
                      <Link to="/coursepage" state= {course._id} id="topicLink">
                      {course.courseTopic}
                      </Link>
                    </li>
                  </td>
                  <td className="larger">
                    {authorsData[index].map((author, innerIndex) => (
                      <li key={innerIndex} id="author">
                        <Link to="/authorspage" state= {author._id} id="authorsLink">
                        {author.professionalTitle}{author.professionalTitle && " "}{author.firstName} {author.lastName}{author.appendix && ", "}{author.appendix}{/* {authorsData[index]>0 ? "" : ","}  */}
                        </Link>
                      </li>
                      )
                    )}
                  </td>
                  <td>{course.topicField}</td>
                  <td>{course.courseType}</td>
                  <td>{Moment(course.startDateOfCourse).format("DD.MM.YYYY")}</td>
                  <td>{Moment(course.endDateOfCourse).format("DD.MM.YYYY")}</td>
                  <td>
                    {languageData[index].map((courseLanguage, innerIndex) => (
                      <li key={innerIndex} id="courseLanguage">
                        {courseLanguage}
                      </li>
                      )
                    )}
                  </td>
                  <td>{course.cpdBasicPoints}</td>
                  <td>{course.cpdAdditionalPoints}</td>
                  <td>{course.professionalLevel} - {ListOfLevel.find((item) => item.value === course.professionalLevel)?.discription}</td>
                  <td><a href={course.linkToProvider} id="providerLink" target="_blank" rel="noopener noreferrer">{course.linkToProvider}</a></td>
                  <td><Link to="/coursepage" state= {course._id} className="C" id="infoLink"><p>C</p></Link></td>
                  </tr>
                  )
                }
              )
            }
          </tbody>) : (
            <p>keine Angebote vorhanden</p>
          )}
        </table>  
          
      </div>
      {/* <div>
        <h3>Sie sind CPD-aktiv seit {{cpdStartDate}}</h3>
      </div> */}
      {isAuth && knowledgeData && <Countdown  targetDate={cpdStartDate} />}

    </main>
  );
};

export default CourseAddMain;
