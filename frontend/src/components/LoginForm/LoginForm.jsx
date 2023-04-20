import React, { useState, useRef, useContext } from "react";
import axiosConfig from "../../util/axiosConfig.js";
import { SectionsContext } from "../../context/SectionsContext.js";
import { Link } from "react-router-dom";
import "./LoginForm.scss";
import swal from "sweetalert";

function LoginForm() {
  const { setButtonPos, navigate, gotoPage, setIsAuth } = useContext(SectionsContext)
  const [isLoading, setIsLoading] = useState(false);
  const formEl = useRef(null);
  const usernameEL = useRef(null);
  const passwordEl = useRef(null);
  const getUserData = async (respData) => {
    const axiosResp = await axiosConfig.get(
      `http://localhost:4000/user/${respData}`
      );
      /* const defSearch = axiosResp.data.location.toLowerCase();
      return defSearch; */
    };

  const handleSuccessfulLogin = async (respData) => {
    localStorage.setItem("defSearch", await getUserData(respData.userId));
    setIsAuth(true);
    localStorage.setItem("userName", respData.userName);
    localStorage.setItem("userId", respData.userId);
    setButtonPos("showBut");
    //window.history.back();
    //navigate(-1);
    navigate(gotoPage)
    //navigate("/home");
  };

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
          swal({
            title: "Benutzername-Passwort-Kombination nicht korrekt",
            text: "Nochmal versuchen?",
          });
          return;
        }
        handleSuccessfulLogin(axiosResp.data);
      } catch (error) {
        console.error("Error while sending with axios", error);
        return;
      }
    } else {
      swal({
        title: "Bitte tragen Sie Ihren Benutzername und Passwort ein",
        button: "OK",
      });
    }

    formEl.current.reset(); // Alle Felder vom Formular leer machen
  };

  return (
    <main className="LoginForm">

      <>
        <h2>anmelden</h2>
        <form ref={formEl} method="post" onSubmit={submitHandler}>
          <label htmlFor="username">
            Benutzername:
            <input
              type="text"
              name="username"
              id="username"
              ref={usernameEL}
              placeholder="dein Benutzername"
            />
          </label>
          <label htmlFor="password">
            Passwort:
            <input
              type="password"
              name="password"
              id="password"
              ref={passwordEl}
              placeholder="dein Passwort"
            />
          </label>
          <input className="loginButton" type="submit" value="Daten senden" />
        </form>
      </>
      

      <h2>Sie haben noch kein Konto? Dann können Sie sich hier als neuer User</h2>
      <div id="toRegister">
        <Link to={"/register"} id="toRegisterButton">
          registrieren
        </Link>
      </div>

      {isLoading && <p id="ladeInfo">Lade - bitte warten...</p>}
    </main>
  );
}

export default LoginForm;
