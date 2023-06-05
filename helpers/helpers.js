const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

function authenticateAndGetUserId(req) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return null; // No token provided
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.userId;
  } catch (error) {
    // Token verification failed
    console.error("Token verification failed:", error);
    return null;
  }
}

module.exports = {
  authenticateAndGetUserId,
};
