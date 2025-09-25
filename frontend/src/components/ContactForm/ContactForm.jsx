import React, { useState, useRef, useContext, useEffect, useCallback } from "react";
import axiosConfig from "../../util/axiosConfig.js";
import { SectionsContext } from "../../context/SectionsContext.js";
import "./ContactForm.scss";
import { DoubleRightOutlined, CloseOutlined, EditOutlined, SaveOutlined, StopOutlined, StepBackwardOutlined, StepForwardOutlined  } from "@ant-design/icons";
import { Modal, Button } from 'antd';
//import Moment from "moment"
import Swal from "sweetalert2";
import { ListOfCountryCodes } from "../ListsOfData/ListOfData.jsx";
import { FehlendeZugangsrechte } from "../FehlermeldungenSwal/FehlermeldungenSwal.jsx";
import { AddCareerItemModal} from "../../modals/AddCareerItem/AddCareerItemModal.jsx"


const ContactPage =() => {
  const { contactData, isAuth, accessRights, navigate, userMode, setUserMode } = useContext(SectionsContext);
  const [statusSicherung, setStatusSicherung] = useState("gesichert")
  const [contactId, setContactId] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [gender, setGender] = useState("")
  const [professionalTitle, setProfessionalTitle] = useState("")
  const [appendix, setAppendix] = useState("")
  const [email, setEmail] = useState("")
  const [nationality, setNationality] = useState("")
  const [dateOfBirth, setDateOfBirth]=useState("")
  const [careerPath, setCareerPath] = useState([])
  const [currentCompany, setCurrentCompany] = useState("")
  const [active, setActive] = useState("")
  const [updatedBy, setUpdatedBy] = useState("")
  const [updatedOn, setUpdatedOn] = useState("")
  const [createdOn, setCreatedOn] = useState("")
  const today = new Date();
  
  const [authorsData, setAuthorsData] = useState("")
  //const [careerStatus, setCareerStatus] = useState({})
  //const [cpdTracker, setCPDTracker] = useState({})
  //const [professionalTracker, setProfessionalTracker] = useState({})
  const [workingMode, setWorkingMode] = useState("inputMode")
  const [formErrors, setFormErrors] = useState({})
  const [data, setData] = useState([null])
  const [contactFilter, setContactFilter] = useState('')
  const [contactList, setContactList] = useState([])
  const [currentDate, setCurrentDate] = useState(today);

  // managing die Seiten der Kontaktliste: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Zurücksetzen auf die erste Seite bei Änderung der Items pro Seite
  };
  const totalItems = contactList.length;
  const itemsPerPageValue = itemsPerPage === 0 ? totalItems : itemsPerPage; // Wenn "alle" ausgewählt ist
  const totalPages = Math.ceil(totalItems / itemsPerPageValue);
  const startIndex = (currentPage - 1) * itemsPerPageValue;
    const endIndex = Math.min(startIndex + itemsPerPageValue, totalItems);
  const currentItems = contactList.slice(startIndex, endIndex);
  // Erzeuge Platzhalter für leere Zeilen, falls weniger als itemsPerPage Elemente vorhanden sind
  const placeholders = Array(itemsPerPageValue - currentItems.length).fill(null);
  //const textareaRef = useRef(null);
  
  const [isContactSucherModalVisible, setIsContactSucherModalVisible] = useState(false);
  
  const validateDateForInput = (date) => {
    return date ? new Date(date).toISOString().split("T")[0] : ""; // Ensures a valid "YYYY-MM-DD" format
  };

  /*const workingModeSelect = (e) => {
    const { value } = e.target;
    e.target.value === "editMode" && setData([null]); clearForm()
    e.target.value === "inputMode" && clearForm()
    setWorkingMode(value);
  };*/

  const handleCancel = () => {
    setIsContactSucherModalVisible(false);
    //setKontaktFilter("")
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setGender("");
    setAppendix("");
    setProfessionalTitle("");
    setDateOfBirth("");
    setEmail("");
    setNationality("");
    setActive(true);
    setCurrentCompany("");
    setCareerPath("");
    setCreatedOn("");
    setUpdatedOn("");
    setUpdatedBy("");
    setStatusSicherung("gesichert");
    setData([null])
  }
  const isFormEmpty = () => {
    //clearForm()
    return !firstName && !lastName && !email && !gender;
  };

  const handleChangeOfData = (event) => {
    const { name, value, checked, type } = event.target;
    setStatusSicherung("ungesichert")
  };

   //folgender Code ist notwendig, wenn aus einer Liste ausgewählt werden soll:
   const contactsFilteredList = useCallback(async (e) => {
    try {
      const response = await axiosConfig.get("/contacts");
      const receivedData = response.data;
  
      // Filtere die Daten basierend auf dem aktuellen Wert von filter
      const filteredData = receivedData.filter(entry =>
        `${entry.firstName} ${entry.lastName}`.toLowerCase().includes(contactFilter.toLowerCase()) ||
        (entry.eMail && entry.eMail.toLowerCase().includes(contactFilter.toLowerCase()))
      );
  
      // Erstelle ein Array von Objekten mit _id und JSX als Inhalt für Kontakt
      const contactArray = filteredData.map(entry => ({
        _id: entry._id,
        Kontakt: (
          <>
            <span className="contact-name">{entry.firstName} {entry.lastName}</span>
            {entry.currentCompany?.companyName && ( 
              <>
                {" "}in der Firma{" "}
                <span className="contact-company">{entry.currentCompany.companyName}</span>
              </>
            )}
            {entry.currentCompany?.companyName && ( 
              <>
                {" "}mit der Email{" "}
                <span className="contact-company">{entry.eMail}</span>
              </>
            )}
          </>
        )
        
      }));
  
      // Aktualisiere den Zustand mit den gefilterten Daten
      setContactList(contactArray);
    } catch (error) {
      // Handle den Fehler, z.B. mit einer Benachrichtigung
      Swal.fire({
        title: "Fehler beim Abrufen der Kontakte",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }, [contactFilter]);
  

  // folgender Code ist notwendig, wenn ein Datensatz gesucht werden soll:
  /*const contactsFilteredList = useCallback(async (e) => {
    try {
      const response = await axiosConfig.get("/contacts");
      const receivedData = response.data;
      
      // Filtere die Daten basierend auf dem aktuellen Wert von contactFilter und exakter Übereinstimmung der E-Mail
      const filteredData = receivedData.filter(entry => 
        entry.eMail && entry.eMail.toLowerCase() === contactFilter.toLowerCase() 
      );
      // Partielle Übereinstimmung
      // const filteredData = receivedData.filter(entry => 
      //   entry.eMail && entry.eMail.toLowerCase().includes(contactFilter.toLowerCase())
      // );

      
      // Erstelle ein Array von Objekten mit _id und Thema aus den gefilterten Daten
      const contactArray = filteredData.map(entry => ({
        _id: entry._id,
        Kontakt: (
          <>
            <span className="contact-name">{entry.firstName} {entry.lastName} </span> 
            in der Firma <span className="contact-company">{entry.currentCompany?.companyName || "N/A"} </span>
            mit der Email <span className="contact-email">{entry.eMail || "Keine Email"} </span>
          </>
        )
      }));
      
      // Aktualisiere den Zustand mit den gefilterten Themen
      setContactList(contactArray);
      // console.log(contactArray)
    } catch (error) {
      // Handle den Fehler, z.B. mit einer Benachrichtigung
      Swal.fire({
        title: "Fehler beim Abrufen der Kontakte",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  }, [contactFilter]);*/
  
  const getContactToReview = async (e) => {
    //console.log(e.target.value);
    const selectedValue = e.target.value;
    if (selectedValue === "") {
      setData([null]);
      clearForm()
      return // Abbrechen, wenn "bitte auswählen" gewählt wird
    }
    try {
      const contactId = e.target.value
      //console.log(contactId);
      const response = await axiosConfig.get(`/contacts/${contactId}`);
      const receivedData = await response.data;
      receivedData && displayContact(receivedData)
      setContactId(receivedData._id)
    } catch (error) {
      Swal.fire({
        title: "Fehler beim Aufrufen des Kontaktes",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  const displayContact = useCallback(async (data) => {
    if (data) {
      const formatForInput = (date) => {
        return date ? new Date(date).toISOString().split("T")[0] : ""; // Format to "yyyy-MM-dd"
      };
  
      const formatForDisplay = (date) => {
        return date
          ? new Date(date).toLocaleDateString("de-DE", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : ""; // Format to "dd.MM.yyyy" for display
      };
  
      setData(data);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setGender(data.gender);
      setEmail(data.eMail || "");
      setAppendix(data.appendix );
      setProfessionalTitle(data.professionalTitle);
      setDateOfBirth(formatForInput(data.dateOfBirth)); // Use ISO format for input
      setNationality(data.nationality);
      setCurrentCompany(data.currentCompany);
      setCareerPath(data.careerPath)
      setActive(data.active);
      setCreatedOn(formatForDisplay(data.createdOn)); // Use display format
      setUpdatedOn(formatForDisplay(data.updatedOn)); // Use display format
      setUpdatedBy(data.updatedBy);
    }
    //console.log(data)
  }, []);
  
  const validateForm = () => {
    const errors = [];
    // Validierung für die Firmeneingabe
    if (firstName.trim() === "") {
      errors.push("Pflichtfeld: Vorname muss definiert werden");
    }
    if (lastName.trim() === "") {
      errors.push("Pflichtfeld: Nachname muss definiert werden");
    }
    if (email.trim() === "") {
      errors.push("Pflichtfeld: E-Mail muss definiert werden");
    }
    // if (companyCountryCode === "") {
    //   errors.push("Das Feld Ländercode darf nicht leer sein");
    // }
      if (errors.length > 5) {
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

  const submitContact = async (e) => {
    e.preventDefault();
    console.log("Test");
    const isValid = validateForm();
    if (isValid) {
      const contactData = {
        firstName,
        lastName,
        eMail: email,
        gender,
        appendix,
        professionalTitle,
        dateOfBirth,
        active,
        updatedBy: localStorage.getItem("userId"),
      };    
      console.log("Daten", contactData); 
      try {
        const response = await axiosConfig.post("/contacts", contactData,
        );
        setStatusSicherung("gesichert")
        //console.log("reponsData", response.data);
        Swal.fire({
          title: "Der Kontakt wurde erfolgreich angelegt!",
          text: "Was willst du als nächstes tun?",
          icon: "success",
          showConfirmButton: true,
          showCancelButton: true,
          showDenyButton: true,
          confirmButtonText: 'Neuen Kontakt anlegen',
          cancelButtonText: 'anderen Kontakt anzeigen',
          denyButtonText: 'Formular schließen',
        }).then((result) => {
          if (result.isConfirmed) {
            clearForm()
          } else if (result.isDismissed) {
            displayContact(response.data)
            //setWorkingMode("editMode")

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
    //}
  };
  }
    //UpdateFunktion
  const updateContact = async (e) => {
    //const companyId = {companyId}
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const contactData = {
        firstName,
        lastName,
        gender,
        appendix,
        professionalTitle,
        eMail: email,
        dateOfBirth,
        active,
        updatedBy: localStorage.getItem("userId"),
      };
      try {
        const response = await axiosConfig.patch(`/contacts/${contactId}`, contactData); 

        setStatusSicherung("gesichert")

        Swal.fire({
          icon: "success",
          title: "Der Kontakt wurde erfolgreich korrigiert!",
          text: "Was willst du als nächstes tun?",
          showConfirmButton: true,
          showCancelButton: true,
          showDenyButton: true,
          //showFourthButton: true,
          confirmButtonText: 'Konatkt anlegen',
          cancelButtonText: 'zurück zum Kontakt',
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
            setData(response.data)
            setWorkingMode("editMode")
          } else if (result.isDenied) {
            navigate("/home")
          }
        })
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
  
    // Löschfunktion
  const deleteContact = async (data) => {
      //e.preventDefault(); // Verhindert das Neuladen der Seite
      const contact = lastName; // Stellen Sie sicher, dass companyName korrekt deklariert ist
    
      const result = await Swal.fire({
          icon: "warning",
          title: `Soll der Kontakt ${contact} wirklich gelöscht werden?`,
          showConfirmButton: true,
          showDenyButton: true,
          confirmButtonText: 'Ja, löschen',
          denyButtonText: 'Nein, nicht löschen',
      });
  
      if (result.isConfirmed) {
          try {
              const response = await axiosConfig.delete(`/contacts/${contactId}`, {
                  data: { lastName: contact }
              });
              setData([null])
              //clearSelectionOfCompany(); // Auswahl des Unternehmens nur nach erfolgreicher Löschung löschen
  
              Swal.fire({
                  icon: "success",
                  title: response.data.message || `Der Kontakt ${contact} wurde gelöscht.`,
                  confirmButtonText: "OK",
                  timer: 3000, // Display for 3 seconds
              });
          } catch (error) {
              console.error("Fehler beim Löschen des Kontaktes:", error); 
              Swal.fire({
                  icon: "error",
                  title: "Es ist ein Fehler aufgetreten. Der Datensatz wurde nicht gelöscht.",
                  confirmButtonText: "OK"
              });
          }
      } else if (result.isDenied) {
          Swal.fire({
              icon: "info",
              title: "Der Löschvorgang wurde von Ihnen abgebrochen.",
              confirmButtonText: "OK",
          });
      }
  };

  // const updateWerdegang = async (e) => {
  //   //const careerId = {careerId}
  //   e.preventDefault();
  //   const isValid = validateForm();
  //   if (isValid) {
  //     const careerData = {
  //       careerId, 
  //       startDate,
  //       endDate,
  //       company,
  //       department,
  //       position,
  //       typeOfValue,
  //       activated,
  //       lastUpdateOn: today,
  //       updatedBy: localStorage.getItem("userId"),
  //     };
  //     try {
  //       const response = await axiosConfig.patch(`/careers/${careerId}`, careerData); 

  //       setStatusSicherung("gesichert")

  //       Swal.fire({
  //         icon: "success",
  //         title: "Der Kontakt wurde erfolgreich korrigiert!",
  //         text: "Was willst du als nächstes tun?",
  //         showConfirmButton: true,
  //         showCancelButton: true,
  //         showDenyButton: true,
  //         //showFourthButton: true,
  //         confirmButtonText: 'Konatkt anlegen',
  //         cancelButtonText: 'zurück zum Kontakt',
  //         denyButtonText: 'Formular schließen',
  //         //fourthButtonText: 'Datensatz bearbeiten',
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           clearForm()
  //           setWorkingMode("inputMode")
  //         } /* else if (result.isFourth) {
  //           clearForm()
  //           setWorkingMode("editMode")
  //         } */ else if (result.isDismissed) {
  //           setData(response.data)
  //           setWorkingMode("editMode")
  //         } else if (result.isDenied) {
  //           navigate("/home")
  //         }
  //       })
  //     } catch (error) {
          
  //       console.error(error);
  //       Swal.fire({
  //         icon: "error",
  //         title: "Es ist ein Fehler aufgetreten. Der veränderte Datensatz wurde nicht gespeichert.",
  //         confirmButtonText: "OK"
  //       });
  //     }
  //   }
  // };

  useEffect(() => {
    contactsFilteredList();
    displayContact()
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [contactFilter,  data,  deleteContact, updateContact]);

  useEffect(() => {
    if (isAuth && Array.isArray(accessRights) && accessRights.some(item => item > 1)) {
      setUserMode("user");
      //setUserMode("manager")
    } else {
      setUserMode("user");
    }
    //console.log(userMode, typeof accessRights, (accessRights) )
  }, [accessRights, userMode, isAuth]);

  return (
   <>
    <main id="contactForm">
      < CloseOutlined className="closeX" onClick={() => navigate("/home")}> </CloseOutlined>
      <div className="headBox"> 
          <h2 id="contactHead">Eingabe / Bearbeiten von Kontakten</h2>
      </div>

      <div id="contactFormContainer"  /* className={statusSicherung} */>
        <p id="änderungsHinweis" >
          {!data 
            ? "Daten eingeben oder Kontakt suchen"
            : ((statusSicherung === "ungesichert") 
              ? "ACHTUNG: Daten / Änderungen wurden noch nicht gesichert" 
              : "Daten jetzt ändern oder löschen")
          }
        </p>
        
        {(accessRights.includes(5) || accessRights.includes(10) || accessRights.includes(9)) &&
        <div id="boxModusWahl">
          {(isAuth && Array.isArray(accessRights) && accessRights.some(item => item > 1)) &&
          /*<label>
          <input
          type="radio"
          name="editMode"
          value="editMode"
          checked={workingMode === 'editMode'}
          //onChange={workingModeSelect}
          onChange={() => {
            //clearForm();
            setIsModalVisible(true);
          }} 
          readOnly
          onClick={() => {
            //clearForm();
            setIsContactSucherModalVisible(true);
            
          }}
          style={{ display: "none" }}
          /> 
           <span className="pFunction">Kontakt finden</span>
          </label>*/
          <div className="pFunction"
          onClick={() => {
            setIsContactSucherModalVisible(true);
            
          }}>Kontakt finden</div>     
          }
        </div> }

        <Modal
          id="kontaktSucherModal"
          title="Kontakt finden"
          open={isContactSucherModalVisible}
          onCancel={handleCancel}
          footer={
            <Button
              key="back"
              className="buttonBasics pFunction"
              id="backButtonContactFinden"
              onClick={handleCancel}
            >
              abbrechen
            </Button>
          }
        >
          <div id="contactSuche">
            <div id="boxContactSuche">
              <label htmlFor="sucheContact">Kontaktfilter</label>
              <input
                type="text"
                name="sucheContact"
                id="sucheContactInput"
                placeholder="Text-Filter"
                autoComplete="off"
                value={contactFilter}
                onDoubleClickCapture={() => setContactFilter("")}
                onChange={(e) => setContactFilter(e.target.value)}
              />
            </div>

            <ul id="contactListe" style={{ listStyleType: "none", width: "100%" }}>
              {contactList.length > 0 ? (
                <>
                  <li
                    onClick={() => {
                      getContactToReview({ target: { value: "" } });
                      setStatusSicherung("gesichert");
                      setIsContactSucherModalVisible(false);
                    }}
                    value="no data"
                  >
                    bitte auswählen / Formular leeren
                  </li>
                  {currentItems.map((item, index) => (
                    <li
                      key={item._id || index}
                      onClick={() => {
                        getContactToReview({ target: { value: item._id } });
                        setStatusSicherung("gesichert");
                        setIsContactSucherModalVisible(false);
                      }}
                      value={item._id}
                    >
                      {item.Kontakt}
                    </li>
                  ))}
                  {placeholders.map((_, index) => (
                    <li key={`placeholder-${index}`} className="placeholder"></li>
                  ))}
                  <div>
                    <p>gefundene Kontakte: {totalItems}</p>
                    <p>
                      Seite {currentPage} von {totalPages}
                    </p>
                    <p>
                      Adresse {startIndex + 1} bis {endIndex}
                    </p>
                  </div>
                  <div id="listeFooter">
                    <label htmlFor="itemsPerPage">Adressen pro Seite:</label>
                    <select
                      id="itemsPerPage"
                      value={itemsPerPage}
                      onChange={handleItemsPerPageChange}
                    >
                      {[5, 10, 15, 20, 0].map((num) => (
                        <option key={num} value={num}>
                          {num === 0 ? "alle" : num}
                        </option>
                      ))}
                    </select>
                    <div id="movePages">
                      <StepBackwardOutlined
                        onClick={() =>
                          setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                        }
                        disabled={currentPage === 1}
                      />
                      <StepForwardOutlined
                        onClick={() =>
                          setCurrentPage((prevPage) =>
                            Math.min(prevPage + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <li value="no data">kein Treffer - bitte Filter verändern</li>
              )}
            </ul>
          </div>
        </Modal>

        <form id="contactDisplayForm" className={statusSicherung}
          onSubmit={submitContact}
          encType="multipart/form-data"
          >
          <div id="vorname">
            <label htmlFor="firstName">Vorname</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              placeholder="Vorname"
              autoComplete="off"
              onChange={(e) => {
              setFormErrors({ ...formErrors, firstName: "" }); // Fehlermeldung zurücksetzen
              handleChangeOfData(e);
              setFirstName(e.target.value);
            }}
              />
              {formErrors.firstName && <p className="error">{formErrors.firstName}</p>}
          </div>
          <div id="nachname">
            <label htmlFor="lastName">Nachname</label>
            <input type= "text"
            id="lastName"
            name="lastName"
            value={lastName}
            placeholder="Nachname"
            autoComplete="off"
            // onDoubleClickCapture={(e) => 
            //   {setLastName("");
            //   setStatusSicherung("ungesichert")}}
            onChange={(e) => {
              setFormErrors({ ...formErrors, lastName: "" }); // Fehlermeldung zurücksetzen
              handleChangeOfData(e);
              setLastName(e.target.value);
            }} />
            {formErrors.lastName && <p className="error">{formErrors.lastName}</p>}
          </div>
          <div id="sex">
            <label htmlFor="gender">Geschlecht</label>
            <input type= "text"
            id="gender"
            name="gender"
            value={gender}
            placeholder="Geschlecht"
            autoComplete="off"
            /* onDoubleClickCapture={(e) => 
              {setGender("");
              setStatusSicherung("ungesichert")}}*/
            onChange={(e) => {
              setFormErrors({ ...formErrors, gender: "" }); // Fehlermeldung zurücksetzen
              handleChangeOfData(e);
              setGender(e.target.value);
            }} />
            {formErrors.gender && <p className="error">{formErrors.gender}</p>}
          </div>
          <div id="Titel">
            <label htmlFor="professionalTitle">Titel:</label>
            <input type= "text"
            id="professionalTitle"
            name="professionalTitle"
            value={professionalTitle}
            placeholder="Titel"
            autoComplete="off"
            /*onDoubleClickCapture={(e) => 
              {setLastName("");
              setStatusSicherung("ungesichert")}}*/
            onChange={(e) => {
              setFormErrors({ ...formErrors, professionalTitle: "" }); // Fehlermeldung zurücksetzen
            handleChangeOfData(e);
            setProfessionalTitle(e.target.value);
            }} />
            {formErrors.professionalTitle && <p className="error">{formErrors.professionalTitle}</p>}
          </div>
          {/* <div id="ländercodeauswahl"
          style={{ position: 'relative' }}>
            <label htmlFor="companyCountryCode">Country:<sup>*</sup>
            </label>
            <div 
            id="countryCodeInput"
            >
              <input
                type="text"
                id="companyCountryCode"
                className="no-focus"
                name="companyCountryCode"
                readOnly
                tabIndex="-1"
                value={companyCountryName} // Anzeigen der landBezeichnung
                placeholder="Land"
                autoComplete="off"
                onChange=
                {(e) => {
                  setFormErrors({ ...formErrors, companyCountryName: "" }); // Fehlermeldung zurücksetzen
                handleChangeOfData(e);
                setCompanyCountryCode(e.target.value);
              }} // Aktualisieren des angezeigten Namens
                //onFocus={() => setIsCountryCodeFocused(true)} // Anzeigen der Liste bei Fokussierung
              />
              <input
                type="hidden"
                readOnly
                tabIndex="-1"
                name="companyCountryCode"
                value={companyCountryCode} // Speichern des kurzCodes
              />

              {isCountryCodeFocused &&
                <ListOfCountryCodes
                id="companyCountryCodeInput"
                onSelectCountryCode={handleSelectCountryCode}
                handleCountryCodeFocus={handleCountryCodeFocus}
                />  
              } 

              {isCountryCodeFocused ? (
                <StopOutlined
                  className="edit-icon"
                  onClick={() => setIsCountryCodeFocused(false)}
                />
              ) : (
                <EditOutlined
                  className="edit-icon"
                  onClick={() => setIsCountryCodeFocused(true)}
                />
              )}

            </div>
          </div>       */}            
          <div id="Appendix">
            <label htmlFor="appendix">Appendix</label>
            <input type= "text"
            id="appendix"
            name="appendix"
            value={appendix}
            placeholder="Appendix"
            autoComplete="off"
            /*onDoubleClickCapture={(e) => 
              {setAppendix("");
              setStatusSicherung("ungesichert")}}*/
            onChange={(e) => {
              setFormErrors({ ...formErrors, appendix: "" }); // Fehlermeldung zurücksetzen
            handleChangeOfData(e);
            setAppendix(e.target.value);
            }} />
            {formErrors.appendix && <p className="error">{formErrors.appendix}</p>}
          </div>
          <div id="eMail">
            <label htmlFor="email">persönliche E-Mail</label>
            <input
              type="email"
              id="eMail"
              name="eMail"
              value={email}
              placeholder="persönliche Email"
              autoComplete="off"
              onChange={(e) => {
              setFormErrors({ ...formErrors, email: "" }); // Fehlermeldung zurücksetzen
              handleChangeOfData(e);
              setEmail(e.target.value);
            }}
              />
              {formErrors.email && <p className="error">{formErrors.email}</p>}
          </div>
          <div id="Geburtsdatum">
            <label htmlFor="dateOfBirth">Geburtsdatum</label>
            <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={validateDateForInput(dateOfBirth)}
            autoComplete="off"
            onChange={(e) => {
              setFormErrors({ ...formErrors, dateOfBirth: "" }); // Fehlermeldung zurücksetzen
              handleChangeOfData(e);
              setDateOfBirth(e.target.value);
            }}
          />
          {formErrors.dateOfBirth && <p className="error">{formErrors.dateOfBirth}</p>}
          </div>
        <div id="Nationalität">
          <label htmlFor="nationality">Origin</label>
          <input type= "text"
          id="nationality"
          name="nationality"
          value={nationality}
          placeholder="nationality"
          autoComplete="off"
          /*onDoubleClickCapture={(e) => 
            {setNationality("");
            setStatusSicherung("ungesichert")}}*/
          onChange={(e) => {
            setFormErrors({ ...formErrors, nationality: "" }); // Fehlermeldung zurücksetzen
          handleChangeOfData(e);
          setNationality(e.target.value);
          }} />
          {formErrors.nationality && <p className="error">{formErrors.nationality}</p>}
        </div>
        { currentCompany ? <div id="aktuelleAdresse">
            <label htmlFor="currentCompany">aktuelle Firma</label>
            <input type= "text"
            id="currentCompany"
            name="currentCompany"
            value={currentCompany.companyName}
            placeholder="currentCompany"
            autoComplete="off"
            /*onDoubleClickCapture={(e) => 
               {setCurrentCompany("");
              setStatusSicherung("ungesichert")}}*/
            onChange={(e) => {
              setFormErrors({ ...formErrors, currentCompany: "" }); // Fehlermeldung zurücksetzen
            handleChangeOfData(e);
            setCurrentCompany(e.target.value);
            }} />
            {formErrors.currentCompany && <p className="error">{formErrors.currentCompany}</p>}
          </div>  : ""}
          {/* {(accessRights.includes(5) || accessRights.includes(10) || accessRights.includes(9)) ??
          <div id="KontaktId">
            <label htmlFor="contactID">interne KontaktId</label>
            <input
              type="number"
              id="contactId"
              name="contactId"
              value={contactId}
              placeholder="contactId"
              autoComplete="off"
              onChange={(e) => {
                setFormErrors({ ...formErrors, contactId: "" }); // Fehlermeldung zurücksetzen
              handleChangeOfData(e);
              setContactId(e.target.value);
            }}
            />
            {formErrors.contactId && <p className="error">
            {formErrors.contactId}</p>}
          </div>
          } */}

          {/* {(accessRights.includes(5) || accessRights.includes(10) || accessRights.includes(9)) &&
          <div id="Autorendefinition">
            <label htmlFor="authorsData">CPD Provider:</label>
            <div className="authorsData">
              <input 
              type= "text"
              id="authorsData"
              name="authorsData"
              value={authorsData}
              checked={authorsData}
              onChange={(e) => {
              handleChangeOfData(e);
              setAuthorsData(e.target.checked);
              }} />
            </div>
          </div>
          } */}
          {(isAuth && Array.isArray(accessRights) && accessRights.some(item => item > 1)) &&
          <div id="aktiviert">
            <label htmlFor="active">Kontakt aktiv:</label>
            {/* <p id="kursActivated">{data[0].active === true ? "aktiviert" : "nicht aktiv"}</p> */}
            <div className="checkboxContainer">
              <input 
              type= "checkbox"
              id="active"
              name="active"
              checked={active}
              value={active}
              onChange={(e) => {
              handleChangeOfData(e);
              setActive(e.target.checked);
              }} 
              />
            </div>
          </div>
          }
          {(!isFormEmpty || data._id) && (
            <div id="createdon">
              <label htmlFor="createdOn">Erfasst am:</label>
              <output id="createdOn" name="createdOn">
                {createdOn}
              </output>
            </div>
          )}

          {(!isFormEmpty || data._id) && (
            <div id="updatedon">
              <label htmlFor="updatedOn">Zuletzt aktualisiert am:</label>
              <output id="updatedOn" name="updatedOn">
              {updatedOn}
              </output>
            </div>
          )}

          {(isAuth && Array.isArray(accessRights) && accessRights.some(item => item > 1)) &&
          <div id="updatedby">
            <label htmlFor="updatedBy">Zuletzt aktualisiert von: </label>
            <output         
            id="updatedBy"
            name="updatedBy"
            >{updatedBy
              ? `${updatedBy.firstName || ''} ${updatedBy.lastName || ''}`.trim()
              : 'Unbekannt'}
            </output>
          </div>
          } 
                      
          <div id="werdegang">
            <label htmlFor="careerPath">Beruflicher Werdegang:</label>
            <output id="careerPath">
              <table>
                <colgroup>
                  <col width="30%" />
                  <col width="15%" />
                  <col width="5%" />
                  <col width="5%" />
                  <col width="7%" />
                  <col width="7%" />
                  <col width="3%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>Unternehmen</th>
                    <th>Position</th>
                    <th>Typ</th>
                    <th>aktiv</th>
                    <th>Einstieg</th>
                    <th>Ausstieg</th>
                    <th>Zeitraum</th>
                  </tr>
                </thead>
                <tbody>
                  {careerPath && careerPath.length > 0 ? (
                    careerPath.map((path, index) => (
                      <tr key={path.id || index}>
                        <td>{path.company?.companyName || "N/A"}</td>
                        <td>{path.position || "N/A"}</td>
                        <td>{path.typeOfValue || "N/A"}</td>
                        <td>
                          <input
                            type="checkbox"
                            id={`active-${index}`}
                            name={`active-${index}`}
                            checked={path.activated || false}
                            value={path.activated || false}
                            onChange={(e) => {
                              handleChangeOfData(e);
                              setActive(e.target.checked);
                            }}
                          />
                        </td>
                        <td>{validateDateForInput(path.startDate)}</td>
                        <td>{validateDateForInput(path.endDate)}</td>
                        <td>{path.timeSpan || "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">Keine Daten verfügbar</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </output>
          </div>
          
        </form>

        <div id="buttonBox">
          {(data._id && statusSicherung === "ungesichert" ) && 
            <button 
              className="buttonBasics pFunction" 
              onClick={updateContact} 
              //disabled={isFormEmpty ? true : false}
            >
              Änder. sichern
            </button>
          }

          {(userMode === "manager" && data._id) && (
            <button 
              className="buttonBasics pFunction" 
              onClick={() => deleteContact(data)} 
              disabled={(data.length < 1)}
            >
              Kontakt löschen
            </button>
          )}

          {(!data._id && statusSicherung === "ungesichert") &&
          <button 
            type="submit" 
            className="buttonBasics pFunction" 
            onClick={submitContact} 
            //disabled={isFormEmpty ? true : false}
          >
            speichern
          </button>
          }

          { (data._id && statusSicherung === "ungesichert") &&
            <button 
              className="buttonBasics pFunction" 
              onClick={() => {
                setStatusSicherung("gesichert");
                displayContact(data);
                //setIsCompanyTypeFocused(false);
                }} 
            >
              abbrechen
            </button>
          }

          { (statusSicherung === "ungesichert" || data._id) &&
            <button 
              type="reset" 
              className="buttonBasics pFunction" 
              onClick={() => {
                clearForm();
                //setIsCompanyTypeFocused(false);
                }} 
            >
              leeren
            </button>
          }

        </div>

      </div>
    </main>
   </>

  )
}

export default ContactPage