import axios from "axios";
export const Axios = axios.create({
    baseURL: "https://quaint-jeans-fly.cyclic.app/",
  //https://mern-acadamy-app.herokuapp.com
  headers: { 
  "X-Custom-Header": "foobar",
  "Accept": "application/json",
  "Content-Type": undefined},
})