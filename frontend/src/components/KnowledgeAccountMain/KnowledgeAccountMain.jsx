import './KnowledgeAccountMain.scss'
//import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SectionsContext } from "../../context/SectionsContext.js";
//import axiosInstance from "../../util/axiosConfig";
import axiosConfig from "../../util/axiosConfig";


const  KnowledgeAccountMain = ()=>{
   const {userData, setUserData, isAuth, buttonPos, setButtonPos, asidePos, setAsidePos, gotoPage, setGotoPage, navigate, logout} = useContext(SectionsContext);
   const [knowledgeData, setKnowledgeData] = useState("")
   setGotoPage("/KnowledgeAccount")
   if (isAuth && gotoPage==="/home") {setButtonPos("showBut"); setAsidePos("accountAside") //ok
} else {setButtonPos(buttonPos); setAsidePos(asidePos)
}

   const userId = localStorage.getItem("userId");

   const getUserData = async () => {
    const axiosResp = await axiosConfig.get(
      `http://localhost:4000/user/${userId}`
    );
    const data = axiosResp.data;
    const knowlData = axiosResp.data.contactData.professionalStatus;
    setUserData(data);
    setKnowledgeData(knowlData);
    
   };
   console.log(userData)
   console.log(knowledgeData)

    useEffect(() => {
      getUserData();
    });

    /* const getMarketKnowledgeData = async () => {
      const axiosResp = await axiosConfig.get(
        `http://localhost:4000/marketknowledge`
      );
      const marketData = axiosResp.data;
      const knowlData = axiosResp.data.contactData.professionalStatus;
      //setMarketData(marketData);
      //setMarketKnowledgeData(knowlData);
      
     };
     console.log(userData)
     console.log(knowledgeData)
  
      useEffect(() => {
        getUserData();
      }); */

   return (
      <main>
            <section id="Gruß_account">
               <h1> Ihre Fachwissen im Überblick</h1>
            </section>

            <section id="account_1">
               <h3> Ihre Karrierestatus</h3>
               <div id="account_1_data">
                  <div>
                     <div> 
                        <p>username:</p> 
                        <output id="fullName">{userData.userName}</output>
                     </div>
                     <div>
                        <p>profession:</p> 
                        <output id="profession"> Lighting Designer</output>
                     </div>
                        <div><p>current company:</p>
                        <output id="company">VIA-Design</output>
                     </div>
                  </div>

                  <div>
                     <div>
                        <p>Karrierelevel</p>
                        <output id="myCL"> {knowledgeData.myCStatus}</output>
                     </div>
                     <div><p></p></div>
                        <div><p id="account_1_p">{knowledgeData.careerPathStatus}</p></div>
                  </div>

                  <div>
                     <div>
                        <p>CPD-aktiv seit</p>
                        <output id="my_start"> {knowledgeData.cpdActiveSince}
                        </output>
                     </div>
                     <div>
                        <p>beruflich aktiv seit </p>
                        <output id="my_active"> {knowledgeData.professionalSince}
                        </output>
                     </div>
                     <div>
                     <p>letztes Update </p>
                        <output id="my_active"> {knowledgeData.updatedOn}
                        </output>
                     </div>
                     
                  </div>

                  <div>
                     <div>
                        <p>Ihr Guthaben</p>
                        <output className="account_Box" id="myLCoins"> myLC <span id="LC"> LC</span>
                        </output>
                     </div>
                     <div><p></p></div>
                     <div><p></p></div>
                  </div>
               </div>
            </section>

            <section id="account_2">
               <h3> Ihre persönlichen Werte Ihres Fachwissens</h3>
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
                        <output className="account_market_data" id="maKF">maKF</output>
                     </div>
                  </div>

                  <div className="account_2">
                     <div>
                        <h2>LF</h2>
                        <p>Learning<br />Factor</p>
                     </div>
                     <div className="account_data_box">
                        <output className="account_pers_data" id="myLF">{knowledgeData.myLF}</output>
                        <output className="account_market_data" id="maLF">maLF</output>
                     </div>
                  </div>

                  <div className="account_2">
                     <div>
                        <h2>PEX</h2>
                        <p>Professional<br />Experience</p>
                     </div>
                     <div className="account_data_box">
                        <output className="account_pers_data" id="myPEX">{knowledgeData.myPEXh}</output>
                        <output className="account_market_data" id="maPEX">maPEX</output>
                     </div>
                  </div>

                  <div className="account_2">
                     <div>
                        <h2>PED</h2>
                        <p>Professional<br />Education</p>
                     </div>
                     <div className="account_data_box">
                        <output className="account_pers_data" id="myPED">{knowledgeData.myPEDh}</output>
                        <output className="account_market_data" id="maPED">maPED</output>
                     </div>
                  </div>

                  <div className="account_2">
                     <div>
                        <h2>LP</h2>
                        <p>Learning<br />Points</p>
                     </div>
                     <div className="account_data_box">
                        <output className="account_pers_data" id="myLP">{knowledgeData.myLP}</output>
                        <output className="account_market_data" id="maLP">maLP</output>
                     </div>
                  </div>

                  <div className="account_2">
                     <div>
                        <h2>LP</h2>
                        <p>Learning<br />Points</p>
                     </div>
                     <div className="account_data_box">
                        <output className="account_pers_data" id="myLP">{knowledgeData.myLP}</output>
                        <output className="account_market_data" id="maLP">maLP</output>
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