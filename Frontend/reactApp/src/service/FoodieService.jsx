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
const getCreatorsPosts = async (id) => {
  try {
    const res = await requestJwt("GET", "/posts/" + id + "/list");
    return res.data;
  } catch (err) {
    throw new Error("Post fetch failed for creator id: " + id);
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

const getAllPostsByCategory = async (categoryName) => {
  try {
    const res = await requestJwt("GET", "/posts/category/" + categoryName);
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

const getFollowers = async () => {
  try {
    const res = await requestJwt("GET", "/creators/followers");
    return res.data.foodies;
  } catch (err) {
    throw new Error("failed to fetch all followers");
  }
};

const getTotalFollowers = async (cid) => {
  try {
    const res = await requestJwt("GET", "/creators/totalfollowers/" + cid);
    return res.data;
  } catch (err) {
    throw new Error("failed to fetch total followers");
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

const getPostsContainingTitle = async (title) => {
  try {
    const res = await requestParamJwt(
      "GET",
      "/posts/search/title",
      {},
      {
        title: title,
      },
    );
    return res.data;
  } catch (err) {
    throw new Error("failed to get posts containing title");
  }
};
const getPostsContainingCategory = async (category) => {
  try {
    const res = await requestParamJwt(
      "GET",
      "/posts/search/category",
      {},
      { categoryName: category },
    );
    return res.data;
  } catch (err) {
    throw new Error("failed to get posts containing category");
  }
};

const getCreatorById = async (id) => {
  try {
    const res = await requestJwt("GET", "/creators/" + id);
    return res.data;
  } catch (err) {
    throw new Error("Creator fetch failed for id: " + id);
  }
};

export const addRating = async (ratingData) => {
  try {
    const res = await requestJwt("POST", "/engagement/rating/new", ratingData);
    return res.data;
  } catch (err) {
    throw new Error("Rating submission failed");
  }
};

export const deleteRatingByPostId = async (postId) => {
  try {
    const res = await requestJwt(
      "DELETE",
      "/engagement/rating/" + postId + "/delete",
    );
    return res.data;
  } catch (err) {
    throw new Error("Rating deletion failed");
  }
};

export const getRatingByPostId = async (postId) => {
  try {
    const res = await requestJwt("GET", "/engagement/rating/" + postId);
    return res.data;
  } catch (err) {
    throw new Error("Fetching rating failed");
  }
};

export const createComment = async (commentData) => {
  try {
    const res = await requestJwt(
      "POST",
      "/engagement/comment/new",
      commentData,
    );
    return res.data;
  } catch (err) {
    throw new Error("Comment creation failed");
  }
};

export const getCommentsByPostId = async (postId) => {
  try {
    const res = await requestJwt(
      "GET",
      "/engagement/comment/" + postId + "/listAll",
    );
    return res.data;
  } catch (err) {
    throw new Error("Fetching comments failed");
  }
};

export const deleteComment = async (commentId) => {
  try {
    const res = await requestJwt(
      "DELETE",
      "/engagement/comment/" + commentId + "/delete",
    );
    return res.data;
  } catch (err) {
    throw new Error("Comment deletion failed");
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
  getCreatorById,
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
  getPostsContainingTitle,
  getPostsContainingCategory,

  addRating,
  deleteRatingByPostId,
  getRatingByPostId,
  createComment,
  getCommentsByPostId,
  deleteComment,
};
