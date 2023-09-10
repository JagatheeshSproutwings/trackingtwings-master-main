import axios from "axios";

 //const baseURL = "http://148.113.16.25/twings_app/public/api/";
const baseURL = "http://localhost/twings_api/public/api/";

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
