import './KnowledgeAccountMain.scss'
import { useContext, useState, useEffect, useRef } from "react";
import { SectionsContext } from "../../context/SectionsContext.js";
import { useLocation } from 'react-router-dom';
import { EditOutlined, SaveOutlined, StopOutlined } from "@ant-design/icons";
import axiosConfig from "../../util/axiosConfig";
import Moment from "moment";
import Swal from "sweetalert2";
import baseURL from "../../util/constants.js"
import UserAvatar from "../UserAvatar/UserAvatar.jsx"
import { Tooltip, getTooltipText } from "../../util/Tooltips/Tooltips.js"
import { AvatarSliderModal } from "../../modals/Slider/SliderModal.jsx"
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
      navigate } = useContext(SectionsContext);
      const location = useLocation();

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

  const [changeData, setChangeData] = useState(false);
   
   // Handling Modal open / close
   /* const closeModal = () => {
      setIsSliderModalOpen(false);
    }; */

   const dataEingabeAbbrechen = () => {
   setChangeData(false);
   setEditUserName(false);
   setEditFirstName(false);
   setEditLastName(false);
   setEditEmail(false);
   setEditPassword(false);
   setChangeData(false);
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
      setChangeData(false);
      
   } catch (error) {
      Swal.fire({
         title: "Da ist ein Fehler aufgetreten.",
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

   //Toggle Sections to open / close
   const toggleSection = (sectionId) => {
      setOpenSections((prevOpenSections) => {
         //console.log(prevOpenSections, sectionId)
         if (prevOpenSections.includes(sectionId)) {
         return prevOpenSections.filter((section) => section !== sectionId);
         } else {
         return [...prevOpenSections, sectionId];
         }
      });
   };

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
         })/* .then(() => {
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
            <p className="closingFunction" onClick={() => navigate("/home")}>Formular schließen</p>
         </div>
         
         <section id="welcomeLine">
            <div><h3>Konto und Daten von {userData.firstName} {userData.lastName}</h3></div>
         </section>

         <section id="account_1" style={!openSections.includes("account_1") ? { backgroundColor: 'rgba(221, 155, 55, 0.2)' } : {}}>
            <div className="accountHead" id="account_1_head" >
               <h3 onClick={() => toggleSection("account_1")}>Berufsstatus</h3>
               {openSections.includes("account_1") && 
                  <p className="linkin" onClick={() => getUserData()}>
                  <span className="C">C </span>
                  Daten aktualisieren
                  </p>
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
                  {/*<div><p className="fieldName"></p>
                        <div className="output" id="myCL"> 
                        {knowledgeData ? (<p>{knowledgeData.test.description} von 9</p>) : (<p>Ihr Datensatz wurde noch nicht angelegt</p>)}
                     </div>  
                  </div>  */}
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
                  {/*<div>
                     <p className="fieldName">Ihr CPD Guthaben</p>
                     <div className="output account_Box" id="myLCoins"> 
                        {knowledgeData ? <p>{knowledgeData.myLC}<span className="C colorYellow"> LC</span></p>: <>0<span className="C colorYellow"> LC</span></>} 
                     </div>
                  </div>
                  <div><p className="fieldName"></p></div>
                  <div><p className="fieldName"></p></div>*/}
               </div> 
            </div>
            )}
         </section>

         <section id="account_3" style={!openSections.includes("account_3") ? { backgroundColor: 'rgba(221, 155, 55, 0.2)' } : {}}>
            <div className="accountHead" id="account_3_head" >
               <h3 onClick={() => toggleSection("account_3")}>Ihr Fachwissen / CPD-Status</h3>
               {!knowledgeData && (
                  <p onClick={addKnowledgeDatensatz}>
                  <span className="C">C </span>
                  Datensatz anlegen
                  </p>
               )}
               {openSections.includes("account_3") && (<p className="linkin" onClick={() => getUserData()}>
                  <span className="C">C </span>
                  Daten aktualisieren
                  </p>)}
            </div>
                        
            {openSections.includes("account_3") && (
               <>
                  <p> Die Zahlen zeigen Ihnen die Durchschnittswerte im internationalen Lichtdesignermarkt aller Teilnehmer an.</p>
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
               </>
            )}
            </section>
         
         <section id="account_6" style={!openSections.includes("account_6") ? { backgroundColor: 'rgba(221, 155, 55, 0.2)' } : {}}>
            <div className="accountHead" id="account_6_head" >
               <h3 onClick={() => toggleSection("account_6")}>Ihre CPD-Tracker</h3>
               {openSections.includes("account_6") && 
                  <p className="linkin">
                  <span className="C">C </span>
                  Daten aktualisieren
                  </p>
               }
            </div>
            {openSections.includes("account_6") && (
            <div className="accountData" id="account_6_data">
               <table id="cpdTrackerTable">
                  <thead>
                     <tr>
                        <th>
                           <Tooltip text="LEO = Learning Opportunity, <br/>CRE = Creating an education opportunity, <br/> PAC = professional Activity">
                           <span style={{ marginLeft: '5px', cursor: 'pointer' }}>{/* ℹ️ */}Typ</span>
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
                                 <span style={{ marginLeft: '5px', cursor: 'pointer' }}>{/* ℹ️ */}{item.activityType}</span>
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
               </table>
            </div>
            )}
         </section>

         <section id="account_2" style={!openSections.includes("account_2") ? { backgroundColor: 'rgba(221, 155, 55, 0.2)' } : {}}>
            <div className="accountHead" id="account_2_head" >
               <h3 onClick={() => toggleSection("account_2")}>Ihre beruflicher Werdegang</h3>
               {openSections.includes("account_2") && 
                  <p className="linkin">
                  <span className="C">C </span>
                  Daten eingeben oder ändern
                  </p>
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
                              <span style={{ marginLeft: '5px', cursor: 'pointer' }}>{/* ℹ️ */}Werttyp</span>
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
                        <tr key={item._id}>
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
                              <span style={{ marginLeft: '5px', cursor: 'pointer' }}>{/* ℹ️ */}{item.typeOfValue}</span>
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

         <section id="account_4" style={!openSections.includes("account_4") ? { backgroundColor: 'rgba(221, 155, 55, 0.2)' } : {}}>
            <div className="accountHead" >
               <h3 onClick={() => toggleSection("account_4")}>Ihre Konto Nutzerdaten</h3>
               {openSections.includes("account_4") && 
                  <div>
                     {/* <p className="linkin" onClick={() => navigate("/userUpdate")}>
                        <span className="C" >C </span>
                        Daten ändern
                     </p> */}
                     {/* <p onClick={() => setUpdateUserModalIsOpen(true)} ><span className="C" >C </span> Daten ändern</p>
                     <UpdateUserModal 
                     isOpen={updateUserModalIsOpen} 
                     onRequestClose={() => setUpdateUserModalIsOpen(false)}
                     /> */}
                     {changeData === false ? (<p onClick={() => setChangeData(true)} className="linkin"><span className="C" >C </span> Daten ändern</p>) : (<p onClick={() => dataEingabeAbbrechen()}className="linkin"><span className="C" >C </span> schließen</p>)}
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
                              {changeData === true && (<EditOutlined
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
                              
                              {changeData === true && (<EditOutlined
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
                              
                              {changeData === true && (<EditOutlined
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
                                 
                                 {changeData === true && (<EditOutlined
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
                              {changeData === true && (<EditOutlined
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
                  <div className="fieldName">
                     <p>Ihr Avatar</p>   
                     <AvatarSliderModal 
                     isOpen={isSliderModalOpen} 
                     onRequestClose={() => setIsSliderModalOpen(false)} 
                     />
                  </div>
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
                     <div>{changeData === true && <EditOutlined onClick={() => setIsSliderModalOpen(true)} className="edit-icon"/>}</div> 
                  </div>
                  </div>
                  </div>
               </div>
            )}
         </section>
         
         <section id="account_5" style={!openSections.includes("account_5") ? { backgroundColor: 'rgba(221, 155, 55, 0.2)' } : {}}>
            <div className="accountHead" >
               <h3 onClick={() => toggleSection("account_5")}>Ihre persönliche Daten</h3>
               {openSections.includes("account_5") && 
                  <p className="linkin" onClick={() => navigate("/userUpdate")}>
                     <span className="C" >C </span>
                     Daten aktualisieren
                  </p>
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
               <h3 onClick={() => toggleSection("account_8")}>Ihre Abrechnungsdaten</h3>
               {openSections.includes("account_8") && 
               <p className="linkin" onClick={() => getUserData()}>
                  <span className="C">C </span>
                  Daten aktualisieren
               </p>
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
            
         {authorsData ?
            (<section id="account_10" style={!openSections.includes("account_10") ? { backgroundColor: 'rgba(221, 155, 55, 0.2)' } : {}}>
            <div className="accountHead" >
               <h3 onClick={() => toggleSection("account_10")}>Autoreninfo</h3>
               {openSections.includes("account_10") && 
               <p className="linkin">
                  <span className="C">C </span>
                  Daten aktualisieren
               </p>}
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
                  <h3> Aktuell keine Autorendaten vorhanden. </h3>
                  <p><span className="C">C</span> Daten eingeben</p>
               </div>
            </section>)
         }
      </main>
   )
}

export default KnowledgeAccountMain

