import { request } from "../jwt/axios_helper";

const sendOtp = async (email) => {
  try {
    const payload = {
      email: email,
    };
    const response = await request("POST", "/email/otp", payload);
    return response.data;
  } catch (error) {
    console.log("Failed to send otp");
    console.log(error);
    throw error;
  }
};

const validateOtp = async (email, otp, password) => {
  try {
    const payload = {
      email: email,
      otp: otp,
      password: password,
    };
    const response = await request("POST", "/email/validate", payload);
    return response.data;
  } catch (error) {
    console.log("Failed to validate OTP");
    console.log(error);
    throw error;
  }
};

export default { sendOtp, validateOtp };
