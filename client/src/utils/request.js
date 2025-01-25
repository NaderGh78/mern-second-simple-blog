import axios from "axios";

/*===========================================*/
/*===========================================*/
/*===========================================*/

// const localy = "http://localhost:3001";
// const production = "http://localhost:3001";

const request = axios.create({
  baseURL: "https://joori-blog.onrender.com/"
});

export default request;