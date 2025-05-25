const Joi = require("joi");
const User = require("../models/user-model");
const BlacklistedToken = require("../models/blacklisted-token-model");

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
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env");
  }

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
        const token = artifacts.token;
        const isBlacklisted = await BlacklistedToken.findOne({
          where: { token },
        });
        if (isBlacklisted) {
          return { isValid: false };
        }

        const user = await User.findByPk(artifacts.decoded.payload.id);
        if (!user) {
          return { isValid: false };
        }
        return { isValid: true, credentials: user };
      } catch (error) {
        console.error("JWT validation error:", error.message);
        return { isValid: false };
      }
    },
  });
};

module.exports = { validateRegister, validateLogin, registerAuthStrategy };
