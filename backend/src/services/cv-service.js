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

    /**
   * Mengambil daftar CV terbaru beserta hasil analisisnya untuk user tertentu.
   * Menggunakan include untuk menggabungkan data AnalysisResult.
   * @param {number} userId - ID pengguna.
   * @param {number} limit - Jumlah data yang akan diambil.
   * @param {number} offset - Offset untuk pagination.
   * @returns {Array<object>} Daftar objek CV dengan hasil analisis.
   */
  static async getRecentCVsWithAnalysis(userId, limit = 5, offset = 0) {
    try {
      const cvs = await CV.findAll({
        where: { user_id: userId },
        order: [['uploaded_at', 'DESC']],
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
        include: [{
          model: AnalysisResult,
          required: false,
          attributes: ['analysis_data', 'analyzed_at']
        }],
      });
      return cvs;
    } catch (error) {
      console.error("Error in CVService.getRecentCVsWithAnalysis:", error.message, error.stack);
      throw new Error(`Failed to retrieve recent CVs with analysis: ${error.message}`);
    }
  }
}

module.exports = CVService;
