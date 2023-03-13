import { createContext, useState } from "react";
import axiosConfig from "../util/axiosConfig.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const SectionsContext = createContext();

const SectionsProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(() => {
    const isLoggedCookie = Cookies.get("isLogged");
    if (!isLoggedCookie) return false;
    const newDate = parseInt(new Date().getTime());
    if (isLoggedCookie < newDate) {
      return false;
    } else {
      return true;
    }
  });
  const [buttonPos, setButtonPos] = useState("");
  const [showAccount, setShowAccount] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  //const [eventLogin, setEventLogin] = useState(false);
  const [userData, setUserData] = useState({});

  const logout = () => {
    localStorage.clear();
    setIsAuth(false);
    setLoggedIn(false);
    setShowAccount("hideAccount");
    //setEventLogin(false);
    axiosConfig.post("/user/logout").then((res) => {
      console.log(res.data);
    });
    swal({
      title: `Du hast dich erfolgreich abgemeldet`,
      icon: "success",
    });
    navigate("/home");
  };


  return (
    <SectionsContext.Provider
      value={{
        isAuth,
        logout,
        setIsAuth,
        buttonPos, 
        setButtonPos,
        navigate,
        //eventLogin,
        //setEventLogin,
        userData,
        setUserData,
        showAccount, 
        setShowAccount,
        loggedIn, 
        setLoggedIn
      }}
    >
      {children}
    </SectionsContext.Provider>
  );
};

export { SectionsContext, SectionsProvider };

