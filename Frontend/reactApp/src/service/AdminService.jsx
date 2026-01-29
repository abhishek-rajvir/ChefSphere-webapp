import { requestJwt } from "../jwt/axios_helper";

const deleteCreator = async (id) => {
  try {
    const res = await requestJwt("DELETE", `/admin/creator/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting creator:", err);
    throw new Error(
      "Failed to delete creator with id: " + id + " | " + err.message,
    );
  }
};

const deleteFoodie = async (id) => {
  try {
    const res = await requestJwt("DELETE", `/admin/foodie/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting foodie:", err);
    throw new Error(
      "Failed to delete foodie with id: " + id + " | " + err.message,
    );
  }
};

const deletePost = async (id) => {
  try {
    const res = await requestJwt("DELETE", `/admin/post/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting post:", err);
    throw new Error(
      "Failed to delete post with id: " + id + " | " + err.message,
    );
  }
};

const deleteUser = async (id) => {
  try {
    const res = await requestJwt("DELETE", `/admin/user/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting user:", err);
    throw new Error(
      "Failed to delete user with id: " + id + " | " + err.message,
    );
  }
};

const getUserById = async (id) => {
  try {
    const res = await requestJwt("GET", `/admin/user/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching user:", err);
    throw new Error(
      "Failed to fetch user with id: " + id + " | " + err.message,
    );
  }
};

const updateUser = async (id, data) => {
  try {
    const res = await requestJwt("PUT", `/admin/user/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Error updating user:", err);
    throw new Error("Failed to update user | " + err.message);
  }
};

const getPostById = async (id) => {
  try {
    const res = await requestJwt("GET", `/admin/post/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching post:", err);
    throw new Error(
      "Failed to fetch post with id: " + id + " | " + err.message,
    );
  }
};

const updatePost = async (id, data) => {
  try {
    const res = await requestJwt("PUT", `/admin/post/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Error updating post:", err);
    throw new Error("Failed to update post | " + err.message);
  }
};

export default {
  deleteCreator,
  deleteFoodie,
  deletePost,
  deleteUser,
  getUserById,
  updateUser,
  getPostById,
  updatePost,
};
