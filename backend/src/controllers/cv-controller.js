const CVService = require("../services/cv-service");
const fs = require("fs").promises;
const { successResponse, errorResponse } = require("../utils/response-helper");

class CVController {
  async uploadCV(request) {
    try {
      const { file } = request;
      const { id: userId } = request.auth.credentials;

      if (!file) {
        const error = new Error("No file uploaded");
        error.statusCode = 400;
        throw error;
      }

      // Dengan diskStorage, file sudah disimpan oleh Multer
      const filename = file.filename;
      const filePath = file.path;

      const cv = await CVService.saveCV(userId, filename, filePath);
      return {
        id: cv.id,
        user_id: cv.user_id,
        file_name: cv.file_name,
        file_path: cv.file_path,
        upload_at: cv.uploaded_at,
      };
    } catch (error) {
      throw error;
    }
  }
  async getCvById(request, h) {
    try {
      const { id } = request.params;
      const { id: userId } = request.auth.credentials;

      const cv = await CVService.getCvById(userId, id);
      if (!cv) {
        return errorResponse(h, "CV not found", 404);
      }

      return successResponse(
        h,
        {
          cvId: cv.id,
          filename: cv.file_name,
          filepath: cv.file_path,
          uploadAt: cv.upload_at,
        },
        "CV retrieved successfully"
      );
    } catch (error) {
      return errorResponse(h, error.message, error.statusCode || 500);
    }
  }
}

module.exports = new CVController();
