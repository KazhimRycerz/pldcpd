import { createContext, useState, useEffect } from "react";
import axiosConfig from "../util/axiosConfig.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const SectionsContext = createContext();
const userId = localStorage.getItem("userId");

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
  const [accessRights, setAccessRights] = useState(1)
  // Seite AccessLevel 0 = Zugang für jedermann
  // Seite AccessLevel 1 = Zugang für zahlende Kunden
  // Seite AccessLevel 2 = Zugang für Admin
  // Seite AccessLevel 3 = Zugang für Admin
  // Seite AccessLevel 4 = Zugang für Admin
  // Seite AccessLevel 5 = Zugang für WedevAadmin

  const logout = () => {
    localStorage.clear();
    setIsAuth(false);  
    axiosConfig.post("/user/logout").then((res) => {
      //console.log(res.data);
    });
    gotoPage === "/KnowledgeAccount" && navigate("/home");
    gotoPage === "/userupdate" && navigate("/home");
    Swal.fire({
      title: `Sie haben sich erfolgreich abgemeldet`,
      icon: "success",
      timer: 5000,
    })
  };

  /* const getUserData = async () => {
    const axiosResp = await axiosConfig.get(
       `http://localhost:4000/user/${userId}`
       );
       const userData = axiosResp.data;
       const contactData = axiosResp.data.contactData;
       const contactKnowledgeData = axiosResp.data.contactData.professionalStatus;
        setUserData(userData);
        setContactData(contactData);
        setKnowledgeData(contactKnowledgeData)
       //console.log(userData)
       //console.log(contactData)
       //console.log(contactKnowledgeData)
    };

    const getMarketKnowledgeData = async () => {
      const axiosResp = await axiosConfig.get(
         `http://localhost:4000/professionalStatus`
         );
         const marketData = axiosResp.data;
         setMarketData(marketData)
      };

    useEffect(() => {
      isAuth && getMarketKnowledgeData();
      isAuth && getUserData();
   }, []); */

  return (
    <SectionsContext.Provider
      value={{
        isAuth,
        logout,
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

