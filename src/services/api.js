import axios from "axios";

const api = axios.create({
  baseURL: "https://course-tracker-production.up.railway.app/api",
});

export default api;