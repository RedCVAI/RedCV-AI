const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const BlacklistedToken = require("../models/blacklisted-token-model");
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
      if (!user) {
        return errorResponse(h, "Email tidak ditemukan", 401);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return errorResponse(h, "Password salah, Silahkan mencoba lagi", 401);
      }
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h", algorithm: "HS256" }
      );
      return successResponse(
        h,
        { token },
        "Berhasil login, password benar",
        200
      );
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

  logout: async (request, h) => {
    try {
      // Ambil header Authorization
      const authorization = request.headers.authorization;
      if (!authorization || !authorization.startsWith("Bearer ")) {
        return errorResponse(h, "Authorization header missing or invalid", 401);
      }

      // Ambil token dari header
      const token = authorization.replace("Bearer ", "");
      // Simpan token ke blacklisted_tokens
      await BlacklistedToken.create({ token });
      return successResponse(h, null, "Logout successful", 200);
    } catch (error) {
      console.error("Logout error:", error);
      return errorResponse(h, "Logout failed: " + error.message, 500);
    }
  },
};
