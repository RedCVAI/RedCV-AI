const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  } catch (error) {
    throw new Error(`Error generating token: ${error.message}`);
  }
};

module.exports = { generateToken };
