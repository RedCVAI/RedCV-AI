const Joi = require("joi");
const User = require("../models/user-model");

const validateRegister = Joi.object({
  name: Joi.string().min(3).allow(null),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const registerAuthStrategy = async (server) => {
  await server.register(require("@hapi/jwt"));

  server.auth.strategy("jwt", "jwt", {
    keys: {
      key: process.env.JWT_SECRET,
      algorithms: ["HS256"],
    },
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: 3600, // 1 hour
    },
    validate: async (artifacts, request, h) => {
      try {
        console.log("JWT validate:", {
          id: artifacts.decoded.payload.id,
          token: artifacts.token,
          timestamp: new Date().toISOString(),
        });
        const user = await User.findByPk(artifacts.decoded.payload.id);
        if (!user) {
          console.log("User not found:", artifacts.decoded.payload.id);
          return { isValid: false };
        }
        return { isValid: true, credentials: { id: user.id } };
      } catch (error) {
        console.error("JWT validation error:", error.message);
        return { isValid: false };
      }
    },
  });
  server.auth.default("jwt");
};

module.exports = {
  validateRegister,
  validateLogin,
  registerAuthStrategy,
};
