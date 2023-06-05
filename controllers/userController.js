// controllers/userController.js
const User = require("../models/User");
const response = require("../helpers/response");
const { authenticateAndGetUserId } = require("../helpers/helpers");
const userCollection = require("../resources/users/userCollection");
const userResource = require("../resources/users/userResource");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    const usersData = userCollection(users);
    return response.success(res, "Users retrieved successfully", usersData);
  } catch (error) {
    console.error("Error in getUsers:", error);
    return response.error(res, "Failed to retrieve users");
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return response.error(res, "User not found");
    }
    const userData = userResource(user);
    return response.success(res, "User retrieved successfully", userData);
  } catch (error) {
    console.error("Error in getUserById:", error);
    return response.error(res, "Failed to retrieve user");
  }
};

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return response.error(res, "Email already registered");
    }

    const user = new User({ email, password });
    await user.save();

    const userData = userResource(user);
    return response.success(res, "User created successfully", userData);
  } catch (error) {
    console.error("Error in createUser:", error);
    return response.error(res, "Failed to create user");
  }
};

const updateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return response.error(res, "User not found");
    }

    user.email = email || user.email;
    user.password = password || user.password;
    await user.save();

    const userData = userResource(user);
    return response.success(res, "User updated successfully", userData);
  } catch (error) {
    console.error("Error in updateUser:", error);
    return response.error(res, "Failed to update user");
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);

    if (!user) {
      return response.error(res, "User not found");
    }

    return response.success(res, "User deleted successfully");
  } catch (error) {
    console.error("Error in deleteUser:", error);
    return response.error(res, "Failed to delete user");
  }
};

const checkProtected = async (req, res) => {
  try {
    const userId = authenticateAndGetUserId(req);

    if (!userId) {
      return response.error(res, "Failed to authenticate users");
    }

    const user = await User.findById(userId);
    const usersData = { user: userResource(user) };
    return response.success(res, "Users retrieved successfully", usersData);
  } catch (error) {
    return response.error(res, "Failed to retrieve users");
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  checkProtected,
};
