const CVService = require("./cv-service");
const AnalysisResult = require("../models/analysis-model");
const { analyzeCV } = require("./ai.analysis");

const analyzeCVService = async (userId, cvId) => {
  // Verifikasi CV ada dan milik pengguna
  console.log("AnalyzeCVService called with:", { userId, cvId });
  const cv = await CVService.getCvById(userId, cvId);

  if (!cv) {
    const error = new Error("CV not found or access denied");
    error.statusCode = 404;
    throw error;
  }

  // Lakukan analisis menggunakan ai-analysis.js
  const aiResult = analyzeCV(cv);

  // Simpan hasil analisis ke database
  const analysis = await AnalysisResult.create({
    cv_id: cvId,
    analysis_data: aiResult,
    analyzed_at: new Date().toISOString(),
  });

  return analysis;
};

const getAnalysisResultByCVId = async (userId, cvId) => {
  // Verifikasi CV ada dan milik pengguna
  console.log("getAnalysisResultByCVId called with:", { userId, cvId });
  const cv = await CVService.getCvById(userId, cvId);

  if (!cv) {
    const error = new Error("CV not found or access denied");
    error.statusCode = 404;
    throw error;
  }

  const analysisResult = await AnalysisResult.findOne({
    where: { cv_id: cvId },
  });

  if (!analysisResult) {
    const error = new Error("Analysis result not found");
    error.statusCode = 404;
    throw error;
  }

  console.log(
    "Analysis result:",
    analysisResult
      ? {
          id: analysisResult.id,
          cv_id: analysisResult.cv_id,
          analysis_data: analysisResult.analysis_data,
          analyzed_at: analysisResult.analyzed_at,
        }
      : null
  );

  return {
    id: analysisResult.id,
    cv_id: analysisResult.cv_id,
    analysis_data: analysisResult.analysis_data,
    analyzed_at: analysisResult.analyzed_at,
  };
};

module.exports = { analyzeCVService, getAnalysisResultByCVId };
