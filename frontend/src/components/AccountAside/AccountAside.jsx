import './AccountAside.scss'
import { Link } from 'react-router-dom'
import React, { useContext, useState, useEffect, useCallback } from 'react'
import JoachimRitter from '../../../src/images/Joachim_privat.jpg'
import { SectionsContext } from '../../context/SectionsContext.js'
import axiosConfig from "../../util/axiosConfig";

const AccountAside = () => {
  const { isAuth, userData, setUserData, contactData, setContactData, marketData, setMarketData, knowledgeData, setKnowledgeData, asidePos, setAsidePos, buttonPos, setButtonPos, navigate } = useContext(SectionsContext);
  /* const [userData, setUserData] = useState({}) 
  const [knowledgeData, setKnowledgeData] = useState({})
  const [contactData, setContactData] = useState({})*/
  const [buttonText, setButtonText] = useState("hide  account");
  const userId = localStorage.getItem("userId");


const initialButtonPos = "buttonZeroPosition" 
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
  //console.log("buttonPosition:", buttonPos, "isAuth", isAuth)
  if (!isAuth) {navigate("/home")
  } else if ( buttonPos === buttonMove1 ) {
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
    setButtonPos(initialButtonPos);
    setAsidePos(accountPos1)
  }
}

const getUserData = useCallback(async () => {
  const axiosResp = await axiosConfig.get(
    `http://localhost:4000/user/${userId}`
  );
  const data = axiosResp.data;
  const contactData = data.contactData;
  const contactKnowledgeData = contactData.professionalStatus;
  setUserData(data);
  setContactData(contactData);
  setKnowledgeData(contactKnowledgeData)
 }, [setUserData, setContactData, setKnowledgeData, userId]);
  
 
const getMarketKnowledgeData = useCallback(async () => {
  const axiosResp = await axiosConfig.get(
    `http://localhost:4000/professionalStatus`
    );
      const marketData = axiosResp.data;
    setMarketData(marketData)
  }, [setMarketData]);
    //console.log(marketData)
    //console.log(userData)
    //console.log(knowledgeData)
    //console.log(userData.userImage)
  
  useEffect(() => {
      isAuth && getMarketKnowledgeData();
      isAuth && getUserData();
    }, [getMarketKnowledgeData, getUserData, isAuth]);


return (
   <>
      <button type="button" 
        onClick ={()=>handleButton(buttonPos)}
        id="buttonShowAccount"
        className = {buttonPos}>
          {buttonText} 
      </button>
               
      {knowledgeData ? (<aside id="homeAsideAccount" className = {asidePos} >
        <img src= {userData.userImage} alt="Joachim Ritter privat" />
        <p><strong>Hallo, {contactData.firstName} </strong><br />
        {knowledgeData.profession} <br />Karrierelevel <br />--- <span> {knowledgeData.myCStatus} </span> ---<br />{knowledgeData.careerPathStatus}</p> <br />
              
        <div id="home_data">
          <p> Ihr persönlicher Wissensstatus</p>
          <div>
            <div>myKF <p id="myKF">{knowledgeData.myKF}</p></div>
            <div>myLF <p id="myLF">{knowledgeData.myLF}</p></div>
            <div>myPEDh <p id="myPED">{knowledgeData.myPEDh}</p></div>
            <div>myPEXh <p id="myPEX">{knowledgeData.myPEXh}</p></div>
          </div>
          <div>
            <div><p id="maKF">{marketData.maKF}</p>maKF</div>
            <div><p id="maLF">{marketData.maLF}</p>maLF</div>
            <div><p id="maPED">{marketData.maPEDh}</p>maPED</div>
            <div><p id="maPEX">{marketData.maPEXh}</p>maPEX</div>
          </div>
          <p> Markt Wissensschnitt</p>
        </div>
    
        <p>Die Werte vergleichen Ihren Stand des Wissens mit dem Durchschnitt aller teilnehmenden Lichtdesigner. Derzeit liegt Ihr WissensFaktor KF {knowledgeData.myKF > marketData.maKF ? <span>über dem Marktdurchschnitt. </span> : <span>unter dem Marktdurchschnitt.</span>}</p>
    
        <p>Ihr aktuelles <span className="LitCoin">L</span><span className="Calli">it</span><span className="LitCoin">C</span><span className="Calli">oin</span> Guthaben:</p>
        <div id="aside_gutbox">
          <p id="aside_guthaben"></p> 
          <p className="LC">{knowledgeData.myLC} </p>
        </div>
    
        <p>Ihre gesamte Übesicht Ihres Kontos können Sie <Link to="/KnowledgeAccount">hier</Link> aufrufen. <Link className="C"
            to="/KnowledgeAccount">C</Link></p>
    
      </aside>) : (<aside id="homeAsideAccount" className = {asidePos} >
      <img src= {userData.userImage} alt="Joachim Ritter privat" />
        <p><strong>Hallo, {contactData.firstName} </strong><br />
         <br />Karrierelevel <br />--- <span> </span> ---<br /></p> <br />
              
        <div id="home_data">
          <p> Ihr persönlicher Wissensstatus</p>
          <div>
            <div>myKF <p id="myKF">0</p></div>
            <div>myLF <p id="myLF">0</p></div>
            <div>myPEDh <p id="myPED">0</p></div>
            <div>myPEXh <p id="myPEX">0</p></div>
          </div>
          <div>
            <div><p id="maKF">{marketData.maKF}</p>maKF</div>
            <div><p id="maLF">{marketData.maLF}</p>maLF</div>
            <div><p id="maPED">{marketData.maPEDh}</p>maPED</div>
            <div><p id="maPEX">{marketData.maPEXh}</p>maPEX</div>
          </div>
          <p> Markt Wissensdurchschnitt</p>
        </div>    
        <p>Ihr aktuelles <span className="LitCoin">L</span><span className="Calli">it</span><span className="LitCoin">C</span><span className="Calli">oin</span> Guthaben:</p>
        <div id="aside_gutbox">
          <p id="aside_guthaben"></p> 
          <p className="LC">0 </p>
        </div>
        <p>Ihre Wissensdaten wurden noch nicht angelegt. Zum Aktivieren bitte <Link to="/KnowledgeAccount">hier</Link> klicken! </p></aside> )
      }
   </>
   )
};

export default AccountAside