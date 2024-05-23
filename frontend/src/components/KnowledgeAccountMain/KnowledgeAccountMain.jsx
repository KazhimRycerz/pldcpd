import './KnowledgeAccountMain.scss'
//import JoachimRitter from '../../../src/images/Joachim_privat.jpg'
//import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SectionsContext } from "../../context/SectionsContext.js";
//import axiosInstance from "../../util/axiosConfig";
import axiosConfig from "../../util/axiosConfig";
import Moment from "moment";
import Swal from "sweetalert2";
import baseURL from "../../util/constants.js"


const  KnowledgeAccountMain = ()=>{
   const { isAuth, userData, authorsData, companyData,  contactData, marketData,  knowledgeData,  buttonPos, setButtonPos, asidePos, setAsidePos, gotoPage, navigate } = useContext(SectionsContext);
   const [showPassword, setShowPassword] = useState(false);
   const [openSections, setOpenSections] = useState(["account_3"]);

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

   useEffect(() => {
      const buttonPosCheck = () =>{
         if (isAuth && gotoPage==="/home") {setButtonPos("showBut"); setAsidePos("accountAside") //ok
      } else {setButtonPos(buttonPos); setAsidePos(asidePos)
      }}
   }, [isAuth, asidePos, buttonPos, gotoPage, setAsidePos, setButtonPos]);
    
   //console.log(userData.userImage)

   const toggleShowPassword = () => {
      setShowPassword(prevShowPassword => !prevShowPassword);
    };
    
   const addKnowledgeDaten = async () => {
      //e.preventDefault();       
      const contactID = contactData._id;   
      try {
         const response = await axiosConfig.post("/professionalStatus", {contactID});
         console.log("reponsData", response.data);
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
      <main id="accountMain">
         <div /* id="Gruß_account"  */className= "headBox">
            <h2> Ihre Fachwissen im Überblick</h2>
            <p className="closingFunction" onClick={() => navigate("/home")}>Formular schließen</p>
         </div>

         <section id="account_3" style={!openSections.includes("account_3") ? { backgroundColor: 'rgba(221, 155, 55, 0.2)' } : {}}>
            <div className="accountHead" >
               <h3 onClick={() => toggleSection("account_3")}>Ihre User Daten</h3>
               {openSections.includes("account_3") && 
                  <p>
                     <span className="C">C </span>
                     Daten aktualisieren
                  </p>
               }
            </div>
            {openSections.includes("account_3") && (
               <div id="account_3_data">
                  <div className="account_3">
                     <div>
                        <p>Name</p> 
                        <div className="output">{contactData.firstName} {contactData.lastName}</div>
                     </div>
                     <div>
                        <p>Geburtsdatum</p>
                        <div >{Moment(contactData.dateOfBirth).format("DD.MM.YYYY")}</div>
                     </div>
                  </div>
   
                  <div className="account_3">
                     <div>
                        <p>E-Mail</p> 
                        <div className="output">{userData.eMail}</div>
                     </div>
                     <div>
                        <p>Mobil</p> 
                        <div className="output">{userData.eMail}</div>
                     </div>
                     <div>
                        <p>Firma</p> 
                        <div className="output">{userData.eMail}</div>
                     </div>
                  </div>
                  <div className="account_3">
                     <div>
                        <p>E-Mail</p> 
                        <div className="output">{userData.eMail}</div>
                     </div>
                     <div>
                        <p>Mobil</p> 
                        <div className="output">{userData.eMail}</div>
                     </div>
                     <div>
                        <p>Firma</p> 
                        <div className="output">{userData.eMail}</div>
                     </div>
                  </div>
   
                  <div className="account_3">
                     <div>
                        <p>Username</p> 
                        <div className="output">{userData.userName}</div>
                     </div>
                     <div>
                        <p>Ihr Passwort</p>
                        <div className="output" onClick={toggleShowPassword}>
                        {showPassword ? userData.userName : userData.userName && '*'.repeat(userData.userName.length)}
                        </div>
                     </div>
                     <div>
                        <p>Ihr Avatar</p>
                        <div>
                           <img src={baseURL+userData.userImage} 
                           id="imgKnowledgeAccount"
                           alt={userData.firstName + " "+ userData.lastName} style={{width: '50px'}}/>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </section>

         <section id="account_1" style={!openSections.includes("account_1") ? { backgroundColor: 'rgba(221, 155, 55, 0.2)' } : {}}>
            <div className="accountHead" id="account_1_head" >
               <h3 onClick={() => toggleSection("account_1")}>Karrierestatus {contactData.firstName} {contactData.lastName}</h3>
               {openSections.includes("account_1") && 
                  <p>
                  <span className="C">C </span>
                  Daten aktualisieren
                  </p>
               }
            </div>
            {openSections.includes("account_1") && (
            <div id="account_1_data">
               <div>
                  <div>
                     <p>Ihr Beruf</p> 
                     {/* {knowledgeData ? (<div className="output" id="profession">{knowledgeData.profession}</div>) : (<div className="output" id="profession">(0)</div>)} */}
                     <div className="output" id="profession">
                     {knowledgeData ? <p>{knowledgeData.profession}</p> : <p>Ihr Beruf wurde noch nicht aktualisiert</p>}
                     </div>
                  </div>
                  <div>
                     <p>aktuelle Firma</p>
                     {companyData ? (<div className="output" id="company"><p>{companyData.companyName}</p> <p>{companyData.companyCity} / {companyData.companyCountryCode}</p> <p>{companyData.companyHomepage}</p></div>) : (<div className="output" id="company"><p>Ihre Firma wurde noch nicht eingegeben</p></div>)}
                  </div>                  
               </div>
               <div>
                  <div><p>Karrierelevel</p>
                     <div className="output" id="myCL"> 
                        {knowledgeData ? (<p>{knowledgeData.myCStatus} von 9</p>) : (<p>Ihr Datensatz wurde noch nicht angelegt</p>)}
                     </div> 
                  </div> 
                  <div><p></p></div>  
                  <div id="myCPDStatus">
                     <div>
                        {knowledgeData ? <p id="account_1_p">{knowledgeData.careerPathStatus}</p> : <p></p>}
                     </div>
                  </div>
               </div>

               <div>
                  <div>
                     <p>beruflich aktiv seit </p>
                     <div className="output" id="my_active"> 
                        {knowledgeData ? <p>{Moment(knowledgeData.professionalSince).format("DD.MM.YYYY")}</p> : <p>Info fehlt</p>}
                     </div>
                  </div>
                  <div>
                     <p>CPD-aktiv seit</p>
                        <div className="output" id="my_start"> 
                        {knowledgeData ? <p>{Moment(knowledgeData.cpdActiveSince).format("DD.MM.YYYY")}</p> : <p>Info fehlt</p>}
                     </div>
                  </div>
                  <div>
                     <p>letztes Update </p>
                     <div className="output" id="my_active"> 
                     {knowledgeData ? <p>{Moment(knowledgeData.updatedOn).format("DD.MM.YYYY")}</p> : <p>Info fehlt</p>}
                     </div>
                  </div>
               </div>

               <div>
                  <div>
                     <p>Ihr Guthaben</p>
                     <div className="output account_Box" id="myLCoins"> 
                        {knowledgeData ? <p>{knowledgeData.myLC}<span className="C colorYellow"> LC</span></p>: <>0<span className="C colorYellow"> LC</span></>} 
                     </div>
                  </div>
                  <div><p></p></div>
                  <div><p></p></div>
               </div>
            </div>
            )}
         </section>
   
         <section id="account_2" style={!openSections.includes("account_2") ? { backgroundColor: 'rgba(221, 155, 55, 0.2)' } : {}}>
            <div className="accountHead" id="account_2_head" >
               <h3 onClick={() => toggleSection("account_2")}>Ihr persönliches Fachwissen</h3>
               {!knowledgeData && (
                <p onClick={addKnowledgeDaten}>
                  <span className="C">C </span>
                  Datensatz anlegen
                  </p>
               )}
            </div>
            <p> Die Zahlen zeigen Ihnen die Durchschnittswerte im <br/>internationalen Lichtdesignermarkt aller Teilnehmer an.</p>
            
            {openSections.includes("account_2") && (
               <div id="account_2_data">
                  <div className="account_2">
                     <div>
                        <h2>KF</h2>
                        <p>Knowledge<br />Factor</p>
                     </div>
                     <div className="account_data_box">
                        {knowledgeData ? <output className="account_pers_data" id="myKF">{knowledgeData.myKF}</output> : <output className="account_pers_data" id="myKF">0</output>}
                        <output className="account_market_data" id="maKF">{marketData.maKF}</output>
                     </div>
                  </div>

                  <div className="account_2">
                     <div>
                        <h2>LF</h2>
                        <p>Learning<br />Factor</p>
                     </div>
                     <div className="account_data_box">
                        {knowledgeData ? <output className="account_pers_data" id="myLF">{knowledgeData.myLF}</output> : <output className="account_pers_data" id="myLF">0</output>}
                        <output className="account_market_data" id="maLF">{marketData.maLF}</output>
                     </div>
                  </div>

                  <div className="account_2">
                     <div>
                        <h2>PEX</h2>
                        <p>Professional<br />Experience</p>
                     </div>
                     <div className="account_data_box">
                        {knowledgeData ? <output className="account_pers_data" id="myPEX">{knowledgeData.myPEXh}</output> : <output className="account_pers_data" id="myPEX">0</output>}
                        <output className="account_market_data" id="maPEX">{marketData.maPEXh}</output>
                     </div>
                  </div>

                  <div className="account_2">
                     <div>
                        <h2>PED</h2>
                        <p>Professional<br />Education</p>
                     </div>
                     <div className="account_data_box">
                     {knowledgeData ? <output className="account_pers_data" id="myPED">{knowledgeData.myPEDh}</output> : <output className="account_pers_data" id="myPED">0</output>}
                        <output className="account_market_data" id="maPED">{marketData.maPEDh}</output>
                     </div>
                  </div>

                  <div className="account_2">
                     <div>
                        <h2>LP</h2>
                        <p>Learning<br />Points</p>
                     </div>
                     <div className="account_data_box">
                     {knowledgeData ? <output className="account_pers_data" id="myLP">{knowledgeData.myLP}</output> : <output className="account_pers_data" id="myLP">0</output>}
                        <output className="account_market_data" id="maLP">{marketData.maLP}</output>
                     </div>
                  </div>

                  <div className="account_2">
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
            )}
          </section>
   
         <section id="account_4" style={!openSections.includes("account_4") ? { backgroundColor: 'rgba(221, 155, 55, 0.2)' } : {}}>
            <div className="accountHead" >
               <h3 onClick={() => toggleSection("account_4")}>Ihre Abrechnungsdaten</h3>
               {openSections.includes("account_4") && 
               <p>
                  <span className="C">C </span>
                  Daten aktualisieren
               </p>
               }
            </div>
            {openSections.includes("account_4") && (
               <div id="account_4_data">
                  <div className="account_4">
                     <p>Joachim Ritter<br />
                        Marienfelder Str. 18 <br />33330 Gütersloh<br />Deutschland
                     </p>
                  </div>
                  <div className="account_4">
                     <p>Ihr <br />derzeit angestellt bei<br />angstellt
                     </p>
                  </div>
                  <div className="account_4">
                     <p>Ihr <span className="LitCoin">L</span>it<span className="LitCoin">C</span>oin <br />Guthaben</p>
                     <div id="account_4_Box"> 250 <span className="LC"> LC</span> </div>  
                  </div>
               </div>
            )}
         </section>
          
         {authorsData ?
         (<section id="account_5" style={!openSections.includes("account_5") ? { backgroundColor: 'rgba(221, 155, 55, 0.2)' } : {}}>
            <div className="accountHead" >
               <h3 onClick={() => toggleSection("account_5")}>Autoreninfo</h3>
               {openSections.includes("account_5") &&<p>
                  <span className="C">C </span>
                  Daten aktualisieren
               </p>}
            </div>
            {openSections.includes("account_5") && (
               <div id="account_5_data">
                  <div className="account_5" id="account_5_data_1">
                     <div>
                        <p>CV</p> 
                        <div >{authorsData.careerSummary}</div>
                     </div>
                  </div>
                  <div className="account_5" id="account_5_data_2">
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
                  <div className="account_5" id="account_5_data_3">
                     <div>
                        <p>letztes Update </p> 
                        <div >{Moment(authorsData.updatedOn).format("DD.MM.YYYY")}
                        </div>
                     </div> 
                  </div>
                  
               </div>
               )}  
            </section>) :
            (<section id="account_5">
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

