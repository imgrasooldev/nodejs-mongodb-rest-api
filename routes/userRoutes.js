// routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authMiddleware");
const { validate } = require("../validators/userValidator");
const router = express.Router();

router.get("/users", authenticate, userController.getUsers); // Get all users
router.get("/users/:id", authenticate, userController.getUserById); // Get a user by ID
router.post(
  "/users",
  authenticate,
  validate("createUser"),
  userController.createUser
); // Create a new user
router.put(
  "/users/:id",
  authenticate,
  validate("updateUser"),
  userController.updateUser
); // Update a user by ID
router.delete("/users/:id", authenticate, userController.deleteUser); // Delete a user by ID

router.get("/check_protected", authenticate, userController.checkProtected);

module.exports = router;
