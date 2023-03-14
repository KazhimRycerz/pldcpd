import './AccountAside.scss'
import { Link } from 'react-router-dom'
import React, { useContext, useState } from 'react'
import JoachimRitter from '../../images/Joachim_privat.jpg'
import { SectionsContext } from '../../context/SectionsContext.js'

const AccountAside = () => {
const [buttonText, setButtonText] = useState("hide  account");
const { asidePos, setAsidePos } = useContext(SectionsContext);
const { buttonPos, setButtonPos } = useContext(SectionsContext);
//const { isAuth } = useContext(SectionsContext);

const buttonPosition0 = "" 
const buttonMove1 = "showBut" 
const buttonMove2 = "showBut moveButton" 
const buttonMove3 = "showBut moveButtonBack" 
//const buttonMove4 = "hideBut"
//const buttonMove5 = "moveButtonBackToStart"
//isAuth ? setButtonPos("showBut") : setButtonPos("");

const accountPos1 = "accountAside"
const accountPos2 = "accountAside showAccount"
const accountPos3 = "accountAside hideAccount"



const handleButton=(buttonPos) => {
  if ( buttonPos === buttonMove1 ) {
    setButtonPos(buttonMove2);
    setButtonText("hide account");
    setAsidePos(accountPos2);
  } else if( buttonPos === buttonMove2) {
    setButtonPos(buttonMove3 );
    setButtonText("show account");
    setAsidePos(accountPos3);
  } else if( buttonPos === buttonMove3) {
    setButtonPos(buttonMove2 );
    setButtonText("hide account");
    setAsidePos(accountPos2);
  } else {
    setButtonPos(buttonPosition0);
    setAsidePos(accountPos2)
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
               
      <aside id="homeAsideAccount" className = {asidePos} >
        <img src={JoachimRitter} alt="Joachim Ritter privat" />
        <p><strong>Hallo, Joachim Ritter </strong><br />
        Journalist <br />Karrierelevel <br />--- <span> IV </span> ---<br />Project Lighting Designer</p> <br />
              
        <div id="home_data">
          <p> Ihr persönlicher Wissensstatus</p>
          <div>
            <div>myKF <p id="myKF">myKF</p></div>
            <div>myLF <p id="myLF">myLF</p></div>
            <div>myPEDh <p id="myPED">myPEDh</p></div>
            <div>myPEXh <p id="myPEX">myPEXh</p></div>
          </div>
          <div>
            <div><p id="maKF">maKF</p>maKF</div>
            <div><p id="maLF">maLF</p>maLF</div>
            <div><p id="maPED">maPED</p>maPEDh</div>
            <div><p id="maPEX">maPEX</p>maPEXh</div>
          </div>
          <p> Markt Wissensschnitt</p>
        </div>
    
        <p>Die Werte vergleichen Ihren Stand des Wissens mit dem Durchschnitt aller teilnehmenden Lichtdesigner. Derzeit liegt Ihr Wissen über dem Marktdurchschnitt.</p>
    
        <p>Ihr aktuelles <span className="LitCoin">L</span><span className="Calli">it</span><span className="LitCoin">C</span><span className="Calli">oin</span> Guthaben:</p>
        <div id="aside_gutbox">
          <p id="aside_guthaben"></p> 
          <p className="LC">LC</p>
        </div>
    
        <p>Ihre gesamte Übesicht Ihres Kontos können Sie <Link to="/KnowledgeAccount">hier</Link> aufrufen. <Link className="C"
            to="/KnowledgeAccount">C</Link></p>
    
      </aside>
   </>
   )
};

export default AccountAside