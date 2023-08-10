import './KnowledgeAccountMain.scss'
import JoachimRitter from '../../images/Joachim_privat.jpg'
//import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SectionsContext } from "../../context/SectionsContext.js";
//import axiosInstance from "../../util/axiosConfig";
import axiosConfig from "../../util/axiosConfig";
import Moment from "moment"


const  KnowledgeAccountMain = ()=>{
   const { userData, setUserData, marketData, setMarketData, isAuth, buttonPos, setButtonPos, asidePos, setAsidePos, gotoPage, setGotoPage } = useContext(SectionsContext);
  /*  const [userData, setUserData] = useState({}) */
   const [knowledgeData, setKnowledgeData] = useState({})
   const [contactData, setContactData] = useState({})
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
         const persKnowlData = axiosResp.data.contactData.professionalStatus;
         setUserData(userData);
         setContactData(contactData);
         setKnowledgeData(persKnowlData)
      };
      //console.log(knowledgeData)
      
      
   const getMarketKnowledgeData = async () => {
      const axiosResp = await axiosConfig.get(
         `http://localhost:4000/professionalStatus`
         );
         const marketData = axiosResp.data;
         //setMarketKnowledgeData(marketData);
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
            <h3> Ihre Karrierestatus, {contactData.firstName} {contactData.lastName}</h3>
            <div id="account_1_data">
               <div>
                  <div>
                     <p>Ihr Beruf:</p> 
                     <div className="output" id="profession">{knowledgeData.profession}</div>
                  </div>
                  <div>
                     <p>aktuelle Firma:</p>
                     <div className="output" id="company">VIA-Design</div>
                  </div>
                  {/* <div> 
                     <p>Name:</p> 
                     <output id="fullName">{contactData.firstName} {contactData.lastName}</output>
                  </div> */}
               </div>

               <div>
                  <div>
                     <p>Karrierelevel</p>
                     <div className="output" id="myCL"> {knowledgeData.myCStatus} von 9</div>
                  </div>
                  <div><p></p></div>
                     <div><p id="account_1_p">{knowledgeData.careerPathStatus}</p></div>
               </div>

               <div>
                  <div>
                     <p>beruflich aktiv seit </p>
                     <div className="output" id="my_active"> {Moment(knowledgeData.professionalSince).format("DD.MM.YYYY")}
                     </div>
                  </div>
                  <div>
                     <p>CPD-aktiv seit</p>
                     <div className="output" id="my_start"> {Moment(knowledgeData.cpdActiveSince).format("DD.MM.YYYY")}
                     </div>
                  </div>
                  <div>
                  <p>letztes Update </p>
                     <div className="output" id="my_active"> {Moment(knowledgeData.updatedOn).format("DD.MM.YYYY")}
                     </div>
                  </div>
               </div>

               <div>
                  <div>
                     <p>Ihr Guthaben</p>
                     <div className="output account_Box" id="myLCoins"> {knowledgeData.myLC} <span className="C colorYellow"> LC</span>
                     </div>
                  </div>
                  <div><p></p></div>
                  <div><p></p></div>
               </div>
            </div>
         </section>

         <section id="account_2">
            <h3> Ihr persönliches Fachwissen</h3>
            <p> Die unteren Zahlen zeigen Ihnen die Durchschnittswerte im internationalen Lichtdesignermarkt aller
            Teilnehmer an.</p>

            <div id="account_2_data">
               <div className="account_2">
                  <div>
                     <h2>KF</h2>
                     <p>Knowledge<br />Factor</p>
                  </div>
                  <div className="account_data_box">
                     <output className="account_pers_data" id="myKF">{knowledgeData.myKF}</output>
                     <output className="account_market_data" id="maKF">{marketData.maKF}</output>
                  </div>
               </div>

               <div className="account_2">
                  <div>
                     <h2>LF</h2>
                     <p>Learning<br />Factor</p>
                  </div>
                  <div className="account_data_box">
                     <output className="account_pers_data" id="myLF">{knowledgeData.myLF}</output>
                     <output className="account_market_data" id="maLF">{marketData.maLF}</output>
                  </div>
               </div>

               <div className="account_2">
                  <div>
                     <h2>PEX</h2>
                     <p>Professional<br />Experience</p>
                  </div>
                  <div className="account_data_box">
                     <output className="account_pers_data" id="myPEX">{knowledgeData.myPEXh}</output>
                     <output className="account_market_data" id="maPEX">{marketData.maPEXh}</output>
                  </div>
               </div>

               <div className="account_2">
                  <div>
                     <h2>PED</h2>
                     <p>Professional<br />Education</p>
                  </div>
                  <div className="account_data_box">
                     <output className="account_pers_data" id="myPED">{knowledgeData.myPEDh}</output>
                     <output className="account_market_data" id="maPED">{marketData.maPEDh}</output>
                  </div>
               </div>

               <div className="account_2">
                  <div>
                     <h2>LP</h2>
                     <p>Learning<br />Points</p>
                  </div>
                  <div className="account_data_box">
                     <output className="account_pers_data" id="myLP">{knowledgeData.myLP}</output>
                     <output className="account_market_data" id="maLP">{marketData.maLP}</output>
                  </div>
               </div>

               <div className="account_2">
                  <div>
                     <h2>PA</h2>
                     <p>Professional<br />Activity</p>
                  </div>
                  <div className="account_data_box">
                     <output className="account_pers_data" id="myPA">{knowledgeData.myPA}</output>
                     <output className="account_market_data" id="maPA">{marketData.maPA}</output>
                  </div>
               </div>
            </div>

         </section>

         <section id="account_3">

            <h3> Ihre persönlichen Daten</h3>
            <div id="account_3_data">

               <div className="account_3">
                  <p>Joachim Ritter<br />
                     Geburtsdatum <br /><br />
                     Anrede
                  </p>
               </div>

               <div className="account_3">
                  <p>Ihre E-Mail <br />Ihre Mobilnummer
                     <br />Firma</p>
               </div>

               <div className="account_3">
                  <p>Ihr Anmeldename<br />Ihr Password<br />
                  </p>
               </div>

            </div>

         </section>

         <section id="account_4">

            <h3> Ihre Abrechnungsdaten</h3>
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

         <section id="account_5">
            <h3> Ihre Abrechnungsdaten</h3>
            <div>
               <div className="account_5">
                  <p>Joachim Ritter<br />
                     Marienfelder Str. 18 <br />33330 Gütersloh<br />Deutschland
                  </p>
               </div>
               <div className="account_5">
                  <p>Ihr <br />derzeit angestellt bei<br />angstellt
                  </p>
               </div>
               <div className="account_5">
                  <p>Ihr <span className="LitCoin">L</span>it<span className="LitCoin">C</span>oin <br />Guthaben</p>
                  <div id="account_5_Box"> <p>250 <span className="LC"> LC</span></p>
                  </div>
               </div>
            </div>
         </section>
            
      </main>
)
}

export default KnowledgeAccountMain