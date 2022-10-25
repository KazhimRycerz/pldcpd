import './KnowledgeAccountMain.scss'

const  KnowledgeAccountMain = ()=>{

   return (
      <main>
         <div id="Content">

            <section id="Gruß_account">
               <h1> Ihre Fachwissen im Überblick</h1>
            </section>

            <section id="account_1">
               <h3> Ihre Karrieredaten</h3>
               <div id="account_1_data">
               <div>
                  <output id="fullName">Joachim Ritter</output>
                  <output id="profession"> Lighting Designer</output>
                  <output id="company">VIA-Design</output>
               </div>

               <div>
                  <p>Karrierelevel</p>
                  <output className="account_Box" id="myCL"> IV</output>
                  <output id="account_1_p">Project Lighting Designer</output>
               </div>

               <div>
                  
                  <p>CPD-aktiv seit</p>
                  <output className="account_box_dates" id="my_start"> 01.11.20
                  </output>
                  <p>beruflich aktiv seit </p>
                  <output className="account_box_dates" id="my_active"> 01.06.11
                  </output>
                  
               </div>

               <div>
                  <p>Ihr Guthaben</p>
                  <output className="account_Box" id="myLCoins"> myLC <strong id="LC"> LC</strong>
                  </output>
                  <p>Ihr Guthaben</p>
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
                     <output className="account_pers_data" id="myKF">myKF</output>
                     <output className="account_market_data" id="maKF">maKF</output>
                  </div>
               </div>

               <div className="account_2">
                  <div>
                     <h2>LF</h2>
                     <p>Learning<br />Factor</p>
                  </div>
                  <div className="account_data_box">
                     <output className="account_pers_data" id="myLF">myLF</output>
                     <output className="account_market_data" id="maLF">maLF</output>
                  </div>
               </div>

               <div className="account_2">
                  <div>
                     <h2>PEX</h2>
                     <p>Professional<br />Experience</p>
                  </div>
                  <div className="account_data_box">
                     <output className="account_pers_data" id="myPEX">myPEX</output>
                     <output className="account_market_data" id="maPEX">maPEX</output>
                  </div>
               </div>

               <div className="account_2">
                  <div>
                     <h2>PED</h2>
                     <p>Professional<br />Education</p>
                  </div>
                  <div className="account_data_box">
                     <output className="account_pers_data" id="myPED">myPED</output>
                     <output className="account_market_data" id="maPED">maPED</output>
                  </div>
               </div>

               <div className="account_2">
                  <div>
                     <h2>LP</h2>
                     <p>Learning<br />Points</p>
                  </div>
                  <div className="account_data_box">
                     <output className="account_pers_data" id="myLP">myLP</output>
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
                  <p>Ihr <span className="LitCoin">L</span>it<em em className="LitCoin">C</em>oin <br />Guthaben</p>
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
                  <p>Ihr <span className="LitCoin">L</span>it<em em className="LitCoin">C</em>oin <br />Guthaben</p>
                  <div id="account_5_Box"> <p>250 <span className="LC"> LC</span></p>
                  </div>
               </div>
               </div>
            </section>
            
         </div>
      </main>
      )
}

export default KnowledgeAccountMain