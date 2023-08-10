import axiosConfig from "./axiosConfig.js";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
//import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { SectionsContext } from "../context/SectionsContext.js";


export const AutoLogout = async () => {
  const { navigate, setButtonPos } = useContext(SectionsContext);
  const isLoggedToken = Cookies.get("isLogged");
  const expiresInMs = 10;
  const localItems = localStorage.getItem("userId");

  if ((!isLoggedToken && localItems) || (expiresInMs <= 100)) {
    await axiosConfig.post("/user/logout");
    localStorage.clear();
    setButtonPos("buttonZeroPosition");
    Swal.fire({
      title: "Sie wurden automatisch abgemeldet.",
      icon: "warning",
      showCloseButton: true,
      //dangerMode: true,
    }).then(() => {

      navigate("/home");
    });
  }
};


