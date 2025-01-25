import axios from "axios";

/*===========================================*/
/*===========================================*/
/*===========================================*/

// const localy = "http://localhost:3001";

const request = axios.create({
  baseURL: "http://localhost:3001"
});

export default request;