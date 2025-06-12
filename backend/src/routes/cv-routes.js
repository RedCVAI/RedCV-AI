const CVController = require("../controllers/cv-controller");
const CVService = require("../services/cv-service");
const Joi = require("joi");
const responseHelper = require("../utils/response-helper");
const { upload } = require("../middleware/upload-middleware");
const { successResponse, errorResponse } = responseHelper;

const multerHandler = (handler) => (request, h) => {
  return new Promise((resolve, reject) => {
    upload(request.raw.req, request.raw.res, (err) => {
      if (err) {
        console.error("Multer error in upload middleware:", err.message, err.stack);
        // Tangani error Multer (misalnya ukuran file terlalu besar, tipe tidak sesuai)
        let statusCode = 500;
        let message = "File upload failed";
        if (err.code === 'LIMIT_FILE_SIZE') {
          statusCode = 413; // Payload Too Large
          message = "File is too large (max 5MB)";
        } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          statusCode = 400; // Bad Request
          message = "Unexpected file field. Only 'cv' is allowed.";
        } else if (err instanceof Error && err.message.includes("Unexpected field")) { // Multer error for wrong field name
          statusCode = 400;
          message = "Only 'cv' file field is accepted.";
        }
        return reject(h.response({ status: 'fail', message }).code(statusCode));
      }

      // Pastikan request.raw.req.file dan request.raw.req.body tersedia setelah Multer
      if (!request.raw.req.file) {
        return reject(h.response({ status: 'fail', message: "No CV file found after upload" }).code(400));
      }
      if (!request.raw.req.body) {
        return reject(h.response({ status: 'fail', message: "Form data not parsed after upload" }).code(500));
      }

      // Pindahkan data dari Multer ke request.payload yang akan digunakan oleh handler Hapi
      request.payload = {
        cv: request.raw.req.file, // File yang diunggah
        degree: request.raw.req.body.degree,
        program_studi: request.raw.req.body.program_studi, // Tambahkan ini jika ada di frontend
        profesion: request.raw.req.body.profesion,
      };

      console.log("DEBUG MulterHandler: Request payload yang dibuat:", request.payload);

      resolve(handler(request, h)); // Lanjutkan ke handler Hapi.js
    });
  });
};

module.exports = [
  {
    method: "POST",
    path: "/cv/upload",
    options: {
      auth: "jwt",
      payload: {
        output: "stream",
        parse: false,
        multipart: true,
        maxBytes: 5 * 1024 * 1024,
        timeout: false,
      },
      validate: {
        payload: null,
      },
      handler: multerHandler(async (request, h) => {
        try {
          const { cv, degree, program_studi, profesion } = request.payload;

          const schema = Joi.object({
            cv: Joi.any().required().description("CV file (PDF or DOCX)"),
            degree: Joi.string().required().description("Degree (e.g., S1, S2)"),
            program_studi: Joi.string().required().description("Program Studi"),
            profesion: Joi.string().required().description("Target profession (e.g., Graphic Designer)"),
          }).unknown(true);

          const { error } = schema.validate(request.payload);
          if (error) {
            console.error("Joi validation error:", error.message);
            return errorResponse(h, error.message, 400);
          }

          if (!cv) {
            console.error("No CV file found in payload after Multer and Joi validation.");
            return errorResponse(h, "No file uploaded", 400);
          }
          
          console.log("DEBUG CV Route Handler: Payload diterima untuk uploadCV:", {
            filename: cv.filename,
            degree,
            program_studi,
            profesion
          });

          const cvResult = await CVController.uploadCV(request, h);
          return cvResult;
        } catch (error) {
          console.error("ERROR POST /cv/upload handler:", error.message, error.stack);
          return errorResponse(
            h,
            error.message || "Terjadi kesalahan internal server.",
            error.statusCode || 500
          );
        }
      }),
    },
  },
    {
    method: "GET",
    path: "/cv/recent",
    options: {
      auth: "jwt",
      description: "Get recent CVs with analysis results for the authenticated user",
      tags: ["api", "cv"],
      validate: {
        query: Joi.object({
          limit: Joi.number().integer().min(1).default(5).description("Number of recent CVs to retrieve"),
          offset: Joi.number().integer().min(0).default(0).description("Offset for pagination"),
        })
      },
      handler: async (request, h) => {
        return CVController.getRecentCVs(request, h);
      },
    },
  },
];