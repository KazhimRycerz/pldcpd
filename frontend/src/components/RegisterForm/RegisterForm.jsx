import React, { useState, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import axiosConfig from "../../util/axiosConfig.js";
import { SectionsContext } from "../../context/SectionsContext.js";
import "./RegisterForm.scss";
import GenderRadioBtn from "../Gender/GenderRadioBtn.jsx";
import ImageUpload from '../../components/ImageUpload/ImageUpload.jsx'
import {
  TextInput,
  MailInput,
  PasswordInput,
} from "../Inputs/Inputs.jsx";
import {
  BackBtnToOne,
  NextBtnToStepTwo,
  BackBtnToTwo,
  NextBtnToThree,
  SubmitBtn,
  ResetBtn,
} from "../NextBtnRegister/NextBtnRegister.jsx"; 
import Swal from "sweetalert2";
//import swal from "sweetalert";

export default function RegisterForm() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);
  const { setIsAuth, navigate } = useContext(SectionsContext);

  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);

  const formEl = useRef(null);
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [genderRadio, setGenderRadio] = useState("none");
  const [userImage, setUserImage] = useState(null);
  const [eMail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [location, setLocation] = useState("");

  const props = {
    userName,
    setUserName,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    genderRadio,
    setGenderRadio,
    userImage,
    setUserImage,
    password,
    setPassword,
    eMail,
    setEmail,
    stepOne,
    setOne: setStepOne,
    stepTwo,
    setTwo: setStepTwo,
    stepThree,
    setThree: setStepThree,
  };
  
  const submitHandler = async () => {
    try {
    setHasRegistered(false);
    setIsLoading(true);
    
    let formData = new FormData();
    formData.append('userName', userName);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('gender', genderRadio);
    formData.append('eMail', eMail);
    formData.append('password', password);

    if (userImage) {
      // Check if the image exists
      const imageFile = userImage instanceof File ? userImage : null;
      if (imageFile) {
        // Check the image file type
        if (imageFile.type.startsWith('image/')) {
          // Add the image to the FormData object
          formData.append('userImage', imageFile, imageFile.name);
        } else {
          console.error('Invalid image file type');
        }
      } else {
        console.error('Invalid image');
      }
    }

    console.log("Bild zur Verarbeitung", userImage);
    console.log("FormData Contents:");
      for (const [key, value] of formData.entries()) {
        console.log(`Key: ${key}, Value: ${value}`);
      }
      const axiosResp = await axiosConfig.post("/user", formData, {
        /* headers: {
          "Content-Type": "multipart/form-data"
        } */
      });
      console.debug("axiosResp.data:", axiosResp.data);
      setIsLoading(false);
      if (axiosResp.data.error) {
        setIsError(true);
        setIsLoading(false);
        setHasRegistered(false);
        return;
      }
    } catch (error) {
      for (const err of error.response.data.errors) {
        if (err.msg === "Invalid value" && err.param === "email") {
          Swal.fire({
            title: "Tragen Sie eine valide Email Adresse ein",
          });
          break;
        } else if (err.msg === "Invalid value" && err.param === "password") {
          Swal.fire({
            title: "Passwort ist ein Pflichtfeld! ",
            text: "Ihr Passwort muss mindestens 8 Zeichen lang sein und eine Zahl, einen Groß- und einen Kleinbuchstaben enthalten.",
          });
        } else {
          setIsError(true);
          setIsLoading(false);
          setHasRegistered(false);
        }
      }
      console.error("Error while sending with axios", error);
      return;
    }
    setIsError(false);
    setHasRegistered(true);
    //logIn(axiosResp.data);
  };

  const logIn = async (data) => {
    try {
      const axiosResp = await axiosConfig.post("/user/login", data);
      console.log("successful logged in");
      handleSuccessfulLogin(axiosResp.data/* , data.location */);
    } catch (error) {
      console.log("Fehler beim login", error);
    }
  };

  const handleSuccessfulLogin = (respData, location) => {
    setIsAuth(true);
    localStorage.setItem("userName", respData.userName);
    localStorage.setItem("userId", respData.userId);
  };

  const confirmRegistration = () => {
    Swal.fire({
      title: `Sie haben sich erfolgreich als ${userName} registriert. Möchten Sie sich nun anmelden, um weitere Daten einzugeben?`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Ja, bitte nun einloggen!',
      cancelButtonText: 'Nein, zur Main'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/login');
        //logIn(data)
      } else if (result.isDismissed) {
        navigate('/home');
      } else {
        Swal.fire('Alles gut!', '', 'success');
      }
    });
  };
  

  return (
    <main id="registerMain">
      <h2>registrieren</h2>
      <form ref={formEl} method="post" action="/user" encType="multipart/form-data" onSubmit={(e) => submitHandler(e)}>

        {stepOne && (
          <>
            <div id="stepOne">
              <div>
                <label 
                htmlFor="userName">
                  Benutzername:<sup id="infoUsername">*</sup>
                </label>
                <TextInput labelValue="userName" stateFunc={setUserName}/>
              </div>
              <div>
                <label htmlFor="firstName">Vorname:
                <sup id="infoFirstName" hover-text="Pflichtfeld: Ihren Vornamen">*</sup>
                </label>
                <TextInput labelValue="firstName" stateFunc={setFirstName} />
              </div>
              <div>
                <label htmlFor="lastName">Nachname:
                <sup id="infoLastName">*</sup>
                </label>
                <TextInput labelValue="lastName" stateFunc={setLastName} />
              </div>
              {/* <label htmlFor="location">
                <div>
                  Wohnort:<sup id="infoLocation">*</sup>
                </div>
                <TextInput labelValue="location" stateFunc={setLocation} />
              </label> */}
              <div><NextBtnToStepTwo props={props} /></div>
            </div>
          </>
        )}
        {stepTwo && (
  <div id="stepTwo">
    <p>Geschlecht</p>
    <div id="radioGenderButtons">
      <GenderRadioBtn gender="female" props={props} />
      <GenderRadioBtn gender="male" props={props} />
      <GenderRadioBtn gender="diverse" props={props} />
      <GenderRadioBtn gender="none" props={props} />
    </div>
    <p>Bild hochladen</p>
    <ImageUpload setUserImage={setUserImage} /> {/* Übergeben der setUserImage-Funktion */}
    <div id="buttonBoxStepTwo">
      <ResetBtn props={props} />
      <BackBtnToOne props={props} />
      <NextBtnToThree props={props} />
    </div>
  </div>
)}

        {stepThree && (
          <div id="stepThree">
            <div>
              <label htmlFor="email">E-Mail Adresse:<sup id="infoEmail">*</sup></label>
                <MailInput labelValue="email" stateFunc={setEmail} />
            </div>
            <div>
              <label htmlFor="password"> Passwort:<sup id="infoPsw">*</sup></label>
              <PasswordInput labelValue="password" stateFunc={setPassword} />
            </div>
            <div id="buttonBoxStepThree">
              <ResetBtn props={props} />
              <BackBtnToTwo props={props} />
              <SubmitBtn props={props} submitHandler={submitHandler} />
            </div>
          </div>
        )}
      </form>
      <div id="footerInForm">
        {isError && (
          <p>
            <strong>Es ist ein Fehler aufgetreten.</strong>
          </p>
        )}
        {hasRegistered && (
          <>
          {confirmRegistration()}
          </>
        )}

        {/* {isAuth && eventLogin && <Navigate to="/event-form" replace={true} />}
        {isAuth && backToEvent && (
          <Navigate to={`/event/${interestedEvent}`} replace={true} />
        )} 
        {isAuth && !eventLogin && !backToEvent && <Navigate to="/profile" />}*/}
        {isLoading ? (
          <p>
            <strong>Daten weren geladen – bitte einen Moment warten...</strong>
          </p>
        ) : null}
        {/* {(stepTwo || stepThree) && <ResetBtn props={props} />} */}
        <p id="textKonto">Sie sind schon registriert? <br />Dann können Sie sich hier einloggen oder zurück zur Hauptseite</p>
        <div id="registerButtonBox">
          <button className="buttonBasics" id="bereitsRegistriert">
            <NavLink to={"/login"}> zum Login</NavLink>
          </button>
          <button className="buttonBasics" id="registriertAbbrechen">
            <NavLink to={"/home"}>Home</NavLink>
          </button>
        </div>
      </div>
    </main>
  );
}