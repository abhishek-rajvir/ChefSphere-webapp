import axios from "axios";
import { toast } from "react-hot-toast";
// Imports removed

// const url = "localhost";
const url = "192.168.1.8";

const LogAPI = axios.create({
  // .NET logger
  baseURL: "http://" + url + ":6001/Log",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const BackendAPI = axios.create({
  baseURL: "http://" + url + ":9001",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const request = (method, url, data = {}, messageToLog = "") => {
  // const navigate = useNavigate(); removed
  return BackendAPI({
    method,
    url,
    data,
  })
    .then((res) => {
      if (messageToLog && messageToLog.trim().length > 0) {
        if (messageToLog === "USER") {
          LogAPI.post("", { logMessage: res.data.type + " logged in" }).catch(
            () => {
              console.warn("Log operation failed");
            },
          );
        } else {
          LogAPI.post("", { logMessage: messageToLog }).catch(() => {
            console.warn("Log operation failed");
          });
        }
      }
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

export const requestJwt = (method, url, data = {}, messageToLog = "") => {
  const item = sessionStorage.getItem("userCred");
  const userCred = item ? JSON.parse(item) : null;
  const token = userCred ? userCred.token : "";
  return BackendAPI({
    method,
    url,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (messageToLog && messageToLog.trim().length > 0) {
        LogAPI.post("", { logMessage: messageToLog }).catch(() => {
          console.warn("Log operation failed");
        });
      }
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
export const requestParamJwt = (
  method,
  url,
  data = {},
  params = {},
  messageToLog = "",
) => {
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
      if (messageToLog && messageToLog.trim().length > 0) {
        LogAPI.post("", { logMessage: messageToLog }).catch(() => {
          console.warn("Log operation failed");
        });
      }
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

export const requestLog = (messageToLog) => {
  LogAPI.post("", { logMessage: messageToLog }).catch(() => {
    console.warn("Log operation failed");
    return false;
  });
};

export default {
  request,
  requestParamJwt,
  requestJwt,
  requestLog,
};
