const {
  validateRegister,
  validateLogin,
} = require("../middleware/auth-middleware");
const AuthController = require("../controllers/auth-controller");

module.exports = [
  {
    method: "POST",
    path: "/auth/register",
    handler: AuthController.register,
    options: {
      validate: {
        payload: validateRegister,
      },
    },
  },
  {
    method: "POST",
    path: "/auth/login",
    handler: AuthController.login,
    options: {
      validate: {
        payload: validateLogin,
      },
    },
  },
  {
    method: "GET",
    path: "/auth/me",
    handler: AuthController.getMe,
    options: {
      auth: "jwt",
    },
  },
];
