// validators/userValidator.js
const { body, param } = require("express-validator");
const { validationResult } = require("express-validator");

const validate = (method) => {
  switch (method) {
    case "createUser": {
      return [
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
    }
    case "updateUser": {
      return [
        param("id").isMongoId().withMessage("Invalid user ID"),
        body("email").optional().isEmail().withMessage("Invalid email"),
        body("password")
          .optional()
          .isLength({ min: 6 })
          .withMessage("Password too short"),
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
    }
    // Add more cases for other methods if needed
    default:
      return [];
  }
};

module.exports = { validate };
