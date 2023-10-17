import "./AuthorsPageMain.scss";
import {  useLocation } from "react-router-dom";
//import C from "../../images/C.png"
import { useContext, useState, useEffect } from "react";
import { SectionsContext } from "../../context/SectionsContext.js";
import axiosConfig from "../../util/axiosConfig";
import Moment from "moment"

const AuthorMain = () => {
  const { state } = useLocation();
  const  aID  = state;
  //console.log(aID);
  const { isAuth, buttonPos, setButtonPos, setAsidePos, navigate } = useContext(SectionsContext);
  const [authorsData, setAuthorsData] = useState({})
  const [authorsDetails, setAuthorsDetails] = useState({})
  const [authorsExpertise, setAuthorsExpertise] = useState([])
  
  const buttonPosCheck = ()=>{
    if (isAuth) {setButtonPos("showBut"); setAsidePos ("accountAside")
  }}
  
  const searchAuthorsData = async (id) => {
  const userID = id
  const axiosResp = await axiosConfig
  .get(`http://localhost:4000/authorsinfo/${userID}`);
  const authorsData = axiosResp.data;
  const authorsDetails = axiosResp.data.authorsData;
  const authorsExpertise = axiosResp.data.authorsData.fieldsOfExpertise;
  setAuthorsData(authorsData)
  setAuthorsDetails(authorsDetails)
  setAuthorsExpertise(authorsExpertise)
  //console.log(authorsDetails)
  //console.log(authorsExpertise)
};

const zurückZurListe = () => {
  navigate(-1)
}

useEffect(() => {
  searchAuthorsData(aID);
  //buttonPosCheck(buttonPos);
}, [/* buttonPos, */ aID]);

  return (
    <main id="authorsPageMain"> {/* Styling in global */}
      <div id="headBox">
        <h2 id="courseHead">Autoren Info</h2>
        <button onClick={zurückZurListe} className="buttonBasics" >zurück zur Übersicht</button>
      </div>
      
      <article id="authorsArticle">
        <div className="courseBoxes"> 
            <p>Autorenname</p> 
            <div className="output" id="courseTopic">{authorsData.professionalTitle} {authorsData.firstName} {authorsData.lastName} {authorsData.appendix}</div>
        </div>
        {/* <div className="courseBoxes"> 
            <p>Autorenname</p> 
            <output id="courseTopic">{authorsData.professionalTitle} {authorsData.firstName} {authorsData.lastName} {authorsData.appendix}</output>
        </div> */}
        <div> 
            <p>Vitae</p> 
            <div className="output" id="authorVitae">{authorsDetails.careerSummary}</div>
        </div>
         {/* <div> 
            <p>Themenexpertise</p> 
            <output id="authorExpertise">{authorsDetails.fieldsOfExpertise}</output>
        </div> */}
        <div>
          <p>Expertise</p> 
          <div className="output" id="fieldsOfExpertise">
            <ul>
              {authorsExpertise && authorsExpertise.length > 0 ? 
                (authorsExpertise.map((field, index) => (
                  <li key={index} id="authorsExpertise">
                    <span className="C">C</span> {field}
                  </li>
                  ))
                ) : (
                  <li>No fields of expertise defined.</li>
                  )
              }
            </ul>
          </div>
        </div>

        <div> 
            <p>letzte Aktualisierung</p> 
            <div className="output" id="authorUpdate" >{Moment(authorsDetails.updatedOn).format("DD.MM.YYYY")}</div>
        </div> 
        <div> 
          <p>weitere Angebote</p> 
          <div className="output" id="authorsOffers" >hier kommt die Liste anderer Themen hin</div>
        </div>
      </article>

      <div>
        <h2></h2>
        <button className="buttonBasics">Themenliste Autor</button>
      </div> 
      
    </main>
  );
};
export default AuthorMain;
