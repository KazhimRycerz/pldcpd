import React, { useState, useRef, useContext } from "react";
import axiosConfig from "../../util/axiosConfig.js";
import { SectionsContext } from "../../context/SectionsContext.js";
import { Link } from "react-router-dom";
import "./LoginForm.scss";
import { LoadingOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
//import swal from "sweetalert";

const LoginForm = () => {
  const { setButtonPos, navigate, isAuth, setIsAuth, setUserMode, logout, setAccessRights } = useContext(SectionsContext)
  const [isLoading, setIsLoading] = useState(false);
  const formEl = useRef(null);
  const usernameEL = useRef(null);
  const passwordEl = useRef(null);
  
  // const getUserData = async (respData) => {
  //   const axiosResp = await axiosConfig.get(`/user/${respData}`);
  //     //console.log(axiosResp)
  //     return axiosResp.data;
  //   };

  const handleSuccessfulLogin = async (respData) => {
    //await getUserData(respData.userId);
    setIsAuth(true);
    //localStorage.setItem("defSearch", getUserData(respData.userId));
    localStorage.setItem("userName", respData.userName);
    localStorage.setItem("userId",  respData.userId);
    localStorage.setItem("accessRights", JSON.stringify(respData.accessRights));
    localStorage.setItem("firstName", respData.firstName);
    setButtonPos("showBut");
    const accessRights = JSON.parse(localStorage.getItem("accessRights"));
    setAccessRights(accessRights);
    Swal.fire({
      title: `Welcome back, ${respData.userName}, alias ${respData.firstName}! Ihre Anmeldung war erfolgreich`,
      icon: "success",
      timer: 5000,
    })
    if (Array.isArray(accessRights) && accessRights.some(item => item > 1)) {
      setUserMode("manager");
    }
    navigate(-1 | "home") 
  };

  // const logoutHandler = () => {
  //   if (isAuth) {
  //     Swal.fire({
  //       title: `Du bist aktuell als ${localStorage.getItem("userName") || "unbekannter Nutzer"} angemeldet. Möchtest du dich ausloggen oder als ein anderer Nutzer anmelden oder den Vorgang abbrechen?`,
  //       icon: "info",
  //       iconColor: "red",
  //       showDenyButton: true,
  //       showCancelButton: true,
  //       confirmButtonText: "Ausloggen",
  //       denyButtonText: "Als anderer Nutzer einloggen!",
  //       cancelButtonText: "Abbrechen",
  //       allowOutsideClick: false,
  //       customClass: {
  //         // confirmButton: 'buttonBasics',
  //         // cancelButton: 'buttonBasics',
  //         // denyButton: 'buttonBasics',
  //         popup: 'containerBox',
  //         actions: 'actionButtons'
  //       },
  //       buttonsStyling: false,
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         logout();
  //         setButtonPos("");
  //         navigate("/home");
  //       } else if (result.isDenied) {
  //         logout();
  //         setButtonPos("");
  //         navigate("/login");
  //       } else if (result.isDismissed) {
  //         navigate(-1); // Gehe zur vorherigen Seite zurück
  //       } else {
  //         Swal.fire("You're ok. Got away safely!");
  //       }
  //     });
  //   } else {
  //     logout();
  //   }
  // };

  const submitHandler = async (e) => {
    e.preventDefault();
    let data;
    if (usernameEL.current.value && passwordEl.current.value) {
      data = {
        userName: usernameEL.current.value,
        password: passwordEl.current.value,
      };
      try {
        setIsLoading(true);
        const axiosResp = await axiosConfig.post("/user/login", data);
        console.debug("axiosResp.data", axiosResp.data);
        setIsLoading(false);

        if (axiosResp.data.error) {
          Swal.fire({
            title: "Benutzername-Passwort-Kombination nicht korrekt",
            text: "Bitte versuchen Sie es nochmal?",
          });
          return;
        }
        handleSuccessfulLogin(axiosResp.data);
      } catch (error) {
        console.error("Error while sending with axios", error);
        return;
      }
    } else {
      Swal.fire({
        title: "Bitte tragen Sie Ihren Benutzername und Passwort ein",
        confirmButtonText: "OK",
      });
    }

    formEl.current.reset(); // Alle Felder vom Formular leer machen
  };

  return (
    <main id="loginMain">
      <div className="headBox">
        <h2 id="loginh2">anmelden</h2>
        <p className="closingFunction" onClick={() => navigate(-1)}>abbrechen und schließen</p>
      </div>
      {!isAuth ?
        (<form id="loginForm" ref={formEl}  onSubmit={submitHandler}>
          <div>
            <label htmlFor="username">Benutzername:</label>
            <input
              type="text"
              name="username"
              id="username"
              ref={usernameEL}
              placeholder="dein Benutzername"
            />
          </div>
          <div>
            <label htmlFor="password">Passwort:</label>
            <input
              type="password"
              name="password"
              id="password"
              ref={passwordEl}
              placeholder="dein Passwort"
            />
          </div>
          <div>
            <button className="buttonBasics pFunction" id="loginButton" type="submit">Daten senden
            </button>
          </div>
        </form>):(
        <div>
        <p>Du bist bereits angemeldet.</p>
        <button onClick={logout} className="buttonBasics">Ausloggen</button>
      </div> //geändert von logoutHandler() nach logout. Er ruf nun logout im SectionContext auf
        )
      }

      <p id="textKeinKonto">Sie haben noch kein Konto? Dann können Sie sich hier als neuer User</p>
      <div id="buttonInside">
        <button className="buttonBasics pFunction" id="registerButton">
          <Link to={"/register"}>registrieren</Link>
        </button>
      </div>

      {isLoading && <p id="ladeInfo">Ihre Daten werden geladen - bitte warten...<LoadingOutlined /></p>}
    </main>
  );
}

export default LoginForm;
