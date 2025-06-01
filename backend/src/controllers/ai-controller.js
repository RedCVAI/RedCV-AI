const {
  analyzeCVService,
  getAnalysisResultByCVId,
} = require("../services/ai-service");
const { successResponse, errorResponse } = require("../utils/response-helper");

const analyzeCVHandler = async (request, h) => {
  try {
    const { cvId } = request.payload;
    const { id: userId } = request.auth.credentials;

    const analysisResult = await analyzeCVService(userId, cvId);

    return successResponse(
      h,
      {
        analysisId: analysisResult.id,
        cvId: analysisResult.cv_id,
        analysisData: analysisResult.analysis_data,
        analyzedAt: analysisResult.analyzed_at,
      },
      "CV analyzed successfully",
      201
    );
  } catch (error) {
    console.error("POST/ /ai/analyze error:", error.message);
    return errorResponse(
      h,
      `Failed to analyze CV: ${error.message}`,
      error.statusCode || 500
    );
  }
};

const getAnalysisResultHandler = async (request, h) => {
  try {
    const { cvId } = request.params;
    const { id: userId } = request.auth.credentials;

    console.log("getAnalysisResultHandler called with:", { userId, cvId });
    const analysisResult = await getAnalysisResultByCVId(userId, cvId);

    if (!analysisResult) {
      const error = new Error("Analysis result not found");
      error.statusCode = 400;
      throw error;
    }

    console.log("Analysis result in controller:", {
      analysisId: analysisResult.id,
      cvId: analysisResult.cv_id,
      analysisData: analysisResult.analysis_data,
      analyzedAt: analysisResult.analyzed_at,
    });

    return successResponse(
      h,
      {
        analysisId: analysisResult.id,
        cvId: analysisResult.cv_id,
        analysisData: analysisResult.analysis_data,
        analyzedAt: analysisResult.analyzed_at,
      },
      "Analysis retrieved successfully",
      200
    );
  } catch (error) {
    console.error("GET /analyst/:cvId error:", error.message);
    return errorResponse(
      h,
      `Failed to retrieve analysis: ${error.message}`,
      error.statusCode || 404
    );
  }
};

module.exports = { analyzeCVHandler, getAnalysisResultHandler };
