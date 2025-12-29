import { request } from '../jwt/axios_helper';

// login user
const loginUser = async (details) => {
  try {
    const res = await request("POST", "/users/signIn", details,"USER");
    return res.data;
  } catch (err) {
    throw new Error("Login Failed: invalid username or password");
  }
};

const checkUserName = (username) => {
  request("GET", "/users/"+username)
  .then(()=>{return true})
  .catch (()=>{return false})
};

export default {
  loginUser,
  checkUserName,
}

