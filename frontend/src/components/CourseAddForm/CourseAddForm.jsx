import React, { useState, useRef, useContext, useEffect } from "react";
import { Link} from "react-router-dom";
import axiosConfig from "../../util/axiosConfig.js";
import { SectionsContext } from "../../context/SectionsContext.js";
import "./CourseAddForm.scss";
import { CloseOutlined } from "@ant-design/icons";
import Moment from "moment"
import Swal from "sweetalert2";
//import swal from "sweetalert";

const CourseAddForm = () => {
  const { isAuth, setGotoPage } = useContext(SectionsContext);
  const { navigate } = useContext(SectionsContext);

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
  const [kursThema, setKursThema] = useState("");
  const [kursAutor, setKursAutor] = useState([]);
  const [themenfeld, setThemenfeld] = useState("");
  const [kursTyp, setKursTyp] = useState("");
  const [kursInhalt, setKursInhalt] = useState("");
  const [professionalLevel, setProfessionalLevel] = useState("");
  const [kursSprache, setKursSprache] = useState([]);
  const [cpdPoints, setCPDPoints] = useState(0);
  const [additionalCPDPoints, setAdditionalCPDPoints] = useState(0);
  const [linkProvider, setLinkProvider] = useState("");
  const [kursstart, setKursstart] = useState(today);
  const [kursende, setKursende] = useState("");
  const [courseDuration, setCourseSurations] = useState("");
  const [listOfAuthors, setListOfAuthors] = useState([]);
  const [kursActivated, setKursActivated] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [updatedBy, setUpdatedBy] = useState("")
  const [updatedOn, setUpdatedOn] = useState("")
  const [createdOn, setCreatedOn] = useState("")

  const handleWorkingModeSelect = (event) => {
    const { value, checked } = event.target;
    event.target.value === "editMode" && setData([])
    event.target.value === "inputMode" && clearForm()
    setWorkingMode(event.target.value);
    //console.log(workingMode)
  };

  const clearForm = () => {
    setFile(null);
    setKursThema("");
    setKursAutor([]);
    setThemenfeld("");
    setKursTyp("");
    setKursInhalt("");
    setProfessionalLevel("");
    setKursSprache([]);
    setCPDPoints(0);
    setAdditionalCPDPoints(0);
    setLinkProvider("");
    setKursstart(Moment(today).format("YYYY-MM-DD"));
    setKursende("");
    //setDescription("");
    setKursActivated(false);
    setStatusSicherung("gesichert")
  }

  const textArearesizeHandler = (e)=> {
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

  const handleFilter = (e) => {
    const inputValue = e.target.value;
    const filterName = e.target.name;
    // Annahme: Du hast State-Variablen wie 'themenFilter' und 'autorenFilter'.
    // Die Namen der State-Variablen sollten mit den 'name'-Attributen der Input-Elemente übereinstimmen.
    // Du kannst diese direkt verwenden, ohne die if-else Verzweigung.

    filterName === "sucheThema" && setThemenFilter(inputValue)
    filterName === "sucheAutor" && setAutorenFilter(inputValue)
    // Hier kannst du weitere Aktionen basierend auf 'filterName' ausführen, wenn nötig.
    //console.log(themenFilter);
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
    console.log(kursAutor)
    const selectedAuthor = e.target.value;
    if (!kursAutor.includes(selectedAuthor) && selectedAuthor !=="") {
      setKursAutor([...kursAutor, selectedAuthor])
    } else {
      const updatedAuthors = kursAutor.filter((author) => author !== selectedAuthor);
      setKursAutor(updatedAuthors); // Entfernen des Autors aus dem Array
    }
      //e.target.value = "";
      console.log(kursAutor)
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

  const findCourseToReview = async (e) => {
    try {
      const response = await axiosConfig.get("/courses");
      const receivedData = response.data;
      // Filtere die Daten basierend auf dem aktuellen Wert von e.target.value
      //e.target.value ==="no data" && setThemenFilter("xyz")
      const filteredData = receivedData.filter(entry => entry._id.includes(e.target.value)); 
      // Aktualisiere den Zustand mit den gefilterten Themen
      setData(filteredData)
      if (filteredData.length > 0) {
        setKursThema(filteredData[0].courseTopic)
        setKursAutor(filteredData[0].author)
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
      console.log(data)
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
      console.log(kursSprache)
  };

  const validateForm = () => {
    const errors = [];
    // Validierung für das Kurs-Thema
    if (kursThema.trim() === "") {
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
    if (professionalLevel === "" || isNaN(professionalLevel) || professionalLevel < 0 || professionalLevel > 9) {
      errors.push("Bitte den professionellen Kurslevel zwischen 0 und 9 eingeben.");
    }
    /* const dateOfToday = new Date();
    if (new Date(kursstart) < dateOfToday) {
      errors.push("Der Kursstart liegt in der Vergangenheit.");
    } */
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
      courseId: courseId,
      courseTopic: kursThema,
      author: kursAutor,
      topicField: themenfeld,
      courseType: kursTyp,
      courseContent: kursInhalt,
      courseLanguage: kursSprache,
      professionalLevel: professionalLevel,
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
      Swal.fire({
        title: "Das Kursangebot wurde erfolgreich erstellt!",
        text: "Was willst du als nächstes tun?",
        icon: "success",
        showConfirmButton: true,
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: 'Neuer Datensatz',
        cancelButtonText: 'Datensatz anzeigen',
        denyButtonText: 'Formular schließen',
      }).then((result) => {
        if (result.isConfirmed) {
          clearForm()
        } else if (result.isDismissed) {
          /* clearForm() */
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
  const updateCourse = async () => {
    const courseData = {
      courseId: courseId,
      courseTopic: kursThema,
      author: kursAutor,
      topicField: themenfeld,
      courseType: kursTyp,
      courseContent: kursInhalt,
      courseLanguage: kursSprache,
      professionalLevel: professionalLevel,
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
      const response = await axiosConfig.patch('/courses/${id}', courseData); 
      setStatusSicherung("gesichert")
      Swal.fire({
        icon: "success",
        title: "Das Kursangebot wurde erfolgreich korrigiert!",
        text: "Was willst du als nächstes tun?",
        showConfirmButton: true,
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: 'Datensatz anlegen',
        cancelButtonText: 'Zurück zum Datensatz',
        denyButtonText: 'Formular schließen',
      }).then((result) => {
        if (result.isConfirmed) {
          setWorkingMode("inputMode")
          clearForm()
        } else if (result.isDismissed) {
          /* clearForm() */
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
  };
  
  /* const deleteCourse = async (courseId) => {
    try {
      const response = await axiosConfig.delete('/courses/${courseId}', courseId);
    }
  } */

  useEffect(() => {
    setGotoPage("/courseaddpage")
    authorsAvailableList()
    topicsAvailableList()
  }, [themenFilter]);
  
  useEffect(() => {
    if (courseId) {
      // Lade den ausgewählten Kurs
      findCourseToReview({ target: { value: courseId } });
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

  return (
    <main id="courseAddForm">

      <div id="headBox">
        <h2 id="courseHead">Eingabe /Bearbeiten von Kursangeboten</h2>
      </div>
      <div id="boxModusWahl">
          <label>
            <input
              type="radio"
              name="editMode"
              value="editMode"
              checked={workingMode === 'editMode'}
              onChange={handleWorkingModeSelect}
            /> 
            <span style={{ marginLeft: '5px' }}>Anzeigen und Bearbeiten</span>
          </label>
          <label>
            <input
              type="radio"
              name="inputMode"
              value="inputMode"
              checked={workingMode === 'inputMode'}
              onChange={handleWorkingModeSelect}
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
            onChange={handleFilter} 
            id="sucheThema" 
            placeholder="Themensuchfilter" 
            //autoComplete="off"
              />
            </div>
              <select name="themenListe" onChange={findCourseToReview} onClick={findCourseToReview} id="themenListe"> 
              <option value="no data">Keine Auswahl</option>
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
          {statusSicherung === "ungesichert" ? <p id="änderunsgHinweis">Änderungen wurden noch nicht gesichert</p>: null}
          <div id="kursthemaeingabe">
            <label htmlFor="kursThema">Kursthema<sup id="kursThemaSup">*</sup></label>
            <input
              type="text"
              id="kursThema"
              name="kursThema"
              value={kursThema}
              placeholder="Wie lautet das Thema?"
              autoComplete="off"
              autoFocus
              onChange={(e) => {
                setFormErrors({ ...formErrors, kursThema: "" }); // Fehlermeldung zurücksetzen
              handleChangeOfData(e);
              setKursThema(e.target.value);
            }}
              />
              {formErrors.kursThema && <p className="error">{formErrors.kursThema}</p>}
          </div>   
          <div id="autorenauswahl">
            <div>
              <label htmlFor="kursAutor" id="autorenSucheLabel"> Autoren<sup id="autorenSucheSup">*</sup></label>
              <input 
              type="text" 
              name="sucheAutor" 
              value={autorenFilter}
              onChange={handleFilter} 
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
          <div id="kurstypauswahl">
            <label htmlFor="kursTyp">Kurstyp:<sup id="courseTypeSup">*</sup></label>
            <input type= "text"
            id="kursTyp"
            name="kursTyp"
            list="AuswahlKurstyp"
            value={kursTyp}
            placeholder="Kurstyp aussuchen"
            autoComplete="off"
            onChange={(e) => {
              handleChangeOfData(e);
              setKursTyp(e.target.value);
            }} 
            />
            <datalist id="AuswahlKurstyp">
            <option></option>
            <option>Fachartikel</option>
            <option>Fachbuch</option>
            <option>LifeSeminar</option>
            <option>OnlineSeminar</option>
            <option>Workshop</option>
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
              <option>Lichtdesign</option>
              <option>Lichttechnik</option>
              <option>Büropraxis</option>
              <option>Planungspraxis</option>
              <option>Masterplanung</option>
              <option>Berufspraxis</option>
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
              textArearesizeHandler(e)
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
                  <option value="Deutsch"> Deutsch </option>
                  <option value="Englisch"> Englisch </option>
                  <option value="Französisch"> Französisch </option>
                  <option value="Italienisch"> Italienisch </option>
                  <option value="Spanisch"> Spanisch </option>
                  <option value="Chinesisch"> Chinesisch </option>
                </datalist>
                {kursSprache.length >= 1 ? (
                <ul id="sprachListToSave">
                {kursSprache.map((language, index) => (
                  <li key={index} value={language}>
                    {language}
                  </li>
                ))}
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
            list="levelOptionen"
            placeholder="professional Level eingeben"
            onChange={(e) => {
            handleChangeOfData(e);
            setProfessionalLevel(e.target.value);
            }} 
            />
            <datalist id="levelOptionen">
              <option value="0"> beginner </option>
              <option value="1"> student </option>
              <option value="2"> newly qualified Lighting designer </option>
              <option value="3"> junior lighting designer </option>
              <option value="4"> project lighting designer </option>
              <option value="5"> senior lighting designer </option>
              <option value="6"> associate lighting designr </option>
              <option value="7"> principal lighting designer </option>
              <option value="8"> master in lighting design </option>
              <option value="9"> authorised lexpert in ighting design </option>
            </datalist>
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
          <div>
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
          <div>
            <label htmlFor="kursstart">Kursstart:<sup id="kursstartSup">*</sup></label>
            <input type= "date"
            id="kursstart"
            name="kursstart"
            value={Moment(kursstart).format("YYYY-MM-DD")}
            //placeholder="Themenfeld"
            onChange={(e) => {
            handleChangeOfData(e);
            setKursstart(e.target.value);
            }} />
          </div>
          <div>
            <label htmlFor="kursende">Kursende:<sup id="kursendeSup">*</sup></label>
            <input type= "date"
            id="kursende"
            name="kursende"
            value={kursende}
            //placeholder="Themenfeld"
            onChange={(e) => {
            handleChangeOfData(e);
            setKursende(e.target.value);
            }} />
          </div>
          <div>
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
          <div>
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
          <div>
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
          <div>
            <label htmlFor="updatedBy">Eingabe als:</label>
            {/* <p id="kursActivated">{data[0].active === true ? "aktiviert" : "nicht aktiv"}</p> */}
            <output         
            id="updatedBy"
            name="updatedBy"
            >
            {localStorage.getItem("userName")}
            </output>
          </div>
          {statusSicherung === "ungesichert" ? (<div id="buttonBox">
            <button className="buttonBasics" type="submit" value="senden" >senden</button>
            <button className="buttonBasics" type="reset" onClick={clearForm}>reset Daten</button>
          </div>) : <div>Noch keine Daten eingegeben</div>}
        </form> 
        ) : (
          
        data.length === 1 ?
        <div id="themenansicht" className={statusSicherung}>
          { statusSicherung === "ungesichert" ? <p id="änderunsgHinweis">Änderungen wurden noch nicht gesichert</p>: null}
          <div id="kurstiteldefinition">
            <label htmlFor="kursThema">Kursthema</label>
            {/* {data.length === 1 ? <p id="kursThema">{data[0].courseTopic}</p> : <p></p>} */}
            {/* <p id="kursThema">{data[0].courseTopic}</p> */}
            <input
              type="text"
              id="kursThema"
              name="kursThema"
              value={kursThema}
              placeholder="Wie lautet das Thema?"
              autoComplete="off"
              autoFocus
              onDoubleClickCapture={(e) => 
                {setKursThema("")}}
              onChange={(e) => {
                setFormErrors({ ...formErrors, kursThema: "" }); // Fehlermeldung zurücksetzen
                handleChangeOfData(e);
                setKursThema(e.target.value);
            }}
              /> 
              {formErrors.kursThema && <p className="error">{formErrors.kursThema}</p>}
          </div>
          <div id="autorenauswahl">
              <div>
                <label htmlFor="kursAutor" id="autorenSucheLabel"> Autoren</label>
                <input 
                type="text" 
                name="sucheAutor" 
                value={autorenFilter}
                onChange={handleFilter} 
                id="sucheAutor" 
                placeholder="Suchfilter" 
                autoComplete="off"
                multiple 
                />
              </div>              
            <div>   
            
            {<select name="kursAutor" onClick={updateAuthorsList} id="kursAutor" multiple>
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
              {setKursTyp("")}}
            onChange={(e) => {
              handleChangeOfData(e);
              setKursTyp(e.target.value);
            }} 
            />
            <datalist id="AuswahlKurstyp">
            <option></option>
            <option>Fachartikel</option>
            <option>Fachbuch</option>
            <option>LifeSeminar</option>
            <option>OnlineSeminar</option>
            <option>Workshop</option>
            </datalist>
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
              {setThemenfeld("")}}
            onChange={(e) => {
              handleChangeOfData(e);
              setThemenfeld(e.target.value);
            }} 
            />
            <datalist id="auswahlThemenfeld">
              <option>Lichtdesign</option>
              <option>Lichttechnik</option>
              <option>Büropraxis</option>
              <option>Planungspraxis</option>
              <option>Masterplanung</option>
              <option>Berufspraxis</option>
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
              /* onDoubleClickCapture={(e) => 
                {setKursInhalt("")}} */
              onChange={(e) => {
              handleChangeOfData(e);
              textArearesizeHandler(e)
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
                  onChange={updateLanguageList}
                  id="kursSprache" 
                  placeholder={kursSprache.length > 0 ? "Sprachen ergänzen oder löschen" : "Sprache auswählen"}
                  multiple>
                  </input>
                  <datalist id="sprachOptionen">
                    <option value="Deutsch"> Deutsch </option>
                    <option value="Englisch"> Englisch </option>
                    <option value="Französisch"> Französisch </option>
                    <option value="Italienisch"> Italienisch </option>
                    <option value="Spanisch"> Spanisch </option>
                    <option value="Chinesisch"> Chinesisch </option>
                  </datalist>
                  {kursSprache.length >= 1 ? (
                  <ul id="sprachListToSave">
                  {kursSprache.map((language, index) => (
                    <li key={index} value={language}>
                      {language}
                    </li>
                  ))}
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
            {/* <p id="professionalLevel">{data[0].professionalLevel}</p> */}
            <input type= "text"
            id="professionalLevel"
            name="professionalLevel"
            value={professionalLevel}
            list="levelOptionen"
            placeholder="professional Level eingeben"
            onDoubleClickCapture={(e) => 
              {setProfessionalLevel("")}}
            onChange={(e) => {
            /* handleChangeOfData(e); */
            setProfessionalLevel(e.target.value);
            }} 
            /> 
            <datalist id="levelOptionen">
              <option value="0"> beginner </option>
              <option value="1"> student </option>
              <option value="2"> newly qualified Lighting designer </option>
              <option value="3"> junior lighting designer </option>
              <option value="4"> project lighting designer </option>
              <option value="5"> senior lighting designer </option>
              <option value="6"> associate lighting designr </option>
              <option value="7"> principal lighting designer </option>
              <option value="8"> master in lighting design </option>
              <option value="9"> authorised lexpert in ighting design </option>
            </datalist>
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
              {setCPDPoints("")}}
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
              {setAdditionalCPDPoints("")}}
            onChange={(e) => {
            handleChangeOfData(e);
            e.target.value<0 ? setAdditionalCPDPoints(0) : setAdditionalCPDPoints(e.target.value);
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
              {setKursstart("")}}
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
              {setKursende("")}}
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
                {setLinkProvider("")}}
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
          <div>
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
          <div>
            <label htmlFor="createdOn">Erfasst am:</label>
            {/* <p id="kursActivated">{data[0].active === true ? "aktiviert" : "nicht aktiv"}</p> */}
            <output         
            id="createdOn"
            name="createdOn"
            >{Moment(createdOn).format("DD.MM.YYYY")}
            </output>
          </div>
          <div>
            <label htmlFor="updatedOn">Zuletz aktualisiert am:</label>
            {/* <p id="kursActivated">{data[0].active === true ? "aktiviert" : "nicht aktiv"}</p> */}
            <output         
            id="updatedOn"
            name="updatedOn"
            >{Moment(updatedOn).format("DD.MM.YYYY")}
            </output>
          </div>
          <div>
            <label htmlFor="updatedBy">Zuletz aktualisiert von:</label>
            {/* <p id="kursActivated">{data[0].active === true ? "aktiviert" : "nicht aktiv"}</p> */}
            <output         
            id="updatedBy"
            name="updatedBy"
            >{updatedBy.firstName} {updatedBy.lastName}
            </output>
          </div>
          <div id="buttonBox">
            {/* <button onClick={deleteCourse(courseId)}>Datensatz löschen</button> */}
            <button onClick={updateCourse}>Änderungen speichern</button>
          </div>
        </div> 
        : 
        <div id="themenansicht" >Bitte Datensatz suchen und auswählen</div>
        )
      } 
    </main>
  )
}

export default CourseAddForm