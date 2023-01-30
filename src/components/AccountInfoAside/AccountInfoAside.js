import './AccountInfoAside.scss'
import { Link } from 'react-router-dom'
import React, { useContext, useState } from 'react'
import JoachimRitter from '../../images/Joachim_privat.jpg'
import { SectionsContext } from '../../context/SectionsContext.js'

/*const showAccount = () => {
  homeAsideAccount.style.display = "block";
  gruß.style.right = "10vw";
  C1.style.left = "-2.5vw";
  buttonShowAccount.textContent = "hide account";
};
const hideAccount = () => {
  gruß.style.right = "4vw";
  C1.style.left = "0px"; //4
  C1.style.margin = "60px auto"; //4
  buttonShowAccount.textContent = "show account";
};   
 */

const AccountAside = () => {
const {showAccount, setShowAccount} = useContext(SectionsContext);
const [buttonText, setButtonText] = useState("show info")
const {buttonPos, setButtonPos} = useContext(SectionsContext)

const buttonPosition0 = "" 
const buttonMove1 = "showBut" 
const buttonMove2 = "showBut moveButton" 
const buttonMove3 = "showBut moveButtonBack" 
const buttonMove4 = "hideBut"
//const buttonMove5 = "moveButtonBackToStart"

const handleButton=(buttonPos) => {
  if ( buttonPos === buttonMove1 ) {
    setButtonPos(buttonMove2);
    setButtonText("hide info");
    setShowAccount("showAccount");
  } else if( buttonPos === buttonMove2) {
    setButtonPos(buttonMove3 );
    setButtonText("show Info");
    setShowAccount("hideAccount");
  } else if( buttonPos === buttonMove3) {
    setButtonPos(buttonMove2 );
    setShowAccount("showAccount");
  } else {
    setButtonPos(buttonPosition0);
    setShowAccount("hideAccount")
  }
}

return (
   <>
      <button type="button" 
        onClick ={()=>handleButton(buttonPos)}
        id="buttonShowAccount"
        className = {buttonPos}>
          {buttonText} 
      </button>
               
      <aside id="home_aside_account" className = {showAccount} >
        <div className="account_container">
          <div className="floating-stack">
            <dl>
              <dt>KF</dt>
              <dd>
                <h3>Knowledge Factor</h3>Der Knowledge Factor definiert Ihren Wissensstand. Er setzt sich zusammen aus
                Ihre Ausbildungsbasis (PED - Professional Education), Ihrer Berufspraxis (PEX - Berufserfahrung) und
                Ihrer aktiven Weiterbildungsaktivität (LP - Learning Points). Ihr Knowledge Factor verliert ohne
                Weiterbildung an Wert. Sie bauen Ihren KF auf durch Ihre berufliche Praxis und zusätzliche
                Weiterbildung.
              </dd>

              <dt>LF</dt>
              <dd>
                <h3>Learning Factor</h3>Ihr Lerning Factor zeigt Ihnen, wie aktiv Sie sich in der Zeit Ihre
                Registrierung weitergebildet haben. Er berücksichtig alle Weiterbildungsmaßnahmen, die Sie in die Liste
                eingeben.
              </dd>

              <dt>PEX</dt>
              <dd>
                <h3>Professional Experience</h3>Hier werden alle beruflichen Erfahrungen gelistet und berücksichtig. Die
                zeit ihrer beruflichen Aktivitäten wird mit 10% addiert. Der PEX Wert verliert pro Jahr 10% an Wert.
                Gleichzeit
              </dd>

              <dt>PED</dt>
              <dd>
                <h3>Professional Education</h3>Hier werden alle beruflichen Erfahrungen gelistet und berücksichtig. Die
                zeit ihrer beruflichen Aktivitäten wird mit 10% addiert. Der PEX Wert verliert pro Jahr 10% an Wert.
                Gleichzeit
              </dd>

              <dt>LP</dt>
              <dd>
                <h3>LearningPoints</h3>Hier werden alle beruflichen Erfahrungen gelistet und berücksichtig. Die zeit
                ihrer beruflichen Aktivitäten wird mit 10% addiert. Der PEX Wert verliert pro Jahr 10% an Wert.
                Gleichzeit
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
                hat den Wert von einspan €. Sie können 500 
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