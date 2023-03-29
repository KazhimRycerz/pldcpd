import React, { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { SectionsContext } from "../context/SectionsContext.js";
import Login from "../pages/LoginPage/Login.jsx";
import UserProfile from "../pages/UserProfile/UserProfile.jsx";

function AuthLogin() {
  const { isAuth, setIsAuth, setAllSectFalse, setIsHome } =
    useContext(SectionsContext);

  const hasValidToken = () => {
    const cookieValue = Cookies.get("isLogged");
    if (!cookieValue) return false;
    const expiresInMs = cookieValue - new Date().getTime();
    if (expiresInMs <= 0) return false;
    return true;
  };

  useEffect(() => {
    if (hasValidToken()) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return <div>{!isAuth ? <Login /> : <UserProfile />}</div>;
}

export default AuthLogin;
