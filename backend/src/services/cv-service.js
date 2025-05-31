const CV = require("../models/cv-model");

class CVService {
  static async saveCV(userId, filename, filepath) {
    try {
      const cv = await CV.create({
        user_id: userId,
        file_name: filename,
        file_path: filepath,
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
}

module.exports = CVService;
