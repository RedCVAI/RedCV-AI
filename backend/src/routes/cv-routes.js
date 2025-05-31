const CVController = require("../controllers/cv-controller");
const CVService = require("../services/cv-service");
const { upload } = require("../middleware/upload-middleware");
const Joi = require("joi");
const responseHelper = require("../utils/response-helper");
const { successResponse, errorResponse } = responseHelper;

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
      handler: async (request, h) => {
        try {
          const data = await new Promise((resolve, reject) => {
            upload(request.raw.req, request.raw.res, (err) => {
              if (err) {
                console.log("Multer error:", err.message);
                return reject(err);
              }
              console.log("Multer success, file in req:", request.raw.req.file);
              resolve(request.raw.req.file);
            });
          });

          if (!data) {
            return h
              .response({
                status: "fail",
                message: "No file uploaded",
              })
              .code(400);
          }

          request.file = data;
          console.log("request.file before controller:", request.file); // debugging
          const cv = await CVController.uploadCV(request);
          return successResponse(h, cv, "CV upload successfully", 201);
        } catch (error) {
          console.log("POST /cv/upload error:", error.message, error.stack);
          return errorResponse(h, error.message, error.statusCode || 500);
        }
      },
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
