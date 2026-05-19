import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});
// "http://127.0.0.1:8000"
// "https://gamuda-intv-project-be.onrender.com"
export default API;