// persistedApi.js
import axios from "axios";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const baseURL = "https://api.gpstrak.in/api/";

const api = axios.create({
  baseURL: baseURL,
  cors: "*",
});

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setTokenInHeaders = () => {
  const token = getToken();
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user_name");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("user_info");
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
