import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // ✅ send cookies along
});

export default api;
