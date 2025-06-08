const CVController = require("../controllers/cv-controller");
const CVService = require("../services/cv-service");
const Joi = require("joi");
const responseHelper = require("../utils/response-helper");
const { upload } = require("../middleware/upload-middleware");
const { successResponse, errorResponse } = responseHelper;

// Bungkus Multer dalam fungsi untuk Hapi.js
const multerHandler = (handler) => async (request, h) => {
  return new Promise((resolve, reject) => {
    if (!request.raw || !request.raw.req || !request.raw.res) {
      const error = new Error("Raw request/response not available");
      console.error("Multer error: Raw request/response not available");
      return reject(error);
    }

    // Log detail request untuk debugging
    console.log("Request method:", request.raw.req.method);
    console.log("Request headers:", request.raw.req.headers);
    console.log("Content-Length:", request.raw.req.headers['content-length']);
    console.log("Request readable:", request.raw.req.readable);
    console.log("Request body available:", !!request.raw.req.body);

    // Coba tangkap stream request secara manual
    if (request.raw.req.readableEnded) {
      console.error("Request stream already ended");
      return reject(new Error("Request stream already ended"));
    }

    // Pastikan stream masih dapat dibaca
    if (request.raw.req.readable) {
      let rawData = '';
      request.raw.req.on('data', (chunk) => {
        console.log("Receiving raw data chunk:", chunk.length, "bytes");
        rawData += chunk;
      });
      request.raw.req.on('end', () => {
        console.log("Raw request data (end):", rawData.slice(0, 500)); // Batasi log
      });
    } else {
      console.error("No readable stream available for request");
      return reject(new Error("No readable stream available for request"));
    }

    if (!request.raw.req.headers['content-type']?.includes('multipart/form-data')) {
      const error = new Error("Invalid Content-Type: Expected multipart/form-data");
      console.error("Multer error:", error.message);
      return reject(error);
    }

    upload(request.raw.req, request.raw.res, (err) => {
      if (err) {
        console.error("Multer error:", err.message, err.stack);
        return reject(err);
      }
      // Pindahkan data Multer ke request.payload
      request.payload = request.payload || {};
      request.payload.cv = request.raw.req.file;
      // Parsing field non-file secara manual
      const formData = request.raw.req.body || {};
      request.payload.degree = formData.degree;
      request.payload.profesion = formData.profesion;
      console.log("Parsed form data:", {
        cv: !!request.payload.cv,
        degree: formData.degree,
        profesion: formData.profesion
      });
      resolve(handler(request, h));
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
        output: "stream", // Gunakan stream untuk multipart
        parse: false, // Aktifkan parsing untuk memastikan data tersedia
        multipart: true,
        maxBytes: 5 * 1024 * 1024,
        timeout: false,
      },
      validate: {
        payload: null, // Nonaktifkan validasi Joi di route
      },
      handler: multerHandler(async (request, h) => {
        try {
          const { cv, degree, profesion } = request.payload;

          // Validasi manual setelah Multer
          const schema = Joi.object({
            cv: Joi.any()
              .meta({ swaggerType: "file" })
              .required()
              .description("CV file (PDF or DOCX)"),
            degree: Joi.string()
              .required()
              .description("Degree (e.g., S1, S2)"),
            profesion: Joi.string()
              .required()
              .description("Target profession (e.g., Graphic Designer)"),
          }).unknown(true);

          const { error } = schema.validate(request.payload);
          if (error) {
            return errorResponse(h, error.message, 400);
          }

          if (!cv) {
            return errorResponse(h, "No file uploaded", 400);
          }

          console.log("File dari multer:", {
            filename: cv.filename,
            path: cv.path,
            size: cv.size,
          });

          // Tambahkan file dan data ke request
          request.payload.file = cv;
          request.payload.degree = degree;
          request.payload.profesion = profesion;

          console.log("Request payload:", {
            file: cv.filename,
            degree,
            profesion,
          });

          const cvResult = await CVController.uploadCV(request);
          return successResponse(h, cvResult, "CV uploaded successfully", 201);
        } catch (error) {
          console.log("POST /cv/upload error:", error.message, error.stack);
          return errorResponse(
            h,
            error.message,
            error.cause?.statusCode || 500
          );
        }
      }),
    },
  },
  {
    method: "GET",
    path: "/cv/{id}",
    options: {
      auth: "jwt",
      description: "Get CV by ID",
      tags: ["api", "cv"],
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required().description("CV ID"),
        }),
      },
      handler: async (request, h) => {
        try {
          console.log("Processing GET /cv/{id} with params:", request.params);
          const { id } = request.params;
          const { id: userId } = request.auth.credentials;

          const cv = await CVService.getCvById(userId, id);
          if (!cv) {
            return errorResponse(h, "cv not found or access denied", 404);
          }

          const responseData = {
            cvId: cv.id,
            filename: cv.file_name,
            filePath: cv.file_path,
            uploadAt: cv.upload_at,
          };
          return successResponse(h, responseData, "CV retrieved successfully");
        } catch (error) {
          console.log("GET /cv/{id} error:", error.message, error.stack); // tambah stack untuk debugging
          return errorResponse(h, error.message, error.statusCode || 500);
        }
      },
    },
  },
];
