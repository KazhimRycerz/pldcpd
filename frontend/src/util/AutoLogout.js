import axiosConfig from "./axiosConfig.js";
import Cookies from "js-cookie";
import swal from "sweetalert";
import { useContext } from "react";
import { SectionsContext } from "../context/SectionsContext.js";


export const autoLogout = async () => {
  const { navigate } = useContext(SectionsContext)
  const isLoggedToken = Cookies.get("isLogged");
  const expiresInMs = isLoggedToken - new Date().getTime();
  const localItems = localStorage.getItem("userId");
  if ((!isLoggedToken && localItems) || (expiresInMs <= 0 && localItems)) {
    await axiosConfig.post("/user/logout");
    localStorage.clear();
    swal({
      title: "Du wurdest automatisch abgemeldet.",
      icon: "warning",
      dangerMode: true,
    }).then(() => {
      navigate("/home")
    });
  }
};

