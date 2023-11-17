import { createContext, useState, useEffect } from "react";
import axiosConfig from "../util/axiosConfig.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const SectionsContext = createContext();
//const userId = localStorage.getItem("userId");

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
  const [buttonPos, setButtonPos] = useState(isAuth ? "showBut" : "buttonZeroPosition");
  const [asidePos, setAsidePos] = useState("accountAside");
  const [userData, setUserData] = useState({});
  const [contactData, setContactData] = useState({});
  const [knowledgeData, setKnowledgeData] = useState({});
  const [marketData, setMarketData] = useState({});
  const [gotoPage, setGotoPage] = useState("/home")
  const [accessRights, setAccessRights] = useState([0])

  const logout = async () => {
    const logoutName = localStorage.getItem("userName")
    setIsAuth(false);
    axiosConfig.post("/user/logout").then((res) => {
      console.log(res.data);
    });
    localStorage.clear();
    setAccessRights([0]) 
    //console.log(accessRights)
    //console.log(localStorage)
    !localStorage.length && navigate("/home")
    /* if (gotoPage === "/KnowledgeAccount") { navigate("/home")
  } else if (gotoPage === "/userupdate") { navigate("/home")
  } else if (gotoPage === "/courseaddpage") { navigate("/home")
  } else {navigate(gotoPage)} */
    Swal.fire({
      title: `Sie haben sich erfolgreich abgemeldet, ${logoutName}. Besuchen sie uns bald wieder!`,
      icon: "success",
      timer: 5000,
    })
  };

  const getUserData = async () => {
    const userId = localStorage.getItem("userId");
    const axiosResp = await axiosConfig.get(
       `/user/${userId}`
       //`http://localhost:4000/user/${userId}`
       );
       const userData = axiosResp.data;
       const contactData = axiosResp.data.contactData;
       const contactKnowledgeData = axiosResp.data.contactData.professionalStatus;
       const accessRights = axiosResp.data.accessRights
        setUserData(userData);
        setContactData(contactData);
        setKnowledgeData(contactKnowledgeData)
        setAccessRights(accessRights)
    };

    const getMarketKnowledgeData = async () => {
      const axiosResp = await axiosConfig.get(
         "/professionalStatus"
         );
         const marketData = axiosResp.data;
         setMarketData(marketData)
      };

    useEffect(() => {
      isAuth && getMarketKnowledgeData();
      isAuth && getUserData();
   }, [isAuth]);

  return (
    <SectionsContext.Provider
      value={{
        isAuth,
        logout,
        /* getUserData, */
        gotoPage, 
        setGotoPage,
        setIsAuth,
        accessRights, 
        setAccessRights,
        buttonPos, 
        navigate,
        setButtonPos,
        //eventLogin,
        //setEventLogin,
        userData,
        setUserData,
        contactData, 
        setContactData,
        knowledgeData, 
        setKnowledgeData,
        marketData, 
        setMarketData,
        asidePos, 
        setAsidePos,
      }}
    >
      {children}
    </SectionsContext.Provider>
  );
};

export { SectionsContext, SectionsProvider };

