import React, { useState, useRef, useContext, useEffect } from "react";
import { Link} from "react-router-dom";
import axiosConfig from "../../util/axiosConfig.js";
import { SectionsContext } from "../../context/SectionsContext.js";
import "./CourseAddForm.scss";
import { CloseOutlined } from "@ant-design/icons";
import Moment from "moment"
import Swal from "sweetalert2";
import { ListOfCourseTypes, ListOfLanguages, ListOfTopicFields, ListOfLevel } from "../ListsOfData/ListOfData.jsx";
import { FehlendeZugangsrechte } from "../FehlermeldungenSwal/FehlermeldungenSwal.jsx"
//import swal from "sweetalert";

const CourseAddForm = () => {
  const { isAuth, setGotoPage, userData, accessRights, navigate} = useContext(SectionsContext);
  
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
  const [themenfeld, setThemenfeld] = useState("");
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
  const [courseDuration, setCourseSurations] = useState("");
  const [listOfAuthors, setListOfAuthors] = useState([]);
  const [kursActivated, setKursActivated] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [updatedBy, setUpdatedBy] = useState("")
  const [updatedOn, setUpdatedOn] = useState("")
  const [createdOn, setCreatedOn] = useState("")

  const workingModeSelect = (e) => {
    const { value, checked } = e.target;
    e.target.value === "editMode" && setData([])
    e.target.value === "inputMode" && clearForm()
    setWorkingMode(e.target.value);
    //console.log(workingMode)
  };

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
    setCourseSurations("")
    //setDescription("");
    setKursActivated(false);
    setStatusSicherung("gesichert")
  }

  const textAreaResizeHandler = (e)=> {
    // Reset field height
    e.target.style.height = 'inherit';
    // Get the computed styles for the element
    const computed = window.getComputedStyle(e.target);
    // Calculate the height
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
    + parseInt(computed.getPropertyValue('padding-top'), 10)
    + e.target.scrollHeight
    + parseInt(computed.getPropertyValue('padding-bottom'), 10)
    + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
    e.target.style.height = `${height}px`;
  }

  const handleChangeOfData = (event) => {
    const { name, value, checked, type } = event.target;
    setStatusSicherung("ungesichert")
    /* const { categories } = eventCategory;
    if (checked) {
      setEventCategory({ categories: [...categories, value] });
    } else {
      setEventCategory({ categories: categories.filter((e) => e !== value) });
    } */
  };

  const authorsAvailableList = async () => {
    try {
      const response = await axiosConfig.get("/contacts");
      //console.log("responseData", response.data);
      const receivedData = response.data;
      // Filtere die Daten, um nur Einträge mit "authorsData" zu erhalten
      const filteredData = receivedData.filter(entry => entry.authorsData);
      // Erstelle ein Array von Objekten mit _id und Name
      const authorsArray = filteredData.map(entry => ({
        _id: entry._id,
        Name: `${entry.firstName} ${entry.lastName}${entry.currentCompany !== null ? `, ${entry.currentCompany.companyName}`: ''}`
      }));
      //authorsArray.Name.includes(filter)
      authorsArray.sort((a, b) => {
        const nameA = a.Name.toLowerCase();
        const nameB = b.Name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      setListOfAuthors(authorsArray);
    } catch (error) {
      !listOfAuthors && Swal.fire({
        title: "Keine Autoren gefunden",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  }

  const authorsFilter = (input) => {
    return listOfAuthors.filter((author) =>
      author.Name.toLowerCase().includes(input.toLowerCase())
    );
  };

  const updateAuthorsList = (e) => {
    // Hier kannst du den Wert aus dem Eingabefeld hinzufügen oder entfernen
    const selectedAuthor = e.target.value;
    if (!kursAutor.includes(selectedAuthor) && selectedAuthor !=="") {
      setKursAutor([...kursAutor, selectedAuthor])
    } else {
      const updatedAuthors = kursAutor.filter((author) => author !== selectedAuthor);
      setKursAutor(updatedAuthors); // Entfernen des Autors aus dem Array
    }
    setStatusSicherung("ungesichert")
      //e.target.value = "";
  };

  const topicsAvailableList = async () => {
    try {
      const response = await axiosConfig.get("/courses");
      const receivedData = response.data;
      // Filtere die Daten basierend auf dem aktuellen Wert von filter
      const filteredData = receivedData.filter(entry => entry.courseTopic.toLowerCase().includes(themenFilter.toLowerCase()));
      // Erstelle ein Array von Objekten mit _id und Thema aus den gefilterten Daten
      const themenArray = filteredData.map(entry => ({
        _id: entry._id,
        Thema: entry.courseTopic
      }));
      // Aktualisiere den Zustand mit den gefilterten Themen
      setThemenListe(themenArray);
    } catch (error) {
      // Handle den Fehler, z.B. mit einer Benachrichtigung
      Swal.fire({
        title: "Fehler beim Abrufen der Themen",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
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

  const updateLanguageList = (e) => {
  // console.log(kursSprache)
    const addLanguage = e.target.value;
    if (!kursSprache.includes(addLanguage)) {
      setKursSprache([...kursSprache, addLanguage]);
      // Hinzufügen der Sprache zum Array
    } else {
      const updatedSprache = kursSprache.filter((sprache) => sprache !== addLanguage);// Entfernen des Autors aus dem Array
      setKursSprache(updatedSprache);
    }
      e.target.value = "";
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
    if (themenfeld.trim() === "") {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
        // Führe die Aktionen aus, wenn das Formular gültig ist
        // ...
        const formData = new FormData(e.target);
        //console.debug(eventCategory);
        let imgToSave;
        if (removed || !file) {
        imgToSave = null;
      } else {
        imgToSave = formData.get("imageUpload");
      }
      
      const courseData = {
        //courseId,
        courseTopic,
        author: kursAutor,
        bookingNo,
        topicField: themenfeld,
        courseType: kursTyp,
        courseContent: kursInhalt,
        courseLanguage: kursSprache,
        professionalLevel,
        cpdBasicPoints: cpdPoints,
        cpdAdditionalPoints: additionalCPDPoints,
        startDateOfCourse: kursstart,
        endDateOfCourse: kursende,
        linkToProvider: linkProvider,
        //courseImage: imgToSave,
        active: kursActivated,
        updatedBy: localStorage.getItem("userId"),
      };
          
      try {
        const response = await axiosConfig.post("/courses", courseData,
        /* {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        } */
        );
        setStatusSicherung("gesichert")
        //console.log("reponsData", response.data);
        setThemenFilter("");
        topicsAvailableList();
        Swal.fire({
          title: "Das Kursangebot wurde erfolgreich erstellt!",
          text: "Was willst du als nächstes tun?",
          icon: "success",
          showConfirmButton: true,
          showCancelButton: true,
          showDenyButton: true,
          confirmButtonText: 'Neuen Kurs anlegen',
          cancelButtonText: 'neuen Kurs anzeigen',
          denyButtonText: 'Formular schließen',
        }).then((result) => {
          if (result.isConfirmed) {
            clearForm()
          } else if (result.isDismissed) {
            displayCourse(response.data)
            setWorkingMode("editMode")

          } else if (result.isDenied) {
            navigate("/home")
          }
        })
        } catch (error) {
          
          console.error(error);
          Swal.fire({
            title: "Es ist ein Fehler aufgetreten. Der Datensatz wurde nicht gespeichert.",
            icon: "error",
            confirmButtonText: "OK"
          });
        }
    }
  };

  //UpdateFunktion
  const updateCourse = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const courseData = {
        courseId,
        courseTopic,
        bookingNo,
        author: kursAutor,
        topicField: themenfeld,
        courseType: kursTyp,
        courseContent: kursInhalt,
        courseLanguage: kursSprache,
        professionalLevel,
        cpdBasicPoints: cpdPoints,
        cpdAdditionalPoints: additionalCPDPoints,
        startDateOfCourse: kursstart,
        endDateOfCourse: kursende,
        linkToProvider: linkProvider,
        //courseImage: imgToSave,
        active: kursActivated,
        updatedBy: localStorage.getItem("userId"),
      };
      try {
        
        const response = await axiosConfig.patch("/courses/id", courseData); 
        setStatusSicherung("gesichert")
        setThemenFilter("");
        topicsAvailableList();
        Swal.fire({
          icon: "success",
          title: "Das Kursangebot wurde erfolgreich korrigiert!",
          text: "Was willst du als nächstes tun?",
          showConfirmButton: true,
          showCancelButton: true,
          showDenyButton: true,
          //showFourthButton: true,
          confirmButtonText: 'Datensatz anlegen',
          cancelButtonText: 'zurück zum Datensatz',
          denyButtonText: 'Formular schließen',
          //fourthButtonText: 'Datensatz bearbeiten',
        }).then((result) => {
          if (result.isConfirmed) {
            clearForm()
            setWorkingMode("inputMode")
          } /* else if (result.isFourth) {
            clearForm()
            setWorkingMode("editMode")
          } */ else if (result.isDismissed) {
            setWorkingMode("editMode")
          } else if (result.isDenied) {
            navigate("/home")
          }
        })
        //console.log('Datensatz aktualisiert:', response.data);
      } catch (error) {
          
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Es ist ein Fehler aufgetreten. Der veränderte Datensatz wurde nicht gespeichert.",
          confirmButtonText: "OK"
        });
      }
    }
  };
  
  const deleteCourse = async (courseId) => {
    Swal.fire({
      icon: "warning",
      title: 'Soll der Kurs wirklich gelöscht werden?',
      showDenyButton: true,
      /* showCancelButton: true, */
      confirmButtonText: 'löschen ist ok!',
      denyButtonText: `nein, nicht löschen`,
      }).then (async (result) => {
        if (result.isConfirmed) {
          try {
            const response =  await axiosConfig.delete(`/courses/${courseId}`);
            setThemenFilter("");
            topicsAvailableList();
            setData([]);
            // Erfolgreich gelöscht
            Swal.fire({
              icon: "success",
              title: "Der Datensatz wurde gelöscht.",
              confirmButtonText: "OK",
              timer: 3000,
            })
          } catch (error) {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Es ist ein Fehler aufgetreten. Der Datensatz wurde nicht gelöscht.",
              confirmButtonText: "OK"
            });
          }
        } else if (result.isDenied) {
          Swal.fire({
            icon: "info",
            title: "Abbruch: Der Datensatz wurde nicht gelöscht.",
            confirmButtonText: "OK", 
            /* timer: 3000, */
          })
        }
      })
  }
  
  useEffect(() => {
    setGotoPage("/courseaddpage")
    authorsAvailableList()
    topicsAvailableList()
   // console.log(accessRights)
  }, [themenFilter]);
  
  useEffect(() => {
    if (courseId) {
      // Lade den ausgewählten Kurs
      getCourseToReview({ target: { value: courseId } });
    }
  }, [courseId])

  useEffect(() => {
    if (data[0] && data[0].author) {
      setKursAutor(data[0].author.map(author => author._id));
    }
  }, [data]);

  useEffect(() => {
    // Aktualisiere das Datum alle Sekunde (optional)
    const interval = setInterval(() => {
      const updatedDate = new Date();
      setCurrentDate(updatedDate);
    }, 1000);

    // Aufräumen, um den Intervall zu stoppen, wenn die Komponente unmontiert wird
    return () => clearInterval(interval);
  }, []);

  
  return accessRights.includes(5) || accessRights.includes(10) || accessRights.includes(9) ? (
  (
    <main id="courseAddForm">
      <div id="headBox">
        <h2 id="courseHead">Eingabe / Bearbeiten von Kursangeboten</h2>
        <p onClick={() => navigate("/home")}>Formular schließen</p>
      </div>
      <div id="boxModusWahl">
          <label>
            <input
              type="radio"
              name="editMode"
              value="editMode"
              checked={workingMode === 'editMode'}
              onChange={workingModeSelect}
            /> 
            <span style={{ marginLeft: '5px' }}>Anzeigen und Bearbeiten</span>
          </label>
          <label>
            <input
              type="radio"
              name="inputMode"
              value="inputMode"
              checked={workingMode === 'inputMode'}
              onChange={workingModeSelect}
            />
            <span style={{ marginLeft: '5px' }}>Neue Kurse erfassen</span>
          </label>
      </div>
      {workingMode === "editMode" && (
          <div id="themensuche">
            <div>
              <label 
              htmlFor="sucheThema" 
              id="themenFilterLabel"
              > Datensatzfinder nach Themen
              </label>
            <input 
            type="text" 
            name="sucheThema" 
            value={themenFilter}
            onDoubleClickCapture={(e) => 
              {setThemenFilter("")}}
            /* onChange={handleFilter} */ 
            onChange={(e) =>
              {setThemenFilter(e.target.value)}} 
            id="sucheThema" 
            placeholder="Themensuchfilter" 
            //autoComplete="off"
              />
            </div>
              <select name="themenListe" 
              onChange={(e) => {
                getCourseToReview(e);
                setStatusSicherung("gesichert");
              }} 
              /* onClick={getCourseToReview} */ 
              id="themenListe"> 
              {themenListe.length > 0 ? 
              <option value="no data">bitte auswählen</option> : 
              <option value="no data">kein Treffer - bitte Filter verändern</option>} 
                {themenListe.map((item, index) => (
                  <option key={index} value={item._id}>{item.Thema}</option>
                ))} 
              </select> 
          </div>
        )
      }
      {workingMode === 'inputMode' ? (
        <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        id="courseSubmitForm" className={statusSicherung}
        onChange={(e)=>{setStatusSicherung("ungesichert")}}
        >
          {statusSicherung === "ungesichert" ? <p id="änderunsgHinweis">ACHTUNG: Änderungen wurden noch nicht gesichert</p>: null}
          <div id="kursthemaeingabe">
            <label htmlFor="courseTopic">Kursthema<sup id="courseTopicSup">*</sup></label>
            <input
              type="text"
              id="courseTopic"
              name="courseTopic"
              value={courseTopic}
              placeholder="Wie lautet das Thema?"
              autoComplete="off"
              autoFocus
              onChange={(e) => {
                setFormErrors({ ...formErrors, courseTopic: "" }); // Fehlermeldung zurücksetzen
              handleChangeOfData(e);
              setCourseTopic(e.target.value);
            }}
              />
              {formErrors.courseTopic && <p className="error">{formErrors.courseTopic}</p>}
          </div>   
          <div id="autorenauswahl">
            <div>
              <label htmlFor="kursAutor" id="autorenSucheLabel"> Autoren<sup id="autorenSucheSup">*</sup></label>
              <input 
              type="text" 
              name="sucheAutor" 
              value={autorenFilter}
              /* onChange={handleFilter}  */
              onChange={(e) =>
                {setAutorenFilter(e.target.value)}}
              id="sucheAutor" 
              placeholder="Suchfilter" 
              autoComplete="off"
              multiple 
              /> 
            </div>             
            <div>
              <select name="kursAutor" onClick={updateAuthorsList}id="kursAutor" multiple> 
                {authorsFilter(autorenFilter).map((item, index) => (
                  <option key={index} value={item._id}>{item.Name}</option>
                ))} 
              </select>  

              {kursAutor.length >= 1 ? (
              <ul id="authorsListToSave">
                {kursAutor.map((authorId, index) => (
                  <li key={index} value={authorId}>
                    {listOfAuthors.find(author => author._id === authorId)?.Name}
                  </li>
                ))}
              </ul>
              ) : (
                <ul id="authorsListToSave">
                  <li>Auswahl ist leer</li>
                </ul>
              )}
            </div>
          </div>
          <div id="kursnummer">
            <label htmlFor="bookingNo">KursCode<sup id="bookingNoSup">*</sup></label>
            <input
              type="text"
              id="bookingNo"
              name="bookingNo"
              value={bookingNo}
              placeholder="Kursnummer eingeben"
              autoComplete="off"
              autoFocus
              onChange={(e) => {
                setFormErrors({ ...formErrors, bookingNo: "" }); // Fehlermeldung zurücksetzen
              handleChangeOfData(e);
              setBookingNo(e.target.value);
            }}
              />
          </div>
          <div id="kurstypauswahl">
            <label htmlFor="kursTyp">Kurstyp:<sup id="courseTypeSup">*</sup></label>
            <input type= "text"
            id="kursTyp"
            name="kursTyp"
            list="AuswahlKurstyp"
            value={kursTyp}
            placeholder="Kurstyp auswählen"
            autoComplete="off"
            onChange={(e) => {
              handleChangeOfData(e);
              setKursTyp(e.target.value);
            }} 
            />
            <datalist id="AuswahlKurstyp">
            < ListOfCourseTypes />
            </datalist>
          </div>
          <div id="themenfeldauswahl">
            <label htmlFor="themenfeld">Themenfeld:<sup id="topicFieldSup">*</sup></label>
            <input type= "text"
            id="themenfeld"
            name="themenfeld"
            value={themenfeld}
            list="auswahlThemenfeld"
            placeholder="Themenfeld aussuchen"
            autoComplete="off"
            onChange={(e) => {
              handleChangeOfData(e);
              setThemenfeld(e.target.value);
            }} 
            />
            <datalist id="auswahlThemenfeld">
              {ListOfTopicFields.map((topicField, index) => (
            <option key={index} value={topicField}>
              {topicField}
            </option>
          ))}
              </datalist>
          </div>
          <div id="kursinhalteingabe">
            <label htmlFor="kursInhalt">Kursinhalt:<sup id="kursInhaltSup">*</sup></label>
              <textarea 
              /* type= "text" */
              id="kursInhalt"
              name="kursInhalt"
              value={kursInhalt}
              //placeholder="Themenfeld"
              onChange={(e) => {
              handleChangeOfData(e);
              textAreaResizeHandler(e)
              setKursInhalt(e.target.value);
              }} />
          </div>
          <div id="sprachauswahl">
            
              <label htmlFor="kursSprache">Sprache:<sup    id="kursSpracheSup">*</sup></label>
              <div>
                <input 
                list="sprachOptionen"
                name="kursSprache" 
                onChange={updateLanguageList}
                id="kursSprache" 
                placeholder={kursSprache.length > 0 ? "Sprachen ergänzen oder löschen" : "Sprache auswählen"}
                multiple>
                </input>
                <datalist id="sprachOptionen">
                  {/* < ListOfLanguages /> */}
                  {ListOfLanguages.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
                </datalist>
                {kursSprache.length >= 1 ? (
                <ul id="sprachListToSave">
                  {Array.isArray(kursSprache) ? kursSprache.join(', ') : ''}
                {/* {kursSprache.map((language, index) => (
                  <li key={index} value={language}>
                    {language} 
                  </li>
                ))} */}
              </ul>
                ) : (
                  <ul id="sprachListToSave">
                    <li>Auswahl ist leer</li>
                  </ul>
                )}
              </div>
          </div>
          <div id="professionallevelauswahl">
            <label htmlFor="professionalLevel">Level:<sup id="professionalLevelSup">*</sup></label>
            <input type= "text"
            id="professionalLevel"
            name="professionalLevel"
            value={professionalLevel}
            list="levelOptions"
            placeholder="professional Level eingeben"
            onChange={(e) => {
            handleChangeOfData(e);
            setProfessionalLevel(e.target.value);
            }} 
            onDoubleClickCapture={(e) => 
              setProfessionalLevel("")}
            />
            <datalist id="levelOptions">
             {ListOfLevel.map((level, index) => (
            <option key={index} value={level.value}>
              {level.discription}
            </option>
          ))}
            </datalist>
            {/* <div id="levelDiscription">
              {ListOfLevel.find((level) => level.value === professionalLevel)?.discription || ''}
            </div> */}
          </div>
          <div id="cpdbasicpointseingabe">
            <label htmlFor="cpdBasicPoints">CPDPoints:<sup id="cpdBasicPointsSup">*</sup></label>
            <input type= "number"
            id="cpdBasicPoints"
            name="cpdBasicPoints"
            value={cpdPoints}
            //placeholder="Themenfeld"
            onChange={(e) => {
            handleChangeOfData(e);
            e.target.value<0 ? setCPDPoints(0) : setCPDPoints(e.target.value);
            }} />
          </div>
          <div id="cpdadditionalpointseingabe">
            <label htmlFor="cpdAdditionalPoints">Bonus CPDPoints:<sup id="cpdAdditionalPointsSup">*</sup></label>
            <input type= "number"
            id="cpdAdditionalPoints"
            name="cpdAdditionalPoints"
            value={additionalCPDPoints}
            //placeholder="Themenfeld"
            onChange={(e) => {
            handleChangeOfData(e);
            setAdditionalCPDPoints(e.target.value);
            e.target.value<0 ? setAdditionalCPDPoints(0) : setAdditionalCPDPoints(e.target.value);
            }} />
          </div>
          <div id="minTeilnehmereingabe">
            <label htmlFor="minTeilnehmer">Mindestanzahl Teilnehmer:</label>
            {/* <p id="cpdAdditionalPoints">{data[0].cpdAdditionalPoints}</p> */}
            <input type= "number"
            id="minTeilnehmer"
            name="minTeilnehmer"
            value={minTeilnehmer}
            //placeholder="Themenfeld"
            onDoubleClickCapture={(e) => 
              { setMinTeilnehmer("");
              setStatusSicherung("ungesichert")}}
            onChange={(e) => {
            handleChangeOfData(e);
            setMinTeilnehmer(e.target.value);
            }} />
          </div>
          <div id="maxTeilnehmereingabe">
            <label htmlFor="maxTeilnehmer">Maximalanzahl Teilnehmer:</label>
            {/* <p id="cpdAdditionalPoints">{data[0].cpdAdditionalPoints}</p> */}
            <input type= "number"
            id="maxTeilnehmer"
            name="maxTeilnehmer"
            value={maxTeilnehmer}
            //placeholder="Themenfeld"
            onDoubleClickCapture={(e) => 
              { setMaxTeilnehmer("");
              setStatusSicherung("ungesichert")}}
            onChange={(e) => {
            handleChangeOfData(e);
            setMaxTeilnehmer(e.target.value);
            }} />
          </div>
          <div id="kursstarteingabe">
            <label htmlFor="kursstart">Kursstart:<sup id="kursstartSup">*</sup></label>
            <input type= "date"
            id="kursstart"
            name="kursstart"
            value={Moment(kursstart).format("YYYY-MM-DD")}
            //placeholder="Themenfeld"
            onChange={(e) => {
              const selectedDate = e.target.value;
              handleChangeOfData(e);
              setKursstart(selectedDate);
              const nextDay = Moment(selectedDate).format("YYYY-MM-DD");
              setKursende(nextDay);
            }}
            />
          </div>
          <div id="kursendeeingabe">
            <label htmlFor="kursende">Kursende:<sup id="kursendeSup">*</sup></label>
            <input type= "date"
            id="kursende"
            name="kursende"
            value={Moment(kursende).format("YYYY-MM-DD")}
            //placeholder="Themenfeld"
            onChange={(e) => {
            handleChangeOfData(e);
            setKursende(e.target.value);
            }} />
          </div>
          <div id="linkprovidereingabe">
            <label htmlFor="linkProvider">Anbieter:<sup id="linkProviderSup">*</sup></label>
              <input type= "url"
              id="linkProvider"
              name="linkProvider"
              value={linkProvider}
              //placeholder="Themenfeld"
              onChange={(e) => {
              handleChangeOfData(e);
              setLinkProvider(e.target.value);
              }} />
          </div>
          <div id="imageupload">
            <label htmlFor="imageUpload">
              Foto hochladen:
            </label>
              <input
                type="file"
                name="imageUpload"
                id="imageUpload"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setRemoved(false);
                }}
              />
            {file ? (
              <>
                <div>
                  <p>
                    <span id="file">{file.name}</span>
                    <CloseOutlined
                      onClick={() => {
                        setRemoved(true);
                        setFile(null);
                      }}
                    />
                  </p>
                  {/* <label htmlFor="image">
                    Dateien durchsuchen
                  </label> */}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div id="kursactivated">
            <label htmlFor="kursActivated">Kurs aktivieren:<sup id="activeSup">*</sup></label>
            <input type= "checkbox"
            id="kursActivated"
            name="kursActivated"
            checked={kursActivated}
            //placeholder="Themenfeld"
            onChange={(e) => {
            handleChangeOfData(e);
            setKursActivated(e.target.checked);
            }} 
            />
          </div>
          <div id="updatedbyeingabe">
            <label htmlFor="updatedBy">Eingabe als:</label>
            {/* <p id="kursActivated">{data[0].active === true ? "aktiviert" : "nicht aktiv"}</p> */}
            <output         
            id="updatedBy"
            name="updatedBy"
            >
            {userData.firstName} {userData.lastName}
            </output>
          </div>
          {statusSicherung === "ungesichert" ? (<div id="buttonBox">
            <button className="buttonBasics" type="submit" value="senden" >senden</button>
            <button className="buttonBasics" type="reset" onClick={clearForm}>reset Daten</button>
          </div>) : <div>Noch keine Daten eingegeben</div>}
        </form> 

        ) : (
                  
        data.length === 1 ?
        <div id="courseDisplayForm" className={statusSicherung}>
          { statusSicherung === "ungesichert" ? <p id="änderunsgHinweis">Änderungen wurden noch nicht gesichert</p>: null}
          <div id="kurstiteldefinition">
            <label htmlFor="courseTopic">Kursthema</label>
            {/* {data.length === 1 ? <p id="courseTopic">{data[0].courseTopic}</p> : <p></p>} */}
            {/* <p id="courseTopic">{data[0].courseTopic}</p> */}
            <input
              type="text"
              id="courseTopic"
              name="courseTopic"
              value={courseTopic}
              placeholder="Wie lautet das Thema?"
              autoComplete="off"
              autoFocus
              onDoubleClickCapture={(e) => 
                {setCourseTopic("")}}
              onChange={(e) => {
                setFormErrors({ ...formErrors, courseTopic: "" }); // Fehlermeldung zurücksetzen
                handleChangeOfData(e);
                setCourseTopic(e.target.value);
            }}
              /> 
              {formErrors.courseTopic && <p className="error">{formErrors.courseTopic}</p>}
          </div>
          <div id="autorenauswahl">
              <div >
                <label htmlFor="kursAutor" id="autorenSucheLabel"> Autoren</label>
                <input 
                type="text" 
                name="sucheAutor" 
                value={autorenFilter}
                onChange={(e) =>
                {setAutorenFilter(e.target.value)}} 
                id="sucheAutor" 
                placeholder="Suchfilter" 
                autoComplete="off"
                multiple 
                />
              </div>              
            <div>   
            
            {<select name="kursAutor" 
            onClick={updateAuthorsList} 
            id="kursAutor" multiple>
              {authorsFilter(autorenFilter).map((item, index) => (
                <option key={index} value={item._id}>
                  {item.Name}
                </option>
              ))}
            </select>} 

            <ul id="authorsListToSave">
              {kursAutor.length >= 1 ? (
                kursAutor.map((authorsId, index) => (
                  <li key={index} value={authorsId}>
                    {listOfAuthors.find(author => author._id === authorsId)?.Name}
                  </li>
                ))
              ) : (
                <li>Auswahl ist leer</li>
              )}
            </ul>
          </div>
          </div>
          <div id="bookingnodefinition">
            <label htmlFor="bookingNo">KursCode:</label>
            <input
                type="text"
                id="bookingNo"
                name="bookingNo"
                value={bookingNo}
                placeholder="KursCode"
                autoComplete="off"
                autoFocus
                onDoubleClickCapture={(e) => 
                  {setBookingNo("")}}
                onChange={(e) => {
                  setFormErrors({ ...formErrors, bookingNo: "" }); // Fehlermeldung zurücksetzen
                  handleChangeOfData(e);
                  setBookingNo(e.target.value);
              }}
            />
          </div>          
          <div id="kurstypauswahl">
            <label htmlFor="kursTyp">Kurstyp:</label>
            {/* <p id="kursTyp">{data[0].courseType}</p> */}
            <input type= "text"
            id="kursTyp"
            name="kursTyp"
            list="AuswahlKurstyp"
            value={kursTyp}
            placeholder="Kurstyp aussuchen"
            autoComplete="off"
            onDoubleClickCapture={(e) => 
              {setKursTyp("");
              setStatusSicherung("ungesichert")}}
            onChange={(e) => {
              handleChangeOfData(e);
              setKursTyp(e.target.value);
            }} 
            />
            <datalist id="AuswahlKurstyp">< ListOfCourseTypes /></datalist>
          </div>
          <div id="themenfeldauswahl">
            <label htmlFor="themenfeld">Themenfeld:</label>
            {/* <p id="themenfeld">{data[0].topicField}</p> */}
            <input type= "text"
            id="themenfeld"
            name="themenfeld"
            value={themenfeld}
            list="auswahlThemenfeld"
            placeholder="Themenfeld aussuchen"
            autoComplete="off"
            onDoubleClickCapture={(e) => 
              {setThemenfeld("")
              setStatusSicherung("ungesichert")}}
            onChange={(e) => {
              handleChangeOfData(e);
              setThemenfeld(e.target.value);
            }} 
            />
            <datalist id="auswahlThemenfeld">
              {ListOfTopicFields.map((topicField, index) => (
            <option key={index} value={topicField}>
              {topicField}
            </option>
          ))}
              </datalist>
          </div>
          <div id="kursinhalteinfügen">
            <label htmlFor="kursInhalt">Kursinhalt:</label>
            {/* <p id="kursInhalt" style={{height:"fit-content"}}>{data[0].courseContent}</p> */}
              <textarea 
              id="kursInhalt"
              name="kursInhalt"
              value={kursInhalt}
              placeholder="Kursinhalt"
              onLoad={(e)=>{
                textAreaResizeHandler(e)}}
              onDoubleClickCapture={(e) => {
                setStatusSicherung("ungesichert")
                textAreaResizeHandler(e)
              }}
              onChange={(e) => {
              handleChangeOfData(e);
              textAreaResizeHandler(e)
              setKursInhalt(e.target.value);
              }} />
          </div>
          <div id="sprachauswahl">
              <label htmlFor="kursSprache">Sprache:</label>
              <div>
                {/* <ul id="sprachListToSave">
                  {data[0].courseLanguage.map((language, index) => (
                    <li key={index} value={language}>
                    {language} 
                  </li>
                ))}
                </ul> */}
                    <input 
                  list="sprachOptionen"
                  name="kursSprache" 
                  onChange={(e)=>{
                    setStatusSicherung("ungesichert")
                    updateLanguageList(e)
                  }}
                  id="kursSprache" 
                  placeholder={kursSprache.length > 0 ? "Sprachen ergänzen oder löschen" : "Sprache auswählen"}
                  multiple>
                  </input>
                  <datalist id="sprachOptionen">
                    {/* < ListOfLanguages /> */}
                  {ListOfLanguages.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
                  </datalist>
                  {kursSprache.length >= 1 ? (
                  <ul id="sprachListToSave">
                    {Array.isArray(kursSprache) ? kursSprache.join(', ') : ''}
                  {/* {kursSprache.map((language, index) => (
                    <li key={index} value={language}>
                      {language}
                    </li>
                  ))} */}
                </ul>
                  ) : (
                    <ul id="sprachListToSave">
                      <li>Auswahl ist leer</li>
                    </ul>
                  )}
              </div>
          </div>
          <div id="levelauswahl">
            <label htmlFor="professionalLevel">Level:</label>         
            <div id="test">
              <input type= "text"
              id="professionalLevel"
              name="professionalLevel"
              value={professionalLevel}
              list="levelOptionen"
              placeholder="professional Level eingeben"
              onDoubleClickCapture={(e) => 
                {setProfessionalLevel("");
              setStatusSicherung("ungesichert")}}
              onChange={(e) => {
              /* handleChangeOfData(e); */
              setProfessionalLevel(e.target.value);
              }} 
              /> 
              <datalist id="levelOptionen">
                {ListOfLevel.map((level, index) => (
                <option key={index} value={level.value}>
                  {level.value} - {level.discription}
                </option>
                ))}
              </datalist>
              <div id="levelDiscription">
                {ListOfLevel.find((level) => level.value === professionalLevel)?.discription || ''}
              </div>
            </div>
          </div>
          <div id="cpdBasicPointsAuswahl">
            <label htmlFor="cpdBasicPoints">CPDPoints:</label>
            {/* <p id="cpdBasicPoints">{data[0].cpdBasicPoints}</p> */}
            <input type= "number"
            id="cpdBasicPoints"
            name="cpdBasicPoints"
            value={cpdPoints}
            //placeholder="Themenfeld"
            onDoubleClickCapture={(e) => 
              {setCPDPoints("");
              setStatusSicherung("ungesichert")}}
            onChange={(e) => {
            handleChangeOfData(e);
            setCPDPoints(e.target.value);
            e.target.value<0 ? setCPDPoints(0) : setCPDPoints(e.target.value);
            }} />
          </div>
          <div id="cpdAdditionalPointsAuswahl">
            <label htmlFor="cpdAdditionalPoints">Bonus CPDPoints:</label>
            {/* <p id="cpdAdditionalPoints">{data[0].cpdAdditionalPoints}</p> */}
            <input type= "number"
            id="cpdAdditionalPoints"
            name="cpdAdditionalPoints"
            value={additionalCPDPoints}
            //placeholder="Themenfeld"
            onDoubleClickCapture={(e) => 
              { setAdditionalCPDPoints("");
              setStatusSicherung("ungesichert")}}
            onChange={(e) => {
            handleChangeOfData(e);
            e.target.value<0 ? setAdditionalCPDPoints(0) : setAdditionalCPDPoints(e.target.value);
            }} />
          </div>
          <div id="minTeilnehmer">
            <label htmlFor="minTeilnehmer">Mindestanzahl Teilnehmer:</label>
            {/* <p id="cpdAdditionalPoints">{data[0].cpdAdditionalPoints}</p> */}
            <input type= "number"
            id="minTeilnehmer"
            name="minTeilnehmer"
            value={minTeilnehmer}
            //placeholder="Themenfeld"
            onDoubleClickCapture={(e) => 
              { setMinTeilnehmer("");
              setStatusSicherung("ungesichert")}}
            onChange={(e) => {
            handleChangeOfData(e);
            setMinTeilnehmer(e.target.value);
            }} />
          </div>
          <div id="maxTeilnehmer">
            <label htmlFor="maxTeilnehmer">AMximalanzahl Teilnehmer:</label>
            {/* <p id="cpdAdditionalPoints">{data[0].cpdAdditionalPoints}</p> */}
            <input type= "number"
            id="maxTeilnehmer"
            name="maxTeilnehmer"
            value={maxTeilnehmer}
            //placeholder="Themenfeld"
            onDoubleClickCapture={(e) => 
              { setMaxTeilnehmer("");
              setStatusSicherung("ungesichert")}}
            onChange={(e) => {
            handleChangeOfData(e);
            setMaxTeilnehmer(e.target.value);
            }} />
          </div>
          <div id="kursstartdefinition">
            <label htmlFor="kursstart">Kursstart:</label>
            {/* <p id="kursstart">{Moment(data[0].startDateOfCourse).format("DD.MM.YYYY")}</p> */}
            <input type= "date"
            id="kursstart"
            name="kursstart"
            value={Moment(kursstart).format("YYYY-MM-DD")}
            //placeholder="Themenfeld"
            onDoubleClickCapture={(e) => 
              {setKursstart("");
              setStatusSicherung("ungesichert")}}
            onChange={(e) => {
            handleChangeOfData(e);
            setKursstart(e.target.value);
            }} />
          </div>
          <div id="kursendedefinition">
            <label htmlFor="kursende">Kursende:</label>
            {/* <p id="kursende">{Moment(data[0].endDateOfCourse).format("DD.MM.YYYY")}</p> */}
            <input type= "date"
            id="kursende"
            name="kursende"
            value={Moment(kursende).format("YYYY-MM-DD")}
            //placeholder="Themenfeld"
            onDoubleClickCapture={(e) => 
              {setKursende("");
              setStatusSicherung("ungesichert")}}
            onChange={(e) => {
            handleChangeOfData(e);
            setKursende(e.target.value);
            }} />
          </div>
          <div id="providereingabe">
            <label htmlFor="linkProvider">Anbieter:</label>
            {/* <p><a id="linkProvider" target="_blank" href='https://${data[0].linkToProvider}'>{data[0].linkToProvider}</a></p> */}
              <input type= "url"
              id="linkProvider"
              name="linkProvider"
              value={linkProvider}
              //placeholder="Themenfeld"
              onDoubleClickCapture={(e) => 
                {setLinkProvider("");
                setStatusSicherung("ungesichert")}}
              onChange={(e) => {
              handleChangeOfData(e);
              setLinkProvider(e.target.value);
              }} />
          </div>
          <div id="bilderupload">
            <label htmlFor="imageUpload">
              Foto hochladen:
            </label>
              <input
                type="file"
                name="imageUpload"
                id="imageUpload"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setRemoved(false);
                }}
              />
            {file ? (
              <>
                <div>
                  <p>
                    <span id="file">{file.name}</span>
                    <CloseOutlined
                      onClick={() => {
                        setRemoved(true);
                        setFile(null);
                      }}
                    />
                  </p>
                  {/* <label htmlFor="image">
                    Dateien durchsuchen
                  </label> */}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div id="kursactivating">
            <label htmlFor="kursActivated">Kurs aktiv:</label>
            {/* <p id="kursActivated">{data[0].active === true ? "aktiviert" : "nicht aktiv"}</p> */}
            <input type= "checkbox"
            id="kursActivated"
            name="kursActivated"
            checked={kursActivated}
            //placeholder="Themenfeld"
            onChange={(e) => {
            handleChangeOfData(e);
            setKursActivated(e.target.checked);
            }} 
            />
          </div>
          <div id="createdon">
            <label htmlFor="createdOn">Erfasst am:</label>
            {/* <p id="kursActivated">{data[0].active === true ? "aktiviert" : "nicht aktiv"}</p> */}
            <output         
            id="createdOn"
            name="createdOn"
            >{Moment(createdOn).format("DD.MMMM.YYYY")}
            </output>
          </div>
          <div id="updatedon">
            <label htmlFor="updatedOn">Zuletz aktualisiert am:</label>
            {/* <p id="kursActivated">{data[0].active === true ? "aktiviert" : "nicht aktiv"}</p> */}
            <output         
            id="updatedOn"
            name="updatedOn"
            >{Moment(updatedOn).format("DD.MMMM.YYYY")}
            </output>
          </div>
          <div id="updatedby">
            <label htmlFor="updatedBy">Zuletz aktualisiert von:</label>
            {/* <p id="kursActivated">{data[0].active === true ? "aktiviert" : "nicht aktiv"}</p> */}
            <output         
            id="updatedBy"
            name="updatedBy"
            >{updatedBy.firstName} {updatedBy.lastName}
            </output>
          </div>
          <div id="buttonBox">
          {data.length === 1 && <button onClick={() => deleteCourse(courseId)}>Datensatz löschen</button>}
            {statusSicherung === "ungesichert" && <button onClick={updateCourse}>Änderungen speichern</button>}
          </div>
        </div> 
        : 
        <div id="courseEditForm" >Bitte Datensatz suchen und auswählen</div>
        )
      } 
    </main>
  )
  ) : (
    <main id="courseAddForm">

      < FehlendeZugangsrechte />
    </main>)
    //Schlusss Accesslevel
}

export default CourseAddForm
