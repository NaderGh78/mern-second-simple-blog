import axios from "axios";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const request = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
  withCredentials: true
});

export default request;