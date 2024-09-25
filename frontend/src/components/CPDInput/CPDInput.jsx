import React, { useState, useRef, useContext, useEffect } from "react";
//import { Link} from "react-router-dom";
import axiosConfig from "../../util/axiosConfig.js";
import { SectionsContext } from "../../context/SectionsContext.js";
import "./CPDInput.scss";
import { CloseOutlined } from "@ant-design/icons";
import Moment from "moment"
import Swal from "sweetalert2";
import { ListOfCourseTypes, ListOfLanguages, ListOfTopicFields, ListOfLevel } from "../ListsOfData/ListOfData.jsx";
import { FehlendeZugangsrechte } from "../FehlermeldungenSwal/FehlermeldungenSwal.jsx"
//import swal from "sweetalert";

const CourseAddForm = () => {
  const { isAuth, setGotoPage, userData, accessRights, cpdData, navigate} = useContext(SectionsContext);
  
  const [workingMode, setWorkingMode] = useState("inputMode")
  const [formErrors, setFormErrors] = useState({})
  const [data, setData] = useState([])
  const [autorenFilter, setAutorenFilter] = useState('')
  const [themenFilter, setThemenFilter] = useState('')
  const [themenListe, setThemenListe] = useState([])
  const [statusSicherung, setStatusSicherung] = useState("gesichert")
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const [file, setFile] = useState(null);
  const [removed, setRemoved] = useState(false);
  const [courseTopic, setCourseTopic] = useState("");
  const [kursAutor, setKursAutor] = useState([]);
  const [bookingNo, setBookingNo] = useState("")
  const [topicField, setThemenfeld] = useState("");
  const [kursTyp, setKursTyp] = useState("");
  const [kursInhalt, setKursInhalt] = useState("");
  const [professionalLevel, setProfessionalLevel] = useState("");
  const [kursSprache, setKursSprache] = useState([]);
  const [cpdPoints, setCPDPoints] = useState(0);
  const [additionalCPDPoints, setAdditionalCPDPoints] = useState(0);
  const [linkProvider, setLinkProvider] = useState("");
  const [minTeilnehmer, setMinTeilnehmer] = useState(0);
  const [maxTeilnehmer, setMaxTeilnehmer] = useState(0);
  const [kursstart, setKursstart] = useState(today);
  const [kursende, setKursende] = useState(today);
  const [courseDuration, setCourseDurations] = useState("");
  const [listOfAuthors, setListOfAuthors] = useState([]);
  const [kursActivated, setKursActivated] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [updatedBy, setUpdatedBy] = useState("")
  const [updatedOn, setUpdatedOn] = useState("")
  const [createdOn, setCreatedOn] = useState("")

  const clearForm = () => {
    setFile(null);
    setCourseTopic("");
    setKursAutor([]);
    setBookingNo("")
    setThemenfeld("");
    setKursTyp("");
    setKursInhalt("");
    setKursSprache([]);
    setProfessionalLevel("");
    setMinTeilnehmer(0);
    setMaxTeilnehmer(0);
    setCPDPoints(0);
    setAdditionalCPDPoints(0);
    setKursstart(Moment(today).format("YYYY-MM-DD"));
    setKursende(Moment(today).format("YYYY-MM-DD"));
    setLinkProvider("");
    setCourseDurations("")
    //setDescription("");
    setKursActivated(false);
    setStatusSicherung("gesichert")
  }

  const displayCourse = (data) => {
    setData(data)
    if (data)
    {setCourseTopic(data.courseTopic);
    setKursAutor(data.author);
    setBookingNo(data.bookingNo)
    setKursTyp(data.courseType);
    setThemenfeld(data.topicField)
    setKursInhalt(data.courseContent);
    setKursSprache(data.courseLanguage);
    setProfessionalLevel(data.professionalLevel);
    setCPDPoints(data.cpdBasicPoints);
    setAdditionalCPDPoints(data.cpdAdditionalPoints);
    setKursstart(data.startDateOfCourse);
    setKursende(data.endDateOfCourse);
    setLinkProvider(data.linkToProvider);
    setKursActivated(data.active)
    setCourseId(data._id)
    setUpdatedBy(data.updatedBy)
    setUpdatedOn(data.updatedOn)
    setCreatedOn(data.createdOn)}
  }

  const getCourseToReview = async (e) => {
    try {
      const response = await axiosConfig.get("/courses");
      const receivedData = response.data;
      // Filtere die Daten basierend auf dem aktuellen Wert von e.target.value
      //e.target.value ==="no data" && setThemenFilter("xyz")
      const filteredData = receivedData.filter(entry => entry._id.includes(e.target.value)); 
      // Aktualisiere den Zustand mit den gefilterten Themen
      setData(filteredData)
      //setStatusSicherung("ungesichert")
      if (filteredData.length > 0) {
        setCourseTopic(filteredData[0].courseTopic);
        setKursAutor(filteredData[0].author);
        setBookingNo(filteredData[0].bookingNo);
        setKursTyp(filteredData[0].courseType);
        setThemenfeld(filteredData[0].topicField)
        setKursInhalt(filteredData[0].courseContent);
        setKursSprache(filteredData[0].courseLanguage);
        setProfessionalLevel(filteredData[0].professionalLevel);
        setCPDPoints(filteredData[0].cpdBasicPoints);
        setAdditionalCPDPoints(filteredData[0].cpdAdditionalPoints);
        setKursstart(filteredData[0].startDateOfCourse);
        setKursende(filteredData[0].endDateOfCourse);
        setLinkProvider(filteredData[0].linkToProvider);
        setKursActivated(filteredData[0].active)
        setCourseId(filteredData[0]._id)
        setUpdatedBy(filteredData[0].updatedBy)
        setUpdatedOn(filteredData[0].updatedOn)
        setCreatedOn(filteredData[0].createdOn)
      }
      //console.log(data)
    } catch (error) {
      // Fehlerhandling, z.B. mit einer Benachrichtigung
      Swal.fire({
        title: "Fehler beim Abrufen der Kurse",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };
 
  const validateForm = () => {
    const errors = [];
    // Validierung für das Kurs-Thema
    if (courseTopic.trim() === "") {
      errors.push("Das Kursthema darf nicht leer sein");
    }
    if (kursAutor.length === 0) {
      errors.push("Es wurde noch kein Referent ausgewählt");
    }
    if (kursTyp.trim() === "") {
      errors.push("Das Feld Kurstyp darf nicht leer sein");
    }
    if (topicField.trim() === "") {
      errors.push("Das Feld Themenkategorie darf nicht leer sein");
    }
    if (kursInhalt === "") {
      errors.push("Bitte eine Beschreibung des Themas und der Inhalte eingeben");
    }
    if (kursInhalt.length > 500) {
      const überlänge = kursInhalt.length - 500;
      errors.push(`Die Beschreibung ist zu lang. Sie darf nur 500 Zeichen umfassen. Kürzen Sie um ${überlänge} Zeichen`);
    }
    if (kursSprache.length === 0) {
      errors.push("Es wurde noch kein Sprache ausgewählt");
    }
    if (cpdPoints === "") {
      errors.push("Das Feld CPDPoints darf nicht leer sein");
    }
    if (additionalCPDPoints === "") {
      errors.push("Das Feld Bonus CPDPoints darf nicht leer sein");
    }
    if (professionalLevel === "" || isNaN(professionalLevel) || professionalLevel < 0 || professionalLevel > 9) {
      errors.push("Bitte den professionellen Kurslevel zwischen 0 und 9 eingeben.");
    }
    /* const dateOfToday = new Date();
    if (new Date(kursstart) < dateOfToday) {
      errors.push("Der Kursstart liegt in der Vergangenheit.");
    } */
    if (kursstart === "" || kursende === "") {
      errors.push("Die Felder Kursstart und Kursende müssen beide definiert sein");
    }
    if (new Date(kursstart) > new Date(kursende)) {
      errors.push("Der Kursstart liegt hinter dem Kursende.");
    }

    if (errors.length > 6) {
      Swal.fire({
        title: "Bitte zunächst Daten eingeben",
        icon: "error",
        confirmButtonText: "OK"
      });
      return false; // Die Validierung ist fehlgeschlagen
    }

    if (errors.length > 0) {
      Swal.fire({
        title: "Fehler bei der Formularvalidierung. Folgende Eingaben fehlen oder sind fehlerhaft:",
        icon: "error",
        html: errors.join("<br>"),
        confirmButtonText: "OK"
      });
      return false; // Die Validierung ist fehlgeschlagen
    }
    
    return true; // Die Validierung ist erfolgreich
  };

  //Submitfuktion

  //UpdateFunktion
  

  
  return (
    <>
      {isAuth ? (
        <main id="cpdInput">
          <div className="headBox">
            <h2 id="courseHead">Eingabe CPD-Daten</h2>
            <p className="closingFunction" onClick={() => navigate(-1)}>Formular schließen</p>
          </div>
          <form className={statusSicherung}>
        <div>
          <p>{cpdData.courseTopic}</p>
        </div>
          </form>
          
        </main>
      ) : (
        <main id="cpdinput">
          < FehlendeZugangsrechte />
        </main>)}
    </>
  )
}

export default CourseAddForm
