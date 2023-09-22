import fetch from "auth/FetchInterceptor";
import api, { setTokenInHeaders } from "configs/apiConfig";
import persistApi from "configs/persistedApi"

const AuthService = {};

AuthService.login = function (data) {
  const response = api
    .post("login", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  return response;
};

AuthService.register = function (data) {
  return fetch({
    url: "/auth/register",
    method: "post",
    data: data,
  });
};

AuthService.logout = function () {
  return fetch({
    url: "/auth/logout",
    method: "post",
  });
};

AuthService.loginInOAuth = function () {
  return fetch({
    url: "/auth/loginInOAuth",
    method: "post",
  });
};

export default AuthService;
