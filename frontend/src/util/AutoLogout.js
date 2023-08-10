import axiosConfig from "./axiosConfig.js";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
//import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { SectionsContext } from "../context/SectionsContext.js";


export const AutoLogout = async () => {
  const { navigate } = useContext(SectionsContext);
  const isLoggedToken = Cookies.get("isLogged");
  const expiresInMs = isLoggedToken - new Date().getTime();
  const localItems = localStorage.getItem("userId");

  if ((!isLoggedToken && localItems) || (expiresInMs <= 0 && localItems)) {
    await axiosConfig.post("/user/logout");
    localStorage.clear();
    Swal.fire({
      title: "Sie wurden automatisch abgemeldet.",
      icon: "warning",
      //showCloseButton: true,
      //dangerMode: true,
    }).then(() => {
      navigate("/home");
    });
  }
};


