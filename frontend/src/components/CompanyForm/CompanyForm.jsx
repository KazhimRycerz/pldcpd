import React, { useState, useRef, useContext, useEffect } from "react";
import axiosConfig from "../../util/axiosConfig.js";
import { SectionsContext } from "../../context/SectionsContext.js";
import "./CompanyForm.scss";
import { CloseOutlined } from "@ant-design/icons";
import Moment from "moment"
import Swal from "sweetalert2";
import { Footer } from "../../components/Footer/Footer.jsx"
import { IndustryField, ListOfCompanyType, ListOfCountryCodes, ListOfCourseTypes, ListOfLanguages, ListOfTopicFields, ListOfLevel } from "../ListsOfData/ListOfData.jsx";
import { FehlendeZugangsrechte } from "../FehlermeldungenSwal/FehlermeldungenSwal.jsx"

const CompanyPage = () => {
  const { isAuth, setGotoPage, userData, accessRights, navigate} = useContext(SectionsContext);
  
  const [workingMode, setWorkingMode] = useState("inputMode")
  const [userMode, setUserMode] = useState("user")
  const [formErrors, setFormErrors] = useState({})
  const [data, setData] = useState([])
  //const [autorenFilter, setAutorenFilter] = useState('')
  //const [themenFilter, setThemenFilter] = useState('')
  //const [themenListe, setThemenListe] = useState([])
  const [firmenFilter, setFirmenFilter] = useState('')
  const [firmenListe, setFirmenListe] = useState([])
  const [statusSicherung, setStatusSicherung] = useState("gesichert")
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  
  const [companyName, setCompanyName] = useState("")
  const [addressNature, setAddressNature] = useState("")
  const [companyType, setCompanyType] = useState("")
  const [companyBranch, setCompanyBranch] = useState("")
  const [companyCountryCode, setCompanyCountryCode] = useState("")
  const [companyZip, setCompanyZip] = useState("")
  const [companyCity, setCompanyCity] = useState("")
  const [companyStreet, setCompanyStreet] = useState("")
  const [companyClientID, setCompanyClientID] = useState("")
  const [companyUstID, setCompanyUstID] = useState("")
  const [companyHomepage, setCompanyHomepage] = useState("https://")
  const [companyEmail, setCompanyEmail] = useState("")
  const [cpdProvider, setCPDProvider] = useState(false)
  const [companyActive, setCompanyActive] = useState(true)
  //const [companyId, setCompanyId]= useState("")
  const [updatedBy, setUpdatedBy] = useState("")
  const [updatedOn, setUpdatedOn] = useState("")
  const [createdOn, setCreatedOn] = useState("")
  
  const workingModeSelect = (e) => {
    //const { value, checked } = e.target;
    e.target.value === "editMode" && setData([])
    e.target.value === "inputMode" && clearForm()
    setWorkingMode(e.target.value);
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
    setCompanyEmail("");
    setCompanyHomepage("");
    setCompanyUstID("");
    setCompanyClientID("");
    setCompanyActive(true);
    setCPDProvider(false)
    setUpdatedBy("");
    setUpdatedOn(Moment(today).format("YYYY-MM-DD"));
    setStatusSicherung("gesichert")
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

  const firmenFilteredList = async (e) => {
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
  };

  const getCompanyToReview = async (e) => {
    console.log(e.target.value);
    try {
      const companyId = e.target.value
     //console.log(companyId);
      const response = await axiosConfig.get(`/companies/${companyId}`);
      const receivedData = await response.data;
      //setData(receivedData)
      displayCompany(receivedData)
      receivedData.length === 1 && console.log(receivedData)
    } catch (error) {
      Swal.fire({
        title: "Fehler beim Aufrufen der Firma",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  const displayCompany = async (data) => {
    if (data) 
    { setAddressNature(data.addressNature);
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
      console.log(data.companyName)
    }
  };

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
      errors.push("Der Standort darf nicht leer sein");
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
        // Führe die Aktionen aus, wenn das Formular gültig ist
       /*  const formData = new FormData(e.target);
        let imgToSave;
        if (removed || !file) {
        imgToSave = null;
      } else {
        imgToSave = formData.get("imageUpload");
      } */
      
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
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const companyData = {
        companyName,
        addressNature,
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
        updatedBy: localStorage.getItem("userId"),
      };
      try {
        
        const response = await axiosConfig.patch("/company/id", companyData); 
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

  // Löschfunktion
  const deleteCompany = async (companyId) => {
    Swal.fire({
      icon: "warning",
      title: 'Soll das Untermehmen wirklich gelöscht werden?',
      showDenyButton: true,
      /* showCancelButton: true, */
      confirmButtonText: 'löschen ist ok!',
      denyButtonText: `nein, nicht löschen`,
      }).then (async (result) => {
        if (result.isConfirmed) {
          try {
            const response =  await axiosConfig.delete(`/companies/${companyId}`);
            setData([]);
            // Erfolgreich gelöscht
            Swal.fire({
              icon: "success",
              title: "Das Unternehmen wurde gelöscht.",
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
    setGotoPage("/companypage");
    firmenFilteredList();
    displayCompany()

    /* if (companyId) {
      getCompanyToReview({ target: { value: companyId } });
    } */

    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [firmenFilter, /* companyId, */ data]);

    useEffect(() => {
      if (isAuth && Array.isArray(accessRights) && accessRights.some(item => item > 1)) {
        setUserMode("manager");
      } else {
        setUserMode("user");
      }
      //console.log(userMode, typeof accessRights, (accessRights) )
  }, [accessRights, userMode, isAuth]);

 /*  useEffect(() => {
    setGotoPage("/companypage");
    authorsAvailableList();
    topicsAvailableList();
    // console.log(accessRights)
  
    if (courseId) {
      // Lade den ausgewählten Kurs
      getCourseToReview({ target: { value: courseId } });
    }
  
    if (data[0] && data[0].author) {
      setKursAutor(data[0].author.map(author => author._id));
    }
  
    const interval = setInterval(() => {
      //const updatedDate = new Date();
      setCurrentDate(new Date());
    }, 1000);
    // Aufräumen, um den Intervall zu stoppen, wenn die Komponente unmontiert wird
    return () => clearInterval(interval);
  
    if (isAuth && Array.isArray(accessRights) && accessRights.some(item => item > 1)) {
      setUserMode("manager");
    } else {
      setUserMode("user");
    }
    console.log(userMode, typeof accessRights, (accessRights) )
  
  }, [themenFilter, courseId, data, isAuth, accessRights, userMode]); */
    
  return (
    <>
      <main id="companyForm" className = {userMode}>
        <div className="headBox"> 
          <h2 id="courseHead">Eingabe / Bearbeiten von Unternehmen</h2>
          <p className="closingFunction" onClick={() => navigate("/home")}>Formular schließen</p>
        </div>
        {isAuth && Array.isArray(accessRights) && accessRights.some(item => item > 1) ? <div id="boxModusWahl">
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
          <span style={{ marginLeft: '5px' }}>Neues Unternehmen erfassen</span>
          </label>
        </div> : <></>}
        {workingMode === "editMode" && (
          <div id="firmensuche">
            <div>
              <label 
              htmlFor="sucheFirma" 
              id="themenFilterLabel"
              > Firmenfilter
              </label>
              <input 
              type="text" 
              name="sucheFirma" 
              id="sucheFirma" 
              placeholder="Firma finden - Filter eingeben" 
              value={firmenFilter}
              onDoubleClickCapture={(e) => 
                {setFirmenFilter("")}}
              /* onChange={handleFilter} */ 
              onChange={(e) =>
                {setFirmenFilter(e.target.value)}} 
              //autoComplete="off"
              />
            </div>
            <select name="firmenListe" 
            onChange={(e) => {
              getCompanyToReview(e);
              setStatusSicherung("gesichert");
            }} 
            /* onClick={getCompanyToReview} */ 
            id="firmenListe"> 
              {firmenListe.length < 1 ? 
              <option value="">kein Treffer - bitte Filter verändern</option> : 
              <option value="">bitte filtern</option>} 
              {firmenListe.map((item, index) => (
              <option key={index} value={item._id}>
              {item.Firma}</option>
              ))} 
            </select> 
          </div>
          )
        }
        {workingMode === 'inputMode' ? 
          (<form
          onSubmit={submitCompany}
          encType="multipart/form-data"
          id="companySubmitForm" className={statusSicherung}
          onChange={(e)=>{setStatusSicherung("ungesichert")}}
          >
          {statusSicherung === "ungesichert" ? <p id="änderunsgHinweis">ACHTUNG: Änderungen wurden noch nicht gesichert</p>: null}
          <div id="addressart">
            <p id="companyNature">Adressart<sup id="addressNatureSup">*</sup></p>
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
            <div id="firmentyp">
            <label htmlFor="companyType">Art des Unternehmen<sup id="companyTypeSup">*</sup></label>
            <input
              autoFocus
              type="text"
              id="companyType"
              name="companyType"
              list="auswahlCompanyType"
              value={companyType}
              placeholder="Unternehmensart"
              autoComplete="off"
              onChange={(e) => {
                setFormErrors({ ...formErrors, companyType: "" }); // Fehlermeldung zurücksetzen
              handleChangeOfData(e);
              setCompanyType(e.target.value);
            }}
            />
              <datalist id="auswahlCompanyType">
                {ListOfCompanyType.map((company, index) => (
                <option key={index} value={company.kürzel}>
                {company.discription}
                </option>
                ))}
              </datalist>
            </div> : 
            <div id="firmentyp">
            <label htmlFor="companyType">Art des Unternehmens<sup id="companyTypeSup">*</sup></label>
            <input
              disabled
              type="text"
              id="companyType"
              name="companyType"
              value={companyType}
              placeholder="Unternehmensart"
              autoComplete="off"
              onChange={(e) => {
                setFormErrors({ ...formErrors, companyType: "" }); // Fehlermeldung zurücksetzen
              handleChangeOfData(e);
              setCompanyType(e.target.value);
            }}
              />
            </div>
          }
          {addressNature ==="business" &&  
            <div id="firmenbranche">
            <label htmlFor="companyBranch">Branche</label>
            <input
              type="text"
              id="companyBranch"
              name="companyBranch"
              list="auswahlBranche"
              value={companyBranch}
              placeholder="Unternehmensbranche"
              autoComplete="off"
              onChange={(e) => {
                setFormErrors({ ...formErrors, companyBranch: "" }); // Fehlermeldung zurücksetzen
              handleChangeOfData(e);
              setCompanyBranch(e.target.value);
            }}
              />
              <datalist id="auswahlBranche">
                    {IndustryField.map((field, index) => (
                  <option key={index} value={field.brancheDe}>
                    {field.brancheDe}
                  </option>
                ))}
              </datalist>
              {formErrors.companyName && <p className="error">{formErrors.companyName}</p>}
            </div> 
          }       
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
            {formErrors.companyName && <p className="error">{formErrors.companyName}</p>}
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
          <div id="firmenanschrift">
            <label htmlFor="companyStreet">Anschrift</label>
            <input
            type="text"
            id="companyStreet"
            name="companyStreet"
            value={companyStreet}
            placeholder="Strasse"
            autoComplete="off"
            onChange={(e) => {
              setFormErrors({ ...formErrors, companyStreet: "" }); // Fehlermeldung zurücksetzen
            handleChangeOfData(e);
            setCompanyStreet(e.target.value);
            }}
            />
            {formErrors.companyStreet && <p className="error">{formErrors.companyStreet}</p>}
          </div>
          <div id="firmenplz">
            <label htmlFor="companyZip">PLZ / zip code</label>
            <input
              type="text"
              id="companyZip"
              name="companyZip"
              value={companyZip}
              placeholder="PLD / ZIPcode"
              autoComplete="off"
              onChange={(e) => {
                setFormErrors({ ...formErrors, companyZip: "" }); // Fehlermeldung zurücksetzen
              handleChangeOfData(e);
              setCompanyZip(e.target.value);
            }}
              />
              {formErrors.courseTopic && <p className="error">{formErrors.courseTopic}</p>}
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
              {formErrors.courseTopic && <p className="error">{formErrors.courseTopic}</p>}
          </div>
          <div id="ländercodeauswahl">
            <label htmlFor="companyCountryCode">Country:<sup id="companyCountryCode">*</sup></label>
            <input type= "text"
            id="companyCountryCode"
            name="companyCountryCode"
            value={companyCountryCode}
            list="countryCodeOptions"
            placeholder="CountryCode eingeben"
            onChange={(e) => {
            handleChangeOfData(e);
            setCompanyCountryCode(e.target.value);
            }} 
            onDoubleClickCapture={(e) => 
              setCompanyCountryCode("")}
            />
              < ListOfCountryCodes />            
          </div>
          <div id="linkeingabe">
            <label htmlFor="linkProvider">Homepage:</label>
              <input type= "text"
              id="companyHomepage"
              name="companyHomepage"
              value={companyHomepage}
              //placeholder="Themenfeld"
              onChange={(e) => {
              handleChangeOfData(e);
              setCompanyHomepage(e.target.value);
              }} />
          </div>
          <div id="emaileingabe">
            <label htmlFor="companyEmail">FirmenEmail:</label>
              <input type= "email"
              id="companyEmail"
              name="companyEmail"
              value={companyEmail}
              //placeholder="Themenfeld"
              onChange={(e) => {
              handleChangeOfData(e);
              setCompanyEmail(e.target.value);
              }} />
          </div>
          {accessRights.includes(5) || accessRights.includes(10) || accessRights.includes(9) ?
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
              {formErrors.courseTopic && <p className="error">{formErrors.courseTopic}</p>}
          </div>: 
            <></>
          }
          {accessRights.includes(5) || accessRights.includes(10) || accessRights.includes(9) ? 
            <div id="providerdefinition">
              <label htmlFor="cpdProvider">CPD Provider:</label>
              <input type= "checkbox"
              id="cpdProvider"
              name="cpdProvider"
              value={cpdProvider}
              onChange={(e) => {
              handleChangeOfData(e);
              setCPDProvider(e.target.checked);
              }} />
            </div> : 
            <></>
          }
          {accessRights.includes(5) || accessRights.includes(10) || accessRights.includes(9) ?
            <div id="firmaaktiv">
            <label htmlFor="companyActive">Firma / Adresse aktiv?:<sup id="activeSup">*</sup></label>
            <input type= "checkbox"
            id="companyActive"
            name="companyActive"
            checked={companyActive}
            onChange={(e) => {
            handleChangeOfData(e);
            setCompanyActive(e.target.checked);
            }} 
            />
            </div> :
            <></>
          }
          {/* {accessRights.includes(5) || accessRights.includes(10) || accessRights.includes(9) ?
          <div id="updatedbyeingabe">
            <label htmlFor="updatedBy">zuletzt updated von:</label>
            <output         
            id="updatedBy"
            name="updatedBy"
            >
            {userData.firstName} {userData.lastName}
            </output>
          </div>
          :
          <></>
          } */}
          {statusSicherung === "ungesichert" ? (<div id="buttonBox">
            <button className="buttonBasics" type="submit" value="senden" >senden</button>
            <button className="buttonBasics" type="reset" onClick={clearForm}>reset Daten</button>
          </div>) : (<p>Noch keine Daten eingegeben</p>)}
          </form>) : 
          (data  ?
            <form id="companyDisplayForm" className={statusSicherung}>
              { statusSicherung === "ungesichert" ? <p id="änderunsgHinweis">Änderungen wurden noch nicht gesichert</p>: null}
              <div id="addressart">
            <p id="companyNature">Adressart<sup id="addressNatureSup">*</sup></p>
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
            <div id="firmentyp">
              <label htmlFor="companyType">Art des Unternehmens<sup id="companyTypeSup">*</sup></label>
              <input
              autoFocus
              type="text"
              id="companyType"
              name="companyType"
              list="auswahlCompanyType"
              value={companyType}
              placeholder="Unternehmensart"
              autoComplete="off"
              onChange={(e) => {
                setFormErrors({ ...formErrors, companyType: "" }); // Fehlermeldung zurücksetzen
                handleChangeOfData(e);
                setCompanyType(e.target.value);
              }}
              />
              <datalist id="auswahlCompanyType">
                    {ListOfCompanyType.map((company, index) => (
                  <option key={index} value={company.kürzel}>
                    {company.discription}
                  </option>
                ))}
              </datalist>
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
              {formErrors.companyName && <p className="error">{formErrors.companyName}</p>}
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
              <div id="firmenanschrift">
            <label htmlFor="companyStreet">Anschrift</label>
            <input
            type="text"
            id="companyStreet"
            name="companyStreet"
            value={companyStreet}
            placeholder="Strasse"
            autoComplete="off"
            onChange={(e) => {
              setFormErrors({ ...formErrors, companyStreet: "" }); // Fehlermeldung zurücksetzen
            handleChangeOfData(e);
            setCompanyStreet(e.target.value);
            }}
            />
            {formErrors.companyStreet && <p className="error">{formErrors.companyStreet}</p>}
              </div>
              <div id="firmenplz">
                <label htmlFor="companyZip">PLZ / zip code</label>
                <input
                  type="text"
                  id="companyZip"
                  name="companyZip"
                  value={companyZip}
                  placeholder="PLD / ZIPcode"
                  autoComplete="off"
                  onChange={(e) => {
                    setFormErrors({ ...formErrors, companyZip: "" }); // Fehlermeldung zurücksetzen
                  handleChangeOfData(e);
                  setCompanyZip(e.target.value);
                }}
                  />
                  {formErrors.courseTopic && <p className="error">{formErrors.courseTopic}</p>}
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
                  {formErrors.courseTopic && <p className="error">{formErrors.courseTopic}</p>}
              </div>
              <div id="ländercodeauswahl">
            <label htmlFor="companyCountryCode">Country:<sup id="companyCountryCode">*</sup></label>
            <input type= "text"
            id="companyCountryCode"
            name="companyCountryCode"
            value={companyCountryCode}
            list="countryCodeOptions"
            placeholder="CountryCode eingeben"
            onChange={(e) => {
            handleChangeOfData(e);
            setCompanyCountryCode(e.target.value);
            }} 
            onDoubleClickCapture={(e) => 
              setCompanyCountryCode("")}
            />
              < ListOfCountryCodes />            
              </div>
              <div id="homepageeingabe">
                <label htmlFor="linkProvider">Homepage:</label>
                  <input type= "url"
                  id="companyHomepage"
                  name="companyHomepage"
                  value={companyHomepage}
                  //placeholder="Themenfeld"
                  onDoubleClickCapture={(e) => 
                    {setCompanyHomepage("");
                    setStatusSicherung("ungesichert")}}
                  onChange={(e) => {
                  handleChangeOfData(e);
                  setCompanyHomepage(e.target.value);
                  }} />
              </div>
              <div id="providerdefinition">
                <label htmlFor="cpdProvider">CPD Provider:</label>
                <input type= "checkbox"
                id="cpdProvider"
                name="cpdProvider"
                value={cpdProvider}
                onChange={(e) => {
                handleChangeOfData(e);
                setCPDProvider(e.target.checked);
                }} />
              </div>          
              <div id="firmenaktivierung">
                <label htmlFor="companyActive">Adresse aktiv:</label>
                {/* <p id="kursActivated">{data[0].active === true ? "aktiviert" : "nicht aktiv"}</p> */}
                <input type= "checkbox"
                id="companyActive"
                name="companyActive"
                checked={companyActive}
                onChange={(e) => {
                handleChangeOfData(e);
                setCompanyActive(e.target.checked);
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
                <output         
                id="updatedOn"
                name="updatedOn"
                >{Moment(updatedOn).format("DD.MMMM.YYYY")}
                </output>
              </div>
              {/* <div id="updatedby">
                <label htmlFor="updatedBy">Zuletz aktualisiert von:</label>
                <output         
                id="updatedBy"
                name="updatedBy"
                >{updatedBy.firstName} {updatedBy.lastName}
                </output>
              </div> */}
              <div id="buttonBox">
              {data && <button onClick={() => deleteCompany(companyClientID)}>Unternehmen löschen</button>}
                {statusSicherung === "ungesichert" && <button onClick={updateCompany}>Änderungen speichern</button>}
              </div>
            </form> 
            : 
            <div id="companyEditForm" >Bitte Datensatz suchen und auswählen</div>
          )
        } 
      </main>

    </>
  )
}

export default CompanyPage
