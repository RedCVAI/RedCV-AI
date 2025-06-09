const CVService = require("../services/cv-service");
const fs = require("fs");
const Axios = require("axios");
const FormData = require("form-data");
const { successResponse, errorResponse } = require("../utils/response-helper");

class CVController {
  async uploadCV(request, h) {
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

      let flaskResponse;
      try {
        flaskResponse = await Axios.post(
          "http://localhost:7860/api/v1/analyze-file",
          formData,
          {
            headers: {
              ...formData.getHeaders(),
            },
          }
        );
        console.log("Flask response:", flaskResponse.data);
      } catch (axiosError) {
        console.error("Flask request error:", {
          message: axiosError.message,
          response: axiosError.response ? axiosError.response.data : null,
          status: axiosError.response ? axiosError.response.status : null,
        });
        const error = new Error("Failed to analyze file with Flask");
        error.statusCode = axiosError.response
          ? axiosError.response.status
          : 500;
        error.flaskError = axiosError.response
          ? axiosError.response.data
          : axiosError.message;
        throw error;
      }

      // Simpan hasil analisis ke tabel analysis_results
      const analysisResult = await CVService.saveAnalysisResult(
        cv.id,
        flaskResponse.data
      );

      // Gabungkan data CV dan hasil analisis Flask
      const responseData = {
        id: cv.id,
        user_id: cv.user_id,
        file_name: cv.file_name,
        file_path: cv.file_path,
        degree: cv.degree,
        profesion: cv.profesion,
        upload_at: cv.uploaded_at,
        analysis: {
          analysis_id: analysisResult.id,
          cv_id: analysisResult.cv_id,
          analysis_data: analysisResult.analysis_data,
          analyzed_at: analysisResult.analyzed_at,
        },
      };

      return successResponse(
        h,
        responseData,
        "CV uploaded and analyzed successfully",
        201
      );
    } catch (error) {
      // Error handling tanpa akses error.response langsung
      const statusCode = error.statusCode || 500;
      const errorMessage = error.message || "Internal server error";
      const flaskError = error.flaskError || null;

      console.error("Error in uploadCV:", {
        message: errorMessage,
        statusCode,
        flaskError,
        stack: error.stack,
      });

      return errorResponse(h, errorMessage, statusCode);
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
          degree: cv.degree,
          profesion: cv.profesion,
          uploadAt: cv.uploaded_at,
        },
        "CV retrieved successfully"
      );
    } catch (error) {
      return errorResponse(h, error.message, error.statusCode || 500);
    }
  }
}

module.exports = new CVController();
