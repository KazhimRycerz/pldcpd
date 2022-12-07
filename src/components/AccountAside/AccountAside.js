import './AccountAside.scss'
import { Link } from 'react-router-dom'
import React, { useContext, useState } from 'react'
import JoachimRitter from '../../images/Joachim_privat.jpg'
import  { AsideAccountButtonContext } from "../../context/AccountButtonContext.js" 


/*   const moveAccountAndButton = () => {
  if (buttonShowAccount.textContent === "show account") {
    showAccount();
  } else if (buttonShowAccount.textContent === "hide account") {
    hideAccount();
  } else {
    alert("Ein Fehler ist aufgetreten");
  }
};

const handleButton = () => {
  if (flagButton && buttonShowAccount.textContent === "show account") {
    //console.log(flagButton, logInOut.textContent, buttonShowAccount.textContent);
    buttonShowAccount.classList.replace("hideBut", "showBut");
    logInOut.textContent = "log me out ";
    user.style.display= "inline-block";
    flagButton = false;
  } else if (!flagButton && buttonShowAccount.textContent === "show account") {
    console.log(flagButton, logInOut.textContent, buttonShowAccount.textContent);
    buttonShowAccount.classList.replace("showBut", "hideBut");
    logInOut.textContent = "log me in ";
    user.style.display= "none";
    flagButton = true;
  } else if (!flagButton && buttonShowAccount.textContent === "hide account") {
    const promise = new Promise((resolve, reject) => {
      resolve(hideAccount());
      });
      promise.then((result) => handleButton());
  } else {
    alert("Ein Fehler ist aufgetreten");
  }
  console.log(flagButton, logInOut.textContent, buttonShowAccount.textContent);
};

let flagButton = true;
const homeAsideAccount = document.querySelector("#home_aside_account");
const showLogin = document.querySelector("#showlogin");
const logInOut = document.querySelector("#logInOut");
const buttonShowAccount = document.querySelector("#buttonShowAccount");
const gruß = document.querySelector("#Gruß_main_p");
const C1 = document.querySelector("#C1");
const user = document.querySelector("#user");
showLogin.addEventListener("click", handleButton);
buttonShowAccount.addEventListener("click", moveAccountAndButton);

const showAccount = () => {
  buttonShowAccount.style.animation = "moveButtonback 1s ease-in-out forwards";
  homeAsideAccount.style.animation = "show_home_aside 2s ease-in-out forwards";
  homeAsideAccount.style.display = "block";
  gruß.style.right = "10vw";
  C1.style.left = "-2.5vw";
  buttonShowAccount.textContent = "hide account";
};
const hideAccount = () => {
  homeAsideAccount.style.animation = "hide_home_aside 2s ease-in-out forwards";
  buttonShowAccount.style.animation = "moveButton 1s 0s ease-in-out forwards";
  gruß.style.right = "4vw";
  C1.style.left = "0px"; //4
  C1.style.margin = "60px auto"; //4
  buttonShowAccount.textContent = "show account";
};  */  




const AccountAside = () => {
const [showAccount, setShowAccount] = useState("hideAccount()")
const {buttonPos, setButtonPos} = useContext(AsideAccountButtonContext)

return (
   <>
      <button type="button" 
      className={["buttonShowAccount", buttonPos === "buttonPosition0" ? "hideBut" : "showBut" ].join(" ")} id="buttonShowAccount" 
      //onClick ={event => handleButton()}
      
      /* onClick={event => {
                {[loggedIn, buttonPos === "buttonPosition1" ? setButtonPos("buttonPosition2"), setShowAccount(showAccount()), className(moveButton) : setButtonPos("buttonPosition1"), setShowAccount(hideAccount)]}
              }} */
      >show account</button>
               
      <aside id="home_aside_account">
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
    
        <p>Ihre gesamte Übesicht Ihres Kontos können Sie <Link to="pldcpd_account.html">hier</Link> aufrufen. <Link className="C"
            to="pldcpd_account.html">C</Link></p>
    
      </aside>
   </>
   )
};

export default AccountAside