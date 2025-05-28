const CVController = require("../controllers/cv-controller");
const { upload } = require("../middleware/upload-middleware");

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

          const { id } = request.auth.credentials;
          request.file = data;
          const cv = await CVController.uploadCV(request);
          return h.response(cv).code(201);
        } catch (error) {
          console.log("Handler error:", error.message);
          return h
            .response({
              status: "fail",
              message: error.message,
            })
            .code(500);
        }
      },
    },
  },
];
