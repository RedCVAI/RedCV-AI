const CVService = require("../services/cv-service");
const fs = require("fs");
const Axios = require("axios");
const FormData = require("form-data");
const { successResponse, errorResponse } = require("../utils/response-helper");

class CVController {
  async uploadCV(request, h) {
    try {
      const { cv, degree, program_studi, profesion } = request.payload;
      const { id: userId } = request.auth.credentials;

      if (!cv || !degree || !program_studi || !profesion) {
        const error = new Error(
          "CV file, degree, program_studi, and profesion are required."
        ); // Pesan error lebih jelas
        error.statusCode = 400;
        throw error;
      }

      console.log("DEBUG CVController: Payload diterima dari frontend:", {
        filename: cv.filename,
        filePath: cv.path,
        degree,
        program_studi,
        profesion,
      });

      try {
        await fs.promises.access(cv.path);
        console.log(
          "DEBUG CVController: File sementara ditemukan di:",
          cv.path
        );
      } catch (err) {
        const error = new Error(
          `File sementara tidak ditemukan di: ${cv.path}. Error: ${err.message}`
        );
        error.statusCode = 400;
        throw error;
      }

      const filename = cv.filename;
      const filePath = cv.path;
      const savedCv = await CVService.saveCV(
        userId,
        filename,
        filePath,
        degree,
        profesion
      );

      const formData = new FormData();
      formData.append("cv", fs.createReadStream(filePath), filename);
      formData.append("degree", degree);
      formData.append("program_studi", program_studi);
      formData.append("profesion", profesion);

      console.log(
        "DEBUG CVController: Mengirim FormData ke Flask (via Axios):",
        {
          cv: filename,
          degree,
          program_studi,
          profesion,
        }
      );

      let flaskResponse;
      try {
        flaskResponse = await Axios.post(
          "http://localhost:7860/api/v1/analyze-file",
          formData,
          {
            headers: {
              ...formData.getHeaders(),
            },
            timeout: 60000,
          }
        );
        console.log(
          "DEBUG CVController: Flask raw response.data:",
          flaskResponse.data
        );

        if (
          !flaskResponse.data ||
          flaskResponse.data.status !== "success" ||
          !flaskResponse.data.data
        ) {
          const error = new Error(
            "Flask response format invalid or analysis failed."
          );
          error.statusCode = 500;
          error.flaskError = flaskResponse.data;
          throw error;
        }
        const analysisDataFromFlask = flaskResponse.data.data;

        console.log(
          "DEBUG CVController: Flask analysis data (extracted for storage):",
          analysisDataFromFlask
        );

        const analysisResult = await CVService.saveAnalysisResult(
          savedCv.id,
          analysisDataFromFlask
        );

        fs.unlink(filePath, (err) => {
          if (err)
            console.error(
              "WARNING CVController: Gagal menghapus file sementara:",
              filePath,
              err
            );
          else
            console.log(
              "DEBUG CVController: File sementara berhasil dihapus:",
              filePath
            );
        });

        const responseData = {
          id: savedCv.id,
          user_id: savedCv.user_id,
          file_name: savedCv.file_name,
          file_path: savedCv.file_path,
          degree: savedCv.degree,
          profesion: savedCv.profesion,
          upload_at: savedCv.uploaded_at,
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
      } catch (axiosError) {
        console.error("ERROR CVController: Flask request error:", {
          message: axiosError.message,
          response: axiosError.response ? axiosError.response.data : null,
          status: axiosError.response ? axiosError.response.status : null,
          stack: axiosError.stack,
        });
        const error = new Error("Failed to analyze file with Flask.");
        error.statusCode = axiosError.response
          ? axiosError.response.status
          : 500;
        error.flaskError = axiosError.response
          ? axiosError.response.data
          : axiosError.message;
        throw error;
      }
    } catch (error) {
      const statusCode = error.statusCode || 500;
      const errorMessage = error.message || "Internal server error.";
      const flaskError = error.flaskError || null;

      console.error("ERROR CVController (main catch block):", {
        message: errorMessage,
        statusCode,
        flaskError,
        stack: error.stack,
      });

      return errorResponse(h, errorMessage, statusCode);
    }
  }

  /**
   * Mengambil daftar CV terbaru beserta hasil analisisnya untuk user tertentu.
   * @param {object} request - Objek request Hapi.js
   * @param {object} h - Objek response toolkit Hapi.js
   * @returns {object} Response Hapi.js dengan daftar CV dan analisisnya
   */
  async getRecentCVs(request, h) {
    try {
      const { id: userId } = request.auth.credentials;
      const limit = request.query.limit || 5;
      const offset = request.query.offset || 0;

      console.log(
        `DEBUG CVController: Fetching recent CVs for user ${userId} with limit ${limit}, offset ${offset}`
      );

      const recentCVs = await CVService.getRecentCVsWithAnalysis(
        userId,
        limit,
        offset
      );

      if (!recentCVs || recentCVs.length === 0) {
        console.log(
          `DEBUG CVController: No recent CVs found for user ${userId}`
        );
        return successResponse(h, [], "No recent CVs found.");
      }

      const formattedCVs = recentCVs.map((cv) => {
        const analysisData = cv.AnalysisResult?.analysis_data;

        let contentScore = 0;
        if (
          analysisData &&
          analysisData.metric &&
          typeof analysisData.metric.precission_score !== "undefined"
        ) {
          contentScore = parseFloat(
            analysisData.metric.precission_score.toFixed(1)
          );
        }

        return {
          id: cv.id,
          fileName: cv.file_name,
          date: new Date(cv.uploaded_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          contentScore: contentScore,
          status: "Completed",
        };
      });

      console.log(
        `DEBUG CVController: Returning ${formattedCVs.length} recent CVs.`
      );
      return successResponse(
        h,
        formattedCVs,
        "Recent CVs retrieved successfully."
      );
    } catch (error) {
      console.error(
        "ERROR CVController (getRecentCVs):",
        error.message,
        error.stack
      );
      return errorResponse(h, error.message, error.statusCode || 500);
    }
  }
}

module.exports = new CVController();
