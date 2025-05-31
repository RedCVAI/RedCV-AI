const CVService = require("../services/cv-service");
const fs = require("fs").promises;
const { successResponse, errorResponse } = require("../utils/response-helper");

class CVController {
  async uploadCV(request) {
    try {
      const { file } = request;
      const { id } = request.auth.credentials;

      if (!file) {
        throw new Error("No file uploaded");
      }

      // Simpan buffer ke disk
      const filename = `${Date.now()}-${file.originalname}`;
      const filePath = `uploads/${filename}`;
      await fs.writeFile(filePath, file.buffer);

      const cv = await CVService.saveCV(id, filename, filePath);
      return {
        status: "success",
        message: "CV uploaded successfully",
        data: { cvId: cv.id, filename: cv.file_name },
      };
    } catch (error) {
      throw new Error(error.message);
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
