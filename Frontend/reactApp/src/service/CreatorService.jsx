import { request, requestJwt, requestParamJwt } from "../jwt/axios_helper";

// login user
const RegisterCreator = async (details) => {
  try {
    const res = await request(
      "POST",
      "/creators/signUp",
      details,
      "Creator " + res.data.name + " was Registered",
    );
    return res.data;
  } catch (err) {
    throw new Error("Register Failed: invalid creator details");
  }
};

const getCreatorsPostsByNo = async (pno) => {
  try {
    const res = await requestJwt("GET", "/posts/" + pno);
    return res.data;
  } catch (err) {
    throw new Error("Post fetch failed");
  }
};
const getCreatorsPosts = async () => {
  try {
    const res = await requestJwt("GET", "/posts/list");
    return res.data;
  } catch (err) {
    throw new Error("Post fetch failed");
  }
};
const getAllPosts = async () => {
  try {
    const res = await requestJwt("GET", "/posts/listAll");
    return res.data;
  } catch (err) {
    throw new Error("Post fetch failed");
  }
};

const newCreatorPost = async (details) => {
  try {
    const res = await requestJwt("POST", "/posts/new", details);
    return res.data;
  } catch (err) {
    throw new Error("Post creation failed");
  }
};

const deletePost = async (id) => {
  try {
    const res = await requestJwt("DELETE", "/posts/" + id + "/delete");
    return res.data;
  } catch (err) {
    throw new Error("Post deletion failed for id: " + id);
  }
};

const updateCreatorPost = async (id, details) => {
  try {
    const res = await requestJwt("PUT", "/posts/" + id + "/update", details);
    return res.data;
  } catch (err) {
    throw new Error("Post update failed");
  }
};

const getFollowers = async (cid) => {
  try {
    const res = await requestParamJwt(
      "GET",
      "/creators/followers",
      {},
      cid,
      "",
    );
    return res.data;
  } catch (err) {
    throw new Error("failed to fetch all followers");
  }
};

export default {
  RegisterCreator,
  getCreatorsPosts,
  getCreatorsPostsByNo,
  getFollowers,
  newCreatorPost,
  updateCreatorPost,
  deletePost,
  getAllPosts,
};
