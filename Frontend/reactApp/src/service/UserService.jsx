import { request, requestLog } from "../jwt/axios_helper";

//imgkit
const getImgToken = async () => {
  try {
    const res = await request("GET", "/users/imgkToken");
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
    const res = await request("POST", "/users/signIn", details, "USER");
    requestLog("Login successful");
    return res.data;
  } catch (err) {
    requestLog("Login failed " + err);
    throw new Error("Login Failed: invalid username or password");
  }
};

const logoutUser = (name, id) => {
  const data = sessionStorage.removeItem("userCred");
  console.log("User Logged out");
  requestLog("USER " + name + " ID: " + id + " Logged Out");
  return;
};

// register user
//payload
//   {
//     "firstName": "Ava",
//     "lastName": "Marin",
//     "username": "avamakes",
//     "email": "ava.marin.creator1@example.com",
//     "password": "Cr3ative!2025",
//     "gender": "female"
//   }
const registerUser = async (details) => {
  try {
    let res;
    if (details.type === "CREATOR") {
      res = await request("POST", "/creators/signUp", details, "USER");
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
  requestLog("Username checked " + username);
  return await request("GET", "/users/" + username);
};

export default {
  loginUser,
  checkUserName,
  registerUser,
  logoutUser,
  getImgToken,
};
