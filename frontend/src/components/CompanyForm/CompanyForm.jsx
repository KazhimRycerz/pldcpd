import React, { useState, useRef, useContext, useEffect, useCallback } from "react";
import axiosConfig from "../../util/axiosConfig.js";
import { SectionsContext } from "../../context/SectionsContext.js";
import "./CompanyForm.scss";
import { DoubleRightOutlined, CloseOutlined, EditOutlined, SaveOutlined, StopOutlined, StepBackwardOutlined, StepForwardOutlined  } from "@ant-design/icons";
import { Modal, Button } from 'antd';
import Moment from "moment"
import Swal from "sweetalert2";
import { IndustryField, ListOfCompanyType, ListOfCountryCodes } from "../ListsOfData/ListOfData.jsx";
import { FehlendeZugangsrechte } from "../FehlermeldungenSwal/FehlermeldungenSwal.jsx"

const CompanyPage = () => {
  const { isAuth, setGotoPage, accessRights, navigate, userMode, setUserMode} = useContext(SectionsContext);
  //console.log(accessRights)
  
  const [workingMode, setWorkingMode] = useState("inputMode")
  const [formErrors, setFormErrors] = useState({})
  const [data, setData] = useState([null])
  const [firmenFilter, setFirmenFilter] = useState('')
  const [companyTypeSearcher, setCompanyTypeSearcher] = useState('')
  const [firmenListe, setFirmenListe] = useState([])
  const [statusSicherung, setStatusSicherung] = useState("gesichert")
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const [isCompanyTypeFocused, setIsCompanyTypeFocused] = useState(false);
  const [isCountryCodeFocused, setIsCountryCodeFocused] = useState(false);
  
  const [companyId, setCompanyId] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [addressNature, setAddressNature] = useState("")
  const [companyType, setCompanyType] = useState("")
  const [companyBranch, setCompanyBranch] = useState("")
  const [companyCountryCode, setCompanyCountryCode] = useState("")
  const [companyCountryName, setCompanyCountryName] = useState('');
  const [companyZip, setCompanyZip] = useState("")
  const [companyCity, setCompanyCity] = useState("")
  const [companyStreet, setCompanyStreet] = useState("")
  const [companyClientID, setCompanyClientID] = useState("")
  const [companyUstID, setCompanyUstID] = useState("")
  const [companyHomepage, setCompanyHomepage] = useState("https://")
  const [companyEmail, setCompanyEmail] = useState("")
  const [cpdProvider, setCPDProvider] = useState(false)
  const [companyActive, setCompanyActive] = useState(true)
  const [updatedBy, setUpdatedBy] = useState("")
  const [updatedOn, setUpdatedOn] = useState("")
  const [createdOn, setCreatedOn] = useState("")
  //const [selectedCountryCode, setSelectedCountryCode] = useState('');

// managing die Seiten der Firmenliste: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
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
const totalItems = firmenListe.length;
const itemsPerPageValue = itemsPerPage === 0 ? totalItems : itemsPerPage; // Wenn "alle" ausgewählt ist
const totalPages = Math.ceil(totalItems / itemsPerPageValue);
const startIndex = (currentPage - 1) * itemsPerPageValue;
  const endIndex = Math.min(startIndex + itemsPerPageValue, totalItems);
const currentItems = firmenListe.slice(startIndex, endIndex);
// Erzeuge Platzhalter für leere Zeilen, falls weniger als itemsPerPage Elemente vorhanden sind
const placeholders = Array(itemsPerPageValue - currentItems.length).fill(null);

  const textareaRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
 

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to auto to shrink if necessary
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to the scroll height
    }
  };

  useEffect(() => {
    adjustHeight(); // Adjust height on initial render
  }, [companyStreet]); // Also adjust height whenever the content changes



  /* const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  }; */
  
  const handleCancel = () => {
    setIsModalVisible(false);
    setFirmenFilter("")
  };
  
  const workingModeSelect = (e) => {
    const { value } = e.target;
    e.target.value === "editMode" && setData([null]); clearForm()
    e.target.value === "inputMode" && clearForm()
    setWorkingMode(value);
    //console.log(workingMode)
  };

  const clearForm = () => {
    setAddressNature("");
    setCompanyType("");
    setCompanyBranch("");
    setCompanyName("");
    setCompanyStreet("");
    setCompanyZip("");
    setCompanyCity("");
    setCompanyCountryCode("");
    setCompanyCountryName("")
    setCompanyEmail("");
    setCompanyHomepage("");
    setCompanyUstID("");
    setCompanyClientID("");
    setCompanyActive(true);
    setCPDProvider(false)
    setUpdatedBy("");
    setUpdatedOn(Moment(today).format("YYYY-MM-DD"));
    setStatusSicherung("gesichert");
    setData([null])
  }

  const isFormEmpty = () => {
    //clearForm()
    return !companyName && !companyStreet && !companyZip && !companyCity && !companyCountryCode && !companyHomepage;
  };

  const clearSelectionOfCompany = () => {
    clearForm();
    //document.getElementById('firmenListe').value = "";
  };
  
  const handleChangeOfData = (event) => {
    const { name, value, checked, type } = event.target;
    setStatusSicherung("ungesichert")
  };

  const handleSelectCompanyType = (kürzel) => {
    setCompanyType(kürzel);
    setIsCompanyTypeFocused(false); // Close the dropdown after selection
    setStatusSicherung("ungesichert")
  };

  const handleSelectCountryCode = (country) => {
    setCompanyCountryCode(country.kurzCode);
    setCompanyCountryName(country.landBezeichnung);
    setStatusSicherung(false)
    setIsCountryCodeFocused(false)
    //console.log("Ausgewählter Ländercode:", country);
  }
  const handleCountryCodeFocus = () => {
    setIsCountryCodeFocused(false);
  };

  const companyTypeFilter = (input) => {
    //console.log(input)
    return ListOfCompanyType.filter((type) =>
      type.discription.toLowerCase().includes(input.toLowerCase())
    );
  };

  const firmenFilteredList = useCallback(async (e) => {
    try {
      const response = await axiosConfig.get("/companies");
      const receivedData = response.data;
      // Filtere die Daten basierend auf dem aktuellen Wert von filter
      const filteredData = receivedData.filter(entry => entry.companyName.toLowerCase().includes(firmenFilter.toLowerCase()));
      // Erstelle ein Array von Objekten mit _id und Thema aus den gefilterten Daten
      const firmenArray = filteredData.map(entry => ({
        _id: entry._id,
        Firma: entry.companyName
      }));
      // Aktualisiere den Zustand mit den gefilterten Themen
      setFirmenListe(firmenArray);
    } catch (error) {
      // Handle den Fehler, z.B. mit einer Benachrichtigung
      Swal.fire({
        title: "Fehler beim Abrufen der Firmen",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  }, [firmenFilter]);

  const getCompanyToReview = async (e) => {
    //console.log(e.target.value);
    const selectedValue = e.target.value;
    if (selectedValue === "") {
      setData([null]);
      clearForm()
      return // Abbrechen, wenn "bitte auswählen" gewählt wird
    }
    try {
      const companyId = e.target.value
     //console.log(companyId);
      const response = await axiosConfig.get(`/companies/${companyId}`);
      const receivedData = await response.data;
      receivedData && displayCompany(receivedData)
      setCompanyId(receivedData._id)
      //console.log(data.updatedBy.firstName)
    } catch (error) {
      Swal.fire({
        title: "Fehler beim Aufrufen der Firma",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  const displayCompany = useCallback(async (data) => {
    if (data)  
    { setData(data)
      setAddressNature(data.addressNature);
      setCompanyType(data.companyType);
      setCompanyBranch(data.companyBranch);
      setCompanyName(data.companyName);
      setCompanyStreet(data.companyStreet);
      setCompanyZip(data.companyZip);
      setCompanyCity(data.companyCity);
      setCompanyCountryCode(data.companyCountryCode);
      setCompanyEmail(data.companyEmail);
      setCompanyHomepage(data.companyHomepage);
      setCompanyActive(data.companyActive);
      setCPDProvider(data.cpdProvider);
      setUpdatedBy(data.updatedBy);
      setUpdatedOn(data.updatedOn);
      setCreatedOn(data.createdOn);
      setCompanyClientID(data.companyClientID)
      //console.log(companyId)
    } 
  }, []);

  const validateForm = () => {
    const errors = [];
    // Validierung für die Firmeneingabe
    if (addressNature === "") {
      errors.push("Addressart muss definiert werden");
    }
    if (companyType.trim() === "") {
      errors.push("Firmentyp muss definiert sein");
    }
    if (companyName.trim() === "") {
      errors.push("Firmenname darf nicht leer sein");
    }
    if (companyStreet.trim() === "") {
      errors.push(" Die Anschrift darf nicht leer sein darf nicht leer sein");
    }
    if (companyCity.trim() === "") {
      errors.push("Der Ort darf nicht leer sein");
    }
    if (companyCountryCode === "") {
      errors.push("Das Feld Ländercode darf nicht leer sein");
    }
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

  //Submitfuktion
  const submitCompany = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const companyData = {
        addressNature,
        companyType,
        companyName,
        companyBranch,
        companyCountryCode,
        companyZip,
        companyCity,
        companyStreet,
        companyClientID,
        companyUstID,
        companyHomepage,
        companyEmail,
        cpdProvider,
        companyActive,
        updatedBy: localStorage.getItem("userId"),
      };     
      try {
        const response = await axiosConfig.post("/companies", companyData,
        );
        setStatusSicherung("gesichert")
        //console.log("reponsData", response.data);
        Swal.fire({
          title: "Das Unternehmen wurde erfolgreich registriert!",
          text: "Was willst du als nächstes tun?",
          icon: "success",
          showConfirmButton: true,
          showCancelButton: true,
          showDenyButton: true,
          confirmButtonText: 'Neues Unternehmen anlegen',
          cancelButtonText: 'anderes Unternehmen anzeigen',
          denyButtonText: 'Formular schließen',
        }).then((result) => {
          if (result.isConfirmed) {
            clearForm()
          } else if (result.isDismissed) {
            displayCompany(response.data)
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
  const updateCompany = async (e) => {
    //const companyId = {companyId}
    //console.log(e.target.value)
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const companyData = {
        addressNature,
        companyName,
        companyType,
        companyBranch,
        companyCountryCode,
        companyZip,
        companyCity,
        companyStreet,
        companyClientID,
        companyUstID,
        companyHomepage,
        companyEmail,
        cpdProvider,
        companyActive,
        updatedBy: localStorage.getItem("userId")
      };
      //console.log(companyId)
      try {
        const response = await axiosConfig.patch(`/companies/${companyId}`, companyData); 
        setStatusSicherung("gesichert")
        Swal.fire({
          icon: "success",
          title: "Das Unternehmen wurde erfolgreich korrigiert!",
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
            setData(response.data)
            setWorkingMode("editMode")
          } else if (result.isDenied) {
            navigate("/home")
          }
        })
        console.log('Datensatz aktualisiert:', response.data);
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
  const deleteCompany = async (data) => {
    //e.preventDefault(); // Verhindert das Neuladen der Seite
    const company = companyName; // Stellen Sie sicher, dass companyName korrekt deklariert ist
  
    const result = await Swal.fire({
        icon: "warning",
        title: `Soll das Unternehmen ${company} wirklich gelöscht werden?`,
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: 'Ja, löschen',
        denyButtonText: 'Nein, nicht löschen',
    });

    if (result.isConfirmed) {
        try {
            const response = await axiosConfig.delete(`/companies/${companyId}`, {
                data: { companyName: company }
            });
            setData([null])
            clearSelectionOfCompany(); // Auswahl des Unternehmens nur nach erfolgreicher Löschung löschen

            Swal.fire({
                icon: "success",
                title: response.data.message || `Das Unternehmen ${company} wurde gelöscht.`,
                confirmButtonText: "OK",
                timer: 3000, // Display for 3 seconds
            });
        } catch (error) {
            console.error("Fehler beim Löschen des Unternehmens:", error); 
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

  useEffect(() => {
    setGotoPage("/companypage");
    firmenFilteredList();
    displayCompany()
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [firmenFilter,  data,  deleteCompany, updateCompany]);

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
      <main id="companyForm" /* className = {userMode} */>
        
        <div className="headBox"> 
          <h2 id="companyHead">Eingabe / Bearbeiten von Unternehmen</h2>
          <p className="closingFunction" onClick={() => navigate("/home")}>Formular schließen</p>
        </div>

        <div id="companyFormContainer" className={statusSicherung}>

          <p id="änderungsHinweis">
            {isFormEmpty() ? "Bitte Daten eingeben" :
            ((!isFormEmpty && statusSicherung === "ungesichert") ? "ACHTUNG: Änderungen wurden noch nicht gesichert" : "Daten jetzt ändern oder löschen")}
          </p>
            
          {(accessRights.includes(5) || accessRights.includes(10) || accessRights.includes(9)) &&
          <div id="boxModusWahl">
              {/*  <label>
              <input
              type="radio"
              name="inputMode"
              value="inputMode"
              checked={workingMode === 'inputMode'}
              onChange={workingModeSelect}
              />
              <span style={{ marginLeft: '5px' }}>Neues Unternehmen erfassen</span>
              </label> */}

            {(isAuth && Array.isArray(accessRights) && accessRights.some(item => item > 1)) &&
            <label>
            <input
            type="radio"
            name="editMode"
            value="editMode"
            checked={workingMode === 'editMode'}
            //onChange={workingModeSelect}
            /* onChange={() => {
              //clearForm();
              setIsModalVisible(true);
              
            }} */
            readOnly
            onClick={() => {
              //clearForm();
              setIsModalVisible(true);
              
            }}
            style={{ display: "none" }}
            /> 
            <span className="pFunction">suchen und bearbeiten</span>
            </label>
            }

          </div> }

          <Modal id="firmensucherModal"
            title="Firma finden"
            open={isModalVisible}
            //onOk={handleOk}
            onCancel={handleCancel}
            footer={
              <Button 
              key="back" 
              className="buttonBasics pFunction "
              id="backButtonFirmaFinden"
              onClick={handleCancel}>
                abbrechen
              </Button>
            }
            >
            <div id="firmensuche">
              <div id="boxFirmensuche">
                <label 
                htmlFor="sucheFirma" 
                id="themenFilterLabel"
                > Firmenfilter
                </label>
                <input 
                type="text" 
                name="sucheFirma" 
                id="sucheFirma" 
                placeholder="Text-Filter" 
                autoComplete="off"
                value={firmenFilter}
                onDoubleClickCapture={(e) => 
                  {setFirmenFilter("")}}
                /* onChange={handleFilter} */ 
                onChange={(e) =>
                  {setFirmenFilter(e.target.value)}} 
                //autoComplete="off"
                />
              </div>

              <ul id="firmenListe"
            style={{listStyleType: "none", width:"100%"}}>
              {firmenListe.length > 0 ? (
                <>
                  <li
                  onClick={() => {
                    getCompanyToReview({ target: { value: "" } });
                    setStatusSicherung("gesichert");
                    setIsModalVisible(false);
                  }}
                  value="no data"
                  >
                    bitte auswählen / Formular leeren 
                  </li>
                  {currentItems.map((item, index) => (
                    <li key={index}
                    onClick={() => {
                      getCompanyToReview({ target: { value: item._id } });
                      setStatusSicherung("gesichert");
                      setIsModalVisible(false);
                    }}
                    value={item._id}
                    >
                      {item.Firma}
                    </li>
                  ))}
                  {placeholders.map((_, index) => (
                    <li key={`placeholder-${index}`} className="placeholder">
                        {/* Leerer Platzhalter */}
                    </li>
                ))}
                  <div>
                      <p>gefundene Adressen: {totalItems}</p>
                    <p>Seite {currentPage} von {totalPages}</p>
                    {/* <p>gefilterte Firmen: {currentItems.length} von {totalItems} insgesamt</p> */}
                    <p>Adresse {startIndex+1} bis  {endIndex}</p> 
                  </div>
                  <div id="listeFooter">
                    <label
                    htmlFor="itemsPerPage">
                      Adressen pro Seite:
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

          <form id="companyDisplayForm" 
          onSubmit={submitCompany}
          encType="multipart/form-data"
          >
            <div id="addressart">
              <label id="companyNature">Adressart<sup id="addressNatureSup">*</sup></label>
              <div id="eingabeCompanyNature">
                <div>
                  <input
                  type="radio"
                  value="business"
                  id="addressNature"
                  name="addressNature"
                  placeholder="Business"
                  autoComplete="off"
                  checked={addressNature === "business"}
                  onChange={(e) => {
                    setFormErrors({ ...formErrors, addressNature: "" }); 
                    handleChangeOfData(e);
                    setAddressNature("business");
                    setCompanyType("")
                  }}
                  />
                  <label htmlFor="business">business</label>
                </div>
                <div>
                  <input
                  type="radio"
                  value="private"
                  id="private"
                  name="addressNature"
                  placeholder="Private"
                  autoComplete="off"
                  checked={addressNature === "private"}
                  onChange={(e) => {
                    setFormErrors({ ...formErrors, addressNature: "" }); 
                    handleChangeOfData(e);
                    setAddressNature("private");
                    setCompanyType("PA")
                  }}
                  />
                  <label htmlFor="private">private / personal</label>
                </div>
              </div>
            </div>
          {addressNature ==="business" ? 
            <div id="firmennameneingabe">
            <label htmlFor="companyName">Firmenname<sup id="courseTopicSup">*</sup></label>
            <input
            type="text"
            id="companyName"
            name="companyName"
            value={companyName}
            placeholder="Firma / Adressname eingeben"
            autoComplete="off"
            onChange={(e) => {
              setFormErrors({ ...formErrors, companyName: "" }); // Fehlermeldung zurücksetzen
            handleChangeOfData(e);
            setCompanyName(e.target.value);
            }}
            />
            {formErrors.companyName && <p className="error">
            {formErrors.companyName}</p>}
            </div> : 
            <div id="firmennameneingabe">
              <label htmlFor="companyName">Vor und Nachname<sup id="courseTopicSup">*</sup></label>
              <input
              disabled
                type="text"
                id="companyName"
                name="companyName"
                value={companyName}
                placeholder="Vor- und Nachname Privatadresse"
                autoComplete="off"
                autoFocus
                onChange={(e) => {
                  setFormErrors({ ...formErrors, companyName: "" }); // Fehlermeldung zurücksetzen
                handleChangeOfData(e);
                setCompanyName(e.target.value);
              }}
                />
                {formErrors.companyName && <p className="error">{formErrors.companyName}</p>}
            </div>
          } 
            <div id="firmentypauswahl"
            style={{ position: 'relative', maxHeight: "45px" }}>
              <label htmlFor="companyType">Unternehmensart<sup id="companyTypeSup">*</sup>
              </label>
              
              <div 
              id="firmenTypInput"
              >
                <input
                type="text"
                id="companyType"
                name="companyType"
                readOnly
                tabIndex="-1"
                value={ListOfCompanyType.find(type => type.kürzel === companyType)?.discription || companyType}
                placeholder="Unternehmenstyp"
                autoComplete="off"
                onChange={(e) => {
                  setFormErrors({ ...formErrors, companyType: "" }); // Fehlermeldung zurücksetzen
                  handleChangeOfData(e);
                  setCompanyType(e.target.value);
                }}
                />


                {isCompanyTypeFocused && 
                    <div
                    id="companyTypeInput"
                    style={{ position: 'absolute' }}
                      /* onMouseLeave={() => setIsCompanyTypeFocused(false)} */
                      >
                      <ul 
                      id="auswahlCompanyType" 
                      >
                        < CloseOutlined 
                        id="closeX" 
                        onClick={() => {
                          setIsCompanyTypeFocused(false)
                        }}
                        />
                        <input 
                        type="text" 
                        id="sucheCompanyType" 
                        name="sucheCompanyType" 
                        value={companyTypeSearcher}
                        placeholder="Suchfilter" 
                        autoComplete="off"
                        autoFocus
                        onChange={(e) => {setCompanyTypeSearcher(e.target.value)}}
                        />
                      
                      {companyTypeFilter(companyTypeSearcher)
                      /* .slice(0,10) */
                      .map((type, index) => (
                        <li 
                        key={index} 
                        onClick={() => handleSelectCompanyType(type.kürzel)} 
                        //style={{ cursor: 'pointer', padding: '5px', borderBottom: '1px solid #ddd' }}
                        >
                          {type.discription}
                        </li>
                      ))}
                      {companyTypeFilter(companyTypeSearcher).length < 1 && (
                        <li>Bitte Filter erweitern</li>
                      )}
                      </ul>
                    </div>
                }
                {isCompanyTypeFocused ? (
                  <StopOutlined
                    className="edit-icon"
                    onClick={() => {
                      setIsCompanyTypeFocused(false)
                    }}
                    
                  />
                ) : (
                  <EditOutlined
                    className="edit-icon"
                    onClick={() => {setIsCompanyTypeFocused(true);
                      setCompanyTypeSearcher('')}}
                  />)
                }
              </div>
            </div>

            <div id="firmenanschrift">
              <label htmlFor="companyStreet">Anschrift</label>
              <textarea
              ref={textareaRef}
              rows="1"
              cols="50"
              type="text"
              id="companyStreet"
              name="companyStreet"
              value={companyStreet}
              placeholder="Anschrift"
              autoComplete="off"
              onChange={(e) => {
                setFormErrors({ ...formErrors, companyStreet: "" }); // Fehlermeldung zurücksetzen
              handleChangeOfData(e);
              setCompanyStreet(e.target.value);
              adjustHeight(); // Adjust height on every change
              }}
              />
              {formErrors.companyStreet && <p className="error">
              {formErrors.companyStreet}</p>}
            </div>

            <div id="firmenplz">
              <label htmlFor="companyZip">PLZ / zip code</label>
              <input
                type="text"
                id="companyZip"
                name="companyZip"
                value={companyZip}
                placeholder="PLZ / ZIPcode"
                autoComplete="off"
                onChange={(e) => {
                  setFormErrors({ ...formErrors, companyZip: "" }); // Fehlermeldung zurücksetzen
                handleChangeOfData(e);
                setCompanyZip(e.target.value);
              }}
                />
                {formErrors.companyZip && <p className="error">{formErrors.companyZip}</p>}
            </div>
            <div id="firmenort">
              <label htmlFor="companyCity">Ort</label>
              <input
                type="text"
                id="companyCity"
                name="companyCity"
                value={companyCity}
                placeholder="Firmenstandort"
                autoComplete="off"
                onChange={(e) => {
                  setFormErrors({ ...formErrors, companyCity: "" }); // Fehlermeldung zurücksetzen
                handleChangeOfData(e);
                setCompanyCity(e.target.value);
              }}
                />
                {formErrors.companyCity && <p className="error">{formErrors.companyCity}</p>}
            </div>

            <div id="ländercodeauswahl"
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
            </div>      

            <div id="homepageeingabe">
              <label htmlFor="linkProvider">Homepage:</label>
              <input type= "url"
              id="companyHomepage"
              name="companyHomepage"
              value={companyHomepage}
              //placeholder="Themenfeld"
              autoComplete="off"
              onDoubleClickCapture={(e) => 
                {setCompanyHomepage("");
                setStatusSicherung("ungesichert")}}
              onChange={(e) => {
              handleChangeOfData(e);
              setCompanyHomepage(e.target.value);
              }} />
            </div>
            <div id="email">
              <label htmlFor="companyEmail">Firmen-EMail</label>
              <input
                type="email"
                id="companyEmail"
                name="companyEmail"
                value={companyEmail}
                placeholder="Firmenemail"
                autoComplete="off"
                onChange={(e) => {
                  setFormErrors({ ...formErrors, companyEmail: "" }); // Fehlermeldung zurücksetzen
                handleChangeOfData(e);
                setCompanyEmail(e.target.value);
              }}
                />
                {formErrors.companyEmail && <p className="error">{formErrors.companyEmail}</p>}
            </div>
            {(accessRights.includes(5) || accessRights.includes(10) || accessRights.includes(9)) ??
            <div id="clientid">
              <label htmlFor="companyClientID">interne ClientID</label>
              <input
                type="text"
                id="companyClientID"
                name="companyClientID"
                value={companyClientID}
                placeholder="companyClientID"
                autoComplete="off"
                onChange={(e) => {
                  setFormErrors({ ...formErrors, companyCity: "" }); // Fehlermeldung zurücksetzen
                handleChangeOfData(e);
                setCompanyClientID(e.target.value);
              }}
              />
              {formErrors.companyClientID && <p className="error">
              {formErrors.companyClientID}</p>}
            </div>
            }
            {(accessRights.includes(5) || accessRights.includes(10) || accessRights.includes(9)) &&
            <div id="providerdefinition">
              <label htmlFor="cpdProvider">CPD Provider:</label>
              <div className="checkboxContainer">
                <input 
                type= "checkbox"
                id="cpdProvider"
                name="cpdProvider"
                value={cpdProvider}
                checked={cpdProvider}
                onChange={(e) => {
                handleChangeOfData(e);
                setCPDProvider(e.target.checked);
                }} />
              </div>
            </div>}
            {(isAuth && Array.isArray(accessRights) && accessRights.some(item => item > 1)) &&
            <div id="firmenaktivierung">
              <label htmlFor="companyActive">Adresse aktiv:</label>
              {/* <p id="kursActivated">{data[0].active === true ? "aktiviert" : "nicht aktiv"}</p> */}
              <div className="checkboxContainer">
                <input 
                type= "checkbox"
                id="companyActive"
                name="companyActive"
                checked={companyActive}
                value={companyActive}
                onChange={(e) => {
                handleChangeOfData(e);
                setCompanyActive(e.target.checked);
                }} 
                />
              </div>
            </div>}
          {(!isFormEmpty || data._id) &&
            <div id="createdon">
              <label htmlFor="createdOn">Erfasst am:</label>
              {/* <p id="kursActivated">{data[0].active === true ? "aktiviert" : "nicht aktiv"}</p> */}
              <output         
              id="createdOn"
              name="createdOn"
              >{Moment(createdOn).format("DD.MMMM.YYYY")}
              </output>
            </div>
          }
          {(!isFormEmpty || data._id) &&
            <div id="updatedon">
              <label htmlFor="updatedOn">Zuletz aktualisiert am:</label>
              <output         
              id="updatedOn"
              name="updatedOn"
              >{Moment(updatedOn).format("DD.MMMM.YYYY")}
              </output>
            </div>
          }
            {(isAuth && Array.isArray(accessRights) && accessRights.some(item => item > 1)) &&
            <div id="updatedby">
              <label htmlFor="updatedBy">Zuletzt aktualisiert von:</label>
              <output         
              id="updatedBy"
              name="updatedBy"
              >{updatedBy.firstName} {updatedBy.lastName}
              </output>
            </div>}
                
              
            
          </form>

          <div id="buttonBox">
            {(data._id && statusSicherung === "ungesichert" ) && 
              <button 
                className="buttonBasics pFunction" 
                onClick={updateCompany} 
                //disabled={isFormEmpty ? true : false}
              >
                Änder. sichern
              </button>
            }

            {(userMode === "manager" && data._id) && (
              <button 
                className="buttonBasics pFunction" 
                onClick={() => deleteCompany(data)} 
                disabled={(data.length < 1)}
              >
                Firma löschen
              </button>
            )}

            {(!data._id && statusSicherung === "ungesichert") &&
            <button 
              type="submit" 
              className="buttonBasics pFunction" 
              onClick={submitCompany} 
              disabled={isFormEmpty ? true : false}
            >
              speichern
            </button>
            }

            { data &&
              <button 
                type="reset" 
                className="buttonBasics pFunction" 
                onClick={() => {
                  clearForm();
                  setIsCompanyTypeFocused(false);
                  }} 
              >
                abbrechen
              </button>
            }
          </div>
        
        </div>
            
      </main>
    </>
  )
}

export default CompanyPage
