const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const { successResponse, errorResponse } = require("../utils/response-helper");

module.exports = {
  register: async (request, h) => {
    try {
      const { name, email, password } = request.payload;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      return successResponse(
        h,
        { userId: user.id, name, email },
        "User registered successfully",
        201
      );
    } catch (error) {
      console.error("Registration error:", error);
      if (error.name === "SequelizeUniqueConstraintError") {
        return errorResponse(h, "Email already registered", 400);
      }
      return errorResponse(h, `Registration failed: ${error.message}`, 500);
    }
  },

  login: async (request, h) => {
    try {
      const { email, password } = request.payload;
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return errorResponse(h, "Invalid credentials", 401);
      }
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h", algorithm: "HS256" }
      );
      return successResponse(h, { token }, "Login successful", 200);
    } catch (error) {
      return errorResponse(h, "Login failed", 400);
    }
  },

  getMe: async (request, h) => {
    try {
      const user = await User.findByPk(request.auth.credentials.id, {
        attributes: ["id", "name", "email"],
      });
      return successResponse(h, user, "User retrieved successfully", 200);
    } catch (error) {
      return errorResponse(h, "Failed to retrieve user", 400);
    }
  },
};
