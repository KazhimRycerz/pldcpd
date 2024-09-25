import React, { useState, useRef, useContext, useEffect } from "react";
//import { Link} from "react-router-dom";
import axiosConfig from "../../util/axiosConfig.js";
import { SectionsContext } from "../../context/SectionsContext.js";
import "./CourseForm.scss";
import { CloseOutlined, EditOutlined, SaveOutlined, StopOutlined, StepBackwardOutlined, StepForwardOutlined  } from "@ant-design/icons";
import { Modal, Button } from 'antd';
import Moment from "moment"
import Swal from "sweetalert2";
import { ListOfCourseTypes, ListOfLanguages, ListOfTopicFields, ListOfLevel } from "../ListsOfData/ListOfData.jsx";
import { FehlendeZugangsrechte } from "../FehlermeldungenSwal/FehlermeldungenSwal.jsx"
import { ImagesUploadModal } from '../../modals/ImageUpload/ImageUploadModal.jsx'
//import swal from "sweetalert";


const CourseAddForm = () => {
  const { isAuth, setGotoPage, userData, userMode, setUserMode, accessRights, navigate} = useContext(SectionsContext);
  
  const [workingMode, setWorkingMode] = useState("inputMode")
  const [formErrors, setFormErrors] = useState({})
  const [data, setData] = useState([])
  const [autorenFilter, setAutorenFilter] = useState('')
  const [themenFilter, setThemenFilter] = useState('')
  const [themenListe, setThemenListe] = useState([])
  const [statusSicherung, setStatusSicherung] = useState("gesichert")
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [filteredTopics, setFilteredTopics] = useState(ListOfTopicFields);
  const [filteredCourseTypes, setFilteredCourseTypes] = useState([ListOfCourseTypes]);
  const [filteredLanguages, setFilteredLanguages] = useState(ListOfLanguages);
  const [inputValue, setInputValue] = useState('');

  //const isFormDisabled = data.length === 0;
  const [isTopicFieldFocused, setIsTopicFieldFocused] = useState(false);
  const [isLanguageFocused, setIsLanguageFocused] = useState(false);
  const [isAuthorFocused, setIsAuthorFocused] = useState(false);
  const [isCourseTypeFocused, setIsCourseTypeFocused] = useState(false);
  const [isLevelFocused, setIsLevelFocused] = useState(false);

  const [file, setFile] = useState(null);
  const [removed, setRemoved] = useState(false);
  const [courseTopic, setCourseTopic] = useState("");
  const [kursAutor, setKursAutor] = useState([]);
  const [bookingNo, setBookingNo] = useState("")
  const [topicField, setTopicField] = useState("");
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
  const [courseDuration, setCourseDuration] = useState(null);
  const [listOfAuthors, setListOfAuthors] = useState([]);
  const [kursActivated, setKursActivated] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [updatedBy, setUpdatedBy] = useState("")
  const [updatedOn, setUpdatedOn] = useState("")
  const [createdOn, setCreatedOn] = useState("")
  const [courseImages, setCourseImages] = useState([])
  /* const courseTypes = ListOfCourseTypes()*/
  //console.log(ListOfLevel) 

// maniging die Seiten der Themenliste:
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10)
  /* const handleThemenclick = (item) => {
      getCourseToReview({ target: { value: item._id } });
      setStatusSicherung("gesichert");
      setIsModalVisible(false);
  }; */
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Zurücksetzen auf die erste Seite bei Änderung der Items pro Seite
};
  const totalItems = themenListe.length;
  const itemsPerPageValue = itemsPerPage === 0 ? totalItems : itemsPerPage; // Wenn "alle" ausgewählt ist
  const totalPages = Math.ceil(totalItems / itemsPerPageValue);
  const startIndex = (currentPage - 1) * itemsPerPageValue;
    const endIndex = Math.min(startIndex + itemsPerPageValue, totalItems);
  const currentItems = themenListe.slice(startIndex, endIndex);
  // Erzeuge Platzhalter für leere Zeilen, falls weniger als itemsPerPage Elemente vorhanden sind
  const placeholders = Array(itemsPerPageValue - currentItems.length).fill(null);


  const [isModalVisible, setIsModalVisible] = useState(false);
  /* const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  }; */
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getDiscriptionForValue = (value) => {
    const level = ListOfLevel.find(level => level.value === parseInt(value, 10));
    return level ? level.discription : '';
  };

  // Nicht mehr notwendig, weil anders aufgebaut
  const workingModeSelect = (e) => {
    const { value, checked } = e.target;
    e.target.value === "editMode" && 
    clearForm()
    //setData([])
    setIsModalVisible(true)
    e.target.value === "inputMode" && clearForm()
    setWorkingMode(e.target.value);
    setIsModalVisible(false)
    setStatusSicherung("gesichert")
  };

  const clearForm = () => {
    setFile(null);
    setCourseTopic("");
    setKursAutor([]);
    setBookingNo("")
    setTopicField("");
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
    setCourseDuration(null)
    //setDescription("");
    setKursActivated(false);
    setData([])
    setStatusSicherung("gesichert");
    setWorkingMode("inputMode")
    if (workingMode === "editMode") {
      const themenListeElement = document.getElementById("themenListe");
      if (themenListeElement) {
        themenListeElement.value = "no data";
      }
    }
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

  const handleChangeOfData = (e) => {
    const { name, value, checked, type } = e.target;
    setStatusSicherung("ungesichert")
    setWorkingMode("inputMode")
  };

  //Funktion nicht mehr notwendig:
  const handleChangeOfTopicFieldData = (e) => {
    const value = e.target.value;
    setTopicField(value);
    setFilteredTopics(ListOfTopicFields.filter(topic =>
      topic.toLowerCase().includes(value.toLowerCase())
    ));
  };
   //Funktion nicht mehr notwendig:
  const handleChangeOfCourseTypeData = (e) => {
    const value = e.target.value;
    setKursTyp(value);
    setFilteredCourseTypes(ListOfCourseTypes.filter(courseType =>
      courseType.toLowerCase().includes(value.toLowerCase())
    ));
  };
  const handleSelectTopic = (topic) => {
    setTopicField(topic);
    setFilteredTopics(ListOfTopicFields); // Reset the filtered topics to show the full list
    setIsTopicFieldFocused(false); // Close the dropdown after selection
    setStatusSicherung("ungesichert")
  };

  const handleSelectLevel = (level) => {
    setProfessionalLevel(level);
    
    setIsLevelFocused(false); // Close the dropdown after selection
    setStatusSicherung("ungesichert")
  };

  const handleSelectCourseType = (selectedType) => {
    setKursTyp(selectedType);
    //setFilteredCourseTypes(ListOfTopicFields); // Reset the filtered topics to show the full list
    setIsCourseTypeFocused(false); // Close the dropdown after selection
    setStatusSicherung("ungesichert")
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
      //console.log(listOfAuthors)
    } catch (error) {
      !listOfAuthors && Swal.fire({
        title: "Keine Autoren gefunden",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  }
  const authorsFilter = (input) => {
    //console.log(input)
    return listOfAuthors.filter((author) =>
      author.Name.toLowerCase().includes(input.toLowerCase())
    );
  };

  const updateAuthorsList = (authorId) => {
    // Hier kannst du den Wert aus dem Eingabefeld hinzufügen oder entfernen
    const selectedAuthor = authorId;
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
  
      // Filter the data based on the current value of the filter
      const filteredData = receivedData.filter(entry =>
        entry.courseTopic.toLowerCase().includes(themenFilter.toLowerCase())
      );
  
      // Create an array of objects with _id and Thema from the filtered data
      const themenArray = filteredData.map(entry => ({
        _id: entry._id,
        Thema: `${entry.courseTopic} - ${entry.courseType}`
      }));

      const sortedThemenListe = [...themenArray].sort((a, b) =>
        a.Thema.localeCompare(b.Thema)
      );

      // Update the state with the sorted topics
      setThemenListe(sortedThemenListe);
    } catch (error) {
      // Handle the error, for example, with a notification
      Swal.fire({
        title: "Error fetching topics",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };
  
  const displayCourse = (data) => {
    setData(data)
    if (data)
    {setCourseTopic(data.courseTopic);
    setKursAutor(data.author);
    setBookingNo(data.bookingNo)
    setKursTyp(data.courseType);
    setTopicField(data.topicField)
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
    setCourseImages(data.courseImages)
    console.log(courseImages)
  }

  /* const getCourseImageList = async (courseID)=>{
    const courseId = courseID;
    try {
       const response = await axiosConfig.get(`/user/userimages/${userId}`); // Hier den entsprechenden Endpunkt einsetzen
       const images = response.data; // Annahme: Das Backend sendet ein Array von Bildern als Antwort
       setCourseImages(images);
       //console.log('Bilder:', {images});
       return images;
    } catch (error) {
       console.error('Fehler beim Abrufen der Bilder:', error);
       return null;
    }
    }
  
    useEffect(() => {
      getCourseImageList();
  }, []); */

  const getCourseToReview = async (e) => {
    if (e.target.value === "no data") {clearForm()}
    try {
      const response = await axiosConfig.get("/courses");
      const receivedData = response.data;
      // Filtere die Daten basierend auf dem aktuellen Wert von e.target.value
      //e.target.value ==="no data" && setThemenFilter("xyz")
      const filteredData = receivedData.filter(entry => entry._id.includes(e.target.value)); 
      // Aktualisiere den Zustand mit den gefilterten Themen
      setData(filteredData)
      //console.log(data)
      //setStatusSicherung("ungesichert")
      if (filteredData.length > 0) {
        setCourseTopic(filteredData[0].courseTopic);
        setKursAutor(filteredData[0].author);
        setBookingNo(filteredData[0].bookingNo);
        setKursTyp(filteredData[0].courseType);
        setTopicField(filteredData[0].topicField)
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

  /* const updateLanguageList = (e) => {
    const addLanguage = e.target.value;
    if (!kursSprache.includes(addLanguage)) {
      setKursSprache([...kursSprache, addLanguage]);
      // Hinzufügen der Sprache zum Array
    } else {
      const updatedSprache = kursSprache.filter((sprache) => sprache !== addLanguage);// Entfernen des Autors aus dem Array
      setKursSprache(updatedSprache);
    }
      e.target.value = "";
  }; */

  /* const updateLanguageList = (e) => {
    const addLanguage = e.target.value;
    if (addLanguage && !kursSprache.includes(addLanguage)) {
      setKursSprache([...kursSprache, addLanguage]);
    } else if (addLanguage) {
      const updatedSprache = kursSprache.filter(sprache => sprache !== addLanguage);
      setKursSprache(updatedSprache);
    }
    setInputValue(''); // Clear the input field
  }; */

  const handleSelectLanguage = (language) => {
    if (kursSprache.includes(language)) {
      setKursSprache(kursSprache.filter(sprache => sprache !== language));
    } else {
      setKursSprache([...kursSprache, language]);
      setStatusSicherung("ungesichert")
    }
    setInputValue(''); // Clear the input after selection
    //setIsLanguageFocused(false); // Close the dropdown after selection
    setStatusSicherung("ungesichert")
  };

  const handleRemoveLanguage = (language) => {
    setKursSprache(kursSprache.filter(item => item !== language));
    setStatusSicherung("ungesichert")

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
        // Führe die Aktionen aus, wenn das Formular gültig ist
        // ...
        /* const formData = new FormData(e.target);
        //console.debug(eventCategory);
        let imgToSave;
        if (removed || !file) {
        imgToSave = null;
      } else {
        imgToSave = courseData.get("imageUpload");
      } */
        
      const courseData = {
        //courseId,
        courseTopic,
        author: kursAutor,
        bookingNo,
        topicField,
        courseType: kursTyp,
        courseContent: kursInhalt,
        courseLanguage: kursSprache,
        professionalLevel,
        cpdBasicPoints: cpdPoints,
        cpdAdditionalPoints: additionalCPDPoints,
        startDateOfCourse: kursstart,
        endDateOfCourse: kursende,
        linkToProvider: linkProvider,
        //courseImage: file,
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
        setWorkingMode("inputMode")
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
        topicField,
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
        /* setData(response) */
        Swal.fire({
          icon: "success",
          title: "Das Kursangebot wurde erfolgreich korrigiert!",
          text: "Was willst du als nächstes tun?",
          showConfirmButton: true,
          showCancelButton: true,
          showDenyButton: true,
          //showFourthButton: true,
          confirmButtonText: 'Datensatz anlegen',
          cancelButtonText: 'Hinweis schließen',
          denyButtonText: 'Formular schließen',
          //fourthButtonText: 'Datensatz bearbeiten',
          timer: 5000,
        }).then((result) => {
          if (result.isConfirmed) {
            clearForm()
            setWorkingMode("inputMode")
          } /* else if (result.isFourth) {
            clearForm()
            setWorkingMode("editMode")
          } */ else if (result.isDismissed) {
            //getCourseToReview()
            setUpdatedOn(today)
            setWorkingMode("inputMode")
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
            clearForm()
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

  
  return (
    <>
      {isAuth && [5, 10, 9].some(right => accessRights.includes(right)) 
      ? 
      (<main id="courseForm">
          <div className="headBox">
            <h2 id="courseHead">Eingabe / Bearbeiten von Kursangeboten</h2>
            <p className="closingFunction" onClick={() => navigate("/home")}>Formular schließen</p>
          </div>

         <div id="courseFormContainer" className={statusSicherung} >
          <p id="änderungsHinweis">
          {/* {(data.length > 0 && statusSicherung === "ungesichert") 
            ? "ACHTUNG: Änderungen wurden noch nicht gesichert"
            : "Bitte Daten eingegeben"} */}
            {(data.length === 0)?"Bitte Daten eingegeben":""}
            {(data.length > 0 && statusSicherung === "gesichert")?"Daten sind unverändert":""}
            {(data.length > 0 && statusSicherung === "ungesichert")?"ACHTUNG: Änderungen wurden noch nicht gesichert":""}
          </p>
          
          {/* <div id="boxModusWahl">
          {['inputMode', 'editMode'].map(mode => (
            <label key={mode}>
              <inp
                type="radio"
                name="workingMode"
                value={mode}
                checked={workingMode === mode}
                onChange={workingModeSelect}
                style={{ display: "none" }}
              />
              <span className="pFunction">
                {mode === 'inputMode' ? 'neuen Kurs erfassen' : 'Kurs anzeigen und bearbeiten'}
              </span>
            </label>
          ))}
          </div> */}
          <div id="boxModusWahl">
            
              {/* <label key="inputMode">
                <input
                  type="radio"
                  name="workingMode"
                  value="inputMode"
                  checked={workingMode === "inputMode"}
                  onChange={() => {
                    setIsModalVisible(false);
                    setWorkingMode("inputMode");
                  }}
                  style={{ display: "none" }}
                />
                <span className="pFunction">
                  neuen Kurs erfassen
                </span>
              </label> */}
            
            {workingMode === 'inputMode' && (
              <label key="editMode">
                <input
                  type="radio"
                  name="workingMode"
                  value="editMode"
                  checked={workingMode === "editMode"}
                  onChange={() => {
                    //clearForm();
                    setIsModalVisible(true);
                    
                  }}
                  style={{ display: "none" }}
                />
                <span className="pFunction">
                  Kurs finden / bearbeiten
                </span>
              </label>
            )}
          </div>

          <Modal id="themensucherModal"
          title="Kurs finden"
          open={isModalVisible}
          //onOk={handleOk}
          onCancel={handleCancel}
          footer={
            <Button 
            key="back" 
            className="pFunction buttonBasics"
            id="backButtonKursFinden"
            onClick={handleCancel}>
              abbrechen
            </Button>
          }
          >
            <div id="themensuche">
              <div>
                <label 
                htmlFor="sucheThema" 
                id="themenFilterLabel"
                > Themenfilter: 
                </label>
                <input 
                type="text" 
                name="sucheThema" 
                autoComplete="off"
                value={themenFilter}
                onDoubleClickCapture={(e) => 
                  {setThemenFilter("")}}
                /* onChange={handleFilter} */ 
                onChange={(e) =>
                  {setThemenFilter(e.target.value)}} 
                id="sucheThema" 
                placeholder="Themenfilter" 
                //autoComplete="off"
                  />
              </div>
              <ul id="themenListe"
              style={{listStyleType: "none", width:"100%"}}>
                {themenListe.length > 0 ? (
                  <>
                    <li
                    onClick={() => {
                      getCourseToReview({ target: { value: "no data" } });
                      setStatusSicherung("gesichert");
                      setIsModalVisible(false);
                    }}
                    value="no data"
                    style={{cursor: "pointer", borderBottom: "none"}}
                    >
                      bitte auswählen / Formular leeren 
                    </li>
                    {currentItems.map((item, index) => (
                      <li key={index}
                      onClick={() => {
                        getCourseToReview({ target: { value: item._id } });
                        setStatusSicherung("gesichert");
                        setIsModalVisible(false);
                      }}
                      value={item._id}
                      >
                        {item.Thema}
                      </li>
                    ))}
                    {placeholders.map((_, index) => (
                      <li key={`placeholder-${index}`} className="placeholder">
                          {/* Leerer Platzhalter */}
                      </li>
                  ))}
                    <div>
                        <p>gefundene Themen: {totalItems}</p>
                      <p>Seite {currentPage} von {totalPages}</p>
                      {/* <p>gefilterte Themen: {currentItems.length} von {totalItems} insgesamt</p> */}
                      <p>Kurs {startIndex+1} bis  {endIndex}</p> 
                    </div>
                    <div id="listeFooter">
                      <label
                      htmlFor="itemsPerPage">
                        Items pro Seite:
                      </label>
                      <select 
                      id="itemsPerPage"
                      value={itemsPerPage} 
                      onChange={handleItemsPerPageChange}>
                      {[5, 10, 15, 20, 0].map((num) => (
                              <option key={num} value={num}>
                                  {num === 0 ? "alle" : num}
                              </option>
                          ))}
                      </select>
                      <div id="movePages">
                          <StepBackwardOutlined 
                              onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                              disabled={currentPage === 1}
                          >  
                          </StepBackwardOutlined>
                          <StepForwardOutlined 
                              onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
                              disabled={currentPage === totalPages}
                          >
                          </StepForwardOutlined>
                      </div>
                    </div>
                  </>
                  
                ) : (
                  <li
                    value="no data"
                  >
                  kein Treffer - bitte Filter verändern 
                  </li>
                )}
              </ul>
  
            </div>
          </Modal>

          <form id="courseDisplayForm" 
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          >
            <div id="kursthemaeingabe" >
              <label htmlFor="courseTopic">Kursthema</label>
              <input
              type="text"
              id="courseTopic"
              name="courseTopic"
              value={courseTopic}
              placeholder="Wie lautet das Thema?"
              autoComplete="off"
              //autoFocus
              //disabled={isFormDisabled}
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
            
            <div id="autorenauswahl" 
            style={{ position: 'relative' }}>
              <label htmlFor="kursAutor" id="autorenSucheLabel"> Autoren:<sup id="autorenSucheSup">*</sup>
              </label>
            {isAuthorFocused /* && autorenFilter.length > 0 */ &&
              <div
              id="autorenInput"
              style={{ position: 'absolute' }}
              onMouseLeave={() => setIsAuthorFocused(false)}
              >
                <input 
                type="text" 
                id="sucheAutor" 
                name="sucheAutor" 
                value={autorenFilter}
                placeholder="Suchfilter" 
                autoComplete="off"
                multiple 
                onChange={(e) => {setAutorenFilter(e.target.value)}}
                />
                <ul
                  id="auswahlAuthors" 
                >
                  {authorsFilter(autorenFilter)
                  /* .slice(0,10) */
                  .map((item, index) => (
                    <li 
                    key={index} 
                    onClick={() => updateAuthorsList(item._id)} // Passing item._id as an argument
                    >
                    {item.Name} 
                    </li>
                  ))}
                {autorenFilter.length > 0 &&
                <li style={{cursor:"auto", width:"200px"}}>Bitte Filter erweitern</li>
                }
                </ul> 
              </div>             
            }
              <div id="listOfSelectedAuthors">
                {kursAutor.length > 0 ? (
                  <ul id="authorsListToSave">
                    {kursAutor.map((authorId) => {
                      const author = listOfAuthors.find(author => author._id === authorId);
                      return (
                        author?.Name && (
                          <li 
                            key={authorId} 
                            value={authorId}
                            onClick={() => updateAuthorsList(authorId)}
                          >
                            {author.Name}
                          </li>
                        )
                      );
                    })}
                  </ul>
                ) : (
                  <ul id="authorsListToSave">
                    <li onClick={() => {
                    setIsAuthorFocused(true);
                  }}>Auswahl ist leer</li>
                  </ul>
                )}

                {isAuthorFocused === false ? 
                  (<EditOutlined
                    className="edit-icon"
                    onClick={() => {
                      setIsAuthorFocused(true);
                    }}
                  />
                ) : (
                  <StopOutlined
                    className="edit-icon"
                    onClick={() => {
                      setIsAuthorFocused(false);
                    }}
                  />)
                }
              </div>
            </div>







            <div id="kursnummer">
              <label htmlFor="bookingNo">KursCode:</label>
              <input
                  type="text"
                  id="bookingNo"
                  name="bookingNo"
                  value={bookingNo}
                  placeholder="KursCode"
                  autoComplete="off"
                  //autoFocus
                  onDoubleClickCapture={(e) => 
                    {setBookingNo("")}}
                  onChange={(e) => {
                    setFormErrors({ ...formErrors, bookingNo: "" }); // Fehlermeldung zurücksetzen
                    handleChangeOfData(e);
                    setBookingNo(e.target.value);
                }}
              />
            </div>          
            <div id="kurstypauswahl" 
            style={{ position: 'relative' }}>
              <label htmlFor="kursTyp">Kurstyp:
                <sup id="courseTypeSup">*</sup>
              </label>
              <div
              id="kursTypInput"
              style={{ position: 'relative' }}
              onMouseLeave={() => setIsCourseTypeFocused(false)}
              >
                <input 
                  type="text"
                  id="kursTyp"
                  name="kursTyp"
                  value={kursTyp}
                  placeholder="Kurstyp auswählen"
                  autoComplete="off"
                  readOnly
                  onClick={() => setIsCourseTypeFocused(true)}
                />
                {isCourseTypeFocused && (
                  <ListOfCourseTypes onSelectCourseType={handleSelectCourseType} 
                  />
                )}
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
                )}
              </div>
            </div>
            <div id="topicFieldAuswahl">
              <label htmlFor="topicField">Themenfeld:</label>
              <div 
              id="themenfeldInput"
              style={{ position: 'relative' }}>
                <input 
                type="text"
                id="topicField"
                name="topicField"
                value={topicField}
                placeholder="Themenfeld aussuchen"
                autoComplete="off"
                onClick={() => {
                  setIsTopicFieldFocused(true);
                }}
                onChange={(e) => {
                  handleChangeOfTopicFieldData(e);
                }}
                />
                {isTopicFieldFocused && filteredTopics.length > 0 && (
                  <ul 
                    id="auswahlTopicField" 
                    onMouseLeave={() => setIsTopicFieldFocused(false)}
                  >
                    {filteredTopics.map((topic, index) => (
                      <li 
                      key={index} 
                      onClick={() => handleSelectTopic(topic)} 
                      style={{ cursor: 'pointer', padding: '5px', borderBottom: '1px solid #ddd' }}
                      >
                        {topic}
                      </li>
                    ))}
                  </ul>
                )}
                {isTopicFieldFocused === false ? 
                (<EditOutlined
                  className="edit-icon"
                  onClick={() => {
                    setIsTopicFieldFocused(true);
                  }}
                />) :
                (<StopOutlined
                  className="edit-icon"
                  onClick={() => {
                    setIsTopicFieldFocused(false);
                  }}
                />)
                }
              </div>
            </div>
            <div id="kursinhalteingabe">
              <label htmlFor="kursInhalt">Kursinhalt:</label>
              {/* <p id="kursInhalt" style={{height:"fit-content"}}>{data[0].courseContent}</p> */}
              <textarea 
                id="kursInhalt"
                name="kursInhalt"
                value={kursInhalt}
                placeholder="Kursinhalt"
                onLoad={(e)=>{
                  textAreaResizeHandler(e)
                }}
                onDoubleClickCapture={(e) => {
                  setStatusSicherung("ungesichert")
                  textAreaResizeHandler(e)
                }}
                onChange={(e) => {
                  handleChangeOfData(e);
                  textAreaResizeHandler(e)
                  setKursInhalt(e.target.value);
                }} 
              />
            </div>
            <div id="courseImages">
              <label htmlFor="file">Kursbilder:</label>
              <div id="imagesContainer">
                <div id="imageBox"></div>
                <ImagesUploadModal id="test"setImages={setFile} />
              </div>
            </div>
            <div id="sprachauswahl">
                <label htmlFor="kursSprache">Sprache:</label>
                <div 
                  id="spracheInput"
                  style={{ position: 'relative' }}>
                    {isLanguageFocused && filteredLanguages.length > 0 && (
                  <ul 
                    id="sprachOptionen" 
                    onMouseLeave={() => setIsLanguageFocused(false)}
                    /* className="dropdown" */
                  >
                    {filteredLanguages.map((language, index) => (
                      <li 
                        key={index} 
                        onClick={() => {handleSelectLanguage(language);  setStatusSicherung("ungesichert")}} 
                        style={{ cursor: 'pointer', padding: '5px', borderBottom: '1px solid #ddd' }}
                      >
                        {language}
                      </li>
                    ))}
                  </ul>
                )}
                {kursSprache.length > 0 ? (
                  <ul 
                  id="sprachListToSave"
                  onClick={() => setIsLanguageFocused(true)}
                  onBlur={() => setTimeout(() => setIsLanguageFocused(false), 200)}
                  >
                    {kursSprache.map((language, index) => (
                      <li 
                      id="listOfLanguage"
                      key={index} onClick={() => handleRemoveLanguage(language)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor:'pointer' }}>
                        {language}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul id="sprachListToSave"
                  onClick={() => setIsLanguageFocused(true)}
                  onBlur={() => setTimeout(() => setIsLanguageFocused(false), 200)}
                  >
                    <li 
                    id="listOfLanguage"
                    onClick={() => setIsLanguageFocused(true)}
                    onBlur={() => setTimeout(() => setIsLanguageFocused(false), 200)}
                    >zeige Liste</li>
                  </ul>
                )}
                {isLanguageFocused === false ? 
                (<EditOutlined
                  className="edit-icon"
                  onClick={() => {
                    setIsLanguageFocused(true);
                  }}
                />) :
                (<StopOutlined
                  className="edit-icon"
                  onClick={() => {
                    setIsLanguageFocused(false);
                  }}
                />)
                }
              </div>
            </div>
            <div id="professionallevelauswahl">
              <label htmlFor="professionalLevel">Professional Level:<sup id="professionalLevelSup">*</sup></label>
              <div 
              id="levelInput"
              style={{ position: 'relative' }}
              >
                <input 
                type= "text"
                readOnly
                id="professionalLevel"
                name="professionalLevel"
                value={getDiscriptionForValue(professionalLevel)}
                //list="levelOptions"
                placeholder="professional Level"
                //onClick={() => setIsLevelFocused(true)}
                onChange={(e) => {
                handleChangeOfData(e);
                setProfessionalLevel(e.target.value);
                }}
                />
                
                {isLevelFocused && (
                  <ul 
                    id="auswahlLevel" 
                    onMouseLeave={() => setIsLevelFocused(false)}
                  >
                    {ListOfLevel.map((level, index) => (
                      <li 
                      key={index} 
                      onClick={() => handleSelectLevel(level.value)} 
                      style={{ cursor: 'pointer', padding: '5px', borderBottom: '1px solid #ddd' }}
                      >
                        {level.value} {level.discription}
                      </li>
                    ))}
                  </ul>
                )}
                {isLevelFocused ? (
                  <StopOutlined
                    className="edit-icon"
                    onClick={() => setIsLevelFocused(false)}
                  />
                ) : (
                  <EditOutlined
                    className="edit-icon"
                    onClick={() => setIsLevelFocused(true)}
                  />
                )}
              </div>
            </div>
            <div id="cpdBasicPointsAuswahl">
              <label htmlFor="cpdBasicPoints">CPDPoints:</label>
              <input type= "number"
              id="cpdBasicPoints"
              name="cpdBasicPoints"
              value={cpdPoints}
              /* onDoubleClickCapture={(e) => 
                {setCPDPoints("");
                setStatusSicherung("ungesichert")}} */
              onChange={(e) => {
              handleChangeOfData(e);
              setCPDPoints(e.target.value);
              e.target.value<0 ? setCPDPoints(0) : setCPDPoints(e.target.value);
              }} />
            </div>
            <div id="cpdAdditionalPointsAuswahl">
              <label htmlFor="cpdAdditionalPoints">Bonus CPDPoints:</label>
              
              <input type= "number"
              id="cpdAdditionalPoints"
              name="cpdAdditionalPoints"
              value={additionalCPDPoints}
              /* onDoubleClickCapture={(e) => 
                { setAdditionalCPDPoints("");
                setStatusSicherung("ungesichert")}} */
              onChange={(e) => {
              handleChangeOfData(e);
              e.target.value<0 ? setAdditionalCPDPoints(0) : setAdditionalCPDPoints(e.target.value);
              }} />
            </div>
            <div id="minTeilnehmer">
              <label htmlFor="minTeilnehmer">Mindestanzahl Teilnehmer:</label>
              <input type= "number"
              id="minTeilnehmer"
              name="minTeilnehmer"
              value={minTeilnehmer}
              /* onDoubleClickCapture={(e) => 
                { setMinTeilnehmer("");
                setStatusSicherung("ungesichert")}} */
              onChange={(e) => {
              handleChangeOfData(e);
              setMinTeilnehmer(e.target.value);
              }} />
            </div>
            <div id="maxTeilnehmer">
              <label htmlFor="maxTeilnehmer">Maximalanzahl Teilnehmer:</label>
              <input type= "number"
              id="maxTeilnehmer"
              name="maxTeilnehmer"
              value={maxTeilnehmer}
              /* onDoubleClickCapture={(e) => 
                { setMaxTeilnehmer("");
                setStatusSicherung("ungesichert")}} */
              onChange={(e) => {
              handleChangeOfData(e);
              setMaxTeilnehmer(e.target.value);
              }} />
            </div>
            <div id="kursstartdefinition">
              <label htmlFor="kursstart">Kursstart:</label>
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
            <div id="kursactivated">
              <label htmlFor="kursActivated">Kurs aktiv:</label>
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
              <output         
              id="createdOn"
              name="createdOn"
              value={Moment(createdOn).format("DD.MMMM.YYYY")}
              >{Moment(createdOn).format("DD.MMMM.YYYY")}
              </output>
            </div>
            <div id="updatedon">
              <label htmlFor="updatedOn">Zuletzt aktualisiert am:</label>
              
              <output         
              id="updatedOn"
              name="updatedOn"
              >{Moment(updatedOn).format("DD.MMMM.YYYY")}
              </output>
            </div>
            <div id="updatedby">
              <label htmlFor="updatedBy">Zuletzt aktualisiert von:</label>
              <output         
              id="updatedBy"
              name="updatedBy"
              >{updatedBy.firstName} {updatedBy.lastName}
              </output>
            </div>
          </form> 

          <div id="buttonBox">
            {data.length > 0 && 
            <button type="button" className="buttonBasics pFunction" onClick={() => deleteCourse(data[0]._id)} disabled={(data.length < 1)}>löschen</button>}

            {(data.length > 0 && statusSicherung === "ungesichert" && workingMode === "inputMode") && <button type="button" className="buttonBasics pFunction" onClick={updateCourse} disabled={(data.length < 1)}>speichern</button>}

            {(data.length === 0 && workingMode === 'inputMode' && statusSicherung === "ungesichert") && 
            <button className="buttonBasics pFunction" type="submit" value="senden" onClick={handleSubmit}>speichern</button>}
            
            {(data.length > 0 || statusSicherung === "ungesichert") && 
            <button className="buttonBasics pFunction" type="reset" onClick={clearForm}>abbrechen</button>}
            
          </div>
          
         </div>
      </main>
      ) : (
      <main id="courseForm" >
        {/* < FehlendeZugangsrechte /> */}
        <></>
      </main>)}
    </>
  )
}

export default CourseAddForm
