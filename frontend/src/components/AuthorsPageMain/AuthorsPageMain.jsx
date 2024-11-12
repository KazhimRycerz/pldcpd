import "./AuthorsPageMain.scss";
import {  useLocation, useSearchParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SectionsContext } from "../../context/SectionsContext.js";
import axiosConfig from "../../util/axiosConfig";
import Moment from "moment"
import { DoubleRightOutlined, CloseOutlined, EditOutlined, SaveOutlined, StopOutlined, StepBackwardOutlined, StepForwardOutlined  } from "@ant-design/icons";

const AuthorMain = () => {
//   const { state } = useLocation();
//   const  aID  = state;
//   //console.log(aID);
//   const { isAuth, buttonPos, setButtonPos, setAsidePos, navigate } = useContext(SectionsContext);
//   const [authorsData, setAuthorsData] = useState({})
//   const [authorsDetails, setAuthorsDetails] = useState({})
//   const [authorsExpertise, setAuthorsExpertise] = useState([])
//   const [authorsCourses, setAuthorsCourses] = useState([])
  
//   const buttonPosCheck = ()=>{
//     if (isAuth) {setButtonPos("showBut"); setAsidePos ("accountAside")
//   }}
  
//   const getAuthorsData = async (id) => {
//   const userID = id
//   const axiosResp = await axiosConfig.get(`/authorsinfo/${userID}`);
//   const authorsData = axiosResp.data;
//   const authorsDetails = axiosResp.data.authorsData;
//   const authorsExpertise = axiosResp.data.authorsData.fieldsOfExpertise;
//   setAuthorsData(authorsData)
//   setAuthorsDetails(authorsDetails)
//   setAuthorsExpertise(authorsExpertise)
//   //console.log(authorsDetails)
//   //console.log(authorsExpertise)
// };



// const zurückZurListe = () => {
//   navigate(-1)
// }

// useEffect(() => {
//   getAuthorsData(aID);
//   //buttonPosCheck(buttonPos);
// }, [/* buttonPos, */ aID]);

useEffect(() => {
  const aID = sessionStorage.getItem("aID");
  if (aID) {
    getAuthorsData(aID);  // `getAuthorsData` wird mit der ID aufgerufen
  }
}, []);

const [searchParams] = useSearchParams();
  const aID = searchParams.get("aID");  // `aID` aus den URL-Parametern lesen
  
  const { isAuth, setButtonPos, setAsidePos } = useContext(SectionsContext);
  const [authorsData, setAuthorsData] = useState({});
  const [authorsDetails, setAuthorsDetails] = useState({});
  const [authorsExpertise, setAuthorsExpertise] = useState([]);
  
  const buttonPosCheck = () => {
    if (isAuth) {
      setButtonPos("showBut");
      setAsidePos("accountAside");
    }
  };

  const getAuthorsData = async (id) => {
    try {
      const axiosResp = await axiosConfig.get(`/authorsinfo/${id}`);
      const authorsData = axiosResp.data;
      const authorsDetails = axiosResp.data.authorsData;
      const authorsExpertise = axiosResp.data.authorsData.fieldsOfExpertise;
      
      setAuthorsData(authorsData);
      setAuthorsDetails(authorsDetails);
      setAuthorsExpertise(authorsExpertise);
    } catch (error) {
      console.error("Error fetching author data:", error);
    }
  };

  const zurückZurListe = () => {
    window.close();
  };

  useEffect(() => {
    if (aID) {
      getAuthorsData(aID);
      buttonPosCheck();
    }
  }, [aID]);

  return (
    <main id="authorsPageMain"> {/* Styling in global */}
    < CloseOutlined className="closeX" onClick={() => window.close()} /> 
      <div className="headBox">
        <h2 id="courseHead">Autoren Info</h2>
      </div>
        <p onClick={zurückZurListe} className=" pFunction" >schließen</p>
      
      <div id="authorsArticle">
        <h2>{authorsData.professionalTitle} {authorsData.firstName} {authorsData.lastName}, {authorsData.appendix}</h2>
        
        <div>
          {/* <div className="courseBoxes"> 
              <p>Autorenname:</p> 
              <output className="output" id="courseTopic">{authorsData.professionalTitle} {authorsData.firstName} {authorsData.lastName}, {authorsData.appendix}</output>
          </div> */}
          <div id="contentImages">
            <p></p>
            {[...Array(2)].map((_, i) => (
              <img key={i} src={require('../../images/level_5_senior.jpg')} alt="" />
            ))}
          </div>
          <div> 
              <p>Vitae</p> 
              <output id="authorVitae">{authorsDetails.careerSummary}</output>
          </div>
           {/* <div> 
              <p>Themenexpertise</p> 
              <output id="authorExpertise">{authorsDetails.fieldsOfExpertise}</output>
          </div> */}
          <div>
            <p>Expertise in Themen</p> 
            <div className="output" id="fieldsOfExpertise">
              <ul>
                {authorsExpertise && authorsExpertise.length > 0 ? 
                  (authorsExpertise.map((field, index) => (
                    <li key={index} id="authorsExpertise">
                      {field}
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
        </div>
      </div>

      <div id="buttonBox">
        <button className="buttonBasics pFunction">Themen Autor</button>
      </div> 
      
    </main>
  );
};
export default AuthorMain;
