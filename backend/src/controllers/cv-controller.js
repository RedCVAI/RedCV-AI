const CVService = require("../services/cv-service");
const fs = require("fs");
const Axios = require("axios");
const FormData = require("form-data");
const { successResponse, errorResponse } = require("../utils/response-helper");

class CVController {
  async uploadCV(request) {
    try {
      const { file, degree, profesion } = request.payload;
      const { id: userId } = request.auth.credentials;

      if (!file || !degree || !profesion) {
        const error = new Error("File, degree, and profesion are required");
        error.statusCode = 400;
        throw error;
      }

      // Log payload untuk debugging
      console.log("Payload ke Flask:", {
        filename: file.filename,
        filePath: file.path,
        degree,
        profesion,
      });

      // Periksa apakah file ada
      try {
        await fs.promises.access(file.path);
        console.log("File ditemukan:", file.path);
      } catch (err) {
        const error = new Error(`File tidak ditemukan: ${file.path}`);
        error.statusCode = 400;
        throw error;
      }

      // Simpan file ke database
      const filename = file.filename;
      const filePath = file.path;
      const cv = await CVService.saveCV(userId, filename, filePath);

      // Kirim file ke Flask untuk analisis
      const formData = new FormData();
      formData.append("cv", fs.createReadStream(filePath), filename);
      formData.append("degree", degree);
      formData.append("profesion", profesion);

      console.log("Mengirim FormData ke Flask:", {
        cv: filename,
        degree,
        profesion,
      });

      const flaskResponse = await Axios.post(
        "http://localhost:7860/api/v1/analyze-file",
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      );

      // Gabungkan data CV dan hasil analisis Flask
      const responseData = {
        id: cv.id,
        user_id: cv.user_id,
        file_name: cv.file_name,
        file_path: cv.file_path,
        upload_at: cv.uploaded_at,
        analysis: flaskResponse.data, // Respon dari flask
      };

      return responseData;
    } catch (error) {
      // Jika error dari Flask, ambil status code dari respons
      const statusCode = error.response?.status || error.statusCode || 500;
      console.error("Error in uploadCV:", {
        message: error.message,
        statusCode,
        flaskError: error.response?.data,
      });
      const errorMessage = error.response?.data?.error || error.message;
      throw new Error(errorMessage, { cause: { statusCode } });
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
