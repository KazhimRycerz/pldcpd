import React, { useState, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import axiosConfig from "../../util/axiosConfig.js";
import { SectionsContext } from "../../context/SectionsContext.js";
import "./RegisterForm.scss";
import GenderRadioBtn from "../Gender/GenderRadioBtn.jsx";
import {
  TextInput,
  MailInput,
  PasswordInput,
} from "../Inputs/Inputs.jsx";
import {
  NextBtnToStepTwo,
  NextBtnToThree,
  SubmitBtn,
  ResetBtn,
} from "../NextBtnRegister/NextBtnRegister.jsx"; 
import swal from "sweetalert";

export default function RegisterForm() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);
  const { setIsAuth } =
    useContext(SectionsContext);

  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);

  const formEl = useRef(null);
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [genderRadio, setGenderRadio] = useState("none");
  const [eMail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");

  const props = {
    userName: userName,
    setUserName: setUserName,
    firstName: firstName,
    setFirstName: setFirstName,
    lastName: lastName,
    setLastName: setLastName,
    location: location,
    setLocation: setLocation,
    genderRadio: genderRadio,
    setGenderRadio: setGenderRadio,
    password: password,
    setPassword: setPassword,
    eMail: eMail,
    setEmail: setEmail,
    stepOne: stepOne,
    setOne: setStepOne,
    stepTwo: stepTwo,
    setTwo: setStepTwo,
    stepThree: stepThree,
    setThree: setStepThree,
  };

  const submitHandler = async () => {
    /*  e.preventDefault(); */
    const data = {
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      /* gender: genderRadio, */
      eMail: eMail,
      password: password,
      /* location: location, */
    };

    try {
      setHasRegistered(false);
      setIsLoading(true);
      const axiosResp = await axiosConfig.post("/user", data);
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
          swal({
            title: "Tragen Sie eine valide Email Adresse",
          });
          break;
        } else if (err.msg === "Invalid value" && err.param === "password") {
          swal({
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
    logIn(data);
  };

  const logIn = async (data) => {
    try {
      const axiosResp = await axiosConfig.post("/user/login", data);
      console.log("successful logged in");
      handleSuccessfulLogin(axiosResp.data, data.location);
    } catch (error) {
      console.log("Fehler beim login", error);
    }
  };

  const handleSuccessfulLogin = (respData, location) => {
    const locationLowercase = location.toLowerCase(); 
    localStorage.setItem("defSearch", locationLowercase);
    setIsAuth(true);
    localStorage.setItem("userName", respData.userName);
    localStorage.setItem("userId", respData.userId);
  };

  return (
    <main className="RegisterForm">
      <h2>registrieren</h2>
      <form ref={formEl} method="POST" action="/user">
        {stepOne && (
          <>
            <div id="stepOne">
              <label htmlFor="userName">
                <div>
                  Benutzername:<sup id="infoUsername">*</sup>
                </div>
                <TextInput labelValue="userName" stateFunc={setUserName} />
              </label>
              <label htmlFor="firstName">
                <div>
                  Vorname:
                  <sup
                    id="infoFirstName"
                    hover-text="Pflichtfeld: Ihren Vornamen"
                  >
                    *
                  </sup>
                </div>
                <TextInput labelValue="firstName" stateFunc={setFirstName} />
              </label>
              <label htmlFor="lastName">
                <div>
                  Nachname:<sup id="infoLastName">*</sup>
                </div>
                <TextInput labelValue="lastName" stateFunc={setLastName} />
              </label>
              {/* <label htmlFor="location">
                <div>
                  Wohnort:<sup id="infoLocation">*</sup>
                </div>
                <TextInput labelValue="location" stateFunc={setLocation} />
              </label> */}
              <NextBtnToStepTwo props={props} />
            </div>
          </>
        )}
        {stepTwo && (
          <div id="stepTwo">
            <div className="gender">
              <h3>Geschlecht:</h3>
              <div className="radio">
                <GenderRadioBtn gender="female" props={props} />
                <GenderRadioBtn gender="male" props={props} />
                <GenderRadioBtn gender="diverse" props={props} />
                <GenderRadioBtn gender="none" props={props} />
              </div>
            </div>
            {/* <div className="disabilities">
              <label htmlFor="disabilities">
                <h3>Eventuelle Einschränkung</h3>
              </label>
              <TextInput
                labelValue="disabilities"
                stateFunc={setDisabilities}
              />
            </div> */}
            <NextBtnToThree props={props} />
          </div>
        )}
        {stepThree && (
          <div id="stepThree">
            <label htmlFor="email">
              <div>
                E-Mail Adresse:<sup id="infoEmail">*</sup>
              </div>
              <MailInput labelValue="email" stateFunc={setEmail} />
            </label>
            <label htmlFor="password">
              <div>
                Passwort:<sup id="infoPsw">*</sup>
              </div>
              <PasswordInput labelValue="password" stateFunc={setPassword} />
            </label>
            <SubmitBtn props={props} submitHandler={submitHandler} />
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
          <p>
            <strong>Sie haben sich erfolgreich registriert.</strong>
          </p>
        )}

        {/* {isAuth && eventLogin && <Navigate to="/event-form" replace={true} />}
        {isAuth && backToEvent && (
          <Navigate to={`/event/${interestedEvent}`} replace={true} />
        )} 
        {isAuth && !eventLogin && !backToEvent && <Navigate to="/profile" />}*/}
        {isLoading ? (
          <p>
            <strong>Lade – bitte warten...</strong>
          </p>
        ) : null}
        {(stepTwo || stepThree) && <ResetBtn props={props} />}
        <div id="registerButtons">
          <button className="buttonBasics" id="bereitsRegistriert">
            <NavLink to={"/login"}> zum Login</NavLink>
          </button>
          <button className="buttonBasics" id="registriertAbbrechen">
            <NavLink to={"/home"}>abbrechen und zurück</NavLink>
          </button>
        </div>
      </div>
    </main>
  );
}
