import { request, requestJwt } from "../jwt/axios_helper";

const sendNewPostEmail = async (email, name, postTitle) => {
  try {
    const payload = {
      email: email,
      subject: "New post on ChefSphere",
      message:
        name + " has posted a new recipe: " + postTitle + ", Check it out now!",
    };
    const response = await requestJwt("POST", "/email/new", payload);
    return response.data;
  } catch (error) {
    console.log("Failed to send new post email");
    console.log(error);
    throw error;
  }
};

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

export default { sendOtp, validateOtp, sendNewPostEmail };
