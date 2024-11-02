import "./CourseListMain.scss";
import { Link } from "react-router-dom";
//import C from "../../images/C.png"
import { useContext, useState, useEffect } from "react";
import { SectionsContext } from "../../context/SectionsContext";
import { ListOfCourseTypes, DataListOfCourseTypes, ListOfLanguages, ListOfTopicFields, ListOfLevel } from "../ListsOfData/ListOfData.jsx";
import axiosConfig from "../../util/axiosConfig";
import baseUrl from "../../util/constants";
import Moment from "moment";
import { Modal, Button } from 'antd';
import Countdown from "../Countdown/Countdown.jsx";
import { DoubleRightOutlined, CloseOutlined, EditOutlined, SaveOutlined, StopOutlined, StepBackwardOutlined, StepForwardOutlined  } from "@ant-design/icons";

const CourseAddMain = () => {
  const { isAuth, setGotoPage, setButtonPos, setAsidePos, knowledgeData, accessRights, navigate  } = useContext(SectionsContext);
  const [coursesData, setCoursesData] = useState([])
  const [authorsData, setAuthorsData] = useState([])
  const [languageData, setLanguageData] = useState([])
  //const [listOfThemen, setListOfThemen] = useState([])
  //const [listOfKursart, setListOfKursart] = useState([])
  //const [listOfLanguage, setListOfLanguage] = useState([])
  //const [items, setItems] = useState([]);
  const [autorenFilter, setAutorenFilter] = useState('');
  const [themenFilter, setThemenFilter] = useState(
    localStorage.getItem("themenFilter") === null ? "" : localStorage.getItem("themenFilter")
);
  const [kursartFilter, setKursartFilter] = useState(
    localStorage.getItem("kursartFilter") === null ? "" : localStorage.getItem("kursartFilter")
);
  const [kursstartFilter, setKursstartFilter] = useState(
    localStorage.getItem("kursstartFilter") === null ? "" : localStorage.getItem("kursstartFilter")
);
  const [kursendeFilter, setKursendeFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState(
    localStorage.getItem("levelFilter") === null ? "" : localStorage.getItem("levelFilter")
);
  const [sprachFilter, setSprachFilter] = useState(
    localStorage.getItem("sprachFilter") === null ? "" : localStorage.getItem("sprachFilter")
);
  //const [buchungsNoFilter, setBuchungsNoFilter] = useState('');

  const [filterElements, setFilterElements] = useState(
    localStorage.getItem("filterElements") === null || localStorage.getItem("filterElements") === ""
        ? []
        : JSON.parse(localStorage.getItem("filterElements"))
);

  const [sortElement, setSortElement] = useState('');
  const [anzeige, setAnzeige] = useState("Karten");

  const [isTopicFieldFocused, setIsTopicFieldFocused] = useState(false);
  const [isLanguageFocused, setIsLanguageFocused] = useState(false);
  const [isAuthorFocused, setIsAuthorFocused] = useState(false);
  const [isCourseTypeFocused, setIsCourseTypeFocused] = useState(false);
  const [isLevelFocused, setIsLevelFocused] = useState(false);

  //const cpdStartDate = knowledgeData && new Date(knowledgeData.cpdActiveSince);
  //console.log(cpdStartDate)
  //console.log(filterElements)
  //console.log(localStorage.getItem("filterElements"))
  
  const buttonPosCheck = ()=>{
    if (isAuth) {setButtonPos("showBut"); setAsidePos ("accountAside")
    }
  }
  const handleViewChange = (e) => {
    const { value } = e.target;
    setAnzeige(value);
    localStorage.setItem("anzeige", value); // Speichern des View-Modus im localStorage
  };

  const handleFilter = (e, setFilter) => {
    const { value } = e.target;
    setFilter(value);

    // Speichern im localStorage
    switch (setFilter) {
      case setThemenFilter:
        localStorage.setItem("themenFilter", value);
        break;
      case setKursartFilter:
        localStorage.setItem("kursartFilter", value);
        break;
      case setKursstartFilter:
        localStorage.setItem("kursstartFilter", value);
        break;
      case setSprachFilter:
        localStorage.setItem("sprachFilter", value);
        break;
      case setLevelFilter:
        localStorage.setItem("levelFilter", value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const savedThemenFilter = localStorage.getItem("themenFilter");
    const savedKursartFilter = localStorage.getItem("kursartFilter");
    const savedKursstartFilter = localStorage.getItem("kursstartFilter");
    const savedSprachFilter = localStorage.getItem("sprachFilter");
    const savedLevelFilter = localStorage.getItem("levelFilter");
    const savedSortElement = localStorage.getItem("sortElement");
    const savedAnzeige = localStorage.getItem("anzeige");
    const savedFilterElements = JSON.parse(localStorage.getItem("filterElements") || "[]");

    if (savedThemenFilter) setThemenFilter(savedThemenFilter);
    if (savedKursartFilter) setKursartFilter(savedKursartFilter);
    if (savedKursstartFilter) setKursstartFilter(savedKursstartFilter);
    if (savedSprachFilter) setSprachFilter(savedSprachFilter);
    if (savedLevelFilter) setLevelFilter(savedLevelFilter);
    if (savedSortElement) setSortElement(savedSortElement);
    if (savedAnzeige) setAnzeige(savedAnzeige);
    setFilterElements(savedFilterElements); // wird immer gesetzt, da es ein Array sein sollte
}, []);


    const handleSelectCourseType = (selectedType) => {
      setKursartFilter(selectedType);
      //setFilteredCourseTypes(ListOfTopicFields); // Reset the filtered topics to show the full list
      setIsCourseTypeFocused(false); // Close the dropdown after selection
    };

    const resetFilter = () => {
      setAutorenFilter("");
      setThemenFilter("");
      setKursartFilter("");
      setLevelFilter("");
      setSprachFilter("");
      // setBuchungsNoFilter("");
      setSortElement("");
      setFilterElements([]);
      
      localStorage.removeItem("themenFilter");
      localStorage.removeItem("kursartFilter");
      localStorage.removeItem("levelFilter");
      localStorage.removeItem("sprachFilter");
      localStorage.removeItem("sortElement");
      localStorage.removeItem("filterElements");
  };
  

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

/* const searchListElements = async () => { 
  try {
    const axiosResp = await axiosConfig.get("/courses");
    const receivedData = await axiosResp.data;

    const themenListe = receivedData.map(({topicField }) => topicField);
    const reducedThemenListeSet = new Set(themenListe);
    const reducedThemenListe = Array.from(reducedThemenListeSet)

    const kursartListe = receivedData.map(({courseType }) => courseType);
    const reducedKursartListeSet = new Set(kursartListe);
    const reducedKursartListe = Array.from(reducedKursartListeSet)

    const sprachenListe = receivedData.map(({ courseLanguage }) => courseLanguage); 
    //const flachesArray = [].concat(...sprachenListe);
    const doppelflachesArray = [].concat(...([].concat(...sprachenListe)))
    //Liste von allen Themenfeldern in allen Datensätzen:
    const reducedLanguageListeSet = new Set(doppelflachesArray);
    // reduziert, so dass keine Dubletten mehr vorhanden sind:
    const reducedLanguageListe = Array.from(reducedLanguageListeSet)

    //setListLanguage(courseLanguage)
    //setListOfThemen(reducedThemenListe)
    //setListOfLanguage(reducedLanguageListe)
    //setListOfKursart(reducedKursartListe)
    /* console.log(sprachenListe)
    console.log(reducedKursartListe)
    console.log(reducedLanguageListe) 
  } catch (error) {
    console.log(error);
  }
};*/

useEffect(() => {
  setGotoPage("/courselistpage")
  searchCourseListData();
  buttonPosCheck()
  //searchListElements()
  //console.log(accessRights)
}, [ sortElement, themenFilter, kursartFilter, autorenFilter, kursstartFilter, levelFilter, sprachFilter]);

  return (
    <main id="courseListMain"> {/* MainStyling in global */}
    < CloseOutlined className="closeX" onClick={() => {resetFilter(); navigate("/home")}}> </CloseOutlined>
      <div className="headBox">
        <h2 >Übersicht aller aktuellen Kursangebote</h2>
        {/* <p className="closingFunction" onClick={() => navigate("/home")}>Formular schließen</p> */}
      </div>

      <div id="overviewCourses">
      
        <div id="themenFilter">
          <div>
            <p>Themenfeld</p>
            <select 
              name="Themenfeld" 
              value={themenFilter} 
              onChange={(e) => handleFilter(e, setThemenFilter)} id="themen">
                <option value="">ohne Filter</option>
                {/* < ListOfTopicFields /> */}
                {ListOfTopicFields.map((topicField, index) => (
                <option key={index} value={topicField}>
                  {topicField}
                </option>
                ))}
            </select>
          </div>
          <div>
            <p>Kursart</p>
            <select 
            name="Kursart" 
            value={kursartFilter} 
            onChange={(e) => handleFilter(e, setKursartFilter)} 
            id="kursartFilter">
              <option value="">ohne Filter</option>
              < DataListOfCourseTypes />
            </select>
          </div>
          {/* <div id="kursartFilter" style={{ position: 'relative' }}>
            
            <p>Kursartfilter
              {isCourseTypeFocused ? (
                  <StopOutlined
                    className="edit-icon"
                    onClick={() => setIsCourseTypeFocused(false)}
                  />
                ) : (
                  <EditOutlined
                    className="edit-icon"
                    onClick={() => setIsCourseTypeFocused(true)}
                  />
                )}</p>
            <input 
            type="text"
            id="kursartFilter"
            name="Kursart" 
            value={kursartFilter} 
            onChange={(e) => handleFilter(e, setKursartFilter)} 
              />
              {isCourseTypeFocused && (
                  <ListOfCourseTypes id="test" onSelectCourseType={handleSelectCourseType} 
                  />
                )}
                
          </div> */}
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
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
            </select>
          </div>
          <div id="sortBy">
            <p>sortiert nach:</p> 
            <select 
            name="sortItem"  
            value={sortElement}
            onChange={(e) => setSortElement(e.target.value)}
            id="sortItem">
              <option value="">nicht sortiert</option>
              <option value="Kursstart">Kursstart</option>
              <option value="Level">Level</option>
            </select>
          </div>   
          <div id="gesetzterFilter">
            <p>gesetzte Filter:</p> 
            <ul>
              {filterElements.length >= 1 ? 
                filterElements.map((value, index) => (
                  <li key={index}>{value}</li>
                )) 
                : <li>ohne Filter</li>
              }
            </ul>
          </div>
          

          <div id="ansicht">
            <p>anzeigen als:</p>
            <label>
              <input
                type="radio"
                value="Karten"
                checked={anzeige === "Karten"}
                onChange={handleViewChange}
              />
            Karten
            </label>
            <label>
              <input
                type="radio"
                value="Tabelle"
                checked={anzeige === "Tabelle"}
                onChange={handleViewChange}
              />
              Tabelle 
            </label>
          </div>
          <div id="filterLöschen">{filterElements.length >= 1 ?  
            <p  id="pFilterLöschen" onClick={resetFilter}>Filter löschen</p>:<p>kein Filter gesetzt</p>}
            <span>{coursesData.length} Angebote</span>
          </div>
        </div>
        
        {anzeige ==="Karten" && 
        <section id="kursÜberblick">
        {coursesData.map((course, index) => {
          return <div key={index} id="cards"> 
            <h3 
              data-tooltip={course.courseTopic}
              onClick={() => {
              navigate("/coursepage", { state: course._id  }); // State-Objekt korrekt übergeben
              }} >{course.courseTopic}
            </h3> 
            <div>
              <div>
                <p> Autor/en:</p>
                <div>
                  {Array.isArray(authorsData[index]) && authorsData[index].map((author, innerIndex) => (
                    <p 
                      key={innerIndex} 
                      onClick={() => {
                        navigate("/authorspage", { state: author._id  }); // State-Objekt korrekt übergeben
                      }}   
                      id="author"
                    >
                      {author.professionalTitle}{author.professionalTitle && " "}
                      {author.firstName} {author.lastName}
                      {author.appendix && ", "}{author.appendix}
                    </p>
                  ))}
                </div>

              </div>
                <div><p>Themenfeld:</p> <div>{course.topicField}</div></div>
                <div><p>Kursart:</p> <div>{course.courseType}</div></div>
                <div><p>Kursstart:</p> <div>{Moment(course.startDateOfCourse).format("DD.MM.YYYY")}</div></div>
                <div><p>Kursende:</p> <div>{Moment(course.endDateOfCourse).format("DD.MM.YYYY")}</div></div>
                
                <div>
                  <p>Sprachen:</p>   
                  <div id="sprachliste">{languageData[index].map((courseLanguage, innerIndex) => (
                            <p key={innerIndex} id="courseLanguage">
                              {courseLanguage}
                            </p>
                            )
                  )}</div>
                </div>
                <div><p>CPD-points:</p><div>{course.cpdBasicPoints}</div></div>
                <div><p>CPD plus:</p><div>{course.cpdAdditionalPoints}</div></div>
                <div><p>Level min:</p><div>{course.professionalLevel} - {ListOfLevel.find((item) => item.value === course.professionalLevel)?.discription}</div></div>
                <div><p>Anbieter:</p><div><a href={course.linkToProvider} id="providerLink" target="_blank" rel="noopener noreferrer">{course.linkToProvider}</a></div></div>
                <div><p>Details...</p><div><Link to="/coursepage" state= {course._id} className="C" id="infoLink"><p>C zum Kurs</p></Link></div></div>
                
            </div>

            </div>
          })}
        </section>
        }
        {anzeige ==="Tabelle" && 
        <table id="tableCourseList">
          <colgroup>
            <col width="15%" />
            <col width="15%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="5%" />
            <col width="5%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
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
                {/* <select 
                name="Themenfeld" 
                value={themenFilter} 
                onChange={(e) => handleFilter(e, setThemenFilter)} id="themenFilterTabelle">
                  <option value="">ohne Filter</option>
                  {ListOfTopicFields.map((topicField, index) => (
                  <option key={index} value={topicField}>
                    {topicField}
                  </option>
                ))}
                </select> */}
              </th>
              <th>
               <p>Kursart</p>
                {/* <select 
                name="Kursart" 
                value={kursartFilter} 
                onChange={(e) => handleFilter(e, setKursartFilter)} id="kursartFilter">
                  <option value="">ohne Filter</option>
                  < DataListOfCourseTypes />
                </select> */}
              </th>
              <th>
                <p>Kursstart</p>
                {/* <select 
                name="Kursstart" 
                value={kursstartFilter} 
                onChange={(e) => handleFilter(e, setKursstartFilter)}
                id="kursstartFilter">
                  <option value="">ohne Filter</option>
                  <option value="Art">Art</option>
                  <option value="Datum">Datum</option>
                  <option value="Level">Level</option>
                </select> */}
              </th>
              <th>
              <p>Kursende</p>
                {/* <select name="Kursende" id="Filter">
                  <option value="">Kursende</option>
                  <option value="Art">Art</option>
                  <option value="Datum">Datum</option>
                  <option value="Level">Level</option>
                </select> */}
              </th>
              <th>
                <p>Sprachfilter</p>
                {/* <select 
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
                </select> */}
              </th>
              <th>CPD</th>
              <th>CPD <br />plus</th>
              <th>
                <p>Levelfilter</p>
                {/* <select 
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
                </select> */}
                </th>
              <th>zum Anbieter</th>
              <th>mehr Infos</th>
            </tr>
          </thead>    
          {/* hier beginnt die Liste der gefundenen Datensätze  */}    
          {coursesData.length >=0 ? (
          <tbody>
            {coursesData.map((course, index)=>{
              return(
                <tr key={index} >
                  <td >
                    <li id="topic">
                      <Link to="/coursepage" state= {course._id} id="topicLink">
                      {course.courseTopic}
                      </Link>
                    </li>
                  </td>
                  <td id="authorsColumn">
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
                  <td><a href={course.linkToProvider} id="providerLink" target="_blank" rel="noopener noreferrer">{course.linkToProvider}</a>
                  </td>
                  <td><Link to="/coursepage" state= {course._id} className="C" id="infoLink"><p>C</p></Link></td>
                  
                </tr>
                  )
                }
              )
            }
          </tbody>) : (
            <p>keine Angebote vorhanden</p>
          )}
        </table>  }

      
      </div>
      {/* <div>
        <h3>Sie sind CPD-aktiv seit {{cpdStartDate}}</h3>
      </div> */}
      {isAuth && knowledgeData && <Countdown  targetDate={knowledgeData.cpdActiveSince} />}
    </main>
  );
};

export default CourseAddMain;
