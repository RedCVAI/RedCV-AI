const CVService = require("../services/cv-service");
const fs = require("fs").promises;

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
}

module.exports = new CVController();
