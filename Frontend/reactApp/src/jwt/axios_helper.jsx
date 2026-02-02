import axios from "axios";
import { toast } from "react-hot-toast";

// use the url from the environment variable
const url = import.meta.env.VITE_API_BACKEND_URL;

const BackendAPI = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const request = (method, url, data = {}) => {
  return BackendAPI({
    method,
    url,
    data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err.response?.status === 403) {
        console.log("Unauthorized request");
        // window.dispatchEvent(new CustomEvent("auth:logout"));
        toast.error("Unauthorized request");
        // prevent error message due to failed promise
        return new Promise(() => {});
      }
      if (err.response?.status === 401) {
        console.log("Expired token");
        window.dispatchEvent(new CustomEvent("auth:logout"));
        toast.error("Expired token");
        // prevent error message due to failed promise
        return new Promise(() => {});
      }
      // Log full Axios error
      console.error(err.response?.data || err.message || err);
      throw err; // rethrow original error without wrapping
    });
};

export const requestJwt = (method, url, data = {}) => {
  const item = sessionStorage.getItem("userCred");
  const userCred = item ? JSON.parse(item) : null;
  const token = userCred ? userCred.token : "";
  return BackendAPI({
    method,
    url,
    data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err.response?.status === 403) {
        console.log("Unauthorized request");
        // window.dispatchEvent(new CustomEvent("auth:logout"));
        toast.error("Unauthorized request");
        // prevent error message due to failed promise
        return new Promise(() => {});
      }
      if (err.response?.status === 401) {
        console.log("Expired token");
        window.dispatchEvent(new CustomEvent("auth:logout"));
        toast.error("Expired token");
        // prevent error message due to failed promise
        return new Promise(() => {});
      }
      // Log full Axios error
      console.error(err.response?.data || err.message || err);
      throw err; // rethrow original error without wrapping
    });
};
export const requestParamJwt = (method, url, data = {}, params = {}) => {
  const item = sessionStorage.getItem("userCred");
  const userCred = item ? JSON.parse(item) : null;
  const token = userCred ? userCred.token : "";

  return BackendAPI({
    method,
    url,
    data,
    params, //?key=value
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response?.status === 403) {
        console.log("Unauthorized request");
        // window.dispatchEvent(new CustomEvent("auth:logout"));
        toast.error("Unauthorized request");
        // prevent error message due to failed promise
        return new Promise(() => {});
      }
      if (err.response?.status === 401) {
        console.log("Expired token");
        window.dispatchEvent(new CustomEvent("auth:logout"));
        toast.error("Expired token");
        return new Promise(() => {});
      }
      // Log full Axios error
      console.error(err.response?.data || err.message || err);
      throw err; // rethrow original error without wrapping
    });
};

export default {
  request,
  requestParamJwt,
  requestJwt,
};
