import axios from "axios";

const instance = axios.create({
  baseURL: "https://lla-mvp-backend-production.up.railway.app",
});

export default instance;
