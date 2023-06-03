// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const response = require("../helpers/response");
const { sendRegisterEmail } = require("../emails/sendRegisterEmail");
const EmailQueue = require("./../queues/emailQueue");
const userResource = require("../resources/users/userResource");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const uuid = uuidv4();

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.error(res, "Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      uuid,
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Send registration email (implementation not provided)
    // await sendRegisterEmail(user.email, "Ghulam Rasool");
    await EmailQueue.add(
      { email: user.email, name: user.name }
      // { attempts: 2 }
    );

    return response.success(res, "Registration successful");
  } catch (error) {
    return response.error(res, "Registration failed " + error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return response.error(res, "Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response.error(res, "Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    return response.success(res, "Login successful", {
      token,
      user: userResource(user),
    });
  } catch (error) {
    console.error("Error in login:", error);
    return response.error(res, "Login failed");
  }
};

module.exports = { register, login };
