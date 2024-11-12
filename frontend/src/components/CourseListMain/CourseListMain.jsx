import "./CourseListMain.scss";
import { Link } from "react-router-dom";
//import C from "../../images/C.png"
import { useContext, useState, useEffect } from "react";
import { SectionsContext } from "../../context/SectionsContext";
import { DataListOfAuthors, ListOfCourseTypes, DataListOfCourseTypes, ListOfLanguages, ListOfTopicFields, ListOfLevel } from "../ListsOfData/ListOfData.jsx";
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
  const [autorenFilter, setAutorenFilter] = useState(sessionStorage.getItem("autorenFilter") === null ? "" : sessionStorage.getItem("autorenFilter"));
  const [themenfeldFilter, setThemenfeldFilter] = useState(
    sessionStorage.getItem("themenfeldFilter") === null ? "" : sessionStorage.getItem("themenfeldFilter"));
  const [kursartFilter, setKursartFilter] = useState(
    sessionStorage.getItem("kursartFilter") === null ? "" : sessionStorage.getItem("kursartFilter"));
  const [kursstartFilter, setKursstartFilter] = useState(
    sessionStorage.getItem("kursstartFilter") === null ? "" : sessionStorage.getItem("kursstartFilter"));
  const [kursendeFilter, setKursendeFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState(
    sessionStorage.getItem("levelFilter") === null ? "" : sessionStorage.getItem("levelFilter"));
  const [sprachFilter, setSprachFilter] = useState(
    sessionStorage.getItem("sprachFilter") === null ? "" : sessionStorage.getItem("sprachFilter"));
  //const [buchungsNoFilter, setBuchungsNoFilter] = useState('');
  const [filterElements, setFilterElements] = useState(
    sessionStorage.getItem("filterElements") === null || sessionStorage.getItem("filterElements") === ""
        ? []
        : JSON.parse(sessionStorage.getItem("filterElements")));
  const [sortElement, setSortElement] = useState('');
  const [anzeige, setAnzeige] = useState("Karten");
  const [isCourseDetailsModalVisible, setIsCourseDetailsModalVisible] = useState(sessionStorage.getItem("modalStatus"));
  console.log(isCourseDetailsModalVisible)
  const [selectedCourse, setSelectedCourse] = useState(JSON.parse(sessionStorage.getItem("selectedCourse")));
  console.log(selectedCourse)
  const [isTopicFieldFocused, setIsTopicFieldFocused] = useState(false);
  const [isLanguageFocused, setIsLanguageFocused] = useState(false);
  const [isAuthorFocused, setIsAuthorFocused] = useState(false);
  const [isCourseTypeFocused, setIsCourseTypeFocused] = useState(false);
  const [isLevelFocused, setIsLevelFocused] = useState(false);
  const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); 
  
  const buttonPosCheck = ()=>{
    if (isAuth) {setButtonPos("showBut"); setAsidePos ("accountAside")
    }
  }

  const handleCancel = () => {
    setIsCourseDetailsModalVisible(false);
    sessionStorage.removeItem("selectedCourse");
    //console.log(JSON.parse(sessionStorage.getItem("selectedCourse")))
    setSelectedCourse(null);
  };

  const handleAufrufDetails = (course) => {
    setIsCourseDetailsModalVisible(true);
    setSelectedCourse(course);
    sessionStorage.setItem("modalStatus", isCourseDetailsModalVisible);
    sessionStorage.setItem("selectedCourse", JSON.stringify(course));
    //console.log(JSON.parse(sessionStorage.getItem("selectedCourse")))
  }

  const handleViewChange = (e) => {
    const { value } = e.target;
    setAnzeige(value);
    sessionStorage.setItem("anzeige", value); // Speichern des View-Modus im sessionStorage
  };

  const handleFilter = (e, setFilter) => {
    const { value } = e.target;
    setFilter(value);
    // Speichern im sessionStorage
    switch (setFilter) {
      case setThemenfeldFilter:
        sessionStorage.setItem("themenfeldFilter", value);
        break;
      case setKursartFilter:
        sessionStorage.setItem("kursartFilter", value);
        break;
      case setKursstartFilter:
        sessionStorage.setItem("kursstartFilter", value);
        break;
      case setSprachFilter:
        sessionStorage.setItem("sprachFilter", value);
        break;
      case setLevelFilter:
        sessionStorage.setItem("levelFilter", value);
        break;
      case setAutorenFilter:
      sessionStorage.setItem("autorenFilter", value);
      break;
      default:
        break;
    }
  };

  useEffect(() => {
    const savedAutorenFilter = sessionStorage.getItem("autorenFilter");
    const savedThemenFilter = sessionStorage.getItem("themenfeldFilter");
    const savedKursartFilter = sessionStorage.getItem("kursartFilter");
    const savedKursstartFilter = sessionStorage.getItem("kursstartFilter");
    const savedSprachFilter = sessionStorage.getItem("sprachFilter");
    const savedLevelFilter = sessionStorage.getItem("levelFilter");
    const savedSortElement = sessionStorage.getItem("sortElement");
    const savedAnzeige = sessionStorage.getItem("anzeige");
    const savedFilterElements = JSON.parse(sessionStorage.getItem("filterElements") || "[]");
    //const savedSelectedCourse = (sessionStorage.getItem("selectedCourse"));
    const savedDetailsModalStatus = sessionStorage.getItem("modalStatus" );

    if (savedAutorenFilter) setAutorenFilter(savedAutorenFilter);
    if (savedThemenFilter) setThemenfeldFilter(savedThemenFilter);
    if (savedKursartFilter) setKursartFilter(savedKursartFilter);
    if (savedKursstartFilter) setKursstartFilter(savedKursstartFilter);
    if (savedSprachFilter) setSprachFilter(savedSprachFilter);
    if (savedLevelFilter) setLevelFilter(savedLevelFilter);
    if (savedSortElement) setSortElement(savedSortElement);
    if (savedAnzeige) setAnzeige(savedAnzeige);
    //if (savedSelectedCourse) setSelectedCourse(JSON.parse(sessionStorage.getItem("savedSelectedCourse")));
    setIsCourseDetailsModalVisible(savedDetailsModalStatus);
    setFilterElements(savedFilterElements); // wird immer gesetzt, da es ein Array sein sollte
    }, []);

    const resetFilter = () => {
      setAutorenFilter("");
      setThemenfeldFilter("");
      setKursartFilter("");
      setKursstartFilter("");
      setLevelFilter("");
      setSprachFilter("");
      // setBuchungsNoFilter("");
      setSortElement("");
      setFilterElements([]);
      setIsCourseDetailsModalVisible(false);
      //setSelectedCourse(null)
      
      sessionStorage.removeItem("autorenFilter");
      sessionStorage.removeItem("themenfeldFilter");
      sessionStorage.removeItem("kursartFilter");
      sessionStorage.removeItem("levelFilter");
      sessionStorage.removeItem("sprachFilter");
      sessionStorage.removeItem("sortElement");
      sessionStorage.removeItem("filterElements");
      sessionStorage.removeItem("modalStatus");
  };
  

