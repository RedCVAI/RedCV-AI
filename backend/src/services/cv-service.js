const CV = require("../models/cv-model");
const AnalysisResult = require("../models/analysis-model");

class CVService {
  static async saveCV(userId, filename, filepath, degree, profesion) {
    try {
      const cv = await CV.create({
        user_id: userId,
        file_name: filename,
        file_path: filepath,
        degree,
        profesion,
        uploaded_at: new Date(),
      });
      return cv;
    } catch (error) {
      throw new Error(`Failed to save CV: ${error.message}`);
    }
  }

  static async getCvById(userId, cvId) {
    try {
      const cv = await CV.findOne({
        where: {
          id: cvId,
          user_id: userId,
        },
      });

      if (!cv) {
        const error = new Error("CV not found or access denied");
        error.statusCode = 404;
        throw error;
      }

      return cv;
    } catch (error) {
      throw new Error(`Failed to retrieve CV: ${error.message}`);
    }
  }

  static async saveAnalysisResult(cvId, analysisData) {
    try {
      const analysisResult = await AnalysisResult.create({
        cv_id: cvId,
        analysis_data: analysisData,
        analyzed_at: new Date(),
      });
      return {
        id: analysisResult.id,
        cv_id: analysisResult.cv_id,
        analysis_data: analysisResult.analysis_data,
        analyzed_at: analysisResult.analyzed_at,
      };
    } catch (error) {
      throw new Error(`Failed to save analysis result: ${error.message}`);
    }
  }
}

module.exports = CVService;
