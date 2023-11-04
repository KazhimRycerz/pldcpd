import React, { useState, useRef, useContext } from "react";
import axiosConfig from "../../util/axiosConfig.js";
import { SectionsContext } from "../../context/SectionsContext.js";
import { Link } from "react-router-dom";
import "./LoginForm.scss";
import Swal from "sweetalert2";
//import swal from "sweetalert";

function LoginForm() {
  const { setButtonPos, navigate, gotoPage, isAuth, setIsAuth, logout} = useContext(SectionsContext)
  const [isLoading, setIsLoading] = useState(false);
  const formEl = useRef(null);
  const usernameEL = useRef(null);
  const passwordEl = useRef(null);
  const getUserData = async (respData) => {
    const axiosResp = await axiosConfig.get(
      `http://localhost:4000/user/${respData}`
      );
      //const defSearch = axiosResp.data.location.toLowerCase();
      //return defSearch;
    };

  const handleSuccessfulLogin = async (respData) => {
    localStorage.setItem("defSearch", await getUserData(respData.userId));
    setIsAuth(true);
    localStorage.setItem("userName", respData.userName);
    localStorage.setItem("userId", respData.userId);
    localStorage.setItem("firstName", respData.firstName);
    setButtonPos("showBut");
    //window.history.back();
    //navigate(-1);
    navigate(gotoPage)
  };

  const logoutHandler = () => {
    Swal.fire({
      title: `Du bist aktuell als ${localStorage.userName} angemeldet. Möchtest du dich ausloggen oder als ein anderer Nutzer anmelden oder den Vorgang abbrechen?`,
      icon: "info",
      iconColor: "red",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "ausloggen",
      denyButtonText: "bitte als anderer Nutzer einloggen!",
      cancelButtonText: "abbrechen",
      allowOutsideClick: false,
      customClass: {
        /* confirmButton: 'buttonBasics',
        cancelButton: 'buttonBasics', 
        denyButton: 'buttonBasics',*/
        popup: 'containerBox',
        actions: 'actionButtons'
      },
      buttonsStyling: false,
    })
    .then((result) => {
      if (result.isConfirmed) {
        logout();
        setButtonPos("");
        navigate("/home");
      } else if (result.isDenied) {
        logout();
        setButtonPos("");
        navigate("/login");
      } else if (result.isDismissed) {
        navigate(-1);
      } else {
        Swal.fire("Nichts passiert. Got away safely!");
      }
    });
    
    }

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
        button: "OK",
      });
    }

    formEl.current.reset(); // Alle Felder vom Formular leer machen
  };

  return (
    <main id="loginMain">
      <h2 id="loginh2">anmelden</h2>
      {!isAuth ?
        (<form id="loginForm" ref={formEl} method="post" onSubmit={submitHandler}>
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
            <button className="buttonBasics" id="loginButton" type="submit" value="Daten senden">Daten senden
            </button>
          </div>
        </form>):(
        <div>{logoutHandler()}</div> 
        )
      }

      <p id="textKeinKonto">Sie haben noch kein Konto? Dann können Sie sich hier als neuer User</p>
      <div id="buttonInside">
        <button className="buttonBasics" id="toRegisterButton">
          <Link to={"/register"}>registrieren</Link>
        </button>
      </div>

      {isLoading && <p id="ladeInfo">Ihre Daten werden geladen - bitte warten...</p>}
    </main>
  );
}

export default LoginForm;
