// validators/authValidator.js
const { body, validationResult } = require("express-validator");

const registerValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password too short"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        data: errors.array(),
      });
    }
    next();
  },
];

const loginValidationRules = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password too short"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        data: errors.array(),
      });
    }
    next();
  },
];

// Forgot Password validation rules
const forgotPasswordValidationRules = [
  body("email").isEmail().withMessage("Invalid email address."),
];

// Recover Password validation rules
const recoverPasswordValidationRules = [
  body("email").isEmail().withMessage("Invalid email address."),
  body("otp").notEmpty().withMessage("OTP is required."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
];

module.exports = {
  registerValidationRules,
  loginValidationRules,
  forgotPasswordValidationRules,
  recoverPasswordValidationRules,
};
