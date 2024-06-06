import { createContext, useState, useEffect } from "react";
import axiosConfig from "../util/axiosConfig.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const SectionsContext = createContext();
//const userId = localStorage.getItem("userId");

const SectionsProvider = ({ children }) => {
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
  const navigate = useNavigate();
  const [buttonPos, setButtonPos] = useState(isAuth ? "showBut" : "buttonZeroPosition");
  const [asidePos, setAsidePos] = useState("");//accountAside
  const [userData, setUserData] = useState({});
  const [contactData, setContactData] = useState({});
  const [knowledgeData, setKnowledgeData] = useState({});
  const [marketData, setMarketData] = useState({});
  const [gotoPage, setGotoPage] = useState("/home");
  const [accessRights, setAccessRights] = useState([0]);
  const [authorsData, setAuthorsData] = useState({})
  const [companyData, setCompanyData] = useState({})
  const [careerData, setCareerData] = useState([0]);
  const [cpdData, setCPDData] = useState([0])
  /* const [objectSize, setObjectSize] = useState(100);
  const [objectPosition, setObjectPosition] = useState({ x: 50, y: 50 }); */
  const [objectSize, setObjectSize] = useState(() => {
    const savedSize = localStorage.getItem('objectSize');
    return savedSize ? parseInt(savedSize) : 100;
  });
  const [objectPosition, setObjectPosition] = useState(() => {
    const savedPosition = localStorage.getItem('objectPosition');
    return savedPosition ? JSON.parse(savedPosition) : { x: 50, y: 50 };
  });
  
  useEffect(() => {
    localStorage.setItem('objectSize', objectSize);
    localStorage.setItem('objectPosition', JSON.stringify(objectPosition));
  }, [objectSize, objectPosition]);

  const saveUserSettings = async () => {
    //console.log(objectSize, objectPosition)
    try {
      const userId = localStorage.getItem("userId");
      await axiosConfig.patch(`/user/usersettings/${userId}`, { objectSize, objectPosition });
      return true;
    } catch (error) {
      console.error("Error saving user settings:", error);
      return false;
    }
  };

  const logout = async () => {
    const logoutName = localStorage.getItem("firstName")
    const logoutUser = localStorage.getItem("userName")
    setIsAuth(false);
    axiosConfig.post("/user/logout").then((res) => {
    });
    localStorage.clear();
    setAccessRights([0]) 
    //console.log(localStorage)
    !localStorage.length && navigate("/home")
    Swal.fire({
      title: `Sie haben sich erfolgreich abgemeldet, ${logoutName}, alias ${logoutUser}. Besuchen sie uns bald wieder!`,
      icon: "success",
      timer: 5000,
    })
  };

  const getUserData = async () => {
    const userId = localStorage.getItem("userId");
    const axiosResp = await axiosConfig.get(
       `/user/${userId}`
       );
       const userData = axiosResp.data;
       const contactData = axiosResp.data.contactData;
       const contactKnowledgeData = axiosResp.data.contactData.professionalStatus;
       const accessRights = axiosResp.data.accessRights
       const authorsData = axiosResp.data.contactData.authorsData
       const companyData = axiosResp.data.contactData.currentCompany
       const careerData = axiosResp.data.contactData.careerPath
       const cpdData = axiosResp.data.contactData.cpdTracker
       const objectSize = axiosResp.data.objectSizeUserImage
       const objectPosition = axiosResp.data.objectPositionUserImage
       setUserData(userData);
       setContactData(contactData);
       setKnowledgeData(contactKnowledgeData)
       setAccessRights(accessRights);
       setAuthorsData(authorsData)
       setCompanyData(companyData)
       setCareerData(careerData)
       setCPDData(cpdData)
       setObjectSize(objectSize || 100)
       setObjectPosition(objectPosition || { x: 50, y: 50 })
       //console.log(objectPosition)
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
        gotoPage, 
        setGotoPage,
        setIsAuth,
        accessRights, 
        setAccessRights,
        buttonPos, 
        navigate,
        setButtonPos,
        userData,
        setUserData,
        getUserData,
        contactData, 
        setContactData,
        knowledgeData, 
        setKnowledgeData,
        marketData, 
        setMarketData,
        asidePos, 
        setAsidePos,
        authorsData,
        companyData,
        careerData,
        setCareerData,
        cpdData,
        objectSize,
        setObjectSize,
        objectPosition,
        setObjectPosition,
        saveUserSettings
      }}
    >
      {children}
    </SectionsContext.Provider>
  );
};

export { SectionsContext, SectionsProvider };

