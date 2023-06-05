// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const OTP = require("../models/Otp");
const response = require("../helpers/response");
const emailQueue = require("./../queues/emailQueue");
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

    await emailQueue.add("sendRegisterEmail", {
      email: user.email,
      name: user.name,
    });

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

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    return response.success(res, "Login successful", {
      token,
      user: userResource(user),
    });
  } catch (error) {
    return response.error(res, "Login failed " + error.message);
  }
};

// Generate a random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Handle forgot password request
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP in the database
    const newOTP = new OTP({
      email,
      otp,
      expiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes expiration
    });
    await newOTP.save();

    // Queue email with OTP
    await emailQueue.add("sendOTPEmail", {
      email,
      name: user.name,
      otp,
    });

    // Respond with success message
    return response.success(res, "Password reset email sent");
  } catch (error) {
    return response.error(res, "Password reset failed " + error.message);
  }
};

const recoverPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Check if OTP exists and has not expired
    const storedOTP = await OTP.findOne({ email, otp });
    if (!storedOTP || storedOTP.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid OTP or expired" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    // Delete the OTP from the database
    await OTP.deleteOne({ email, otp });

    return response.success(res, "Password recovered successfully");
  } catch (error) {
    return response.error(res, "Password recovery failed " + error.message);
  }
};

module.exports = { register, login, forgotPassword, recoverPassword };
