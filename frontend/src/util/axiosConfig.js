import axios from "axios";
import baseURL from "./constants.js";

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default axiosInstance;
