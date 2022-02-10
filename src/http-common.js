import axios from "axios";
export default axios.create({
  baseURL: "https://blogappdh.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});