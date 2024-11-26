import './KnowledgeAccountMain.scss'
import { useContext, useState, useEffect} from "react";
import { SectionsContext } from "../../context/SectionsContext.js";
import { EditOutlined, SaveOutlined, StopOutlined, CloseOutlined } from "@ant-design/icons";
import axiosConfig from "../../util/axiosConfig";
import Moment from "moment";
import Swal from "sweetalert2";
//import baseURL from "../../util/constants.js"
import UserAvatar from "../UserAvatar/UserAvatar.jsx"
import { Tooltip, getTooltipText } from "../../components/Tooltips/Tooltips.js"
import { AvatarSliderModal } from "../../modals/Slider/SliderModal.jsx"
import Countdown from "../Countdown/Countdown.jsx";

//import UpdateUserModal from "../../modals/UserUpdate/UserUpdateModal.jsx"
//import ImageUpload from '../ImageUpload/ImageUpload.jsx';

const  KnowledgeAccountMain = () =>{
   const { isAuth,
      userData, getUserData, 
      careerData, 
      cpdData, 
      authorsData, 
      companyData, 
      contactData, 
      marketData, 
      knowledgeData, 
      buttonPos, setButtonPos, 
      asidePos, setAsidePos, 
      gotoPage,
      objectSize, setObjectSize,
      saveUserSettings,
      location,
      navigate } = useContext(SectionsContext);

   //const [showPassword, setShowPassword] = useState(false);
   const [openSections, setOpenSections] = useState([]);
   //const [selectedImage, setSelectedImage] = useState(null);
   const [isSliderModalOpen, setIsSliderModalOpen] = useState(false);
   //const [updateUserModalIsOpen, setUpdateUserModalIsOpen] = useState(false);
   const [refreshData, setRefreshData] = useState({});

  const [editUserName, setEditUserName] = useState(false);
  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [editGender, setEditGender] = useState(false);

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [genderName, setGenderName] = useState("");

  const [editInputName, setEditInputName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [changeUserData, setChangeUserData] = useState(false);
  const [changeContactData, setChangeContactData] = useState(false);
  const [changeAuthorsData, setChangeAuthorsData] = useState(false);
  const [changeAccountData, setChangeAccountData] = useState(false);
  const [changeProfessionalStatus, setChangeProfessionalStatus] = useState(false);

  const [dropdownToggleIsOpen, setDropdownToggleIsOpen] = useState({});

//   const toggleDropdowns = () => {
//    setCPDToggleIsOpen(!CPDToggleIsOpen); 
// };

   //Toggle Sections to open / close
   const toggleSection = (sectionId) => {
      setOpenSections((prevOpenSections) => {
         //console.log(prevOpenSections, sectionId)
         if (prevOpenSections.includes(sectionId)) {
         return prevOpenSections.filter((section) => section !== sectionId);
         } else {
         return [...prevOpenSections, sectionId];
         };
      });
   };
   //Dropdowns in den Sections
   const toggleDropdowns = (id) => {
      setDropdownToggleIsOpen((prevState) => ({
         ...prevState,
         [id]: !prevState[id], // Zustand der spezifischen ID toggeln
      }));
   };
   
   const dataEingabeAbbrechen = () => {
   setChangeUserData(false);
   setChangeAuthorsData(false)
   setChangeContactData(false)
   setChangeAccountData(false)
   setChangeProfessionalStatus(false)
   setEditUserName(false);
   setEditFirstName(false);
   setEditLastName(false);
   setEditEmail(false);
   setEditPassword(false);
   }

   const handleErrorMessage = (data) => {
   switch (data) {
      case "Benutzername":
         setErrorMessage(
         "Ihr Benutzername muss zwischen 4 und 20 Zeichen lang sein"
         );
         break;
      case "Email":
         setErrorMessage("Geben Sie bitte eine gültige Email-Adresse ein");
         break;
      case "Passwort":
         setErrorMessage(
         "Ihr Passwort muss mindestens 8 Zeichen lang sein und eine Zahl, einen Groß- und einen Kleinbuchstaben enthalten."
         );
         break;
      case "Vorname":
         setErrorMessage("Bitte geben Sie Ihren Vornamen ein");
         break;
      case "Nachname":
         setErrorMessage("Bitte geben Sie ihren Nachnamen ein");
         break;
      case "Wohnort":
         setErrorMessage("Bitte geben Sie Ihre Stadt ein");
         break;
      default:
         setErrorMessage("");
         break;
   }
   };
  
   const updateUser = async (data) => {
   const userId = localStorage.getItem("userId")
   try {
      const axiosResp = await axiosConfig.patch(
         `/user/edit/${userId}`,
         data
      );
      setRefreshData(axiosResp.data);
      Swal.fire({
         title: `${editInputName} erfolgreich geändert!!`,
         icon: "success",
         confirmButtonText: 'OK',
      });
      refreshData ? getUserData() : getUserData();
      setEditUserName(false);
      setEditFirstName(false);
      setEditLastName(false);
      setEditEmail(false);
      setEditPassword(false);
      setChangeUserData(false);
      setChangeAuthorsData(false);
      setChangeContactData(false);
      setChangeAccountData(false);
      setChangeProfessionalStatus(false);
      
   } catch (error) {
      Swal.fire({
         title: "Ein Fehler ist aufgetreten.",
         text: errorMessage,
         icon: "error",
         confirmButtonText: 'OK',
      });
      setEditUserName(false);
      setEditFirstName(false);
      setEditLastName(false);
      setEditEmail(false);
      setEditPassword(false);
      console.log(error);
   }
   };
  
   const updateUserPassword = async (data) => {
   try {
      const axiosResp = await axiosConfig.patch(
         `/user/password/${localStorage.getItem("userId")}`,
         data
      );
      setRefreshData(axiosResp.data);
      Swal.fire({
         title: `${editInputName} erfolgreich geändert!!`,
         icon: "success",
         confirmButtonText: 'OK',
      });
      refreshData ? getUserData() : getUserData();
      setEditPassword(false);
   } catch (error) {
      Swal.fire({
         title: "Da ist ein Fehler aufgetreten.",
         text: errorMessage,
         icon: "error",
         confirmButtonText: 'OK',
      });
      setEditPassword(false);
      console.log(error);
   }
   };

   // Handling of Imagesize
   const handleSizeChange = (e) => {
   setObjectSize(e.target.value);
   saveUserSettings(e.target.value)
   };
  
   // Handling to open sections
   useEffect(() => {
      if (location.state?.openSection) {
         setOpenSections(location.state.openSection);
      }
   }, [location.state]);

   // Button Positions Check Sidebox
   useEffect(() => {
      const buttonPosCheck = () =>{ // buttonPosCheck nicht löschen!!!!
         if (isAuth && gotoPage==="/home") {setButtonPos("showBut"); setAsidePos("accountAside") //ok
      } else {setButtonPos(buttonPos); setAsidePos(asidePos)
      }}
   }, [isAuth, asidePos, buttonPos, gotoPage, setAsidePos, setButtonPos]);
 
   /* // Passwort zeigen oder verschleiern
   const toggleShowPassword = () => {
      setShowPassword(prevShowPassword => !prevShowPassword);
    }; */
    
    // Knwoldge Datensatz zu dem User anlegen
   const addKnowledgeDatensatz = async () => {
      //e.preventDefault();       
      const contactID = contactData._id;   
      try {
         const response = await axiosConfig.post("/professionalStatus", {contactID});
         //console.log("reponsData", response.data);
         Swal.fire({
         title: "Der Knowledgedatensatz wurde erfolgreich erstellt!",
         icon: "success",
         showConfirmButton: true,
         confirmButtonText: 'OK'
         }) /*.then(() => {
         getUserData();
         window.location.reload();
         }) */
         } catch (error) {
         console.error(error);
         Swal.fire({
            title: "Es ist ein Fehler aufgetreten. Der Datensatz wurde nicht angelegt.",
            icon: "error",
            confirmButtonText: "OK"
         });
         }
   };
            
   return (
      <main id="accountMain" /* onClick={() => getUserData()} */>
         <div /* id="Gruß_account"  */className= "headBox">
            <h2> Ihre Kontodaten im Überblick</h2>
            {/* <p className="closingFunction" onClick={() => navigate("/home")}>Formular schließen</p> */}
         </div>
         < CloseOutlined className="closeX" onClick={() => navigate("/home")}> </CloseOutlined>
         <div id="welcomeLine">
            <div><h3>Konto und Daten von {userData.firstName} {userData.lastName}</h3></div>
         </div>

         <section id="account_1" style={!openSections.includes("account_1") ? { backgroundColor: 'rgba(221, 155, 55, 0.2)' } : {}}>
            <div className="accountHead" id="account_1_head" >
               <h3 onClick={() => {toggleSection("account_1"); setChangeProfessionalStatus(false); dropdownToggleIsOpen["dropdownProfessionalData"] && toggleDropdowns("dropdownProfessionalData")}}>Ihr Berufsstatus</h3>

               {openSections.includes("account_1") &&                  
               <div className={`dropdownContainer ${
                     dropdownToggleIsOpen["dropdownProfessionalData"] ? "activeC" : ""
                  }`}>
                     <p
                        className={`pFunction ${
                           dropdownToggleIsOpen["dropdownProfessionalData"] ? "activeP" : ""
                        }`}
                        onClick={() => toggleDropdowns("dropdownProfessionalData")} // Callback richtig binden
                     >Aktionen {/* Dropdown-Kopf */}
                        <span style={{ marginLeft: "8px" }}>
                           {/* {CPDToggleIsOpen["dropdownCPDTracker"] ? "▲" : "▼"} */}
                        </span>
                     </p>
                     
                     <div className={`dropdownContent ${
                        dropdownToggleIsOpen["dropdownProfessionalData"] ? "active" : ""
                     }`}>
                        {openSections.includes("account_1") && 
                        (<p className="pFunction" onClick={() => getUserData()}> aktualisieren
                        </p>)
                        }
                        {changeProfessionalStatus === false ? 
                        (<p onClick={() => {setChangeProfessionalStatus(true);toggleDropdowns("dropdownProfessionalData")}} className="pFunction">
                        Daten ändern</p>) : (<p onClick={() => {dataEingabeAbbrechen(); toggleDropdowns("dropdownProfessionalData")}}className="pFunction">
                        Daten sichern</p>)}
                        <p onClick={() => {toggleDropdowns("dropdownProfessionalData"); setChangeProfessionalStatus(false)}} // Eingabe
                        className="pFunction"
                        >abbrechen
                        </p>
                        <p 
                        onClick={() => {
                        setChangeProfessionalStatus(false);
                        toggleDropdowns("dropdownProfessionalData");
                        toggleSection("account_1");
                        }} // Schließen
                        className="pFunction"
                        >schließen
                        </p>
                     </div>
                     
               </div>  	 
               }
            </div>
            {openSections.includes("account_1") && (
            <div className="accountData" id="account_1_data">
               <div>
                  <div>
                     <p className="fieldName">Ihr Beruf</p> 
                     {/* {knowledgeData ? (<div className="output" id="profession">{knowledgeData.profession}</div>) : (<div className="output" id="profession">(0)</div>)} */}
                     <div className="output" id="profession">
                     {knowledgeData ? <p>{knowledgeData.profession}</p> 
                     : <p>Ihr Beruf wurde noch nicht aktualisiert</p>}
                     </div>
                  </div>
                  <div>
                     <p className="fieldName">aktuelle Firma</p>
                     {companyData ? (<div className="output" id="company"><p>{companyData.companyName}</p> <p>{companyData.companyCity} / {companyData.companyCountryCode}</p> <p>{companyData.companyHomepage}</p></div>) : (<div className="output" id="company"><p>Ihre Firma wurde noch nicht eingegeben</p></div>)}
                  </div>                  
               </div>
               <div>
                  <div>
                     <p className="fieldName">Karrierelevel</p>
                     <div className="output" id="myCL"> 
                     {knowledgeData && knowledgeData.myCPDLevel ? (
                     <p>{knowledgeData.myCPDLevel.level} von 9</p>
                  ) : (
                     <p>Ihr Datensatz wurde noch nicht angelegt</p>
                  )}
                     </div> 
                  </div> 
                  <div id="myCPDStatus">
                     <div>
                        {knowledgeData && knowledgeData.myCPDLevel ? (<p id="account_1_p">{knowledgeData.myCPDLevel.description}</p>) : (<p></p>)}
                     </div>
                  </div>
               </div>

               <div>
                  <div>
                     <p className="fieldName">beruflich aktiv seit </p>
                     <div className="output" id="my_active"> 
                        {knowledgeData ? <p>{Moment(knowledgeData.professionalSince).format("DD.MM.YYYY")}</p> : <p>Info fehlt</p>}
                     </div>
                  </div>
                  <div>
                     <p className="fieldName">CPD-aktiv seit</p>
                        <div className="output" id="my_start"> 
                        {knowledgeData ? <p>{Moment(knowledgeData.cpdActiveSince).format("DD.MM.YYYY")}</p> : <p>Info fehlt</p>}
                     </div>
                  </div>
                  <div>
                     <p className="fieldName">letztes Update </p>
                     <div className="output" id="my_active"> 
                     {knowledgeData ? <p>{Moment(knowledgeData.updatedOn).format("DD.MM.YYYY")}</p> : <p>Info fehlt</p>}
                     </div>
                  </div>
               </div>

               <div>
               </div> 
            </div>
            )}
         </section>

         <section id="account_3" style={!openSections.includes("account_3") ? { backgroundColor: 'rgba(221, 155, 55, 0.2)' } : {}}>
            <div className="accountHead" id="account_3_head" >
               <h3 //onClick={() => toggleSection("account_3")}
                  onClick={() => {toggleSection("account_3");dropdownToggleIsOpen["dropdownCPDStatus"] && toggleDropdowns("dropdownCPDStatus")}}>Ihr CPD-Status</h3>
               {/* {!knowledgeData && (
                  <p onClick={addKnowledgeDatensatz}>
                  <span className="C">C </span>
                  Datensatz anlegen
                  </p>
               )}
               {openSections.includes("account_3") && (<p className="pFunction" onClick={() => getUserData()}>
                  Daten aktualisieren
                  </p>)} */}
                  {openSections.includes("account_3") && 
               <>
                  <div //className="dropdownContainer"
                  className={`dropdownContainer ${
                     dropdownToggleIsOpen["dropdownCPDStatus"] ? "activeC" : ""
                  }`}>
                     <p
                        //className="pFunction"
                        className={`pFunction ${
                           dropdownToggleIsOpen["dropdownCPDStatus"] ? "activeP" : ""
                        }`}
                        onClick={() => toggleDropdowns("dropdownCPDStatus")} // Callback richtig binden
                        >Aktionen {/* Dropdown-Kopf */}
                        <span style={{ marginLeft: "8px" }}>
                           {/* {CPDToggleIsOpen["dropdownCPDTracker"] ? "▲" : "▼"} */}
                        </span>
                     </p>
                     <div
                        className={`dropdownContent ${
                           dropdownToggleIsOpen["dropdownCPDStatus"] ? "active" : ""
                        }`}
                        >
                        {!knowledgeData && (
                        <p onClick={addKnowledgeDatensatz}>
                        <span className="C">C </span>
                        Basis anlegen
                        </p>
                        )}
                        {openSections.includes("account_3") && 
                        (<p className="pFunction" onClick={() => getUserData()}> aktualisieren
                        </p>)
                        }
                        <p
                        onClick={() => toggleDropdowns("dropdownCPDStatus")}
                        className="pFunction"
                        > abbrechen
                        </p>
                        <p
                        onClick={() => {
                           toggleDropdowns("dropdownCPDStatus");
                           toggleSection("account_3");
                        }}
                        className="pFunction"
                        > schließen
                        </p>
                     </div>
                  </div>
               </>
               }
            </div>
                        
            {openSections.includes("account_3") && (
            <>
               <div id="account_3_data">
                  <div className="account_3">
                     <div>
                        <h2>KF</h2>
                        <p>Knowledge<br />Factor</p>
                     </div>
                     <div className="account_data_box">
                        {knowledgeData ? <output className="account_pers_data" id="myKF">{knowledgeData.myKF}</output> : <output className="account_pers_data" id="myKF">0</output>}
                        <output className="account_market_data" id="maKF">{marketData.maKF}</output>
                     </div>
                  </div>

                  <div className="account_3">
                     <div>
                        <h2>LF</h2>
                        <p>Learning<br />Factor</p>
                     </div>
                     <div className="account_data_box">
                        {knowledgeData ? <output className="account_pers_data" id="myLF">{knowledgeData.myLF}</output> : <output className="account_pers_data" id="myLF">0</output>}
                        <output className="account_market_data" id="maLF">{marketData.maLF}</output>
                     </div>
                  </div>

                  <div className="account_3">
                     <div>
                        <h2>PEX</h2>
                        <p>Professional<br />Experience</p>
                     </div>
                     <div className="account_data_box">
                        {knowledgeData ? <output className="account_pers_data" id="myPEX">{knowledgeData.myPEXh}</output> : <output className="account_pers_data" id="myPEX">0</output>}
                        <output className="account_market_data" id="maPEX">{marketData.maPEXh}</output>
                     </div>
                  </div>

                  <div className="account_3">
                     <div>
                        <h2>PED</h2>
                        <p>Professional<br />Education</p>
                     </div>
                     <div className="account_data_box">
                     {knowledgeData ? <output className="account_pers_data" id="myPED">{knowledgeData.myPEDh}</output> : <output className="account_pers_data" id="myPED">0</output>}
                        <output className="account_market_data" id="maPED">{marketData.maPEDh}</output>
                     </div>
                  </div>

                  <div className="account_3">
                     <div>
                        <h2>LP</h2>
                        <p>Learning<br />Points</p>
                     </div>
                     <div className="account_data_box">
                     {knowledgeData ? <output className="account_pers_data" id="myLP">{knowledgeData.myLP}</output> : <output className="account_pers_data" id="myLP">0</output>}
                        <output className="account_market_data" id="maLP">{marketData.maLP}</output>
                     </div>
                  </div>

                  <div className="account_3">
                     <div>
                        <h2>PA</h2>
                        <p>Professional<br />Activity</p>
                     </div>
                     <div className="account_data_box">
                        {knowledgeData ? <output className="account_pers_data" id="myPA">{knowledgeData.myPA}</output> : <output className="account_pers_data" id="myPA">0</output> }
                        <output className="account_market_data" id="maPA">{marketData.maPA}</output>
                     </div>
                  </div>
               </div>
               <p> Die Zahlen zeigen Ihnen die Durchschnittswerte im internationalen Lichtdesignermarkt aller Teilnehmer an.</p>
            </>
            )}
            
         </section>
         
         <section id="account_6" style={!openSections.includes("account_6") ? { backgroundColor: 'rgba(221, 155, 55, 0.2)' } : {}}>
            <div className="accountHead" id="account_6_head" >
               <h3 onClick={() => {toggleSection("account_6");dropdownToggleIsOpen["dropdownCPDTracker"] && toggleDropdowns("dropdownCPDTracker")}}>Ihr CPD-Tracker</h3>
               {openSections.includes("account_6") && 
               <>
                  <p>Sie haben {cpdData.length} Kurse gelistet</p>
                  <div //className="dropdownContainer"
                  className={`dropdownContainer ${
                     dropdownToggleIsOpen["dropdownCPDTracker"] ? "activeC" : ""
                  }`}>
                     <p
                     //className="pFunction"
                     className={`pFunction ${
                        dropdownToggleIsOpen["dropdownCPDTracker"] ? "activeP" : ""
                     }`}
                     onClick={() => toggleDropdowns("dropdownCPDTracker")} // Callback richtig binden
                     >Aktionen {/* Dropdown-Kopf */}
                     <span style={{ marginLeft: "8px" }}>
                        {/* {CPDToggleIsOpen["dropdownCPDTracker"] ? "▲" : "▼"} */}
                     </span>
                     </p>
                     <div
                        className={`dropdownContent ${
                           dropdownToggleIsOpen["dropdownCPDTracker"] ? "active" : ""
                        }`}
                        >
                        <p onClick={() => console.log("Aktualisieren")} className="pFunction">
                           aktualisieren
                        </p>
                        <p
                        onClick={() => navigate("courselistpage")} // Navigation
                        className="pFunction"
                        >
                        Kursangebote
                        </p>
                        <p
                        onClick={() => toggleDropdowns("dropdownCPDTracker")}
                        className="pFunction"
                        >
                        Eingabe
                        </p>
                        <p
                        onClick={() => toggleDropdowns("dropdownCPDTracker")}
                        className="pFunction"
                        >
                        Daten öffnen
                        </p>
                        <p
                        onClick={() => toggleDropdowns("dropdownCPDTracker")}
                        className="pFunction"
                        >
                        abbrechen
                        </p>
                        <p
                        onClick={() => {
                           toggleDropdowns("dropdownCPDTracker");
                           toggleSection("account_6");
                        }}
                        className="pFunction"
                        >
                        schließen
                        </p>
                     </div>
                  </div>
               </>
               }
            </div>
            {openSections.includes("account_6") && (
            <div className="accountData" id="account_6_data">
               <table id="cpdTrackerTable">
                  <thead>
                     <tr>
                        <th >
                           {/* <Tooltip text="LEO = Learning Opportunity, CRE = Creating an education opportunity,  PAC = professional Activity">
                           <span style={{ marginLeft: '0px', cursor: 'pointer' }}>Typ</span>
                           </Tooltip> */}
                           Typ
                        </th>
                        <th>Activity</th>
                        <th>Thema</th>
                        <th>LPs <br/>basic</th>
                        <th>LPs <br/>plus</th>
                        <th>LPs <br/>total</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>status of CPD</th>
                        {/* <th>Request for evaluation</th>
                        <th>Verified</th> */}
                        <th>Value date</th>
                        <th>aktiv</th>
                        
                     </tr>
                  </thead>
                  <tbody>
                     {cpdData.sort((a, b) => {
                        const dateA = new Date(a.startDate);
                        const dateB = new Date(b.startDate);
                        return dateA - dateB; // Aufsteigend sortieren
                     }).map((item) => {
                        return(
                           <tr key={item._id}>
                           <td>
                              <Tooltip text={getTooltipText(item.activityType)}>
                                 <span style={{ top: "100%", left:"100%", marginLeft: '0px', cursor: 'pointer' }}>{item.activityType || 'N/A'}</span>
                              </Tooltip>
                           </td>
                           <td>{item.courseId?.courseType || 'N/A'}</td>
                           <td>{item.courseId?.courseTopic || 'N/A'}</td>
                           <td>{item.earnedLP !== undefined && item.earnedLP !== null ? item.earnedLP : 'N/A'}</td>
                           <td>{item.addedLP !== undefined && item.addedLP !== null ? item.addedLP : 'N/A'}</td>
                           <td>{item.totalLP !== undefined && item.totalLP !== null ? item.totalLP : 'N/A'}</td>
                           <td>{item.startDate ? Moment(item.startDate).format("DD.MM.YYYY") : ''}</td>
                           <td>{item.endDate ? Moment(item.endDate).format("DD.MM.YYYY") : ''}</td>
                           <td>{item.statusOfVerification || 'N/A'}</td>
                           <td>{item.valueDate ? Moment(item.valueDate).format("DD.MM.YYYY") : ''}</td>
                           <td><input
                                 type="checkbox"
                                 checked={!!item.courseId?.active} // Konvertiert undefined/null zu false
                                 readOnly // Verhindert Interaktion (nur zur Anzeige)
                                 style={{
                                    cursor: 'not-allowed',
                                 }}
                               />
                           </td>
                        </tr>
                        )
                     })}
                  </tbody>

                  <tfoot></tfoot>
               </table>
            </div>
            )}
         </section>

         <section id="account_7" style={!openSections.includes("account_7") ? { backgroundColor: 'rgba(221, 155, 55, 0.2)' } : {}}>
            <div className="accountHead" id="account_7_head" >
               <h3 onClick={() => {toggleSection("account_7");dropdownToggleIsOpen["dropdownProfessionalTracker"] && toggleDropdowns("dropdownProfessionalTracker")}}>Ihr Professional-Tracker</h3>

               {openSections.includes("account_7") && 
               <>
                  <p>Sie haben {cpdData.length} Aktivitäten gelistet</p>
                  <div //className="dropdownContainer"
                  className={`dropdownContainer ${
                     dropdownToggleIsOpen["dropdownProfessionalTracker"] ? "activeC" : ""
                  }`}>
                     <p
                     //className="pFunction"
                     className={`pFunction ${
                        dropdownToggleIsOpen["dropdownProfessionalTracker"] ? "activeP" : ""
                     }`}
                     onClick={() => toggleDropdowns("dropdownProfessionalTracker")} // Callback richtig binden
                     >Aktionen {/* Dropdown-Kopf */}
                     <span style={{ marginLeft: "8px" }}>
                        {/* {CPDToggleIsOpen["dropdownCPDTracker"] ? "▲" : "▼"} */}
                     </span>
                     </p>
                     <div
                        className={`dropdownContent ${
                           dropdownToggleIsOpen["dropdownProfessionalTracker"] ? "active" : ""
                        }`}
                        >
                        <p onClick={() => console.log("Aktualisieren")} className="pFunction"
                        >aktualisieren
                        </p>
                        <p
                        onClick={() => navigate("courselistpage")} // Navigation
                        className="pFunction"
                        >Aktivitäten
                        </p>
                        <p
                        onClick={() => toggleDropdowns("dropdownProfessionalTracker")}
                        className="pFunction"
                        >Eingabe
                        </p>
                        <p
                        onClick={() => toggleDropdowns("dropdownProfessionalTracker")}
                        className="pFunction"
                        >Daten öffnen
                        </p>
                        <p
                        onClick={() => toggleDropdowns("dropdownProfessionalTracker")}
                        className="pFunction"
                        >abbrechen
                        </p>
                        <p
                        onClick={() => {
                           toggleDropdowns("dropdownProfessionalTracker");
                           toggleSection("account_7");
                        }}
                        className="pFunction"
                        >schließen
                        </p>
                     </div>
                  </div>
               </>
               }
            </div>
            {openSections.includes("account_7") && (
            <div className="accountData" id="account_7_data">
               <table id="cpdTrackerTable">
                  <thead>
                     <tr>
                        <th>
                           <Tooltip text="LEO = Learning Opportunity, <br/>CRE = Creating an education opportunity, <br/> PAC = professional Activity">
                           <span style={{ marginLeft: '0px', cursor: 'pointer' }}>{/* ℹ️ */}Typ</span>
                           </Tooltip>
                        </th>
                        <th>Activity</th>
                        <th>Thema</th>
                        <th>LPs <br/>basic</th>
                        <th>LPs <br/>additional</th>
                        <th>LPs total</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>status of CPD</th>
                        {/* <th>Request for evaluation</th>
                        <th>Verified</th> */}
                        <th>Value date</th>
                        
                     </tr>
                  </thead>
                  <tbody>
                     {cpdData.map((item, index) => (
                     <tr key={item._id}>
                        {/* <td>{item.activityType || 'N/A'}</td> */}
                        <td>
                           <Tooltip text={getTooltipText(item.activityType)}>
                              <span style={{ marginLeft: '0px', cursor: 'pointer' }}>{/* ℹ️ */}{item.activityType}</span>
                           </Tooltip>
                        </td>
                        <td>{item.courseId?.courseType || 'N/A'}</td>
                        <td>{item.courseId?.courseTopic || 'N/A'}</td>
                        <td>{item.earnedLP || 'N/A'}</td>
                        <td>{item.addedLP || 'N/A'}</td>
                        <td>{item.totalLP || 'N/A'}</td>
                        <td>{item.startDate ? (Moment(item.startDate).format("DD.MM.YYYY")) : ''}</td>
                        <td>{item.endDate ? (Moment(item.endDate).format("DD.MM.YYYY")) : ''}</td>
                        <td>{item.statusOfVerification || 'N/A'}</td>
                        {/* <td><input type="checkbox" checked={item.requestToEvaluate} readOnly /></td>
                        <td><input type="checkbox" checked={item.verified} readOnly /></td> */}
                        <td>{item.valueDate ? (Moment(item.valueDate).format("DD.MM.YYYY")) : ''}</td>
                        
                     </tr>
                     ))}
                  </tbody>
                  <tfoot></tfoot>
               </table>
            </div>
            )}
         </section>

         <section id="account_2" style={!openSections.includes("account_2") ? { backgroundColor: 'rgba(221, 155, 55, 0.2)' } : {}}>
            <div className="accountHead" id="account_2_head" >
               <h3 onClick={() => {toggleSection("account_2");dropdownToggleIsOpen["dropdownCV"] && toggleDropdowns("dropdownCV")}}>Ihr beruflicher Werdegang</h3>
               {openSections.includes("account_2") && 
               <>
                  <p>Sie haben {careerData.length} berufliche Stationen</p>
                  <div className={`dropdownContainer ${
                  dropdownToggleIsOpen["dropdownCV"] ? "activeC" : ""
               }`}>
                     <p
                     className={`pFunction ${
                        dropdownToggleIsOpen["dropdownCV"] ? "activeP" : ""
                     }`}
                     onClick={() => toggleDropdowns("dropdownCV")} // Callback richtig binden
                     >Aktionen
                        <span style={{ marginLeft: "8px" }}>
                           {/* {dropdownToggleIsOpen["dropdownCV"] ? "▲" : "▼"} */}
                        </span>
                     </p>
                     <div className={`dropdownContent ${
                        dropdownToggleIsOpen["dropdownCV"] ? "active" : ""
                     }`}>
                        <p
                           onClick={() => console.log("Aktualisieren")} // Beispielaktion
                           className={`pFunction ${
                              dropdownToggleIsOpen["dropdownCV"] ? "activeP" : ""
                           }`}
                        >aktualisieren
                        </p>
                        <p
                           //onClick={() => navigate("courselistpage")}  Navigation
                           className="pFunction"
                        >neue Station
                        </p>
                        <p
                           onClick={() => toggleDropdowns("dropdownCV")} // Öffnen
                           className="pFunction"
                        >bearbeiten
                        </p>
                        <p
                        onClick={() => toggleDropdowns("dropdownCV")} // Eingabe
                        className="pFunction"
                        >abbrechen
                        </p>
                        <p
                        onClick={() => {
                           toggleDropdowns("dropdownCV");
                           toggleSection("account_2");
                        }} // Schließen
                        className="pFunction"
                        >Schließen
                        </p>
                     </div>
                     
                  </div>
               </>
               }
            </div>
            {openSections.includes("account_2") && (
            <div className="accountData" id="account_2_data">
               <table id="werdegangTable">
                  <thead>
                     <tr>
                        <th>Company Name</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>aktiviert</th>
                        <th>{/* Werttyp<br/> */}
                           <Tooltip text="EDU = education, <br/>PEX = professional Experience, <br/> PED = professional Education">
                              <span style={{ marginLeft: '0px', cursor: 'pointer' }}>{/* ℹ️ */}Werttyp</span>
                           </Tooltip>
                        </th>
                        
                        {/* <th>PEX</th>
                        <th>PED</th>
                        <th>EDU</th> */}
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Time <br/>Span</th>
                     </tr>
                  </thead>
                  <tbody>
                     {careerData.map((item, index) => (
                        <tr key={index}>
                        <td>{item.company?.companyName || 'N/A'}</td>
                        <td>{item.department || 'N/A'}</td>
                        <td>{item.position || 'N/A'}</td>
                        <td><input type="checkbox" checked={item.activated} readOnly /></td>
                        {/* <td><Tooltip text="EDU = education, <br/>PEX = professional Experience, <br/> PED = professional Education">
                              <span style={{ marginLeft: '5px', cursor: 'pointer' }}>{item.typeOfValue || 'N/A'}</span>
                           </Tooltip>
                        </td> */}
                        <td>
                           <Tooltip text={getTooltipText(item.typeOfValue)}>
                              <span style={{ marginLeft: '0px', cursor: 'pointer' }}>{/* ℹ️ */}{item.typeOfValue}</span>
                           </Tooltip>
                        </td>
                        {/* <td><input type="checkbox" checked={item.pex} readOnly /></td>
                        <td><input type="checkbox" checked={item.ped} readOnly /></td>
                        <td><input type="checkbox" checked={item.edu} readOnly /></td> */}
                        <td>{Moment(item.startDate).format("DD.MM.YY")}</td>
                        <td>{item.endDate ? (Moment(item.endDate).format("DD.MM.YY")) : ''}</td>
                        <td>{item.timeSpan || 0}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            )}
         </section>

         {authorsData ?
         (<section id="account_10" style={!openSections.includes("account_10") ? { backgroundColor: 'rgba(221, 155, 55, 0.2)' } : {}}>
         <div className="accountHead" >
            <h3 onClick={() => {toggleSection("account_10"); setChangeAuthorsData(false); dropdownToggleIsOpen["dropdownAuthorsData"] && toggleDropdowns("dropdownAuthorsData")}}>Autoreninfo</h3>
            
            {openSections.includes("account_10") &&                  
                  <div className={`dropdownContainer ${
                     dropdownToggleIsOpen["dropdownAuthorsData"] ? "activeC" : ""
                  }`}>
                     <p
                        className={`pFunction ${
                           dropdownToggleIsOpen["dropdownAuthorsData"] ? "activeP" : ""
                        }`}
                        onClick={() => toggleDropdowns("dropdownAuthorsData")} // Callback richtig binden
                     >Aktionen {/* Dropdown-Kopf */}
                        <span style={{ marginLeft: "8px" }}>
                           {/* {CPDToggleIsOpen["dropdownCPDTracker"] ? "▲" : "▼"} */}
                        </span>
                     </p>
                     
                     <div className={`dropdownContent ${
                        dropdownToggleIsOpen["dropdownAuthorsData"] ? "active" : ""
                     }`}>
                        {changeAuthorsData === false ? 
                        (<p onClick={() => {setChangeAuthorsData(true);toggleDropdowns("dropdownAuthorsData")}} className="pFunction">
                        Daten ändern</p>) : (<p onClick={() => {dataEingabeAbbrechen(); toggleDropdowns("dropdownAuthorsData")}}className="pFunction">
                        Daten sichern</p>)}
                        <p
                        onClick={() => {toggleDropdowns("dropdownAuthorsData"); setChangeAuthorsData(false)}} // Eingabe
                        className="pFunction"
                        >abbrechen
                        </p>
                        <p
                        onClick={() => {
                           setChangeAuthorsData(false);
                           toggleDropdowns("dropdownAuthorsData");
                           toggleSection("account_10");
                        }} // Schließen
                        className="pFunction"
                        >schließen
                        </p>
                     </div>
                     
                  </div>  	 
               }
         </div>
         {openSections.includes("account_10") && (
            <div id="account_10_data">
               <div className="account_10" id="account_10_data_1">
                  <div>
                     <p>CV</p> 
                     <div >{authorsData.careerSummary}</div>
                  </div>
               </div>
               <div className="account_10" id="account_10_data_2">
                  <div>
                     <p>Expertisen</p> 
                     <div >
                     <ul>
                        {authorsData.fieldsOfExpertise && authorsData.fieldsOfExpertise.length > 0 ? (
                        authorsData.fieldsOfExpertise.map((field, index) => (
                           <li key={index}>
                              <span className="C">C</span> {field}
                           </li>
                        ))
                        ) : (
                        <li>No expertise available.</li>
                        )}
                     </ul>
                     </div>
                  </div>
               </div>
               <div className="account_10" id="account_10_data_3">
                  <div>
                     <p>letztes Update </p> 
                     <div >{Moment(authorsData.updatedOn).format("DD.MM.YYYY")}
                     </div>
                  </div> 
               </div>
               
            </div>
            )}  
         </section>) :
         (<section id="account_10">
            <div className="accountHead">
               <h3> aktuell keine Autorendaten vorhanden. </h3>
               {/* <p className="pFunction"><span className="C">C</span> Daten eingeben</p> */}
            </div>
         </section>)
         }

         <section id="account_4" style={!openSections.includes("account_4") ? { backgroundColor: 'rgba(221, 155, 55, 0.2)' } : {}}>
            <div className="accountHead" >
               <h3 onClick={() => {toggleSection("account_4"); setChangeUserData(false); dropdownToggleIsOpen["dropdownUserData"] && toggleDropdowns("dropdownUserData")}}>Ihre Userdaten</h3>
               {openSections.includes("account_4") &&                  
                  <div className={`dropdownContainer ${
                     dropdownToggleIsOpen["dropdownUserData"] ? "activeC" : ""
                  }`}>
                     <p
                        className={`pFunction ${
                           dropdownToggleIsOpen["dropdownUserData"] ? "activeP" : ""
                        }`}
                        onClick={() => toggleDropdowns("dropdownUserData")} // Callback richtig binden
                     >Aktionen {/* Dropdown-Kopf */}
                        <span style={{ marginLeft: "8px" }}>
                           {/* {CPDToggleIsOpen["dropdownCPDTracker"] ? "▲" : "▼"} */}
                        </span>
                     </p>
                     
                     <div className={`dropdownContent ${
                        dropdownToggleIsOpen["dropdownUserData"] ? "active" : ""
                     }`}>
                        {changeUserData === false ? 
                        (<p onClick={() => {setChangeUserData(true);toggleDropdowns("dropdownUserData")}} className="pFunction">
                        Daten ändern</p>) : (<p onClick={() => {dataEingabeAbbrechen(); toggleDropdowns("dropdownUserData")}}className="pFunction">
                        Daten sichern</p>)}
                        <p
                        onClick={() => {toggleDropdowns("dropdownUserData"); setChangeUserData(false)}} // Eingabe
                        className="pFunction"
                        >abbrechen
                        </p>
                        <p
                        onClick={() => {
                           setChangeUserData(false);
                           toggleDropdowns("dropdownUserData");
                           toggleSection("account_4");
                        }} // Schließen
                        className="pFunction"
                        >schließen
                        </p>
                     </div>
                     
                  </div>  	 
               }
            </div>
            {openSections.includes("account_4") && (
            <div className="accountData" id="account_4_data">
               <div className="account_4">
                  <div>
                     <p className="fieldName">Vorname</p> 
                     {!editFirstName ? (
                        <div className="output">
                           <p>{userData.firstName}</p>
                           {changeUserData === true && (<EditOutlined
                           className="edit-icon"
                           onClick={() => {
                              setEditFirstName(true);
                              setEditInputName("Vorname");
                              handleErrorMessage("Vorname");
                           }}
                           />)}
                        </div> ) : (
                        <div className="input">
                           <input
                           type="text"
                           defaultValue={userData.firstName}
                           onChange={(e) => setFirstName(e.target.value)}
                           />
                           <div id="logoContainer">
                              <SaveOutlined
                              className="save-icon"
                              onClick={() => {
                                 if (!firstName) {
                                    Swal.fire({ title: "Vorname unverändert!" });
                                    setEditFirstName(false);
                                 } else {
                                    Swal.fire({
                                    title: "Vorname ändern?",
                                    text: firstName,
                                    icon: "warning",
                                    buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                                    dangerMode: true,
                                    }).then((isConfirm) => {
                                    if (isConfirm) {
                                       const data = {
                                          userName: userData.userName,
                                          firstName: firstName,
                                          lastName: userData.lastName,
                                          //gender: userData.gender,
                                          email: userData.eMail
                                       };
                                       updateUser(data);
                                    } else {
                                       Swal.fire({ title: "Vorname ändern abgebrochen." });
                                       setEditFirstName(false);
                                    }
                                    });
                                 }
                                 getUserData();
                              }}
                              />
                              <StopOutlined
                              className="abort-icon"
                              onClick={(e) => setEditFirstName(false)}
                              />
                           </div>
                        </div>    
                     )}           
                  </div>
                  <div>
                     <p className="fieldName">Nachname</p> 
                     {!editLastName ? (
                        <div className="output">
                           <p>{userData.lastName}</p>
                           
                           {changeUserData === true && (<EditOutlined
                           className="edit-icon"
                           onClick={() => {
                              setEditLastName(true);
                              setEditInputName("Nachname");
                              handleErrorMessage("Nachname");
                           }}
                           />)}
                           
                        </div> ) : (
                        <div className="input">
                           <input
                           type="text"
                           defaultValue={userData.lastName}
                           onChange={(e) => setFirstName(e.target.value)}
                           />
                           <div id="logoContainer">
                              <SaveOutlined
                              className="save-icon"
                              onClick={() => {
                                 if (!lastName) {
                                    Swal.fire({ title: "Nachname unverändert!" });
                                    setEditLastName(false);
                                 } else {
                                    Swal.fire({
                                    title: "Nachname ändern?",
                                    text: lastName,
                                    icon: "warning",
                                    buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                                    dangerMode: true,
                                    }).then((isConfirm) => {
                                    if (isConfirm) {
                                       const data = {
                                          userName: userData.userName,
                                          firstName: userData.firstName,
                                          lastName: lastName,
                                          //gender: userData.gender,
                                          email: userData.eMail
                                       };
                                       updateUser(data);
                                    } else {
                                       Swal.fire({ title: "Nachname ändern abgebrochen." });
                                       setEditLastName(false);
                                    }
                                    });
                                 }
                                 getUserData();
                              }}
                              />
                              <StopOutlined
                              className="abort-icon"
                              onClick={(e) => setEditLastName(false)}
                              />
                           </div>
                        </div>    
                     )}           
                  </div>
                  <div>
                     <p className="fieldName">E-Mail</p> 
                     {!editEmail ? (
                        <div className="output">
                           <p>{userData.eMail}</p>
                           
                           {changeUserData === true && (<EditOutlined
                           className="edit-icon"
                           onClick={() => {
                              setEditEmail(true);
                              setEditInputName("E-Mail");
                              handleErrorMessage("E-Mail");
                           }}
                           />)}  
                        </div> ) : (
                        <div className="input">
                           <input
                           type="text"
                           defaultValue={userData.eMail}
                           onChange={(e) => setEmail(e.target.value)}
                           />
                           <div id="logoContainer">
                              <SaveOutlined
                              className="save-icon"
                              onClick={() => {
                                 if (!email) {
                                    Swal.fire({ title: "E-Mail unverändert!" });
                                    setEditEmail(false);
                                 } else {
                                    Swal.fire({
                                    title: "E-Mil ändern?",
                                    text: email,
                                    icon: "warning",
                                    buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                                    dangerMode: true,
                                    }).then((isConfirm) => {
                                    if (isConfirm) {
                                       const data = {
                                          userName: userData.userName,
                                          firstName: userData.firstName,
                                          lastName: userData.lastName,
                                          //gender: userData.gender,
                                          email: email
                                       };
                                       updateUser(data);
                                    } else {
                                       Swal.fire({ title: "E-Mail ändern abgebrochen." });
                                       setEditEmail(false);
                                    }
                                    });
                                 }
                                 getUserData();
                              }}
                              />
                              <StopOutlined
                              className="abort-icon"
                              onClick={(e) => setEditEmail(false)}
                              />
                           </div>
                        </div>    
                     )}           
                  </div>
               </div>
               <div className="account_4">
                  <div>
                        <p className="fieldName">Username</p> 
                        {!editUserName ? (
                           <div className="output">
                              <p>{userData.userName}</p>
                              
                              {changeUserData === true && (<EditOutlined
                              className="edit-icon"
                              onClick={() => {
                                 setEditUserName(true);
                                 setEditInputName("Username");
                                 handleErrorMessage("Username");
                              }}
                              />)}
                              
                           </div> ) : (
                           <div className="input">
                              <input
                              type="text"
                              defaultValue={userData.userName}
                              onChange={(e) => setUserName(e.target.value)}
                              />
                              <div id="logoContainer">
                                 <SaveOutlined
                                 className="save-icon"
                                 onClick={() => {
                                    if (!userName) {
                                       Swal.fire({ title: "Username unverändert!" });
                                       setEditUserName(false);
                                    } else {
                                       Swal.fire({
                                       title: "Username ändern?",
                                       text: userName,
                                       icon: "warning",
                                       buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                                       dangerMode: true,
                                       }).then((isConfirm) => {
                                       if (isConfirm) {
                                          const data = {
                                             userName: userName,
                                             firstName: userData.firstName,
                                             lastName: userData.lastName,
                                             //gender: userData.gender,
                                             email: userData.eMail
                                          };
                                          updateUser(data);
                                       } else {
                                          Swal.fire({ title: "Username ändern abgebrochen." });
                                          setEditUserName(false);
                                       }
                                       });
                                    }
                                    getUserData();
                                 }}
                                 />
                                 <StopOutlined
                                 className="abort-icon"
                                 onClick={(e) => setEditUserName(false)}
                                 />
                              </div>
                           </div>    
                        )}           
                  </div>
                  <div>
                     <p className="fieldName">Ihr Passwort</p>
                     {!editPassword ? (
                        <div className="output" > 
                           <p> ********* </p>
                           {changeUserData === true && (<EditOutlined
                           onClick={() => {
                              setEditPassword(true);
                              setEditInputName("Passwort");
                              handleErrorMessage("Passwort");
                           }}
                           className="edit-icon"
                           />)}
                        </div>) : (
                        <div className="input">
                           <input
                           /* id="passwordInput" */
                           type="text"
                           /* type= "password" */
                           onChange={(e) => setPassword(e.target.value)}
                           />                                               
                     <div id="logoContainer">
                     <SaveOutlined
                     className="save-icon"
                     onClick={() => {
                        if (!password) {
                           Swal.fire({ title: "Passwort unverändert!" });
                           setEditPassword(false);
                        } else {
                           Swal.fire({
                           title: "Passwort ändern?",
                           icon: "warning",
                           buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                           dangerMode: true,
                           }).then((isConfirm) => {
                           if (isConfirm) {
                              const data = {
                                 userName: userData.userName,
                                 firstName: userData.firstName,
                                 lastName: userData.lastName,
                                 gender: userData.gender,
                                 email: userData.eMail,
                                 password: password,
                              };
                              updateUserPassword(data);
                           } else {
                              Swal.fire({ title: "Passwort ändern abgebrochen." });
                              setEditPassword(false);
                           }
                           });
                        }
                        getUserData();
                     }}
                     />
                     <StopOutlined
                     className="abort-icon"
                     onClick={(e) => setEditPassword(false)}
                     />
                  </div>
               </div>
               )}
                  </div>                       
                  <div>      
                     <p className="fieldName">Ihr Avatar</p>   
                     <AvatarSliderModal 
                     isOpen={isSliderModalOpen} 
                     onRequestClose={() => setIsSliderModalOpen(false)} 
                     />
                     <div className="output">
                        < UserAvatar width="65px" height="65px" allowDragging="true"/> 
                        <div className="slider-container">
                           <input
                           type="range"
                           min="50"
                           max="200"
                           value={objectSize}
                           onChange={handleSizeChange}
                           style={{width:"100%"}}
                           />
                           <p>Größe und Position</p>
                        </div>
                        {changeUserData === true && <EditOutlined onClick={() => setIsSliderModalOpen(true)} className="edit-icon" id="test"/>} 
                     </div>
                  </div>
               </div>
            </div>
            )}
         </section>
         
         <section id="account_5" style={!openSections.includes("account_5") ? { backgroundColor: 'rgba(221, 155, 55, 0.2)' } : {}}>
            <div className="accountHead" >
               <h3 onClick={() => {toggleSection("account_5"); setChangeContactData(false); dropdownToggleIsOpen["dropdownContactData"] && toggleDropdowns("dropdownContactData")}}>Ihre persönlichen Daten</h3>
               {openSections.includes("account_5") &&                  
                  <div className={`dropdownContainer ${
                     dropdownToggleIsOpen["dropdownContactData"] ? "activeC" : ""
                  }`}>
                     <p
                        className={`pFunction ${
                           dropdownToggleIsOpen["dropdownContactData"] ? "activeP" : ""
                        }`}
                        onClick={() => toggleDropdowns("dropdownContactData")} // Callback richtig binden
                     >Aktionen {/* Dropdown-Kopf */}
                        <span style={{ marginLeft: "8px" }}>
                           {/* {CPDToggleIsOpen["dropdownCPDTracker"] ? "▲" : "▼"} */}
                        </span>
                     </p>
                     
                     <div className={`dropdownContent ${
                        dropdownToggleIsOpen["dropdownContactData"] ? "active" : ""
                     }`}>
                        {changeContactData === false ? 
                        (<p onClick={() => {setChangeContactData(false);toggleDropdowns("dropdownContactData")}} className="pFunction">
                        Daten ändern</p>) : (<p onClick={() => {dataEingabeAbbrechen(); toggleDropdowns("dropdownContactData")}}className="pFunction">
                        Daten sichern</p>)}
                        <p
                        onClick={() => {toggleDropdowns("dropdownContactData"); setChangeContactData(false)}} // Eingabe
                        className="pFunction"
                        >abbrechen
                        </p>
                        <p
                        onClick={() => {
                           setChangeContactData(false);
                           toggleDropdowns("dropdownContactData");
                           toggleSection("account_5");
                        }} // Schließen
                        className="pFunction"
                        >schließen
                        </p>
                     </div>  
                  </div>  	 
               }
            </div>
            {openSections.includes("account_5") && (
               <div className="accountData"id="account_5_data">
                  <div className="account_5">
                     <div>
                        <p className="fieldName">Vorname</p> 
                        <div className="output">{userData.firstName}</div>
                     </div>
                     <div>
                        <p className="fieldName">Nachname</p> 
                        <div className="output">{userData.lastName}</div>
                     </div>
                     <div>
                        <p className="fieldName">E-Mail</p> 
                        <div className="output">{userData.eMail}</div>
                     </div>
                     {/* <div>
                        <p>Geburtsdatum</p>
                        <div >{Moment(contactData.dateOfBirth).format("DD.MM.YYYY")}</div>
                     </div> */}
                  </div>

                  <div className="account_5">
                     <div>
                        <p className="fieldName">E-Mail</p> 
                        <div className="output">{userData.eMail}</div>
                     </div>
                     <div>
                        <p className="fieldName">Mobil</p> 
                        <div className="output">{userData.eMail}</div>
                     </div>
                     <div>
                        <p className="fieldName">Firma</p> 
                        <div className="output">{userData.eMail}</div>
                     </div>
                  </div>
                  <div className="account_5">
                     <div>
                        <p className="fieldName">E-Mail</p> 
                        <div className="output">{userData.eMail}</div>
                     </div>
                     <div>
                        <p className="fieldName">Mobil</p> 
                        <div className="output">{userData.eMail}</div>
                     </div>
                     <div>
                        <p className="fieldName">Firma</p> 
                        <div className="output">{userData.eMail}</div>
                     </div>
                  </div>

                  <div className="account_5">
                     {/* <div>
                        <p className="fieldName">Username</p> 
                        <div className="output">{userData.userName}</div>
                     </div>
                     <div>
                        <p className="fieldName">Ihr Passwort</p>
                        <div className="output" onClick={toggleShowPassword}>
                        {showPassword ? userData.userName : userData.userName && '*'.repeat(userData.userName.length)}
                        </div>
                     </div>
                     <div >
                        <p className="fieldName">Ihr Avatar</p>
                        <div className="output">
                           <img src={baseURL+userData.userImage} 
                           id="imgKnowledgeAccount"
                           alt={userData.firstName + " "+ userData.lastName} style={{width: '50px'}}/>
                        </div>
                     </div> */}
                  </div>
               </div>
            )}
         </section>

         <section id="account_8" style={!openSections.includes("account_8") ? { backgroundColor: 'rgba(221, 155, 55, 0.2)' } : {}}>
            <div className="accountHead" >
               <h3 onClick={() => {toggleSection("account_8"); setChangeAccountData(false); dropdownToggleIsOpen["dropdownAccountData"] && toggleDropdowns("dropdownAccountData")}}>Ihre Abrechnungsdaten</h3>
               {openSections.includes("account_8") &&                  
               <div className={`dropdownContainer ${
                     dropdownToggleIsOpen["dropdownAccountData"] ? "activeC" : ""
                  }`}>
                     <p
                        className={`pFunction ${
                           dropdownToggleIsOpen["dropdownAccountData"] ? "activeP" : ""
                        }`}
                        onClick={() => toggleDropdowns("dropdownAccountData")} // Callback richtig binden
                     >Aktionen {/* Dropdown-Kopf */}
                        <span style={{ marginLeft: "8px" }}>
                           {/* {CPDToggleIsOpen["dropdownCPDTracker"] ? "▲" : "▼"} */}
                        </span>
                     </p>
                     
                     <div className={`dropdownContent ${
                        dropdownToggleIsOpen["dropdownAccountData"] ? "active" : ""
                     }`}>
                        {changeAccountData === false ? 
                        (<p onClick={() => {setChangeAccountData(true);toggleDropdowns("dropdownAccountData")}} className="pFunction">
                        Daten ändern</p>) : (<p onClick={() => {dataEingabeAbbrechen(); toggleDropdowns("dropdownAccountData")}}className="pFunction">
                        Daten sichern</p>)}
                        <p
                        onClick={() => {toggleDropdowns("dropdownAccountData"); setChangeAccountData(false)}} // Eingabe
                        className="pFunction"
                        >abbrechen
                        </p>
                        <p
                        onClick={() => {
                           setChangeAccountData(false);
                           toggleDropdowns("dropdownAccountData");
                           toggleSection("account_8");
                        }} // Schließen
                        className="pFunction"
                        >schließen
                        </p>
                     </div>
                     
               </div>  	 
               }
            </div>
            {openSections.includes("account_8") && (
               <div id="account_8_data">
                  <div className="account_8">
                     <p>Joachim Ritter<br />
                        Marienfelder Str. 18 <br />33330 Gütersloh<br />Deutschland
                     </p>
                  </div>
                  <div className="account_8">
                     <p>Ihr <br />derzeit angestellt bei<br />angstellt
                     </p>
                  </div>
                  <div className="account_8">
                     <p>Ihr <span className="LitCoin">L</span>it<span className="LitCoin">C</span>oin <br />Guthaben</p>
                     <div id="account_8_Box"> 250 <span className="LC"> LC</span> </div>  
                  </div>
               </div>
            )}
         </section>
            
          {isAuth && knowledgeData && <Countdown  targetDate={knowledgeData.cpdActiveSince} />} 
      </main>
   )
}

export default KnowledgeAccountMain

