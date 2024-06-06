import './AccountInfoAside.scss'
import React, { useContext, useState } from 'react'
import { SectionsContext } from '../../context/SectionsContext.js'

const AccountAside = () => {
const {asidePos, setAsidePos} = useContext(SectionsContext);
const {buttonPos, setButtonPos} = useContext(SectionsContext)
const [buttonText, setButtonText] = useState("show info")

const initialButtonPos = "buttonZeroPosition" 
const buttonMove1 = "showBut" 
const buttonMove2 = "showBut moveButton" 
const buttonMove3 = "showBut moveButtonBack" 
//const buttonMove4 = "hideBut"
//const buttonMove5 = "moveButtonBackToStart"

//const accountPos1 = "accountAside"
const accountPos2 = "accountAside showAccount"
const accountPos3 = "accountAside hideAccount" 


const handleButton=(buttonPos) => {

  if ( buttonPos === buttonMove1 ) {
    setButtonPos(buttonMove2);
    setAsidePos(accountPos2);
    setButtonText("hide info");
  } else if( buttonPos === buttonMove2) {
    setButtonPos(buttonMove3);
    setButtonText("show info");
    setAsidePos(accountPos3);
  } else if( buttonPos === buttonMove3) {
    setButtonPos(buttonMove2 );
    setAsidePos(accountPos2);
    setButtonText("hide info");
  } else {
    setButtonPos(initialButtonPos);
    setAsidePos(accountPos2)
  }
}

/* useEffect((buttonPos) => {
  //!isAuth && (setButtonPos(buttonMove4))
  if (buttonPos === buttonMove2) {
    setButtonText("hide Info");
  } else {
    return}
  
},[buttonPos]) */

return (
   <>
      <button type="button" 
        onClick ={()=>handleButton(buttonPos)}
        id="buttonShowInfo"
        className = {buttonPos}>
          {buttonText} 
      </button>
               
      <aside id="infoAsideAccount" className = {asidePos} >
        <div className="account_container" >
          <div id="floating-stack">
            <dl>
              <dt>KF</dt>
              <dd>
                <h3>Knowledge Factor</h3>Der Knowledge Factor definiert Ihren derzeitigen Wissensstand. Er setzt sich zusammen aus
                Ihre Ausbildungsbasis (PED - Professional Education), Ihrer Berufspraxis (PEX - Berufserfahrung) und
                Ihrer aktiven Weiterbildungsaktivität (LP - Professional Learning Points). Ihr Knowledge Factor verliert ohne
                Weiterbildung an Wert. Sie bauen Ihren KF durch Ihre berufliche Praxis und zusätzliche
                Weiterbildung kontinuierlich auf.
              </dd>

              <dt>LF</dt>
              <dd>
                <h3>Learning Factor</h3>Ihr Lerning Factor zeigt Ihnen, wie aktiv Sie sich in der Zeit Ihre
                Registrierung weitergebildet haben. Er berücksichtig alle Weiterbildungsmaßnahmen und Aktivitäten, die Sie in dem CPD-Tracker
                eingeben.
              </dd>

              <dt>PEX</dt>
              <dd>
                <h3>Professional Experience</h3>Hier werden alle beruflichen Erfahrungen gelistet und berücksichtig. Die
                Zeit ihrer beruflichen Aktivitäten wird mit 10% addiert. Der PEX Wert verliert pro Jahr 10% an Wert.
              </dd>

              <dt>PED</dt>
              <dd>
                <h3>Professional Education</h3>Hier werden alle berufsbezogenen Hochschulaktivitäten gelistet und berücksichtig. Die
                Zeit ihrer Hochschulaktivitäten wird zum KnowledgeFAktor addiert. 
              </dd>

              <dt>LP</dt>
              <dd>
                <h3>Learning Points</h3>Hier werden alle CPD-Maßnahmen gelistet.
                wie Vorträge, Facharktiek, Konferenzen, workshops u.a.
              </dd>

              <dt>PA</dt>
              <dd>
                <h3>Professional Activity</h3>Hier werden alle berufständischen Aktivitäten bewertet,
                wie Engagement in Verbänden, gewonnene Awards, halten von Vorträge, Autorenschaft u.a.
              </dd>

              <dt id="LC_only">LC</dt>
              <dd>
                <h3>
                <span className="LitCoin">L</span>
                <span className="Calli">it</span>
                <span className="LitCoin">C</span>
                <span className="Calli">oin</span> 
                </h3>Hiermit können Sie Ihre Weiterbildungsangebote in digitale Währung
                bezahlen. 10 
                <span className="LitCoin">L</span>
                <span className="Calli">it</span>
                <span className="LitCoin">C</span>
                <span className="Calli">oin</span> 
                hat den Wert von 1 €. Sie können 500 
                <span className="LitCoin">L</span>
                <span className="Calli">it</span>
                <span className="LitCoin">C</span>
                <span className="Calli">oins</span> 
                für 40€ erwerben und damit Ihr Budget schonen.
              </dd>
            </dl>
          </div>
        </div>
      </aside>
   </>
   )
};

export default AccountAside