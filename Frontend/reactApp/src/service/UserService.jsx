import { request, requestLog, requestJwt } from "../jwt/axios_helper";

//imgkit
const getImgToken = async () => {
  try {
    const res = await requestJwt("GET", "/auth/imgkToken");
    requestLog("Imagekit token generated successfully");
    return {
      ...res.data,
      publicKey: res.data.publicKey || "YOUR_PUBLIC_KEY_HERE",
    };
  } catch (err) {
    requestLog("Imagekit token generation failed " + err);
    throw new Error("Imagekit token generation failed");
  }
};

// login user
const loginUser = async (details) => {
  try {
    const res = await request("POST", "/auth/signIn", details, "USER");
    requestLog("Login successful");
    return res.data;
  } catch (err) {
    requestLog("Login failed " + err);
    throw new Error("Login Failed: invalid username or password");
  }
};

const registerUser = async (details) => {
  try {
    let res;
    if (details.type === "CREATOR") {
      res = await request("POST", "/creators/signUp", details);
    } else {
      res = await request("POST", "/foodies/signUp", details);
    }
    requestLog(details.username + " " + details.type + "Register successful");
    return res.data;
  } catch (err) {
    requestLog(
      details.username + " " + details.type + "Register failed " + err,
    );
    throw new Error("Register Failed");
  }
};

const checkUserName = async (username) => {
  try {
    requestLog("Username checked " + username);
    return await request("GET", "/auth/checkUsername/" + username);
  } catch (err) {
    requestLog("Username exists " + err);
    throw new Error("Username exists");
  }
};

const checkEmail = async (email) => {
  try {
    requestLog("Email checked " + email);
    return await request("GET", "/auth/checkEmail/" + email);
  } catch (err) {
    requestLog("Email exists " + err);
    throw new Error("Email exists");
  }
};

const updatePassword = async (data) => {
  try {
    const res = await request("PUT", "/users/password", data);
    requestLog("Password updated successfully");
    return res.data;
  } catch (err) {
    requestLog("Password update failed " + err);
    throw new Error("Password update failed");
  }
};

const deleteAccount = async (id) => {
  try {
    const res = await request("DELETE", `/users/${id}`);
    requestLog(`User ${id} deleted successfully`);
    return res.data;
  } catch (err) {
    requestLog("Account deletion failed " + err);
    throw new Error("Account deletion failed");
  }
};

const getUserDetails = async () => {
  try {
    const res = await requestJwt("GET", "/users/details");
    return res.data;
  } catch (err) {
    requestLog("User details fetch failed " + err);
    throw new Error("User details fetch failed");
  }
};

const updateUserDetails = async (data) => {
  try {
    const res = await requestJwt("PUT", "/users/update", data);
    requestLog("User details updated successfully");
    return res.data;
  } catch (err) {
    requestLog("User details update failed " + err);
    throw new Error("User details update failed");
  }
};

export default {
  loginUser,
  checkUserName,
  checkEmail,
  registerUser,
  getImgToken,
  updatePassword,
  deleteAccount,
  getUserDetails,
  updateUserDetails,
};
