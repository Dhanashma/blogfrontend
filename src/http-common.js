import axios from "axios";
export default axios.create({
  baseURL: " https://whispering-wave-58096.herokuapp.com/https://blogappdh.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});