const searchCourseListData = async () => {
  const filterItems = {
    autor: autorenFilter,
    themenfeld: themenfeldFilter,
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
  //console.log(autorenFilter)
    
  try {
    const axiosResp = await axiosConfig.get("/courses/courselist", {params: filterItems}
    );
    console.debug("axiosResp.filterItems:", axiosResp.filterItems);
    const receivedData = await axiosResp.data;
    const authorsForCourse = receivedData.map(({ author }) => author);
    const courseLanguage = receivedData.map(({ courseLanguage }) => courseLanguage); 
    //const themenfeldListe = receivedData.map(({topicField }) => topicField);
    setAuthorsData(authorsForCourse)  
    setCoursesData(receivedData)
    setLanguageData(courseLanguage)
    //console.log(themenfeldListe)
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  searchCourseListData();
  buttonPosCheck()
  //searchListElements()
}, [ sortElement, themenfeldFilter, kursartFilter, autorenFilter, kursstartFilter, levelFilter, sprachFilter]);

  return (
    <main id="courseListMain"> {/* MainStyling in global */}
    < CloseOutlined className="closeX" onClick={() => {resetFilter(); navigate("/home")}}> </CloseOutlined>
      <div className="headBox">
        <h2 >Übersicht aller aktuellen Kursangebote</h2>
        {/* <p className="closingFunction" onClick={() => navigate("/home")}>Formular schließen</p> */}
      </div>

      <div id="overviewCourses">
        <div id="themenfeldFilter">
          <div>
            <p>Autoren</p>
            <select 
            name="Autoren" 
            id="autorenFilter"
            value={autorenFilter}
            onChange={(e) => handleFilter(e, setAutorenFilter)}
            >
              <option value="">ohne Filter</option>
              < DataListOfAuthors />
            </select>
          </div>
          <div>
            <p>Themenfeld</p>
            <select 
              name="Themenfeld" 
              id="themen"
              value={themenfeldFilter} 
              onChange={(e) => handleFilter(e, setThemenfeldFilter)} 
              >
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
          {/* <div>
            <p>Kursstart</p>
            <select 
            name="Kurstart" 
            value={kursstartFilter} 
            onChange={(e) => handleFilter(e, setKursstartFilter)}
            id="kursstartFilter">
              <option value="">ohne Filter</option>
              <option value={currentDate.toISOString().split('T')[0]}>Heute</option>
              <option value="Datum">Datum eingeben</option>
              <option value="Level">Level</option>
            </select>
          </div> */}
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
              <option value="Level0_9">Level 0 -&gt; 9</option>
              <option value="Level9_0">Level 9 -&gt; 0</option>
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
            <p  id="pFilterLöschen" onClick={resetFilter}>Filter löschen</p> : 
            <p>kein Filter gesetzt</p>}
            <span>{coursesData.length} Angebote</span>
          </div>
        </div>

        {anzeige ==="Karten" && 
        <section id="kursÜberblick">
        {coursesData.map((course, index) => {
          return <div key={index} id="cards"> 
            <h3 
              data-tooltip={course.courseTopic}
              // onClick={() => {
              // navigate("/coursepage", { state: course._id  });
              // }} 
              onClick={() => {
                // Setze den ausgewählten Kurs und öffne das Modal
                handleAufrufDetails(course)
              }}
              >{course.courseTopic}
            </h3> 
            <div>
              <div>
                <p> Autor/en:</p>
                <div>
                  {Array.isArray(authorsData[index]) && authorsData[index].map((author, innerIndex) => (
                    <p 
                      key={innerIndex} 
                      onClick={() => {
                        //navigate("/authorspage", { state: author._id  }); // State-Objekt korrekt übergeben
                        window.open(`/authorspage?aID=${author._id}`, "_blank", "noopener,noreferrer");                        
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
                {/* <div><p>Details...</p><div><Link to="/coursepage" state= {course._id} className="C" id="infoLink"><p>C zum Kurs</p></Link></div></div> */}
                <div><p>Details...</p><div><p className="C" id="infoLink" onClick={() => {
                setSelectedCourse(course);
                sessionStorage.setItem("modalStatus", isCourseDetailsModalVisible);
                sessionStorage.setItem("selectedCourse", JSON.stringify(course));
                setIsCourseDetailsModalVisible(true);
                }}>... zum Kurs</p></div></div>
                {isAuth && [5, 10, 9].some(right => accessRights.includes(right))&&<div className="linkToCourse"><p></p><div onClick={() => {
                  navigate("/courseform", { state: { courseId: course._id } }); // course._id wird im state übergeben
                }}  
                style={{ cursor: "pointer"}}><p className="pFunction">Kursdaten ändern</p></div></div>}
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
              <th><p>Thema</p></th>
              <th>
                {/* <input type="text" name="autorenFilter" 
                value={autorenFilter} 
                onChange={(e) => handleFilter(e, setAutorenFilter)} 
                id="autorenFilter"/> */}
                <p>Autoren</p>
              </th>
              <th>
                <p>Themenfeld</p>
                {/* <select 
                name="Themenfeld" 
                value={themenfeldFilter} 
                onChange={(e) => handleFilter(e, setThemenfeldFilter)} id="themenfeldFilterTabelle">
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
              <th><p>CPD</p></th>
              <th><p>CPD <br />plus</p></th>
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
              <th><p>zum Anbieter</p></th>
              <th><p>mehr Infos</p></th>
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
                      {/* <Link to="/coursepage" state= {course._id} id="topicLink">
                      {course.courseTopic}
                      </Link> */}
                      <p onClick={() => {
                // Setze den ausgewählten Kurs und öffne das Modal
                handleAufrufDetails(course)
              }}>{course.courseTopic}</p>
                    </li>
                  </td>
                  <td id="authorsColumn">
                    {authorsData[index].map((author, innerIndex) => (
                      <li key={innerIndex} id="author" onClick={() => {
                        window.open(`/authorspage?aID=${author._id}`, "_blank", "noopener,noreferrer");                        
                      }} >
                        {/* <Link to="/authorspage" state= {author._id} id="authorsLink"> */}
                        <p>{author.professionalTitle}{author.professionalTitle && " "}{author.firstName} {author.lastName}{author.appendix && ", "}{author.appendix}</p>
                        {/* </Link> */}

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
                  <td><p>{course.professionalLevel} - {ListOfLevel.find((item) => item.value === course.professionalLevel)?.discription}</p></td>
                  <td><a href={course.linkToProvider} id="providerLink" target="_blank" rel="noopener noreferrer">{course.linkToProvider}</a>
                  </td>
                  {/* <td><Link to="/coursepage" state= {course._id} className="C" id="infoLink"><p>C</p></Link></td> */}
                  <td><p className="pFunction" id="infoLink" onClick={() => {
                    handleAufrufDetails(course)
                      }}>... Details</p>
                  </td>
                </tr>
                  )
                }
              )
            }
          </tbody>) : (
            <p>keine Angebote vorhanden</p>
          )}
        </table>  }

        {isCourseDetailsModalVisible && selectedCourse && (
          <Modal
          title={<span className="headBox">Kursdetails</span>}
          open={isCourseDetailsModalVisible}
          onCancel={handleCancel}
          className="courseDetailsModal"
          id="courseDetailsModal"
            footer={
              <Button 
                key="back" 
                className="pFunction buttonBasics"
                id="backButtonKursFinden"
                onClick={handleCancel}
              >
                schließen
              </Button>
            }
          >
            <article id="courseArticle">
              {/* Kursüberschrift */}
              <h2>{selectedCourse.courseTopic}</h2>
              
              {/* Autor(en) */}
              <div>
                <p>Autor/en:</p>
                <output>
                  <div>
                    {selectedCourse.author.map((author, index) => (
                      <p key={index} 
                        className="pFunction" 
                        // onClick={() => {navigate("/authorspage", { state: author._id  },);
                        // }}
                        onClick={() => {
                          window.open(`/authorspage?aID=${author._id}`, "_blank", "noopener,noreferrer");
                        }}
                        
                        
                      >
                        {author.professionalTitle}{author.professionalTitle && " "}
                        {author.firstName} {author.lastName}
                        {author.appendix && `, ${author.appendix}`}
                      </p>
                    ))}
                  </div>
                </output>
              </div>
              
              {/* Weitere Kursinformationen */}
              <div><p>Themenfeld:</p> <output>{selectedCourse.topicField}</output></div>
              <div><p>Kursart:</p> <output>{selectedCourse.courseType}</output></div>
              <div><p>Inhalt:</p> <output>{selectedCourse.courseContent}</output></div>

              {/* Bilderanzeige */}
              <div id="contentImagesModal">
                {[...Array(4)].map((_, i) => (
                  <img key={i} src={require('../../images/level_5_senior.jpg')} alt="" />
                ))}
              </div>

              {/* Kurszeitraum */}
              <div><p>Kursstart:</p> <output>{Moment(selectedCourse.startDateOfCourse).format("DD.MM.YYYY")}</output></div>
              <div><p>Kursende:</p> <output>{Moment(selectedCourse.endDateOfCourse).format("DD.MM.YYYY")}</output></div>

              {/* Sprachen */}
              <div>
                <p>Sprachen:</p>
                <output id="sprachlisteModal">
                  {selectedCourse.courseLanguage.join(", ")}
                </output>
              </div>

              {/* Weitere Punkte und Levels */}
              <div><p>CPD-Punkte:</p><output>{selectedCourse.cpdBasicPoints}</output></div>
              <div><p>CPD Plus:</p><output>{selectedCourse.cpdAdditionalPoints}</output></div>
              <div><p>Level min:</p><output>{selectedCourse.professionalLevel} - {ListOfLevel.find(item => item.value === selectedCourse.professionalLevel)?.discription}</output></div>
              <div><p>Min Teilnehmer:</p><output>{selectedCourse.minTeilnehmer}</output></div>
              <div><p>Max Teilnehmer:</p><output>{selectedCourse.maxTeilnehmer}</output></div>
              
              {/* Anbieterlink */}
              <div>
                <p>Anbieter:</p>
                <output>
                  <a href={`https://${selectedCourse.linkToProvider}`} id="providerLink" target="_blank" rel="noopener noreferrer">
                    {selectedCourse.linkToProvider}
                  </a>
                </output>
              </div>

              {/* Bearbeitungsoption für autorisierte Benutzer */}
              {isAuth && [5, 10, 9].some(right => accessRights.includes(right)) && (
                <div className="linkToCourse">
                  <p>Daten ändern</p>
                  <div className="pFunction" onClick={() => navigate("/courseform", { state: { courseId: selectedCourse._id } })}>
                    Kursdaten ändern
                  </div>
                </div>
              )}
            </article>
          </Modal>
        )}
        
      </div>
      
      {isAuth && knowledgeData && <Countdown  targetDate={knowledgeData.cpdActiveSince} />}
    </main>
  );
};

export default CourseAddMain;
