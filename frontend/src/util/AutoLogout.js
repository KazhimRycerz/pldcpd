import axiosConfig from "./axiosConfig.js";
import Cookies from "js-cookie";
import swal from "sweetalert";
//import { useNavigate } from "react-router-dom";
import { SectionsContext } from "../context/SectionsContext.js";
import { useContext } from "react";


export const AutoLogout = /* async */ () => {
  const { navigate } = useContext(SectionsContext);
  const isLoggedToken = Cookies.get("isLogged");
  const expiresInMs = isLoggedToken - new Date().getTime();
  const localItems = localStorage.getItem("userId");
  if ((!isLoggedToken && localItems) || (expiresInMs <= 0 && localItems)) {
    /* await */ axiosConfig.post("/user/logout");
    localStorage.clear();
    swal({
      title: "Sie wurden automatisch abgemeldet.",
      icon: "warning",
      dangerMode: true,
    }).then(() => {
      navigate("/home");
      //location.reload()
    });
  }
};

