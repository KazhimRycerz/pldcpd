import './AccountAside.scss'
import { Link } from 'react-router-dom'
import React, { useContext, useState } from 'react'
import JoachimRitter from '../../images/Joachim_privat.jpg'
import { SectionsContext } from '../../context/SectionsContext.js'

const AccountAside = () => {
const {showAccount, setShowAccount} = useContext(SectionsContext);
const [buttonText, setButtonText] = useState("hide account")
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
    setButtonText("hide account");
    setShowAccount("showAccount");
  } else if( buttonPos === buttonMove2) {
    setButtonPos(buttonMove3 );
    setButtonText("show account");
    setShowAccount("hideAccount");
  } else if( buttonPos === buttonMove3) {
    setButtonPos(buttonMove2 );
    setButtonText("hide account");
    setShowAccount("showAccount");
  } else {
    setButtonPos(buttonPosition0);
    setShowAccount("showAccount")
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
        <img src={JoachimRitter} alt="Joachim Ritter privat" />
        <p><strong>Hallo, Joachim Ritter </strong><br />
        Journalist <br />Karrierelevel <br />--- <span> IV </span> ---<br />Project Lighting Designer</p> <br />
              
        <div id="home_data">
          <p> Ihr persönlicher Wissensstatus</p>
          <div>
            <div>myKF <output id="myKF">myKF</output></div>
            <div>myLF <output id="myLF">myLF</output></div>
            <div>myPEDh <output id="myPED">myPEDh</output></div>
            <div>myPEXh <output id="myPEX">myPEXh</output></div>
          </div>
          <div>
            <div><output id="maKF">maKF</output>maKF</div>
            <div><output id="maLF">maLF</output>maLF</div>
            <div><output id="maPED">maPED</output>maPEDh</div>
            <div><output id="maPEX">maPEX</output>maPEXh</div>
          </div>
          <p> Markt Wissensschnitt</p>
        </div>
    
        <p>Die Werte vergleichen Ihren Stand des Wissens mit dem Durchschnitt aller teilnehmenden Lichtdesigner. Derzeit liegt Ihr Wissen über dem Marktdurchschnitt.</p>
    
        <p>Ihr aktuelles <span className="LitCoin">L</span><span className="Calli">it</span><span className="LitCoin">C</span><span className="Calli">oin</span> Guthaben:</p>
        <div id="aside_gutbox">
          <output id="aside_guthaben"></output> 
          <p className="LC">LC</p>
        </div>
    
        <p>Ihre gesamte Übesicht Ihres Kontos können Sie <Link to="/KnowledgeAccount">hier</Link> aufrufen. <Link className="C"
            to="/KnowledgeAccount">C</Link></p>
    
      </aside>
   </>
   )
};

export default AccountAside