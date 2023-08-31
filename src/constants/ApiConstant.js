import axios from axios;
const baseURL = 'http://127.0.0.1:8000/api/'; 

const api = axios.create({
  baseURL: baseURL,
});

export const getToken = () => {
  return localStorage.getItem('token');
};

export const setTokenInHeaders = () => {
  const token = getToken();
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};