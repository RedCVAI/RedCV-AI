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
}

module.exports = CVService;
