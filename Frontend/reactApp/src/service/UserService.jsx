import { request, requestJwt } from "../jwt/axios_helper";

//imgkit
const getImgToken = async () => {
  try {
    const res = await requestJwt("GET", "/auth/imgkToken");

    return {
      ...res.data,
      publicKey: res.data.publicKey || "YOUR_PUBLIC_KEY_HERE",
    };
  } catch (err) {
    throw new Error("Imagekit token generation failed");
  }
};

// login user
const loginUser = async (details) => {
  try {
    const res = await request("POST", "/auth/signIn", details);
    return res.data;
  } catch (err) {
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
    return res.data;
  } catch (err) {
    throw new Error("Register Failed");
  }
};

const checkUserName = async (username) => {
  try {
    return await request("GET", "/auth/checkUsername/" + username);
  } catch (err) {
    throw new Error("Username exists");
  }
};

const checkEmail = async (email) => {
  try {
    return await request("GET", "/auth/checkEmail/" + email);
  } catch (err) {
    throw new Error("Email exists");
  }
};

const updatePassword = async (data) => {
  try {
    const res = await request("PUT", "/users/password", data);
    return res.data;
  } catch (err) {
    throw new Error("Password update failed");
  }
};

const deleteAccount = async (id) => {
  try {
    const res = await request("DELETE", `/users/${id}`);
    return res.data;
  } catch (err) {
    throw new Error("Account deletion failed");
  }
};

const getUserDetails = async () => {
  try {
    const res = await requestJwt("GET", "/users/details");
    return res.data;
  } catch (err) {
    throw new Error("User details fetch failed");
  }
};

const updateUserDetails = async (data) => {
  try {
    const res = await requestJwt("PUT", "/users/update", data);
    return res.data;
  } catch (err) {
    throw new Error("User details update failed");
  }
};

const forgotPassword = async (email) => {
  try {
    const res = await request("POST", "/auth/forgot-password", { email });
    return res.data;
  } catch (err) {
    throw new Error("Forgot password failed");
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
  forgotPassword,
};
