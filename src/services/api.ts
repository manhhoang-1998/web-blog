import axios from "axios";
import queryString from "query-string";

const Api = axios.create({
  baseURL: "https://ans.devcamperapp.xyz/api",
  headers: {
    "content-type": "application/json",
  },
  timeout: 30000,
  paramsSerializer: (params) => queryString.stringify(params),
});

// Add a request interceptor
Api.interceptors.request.use(
  async function (config) {
    const token = localStorage.getItem("accessToken");
    if (token !== null) {
      setToken(JSON.parse(token));
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
Api.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const setToken = (token: string) => {
  Api.defaults.headers.common["Authorization"] = "Bearer " + token;
};

export default Api;

// - token, refresh token
// - vi sao phai set vao header

//- hoc redux
