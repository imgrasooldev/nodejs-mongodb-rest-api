// routes/authRoutes.js
const express = require("express");
// const authController = require("../controllers/authController");
const {
  register,
  login,
  forgotPassword,
  recoverPassword,
} = require("../controllers/authController");

const {
  registerValidationRules,
  loginValidationRules,
  forgotPasswordValidationRules,
  recoverPasswordValidationRules,
} = require("../validators/authValidator");

const router = express.Router();

// Login route
router.post("/register", registerValidationRules, register);

// Forgot Password route
router.post("/login", loginValidationRules, login);

// Forgot Password route
router.post("/forgot-password", forgotPasswordValidationRules, forgotPassword);

// Recover Password route
router.post(
  "/recover-password",
  recoverPasswordValidationRules,
  recoverPassword
);

module.exports = router;
