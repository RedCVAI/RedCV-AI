const { hashPassword, comparePassword } = require("../helpers/encrypt");
const { generateToken } = require("../helpers/jwt");
const User = require("../models/user-model");
const { successResponse, errorResponse } = require("../utils/response-helper");

module.exports = {
  register: async (request, h) => {
    try {
      const { name, email, password } = request.payload;
      const hashedPassword = await hashPassword(password, 10);
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
      if (!user) {
        return errorResponse(h, "Email tidak ditemukan", 401);
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return errorResponse(h, "Password salah, Silahkan mencoba lagi", 401);
      }

      const token = generateToken({ id: user.id, email: user.email });
      return successResponse(h, { token }, "Login successful", 200);
    } catch (error) {
      console.error("Login error:", error);
      return errorResponse(h, "Login failed: " + error.message, 500);
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
