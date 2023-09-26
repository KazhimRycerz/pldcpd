import axiosConfig from "./axiosConfig.js";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
//import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { SectionsContext } from "../context/SectionsContext.js";


export const AutoLogout =  () => {
  const { navigate, setIsAuth } = useContext(SectionsContext);
  const isLoggedToken = Cookies.get("isLogged");
  const expiresInMs = isLoggedToken - new Date().getTime();
  const localItems = localStorage.getItem("userId");

  if ((!isLoggedToken && localItems) || (expiresInMs <= 0 && localItems)) {
    localStorage.clear();
    setIsAuth(false);
    /* await */ axiosConfig.post("/user/logout").then((res) => {
      //console.log(res.data);
      navigate("/home");
      window.location.reload();
    });
    Swal.fire({
      title: "Sie wurden automatisch abgemeldet.",
      icon: "warning",
    })/* .then(() => {
      navigate("/home");
    }) */;
  }
};


