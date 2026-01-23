import axios from "axios";

const LogAPI = axios.create({
  // .NET logger
  baseURL: "http://localhost:6001/Log",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const BackendAPI = axios.create({
  baseURL: "http://localhost:9001",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const request = (method, url, data = {}, messageToLog = "") => {
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
