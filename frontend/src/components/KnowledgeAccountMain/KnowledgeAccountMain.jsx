import './KnowledgeAccountMain.scss'
import JoachimRitter from '../../../src/images/Joachim_privat.jpg'
//import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SectionsContext } from "../../context/SectionsContext.js";
//import axiosInstance from "../../util/axiosConfig";
import axiosConfig from "../../util/axiosConfig";
import Moment from "moment"


const  KnowledgeAccountMain = ()=>{
   const { userData, setUserData, contactData, setContactData, marketData, setMarketData,  knowledgeData, setKnowledgeData, isAuth, buttonPos, setButtonPos, asidePos, setAsidePos, gotoPage, setGotoPage } = useContext(SectionsContext);
  /*  const [userData, setUserData] = useState({}) */
   //const [knowledgeData, setKnowledgeData] = useState({})
   //const [contactData, setContactData] = useState({})
   const [userImg, setUserImg] = useState({JoachimRitter})
   const [authorsData, setAuthorsData] = useState({})
   const [companyData, setCompanyData] = useState({})
   const userId = localStorage.getItem("userId");

   
   const buttonPosCheck =()=>{
      if (isAuth && gotoPage==="/home") {setButtonPos("showBut"); setAsidePos("accountAside") //ok
   } else {setButtonPos(buttonPos); setAsidePos(asidePos)
   }}

   const getUserData = async () => {
      const axiosResp = await axiosConfig.get(
         `http://localhost:4000/user/${userId}`
         );
         const userData = axiosResp.data;
         const contactData = axiosResp.data.contactData;
         const contactKnowledgeData = axiosResp.data.contactData.professionalStatus;
         const authorsData = axiosResp.data.contactData.authorsData;
         const companyData = axiosResp.data.contactData.currentCompany;
         setUserData(userData);
         setContactData(contactData);
         setKnowledgeData(contactKnowledgeData);
         setUserImg(userData.userImage);
         setAuthorsData(authorsData)
         setCompanyData(companyData)
      };
      console.log(userImg);
      
      
   const getMarketKnowledgeData = async () => {
      const axiosResp = await axiosConfig.get(
         `http://localhost:4000/professionalStatus`
         );
         const marketData = axiosResp.data;
         setMarketData(marketData)
      };
      
      useEffect(() => {
         setGotoPage("/KnowledgeAccount")
         getMarketKnowledgeData()
         getUserData()
         buttonPosCheck()
      }, []);
         

   return (
      <main id="accountMain">
         <section id="Gruß_account">
            <h2> Ihre Fachwissen im Überblick</h2>
         </section>

         <section id="account_1">
            <div className="accountHead" id="account_1_head">
               <h3> Karrierestatus {contactData.firstName} {contactData.lastName}</h3>
               <p /* onClick={} */>
                  <span className="C">C </span> 
                  Daten hier aktualisieren
               </p>
               <img src={JoachimRitter} 
                id="imgKnowledgeAccount"
                alt={contactData.firstName}  />
            </div>
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
                     {knowledgeData ? (<div className="output" id="company"><p>{companyData.companyName}</p> <p>{companyData.city} / {companyData.countryCode}</p> <p>{companyData.homepage}</p></div>) : (<div className="output" id="company"><p>Ihre Firma wurde noch nicht eingegeben</p></div>)}
                  </div>
                  {/* <div>
                     <p>Land/Ort:</p>
                     <div className="output" id="company">{companyData.city} / {companyData.countryCode} </div>
                  </div> */}
                  
               </div>
               <div>
                  <div><p>Karrierelevel</p>
                     <div className="output" id="myCL"> 
                        {knowledgeData ? (<p>{knowledgeData.myCStatus} von 9</p>) : (<p>Ihr Datensatz wurde noch nicht angelegt</p>)}
                     </div> 
                  </div> 
                  <div><p></p></div>  
                     <div className="output" id="myCPDStatus">
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
         </section>

         <section id="account_2">
            <div className="accountHead" id="account_2_head">
               <h3> Ihr persönliches Fachwissen</h3>
               <p /* onClick={} */>
               <span className="C">C </span> 
               Datensatz anlegen
               </p>
            </div>
            <p> Die unteren Zahlen zeigen Ihnen die Durchschnittswerte im internationalen Lichtdesignermarkt aller
            Teilnehmer an.</p>

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

         </section>

         <section id="account_3">
            <div className="accountHead">
               <h3> Ihre persönlichen Daten</h3>
               <p /* onClick={} */>
                  <span className="C">C </span> 
               Daten aktualisieren
               </p> 
            </div>
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
                  <p>Ihr Anmeldename<br />Ihr Password<br />
                  </p>
               </div>

            </div>

         </section>

         <section id="account_4">
            <div className="accountHead">
               <h3> Ihre Abrechnungsdaten</h3>
               <p /* onClick={} */>
                  <span className="C">C </span> 
                  Daten aktualisieren
               </p> 
            </div>
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
         </section>
       
         {authorsData ?
            (<section id="account_5">
               <div className="accountHead">
                  <h3> Autoreninfo</h3>
                  <p /* onClick={} */>
                  <span className="C">C </span> 
                  Daten aktualisieren
                  </p> 
               </div>
               <div id="account_5_data">
                  <div className="account_5" id="account_5_data_1">
                     <div>
                        <p>CV</p> 
                        <div className="output">{authorsData.careerSummary}</div>
                     </div>
                  </div>
                  <div className="account_5" id="account_5_data_2">
                     <div>
                        <p>Expertisen</p> 
                        <div className="output">
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
                        <div className="output">{Moment(authorsData.updatedOn).format("DD.MM.YYYY")}
                        </div>
                     </div> 
                  </div>
                  
               </div>
                
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