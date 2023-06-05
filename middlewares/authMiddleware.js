// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
      data: null,
    });
  }
};

module.exports = authenticate;
