const Joi = require("joi");
const {
  analyzeCVHandler,
  getAnalysisResultHandler,
} = require("../controllers/ai-controller");

module.exports = [
  {
    method: "POST",
    path: "/ai/analyze",
    options: {
      auth: "jwt",
      description: "Analyze CV with AI",
      tags: ["api", "ai"],
      validate: {
        payload: Joi.object({
          cvId: Joi.number().integer().required().description(" CV ID"),
        }),
      },
      handler: analyzeCVHandler,
    },
  },
  {
    method: "GET",
    path: "/analyst/{cvId}",
    options: {
      auth: "jwt",
      description: "Get CV analysis result by cvId",
      tags: ["api", "ai"],
      validate: {
        params: Joi.object({
          cvId: Joi.number().integer().required().description("CV ID"),
        }),
      },
      handler: getAnalysisResultHandler,
    },
  },
];
