import { request, requestJwt, requestParamJwt } from "../jwt/axios_helper";

// login user
const RegisterFoodie = async (details) => {
  try {
    const res = await request(
      "POST",
      "/foodies/signUp",
      details,
      "Foodie " + res.data.name + " was Registered",
    );
    return res.data;
  } catch (err) {
    throw new Error("Register Failed: invalid foodie details");
  }
};

const getPostsByNo = async (pno) => {
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

const getAllPostsByCategory = async (category) => {
  try {
    const res = await requestJwt("GET", "/posts/category/" + category);
    return res.data;
  } catch (err) {
    throw new Error("Post fetch failed");
  }
};

const getCreatorsByRange = async (qty) => {
  try {
    const res = await requestJwt("GET", "/creators/list/creatorRange/" + qty);
    return res.data;
  } catch (err) {
    throw new Error("CreatorRange fetch failed");
  }
};
const getRecipeByRange = async (qty) => {
  try {
    const res = await requestJwt("GET", "/posts/list/recipeRange/" + qty);
    return res.data;
  } catch (err) {
    throw new Error("RecipeRange fetch failed");
  }
};
const getCategoryByRange = async (qty) => {
  try {
    const res = await requestJwt("GET", "/posts/list/categoryRange/" + qty);
    return res.data;
  } catch (err) {
    throw new Error("CategoryRange fetch failed");
  }
};
const getAllCategory = async () => {
  try {
    const res = await requestJwt("GET", "/posts/listAll/categories");
    return res.data;
  } catch (err) {
    throw new Error("All category fetch failed");
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

const doesFollowCreator = async (cid) => {
  try {
    const res = await requestJwt("GET", "/foodies/doesFollow/" + cid);
    return res.data;
  } catch (err) {
    throw new Error("failed to check if foodie follows creator");
  }
};

const followCreator = async (cid) => {
  try {
    const res = await requestJwt("POST", "/foodies/followCreator/" + cid);
    return res.data;
  } catch (err) {
    throw new Error("failed to follow creator");
  }
};

const unFollowCreator = async (cid) => {
  try {
    const res = await requestJwt("DELETE", "/foodies/unFollowCreator/" + cid);
    return res.data;
  } catch (err) {
    throw new Error("failed to unfollow creator");
  }
};

const getAllFollowing = async () => {
  try {
    const res = await requestJwt("GET", "/foodies/allFollowing");
    return res.data;
  } catch (err) {
    throw new Error("failed to get all following");
  }
};

export default {
  RegisterFoodie,
  getPostsByNo,
  getCreatorsPosts,
  getAllPosts,
  getAllPostsByCategory,
  getRecipeByRange,
  getCreatorsByRange,
  newCreatorPost,
  deletePost,
  updateCreatorPost,
  getFollowers,
  getCategoryByRange,
  getAllCategory,
  followCreator,
  unFollowCreator,
  doesFollowCreator,
  getAllFollowing,
};
