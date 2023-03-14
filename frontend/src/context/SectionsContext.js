import { createContext, useState } from "react";
import axiosConfig from "../util/axiosConfig.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const SectionsContext = createContext();

const SectionsProvider = ({ children }) => {
  const navigate = useNavigate();
  const [goSite, setGoSite ] = useState("")
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
  const [buttonPos, setButtonPos] = useState(isAuth ? "showBut" : "");
  const [asidePos, setAsidePos] = useState("accountAside");
  //const [loggedIn, setLoggedIn] = useState("true");
  const [userData, setUserData] = useState({});


  const logout = () => {
    localStorage.clear();
    setIsAuth(false);
    /* if(!isAuth && asidePos === "accountAside showAccount") {setAsidePos("accountAside hideAccount")
  } else { setAsidePos("accountAside hideAccount")} */
    
    axiosConfig.post("/user/logout").then((res) => {
      console.log(res.data);
    });
    swal({
      title: `Sie haben sich erfolgreich abgemeldet`,
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
        navigate,
        setButtonPos,
        goSite,
        setGoSite,
        //eventLogin,
        //setEventLogin,
        userData,
        setUserData,
        asidePos, 
        setAsidePos,
        /* loggedIn, 
        setLoggedIn */
      }}
    >
      {children}
    </SectionsContext.Provider>
  );
};

export { SectionsContext, SectionsProvider };

