import axios from "axios";
import { LOGIN_URL } from "./URLs";
// import {  userLogout } from "../stores/authenticated-user.store";
// import store from "../stores";
import { ADMIN_ENDPOINT } from "../config/api";

const encodeParams = (params) => {
  const r = "?";
  const p = [];

  const buildQuery = (key, value) => {
    if (Array.isArray(value)) {
      // Handle arrays
      value.forEach(item => {
        p.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(item)}`);
      });
    } else if (typeof value === "object" && value !== null) {
      // Handle nested objects
      for (const nestedKey in value) {
        buildQuery(`${key}[${nestedKey}]`, value[nestedKey]);
      }
    } else {
      // Handle scalar values
      p.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  };

  for (const key in params) {
    buildQuery(key, params[key]);
  }

  return r + p.join("&");
};


const instance = axios.create({
  baseURL: ADMIN_ENDPOINT,
  withCredentials: true,
});

// Customize the method
instance.get = async (url, params, config = {}) => {
  if (params) {
    url += encodeParams(params);
  }
  const response = await instance({
    ...config,
    method: 'get',
    url: url,
  });
  return response.data;
};

instance.post = async (url, data = {}, config = {}) => {
  const response = await instance({
    ...config,
    method: 'post',
    url: url,
    data: data,
  });
  return response.data;
};

instance.put = async (url, data = {}, config = {}) => {
  const response = await instance({
    ...config,
    method: 'put',
    url: url,
    data: data,
  });
  return response.data;
};

instance.patch = async (url, data = {}, config = {}) => {
  const response = await instance({
    ...config,
    method: 'patch',
    url: url,
    data: data,
  });
  return response.data;
};

instance.delete = async (url, data={}, config = {}) => {
  const response = await instance({
    ...config,
    method: 'delete',
    url: url,
    data: data,
  });
  return response.data;
};

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const response = error?.response;
    if (
      response &&
      response.config.url !== LOGIN_URL &&
      response.status === 401
    ) {
      // store.dispatch(userLogout(null));
      window.location = "/login";
    }
    return Promise.reject(error?.response && error?.response?.data);
    // return Promise.reject(error.response);
    // return Promise.reject(error);
  },
);

export default instance;
