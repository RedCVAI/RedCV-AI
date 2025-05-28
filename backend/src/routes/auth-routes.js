const Authcontroller = require("../controllers/auth-controller");
const {
  validateRegister,
  validateLogin,
} = require("../middleware/auth-middleware");

module.exports = [
  {
    method: "POST",
    path: "/auth/register",
    handler: Authcontroller.register,
    options: {
      auth: false,
      validate: {
        payload: validateRegister,
      },
    },
  },
  {
    method: "POST",
    path: "/auth/login",
    handler: Authcontroller.login,
    options: {
      auth: false,
      validate: {
        payload: validateLogin,
      },
    },
  },
  {
    method: "GET",
    path: "/auth/me",
    handler: Authcontroller.getMe,
    options: {
      auth: "jwt",
    },
  },
];
