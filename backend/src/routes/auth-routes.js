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
        failAction: (request, h, err) => {
          return h
            .response({
              status: "fail",
              message: `Validation failed: ${err.details[0].message}`,
            })
            .code(400)
            .takeover();
        },
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
