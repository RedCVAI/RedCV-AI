const CVService = require("../services/cv-service");
const AnalysisResult = require("../models/analysis-model");
const Joi = require("joi");
const responseHelper = require("../utils/response-helper");
const { successResponse, errorResponse } = responseHelper;

module.exports = [
  {
    method: "POST",
    path: "/ai/analyze",
    options: {
      auth: "jwt",
      description: "Analyze CV with AI",
      Tags: ["api", "ai"],
      validate: {
        payload: Joi.object({
          cvId: Joi.number().integer().required().description(" CV ID"),
        }),
      },
      handler: async (request, h) => {
        try {
          const { cvId } = request.payload;
          const { id: userId } = request.auth.credentials;

          // Verifikasi CV ada dan milik pengguna
          const cv = await CVService.getCvById(userId, cvId);
          if (!cv) {
            return errorResponse(h, "CV not found or access denied", 404);
          }

          // Mock data untuk simulasi hasil analisis AI
          const aiResult = {
            score: Math.floor(Math.random() * 21) + 80,
            commment: "Well-structured CV with relevant experience",
            suggestions: [
              "Add quantifiable achievements",
              "Improve formatting for clarity",
            ],
          };

          // Simpan hasil analisis ke database
          const analysis = await AnalysisResult.create({
            cv_id: cvId,
            analysis_data: aiResult,
            analyzed_at: new Date(),
          });

          return seccessResponse(
            h,
            {
              analysisId: analysis.id,
              cvId: analysis.cv_id,
              analysisData: analysis.analysis_data,
              analyzedAt: analysis.analyzed_at,
            },
            "CV analyzed successfully",
            201
          );
        } catch (error) {
          console.log("POST /ai/analyze error", error.message);
          return errorResponse(h, error.message, error.statusCode || 500);
        }
      },
    },
  },
];
