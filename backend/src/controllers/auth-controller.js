const {
  registerUser,
  loginUser,
  getUserById,
} = require("../services/auth-service");
const { successResponse, errorResponse } = require("../utils/response-helper");

module.exports = {
  register: async (request, h) => {
    try {
      const { name, email, password } = request.payload;
      const user = await registerUser({ name, email, password });
      return successResponse(h, user, "User registered successfully", 201);
    } catch (error) {
      console.error("Registration error:", error);
      if (error.name === "SequelizeUniqueConstraintError") {
        return errorResponse(h, "Email already registered", 400);
      }
      return errorResponse(
        h,
        `Registration failed: ${error.message}`,
        error.statusCode || 500
      );
    }
  },

  login: async (request, h) => {
    try {
      const { email, password } = request.payload;
      const { token } = await loginUser({ email, password });
      return successResponse(h, { token }, "User login successful", 200);
    } catch (error) {
      console.error("Login error:", error);
      return errorResponse(
        h,
        `Login failed: &{error.message}`,
        error.statusCode || 500
      );
    }
  },

  getMe: async (request, h) => {
    try {
      const user = await getUserById(request.auth.credentials.id);
      return successResponse(h, user, "User retrieved successfully", 200);
    } catch (error) {
      console.error("Get user error:", error.message);
      return errorResponse(
        h,
        `Failed to retrieve user: ${error.message}`,
        error.statusCode || 400
      );
    }
  },
};
