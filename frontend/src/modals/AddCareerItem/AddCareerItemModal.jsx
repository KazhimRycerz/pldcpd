
import React, { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { Button } from 'antd';
import axiosConfig from "../../util/axiosConfig.js";
import Modal from 'react-modal';
import Swal from "sweetalert2";
import "./AddCareerItemModal.scss";
import { CloseOutlined, EditOutlined, SaveOutlined, StopOutlined, UploadOutlined  } from "@ant-design/icons";
import { SectionsContext } from "../../context/SectionsContext.js";
import FirmensucherModal from "../../modals/Firmensucher/FirmensucherModal.jsx"

Modal.setAppElement('#root');

//ergänzen einer CV-Station
const AddCareerItemModal = ({ 
   isOpen, 
   onRequestClose
   }) => {


   const { contactData, isAuth, accessRights, navigate, userMode, setUserMode } = useContext(SectionsContext);
   const [data, setData] = useState([null])
   const [firmenFilter, setFirmenFilter] = useState('')
   const [firmenListe, setFirmenListe] = useState([])
   const [statusSicherung, setStatusSicherung] = useState("gesichert")
   const [isFirmensucherModalOpen, setIsFirmensucherModalOpen] = useState(false)

   const [companyID, setCompanyID] =useState("")
   const [companyName, setCompanyName] = useState("");
   const [department, setDepartment] =useState("");
   const [position, setPosition] = useState("");
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");
   const [activated, setActivated] = useState(false);
   const [typeOfValue, setTypeOfValue] = useState("")

   const firmenFilteredList = useCallback(async (e) => {
      try {
        const response = await axiosConfig.get("/companies");
        const receivedData = response.data;
        const filteredData = receivedData.filter(entry => entry.companyName.toLowerCase().includes(firmenFilter.toLowerCase()));
        // Erstelle ein Array von Objekten mit _id und Thema aus den gefilterten Daten
        const firmenArray = receivedData.map(receivedData => ({
          _id: receivedData._id,
          Firma: (
              // Filtere die Daten basierend auf dem aktuellen Wert von filter
              <>
              {receivedData.companyName} in {receivedData.companyCity} in {receivedData.companyCountryCode}
            </>
          )
        }));
        console.log(receivedData)
        // Aktualisiere den Zustand mit den gefilterten Themen
        setFirmenListe(firmenArray);
        console.log(firmenListe.Firma)
      } catch (error) {
        // Handle den Fehler, z.B. mit einer Benachrichtigung
        Swal.fire({
          title: "Fehler beim Abrufen der Firmen",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    }, [firmenFilter]);

   const validateForm = () => {
        const errors = [];
        // Validierung für die Firmeneingabe
        if (companyID) {
          errors.push("Addressart muss definiert werden");
        }
        if (position.trim() === "") {
        errors.push("Bitte Funktion eingeben");
        }
        if (startDate.trim() === "") {
        errors.push("Bitte Startdatum eingeben");
        }
        // if (companyStreet.trim() === "") {
        //   errors.push(" Die Anschrift darf nicht leer sein darf nicht leer sein");
        // }
        // if (companyCity.trim() === "") {
        //   errors.push("Der Ort darf nicht leer sein");
        // }
        // if (companyCountryCode === "") {
        //   errors.push("Das Feld Ländercode darf nicht leer sein");
        // }
        //  if (errors.length > 5) {
        //   Swal.fire({
        //     title: "Bitte zunächst Daten eingeben",
        //     icon: "error",
        //     confirmButtonText: "OK"
        //   });
        //   return false; // Die Validierung ist fehlgeschlagen
        // }
    
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

   const clearForm = () => {
    [
      setCompanyID,
      setDepartment,   
      setPosition,
      setStartDate,
      setEndDate,
      setTypeOfValue,
      //setUpdatedBy,
      //setUpdatedOn
    ].forEach(fn => fn(""));

    setActivated(false);
    setStatusSicherung("gesichert");
    setData([null]);
   };

   const submitCareerItem = async (e) => {
      e.preventDefault();
      const isValid = validateForm();
      if (isValid) {
        const careerItemData = {
          companyID,
          department,
          position,
          startDate,
          endDate,
          activated,
          typeOfValue,        
          updatedBy: localStorage.getItem("userId"),
          user: localStorage.getItem("userId"),
        };     
      /*try {
          const response = await axiosConfig.post("/careers", careerItemData,
          );
          setStatusSicherung("gesichert")
          //console.log("reponsData", response.data);
          Swal.fire({
            title: "Der Karriereschritt wurde erfolgreich registriert!",
            text: "Was willst du als nächstes tun?",
            icon: "success",
            showConfirmButton: true,
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonText: 'weiteren Schritt anlegen',
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
          }*/
      }
    };

    
  useEffect(() => {
    firmenFilteredList(); // wird nur einmal aufgerufen
}, []);

   return (
      <Modal                   
         isOpen={isOpen} 
         onRequestClose={onRequestClose}
         className="modal" 
         overlayClassName="overlay"
         closeTimeoutMS={400} // <- Wichtig für Animation!
         >
         <div id="addCareerTrackModal">
         
         <div className= "headBox">
          <h2> Karriereschritt auswählen</h2>
          {/* < CloseOutlined className="closeX" onClick={() => onRequestClose()}> </CloseOutlined>  */}
        <FirmensucherModal
        // open={isFirmensucherModalOpen}
        // onCancel={setIsFirmensucherModalOpen(false)}
        > test </FirmensucherModal>

        </div>
        <form id="companyDisplayForm" className={statusSicherung}
          //onSubmit={submitCVItem}
          encType="multipart/form-data">
         <div id="companyFeld">
              <label htmlFor="companyName">Firma/Institution<sup id="courseTopicSup">*</sup></label>
              <input
              // disabled
                type="text"
                id="companyName"
                name="companyName"
                //value={companyName}
                placeholder="Firmenname"
                autoComplete="off"
                autoFocus
                //onChange={(e) => {
                //setFormErrors({ ...formErrors, companyName: "" }); // Fehlermeldung zurücksetzen
                //handleChangeOfData(e);
                //setCompanyName(e.target.value);
                //}}
                />
                {/* {formErrors.companyName && <p className="error">{formErrors.companyName}</p>} */}
         </div>
         <div id="departmentFeld">
            <label htmlFor="department">Abteilung<sup id="deparrtmentSup">*</sup></label>
            <input
            // disabled
               type="text"
               id="Abteilung"
               name="department"
               //value={companyName}
               placeholder="Abteilung"
               autoComplete="off"
               autoFocus
               //onChange={(e) => {
               //setFormErrors({ ...formErrors, companyName: "" }); // Fehlermeldung zurücksetzen
               //handleChangeOfData(e);
               //setCompanyName(e.target.value);
               //}}
               />
               {/* {formErrors.companyName && <p className="error">{formErrors.companyName}</p>} */}
         </div>
         <div id="positionFeld">
            <label htmlFor="position">Position<sup id="positionSup">*</sup></label>
            <input
            // disabled
               type="text"
               id="position"
               name="position"
               //value={companyName}
               placeholder="Funktion"
               autoComplete="off"
               autoFocus
               //onChange={(e) => {
               //setFormErrors({ ...formErrors, companyName: "" }); // Fehlermeldung zurücksetzen
               //handleChangeOfData(e);
               //setCompanyName(e.target.value);
               //}}
               />
               {/* {formErrors.companyName && <p className="error">{formErrors.companyName}</p>} */}
         </div>
         <div id="startDateFeld">
            <label htmlFor="startDate">StartDate<sup id="startDateSup">*</sup></label>
            <input
            // disabled
               type="datum"
               id="startDate"
               name="startDate"
               //value={companyName}
               placeholder="startDate"
               autoComplete="off"
               autoFocus
               //onChange={(e) => {
               //setFormErrors({ ...formErrors, companyName: "" }); // Fehlermeldung zurücksetzen
               //handleChangeOfData(e);
               //setCompanyName(e.target.value);
               //}}
               />
               {/* {formErrors.companyName && <p className="error">{formErrors.companyName}</p>} */}
         </div>
         <div id="endDateFeld">
            <label htmlFor="endDate">endDate<sup id="endDateSup">*</sup></label>
            <input
            // disabled
               type="datum"
               id="endDate"
               name="endtDate"
               //value={companyName}
               placeholder="endDate"
               autoComplete="off"
               autoFocus
               //onChange={(e) => {
               //setFormErrors({ ...formErrors, companyName: "" }); // Fehlermeldung zurücksetzen
               //handleChangeOfData(e);
               //setCompanyName(e.target.value);
               //}}
               />
               {/* {formErrors.companyName && <p className="error">{formErrors.companyName}</p>} */}
         </div>
         <div id="activatedFeld">
            <label htmlFor="activated">endDate<sup id="activatedSup">*</sup></label>
            <input
            // disabled
               type="checkbox"
               id="activated"
               name="activated"
               //value={activated}
               placeholder="activated"
               autoComplete="off"
               autoFocus
               //onChange={(e) => {
               //setFormErrors({ ...formErrors, companyName: "" }); // Fehlermeldung zurücksetzen
               //handleChangeOfData(e);
               //setCompanyName(e.target.value);
               //}}
               />
               {/* {formErrors.companyName && <p className="error">{formErrors.companyName}</p>} */}
         </div>
         <div id="typeOfValueFeld">
            <label htmlFor="typeOfValue">Typ der Berechnung<sup id="typeOfValueSup">*</sup></label>
            <input
            // disabled
               type="text"
               id="typeOfValue"
               name="typeOfValue"
               //value={activated}
               placeholder="typeOfValue"
               autoComplete="off"
               autoFocus
               //onChange={(e) => {
               //setFormErrors({ ...formErrors, companyName: "" }); // Fehlermeldung zurücksetzen
               //handleChangeOfData(e);
               //setCompanyName(e.target.value);
               //}}
               />
               {/* {formErrors.companyName && <p className="error">{formErrors.companyName}</p>} */}
         </div>
        </form>
         
         
           <button className="buttonBasics pFunction" onClick={() =>{onRequestClose()}}>
             Abbrechen
           </button>
           
         <button 
              type="submit" 
              className="buttonBasics pFunction" 
              //onClick={submitCompany} 
              //disabled={isFormEmpty ? true : false}
            >
              speichern
          </button>
         
         </div>
      </Modal>
     );
   }
   
   export default AddCareerItemModal  ;