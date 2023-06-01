// validators/authValidator.js
const { body, validationResult } = require("express-validator");

const register = [
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

const login = [
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

module.exports = { register, login };
